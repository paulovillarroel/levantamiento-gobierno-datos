import type { ItemPlan } from '../lib/scoring';
import { ESCALA, NIVEL_META } from '../data/banco';
import { horizonteDe, esQuickWin, esEstructural, nivelDe, colorDe, fmt } from '../lib/scoring';

const GRUPOS: { h: '0-12' | '12-24' | '24-36'; titulo: string; desc: string }[] = [
  { h: '0-12', titulo: '0–12 meses — cerrar brechas críticas', desc: 'Deberes legales basales bajo la meta: deben alcanzar al menos el nivel 3 «Definido» a la brevedad (Ley 21.719 vigente el 1-dic-2026).' },
  { h: '12-24', titulo: '12–24 meses — cerrar las demás brechas', desc: 'Dimensiones bajo la meta institucional sin carácter crítico.' },
  { h: '24-36', titulo: '24–36 meses — subir de nivel y consolidar', desc: 'Dimensiones ya en nivel «Definido» o superior: medición, control y mejora continua (el MGDE sugiere nivel Avanzado para instituciones de salud).' },
];

function Fila({ item }: { item: ItemPlan }) {
  const objetivo = item.paso.objetivo;
  return (
    <div className="ruta-item">
      <span className="badge mini" style={{ background: colorDe(item.promedio) }}>{fmt(item.promedio)}</span>
      <span>
        <b className="dim-id">{item.dim.id}</b> {item.dim.nombre}
        {item.dim.critica && <span className="pill crit">crítica</span>}
        {esQuickWin(item) && <span className="pill qw" title="Ya existe práctica informal: formalizar es rápido">quick win</span>}
        {esEstructural(item) && <span className="pill" title="Parte desde el nivel Inicial: requiere proyecto con recursos">estructural</span>}
      </span>
      <span className="muted small" style={{ whiteSpace: 'nowrap' }}>
        {nivelDe(item.promedio).nombre}
        {objetivo !== null ? <> → <b>{objetivo} · {ESCALA[objetivo - 1]!.nombre}</b></> : ' (máximo)'}
      </span>
    </div>
  );
}

/** Hoja de ruta sugerida a 12/24/36 meses, generada desde el plan de acción. */
export default function HojaRuta({ plan }: { plan: ItemPlan[] }) {
  if (plan.length === 0) return null;
  return (
    <div className="card">
      <h2>Hoja de ruta sugerida (12 · 24 · 36 meses)</h2>
      <p className="muted small" style={{ marginTop: 0 }}>
        Generada automáticamente desde las respuestas: las brechas críticas van primero, el resto de las brechas después,
        y lo ya definido se consolida al final. <b>Quick win</b> = ya existe práctica informal (promedio ≥ 2) y formalizarla
        es rápido; <b>estructural</b> = dimensión crítica que parte desde el nivel Inicial y requiere proyecto con recursos.
        La meta institucional es el nivel {NIVEL_META} «Definido». Es una priorización sugerida: el Comité debe ajustarla
        según impacto y capacidad real.
      </p>
      {GRUPOS.map((g) => {
        const items = plan.filter((x) => horizonteDe(x) === g.h);
        return (
          <div key={g.h} style={{ marginTop: '12px' }}>
            <h3 style={{ marginBottom: '2px' }}>{g.titulo}</h3>
            <p className="muted small" style={{ margin: '0 0 6px' }}>{g.desc}</p>
            {items.length === 0
              ? <p className="muted small" style={{ margin: 0 }}>— Sin dimensiones en este horizonte.</p>
              : items.map((x) => <Fila key={x.dim.id} item={x} />)}
          </div>
        );
      })}
    </div>
  );
}
