# Referencias para el análisis de consultoría — marco normativo y de madurez

> Base de evidencia formal para interpretar los resultados del levantamiento. Cada juicio del informe debe
> anclarse en (a) un dato de las respuestas **y** (b) una referencia de este documento o de
> `docs/banco-preguntas.md`. Todo lo aquí contenido fue contrastado con las fuentes citadas; no agregar
> normativa de memoria — si falta algo, verificarlo antes de citarlo.

## 1. Marco normativo chileno (qué implica para el análisis)

### Ley 21.719 — Protección de Datos Personales
- **Fuente:** texto oficial BCN — https://www.bcn.cl/leychile/navegar?idNorma=1209272 · Síntesis BCN (Informe 12-25) — https://obtienearchivo.bcn.cl/obtienearchivo?id=repositorio/10221/37137/1/Informe_12_25_Ley_Datos_Personales_rev.pdf
- **Vigencia: 1-dic-2026**; crea la Agencia de Protección de Datos Personales (fiscalización). Todo hallazgo en dimensiones críticas del Módulo A se lee contra esta fecha.
- Deberes verificados que anclan el análisis: **información y transparencia (art. 14 ter** — checklist que la Guía SGD usa para el informe de hallazgos; el "Catálogo" cumple sus letras d, i, j; el **RAT no es obligación expresa**); **seguridad (art. 14 quinquies)**; **brechas (art. 14 sexies** — notificación "por los medios más expeditos posibles y sin dilaciones indebidas", **sin plazo de 72 h** (eso es RGPD), comunicación a titulares si afecta datos sensibles, de menores de 14 años o económico-financieros); **EIPD (art. 15 ter)**; **consentimiento (art. 12)**; **DPO voluntario (art. 50**, con cargo a dotación vigente, art. quinto transitorio); **modelo de prevención de infracciones (arts. 49–52**, certificable por 3 años); regula **decisiones automatizadas y perfilamiento** (la matriz SGD exige registrarlas con "información significativa sobre la lógica aplicada"); **cesión y comunicación de datos entre organismos (art. 22)** — el órgano receptor no puede usar los datos para fines distintos y el órgano debe **publicar mensualmente en su web los convenios de cesión** suscritos (ancla A14, verificado contra el texto legal).

### Ruta oficial de implementación (Guía SGD, Ministerio de Hacienda)
- **Fuente:** https://wikiguias.digital.gob.cl/datos-personales/guia-practica-implementacion-nueva-ley-datos-personales
- **Cronograma:** primeros pasos (dic 2025–ene 2026: Acción N°1 designar encargado priorizando gestión; N°2 constituir proyecto con acta y carta Gantt; N°3 comunicación interna) → levantamiento (ene–abr 2026) → informe de hallazgos y Comité Ejecutivo (abr 2026; representante de jefatura + encargado como secretaría técnica + jurídica + TI + control de gestión + áreas críticas; ~2 sesiones/mes) → Catálogo (may–jun) → Política de tratamiento (jul) → protocolos por riesgo (ago–nov 2026).
- **Uso en el análisis:** comparar el estado real contra dónde "debería" ir la institución según este calendario; una institución que en fecha de análisis no ha ejecutado los primeros pasos está atrasada respecto de la ruta de Hacienda — decirlo con esa referencia, no como opinión.
- La secuencia de la guía ("partir por lo organizativo — comités, políticas — y acercarse poco a poco a lo técnico") es también la **regla de dependencias** para ordenar recomendaciones.

### MGDE — Marco de Gestión de Datos del Estado
- **Fuente:** https://wikiguias.digital.gob.cl/guias/Gu%C3%ADa_MGDE
- 12 dimensiones · 52 preguntas · puntaje 0/2/4/6 · niveles por porcentaje: <40% Insuficiente · 40–59% Básico · 60–79% Medio · ≥80% Avanzado. La correspondencia con este instrumento está en `docs/banco-preguntas.md` (equivalencia por etiqueta, no por puntaje).
- Principios clave citables: los **datos como activo estratégico**; el nivel objetivo lo define cada institución según sus necesidades, pero para instituciones con **gran volumen de datos y altas exigencias de seguridad y privacidad** (p. ej., salud) **el nivel esperable es Avanzado**; con la autoevaluación y el nivel deseado se construye la hoja de ruta.

