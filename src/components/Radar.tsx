export interface RadarItem {
  label: string;
  value: number | null;
}

/** Gráfico radar dibujado a mano en SVG (sin librerías). Escala 0..5. `meta` dibuja un anillo segmentado en ese nivel. */
export default function Radar({ items, size = 440, meta }: { items: RadarItem[]; size?: number; meta?: number }) {
  const N = items.length;
  const pad = 56;
  const R = size / 2 - pad;
  const cx = size / 2;
  const cy = size / 2;
  const ang = (i: number) => ((-90 + (i * 360) / N) * Math.PI) / 180;
  const pt = (i: number, r: number): [number, number] => [cx + r * Math.cos(ang(i)), cy + r * Math.sin(ang(i))];

  const rings = [1, 2, 3, 4, 5].map((lvl) => {
    const rr = (R * lvl) / 5;
    const pts = items
      .map((_, i) => {
        const [x, y] = pt(i, rr);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
    return <polygon key={`ring-${lvl}`} className="radar-ring" points={pts} />;
  });

  const axes = items.map((it, i) => {
    const [x, y] = pt(i, R);
    const [lx, ly] = pt(i, R + 16);
    const anchor: 'middle' | 'start' | 'end' = Math.abs(lx - cx) < 2 ? 'middle' : lx > cx ? 'start' : 'end';
    return (
      <g key={`axis-${it.label}`}>
        <line className="radar-axis" x1={cx} y1={cy} x2={x.toFixed(1)} y2={y.toFixed(1)} />
        <text className="radar-label" x={lx.toFixed(1)} y={ly.toFixed(1)} textAnchor={anchor} dominantBaseline="middle">
          {it.label}
        </text>
      </g>
    );
  });

  const metaRing = meta !== undefined ? (() => {
    const rr = (R * meta) / 5;
    const pts = items
      .map((_, i) => {
        const [x, y] = pt(i, rr);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
    return <polygon className="radar-meta" points={pts} />;
  })() : null;

  const dataPts = items
    .map((it, i) => {
      const r = (R * (it.value ?? 0)) / 5;
      const [x, y] = pt(i, r);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  const dots = items.map((it, i) => {
    const r = (R * (it.value ?? 0)) / 5;
    const [x, y] = pt(i, r);
    return <circle key={`dot-${it.label}`} className="radar-dot" cx={x.toFixed(1)} cy={y.toFixed(1)} r={3} />;
  });

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="radar" role="img" aria-label="Gráfico radar de madurez por dimensión">
      {rings}
      {axes}
      {metaRing}
      <polygon className="radar-data" points={dataPts} />
      {dots}
    </svg>
  );
}
