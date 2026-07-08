# 009 — Activos estratégicos, gobierno de IA, adopción efectiva, preguntas atómicas y hoja de ruta 12/24/36

| Campo | Detalle |
|-------|---------|
| **Fecha** | 2026-07-09 |
| **Responsable** | Paulo Villarroel |

## Contexto

Tercera revisión externa del banco, con cuatro observaciones: (1) el MGDE insiste en los **datos como activo estratégico** pero el cuestionario no preguntaba si los datos críticos están identificados/priorizados; (2) falta una dimensión de **gobierno de modelos de IA**, no porque hoy exista mucha IA sino porque los marcos formales ya apuntan allá; (3) hay preguntas que mezclan dos o tres capacidades (p. ej. A8.1 con mínimo privilegio + cifrado + logs: ¿qué responde quien tiene logs pero no cifrado?), lo que daña la consistencia estadística; (4) falta medir **adopción real** — políticas excelentes que nadie usa (gobernanza documental vs. real). Además, de la lista de salidas esperadas (radar, mapa de calor, comparación entre áreas — ya existentes) faltaban la **priorización quick wins vs. estructurales** y la **hoja de ruta a 12/24/36 meses generada automáticamente**.

## Decisión

1. **B3.3 (nueva):** "Los datos críticos de la institución están identificados y priorizados como activos estratégicos" — principio central del MGDE; las acciones →2/→3 de B3 incorporan el inventario priorizado.
2. **B12 Gobierno de modelos analíticos e IA (nueva dimensión, 3 preguntas, peso 1):** inventario con responsable / documentación por modelo / monitoreo en operación. Anclaje formal verificado: la Ley 21.719 regula decisiones automatizadas y perfilamiento (la matriz SGD exige registrarlas con "información significativa sobre la lógica aplicada"); la **Política Nacional de IA, actualización 2024 (D.S. 12/2024 MinCiencia)** con eje de "Gobernanza y ética"; y las **Recomendaciones sobre Transparencia Algorítmica** del CPLT (Res. Ex. N° 372/2024, elaboradas y piloteadas con GobLab UAI), en adopción voluntaria por los servicios. No se marca crítica: es una capacidad emergente, no un deber basal actual.
3. **B11 Adopción y cumplimiento efectivo (nueva dimensión, 2 preguntas, peso 1):** políticas aplicadas efectivamente en el trabajo diario + decisiones del comité implementadas con seguimiento. Mide gobernanza real, no documental.
4. **Preguntas atómicas (criterio de redacción nuevo, documentado en el banco):** una capacidad por afirmación. Se dividieron **A8.1 → A8.1 (mínimo privilegio) + A8.2 (cifrado) + A8.3 (logs)**, quedando el diseño/por defecto como A8.4, y **B7.1 → B7.1 (arquitectura/modelos) + B7.2 (datos maestros con fuente autorizada)**, corriendo interoperabilidad a B7.3 y semántica sectorial a B7.4. Candidatas para la próxima pasada: B8.1, A13.2, B6.1. El banco queda en **64 preguntas** (A: 35 · B: 29).
5. **Hoja de ruta 12/24/36 meses** (componente `HojaRuta`, en Resultados y Consolidado): generada desde el plan de acción con la heurística — 0–12 meses: brechas críticas; 12–24: demás brechas; 24–36: subir de nivel lo ya definido. Etiquetas: **quick win** (brecha con promedio ≥ 2: ya existe práctica informal, formalizar es rápido) y **estructural** (crítica partiendo del nivel Inicial: requiere proyecto con recursos). Se declara explícitamente como priorización sugerida que el Comité debe ajustar por impacto y capacidad.

## Consecuencias

- ⚠️ **Renumeración de A8 y B7**: sesiones o JSON exportados **antes de este cambio** tienen respuestas de `A8.2` y `B7.2`/`B7.3` que ahora corresponden a otras preguntas. Como el instrumento aún no entra en uso formal (validación jurídica pendiente), se optó por la numeración limpia; las sesiones de prueba previas deben descartarse o re-responderse en A8 y B7.
- Las salidas esperadas del instrumento quedan completas: radar con meta, mapa de calor dimensión × área, comparación entre áreas, brechas priorizadas, plan de acción por nivel y hoja de ruta 12/24/36 con quick wins.