### Otras normas del análisis
- **Ley 21.180 (Transformación Digital) + Decreto 7/2023** (Norma Técnica de Seguridad de la Información y Ciberseguridad): referencia que la propia Guía SGD indica para la política de seguridad (dimensión A8).
- **Decreto 10/2023** (documentos y expedientes electrónicos): B9 — https://www.bcn.cl/leychile/navegar?idNorma=1195123
- **Documentación con plazos legales de retención (ejemplo sectorial, salud):** Ley 20.584 + Decreto 41/2012 (Reglamento sobre Fichas Clínicas) — la ficha clínica se conserva **mínimo 15 años** desde la última atención, y su acceso y rectificación ya están regulados sectorialmente; cuando una norma sectorial imponga plazos de retención o vías de acceso propias, coordinar y no duplicar con los flujos ARCOP de la 21.719 — https://www.bcn.cl/leychile/navegar?idNorma=1046753
- **Política Nacional de IA (actualización 2024, D.S. 12/2024 MinCiencia)** — eje gobernanza y ética — https://www.minciencia.gob.cl/areas/inteligencia-artificial/politica-nacional-de-inteligencia-artificial/
- **Transparencia algorítmica (CPLT + GobLab UAI):** Recomendaciones sobre Transparencia Algorítmica (Res. Ex. N° 372/2024 CPLT, D.O. 30-08-2024), de adopción voluntaria; repositorio de algoritmos públicos — https://www.consejotransparencia.cl/organismos-publicos-avanzan-en-transparencia-algoritmica-siguiendo-recomendaciones-del-cplt/
- **Transferencias internacionales (A11):** las cláusulas contractuales modelo las aprueba la **Agencia** (arts. 27-28, verificado contra el texto legal); la referencia de la Guía SGD a las CCM del Ministerio de Economía es transitoria.
- **Datos abiertos (B4.3):** política de datos abiertos del Estado (portal datos.gob.cl) y transparencia activa; publicar con salvaguardas de **anonimización** (cruza con A12). Verificar el instrumento normativo vigente antes de citarlo como deber concreto.
- **IA generativa / uso de LLMs por el personal (B12.4):** sin norma específica; el riesgo se ancla en los deberes de **seguridad (art. 14 quinquies)**, **encargados (art. 15 bis** — pegar datos personales en un LLM externo equivale a un encargo sin contrato) y **transferencia internacional (arts. 27-28)**, más la Política Nacional de IA (eje "Gobernanza y ética").

### Módulo C — Sector salud (OPCIONAL: solo si la institución activó "sector salud")
Son preguntas sectoriales que **solo aparecen en los datos si la sesión marcó sector salud**. **Su ausencia en una institución no-salud es lo esperado — no es una brecha ni un pendiente.** Cuando aparecen, se leen como **deberes reforzados** propios del sector, no genéricos. Anclajes verificados (2026-07-14):
- **C1 Datos de salud y régimen reforzado (crítica):** **art. 16 bis** — el tratamiento de datos de salud y del perfil biológico se limita a los fines de las leyes especiales en materia sanitaria, y se **prohíbe** usar datos o muestras recolectados en el ámbito laboral, educativo, deportivo, de seguros o de seguridad social salvo autorización legal expresa; consentimiento **expreso** para datos sensibles (art. 16). Es el régimen reforzado sobre A4/A8: una brecha en C1 es incumplimiento del régimen especial, de alta relevancia sancionatoria.
- **C2 Ficha clínica (Ley 20.584):** acceso, copia y rectificación de la ficha ya regulados sectorialmente; **Reglamento sobre Fichas Clínicas (Decreto 41/2012)**, conservación mínima **15 años** desde la última atención. Coordinar con el canal ARCOP (A6) **sin duplicar**.
- **C3 Interoperabilidad clínica y datos a gran escala:** estándares **HL7 FHIR / SNOMED CT / CIE** (consistencia semántica del dato clínico en la red asistencial); **EIPD previa** a los tratamientos masivos de datos de salud (art. 15 ter — en salud, exigible por regla general); **uso secundario** (investigación, estadística, salud pública) con anonimización/seudonimización (Guía de Anonimización; cruza con A12).

### Marcos internacionales de referencia
- **Playbook de estrategia de datos (BID / Public Digital):** https://publicdigital.github.io/data-strategy-playbook/ — método de 3 pasos (equipo multidisciplinario → autoevaluación → hoja de ruta con nivel actual, meta, acciones, responsables, presupuesto, plazos) y recomendaciones **por nivel** para subir de madurez; es el modelo del que este instrumento toma las "escaleras de acciones".
- **DAMA-DMBOK** (base conceptual del MGDE), niveles tipo **CMMI** (base de la escala 1–5 del instrumento).

## 2. Caracterización de niveles de madurez organizacional

El informe debe identificar el **nivel predominante** de la organización (y de cada área): calcular la
distribución de niveles entre dimensiones respondidas (cuántas caen en 1, 2, 3, 4, 5), reportar moda y
mediana, y caracterizar el estadio con esta tabla — no solo listar brechas. Una organización es más que
sus déficits: el estadio define qué intervenciones funcionan y cuáles fracasan.

