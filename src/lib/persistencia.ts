// Persistencia local y export/import. Todo vive en el navegador del usuario;
// nada se envía a ningún servidor.
import type { ArchivoExport, Banco, Meta, Respuestas, Sesion } from './tipos';
import { promedioDim, promedioModulo, promedioLista, proximoPaso, nivelDe, mgdeDe, contarRespondidas } from './scoring';

/** Clave v1 (un solo avance). Se conserva solo para migrar instalaciones antiguas. */
export const STORAGE_KEY_V1 = 'autoeval-madurez-v1';
/** Clave v2: múltiples sesiones de levantamiento (una por área/reunión). */
export const STORAGE_KEY = 'autoeval-madurez-v2';
export const TEMA_KEY = STORAGE_KEY_V1 + '-tema';

export interface EstadoSesiones {
  sesiones: Sesion[];
  activaId: string | null;
}

export function nuevaSesion(meta: Meta = {}, respuestas: Respuestas = {}): Sesion {
  const ahora = new Date().toISOString();
  const id = 's-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
  return { id, meta, respuestas, creada: ahora, actualizada: ahora };
}

/** Etiqueta corta para mostrar una sesión (área > institución > número). */
export function etiquetaSesion(s: Sesion, indice: number): string {
  return s.meta.area || s.meta.institucion || 'Sesión ' + (indice + 1);
}

export function guardarSesiones(estado: EstadoSesiones): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ v: 2, ...estado, ts: new Date().toISOString() }));
  } catch {
    /* localStorage puede no estar disponible en algunos contextos; se ignora */
  }
}

export function cargarSesiones(): EstadoSesiones | null {
  if (typeof localStorage === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const obj = JSON.parse(raw) as { sesiones?: Sesion[]; activaId?: string | null };
      const sesiones = (obj.sesiones ?? []).filter((s) => s && typeof s === 'object' && typeof s.id === 'string');
      return { sesiones, activaId: obj.activaId ?? null };
    }
    // Migración desde v1: el avance único pasa a ser la primera sesión.
    const rawV1 = localStorage.getItem(STORAGE_KEY_V1);
    if (rawV1) {
      const v1 = JSON.parse(rawV1) as { respuestas?: Respuestas; meta?: Meta };
      const s = nuevaSesion(v1.meta ?? {}, v1.respuestas ?? {});
      return { sesiones: [s], activaId: s.id };
    }
    return null;
  } catch {
    return null;
  }
}

export function cargarTema(): string | null {
  if (typeof localStorage === 'undefined') return null;
  try {
    return localStorage.getItem(TEMA_KEY);
  } catch {
    return null;
  }
}

export function guardarTema(tema: string): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(TEMA_KEY, tema);
  } catch {
    /* ignore */
  }
}

function slugFecha(): string {
  const d = new Date();
  const p = (n: number) => (n < 10 ? '0' : '') + n;
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function nombreBase(meta: Meta): string {
  const s = (meta.area || meta.institucion || 'institucion')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  return `autoevaluacion-madurez-${s || 'institucion'}-${slugFecha()}`;
}

function descargar(nombre: string, contenido: string, tipo: string): void {
  const blob = new Blob([contenido], { type: tipo });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = nombre;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
}

export function exportarJSON(respuestas: Respuestas, meta: Meta): void {
  const data: ArchivoExport = {
    herramienta: 'autoeval-madurez',
    version: 1,
    fecha: new Date().toISOString(),
    meta,
    respuestas,
  };
  descargar(nombreBase(meta) + '.json', JSON.stringify(data, null, 2), 'application/json');
}

function csvCampo(s: string | number): string {
  return '"' + String(s ?? '').replace(/"/g, '""') + '"';
}

export function exportarCSV(banco: Banco, respuestas: Respuestas, meta: Meta): void {
  const filas: (string | number)[][] = [
    ['Modulo', 'Dimension_ID', 'Dimension', 'Pregunta_ID', 'Pregunta', 'Respuesta', 'Promedio_Dimension', 'Nivel_Dimension', 'MGDE_Dimension', 'Nivel_Siguiente', 'Proxima_Accion', 'Promedio_Modulo'],
  ];
  for (const mod of banco.modulos) {
    const pm = promedioModulo(mod, respuestas);
    for (const d of mod.dimensiones) {
      const md = promedioDim(d, respuestas);
      const paso = proximoPaso(d, md);
      for (const p of d.preguntas) {
        const v = respuestas[p.id];
        const rv = v === undefined ? '' : v === 'ns' ? 'NS' : v === 'na' ? 'NA' : v;
        filas.push([
          mod.id, d.id, d.nombre, p.id, p.texto, rv,
          md === null ? '' : md.toFixed(2),
          nivelDe(md).nombre, mgdeDe(md),
          paso === null ? '' : paso.objetivo ?? 'Mantener',
          paso === null ? '' : paso.texto,
          pm === null ? '' : pm.toFixed(2),
        ]);
      }
    }
  }
  const csv = '﻿' + filas.map((f) => f.map(csvCampo).join(';')).join('\r\n');
  descargar(nombreBase(meta) + '.csv', csv, 'text/csv;charset=utf-8');
}

/** CSV consolidado: una fila por dimensión, una columna por sesión (área) + promedio institucional. */
export function exportarConsolidadoCSV(banco: Banco, sesiones: Sesion[]): void {
  const etiquetas = sesiones.map((s, i) => etiquetaSesion(s, i));
  const filas: (string | number)[][] = [
    ['Modulo', 'Dimension_ID', 'Dimension', 'Critica', ...etiquetas, 'Promedio_Ministerio', 'Nivel_Ministerio', 'MGDE_Ministerio', 'Nivel_Siguiente', 'Proxima_Accion'],
  ];
  for (const mod of banco.modulos) {
    for (const d of mod.dimensiones) {
      const proms = sesiones.map((s) => promedioDim(d, s.respuestas));
      const m = promedioLista(proms);
      const paso = proximoPaso(d, m);
      filas.push([
        mod.id, d.id, d.nombre, d.critica ? 'Si' : 'No',
        ...proms.map((p) => (p === null ? '' : p.toFixed(2))),
        m === null ? '' : m.toFixed(2),
        nivelDe(m).nombre, mgdeDe(m),
        paso === null ? '' : paso.objetivo ?? 'Mantener',
        paso === null ? '' : paso.texto,
      ]);
    }
  }
  filas.push(['', '', 'Preguntas respondidas', '', ...sesiones.map((s) => contarRespondidas(banco, s.respuestas)), '', '', '', '', '']);
  const csv = '﻿' + filas.map((f) => f.map(csvCampo).join(';')).join('\r\n');
  descargar(`autoevaluacion-consolidado-${slugFecha()}.csv`, csv, 'text/csv;charset=utf-8');
}

export function importarJSON(file: File): Promise<{ respuestas: Respuestas; meta: Meta }> {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => {
      try {
        const obj = JSON.parse(String(fr.result)) as { respuestas?: Respuestas; meta?: Meta };
        if (!obj || typeof obj !== 'object' || !obj.respuestas) throw new Error('formato');
        resolve({ respuestas: obj.respuestas, meta: obj.meta ?? {} });
      } catch {
        reject(new Error('Archivo inválido'));
      }
    };
    fr.onerror = () => reject(new Error('No se pudo leer el archivo'));
    fr.readAsText(file);
  });
}
