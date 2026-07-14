// Extrae y puntúa los resultados del levantamiento para el análisis de consultoría.
//
// Uso (desde la raíz del repo):
//   node .claude/skills/analizar-resultados/extraer.mjs [--bd ruta.sqlite] [export1.json ...]
//
// Fuentes de datos (se combinan, dedup por id, gana la más reciente):
//   - la BD SQLite (por defecto datos/levantamiento.sqlite; --bd permite apuntar a
//     una copia o snapshot, p. ej. para comparar mediciones en el tiempo)
//   - archivos JSON exportados por la app, pasados como argumentos
//
// Reutiliza el banco y el scoring de la app (imports TS nativos, Node ≥ 23.4),
// por lo que los puntajes son exactamente los que muestra la interfaz.
// Imprime un JSON con sesiones puntuadas + consolidado + plan de acción.
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { componerBanco, contarPreguntasBanco, NIVEL_META } from '../../../src/data/banco.ts';
import {
  promedioDim,
  promedioModulo,
  promedioGlobal,
  promedioLista,
  contarRespondidas,
  nivelDe,
  mgdeDe,
  proximoPaso,
  planDeAccionSobre,
  horizonteDe,
  esQuickWin,
  esEstructural,
} from '../../../src/lib/scoring.ts';

const RAIZ = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..');

// --- Argumentos ------------------------------------------------------------
const args = process.argv.slice(2);
let rutaBD = path.join(RAIZ, 'datos', 'levantamiento.sqlite');
const archivosJSON = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--bd') rutaBD = path.resolve(args[++i]);
  else archivosJSON.push(args[i]);
}

// --- Reunir sesiones -------------------------------------------------------
const crudas = [];

if (existsSync(rutaBD)) {
  const { DatabaseSync } = await import('node:sqlite');
  let db;
  try { db = new DatabaseSync(rutaBD, { readOnly: true }); } catch { db = new DatabaseSync(rutaBD); }
  for (const fila of db.prepare('SELECT data FROM sesiones ORDER BY actualizada').all()) {
    crudas.push({ ...JSON.parse(fila.data), fuente: 'bd' });
  }
}

for (const arg of archivosJSON) {
  const obj = JSON.parse(readFileSync(arg, 'utf8'));
  if (!obj?.respuestas) {
    console.error(`AVISO: ${arg} no parece un export de la herramienta (sin campo respuestas); se omite.`);
    continue;
  }
  crudas.push({
    id: 'json:' + path.basename(arg),
    meta: obj.meta ?? {},
    respuestas: obj.respuestas,
    creada: obj.fecha ?? '',
    actualizada: obj.fecha ?? '',
    fuente: path.basename(arg),
  });
}

// Dedup por id: gana la versión con `actualizada` más reciente.
const porId = new Map();
for (const s of crudas) {
  const previa = porId.get(s.id);
  if (!previa || (s.actualizada ?? '') > (previa.actualizada ?? '')) porId.set(s.id, s);
}
const sesiones = [...porId.values()].filter((s) => contarRespondidas(componerBanco(!!s.meta?.sectorSalud), s.respuestas) > 0);
// Para el consolidado, el banco incluye el Módulo C (salud) si alguna sesión lo marca.
const bancoCons = componerBanco(sesiones.some((s) => !!s.meta?.sectorSalud));

if (sesiones.length === 0) {
  console.error(`No hay sesiones con respuestas: ni en ${rutaBD} ni en los JSON entregados.`);
  process.exit(1);
}

// --- Puntuar ---------------------------------------------------------------
const etiqueta = (s, i) => s.meta?.area || s.meta?.institucion || 'Sesión ' + (i + 1);

function puntuarSesion(s, i) {
  const r = s.respuestas;
  const banco = componerBanco(!!s.meta?.sectorSalud);
  const porDimension = {};
  for (const mod of banco.modulos) {
    for (const d of mod.dimensiones) {
      const m = promedioDim(d, r);
      const na = d.preguntas.filter((p) => r[p.id] === 'na').length;
      const sinResponder = d.preguntas.filter((p) => r[p.id] === undefined).length;
      porDimension[d.id] = {
        nombre: d.nombre,
        critica: d.critica,
        promedio: m,
        nivel: nivelDe(m).nombre,
        mgde: mgdeDe(m),
        na,
        sinResponder,
      };
    }
  }
  const g = promedioGlobal(banco, r);
  return {
    id: s.id,
    etiqueta: etiqueta(s, i),
    meta: s.meta ?? {},
    fuente: s.fuente,
    actualizada: s.actualizada,
    respondidas: contarRespondidas(banco, r),
    totalPreguntas: contarPreguntasBanco(banco),
    na: Object.values(r).filter((v) => v === 'na').length,
    global: g,
    nivelGlobal: nivelDe(g).nombre,
    porModulo: Object.fromEntries(banco.modulos.map((mod) => [mod.id, promedioModulo(mod, r)])),
    porDimension,
    respuestas: r,
  };
}

const sesionesPuntuadas = sesiones.map(puntuarSesion);

// --- Consolidado -----------------------------------------------------------
const promInstitucional = (d) => promedioLista(sesiones.map((s) => promedioDim(d, s.respuestas)));

const dimensiones = bancoCons.modulos.flatMap((mod) =>
  mod.dimensiones.map((d) => {
    const porArea = Object.fromEntries(
      sesiones.map((s, i) => [etiqueta(s, i), promedioDim(d, s.respuestas)])
    );
    const valores = Object.values(porArea).filter((v) => v !== null);
    const m = promedioLista(Object.values(porArea));
    return {
      modulo: mod.id,
      id: d.id,
      nombre: d.nombre,
      critica: d.critica,
      porArea,
      promedio: m,
      nivel: nivelDe(m).nombre,
      mgde: mgdeDe(m),
      min: valores.length ? Math.min(...valores) : null,
      max: valores.length ? Math.max(...valores) : null,
      paso: proximoPaso(d, m),
    };
  })
);

const plan = planDeAccionSobre(bancoCons, promInstitucional).map((item) => ({
  id: item.dim.id,
  nombre: item.dim.nombre,
  critica: item.dim.critica,
  promedio: item.promedio,
  esBrecha: item.esBrecha,
  horizonte: horizonteDe(item),
  quickWin: esQuickWin(item),
  estructural: esEstructural(item),
  objetivoSiguiente: item.paso.objetivo,
  accion: item.paso.texto,
}));

const globalMin = promedioLista(
  bancoCons.modulos.map((mod) => promedioLista(sesiones.map((s) => promedioModulo(mod, s.respuestas))))
);

console.log(
  JSON.stringify(
    {
      generado: new Date().toISOString(),
      nivelMeta: NIVEL_META,
      totalPreguntas: contarPreguntasBanco(bancoCons),
      sesiones: sesionesPuntuadas,
      consolidado: {
        areas: sesiones.length,
        global: globalMin,
        nivelGlobal: nivelDe(globalMin).nombre,
        mgde: mgdeDe(globalMin),
        porModulo: Object.fromEntries(
          bancoCons.modulos.map((mod) => [
            mod.id,
            promedioLista(sesiones.map((s) => promedioModulo(mod, s.respuestas))),
          ])
        ),
        dimensiones,
        plan,
      },
    },
    null,
    2
  )
);
