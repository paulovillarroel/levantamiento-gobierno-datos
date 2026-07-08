# 004 — Acciones concretas por nivel de madurez (plan de acción siempre visible)

| Campo | Detalle |
|-------|---------|
| **Fecha** | 2026-07-09 |
| **Responsable** | Paulo Villarroel |

## Contexto

El objetivo del instrumento es que cada respuesta tenga un **enganche con acciones concretas** para avanzar. La versión inicial tenía una sola `recomendacion` por dimensión, que además solo se mostraba cuando la dimensión era brecha (promedio < 3). Consecuencias: una dimensión en 3.2 no recibía ninguna acción (no había camino de "Definido" a "Gestionado/Optimizado") y la acción no distinguía desde qué nivel se partía (pasar de 1→2 no requiere lo mismo que de 2→3). El playbook de estrategia de datos del BID (Public Digital) resuelve esto con "recomendaciones para elevar el nivel de madurez" **por nivel y por condición**.

## Opciones consideradas

1. **Escalera de acciones por nivel y por dimensión** (`acciones: { n2, n3, n4, n5 }`, la clave = nivel a alcanzar), mostrando en el reporte la acción del nivel actual para **todas** las dimensiones respondidas.
2. Mantener una recomendación única y mostrarla siempre — no distingue el punto de partida.
3. Acciones por **pregunta** (no por dimensión) — máximo detalle, pero triplica el contenido a validar y el reporte se vuelve inmanejable (54 escaleras).

## Decisión

Opción 1:

- `Dimension.recomendacion` → `Dimension.acciones: AccionesNivel` con 4 escalones (→2 Básico, →3 Definido, →4 Gestionado, →5 Optimizado). El texto de la antigua recomendación se conservó como escalón →3 (era el paso de formalización).
- Nueva función `proximoPaso(dim, promedio)`: redondea el promedio al nivel 1–5 y devuelve la acción del escalón siguiente; en nivel 5 devuelve una indicación de mantención.
- La tarjeta "Brechas priorizadas" pasa a ser **"Plan de acción: próximo paso por dimensión"**, con dos grupos: *Prioritarias* (promedio < 3, orden ascendente, críticas primero en empates) y *Para seguir subiendo de nivel* (resto). Cada bloque muestra nivel actual → siguiente nivel + acción.
- Las brechas del **Consolidado** usan el mismo mecanismo sobre el promedio institucional.
- Los **CSV** (por sesión y consolidado) incorporan columnas `Nivel_Siguiente` y `Proxima_Accion`, para que el plan viaje con el dato exportado.
- El espejo `docs/banco-preguntas.md` documenta las 4 acciones por dimensión (92 textos) para la validación de Jurídico/DPO.

## Justificación

- **El diagnóstico se vuelve accionable en todo el rango**: siempre hay un "qué hacer ahora", no solo bajo el umbral de brecha; es el mecanismo del playbook BID adaptado a la escala 1–5 / MGDE del instrumento.
- **Granularidad por dimensión** (no por pregunta): mantiene el contenido validable (~92 textos) y el reporte legible.
- Los escalones →2 se redactaron como primeros pasos de bajo costo; →3 conserva la formalización de la Guía SGD/MGDE; →4 introduce medición y control; →5 mejora continua y anticipación — consistente con las anclas de la escala.
