# 007 — Adaptación sectorial del instrumento (ejemplo: salud)

| Campo | Detalle |
|-------|---------|
| **Fecha** | 2026-07-09 |
| **Responsable** | Paulo Villarroel |

## Contexto

Esta decisión es una **adaptación sectorial opcional**: un ejemplo de cómo calibrar el instrumento genérico para un sector concreto, usando la **salud solo como caso ilustrativo**. El MGDE, por ser transversal al Estado, no profundiza en aspectos que en algunos sectores resultan basales. En salud, dos de ellos son la **interoperabilidad semántica** (entender el dato, no solo conectar sistemas) y los **plazos legales de retención de la documentación** con valor legal; y la expectativa de tiempo del cuestionario (~15-20 min) no correspondía a su uso real en reuniones participativas por área. Cualquier institución pública puede aplicar el mismo procedimiento de calibración a las particularidades de su propio sector.

## Decisión

1. **B7.3 (nueva pregunta) + B7 crítica ×1.5**: "Utilizamos y gobernamos estándares semánticos y de terminología sectoriales (p. ej., en salud: HL7 FHIR, SNOMED CT, CIE) para asegurar la consistencia del dato entre las distintas unidades de la institución." La dimensión B7 pasa a crítica por **criticidad sectorial** (se agrega este criterio al de ADR 006): sin estándares semánticos gobernados, el dato consolidado de la organización no es comparable ni utilizable. Las acciones por nivel de B7 incorporan la progresión terminológica (identificar terminologías de hecho → estándares con responsable de gobierno → medir cobertura de codificación → perfiles y mapeos sectoriales mantenidos, p. ej. en salud: perfiles FHIR nacionales). El banco queda en **55 preguntas**.
2. **B9.1 reforzada con retención documental**: el ciclo de vida del dato debe alinearse a los plazos legales de retención de la documentación con valor legal (p. ej., en salud, la ficha clínica: **mínimo 15 años** desde la última atención — **Reglamento sobre Fichas Clínicas, Decreto 41/2012, Ley 20.584**). ⚠️ Queda para validación jurídica confirmar los plazos de las demás series documentales del sector que se evalúe.
3. **Expectativa de tiempo realista**: 45–60 min en reunión de levantamiento por área (15–20 min solo si se responde individualmente), ajustado en portada, README y cuestionario imprimible, para no generar apuro en los equipos consultados.

## Justificación

- La pregunta B7.3 cubre la brecha reconocida del MGDE en semántica del dato; es el punto donde el "estado del arte" sectorial (p. ej., en salud: FHIR/SNOMED/CIE) supera al marco transversal del Estado.
- La retención documental con plazos legales (p. ej., en salud, la ficha clínica) es una obligación sectorial concreta que una tabla de retención genérica puede pasar por alto — anclarla en la pregunta evita autoevaluaciones infladas en B9.
- El tiempo declarado condiciona la disposición de las áreas: subestimarlo produce respuestas apuradas, justo lo contrario del levantamiento a conciencia que busca el instrumento.
