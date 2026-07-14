import type { Banco, Dimension, Modulo, Respuestas, Sesion } from '../lib/tipos';
import type { ProximoPaso } from '../lib/scoring';
import { ESCALA, NIVEL_META, contarPreguntasBanco } from '../data/banco';
import {
  promedioDim,
  promedioModulo,
  promedioLista,
  proximoPaso,
  planDeAccionSobre,
  nivelDe,
  mgdeDe,
  colorDe,
  contarRespondidas,
  fmt,
} from '../lib/scoring';
import { etiquetaSesion } from '../lib/persistencia';
import HojaRuta from './HojaRuta';

interface ConsolidadoProps {
  banco: Banco;
  sesiones: Sesion[];
  onVolver: () => void;
  onImportarClick: () => void;
  onAbrirSesion: (id: string) => void;
  onCSV: (conDatos: Sesion[]) => void;
  onPrint: () => void;
}

function respondidasModulo(mod: Modulo, r: Respuestas): number {
  return mod.dimensiones.reduce((n, d) => n + d.preguntas.filter((p) => r[p.id] !== undefined).length, 0);
}

function totalModulo(mod: Modulo): number {
  return mod.dimensiones.reduce((n, d) => n + d.preguntas.length, 0);
}

/** Celda del semáforo: promedio coloreado por nivel de madurez. */
function Celda({ m }: { m: number | null }) {
  if (m === null) return <span className="muted small">—</span>;
  const nv = nivelDe(m);
  return (
    <span
      className="cell-chip"
      style={{ background: colorDe(m), color: nv.v === 3 ? '#3a2f00' : '#fff' }}
      title={`${nv.nombre} (${mgdeDe(m)})`}
    >
      {fmt(m)}
    </span>
  );
}

interface BrechaInstitucional {
  modId: string;
  dim: Dimension;
  promedio: number;
  paso: ProximoPaso;
}

const FECHA_LIMITE = new Date(2026, 11, 1); // 1-dic-2026

