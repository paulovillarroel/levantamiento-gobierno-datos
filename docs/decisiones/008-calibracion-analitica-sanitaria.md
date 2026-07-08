# 008 — Calibración analítica sectorial (ejemplo: salud)

| Campo | Detalle |
|-------|---------|
| **Fecha** | 2026-07-09 |
| **Responsable** | Paulo Villarroel |

## Contexto

Segunda parte del ejemplo de adaptación sectorial (tras ADR 007), que sigue usando la **salud como sector ilustrativo** para mostrar cómo calibrar la práctica analítica de una institución con gran volumen de datos sensibles: EIPD, gestión del cambio con los equipos profesionales, linaje en una red de sistemas fragmentada (p. ej., en salud: sistemas locales y plataformas centrales) y el encaje de la Ley 21.719 con normativa sectorial preexistente (p. ej., en salud: Ley 20.584). El mismo razonamiento aplica a cualquier institución pública que trate datos sensibles a gran escala.

## Decisión

1. **A7 (EIPD) pasa a crítica ×1.5.** La ADR 006 la había dejado fuera por "condicional según riesgo" (*borderline*). En una institución que trata datos sensibles a gran escala —como en el ejemplo del sector salud— esa condición se cumple por regla general: el tratamiento masivo y automatizado de datos sensibles (p. ej., en salud: grandes registros nacionales y modelos predictivos) califica como alto riesgo bajo los criterios internacionales y de la SGD. Aplicando el propio criterio de la ADR 006 (deber legal directo que aplica), corresponde marcarla crítica; se elimina el término *borderline* de las notas y la acción →4 explicita que los proyectos de **analítica, ciencia de datos y BI** requieren EIPD como paso obligatorio del ciclo de desarrollo. Con esto el Módulo A queda con 7 dimensiones críticas (A2, A3, A4, A6, A7, A8, A9) y 6 normales.
2. **B10 (cultura/cambio):** la acción →3 incorpora **incentivos a la captura de datos en origen** y la **demostración del valor** del dato bien registrado — una barrera cultural frecuente (p. ej., en salud) es que el registro estructurado se percibe como carga burocrática; mostrar el retorno concreto del dato bien registrado (p. ej., en salud: mejor gestión de la atención de la propia persona) hace subir la calidad (B5) orgánicamente.
3. **B6 (linaje):** la acción →4 pide linaje **automatizado desde los propios pipelines** (transformaciones versionadas en Git, SQL/dbt u otras herramientas del entorno analítico); se agrega nota de que el linaje manual es inviable en una red de sistemas fragmentada.
4. **Notas ⚠️ jurídicas nuevas:**
   - **A6:** en algunos sectores el acceso (p. ej., en salud: la copia de la ficha clínica) y la rectificación ya están regulados por normativa preexistente (p. ej., Ley 20.584); coordinar con las OIRS para que el flujo de la Ley 21.719 unifique —y no duplique— los canales existentes. La acción →3 de A6 recoge lo mismo.
   - **B9:** confirmar con el archivo central si el plazo de retención (p. ej., en salud: 15 años, Decreto 41/2012) aplica de forma homogénea a las bases analíticas históricas o si, tras **anonimización irreversible** (A12, fuera del ámbito de datos personales), pueden conservarse indefinidamente con fines estadísticos y de interés público (práctica recomendada).

## Justificación

- La reclasificación de A7 no es una excepción al criterio de criticidad sino su aplicación consistente: lo que cambió es el juicio fáctico sobre si la condición de alto riesgo se cumple en la institución evaluada (en el ejemplo del sector salud: sí, por regla general).
- Los ajustes de B6 y B10 convierten acciones genéricas de gobernanza en acciones ejecutables en el contexto técnico (pipelines versionados) y cultural (incentivos a la captura en origen) real de la institución.
- Las notas A6/B9 anticipan los dos choques normativos más probables entre la Ley 21.719 y un régimen sectorial preexistente (p. ej., en salud), dejando la pregunta precisa que Jurídico debe responder.
