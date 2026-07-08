// Servidor local opcional para centralizar las sesiones del levantamiento en SQLite.
// Corre en el equipo de quien facilita el proceso: `npm run servidor`.
// La app lo detecta sola en el puerto 8787 (mismo host) y sincroniza las sesiones;
// si no está corriendo, todo sigue funcionando solo con el navegador + export JSON.
//
// Sin dependencias: usa el SQLite integrado de Node (node:sqlite, Node ≥ 23.4).
// La base queda en datos/levantamiento.sqlite (carpeta ignorada por git: son DATOS).
import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
import { createServer } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const PUERTO = Number(process.env.PUERTO ?? 8787);
const dirDatos = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'datos');
mkdirSync(dirDatos, { recursive: true });
const rutaBD = path.join(dirDatos, 'levantamiento.sqlite');

const db = new DatabaseSync(rutaBD);
db.exec(`
  PRAGMA journal_mode = WAL;
  CREATE TABLE IF NOT EXISTS sesiones (
    id          TEXT PRIMARY KEY,
    data        TEXT NOT NULL,   -- la sesión completa (meta + respuestas) como JSON
    actualizada TEXT NOT NULL
  );
`);

// Upsert que solo pisa si la versión que llega es más nueva (last-write-wins por sesión).
const upsert = db.prepare(`
  INSERT INTO sesiones (id, data, actualizada) VALUES (?, ?, ?)
  ON CONFLICT(id) DO UPDATE SET data = excluded.data, actualizada = excluded.actualizada
  WHERE excluded.actualizada > sesiones.actualizada
`);
const listar = db.prepare('SELECT data FROM sesiones ORDER BY actualizada');
const contar = db.prepare('SELECT COUNT(*) AS n FROM sesiones');
const borrar = db.prepare('DELETE FROM sesiones WHERE id = ?');

function responder(res, codigo, cuerpo) {
  res.writeHead(codigo, {
    'content-type': 'application/json; charset=utf-8',
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, PUT, DELETE, OPTIONS',
    'access-control-allow-headers': 'content-type',
  });
  res.end(JSON.stringify(cuerpo));
}

function leerCuerpo(req) {
  return new Promise((resolve, reject) => {
    let datos = '';
    req.on('data', (c) => {
      datos += c;
      if (datos.length > 10_000_000) { reject(new Error('demasiado grande')); req.destroy(); }
    });
    req.on('end', () => resolve(datos));
    req.on('error', reject);
  });
}

const servidor = createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  try {
    if (req.method === 'OPTIONS') return responder(res, 204, {});

    if (req.method === 'GET' && url.pathname === '/api/salud') {
      return responder(res, 200, { ok: true, sesiones: contar.get().n });
    }

    if (req.method === 'GET' && url.pathname === '/api/sesiones') {
      const sesiones = listar.all().map((f) => JSON.parse(f.data));
      return responder(res, 200, { sesiones });
    }

    if (req.method === 'PUT' && url.pathname === '/api/sesiones') {
      const cuerpo = JSON.parse(await leerCuerpo(req));
      const sesiones = Array.isArray(cuerpo?.sesiones) ? cuerpo.sesiones : [];
      let guardadas = 0;
      for (const s of sesiones) {
        if (s && typeof s.id === 'string' && typeof s.actualizada === 'string') {
          upsert.run(s.id, JSON.stringify(s), s.actualizada);
          guardadas++;
        }
      }
      return responder(res, 200, { ok: true, guardadas, total: contar.get().n });
    }

    if (req.method === 'DELETE' && url.pathname.startsWith('/api/sesiones/')) {
      const id = decodeURIComponent(url.pathname.slice('/api/sesiones/'.length));
      borrar.run(id);
      return responder(res, 200, { ok: true, total: contar.get().n });
    }

    return responder(res, 404, { ok: false, error: 'ruta desconocida' });
  } catch (e) {
    return responder(res, 400, { ok: false, error: String(e?.message ?? e) });
  }
});

servidor.listen(PUERTO, '0.0.0.0', () => {
  console.log(`Servidor de sesiones (SQLite) escuchando en el puerto ${PUERTO}`);
  console.log(`Base de datos: ${rutaBD} (${contar.get().n} sesiones guardadas)`);
  console.log('La app lo detecta automáticamente; deténgalo con Ctrl+C.');
});
