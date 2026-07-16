import { useMemo, useState } from 'react';
import type { Banco, Dimension, Modulo, Respuestas, Valor } from '../lib/tipos';
import { ESCALA, contarPreguntasBanco } from '../data/banco';
import { contarRespondidas } from '../lib/scoring';
import Leyenda from './Leyenda';

interface CuestionarioProps {
  /** Banco activo (incluye el Módulo C si la sesión es del sector salud). */
  banco: Banco;
  respuestas: Respuestas;
  /** Nombre de la sesión activa (área/departamento), para no confundir sesiones. */
  etiqueta: string;
  /** Hora del último autoguardado, para que el encuestado sepa que puede pausar y retomar. */
  guardadoEn: string | null;
  onResponder: (qid: string, val: Valor) => void;
  onVerResultados: () => void;
  onVolver: () => void;
  onExportar: () => void;
}

interface Paso {
  mod: Modulo;
  dim: Dimension;
}

function dimCompleta(dim: Dimension, r: Respuestas): boolean {
  return dim.preguntas.every((p) => r[p.id] !== undefined);
}

function dimIniciada(dim: Dimension, r: Respuestas): boolean {
  return dim.preguntas.some((p) => r[p.id] !== undefined);
}

/** Primer paso con preguntas sin responder, para retomar donde se quedó. */
function primerPendiente(pasos: Paso[], r: Respuestas): number {
  const i = pasos.findIndex((p) => !dimCompleta(p.dim, r));
  return i === -1 ? 0 : i;
}

export default function Cuestionario({ banco, respuestas, etiqueta, guardadoEn, onResponder, onVerResultados, onVolver, onExportar }: CuestionarioProps) {
  // El cuestionario se recorre por pasos temáticos: una dimensión a la vez (según el banco activo).
  const PASOS = useMemo<Paso[]>(() => banco.modulos.flatMap((mod) => mod.dimensiones.map((dim) => ({ mod, dim }))), [banco]);
  const [paso, setPaso] = useState(() => primerPendiente(PASOS, respuestas));
  const total = contarPreguntasBanco(banco);
  const respondidas = contarRespondidas(banco, respuestas);
  const pct = total ? Math.round((respondidas / total) * 100) : 0;
  const idx = Math.min(paso, PASOS.length - 1);
  const actual = PASOS[idx]!;
  const esUltimo = idx === PASOS.length - 1;

  const irPaso = (i: number) => {
    setPaso(Math.max(0, Math.min(PASOS.length - 1, i)));
    window.scrollTo(0, 0);
  };

  return (
    <section className="view">
      <div className="toolbar no-print">
        <div className="wrap">
          {etiqueta && <span className="pill" style={{ marginLeft: 0 }} title="Sesión de levantamiento activa">Sesión: {etiqueta}</span>}
          <div className="progress">
            <div className="bar">
              <i style={{ width: pct + '%' }} />
            </div>
            <div className="lbl">
              {respondidas} de {total} respondidas ({pct}%)
              {guardadoEn && <span title="El avance se guarda automáticamente con cada respuesta; puede pausar y retomar cuando quiera."> · ✓ guardado {guardadoEn}</span>}
            </div>
          </div>
          <button className="btn secondary" onClick={onExportar}>Exportar</button>
          <button className="btn" onClick={onVerResultados}>Ver resultados →</button>
        </div>
      </div>

      <div className="wrap">
        {/* Navegador de pasos: una dimensión = un bloque temático */}
        <div className="pasos-nav no-print" role="tablist" aria-label="Bloques temáticos del cuestionario">
          {PASOS.map((p, i) => {
            const completa = dimCompleta(p.dim, respuestas);
            const iniciada = dimIniciada(p.dim, respuestas);
            const clase = ['paso-chip', i === idx ? 'actual' : '', completa ? 'lista' : iniciada ? 'parcial' : ''].join(' ');
            return (
              <button
                key={p.dim.id}
                type="button"
                role="tab"
                aria-selected={i === idx}
                className={clase}
                title={`${p.dim.nombre}${completa ? ' — completa' : iniciada ? ' — parcial' : ''}`}
                onClick={() => irPaso(i)}
              >
                {p.dim.id}
              </button>
            );
          })}
        </div>

        <div className="card" style={{ marginTop: '10px' }}>
          <b>Recordatorio de la escala</b>
          <div style={{ marginTop: '8px' }}>
            <Leyenda />
          </div>
        </div>

        <div className="mod-head">
          <h2>{actual.mod.titulo}</h2>
        </div>
        <p className="muted small" style={{ marginTop: 0 }}>
          Bloque {idx + 1} de {PASOS.length} · {actual.mod.descripcion}
        </p>

        <div className="dim">
          <h3>
            <span className="dim-id">{actual.dim.id}</span> {actual.dim.nombre}
            {actual.dim.critica && <span className="pill crit">crítica ×1.5</span>}
          </h3>

          {actual.dim.preguntas.map((p) => {
            const cur = respuestas[p.id];
            const selLabel =
              cur === undefined ? ''
              : cur === 'ns' ? '→ No sé'
              : cur === 'na' ? '→ No aplica'
              : `→ ${ESCALA[cur - 1]!.nombre}`;
            const selColor = typeof cur === 'number' ? ESCALA[cur - 1]!.color : 'var(--muted)';
            return (
              <div className="q" key={p.id}>
                <div className="qt">{p.texto}</div>
                <div className="opts" role="radiogroup" aria-label={p.texto}>
                  {ESCALA.map((e) => (
                    <button
                      key={e.v}
                      type="button"
                      className="opt"
                      role="radio"
                      aria-checked={cur === e.v}
                      data-v={e.v}
                      title={`${e.v}. ${e.nombre} — ${e.frase}`}
                      onClick={() => onResponder(p.id, e.v as Valor)}
                    >
                      {e.v}
                    </button>
                  ))}
                  <button
                    type="button"
                    className="opt na"
                    role="radio"
                    aria-checked={cur === 'ns'}
                    data-v="ns"
                    title="No sé — no sabemos si lo hacemos o cumplimos (queda como pendiente por cerrar)"
                    onClick={() => onResponder(p.id, 'ns')}
                  >
                    No sé
                  </button>
                  <button
                    type="button"
                    className="opt na"
                    role="radio"
                    aria-checked={cur === 'na'}
                    data-v="na"
                    title="No aplica — este tratamiento o deber no corresponde a la institución"
                    onClick={() => onResponder(p.id, 'na')}
                  >
                    No aplica
                  </button>
                  <span className="sel-label" style={{ color: selColor }}>{selLabel}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', margin: '20px 0', alignItems: 'center' }}>
          <button className="btn secondary" onClick={() => irPaso(paso - 1)} disabled={paso === 0}>← Anterior</button>
          {esUltimo ? (
            <button className="btn" onClick={onVerResultados}>Ver resultados →</button>
          ) : (
            <button className="btn" onClick={() => irPaso(paso + 1)}>Siguiente →</button>
          )}
          <span className="muted small">Bloque {idx + 1} / {PASOS.length}</span>
          <div style={{ flex: 1 }} />
          <button className="btn ghost" onClick={onVolver}>← Volver a portada</button>
        </div>
      </div>
    </section>
  );
}