| Nivel predominante | Cómo se ve la organización | Riesgo característico | Qué funciona en este estadio (y qué no) |
|---|---|---|---|
| **1 · Inicial** (MGDE: Insuficiente) | Todo depende de personas específicas; conocimiento tácito; reacción caso a caso; sin documentar | Pérdida de continuidad ante rotación; incumplimiento legal por desconocimiento (no por decisión) | Funciona: patrocinio de jefatura, designaciones (Acción N°1 SGD), levantamiento, sensibilización. **No** funciona: comprar plataformas, políticas extensas, métricas — no hay quién las sostenga |
| **2 · Básico** | Prácticas existen pero son informales, inconsistentes entre áreas, "heroicas" | Resultados no repetibles; la misma pregunta recibe respuestas muy distintas por área | Funciona: **formalizar lo que ya se hace** (los quick wins viven aquí), estandarizar entre áreas, comité con actas. No: saltarse a optimización |
| **3 · Definido** (MGDE: Medio) | Políticas, roles e instancias formalizados y aplicados | **Gobernanza documental**: el papel existe pero nadie mide si se usa (ver B11) | Funciona: indicadores, control de cumplimiento, auditoría interna, medición de adopción. Es la **meta institucional mínima** de este instrumento y el estándar exigible ante la 21.719 |
| **4 · Gestionado** (MGDE: Avanzado) | Se mide con indicadores, decisiones con evidencia | Complacencia; métricas que no se usan para decidir | Funciona: optimización, automatización, anticipación de riesgos; benchmark externo |
| **5 · Optimizado** | Mejora continua, cultura consolidada, se anticipan problemas | Sobre-ingeniería; burocratizar lo que ya fluye | Mantener, simplificar y compartir la práctica como referencia |

Reglas de interpretación adicionales:

