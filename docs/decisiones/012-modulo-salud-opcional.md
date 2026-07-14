# 012 — Módulo C: preguntas sectoriales de salud (opcional)

| Campo | Detalle |
|-------|---------|
| **Fecha** | 2026-07-14 |
| **Responsable** | Paulo Villarroel |

## Contexto

La generalización del instrumento (ADR 011 y trabajo asociado) llevó el contenido de salud a ejemplos parentéticos (`p. ej., en salud, …`) para que cualquier institución pública pudiera usarlo. Sin embargo, la salud es un **espacio legislativo especial**: al régimen general de la Ley 21.719 se suman deberes propios —el tratamiento reforzado del dato de salud y del perfil biológico (art. 16 bis), la ficha clínica (Ley 20.584 y Reglamento sobre Fichas Clínicas, Decreto 41/2012) y la interoperabilidad clínica—. Se decidió recuperar esas preguntas como una **sección opcional**, activable solo cuando la institución pertenece al sector salud, sin revertir la generalización.

## Decisión

**Módulo C — Sector salud (opcional): 3 dimensiones, 8 preguntas.**

- **C1 Datos de salud y régimen reforzado (crítica ×1.5):** fin sanitario y base de licitud (art. 16 bis), prohibición de usar datos de salud recolectados en ámbitos laboral/educativo/de seguros, medidas reforzadas y NNA.
- **C2 Ficha clínica y derechos del paciente (Ley 20.584):** conservación mínima de 15 años (Decreto 41/2012), acceso y copia coordinados con ARCOP sin duplicar.
- **C3 Interoperabilidad clínica y datos de salud a gran escala:** estándares HL7 FHIR/SNOMED CT/CIE, EIPD previa a tratamientos masivos (art. 15 ter), uso secundario con anonimización.

**Implementación (aditiva, sin revertir la generalización):**

- Campo `sectorSalud: boolean` en `Meta`, activado con un **toggle "🏥 …sector salud"** en la portada (por sesión).
- **Banco condicional:** `componerBanco(sectorSalud)` agrega `MODULO_SALUD` al banco base. Se pasa como **prop** a los componentes; el scoring, el reporte (KPIs/radares/barras generalizados a N módulos), la hoja de ruta, el consolidado y la BD lo incorporan solos, porque todas las funciones de `scoring.ts` y de exportación ya recibían `banco` como parámetro.
- **Por sesión:** cada sesión decide si es de salud; el **consolidado** incluye el Módulo C si *cualquier* sesión lo marca (las que no, muestran esas dimensiones como no respondidas, sin distorsionar promedios).
- El imprimible (`cuestionario.md`) y el extractor del skill (`extraer.mjs`) también componen el banco por sesión.

## Justificación

- **No rompe la generalización:** el banco base (69 preguntas) sigue siendo genérico; el Módulo C es puramente aditivo (77 con salud). Una institución no-salud no ve ni puntúa el módulo.
- **Sin migración:** las sesiones previas sin la marca no incluyen C; el scoring ignora las dimensiones sin respuestas. Verificado con una sesión de salud (77, con C) y una no-salud (69, sin C) contra el mismo banco.
- **Anclaje verificado:** los deberes citados (arts. 16 y 16 bis, Ley 20.584, Decreto 41/2012, art. 15 ter) se contrastaron contra el texto legal (ver la nota de re-verificación de `docs/banco-preguntas.md`).
- **Comparabilidad:** al ser opcional y separado, no altera el puntaje de las instituciones que ya midieron con el banco base.
