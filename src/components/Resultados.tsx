import type { Meta, Respuestas } from '../lib/tipos';
import type { ItemPlan } from '../lib/scoring';
import { BANCO, ESCALA, FUENTES, NIVEL_META, TOTAL_PREGUNTAS } from '../data/banco';
import {
  promedioDim,
  promedioModulo,
  promedioGlobal,
  nivelDe,
  mgdeDe,
  colorDe,
  contarRespondidas,
  planDeAccion,
  pendientes,
  fmt,
} from '../lib/scoring';
import Radar from './Radar';
import HojaRuta from './HojaRuta';

interface ResultadosProps {
  respuestas: Respuestas;
  meta: Meta;
  onEditar: () => void;
  onPrint: () => void;
  onCSV: () => void;
  onJSON: () => void;
}

const FECHA_LIMITE = new Date(2026, 11, 1); // 1-dic-2026

/** Bloque de una dimensión en el plan de acción: nivel actual → siguiente + acción concreta. */
function PasoPlan({ item }: { item: ItemPlan }) {
  const { dim, promedio, paso } = item;
  return (
    <div className="brecha" style={{ borderLeftColor: colorDe(promedio) }}>
      <h4>
        <span className="dim-id">{dim.id}</span> {dim.nombre} — {fmt(promedio)}/5 · {nivelDe(promedio).nombre}
        {dim.critica && <span className="pill crit">crítica</span>}
      </h4>
      <div className="muted small" style={{ marginBottom: '4px' }}>
        {paso.objetivo !== null
          ? <>Siguiente nivel: <b>{paso.objetivo} · {ESCALA[paso.objetivo - 1]!.nombre}</b></>
          : <>Nivel máximo alcanzado</>}
      </div>
      <div>{paso.texto}</div>
    </div>
  );
}

function KpiModulo({ titulo, m }: { titulo: string; m: number | null }) {
  const nv = nivelDe(m);
  return (
    <div className="box">
      <div className="big" style={{ color: colorDe(m) }}>
        {fmt(m)}
        <span style={{ fontSize: '16px', color: 'var(--muted)' }}> / 5</span>
      </div>
      <div className="sub">
        <b>{titulo}</b>
        <br />
        <span className="badge" style={{ background: colorDe(m), marginTop: '6px' }}>
          {nv.nombre} · {mgdeDe(m)}
        </span>
      </div>
    </div>
  );
}

