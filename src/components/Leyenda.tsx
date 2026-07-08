import { ESCALA } from '../data/banco';

/** Leyenda de la escala de madurez 1..5 en lenguaje claro. */
export default function Leyenda() {
  return (
    <div className="legend">
      {ESCALA.map((e) => (
        <div className="lv" key={e.v}>
          <b>
            <span className="lv-dot" style={{ background: e.color }} />
            {e.v}. {e.nombre}
          </b>
          <span>{e.frase}</span>
        </div>
      ))}
    </div>
  );
}
