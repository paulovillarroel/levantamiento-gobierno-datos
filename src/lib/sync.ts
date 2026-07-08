// Sincronización opcional con el servidor local de sesiones (SQLite, servidor/servidor.mjs).
// La app funciona igual sin él: esto solo agrega respaldo centralizado cuando el
// facilitador tiene el servidor corriendo en el mismo equipo que sirve la app.
import type { Sesion } from './tipos';

export const PUERTO_BD = 8787;

function base(): string {
  return `${location.protocol}//${location.hostname}:${PUERTO_BD}`;
}

/** fetch con timeout corto: si el servidor no está, la app no debe colgarse. */
async function pedir(ruta: string, init?: RequestInit): Promise<Response | null> {
  try {
    return await fetch(base() + ruta, { ...init, signal: AbortSignal.timeout(1500) });
  } catch {
    return null;
  }
}

/** Sesiones guardadas en la base local, o null si el servidor no responde. */
export async function bajarSesiones(): Promise<Sesion[] | null> {
  const r = await pedir('/api/sesiones');
  if (!r || !r.ok) return null;
  try {
    const j = (await r.json()) as { sesiones?: Sesion[] };
    return Array.isArray(j.sesiones) ? j.sesiones : null;
  } catch {
    return null;
  }
}

/** Sube (upsert) las sesiones; el servidor solo pisa versiones más antiguas. */
export async function subirSesiones(sesiones: Sesion[]): Promise<boolean> {
  const r = await pedir('/api/sesiones', {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ sesiones }),
  });
  return !!r && r.ok;
}

export async function borrarSesionRemota(id: string): Promise<void> {
  await pedir('/api/sesiones/' + encodeURIComponent(id), { method: 'DELETE' });
}

/** Combina sesiones locales y remotas por id; gana la de `actualizada` más reciente. */
export function fusionar(locales: Sesion[], remotas: Sesion[]): Sesion[] {
  const porId = new Map<string, Sesion>();
  for (const s of [...remotas, ...locales]) {
    const previa = porId.get(s.id);
    if (!previa || (s.actualizada ?? '') > (previa.actualizada ?? '')) porId.set(s.id, s);
  }
  return [...porId.values()].sort((a, b) => (a.creada ?? '').localeCompare(b.creada ?? ''));
}
