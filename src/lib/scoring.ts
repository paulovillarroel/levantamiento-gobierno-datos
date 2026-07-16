// Lógica de cálculo de puntajes de madurez. Funciones puras sobre `Respuestas`.
import type { AccionesNivel, Banco, Dimension, Modulo, NivelInfo, Respuestas, Valor } from './tipos';
import { ESCALA } from '../data/banco.ts';

/** Promedio (1..5) de las preguntas respondidas con nivel de una dimensión, o null si no hay ninguna. */
export function promedioDim(dim: Dimension, r: Respuestas): number | null {
  const vals = dim.preguntas
    .map((p) => r[p.id])
    .filter((v): v is Extract<Valor, number> => typeof v === 'number');
  if (vals.length === 0) return null;
  return vals.reduce((a, b) => a + b, 0) / vals.length;
}

/** Promedio ponderado (por peso de dimensión) de un módulo, o null si no hay datos. */
export function promedioModulo(mod: Modulo, r: Respuestas): number | null {
  let num = 0;
  let den = 0;
  for (const d of mod.dimensiones) {
    const m = promedioDim(d, r);
    if (m !== null) {
      num += m * d.peso;
      den += d.peso;
    }
  }
  return den ? num / den : null;
}

/** Promedio ponderado global sobre todas las dimensiones de todos los módulos. */
export function promedioGlobal(banco: Banco, r: Respuestas): number | null {
  let num = 0;
  let den = 0;
  for (const mod of banco.modulos) {
    for (const d of mod.dimensiones) {
      const m = promedioDim(d, r);
      if (m !== null) {
        num += m * d.peso;
        den += d.peso;
      }
    }
  }
  return den ? num / den : null;
}

/** Promedio simple de una lista de promedios, ignorando los nulos (p. ej. entre áreas). */
export function promedioLista(vals: (number | null)[]): number | null {
  const xs = vals.filter((v): v is number => v !== null);
  if (xs.length === 0) return null;
  return xs.reduce((a, b) => a + b, 0) / xs.length;
}

/** Nivel de madurez (1..5) para un promedio, redondeando al entero más cercano. */
export function nivelDe(m: number | null): NivelInfo {
  if (m === null) return { v: null, nombre: 'Sin datos', color: 'var(--muted)', mgde: 'Sin datos' };
  const v = Math.max(1, Math.min(5, Math.round(m)));
  const e = ESCALA[v - 1]!;
  return { v: e.v, nombre: e.nombre, color: e.color, mgde: e.mgde };
}

/** Equivalencia con los 4 niveles del MGDE. */
export function mgdeDe(m: number | null): string {
  if (m === null) return 'Sin datos';
  if (m < 1.5) return 'Insuficiente';
  if (m < 2.5) return 'Básico';
  if (m < 3.5) return 'Medio';
  return 'Avanzado';
}

/** Color (variable CSS) asociado al promedio. */
export function colorDe(m: number | null): string {
  if (m === null) return 'var(--muted)';
  return ESCALA[Math.max(1, Math.min(5, Math.round(m))) - 1]!.color;
}

/** Cantidad de preguntas con alguna respuesta (incluye "No sé" y "No aplica"). */
export function contarRespondidas(banco: Banco, r: Respuestas): number {
  let n = 0;
  for (const mod of banco.modulos) {
    for (const d of mod.dimensiones) {
      for (const p of d.preguntas) {
        if (r[p.id] !== undefined) n++;
      }
    }
  }
  return n;
}

export interface ProximoPaso {
  /** Nivel de madurez que se busca alcanzar (2..5), o null cuando ya se está en 5. */
  objetivo: 2 | 3 | 4 | 5 | null;
  texto: string;
}

/** Acción concreta para subir al siguiente nivel, según el promedio actual de la dimensión. */
export function proximoPaso(dim: Dimension, m: number | null): ProximoPaso | null {
  if (m === null) return null;
  const v = Math.max(1, Math.min(5, Math.round(m)));
  if (v >= 5) {
    return {
      objetivo: null,
      texto: 'Mantener el nivel: revisar periódicamente que la práctica siga vigente, seguir midiéndola y compartirla como referencia con otras áreas.',
    };
  }
  const objetivo = (v + 1) as 2 | 3 | 4 | 5;
  return { objetivo, texto: dim.acciones[('n' + objetivo) as keyof AccionesNivel] };
}

