# 002 — Migración del stack a Astro + React + TypeScript

| Campo | Detalle |
|-------|---------|
| **Fecha** | 2026-07-08 |
| **Responsable** | Paulo Villarroel |

## Contexto

La decisión [001](001-formato-escala-y-alcance.md) definió el entregable como un **único `index.html` autónomo** (CSS/JS inline, sin build). Al confirmarse que la herramienta se ejecutará y mantendrá **en local**, se prefiere un stack con build, tipado fuerte y componentes, en línea con el resto del equipo. Esto reemplaza la parte de *formato de implementación* de la decisión 001 (la escala, el alcance y el diseño de contenido se mantienen sin cambios).

## Opciones consideradas

1. **Mantener `index.html` único** — máxima portabilidad (doble clic), pero difícil de mantener (banco de ~53 preguntas + lógica + estilos en un solo archivo) y sin tipado.
2. **Astro + React (islas) + TypeScript** — build estático, banco de preguntas tipado, componentes reutilizables; React coincide con el stack del equipo (`flowy` usa React 19).
3. **Astro + Preact / TS vanilla** — más liviano, pero menor alineación con el equipo.

## Decisión

**Astro 5 + React 19 (isla `client:only`) + TypeScript estricto.** El banco de preguntas y la escala viven tipados en `src/data/banco.ts`; la lógica de puntaje en `src/lib/scoring.ts`; la persistencia (localStorage, export/import JSON/CSV) en `src/lib/persistencia.ts`. La UI se compone de `App`, `Portada`, `Cuestionario`, `Resultados`, `Radar` y `Leyenda`.

## Justificación

- **Mantenibilidad y tipado:** el banco tipado evita errores al editar preguntas/pesos; la lógica queda en funciones puras testeables.
- **Alineación con el equipo:** React 19 ya se usa en `flowy`; TypeScript es transversal.
- **Se conserva la privacidad:** el sitio es 100% estático y toda la interacción ocurre en el cliente; ningún dato sale del equipo (igual que en 001).
- **Costo asumido:** ahora se requiere `npm install` + build en vez de abrir un archivo. Aceptable dado que la herramienta se ejecuta en local por el equipo de datos. Para distribuir a usuarios finales se entrega el build estático (`dist/`).
