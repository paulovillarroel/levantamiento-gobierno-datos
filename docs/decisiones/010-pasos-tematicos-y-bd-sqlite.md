# 010 — Cuestionario por pasos temáticos, autoguardado visible y base SQLite local opcional

| Campo | Detalle |
|-------|---------|
| **Fecha** | 2026-07-09 |
| **Responsable** | Paulo Villarroel |

## Contexto

De cara a las reuniones de levantamiento: (1) mostrar las 64 preguntas en una sola página abruma al encuestado; (2) quien responde debe poder hacerlo **en varios momentos** con la confianza de que nada se pierde; (3) el facilitador (que lidera el proceso desde su equipo) necesita que las sesiones queden **centralizadas en una base de datos** en su máquina, manteniendo el JSON como vía para respuestas individuales aisladas.

## Decisión

1. **Cuestionario por pasos temáticos:** una **dimensión por pantalla** (25 bloques), con navegador de chips (A1…B12) que marca cada bloque como completo / parcial / pendiente y permite saltar, botones Anterior/Siguiente y "Ver resultados" al final. Al abrir una sesión, el cuestionario **retoma en el primer bloque pendiente**. Se eligió el paso por dimensión (no por módulo) porque las dimensiones *son* los bloques temáticos y producen sensación de avance (2–4 preguntas por paso).
2. **Autoguardado visible:** el guardado automático por respuesta ya existía (localStorage); se agregó el indicador **"✓ guardado HH:MM"** en la barra de progreso y la explicación en la portada, porque la confianza para pausar/retomar depende de que el guardado sea visible, no solo real.
3. **Servidor local con SQLite (opcional):** `npm run servidor` levanta `servidor/servidor.mjs` (puerto 8787) usando **`node:sqlite` integrado en Node ≥ 23.4 — cero dependencias nuevas**. API mínima (`/api/salud`, GET/PUT `/api/sesiones`, DELETE `/api/sesiones/:id`) con CORS abierto y upsert *last-write-wins* por sesión (campo `actualizada`). La base queda en `datos/levantamiento.sqlite` (**gitignored**: son datos).
4. **Sincronización automática y opcional en la app** (`src/lib/sync.ts`): al cargar, la app prueba el servidor en el **mismo host** en que se sirve (funciona en localhost y cuando otros abren la app por IP en la red local), fusiona sesiones locales y remotas (gana la más reciente por sesión) y sube los cambios en cada autoguardado; indicador en la barra superior ("● BD conectada" / "○ solo este equipo"). Timeouts cortos (1.5 s): sin servidor, nada se bloquea y la app queda exactamente como antes.
5. **El export/import JSON se mantiene** como flujo para respuestas aisladas: quien responde fuera de la red exporta su JSON, el facilitador lo importa y queda en la base en la siguiente sincronización.

## Alternativas descartadas

- **Backend con Astro en modo server** — rompería el deploy estático (GitHub Pages) y acoplaría la app al servidor; el servidor separado mantiene la app 100 % estática.
- **sql.js / SQLite en el navegador (WASM)** — no resuelve la centralización (seguiría por navegador) y agrega dependencia pesada.
- **Borrado con tombstones** — se optó por DELETE directo; caso borde conocido: si se elimina una sesión con el servidor caído, reaparecerá en la próxima sincronización (basta eliminarla de nuevo con el servidor arriba).

## Consecuencias

- El flujo del facilitador queda: `npm run dev -- --host` + `npm run servidor` en su equipo; los encuestados abren la app por IP y sus sesiones quedan en el SQLite del facilitador.
- La base es una tabla simple (`sesiones(id, data JSON, actualizada)`): consultable directamente con cualquier cliente SQLite para análisis posteriores.
- Precaución de red: el servidor acepta escrituras de cualquier origen; usarlo en redes de confianza (reunión/VPN institucional) y detenerlo al terminar.