export default function Consolidado({ banco, sesiones, onVolver, onImportarClick, onAbrirSesion, onCSV, onPrint }: ConsolidadoProps) {
  // Solo las sesiones con al menos una respuesta entran al consolidado.
  const conDatos = sesiones.filter((s) => contarRespondidas(banco, s.respuestas) > 0);
  const sinDatos = sesiones.filter((s) => contarRespondidas(banco, s.respuestas) === 0);

  const total = contarPreguntasBanco(banco);
  const promModulo = (mod: Modulo) => promedioLista(conDatos.map((s) => promedioModulo(mod, s.respuestas)));
  const global = promedioLista(banco.modulos.map(promModulo));

  // Brechas transversales: dimensiones cuyo nivel institucional (promedio redondeado) queda bajo 3.
  const brechasInst: BrechaInstitucional[] = [];
  for (const mod of banco.modulos) {
    for (const d of mod.dimensiones) {
      const m = promedioLista(conDatos.map((s) => promedioDim(d, s.respuestas)));
      if (m !== null && (nivelDe(m).v ?? 5) < 3) {
        const paso = proximoPaso(d, m);
        if (paso) brechasInst.push({ modId: mod.id, dim: d, promedio: m, paso });
      }
    }
  }
  brechasInst.sort((a, b) => a.promedio - b.promedio || (b.dim.critica ? 1 : 0) - (a.dim.critica ? 1 : 0));

  const totalDims = banco.modulos.reduce((n, mod) => n + mod.dimensiones.length, 0);
  const critInst = brechasInst.filter((x) => x.dim.critica).length;
  const dias = Math.ceil((FECHA_LIMITE.getTime() - Date.now()) / 86400000);
  const planInst = planDeAccionSobre(banco, (d) => promedioLista(conDatos.map((s) => promedioDim(d, s.respuestas))));

  return (
    <section className="view">
      <div className="toolbar no-print">
        <div className="wrap">
          <button className="btn ghost" onClick={onVolver}>← Volver a portada</button>
          <div style={{ flex: 1 }} />
          <button className="btn secondary" onClick={onImportarClick}>Importar JSON de otra área</button>
          <button className="btn secondary" onClick={onPrint}>🖨 Imprimir / PDF</button>
          <button className="btn secondary" onClick={() => onCSV(conDatos)} disabled={conDatos.length === 0}>
            Exportar CSV consolidado
          </button>
        </div>
      </div>

      <div className="wrap">
        <div className="card" style={{ marginTop: '16px' }}>
          <h1>Consolidado institucional</h1>
          <p className="muted" style={{ marginTop: '-2px' }}>
            Comparativo de madurez entre las áreas/departamentos evaluados. Fecha: {new Date().toLocaleDateString('es-CL')}
          </p>
          <div className="note" style={{ marginTop: '8px' }}>
            🔒 El consolidado se calcula localmente en este navegador, a partir de las sesiones guardadas en este
            equipo y de los JSON que importe. Nada se envía a internet.
          </div>
        </div>

        {conDatos.length === 0 ? (
          <div className="card">
            <p className="muted">
              Aún no hay sesiones con respuestas. Complete al menos una sesión de levantamiento o importe los JSON
              exportados por otras áreas para construir el consolidado.
            </p>
            <button className="btn" onClick={onImportarClick}>Importar JSON de otra área</button>
          </div>
        ) : (
          <>
            {/* KPIs institucionales */}
            <div className="card">
              <div className="kpi">
                <div className="box">
                  <div className="big" style={{ color: 'var(--brand)' }}>{conDatos.length}</div>
                  <div className="sub">{conDatos.length === 1 ? 'área evaluada' : 'áreas evaluadas'}</div>
                </div>
                {banco.modulos.map((mod) => {
                  const m = promModulo(mod);
                  return (
                    <div className="box" key={mod.id}>
                      <div className="big" style={{ color: colorDe(m) }}>
                        {fmt(m)}<span style={{ fontSize: '16px', color: 'var(--muted)' }}> / 5</span>
                      </div>
                      <div className="sub">
                        <b>{mod.tituloCorto ?? mod.titulo}</b><br />
                        <span className="badge" style={{ background: colorDe(m), marginTop: '6px' }}>
                          {nivelDe(m).nombre} · {mgdeDe(m)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={{ textAlign: 'center', marginTop: '14px' }}>
                <span className="muted small">Madurez institucional (promedio simple entre áreas): </span>
                <span className="badge" style={{ background: colorDe(global) }}>
                  {fmt(global)} / 5 · {nivelDe(global).nombre} ({mgdeDe(global)})
                </span>
              </div>
              {conDatos.length === 1 && (
                <p className="muted small" style={{ textAlign: 'center', marginTop: '8px' }}>
                  ⚠️ El consolidado refleja una sola área por ahora; agregue o importe más sesiones para un panorama institucional.
                </p>
              )}
            </div>

            {/* Resumen ejecutivo institucional */}
            <div className="card">
              <h2>Resumen ejecutivo institucional</h2>
              <p className="muted small" style={{ marginTop: 0 }}>
                Pensado para presentar a la autoridad e impulsar una estrategia institucional de datos.
              </p>
              <ul style={{ margin: '8px 0', paddingLeft: '22px' }}>
                <li>
                  A <b>{dias > 0 ? dias : 0} días</b> de la entrada en vigencia de la Ley 21.719 (1-dic-2026), el
                  consolidado de <b>{conDatos.length}</b> {conDatos.length === 1 ? 'área evaluada' : 'áreas evaluadas'} muestra una madurez de{' '}
                  <b>{fmt(global)}/5 · {nivelDe(global).nombre}</b> ({mgdeDe(global)}).
                </li>
                <li>
                  <b>{brechasInst.length} de {totalDims}</b> dimensiones están bajo la meta institucional (nivel {NIVEL_META} «Definido») a nivel institucional
                  {critInst > 0 && <>, incluidas <b>{critInst} críticas</b> de mayor riesgo</>}.
                </li>
                {brechasInst.length > 0 && (
                  <li>
                    Por dónde partir:{' '}
                    {brechasInst.slice(0, 3).map((x, i) => (
                      <span key={x.dim.id}>
                        {i > 0 && ' · '}
                        <b>{x.dim.id}</b> {x.dim.nombre}
                      </span>
                    ))}{' '}
                    (detalle en las brechas priorizadas).
                  </li>
                )}
                {sinDatos.length > 0 && (
                  <li>
                    El levantamiento sigue en curso: {sinDatos.length} {sinDatos.length === 1 ? 'sesión pendiente' : 'sesiones pendientes'} de responder.
                  </li>
                )}
              </ul>
              <p className="muted small">
                La meta «Definido» equivale a contar con políticas, roles e instancias formalizados y aplicados: el estándar
                que exigen la Ley 21.719 y el MGDE, en línea con las buenas prácticas internacionales (RGPD, DAMA-DMBOK, playbook BID).
              </p>
            </div>

            {/* Matriz dimensión × área por módulo */}
            {banco.modulos.map((mod) => (
              <div className="card" key={mod.id}>
                <h2>{mod.titulo}</h2>
                <div style={{ overflowX: 'auto' }}>
                  <table className="table heat">
                    <thead>
                      <tr>
                        <th>Dimensión</th>
                        {conDatos.map((s) => (
                          <th key={s.id} className="heat-col">{etiquetaSesion(s, sesiones.indexOf(s))}</th>
                        ))}
                        <th className="heat-col">Institución</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mod.dimensiones.map((d) => {
                        const proms = conDatos.map((s) => promedioDim(d, s.respuestas));
                        const m = promedioLista(proms);
                        return (
                          <tr key={d.id}>
                            <td>
                              <b className="dim-id">{d.id}</b> {d.nombre}
                              {d.critica && <span className="pill crit">crítica</span>}
                            </td>
                            {proms.map((p, i) => (
                              <td key={conDatos[i]!.id}><Celda m={p} /></td>
                            ))}
                            <td><Celda m={m} /></td>
                          </tr>
                        );
                      })}
                      <tr>
                        <td className="muted small">Preguntas respondidas (módulo)</td>
                        {conDatos.map((s) => (
                          <td key={s.id} className="muted small" style={{ textAlign: 'center' }}>
                            {respondidasModulo(mod, s.respuestas)}/{totalModulo(mod)}
                          </td>
                        ))}
                        <td />
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ))}

            {/* Brechas transversales */}
            <div className="card">
              <h2>Brechas institucionales priorizadas</h2>
              {brechasInst.length === 0 ? (
                <p className="muted">
                  Ninguna dimensión promedia bajo el nivel 3 ("Definido") entre las áreas evaluadas.
                </p>
              ) : (
                <>
                  <p className="muted small">
                    Dimensiones cuyo nivel consolidado entre áreas queda bajo 3 ("Definido"), de menor a mayor madurez.
                    Priorice las marcadas como <span className="pill crit">crítica</span>. La acción indicada es el
                    próximo paso transversal para subir al siguiente nivel.
                  </p>
                  {brechasInst.map((x) => (
                    <div className="brecha" key={x.dim.id} style={{ borderLeftColor: colorDe(x.promedio) }}>
                      <h4>
                        <span className="dim-id">{x.dim.id}</span> {x.dim.nombre} — {fmt(x.promedio)}/5 · {nivelDe(x.promedio).nombre}
                        {x.dim.critica && <span className="pill crit">crítica</span>}
                      </h4>
                      {x.paso.objetivo !== null && (
                        <div className="muted small" style={{ marginBottom: '4px' }}>
                          Siguiente nivel: <b>{x.paso.objetivo} · {ESCALA[x.paso.objetivo - 1]!.nombre}</b>
                        </div>
                      )}
                      <div>{x.paso.texto}</div>
                    </div>
                  ))}
                </>
              )}
            </div>

            {/* Hoja de ruta institucional */}
            <HojaRuta plan={planInst} />
          </>
        )}

        {/* Cobertura del levantamiento */}
        <div className="card">
          <h2>Cobertura del levantamiento</h2>
          <p className="muted small">
            Sesiones registradas en este equipo. Las sesiones sin respuestas no se incluyen en el consolidado:
            sirven como recordatorio de reuniones pendientes.
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Sesión</th>
                  <th>Avance</th>
                  <th>Estado</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {sesiones.map((s, i) => {
                  const n = contarRespondidas(banco, s.respuestas);
                  return (
                    <tr key={s.id}>
                      <td><b>{etiquetaSesion(s, i)}</b></td>
                      <td style={{ whiteSpace: 'nowrap' }}>{n}/{total}</td>
                      <td className="muted">
                        {n === 0 ? 'Pendiente (sin respuestas)' : n < total ? 'Parcial' : 'Completa'}
                      </td>
                      <td style={{ textAlign: 'right' }} className="no-print">
                        <button className="btn ghost mini" onClick={() => onAbrirSesion(s.id)}>Abrir</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {sinDatos.length > 0 && (
            <p className="muted small" style={{ marginTop: '8px' }}>
              {sinDatos.length} {sinDatos.length === 1 ? 'sesión pendiente' : 'sesiones pendientes'} de levantamiento.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