export default function Resultados({ respuestas, meta, onEditar, onPrint, onCSV, onJSON }: ResultadosProps) {
  const modA = BANCO.modulos[0]!;
  const modB = BANCO.modulos[1]!;
  const mA = promedioModulo(modA, respuestas);
  const mB = promedioModulo(modB, respuestas);
  const global = promedioGlobal(BANCO, respuestas);
  const dias = Math.ceil((FECHA_LIMITE.getTime() - Date.now()) / 86400000);
  const respondidas = contarRespondidas(BANCO, respuestas);
  const plan = planDeAccion(BANCO, respuestas);
  const prioritarias = plan.filter((x) => x.esBrecha);
  const enNivel = plan.filter((x) => !x.esBrecha);
  const pend = pendientes(BANCO, respuestas);

  const metaline: string[] = [];
  if (meta.institucion) metaline.push(meta.institucion);
  if (meta.area) metaline.push(meta.area);
  if (meta.rol) metaline.push('Rol: ' + meta.rol);
  if (meta.participantes) metaline.push('Participantes: ' + meta.participantes);
  metaline.push('Fecha: ' + new Date().toLocaleDateString('es-CL'));

  return (
    <section className="view">
      <div className="toolbar no-print">
        <div className="wrap">
          <button className="btn ghost" onClick={onEditar}>← Volver al cuestionario</button>
          <div style={{ flex: 1 }} />
          <button className="btn secondary" onClick={onPrint}>🖨 Imprimir / PDF</button>
          <button className="btn secondary" onClick={onCSV}>Exportar CSV</button>
          <button className="btn secondary" onClick={onJSON}>Exportar JSON</button>
        </div>
      </div>

      <div className="wrap">
        {/* Encabezado */}
        <div className="card" style={{ marginTop: '16px' }}>
          <h1>Resultados de la autoevaluación</h1>
          <p className="muted" style={{ marginTop: '-2px' }}>{metaline.join(' · ')}</p>
          {respondidas < TOTAL_PREGUNTAS && (
            <div className="note" style={{ marginTop: '8px' }}>
              ⚠️ Autoevaluación incompleta: {respondidas} de {TOTAL_PREGUNTAS} preguntas respondidas. Los promedios consideran solo lo respondido.
            </div>
          )}
        </div>

        {/* Resumen ejecutivo */}
        {plan.length > 0 && (
          <div className="card">
            <h2>Resumen ejecutivo</h2>
            <p className="muted small" style={{ marginTop: 0 }}>
              Pensado para presentar a jefaturas y directivos, e impulsar la estrategia institucional de datos.
            </p>
            <ul style={{ margin: '8px 0', paddingLeft: '22px' }}>
              <li>
                A <b>{dias > 0 ? dias : 0} días</b> de la entrada en vigencia de la Ley 21.719 (1-dic-2026),{' '}
                {meta.area || meta.institucion || 'el área evaluada'} se ubica en un nivel de madurez global de{' '}
                <b>{fmt(global)}/5 · {nivelDe(global).nombre}</b> ({mgdeDe(global)}).
              </li>
              <li>
                <b>{prioritarias.length} de {plan.length}</b> dimensiones evaluadas están bajo la meta institucional
                (nivel {NIVEL_META} «Definido»)
                {prioritarias.filter((x) => x.dim.critica).length > 0 && (
                  <>, incluidas <b>{prioritarias.filter((x) => x.dim.critica).length} críticas</b> de mayor riesgo</>
                )}.
              </li>
              {prioritarias.length > 0 && (
                <li>
                  Por dónde partir:{' '}
                  {prioritarias.slice(0, 3).map((x, i) => (
                    <span key={x.dim.id}>
                      {i > 0 && ' · '}
                      <b>{x.dim.id}</b> {x.dim.nombre}
                    </span>
                  ))}{' '}
                  (detalle en el plan de acción).
                </li>
              )}
            </ul>
            <p className="muted small">
              La meta «Definido» equivale a contar con políticas, roles e instancias formalizados y aplicados: el estándar
              que exigen la Ley 21.719 y el MGDE, en línea con las buenas prácticas internacionales (RGPD, DAMA-DMBOK, playbook BID).
            </p>
          </div>
        )}

        {/* Ruta de arranque para instituciones que recién comienzan */}
        {global !== null && global < 2.5 && (
          <div className="card">
            <h2>Ruta de arranque</h2>
            <p className="muted small" style={{ marginTop: 0 }}>
              La madurez global aún es incipiente: antes de perfeccionar dimensiones puntuales, conviene instalar lo básico.
              <b> No se requiere DPO ni una gobernanza formada para empezar</b> — este diagnóstico sirve precisamente para impulsarla.
            </p>
            <ol style={{ margin: '8px 0', paddingLeft: '22px', display: 'grid', gap: '6px' }}>
              <li>
                <b>Primeros pasos (Guía SGD: dic 2025–ene 2026):</b> la jefatura de servicio designa a un(a) encargado(a)
                institucional, priorizando capacidad de gestión (Acción N° 1); se constituye el proyecto de implementación
                con acta y carta Gantt (Acción N° 2); y se comunica el inicio a toda la institución (Acción N° 3).
              </li>
              <li>
                <b>Levantamiento de información (ene–abr 2026):</b> aplicar la matriz de levantamiento de la Guía SGD en
                todas las áreas —incluidas las de soporte (oficina de partes, jurídica, bienestar)—. Las sesiones por área
                de esta herramienta cumplen el rol de las reuniones de trabajo que la guía recomienda para completarla.
              </li>
              <li>
                <b>Informe de hallazgos y Comité Ejecutivo (abr 2026):</b> presentar los hallazgos —y este resumen
                ejecutivo— al Comité (representante de la jefatura, encargado(a) como secretaría técnica, jurídica, TI,
                control de gestión y áreas críticas; ~2 sesiones al mes) para priorizar acciones, responsables y recursos.
              </li>
              <li>
                <b>Instrumentos (may–nov 2026):</b> Catálogo de datos personales (may–jun), Política de tratamiento (jul)
                y protocolos, reglas y procedimientos priorizados según los riesgos del informe de hallazgos (ago–nov).
              </li>
              <li>
                <b>Transversal:</b> capacitación y difusión interna, cláusulas de protección de datos en compras públicas
                y convenios, y evaluar el modelo de prevención (con DPO) como etapa intermedia, antes o después de la política.
              </li>
            </ol>
            <p className="muted small">
              Las fases y fechas corresponden al cronograma sugerido por la Guía Práctica de la Secretaría de Gobierno
              Digital (Ministerio de Hacienda). Si la institución parte más tarde, mantenga el orden y comprima los plazos.
            </p>
          </div>
        )}

        {/* KPIs */}
        <div className="card">
          <div className="kpi">
            <div className="box">
              <div className="big" style={{ color: 'var(--brand)' }}>{dias > 0 ? dias : 0}</div>
              <div className="sub">{dias > 0 ? 'días para el 1-dic-2026' : 'La ley ya está vigente'}</div>
            </div>
            <KpiModulo titulo="Módulo A · Ley 21.719" m={mA} />
            <KpiModulo titulo="Módulo B · Gobernanza (MGDE)" m={mB} />
          </div>
          <div style={{ textAlign: 'center', marginTop: '14px' }}>
            <span className="muted small">Madurez global (ambos módulos): </span>
            <span className="badge" style={{ background: colorDe(global) }}>
              {fmt(global)} / 5 · {nivelDe(global).nombre} ({mgdeDe(global)})
            </span>
          </div>
        </div>

        {/* Radares */}
        <div className="card">
          <h2>Perfil de madurez por dimensión</h2>
          <div className="radar-wrap">
            <div>
              <h4 style={{ textAlign: 'center', color: 'var(--brand)' }}>Módulo A · Ley 21.719</h4>
              <Radar items={modA.dimensiones.map((d) => ({ label: d.id, value: promedioDim(d, respuestas) }))} meta={NIVEL_META} />
            </div>
            <div>
              <h4 style={{ textAlign: 'center', color: 'var(--brand)' }}>Módulo B · Gobernanza</h4>
              <Radar items={modB.dimensiones.map((d) => ({ label: d.id, value: promedioDim(d, respuestas) }))} meta={NIVEL_META} />
            </div>
          </div>
          <p className="muted small" style={{ textAlign: 'center' }}>
            Escala 0–5. Cada eje es una dimensión (ver detalle abajo). Sin datos = 0.
            La línea segmentada marca la meta institucional: nivel {NIVEL_META} «Definido».
          </p>
        </div>

        {/* Barras por módulo */}
        {BANCO.modulos.map((mod) => {
          const pm = promedioModulo(mod, respuestas);
          return (
            <div className="card" key={mod.id}>
              <h2>{mod.titulo}</h2>
              <div className="muted small" style={{ marginBottom: '6px' }}>
                Promedio del módulo: <b>{fmt(pm)} / 5</b> · {nivelDe(pm).nombre} ({mgdeDe(pm)})
              </div>
              {mod.dimensiones.map((d) => {
                const m = promedioDim(d, respuestas);
                const pct = m === null ? 0 : (m / 5) * 100;
                return (
                  <div className="barrow" key={d.id}>
                    <div className="top">
                      <span>
                        <b className="dim-id">{d.id}</b> {d.nombre}
                        {d.critica && <span className="pill crit">crítica</span>}
                      </span>
                      <span style={{ whiteSpace: 'nowrap' }}>
                        {m === null ? <span className="muted">sin datos</span> : <><b>{fmt(m)}</b> · {nivelDe(m).nombre}</>}
                      </span>
                    </div>
                    <div className="track">
                      <i style={{ width: pct.toFixed(0) + '%', background: colorDe(m) }} />
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}

        {/* Plan de acción */}
        <div className="card">
          <h2>Plan de acción: próximo paso por dimensión</h2>
          <p className="muted small">
            Cada dimensión respondida muestra la acción concreta para subir al siguiente nivel de madurez.
            Referencia — cronograma oficial de la Guía SGD (Ministerio de Hacienda): primeros pasos (dic 2025–ene 2026),
            levantamiento de información (ene–abr 2026), informe de hallazgos y Comité Ejecutivo (abr 2026),
            catálogo de datos (may–jun 2026), política de tratamiento (jul 2026), protocolos y procedimientos (ago–nov 2026).
          </p>
          {plan.length === 0 ? (
            <p className="muted">Aún no hay dimensiones respondidas: complete el cuestionario para generar el plan de acción.</p>
          ) : (
            <>
              {prioritarias.length > 0 && (
                <>
                  <h3>Prioritarias — nivel bajo 3 («Definido»)</h3>
                  <p className="muted small">
                    De menor a mayor madurez. Priorice las marcadas como <span className="pill crit">crítica</span>.
                    La meta institucional es alcanzar al menos el nivel {NIVEL_META} «Definido» en todas las dimensiones;
                    en las críticas del Módulo A, antes del 1-dic-2026.
                  </p>
                  {prioritarias.map((x) => <PasoPlan key={x.dim.id} item={x} />)}
                </>
              )}
              {enNivel.length > 0 && (
                <>
                  <h3 style={{ marginTop: prioritarias.length > 0 ? '18px' : 0 }}>Para seguir subiendo de nivel</h3>
                  <p className="muted small">
                    Estas dimensiones ya alcanzan al menos el nivel «Definido»; la acción indicada apunta al siguiente nivel de madurez.
                    Para instituciones que tratan grandes volúmenes de datos con altas exigencias de seguridad y privacidad,
                    el MGDE sugiere aspirar al nivel Avanzado en la gestión de datos.
                  </p>
                  {enNivel.map((x) => <PasoPlan key={x.dim.id} item={x} />)}
                </>
              )}
            </>
          )}
        </div>

        {/* Hoja de ruta */}
        <HojaRuta plan={plan} />

        {/* Pendientes */}
        <div className="card">
          <h2>Preguntas pendientes por cerrar ({pend.length})</h2>
          {pend.length === 0 ? (
            <p className="muted">No hay preguntas sin responder ni marcadas como "No sé / N/A".</p>
          ) : (
            <>
              <p className="muted small">Estas preguntas no se promediaron. Conviene resolverlas con las áreas correspondientes.</p>
              <div style={{ overflowX: 'auto' }}>
                <table className="table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Dimensión</th>
                      <th>Estado</th>
                      <th>Pregunta</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pend.map((x) => (
                      <tr key={x.pregunta.id}>
                        <td className="dim-id">{x.pregunta.id}</td>
                        <td>{x.dim.nombre}</td>
                        <td>{x.tipo}</td>
                        <td>{x.pregunta.texto}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

        {/* Metodología + fuentes */}
        <div className="card">
          <h3>¿Cómo se calcula?</h3>
          <p className="muted small">
            Cada dimensión promedia sus preguntas respondidas (1–5). El puntaje de cada módulo es el promedio ponderado de sus dimensiones;
            las dimensiones críticas pesan ×1.5. La equivalencia MGDE es: &lt;1,5 Insuficiente · 1,5–2,4 Básico · 2,5–3,4 Medio · ≥3,5 Avanzado.
          </p>
          <h3>Fuentes</h3>
          <div className="small">
            {FUENTES.map((f) => (
              <div key={f[1]}>
                • <a href={f[1]} target="_blank" rel="noopener noreferrer">{f[0]}</a>
              </div>
            ))}
          </div>
          <p className="muted" style={{ fontSize: '12px', marginTop: '10px' }}>
            Instrumento orientativo de autodiagnóstico; no constituye asesoría legal. El banco de preguntas debe validarse contra el texto oficial de la Ley 21.719 y la Guía de la SGD antes de un uso formal.
          </p>
        </div>
      </div>
    </section>
  );
}