- **Patrón tecnosolucionista** (referencia interpretativa: C. Rebolledo, "La promesa del tecnosolucionismo frente a problemas analógicos", Cooperativa, 25-jun-2026 — https://opinion.cooperativa.cl/opinion/salud/la-promesa-del-tecnosolucionismo-frente-a-problemas-analogicos/2026-06-25/081447.html): dimensiones técnicas (B7) altas con gobernanza (B1/B2/B11) baja = infraestructura sin gobierno; digitalizar no es gobernar. El patrón inverso (políticas altas, adopción B11 baja) = gobernanza documental.
- **Dispersión entre áreas** en una misma dimensión (min/max del extractor): puede ser realidad heterogénea (gestionable con áreas ancla) o criterios de respuesta distintos (problema del instrumento/proceso) — distinguir y decirlo.
- **"No sé" (`ns`) alto en dimensiones legales** = la institución *no sabe si cumple*: es hallazgo en sí, distinto de incumplir. **"No aplica" (`na`)** es diferente —declara el deber fuera de alcance—; en una dimensión crítica hay que **verificar que el "no aplica" sea legítimo** y no una forma de omitir (p. ej., una entidad de salud que marca "no aplica" el régimen del dato de salud). El extractor entrega ambas cifras separadas; las sesiones anteriores a jul-2026 guardaron una sola marca combinada como `na`, que en esos datos puede encubrir un "No sé".
- **Fortalezas como palanca:** dimensiones en o sobre la meta son áreas ancla — la mejor práctica interna es más replicable y creíble que cualquier benchmark externo.

## 3. Mapa causal de dependencias entre dimensiones

El análisis debe **explicar causas organizacionales antes que describir síntomas**. Este mapa da la
estructura causal verificable (proviene de la secuencia de la Guía SGD, del MGDE/DAMA y de las escaleras
de acciones del banco); no inventar causalidades fuera de él sin declararlas como hipótesis propias.

**Fundaciones (causas raíz de casi todo lo demás):** B1 (instancias de gobernanza), B2 (dueños y
stewards), B3 (estrategia y recursos), A1 (encargado y accountability Ley 21.719).

Cadenas causales típicas (causa aguas arriba → síntoma aguas abajo):

| Si esta causa está baja… | …explica síntomas en | Lectura |
|---|---|---|
| **B2** (roles, stewards) | B5 calidad, B6 metadatos/catálogo, B7.2 datos maestros, B9 retención | Nadie tiene la responsabilidad de definir reglas, curar ni remediar — el problema no es tecnológico |
| **B1** (instancias) | B4 políticas, B11 adopción, dispersión entre áreas | No hay dónde aprobar, controlar ni dar seguimiento; cada área improvisa |
| **B3** (estrategia, recursos) | Estancamiento transversal | Sin presupuesto ni personas, cualquier iniciativa muere de inanición |
| **A1** (encargado 21.719) | A3 inventario, A5 política, A6 canal ARCOP, A9 protocolo, A13 | Sin conductor designado, los instrumentos de la ruta SGD no se producen |
| **A3** (inventario/RAT) | A4, A7, A10, A11, A12, A14, B6 | No se puede clasificar, evaluar impacto ni controlar flujos o cesiones de lo que no se conoce |
| **B10** (capacidades, cultura) | B5 calidad en origen, B11 adopción | El dato nace mal y las políticas no se usan si nadie sabe ni quiere |

**Módulo C (salud), si está activo:** cada dimensión sectorial hereda las causas de su contraparte genérica — **C1** se apoya en A4 (sensibles) y A8 (seguridad); **C2** en B9 (retención) y A6 (derechos); **C3** en B7 (interoperabilidad), A7 (EIPD) y A12 (anonimización). Una brecha en C suele explicarse primero por su base genérica antes que por lo sectorial (p. ej., C3 bajo con B7 bajo = falta la interoperabilidad de base, no solo la clínica).

Regla de lectura: un síntoma aguas abajo **con causas aguas arriba también bajas se explica primero
organizacionalmente**; solo si las fundaciones están sanas se explora causa técnica o presupuestaria.
La causalidad en un autodiagnóstico es hipótesis ("parece consecuencia de", "es consistente con") —
proponer siempre cómo verificarla en terreno.

### Compuerta de prerrequisitos: no recomendar capacidades que dependen de capacidades inexistentes

Si las fundaciones están en nivel Inicial (p. ej. **B1 = 1, B2 = 1, B3 = 1**), quedan **vetadas** las
recomendaciones del tipo: implementar **Data Lake / lakehouse**, programas de **IA** en producción,
**MDM** corporativo, **Data Mesh**, catálogos con linaje automatizado, oficinas de calidad de datos.
Esas iniciativas probablemente fracasen sin dueños, instancias ni recursos — y el fracaso quema
credibilidad y presupuesto que la gobernanza naciente no puede permitirse. Lo que corresponde en ese
estadio son las fundaciones: designaciones, comité, levantamiento, formalización (escalones →2/→3 del
banco). En general: **toda recomendación declara sus prerrequisitos, y ninguno puede estar bajo nivel 2.**

**Única excepción (declararla siempre):** los deberes legales con plazo (Módulo A crítico, 1-dic-2026)
no esperan la madurez — se cumplen con el **control mínimo viable** (p. ej. protocolo de brechas básico
aunque B1 esté en 1), marcándolo como transitorio hasta que las fundaciones lo sostengan.

### Economía del cambio organizacional — ejemplo canónico

El principio (SKILL.md §5) en acción: **un solo acto administrativo** que (a) constituya el **Comité de
Datos con mandato dual** — gobernanza de datos MGDE **y** funciones del Comité Ejecutivo de la Ley 21.719,
fusión que la propia Guía SGD autoriza expresamente —, (b) designe al **encargado institucional** como su
secretaría técnica (Acción N° 1 SGD) y (c) nombre a los **dueños de datos** de los dominios prioritarios,
mueve simultáneamente **A1, B1 y B2** (las causas raíz del mapa causal) y habilita B4 (instancia que
aprueba políticas), B11 (instancia que hace seguimiento) y la producción de A3/A5/A9 (los instrumentos de
la ruta tienen conductor). Una firma ≈ siete dimensiones. Ese es el estándar de economía que las
recomendaciones del informe deben buscar — siempre con el contrapeso anti-monolito: consolidar solo
funciones afines y dotar a la estructura de capacidad real (agenda, actas, secretaría).

## 4. Realidad local (contexto institucional que ajusta toda recomendación)

- Institución **recién construyendo su gobernanza**: sin DPO (voluntario por ley), sin comité de datos consolidado; el instrumento existe para *impulsar* la estrategia, no para auditar una gobernanza madura.
- Estructura de datos fragmentada (unidades con sistemas locales heterogéneos junto a plataformas centrales): el linaje manual es inviable; donde exista, la interoperabilidad semántica mediante **estándares de terminología sectoriales** (p. ej., en salud: HL7 FHIR, SNOMED CT, CIE) es condición basal.
- Los equipos que registran los datos suelen percibir el registro estructurado como carga: las recomendaciones de calidad/captura deben incluir **incentivos y valor visible para quien registra**, no solo mandatos.
- Capacidades y presupuesto limitados: priorizar acciones organizativas de bajo costo (designaciones, actas, formalización) antes que adquisiciones; las escaleras →2/→3 del banco están diseñadas así.
- El plazo del 1-dic-2026 es el principal apalancamiento de negociación con la autoridad; usarlo con precisión (deberes concretos, no alarmismo).
