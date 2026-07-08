# 003 — Levantamiento por sesiones (áreas/departamentos) y consolidado institucional

| Campo | Detalle |
|-------|---------|
| **Fecha** | 2026-07-09 |
| **Responsable** | Paulo Villarroel |

## Contexto

El levantamiento no será un único reporte: se harán **varias reuniones con distintas áreas y departamentos** de la institución, cada una respondiendo el mismo formulario. La versión inicial guardaba **un solo avance** en `localStorage` (clave `autoeval-madurez-v1`), por lo que un facilitador que atendiera a dos áreas desde el mismo equipo sobrescribía la primera con la segunda. Tampoco existía una vista que combinara los resultados de varias áreas para conocer el estado de la institución completa, alineado con el paso de "hoja de ruta" del playbook de estrategia de datos del BID (consolidar resultados por dimensión antes de priorizar acciones).

## Opciones consideradas

1. **Sesiones múltiples en el navegador + vista consolidada local** — cada reunión es una "sesión" (meta + respuestas) guardada en `localStorage`; el consolidado se calcula en el navegador a partir de las sesiones locales y de JSON importados de otras áreas.
2. **Mantener un solo avance y consolidar a mano** — exportar un JSON/CSV por área y combinarlos en Excel/planilla externa.
3. **Backend central** que reciba las respuestas de cada área — descartado: rompe la premisa de privacidad ("ninguna respuesta sale del equipo") y requiere infraestructura y permisos.

## Decisión

Opción 1:

- Nuevo almacenamiento **v2** (`autoeval-madurez-v2`): lista de sesiones `{ id, meta, respuestas, creada, actualizada }` + sesión activa. El avance v1 existente **se migra automáticamente** como primera sesión.
- **Portada** con administración de sesiones: lista con avance por sesión, crear nueva sesión, abrir y eliminar (con confirmación). La importación de un JSON crea una **sesión nueva** (ya no sobrescribe).
- Campo nuevo en la meta de cada sesión: **participantes de la reunión** (queda en el reporte impreso, útil como registro del levantamiento).
- Vista **Consolidado**: matriz dimensión × área con semáforo por nivel, promedio institucional por dimensión/módulo (promedio simple entre áreas), brechas transversales priorizadas con su recomendación, cobertura del levantamiento (sesiones pendientes/parciales/completas), export a **CSV consolidado** e impresión.

## Justificación

- **Refleja el proceso real**: una reunión por área, avance parcial que se retoma, y un panorama institucional que crece a medida que se suman sesiones.
- **Sin cambiar la premisa de privacidad**: todo sigue en el navegador; el traspaso entre equipos ocurre por archivos JSON que cada área decide compartir.
- **Promedio simple entre áreas** (no ponderado por tamaño de área): con pocas sesiones cualquier ponderación sería arbitraria; el CSV consolidado permite recalcular con otra ponderación si se necesita.
- Las sesiones **sin respuestas se excluyen** del consolidado pero se listan como pendientes: sirven para planificar las reuniones que faltan.