export interface ItemPlan {
  modId: string;
  dim: Dimension;
  promedio: number;
  paso: ProximoPaso;
  /** true si el nivel (promedio redondeado) queda bajo 3 ("Definido"). */
  esBrecha: boolean;
}

/**
 * Plan de acción sobre todas las dimensiones con promedio: primero las brechas
 * (nivel bajo 3) de menor a mayor promedio (críticas primero en empates), luego el resto.
 * La condición de brecha usa el mismo redondeo que `nivelDe` para que la agrupación
 * coincida con la etiqueta de nivel que ve el usuario. `promedioDe` permite construir
 * el plan tanto para una sesión como para el consolidado entre áreas.
 */
export function planDeAccionSobre(banco: Banco, promedioDe: (dim: Dimension) => number | null): ItemPlan[] {
  const out: ItemPlan[] = [];
  for (const mod of banco.modulos) {
    for (const d of mod.dimensiones) {
      const m = promedioDe(d);
      if (m === null) continue;
      const paso = proximoPaso(d, m);
      if (!paso) continue;
      out.push({ modId: mod.id, dim: d, promedio: m, paso, esBrecha: (nivelDe(m).v ?? 5) < 3 });
    }
  }
  out.sort((a, b) =>
    a.esBrecha !== b.esBrecha
      ? (a.esBrecha ? -1 : 1)
      : a.promedio - b.promedio || (b.dim.critica ? 1 : 0) - (a.dim.critica ? 1 : 0)
  );
  return out;
}

/** Plan de acción de una sesión (ver `planDeAccionSobre`). */
export function planDeAccion(banco: Banco, r: Respuestas): ItemPlan[] {
  return planDeAccionSobre(banco, (d) => promedioDim(d, r));
}

export type Horizonte = '0-12' | '12-24' | '24-36';

/**
 * Horizonte sugerido de la hoja de ruta: brechas críticas primero (0-12 meses,
 * deberes legales basales que deben quedar en nivel 3), luego el resto de las
 * brechas (12-24) y finalmente subir de nivel lo ya definido (24-36).
 */
export function horizonteDe(item: ItemPlan): Horizonte {
  if (item.esBrecha && item.dim.critica) return '0-12';
  if (item.esBrecha) return '12-24';
  return '24-36';
}

/** Quick win: brecha donde ya existe práctica informal (promedio ≥ 2) — formalizar es rápido. */
export function esQuickWin(item: ItemPlan): boolean {
  return item.esBrecha && item.promedio >= 2;
}

/** Proyecto estructural: dimensión crítica que parte desde el nivel Inicial (< 2). */
export function esEstructural(item: ItemPlan): boolean {
  return item.esBrecha && item.dim.critica && item.promedio < 2;
}

export type TipoPendiente = 'Sin responder' | 'No sé' | 'No aplica';

export interface Pendiente {
  modId: string;
  dim: Dimension;
  pregunta: { id: string; texto: string };
  tipo: TipoPendiente;
}

/** Preguntas sin responder o marcadas como "No sé" / "No aplica" (no se promedian). */
export function pendientes(banco: Banco, r: Respuestas): Pendiente[] {
  const out: Pendiente[] = [];
  for (const mod of banco.modulos) {
    for (const d of mod.dimensiones) {
      for (const p of d.preguntas) {
        const v = r[p.id];
        if (v === undefined) out.push({ modId: mod.id, dim: d, pregunta: p, tipo: 'Sin responder' });
        else if (v === 'ns') out.push({ modId: mod.id, dim: d, pregunta: p, tipo: 'No sé' });
        else if (v === 'na') out.push({ modId: mod.id, dim: d, pregunta: p, tipo: 'No aplica' });
      }
    }
  }
  return out;
}

/** Cuenta de pendientes por tipo (para el resumen del reporte). */
export function contarPendientes(banco: Banco, r: Respuestas): Record<TipoPendiente, number> {
  const acc: Record<TipoPendiente, number> = { 'Sin responder': 0, 'No sé': 0, 'No aplica': 0 };
  for (const p of pendientes(banco, r)) acc[p.tipo]++;
  return acc;
}

/** Formatea un promedio para mostrar (una decimal, o "—"). */
export function fmt(m: number | null): string {
  return m === null ? '—' : m.toFixed(1);
}
