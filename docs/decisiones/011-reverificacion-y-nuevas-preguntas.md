# 011 — Re-verificación normativa y nuevas preguntas (cesiones, IA generativa, datos abiertos, uso de analítica)

| Campo | Detalle |
|-------|---------|
| **Fecha** | 2026-07-13 |
| **Responsable** | Paulo Villarroel |

## Contexto

Antes de publicar el repositorio como opensource genérico, el banco se **re-verificó contra los textos oficiales completos** de sus fuentes: la Ley 19.628 reformada por la Ley 21.719 (XML LeyChile, versión vigente al 1-12-2026), la síntesis BCN (Informe 12-25), la Guía Práctica SGD, la Guía Técnica MGDE (act. 29-11-2024, incl. la matriz del Anexo N° 1), el RAT publicado por la SGD, la Guía de Anonimización (v.1, 20-03-2025), el Decreto 10/2023, la Política Nacional de IA (D.S. 12/2024 MinCiencia) y las fuentes del CPLT. El detalle de las correcciones quedó en la nota **"Re-verificación (2026-07-13)"** de `docs/banco-preguntas.md`. Esa revisión, más el análisis de cobertura contra el estado del arte (DAMA-DMBOK, DCAM, dimensiones MGDE), dejó a la vista cuatro brechas de cobertura.

## Decisión

Se agregan **5 preguntas** (64 → **69**; A: 37 · B: 32):

1. **A14 Cesiones y compartición con otros organismos (nueva dimensión, 2 preguntas, peso 1):** cesiones identificadas y amparadas en convenios que fijan finalidad y condiciones + **publicación mensual de los convenios en el sitio web** (art. 22, inciso final — deber legal verificado contra el texto, sin cobertura previa). La cesión a otro *responsable* es una figura distinta del *encargo* (A10). No se marca crítica: es condicional a la existencia de cesiones (mismo criterio de ADR 006 para A10/A11). Los requerimientos de tribunales/fiscalías quedan como protocolo en la escalera (ejemplo literal de la Guía SGD, Instrumento N° 3).
2. **B12.4 — uso de herramientas de IA de propósito general por el personal:** lineamientos que resguarden datos personales e información institucional (*shadow AI*: pegar datos personales en un LLM externo equivale a un encargo sin DPA + transferencia internacional + brecha potencial; ancla con A8/A10/A11).
3. **B4.3 — publicación de datos abiertos con salvaguardas de anonimización:** cierra la única dimensión MGDE que la tabla de correspondencia marcaba "parcial" (Datos abiertos).
4. **B10.3 — uso efectivo de productos de datos** (indicadores, tableros, informes) en la gestión y decisiones: completa la dimensión "Analítica e IN" de DAMA/MGDE, que solo se medía por el gobierno de modelos (B12) y la promoción del uso (B10.1).

Además, la **Portada** incorpora un aviso de **uso referencial**: el formulario apoya el diagnóstico y el desarrollo del gobierno de datos institucional, no constituye asesoría legal, y se sugiere su validación por el equipo jurídico de cada institución (al menos en los puntos ⚠️).

## Justificación

- El scoring, el reporte, la hoja de ruta y la base SQLite son **dinámicos** sobre el banco (iteran `BANCO`; las sesiones se guardan como JSON por id de pregunta), por lo que las adiciones no requieren migración: las sesiones anteriores muestran las preguntas nuevas como pendientes.
- Se agregan ahora —antes de publicar y pilotear— para no romper la **comparabilidad** de mediciones futuras.
- Se mantiene el criterio de instrumento **liviano** (ADR 001): se descartó agregar el detalle ítem por ítem del art. 14 ter, videovigilancia, cookies u otras sub-preguntas de protocolo, que pertenecen a la fase de instrumentos (Guía SGD, Instrumento N° 3), no al diagnóstico inicial.
