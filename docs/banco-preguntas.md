# Banco de preguntas — Autoevaluación de madurez (Ley 21.719 + Gobernanza de datos)

> Versión legible para revisión de Jurídico / DPO / equipo de datos. Es el **espejo** del banco tipado en `src/data/banco.ts` (fuente de verdad de la app). Si se edita aquí, actualizar también `src/data/banco.ts` (y viceversa).
>
> **Descargo:** instrumento orientativo de autodiagnóstico; no es asesoría legal. Debe validarse con la contraparte Jurídica/DPO.
>
> **Verificación (2026-07-08):** el banco fue contrastado contra la síntesis oficial de la Ley 21.719 (BCN, Informe 12-25), la **Guía Práctica de implementación (SGD, texto completo)**, la **Guía Técnica MGDE (SGD, texto completo)**, la plantilla RAT de la SGD (v20112025), la Guía de Anonimización (SGD) y la Guía Técnica de Gestión Documental del Estado. Correcciones principales de esa revisión: (1) el plazo de "72 h" para notificar brechas es propio del RGPD europeo — la ley chilena exige hacerlo "por los medios más expeditos posibles y sin dilaciones indebidas" (art. 14 sexies); (2) la comunicación a titulares procede cuando la brecha afecta datos sensibles, de menores de 14 años o económico-financieros (no "alto riesgo"); (3) el **DPO es una figura voluntaria** que la Guía SGD recomienda (art. 50, "podrá designar") — lo que la guía instruye como primer paso es designar un **encargado/responsable institucional**; (4) la ley **no obliga expresamente a un RAT**: la Guía SGD propone un **Catálogo de datos personales** para cumplir el deber de información y transparencia (art. 14 ter). Los puntos marcados con ⚠️ quedan para validación jurídica.
>
> **Re-verificación (2026-07-13):** tras generalizar el instrumento (de un ministerio a cualquier institución pública), el banco se contrastó de nuevo contra el **texto oficial completo de la Ley 19.628 reformada (XML LeyChile, versión al 1-12-2026)**, la síntesis BCN, la Guía Práctica SGD, la **Guía Técnica MGDE** (act. 29-11-2024, incl. matriz del Anexo N° 1), el RAT publicado por la SGD, la Guía de Anonimización (v.1, 20-03-2025), el Decreto 10/2023, la Política Nacional de IA (D.S. 12/2024 MinCiencia) y las fuentes del CPLT. Correcciones de esta revisión: (1) los casos que gatillan **siempre** una EIPD son los del **art. 15 ter** — "NNA" y "nuevas tecnologías" no son gatillantes legales, y la consulta a la Agencia por alto riesgo residual es **facultativa**; (2) las **cláusulas contractuales modelo** para transferencias internacionales las aprueba la **Agencia** (art. 28); la referencia de la Guía SGD al Ministerio de Economía es transitoria; (3) se precisó la nota de A6: ante órganos públicos los derechos directamente exigibles son **acceso, rectificación y oposición** (arts. 21 y 23); (4) el contrato con encargados debe regular también la **duración** (art. 15 bis); (5) la clasificación de atributos de la Guía de Anonimización es **identificadores directos / indirectos o cuasi-identificadores / atributos objetivos**; (6) el CPLT pasó de la Instrucción General en pilotaje a las **Recomendaciones sobre Transparencia Algorítmica** (Res. Ex. N° 372/2024, D.O. 30-08-2024).
>
> **Cronograma oficial (Guía SGD):** primeros pasos (dic 2025–ene 2026) → levantamiento de información (ene–abr 2026) → informe de hallazgos y Comité Ejecutivo (abr 2026) → catálogo de datos (may–jun 2026) → política de tratamiento (jul 2026) → protocolos, reglas y procedimientos (ago–nov 2026).

## Escala de respuesta (igual para todas las preguntas)

Cada afirmación se responde eligiendo el nivel de madurez que mejor refleja la realidad de la institución:

| Nivel | Etiqueta | Qué significa | ≈ MGDE |
|:---:|---|---|---|
| 1 | **Inicial** — "No lo hacemos / caso a caso" | No hay práctica formal; reactivo, depende de personas, sin documentar. | Insuficiente |
| 2 | **Básico** — "Lo hacemos de manera informal" | Prácticas parciales, inconsistentes, sin formalizar. | Básico |
| 3 | **Definido** — "Está formalizado y documentado" | Políticas/roles/instancias definidos, aprobados y aplicados transversalmente. | Medio |
| 4 | **Gestionado** — "Lo medimos y controlamos" | Se mide con indicadores, se controla el cumplimiento, decisiones con evidencia. | Avanzado |
| 5 | **Optimizado** — "Mejoramos de forma continua" | Mejora continua, se anticipan problemas, cultura consolidada. | Avanzado+ |

También existe **"No sé / No aplica"**, que no se promedia y se reporta aparte como pendiente por cerrar.

**Puntaje:** promedio por dimensión (1-5) → promedio ponderado por módulo. Las dimensiones marcadas **(crítica ×1.5)** pesan más por su mayor riesgo sancionatorio o criticidad. Se consideran **brecha** las dimensiones cuyo nivel (promedio redondeado) queda bajo 3 ("Definido").

**Criterio de criticidad (⚠️ validar con Jurídico):** en el Módulo A son críticas las dimensiones que corresponden a **deberes legales directos y basales** del responsable — A2 base de licitud (sin ella ningún tratamiento es válido; en órganos públicos, la función legal), A3 inventario/catálogo (deber de información y transparencia, art. 14 ter), A4 datos sensibles (régimen reforzado por el mayor riesgo que su tratamiento supone para los derechos de los titulares), A6 derechos de los titulares (deber con plazos y reclamo ante la Agencia), A7 EIPD (el tratamiento masivo y automatizado de datos sensibles o a gran escala la hace exigible por regla general; p. ej., en salud, registros nacionales o modelos predictivos), A8 deber de seguridad y A9 notificación de brechas (arts. 14 quinquies y sexies). No se marcan críticas las dimensiones instrumentales o condicionales: A1 (organizativa; su falla se refleja en las demás), A5 (en órganos públicos el consentimiento es excepcional: la base habitual es la función legal), A10/A11 (dependen de la existencia de encargados/transferencias), A12 (técnica), A13 (cultural) y A14 (condicional: depende de la existencia de cesiones). En el Módulo B son críticas B1 y B2, las fundaciones de gobernanza en que el MGDE pone énfasis, y B7 por su rol en la **interoperabilidad con el Estado**: la consistencia semántica del dato (estándares y terminologías comunes) es condición basal para que sea utilizable entre los sistemas de la institución y con otros organismos (p. ej., en salud, la interoperabilidad semántica de las terminologías clínicas).

**Criterio de redacción (una capacidad por afirmación):** cada pregunta busca medir **una sola capacidad**, para que la respuesta no sea ambigua (¿qué marca quien tiene logs pero no cifrado?). En la revisión 2026-07-09 se dividieron A8.1 (mínimo privilegio / cifrado / logs, ahora A8.1–A8.3) y B7.1 (arquitectura / datos maestros, ahora B7.1–B7.2). Candidatas a dividir en la próxima revisión: B8.1 (clasificación + gobierno de accesos), A13.2 (auditorías + preparación para fiscalización) y B6.1 (catálogo + glosario).

**Acciones por nivel:** cada dimensión trae una escalera de acciones **→2 / →3 / →4 / →5** (la acción para *alcanzar* ese nivel, estilo playbook BID). El reporte muestra, para **toda** dimensión respondida —no solo las brechas—, la acción que corresponde a su nivel actual; en el nivel 5 la indicación es mantener y compartir la práctica.

---

# Módulo A — Preparación para la Ley 21.719

*14 dimensiones · 37 preguntas. Espeja la metodología por fases de la Guía Práctica de la SGD y las obligaciones de la ley para órganos públicos que tratan datos personales.*

### A1. Gobernanza y responsabilidad proactiva *(accountability)*
1. La institución designó formalmente a un(a) **encargado(a) o responsable institucional** de la implementación de la Ley 21.719, con respaldo de la jefatura de servicio (Guía SGD, Acción N° 1).
2. Contamos con un(a) **Delegado(a) de Protección de Datos** designado(a) —figura **voluntaria** que la Guía SGD recomienda (art. 50)—, con los requisitos técnicos, autonomía e independencia que establece la ley.
3. Mantenemos evidencia documentada (actas, políticas, registros) que permite **demostrar** el cumplimiento de la ley.
> **Acciones para subir de nivel:**
> - **→ 2 Básico:** Ejecutar los "primeros pasos" de la Guía SGD: la jefatura designa a un(a) encargado(a) o responsable institucional —priorizando capacidad de gestión, sin esperar a contar con DPO— (**Acción N° 1**) y comunica a toda la institución el inicio de la implementación (**Acción N° 3**); empezar a reunir en un solo lugar la evidencia que ya existe (actas, políticas, oficios).
> - **→ 3 Definido:** Constituir formalmente el proyecto de implementación (acta y carta Gantt, **Acción N° 2**) y el **Comité Ejecutivo** (representante de la jefatura, encargado(a) como secretaría técnica, jurídica, TI, control de gestión y las áreas que más datos tratan; ~2 sesiones al mes, con actas), y abrir un repositorio de evidencia de cumplimiento.
> - **→ 4 Gestionado:** Medir el avance del plan con indicadores (hitos de la carta Gantt, % de acciones de la Guía SGD completadas) y reportarlo periódicamente a la jefatura de servicio; evaluar la designación de un(a) DPO con autonomía e independencia.
> - **→ 5 Optimizado:** Revisar anualmente el modelo de gobernanza con las lecciones de auditorías, brechas y fiscalizaciones, anticipando cambios normativos; evaluar certificar un **Modelo de Prevención de Infracciones (MPI)** ante la Agencia.
>
> *Nota:* si el organismo designa DPO (voluntario, ligado al modelo de prevención), este debe asumir las funciones del encargado/responsable para evitar duplicidad (Guía SGD); la designación se hace con cargo a la dotación vigente (art. quinto transitorio, Ley 21.719).

### A2. Base de licitud (tratamiento por órgano público) **(crítica ×1.5)**
1. Para cada tratamiento identificamos y documentamos su **base de licitud** (función legal del órgano, obligación legal, consentimiento u otra).
2. Los tratamientos se limitan al ejercicio de nuestras funciones y competencias legales, sin usos incompatibles con la finalidad declarada.
3. El personal conoce y aplica el **deber de reserva/confidencialidad** sobre los datos personales.
> **Acciones para subir de nivel:**
> - **→ 2 Básico:** Identificar, para los tratamientos más relevantes, qué norma o función legal los habilita, y recordar al personal el deber de reserva al asumir sus funciones.
> - **→ 3 Definido:** Documentar la base de licitud de cada actividad del Catálogo/RAT (función legal del órgano, obligación legal, consentimiento u otra) y formalizar el deber de reserva (cláusulas de confidencialidad en contratos y convenios).
> - **→ 4 Gestionado:** Controlar periódicamente que ningún tratamiento se use con fines incompatibles con la finalidad declarada y auditar la vigencia de las bases de licitud documentadas.
> - **→ 5 Optimizado:** Revisar las bases de licitud ante cada cambio normativo o de proceso, y evaluar la licitud antes de crear nuevos tratamientos (integrado al checklist de privacidad desde el diseño).

### A3. Inventario de datos y Catálogo/RAT **(crítica ×1.5)**
1. Realizamos un **levantamiento** de los datos personales que trata cada área (qué datos, si son sensibles, con qué finalidad, dónde se almacenan, cuánto se conservan y a quién se transfieren) (matriz de levantamiento, Guía SGD).
2. Contamos con un **catálogo o registro de actividades de tratamiento (RAT)** que documenta, por actividad, finalidad, base de licitud, categorías de datos y de titulares (deber de información y transparencia, **art. 14 ter**).
3. El catálogo/RAT también registra destinatarios, plazos de conservación y fuente de los datos, y se **mantiene actualizado**.
> **Acciones para subir de nivel:**
> - **→ 2 Básico:** Iniciar el levantamiento por las áreas que tratan más datos personales, usando la matriz de la Guía SGD (qué datos, si son sensibles, finalidad, dónde se almacenan, retención y transferencias), sin olvidar las unidades de soporte (oficina de partes, jurídica, bienestar), que suelen tratar datos sensibles.
> - **→ 3 Definido:** Completar el levantamiento en todas las áreas, elaborar el **informe de hallazgos** y construir el **Catálogo/RAT** (formatos tipo SGD; el RAT que publica la propia SGD, de 9 campos, sirve de modelo); asignar responsable de su mantención.
> - **→ 4 Gestionado:** Definir un proceso de actualización del RAT gatillado por nuevos sistemas, convenios o formularios, con indicadores de cobertura y vigencia (p. ej. % de actividades revisadas en los últimos 12 meses).
> - **→ 5 Optimizado:** Integrar el Catálogo/RAT con el catálogo de datos institucional (Módulo B) y usarlo como insumo vivo para EIPD, gestión de accesos y anonimización, revisando continuamente su calidad.
>
> *Nota:* la ley **no establece expresamente la obligación de un RAT** (Guía SGD); el catálogo/registro es el instrumento recomendado para cumplir la publicación exigida por el art. 14 ter, letras d), i) y j).

### A4. Datos sensibles **(crítica ×1.5)**
1. Tenemos **identificados y clasificados** los datos sensibles que tratamos (p. ej. salud, situación socioeconómica, afiliación política o sindical, creencias, datos biométricos, vida sexual).
2. El tratamiento de **datos sensibles** se ampara en una base de licitud válida y se limita a los fines de la norma que lo habilita (p. ej., en salud, las leyes sanitarias).
3. Aplicamos **medidas reforzadas** a los datos sensibles (cifrado, acceso restringido, registro de accesos) y resguardos especiales para datos de niños, niñas y adolescentes.
> **Acciones para subir de nivel:**
> - **→ 2 Básico:** Identificar los sistemas y planillas donde hay datos sensibles (salud, situación socioeconómica, datos biométricos, etc.) o de niños, niñas y adolescentes, y cerrar los accesos evidentemente excesivos (carpetas compartidas abiertas, cuentas genéricas).
> - **→ 3 Definido:** Clasificar formalmente los datos sensibles en el Catálogo/RAT, verificar su base de licitud conforme a la finalidad y a la norma sectorial que los habilita, y definir reglas específicas para datos de NNA.
> - **→ 4 Gestionado:** Aplicar y monitorear medidas reforzadas (cifrado, control y registro de accesos) con revisiones periódicas de quién accede a qué, midiendo accesos indebidos e incidentes.
> - **→ 5 Optimizado:** Minimizar de forma continua (anonimización/seudonimización por defecto en analítica e investigación) y anticipar riesgos emergentes, como la reidentificación por cruce de fuentes.

### A5. Consentimiento, información y transparencia
1. Cuando la base es el consentimiento, lo obtenemos en forma **previa, libre, informada, específica e inequívoca** (art. 12), y de forma **expresa** para datos sensibles.
2. Publicamos **políticas/avisos de privacidad** con la información mínima (responsable, finalidades, base de licitud, destinatarios, plazos, derechos y canal de ejercicio) (deber de información y transparencia, art. 14 ter).
3. Existe un mecanismo **expedito, gratuito y permanentemente disponible** para retirar (revocar) el consentimiento (art. 12 inc. 5°).
> **Acciones para subir de nivel:**
> - **→ 2 Básico:** Revisar en qué formularios y trámites se recolectan datos con consentimiento y agregar avisos básicos de privacidad donde falten.
> - **→ 3 Definido:** Publicar la política de tratamiento con la información mínima (modelo SGD) y estandarizar los mecanismos de consentimiento (previo, libre, informado, específico e inequívoco; expreso para datos sensibles) y su retiro expedito y gratuito.
> - **→ 4 Gestionado:** Verificar periódicamente que avisos y consentimientos estén vigentes y sean consistentes con el Catálogo/RAT; medir las solicitudes de retiro y sus tiempos de respuesta.
> - **→ 5 Optimizado:** Probar la comprensión real de los avisos (lenguaje claro) con usuarios y mejorar continuamente los flujos de consentimiento con esa retroalimentación.

### A6. Derechos de los titulares (ARCOP + bloqueo/portabilidad) **(crítica ×1.5)**
1. Existe un canal y un procedimiento para ejercer los derechos de **acceso, rectificación, cancelación/supresión, oposición, portabilidad y bloqueo**.
2. Atendemos las solicitudes **dentro del plazo legal** y dejamos registro **trazable** (ingreso, respuesta y evidencia).
3. Gestionamos la **oposición a decisiones automatizadas** y perfilamiento, y podemos entregar los datos en formato **estructurado, genérico y de uso común** (portabilidad, art. 9).
> **Acciones para subir de nivel:**
> - **→ 2 Básico:** Definir un punto de entrada provisorio (p. ej. la OIRS) y una persona responsable de responder solicitudes de derechos mientras se formaliza el procedimiento.
> - **→ 3 Definido:** Formalizar el procedimiento ARCOP con plazos legales, formatos de respuesta y registro trazable, y habilitar un canal único (la Guía SGD recomienda la **OIRS** para el sector público), unificando —sin duplicar— los flujos ya regulados por normativa sectorial (p. ej., en salud, la entrega de copia de la ficha clínica bajo la Ley 20.584).
> - **→ 4 Gestionado:** Medir el cumplimiento (volumen, plazos, tipo de derecho, resultado) y controlar los casos complejos: oposición a decisiones automatizadas y portabilidad en formato estructurado de uso común.
> - **→ 5 Optimizado:** Automatizar donde aporte (verificación de identidad, portabilidad) y usar las solicitudes recibidas como señal para mejorar procesos y calidad de datos.
>
> ⚠️ *Nota para validación jurídica:* frente a **órganos públicos** el titular puede ejercer **acceso, rectificación y oposición** (art. 23), y la **supresión** solo en el caso del art. 22 inc. 3° (datos cedidos cuyo tratamiento específico ya se cumplió). El art. 21 inc. 3° hace aplicables los arts. 4° a 8° "en conformidad a lo dispuesto en el artículo 23", por lo que **portabilidad (art. 9°), bloqueo (art. 8° ter) y decisiones automatizadas (art. 8° bis) no serían directamente exigibles ante órganos públicos**. La Guía SGD igualmente instruye publicar los derechos de acceso, rectificación, supresión, oposición y portabilidad (checklist art. 14 ter, letra f, "de conformidad a la ley"). Esta dimensión los evalúa como **capacidad institucional** (preparación y buena práctica, no solo deber exigible); confirmar el alcance con Jurídico.
>
> ⚠️ *Nota para validación jurídica (sectorial):* en algunos sectores ciertos derechos ya están fuertemente regulados por normativa especial (p. ej., en salud, el derecho de **acceso** —entrega de copia de la ficha clínica— y la **rectificación** bajo la **Ley 20.584**). Cuando así ocurra, coordinar con las OIRS para que el flujo de atención de la Ley 21.719 **no colisione ni duplique** los canales existentes, sino que los unifique.

### A7. Evaluación de Impacto en Protección de Datos (EIPD/DPIA) **(crítica ×1.5)**
1. Tenemos **criterios** para identificar tratamientos de alto riesgo que requieren una Evaluación de Impacto (EIPD).
2. Realizamos **EIPD documentadas en forma previa al inicio** de esos tratamientos, con análisis de riesgo y medidas de mitigación (art. 15 ter).
> **Acciones para subir de nivel:**
> - **→ 2 Básico:** Acordar criterios simples para reconocer los tratamientos que la ley somete siempre a EIPD (evaluación sistemática y exhaustiva con decisiones automatizadas, tratamiento masivo o a gran escala, observación sistemática de zonas de acceso público, datos sensibles en las hipótesis de excepción del consentimiento — **art. 15 ter**) y listar cuáles de los tratamientos actuales los cumplen.
> - **→ 3 Definido:** Adoptar una plantilla de EIPD y aplicarla en forma previa al inicio de los tratamientos de alto riesgo identificados, con análisis de riesgo y medidas de mitigación documentadas.
> - **→ 4 Gestionado:** Incorporar la EIPD como control obligatorio del ciclo de proyectos y sistemas —incluidos los de analítica, ciencia de datos y BI— (ningún tratamiento de alto riesgo inicia sin EIPD aprobada) y hacer seguimiento a las medidas comprometidas.
> - **→ 5 Optimizado:** Reevaluar las EIPD ante cambios relevantes del tratamiento y compartir aprendizajes entre áreas; consultar a la Agencia cuando el riesgo residual siga siendo alto.
>
> *Nota:* cuando la institución realiza tratamiento masivo y automatizado de datos sensibles o a gran escala, la EIPD rara vez está en zona gris: es exigible **por regla general** (p. ej., en salud, registros nacionales, modelos predictivos). Para los proyectos de ciencia de datos / BI debe asumirse como paso obligatorio del ciclo de desarrollo.

### A8. Seguridad y protección desde el diseño / por defecto **(crítica ×1.5)**
1. Los accesos a los sistemas y bases con datos personales siguen el principio de **mínimo privilegio**: cada persona accede solo a lo que su función requiere.
2. Los datos personales sensibles están **cifrados**, tanto almacenados como en tránsito.
3. Los sistemas que tratan datos personales mantienen **registros de acceso y actividad (logs)**.
4. Incorporamos la **protección desde el diseño y por defecto** al crear sistemas, servicios o formularios (minimizando la recolección).
> **Acciones para subir de nivel:**
> - **→ 2 Básico:** Aplicar controles básicos en los sistemas con datos personales: cuentas individuales (no compartidas), mínimo privilegio, respaldos, y corte de accesos al desvincular personal.
> - **→ 3 Definido:** Formalizar medidas de seguridad por nivel de riesgo —alineadas con la **Norma Técnica de Seguridad de la Información y Ciberseguridad** (Decreto 7/2023, Ley 21.180)— y un checklist de privacidad desde el diseño/por defecto para nuevos desarrollos y adquisiciones.
> - **→ 4 Gestionado:** Medir el cumplimiento de los controles (cobertura de cifrado, revisiones de acceso, hallazgos y cierre de auditorías) y exigir el checklist de diseño aprobado en cada proyecto nuevo.
> - **→ 5 Optimizado:** Gestionar la seguridad como mejora continua: pruebas periódicas (escaneos de vulnerabilidades, ethical hacking), lecciones de incidentes propios y de otras instituciones públicas, y ajuste de controles.

### A9. Gestión de brechas de seguridad **(crítica ×1.5)**
1. Tenemos un **procedimiento documentado** para detectar, evaluar y gestionar brechas de datos personales.
2. El procedimiento define la **notificación a la Agencia** por los medios más expeditos posibles y **sin dilaciones indebidas**, y la comunicación **en lenguaje claro** a los titulares cuando la brecha afecte **datos sensibles, de menores de 14 años o económico-financieros** (art. 14 sexies).
3. Mantenemos un **registro de las vulneraciones** (naturaleza, efectos, categorías de datos, titulares afectados y medidas adoptadas, art. 14 sexies) y realizamos pruebas/simulacros de respuesta.
> **Acciones para subir de nivel:**
> - **→ 2 Básico:** Definir a quién se avisa internamente ante un incidente con datos personales y llevar un registro simple de los incidentes que ocurran.
> - **→ 3 Definido:** Redactar y aprobar el protocolo de brechas con el flujo de notificación a la Agencia y la comunicación en lenguaje claro a los titulares cuando corresponda; mantener un registro estructurado de vulneraciones.
> - **→ 4 Gestionado:** Ensayar el protocolo con simulacros al menos anuales, medir tiempos de detección y notificación, y coordinarlo con el flujo de incidentes de ciberseguridad institucional.
> - **→ 5 Optimizado:** Analizar tendencias del registro de vulneraciones para prevenir recurrencias y mejorar el protocolo después de cada ensayo o brecha real.
>
> *Nota:* la ley **no fija un plazo de 72 h** (ese plazo es del RGPD europeo); el estándar chileno es "por los medios más expeditos posibles y sin dilaciones indebidas", cuando exista un riesgo razonable para los derechos de los titulares.

### A10. Encargados (procesadores) y terceros
1. Tenemos identificados los **encargados/terceros** que tratan datos por cuenta de la institución.
2. Existen **contratos o acuerdos de tratamiento (DPA)** que regulan finalidad, duración, seguridad, confidencialidad, subencargados y la devolución/eliminación de datos al término del servicio (art. 15 bis).
> **Acciones para subir de nivel:**
> - **→ 2 Básico:** Listar los proveedores y convenios que implican tratamiento de datos por cuenta de la institución (soporte, nube, digitación, laboratorios, aseguradoras, etc.).
> - **→ 3 Definido:** Suscribir o actualizar los acuerdos de tratamiento (DPA) regulando finalidad, duración, seguridad, confidencialidad, subencargados y devolución/eliminación al término (art. 15 bis), e incluir cláusulas tipo en compras públicas y convenios (formatos SGD).
> - **→ 4 Gestionado:** Controlar el cumplimiento de los DPA (evidencia de medidas de seguridad del proveedor, certificaciones o auditorías) y mantener el inventario de encargados al día.
> - **→ 5 Optimizado:** Evaluar el riesgo de terceros en forma continua (criticidad, incidentes, dependencia) y ajustar cláusulas y controles según ese riesgo.

### A11. Transferencias internacionales de datos
1. Tenemos identificadas las **transferencias internacionales** de datos (incluidos servicios en la nube fuera de Chile).
2. Esas transferencias se amparan en un **mecanismo válido** (nivel adecuado de protección, cláusulas contractuales modelo u otras garantías apropiadas).
> **Acciones para subir de nivel:**
> - **→ 2 Básico:** Identificar qué servicios (especialmente en la nube) almacenan o procesan datos fuera de Chile, preguntando a TI y revisando los contratos vigentes.
> - **→ 3 Definido:** Documentar los flujos transfronterizos en el Catálogo/RAT y ampararlos en un mecanismo válido (país con nivel adecuado de protección, **cláusulas contractuales modelo** u otras garantías adecuadas — **arts. 27-28**: las cláusulas modelo las aprueba la **Agencia**; transitoriamente la Guía SGD refiere las CCM del Ministerio de Economía).
> - **→ 4 Gestionado:** Revisar periódicamente que los mecanismos sigan vigentes (cambios de proveedor, subencargados o países) y controlar toda nueva contratación cloud antes de firmar.
> - **→ 5 Optimizado:** Evaluar residencia de datos y minimización para reducir transferencias, anticipando decisiones de adecuación y cambios regulatorios.

### A12. Anonimización / seudonimización
1. Antes de compartir o publicar datos, **clasificamos los atributos** (identificadores directos, identificadores indirectos o cuasi-identificadores, y atributos objetivos) y aplicamos técnicas adecuadas (supresión, **k-anonimato, l-diversidad**, seudonimización).
2. Cuando seudonimizamos, mantenemos la **tabla de correspondencia cifrada** y con acceso restringido, y evaluamos el **riesgo de reidentificación** antes, durante y después.
> **Acciones para subir de nivel:**
> - **→ 2 Básico:** Antes de compartir o publicar datos, eliminar los identificadores directos obvios (RUN, nombre, dirección, teléfono) y someter la salida a revisión de un par.
> - **→ 3 Definido:** Adoptar el procedimiento de la Guía de Anonimización (clasificar identificadores directos, indirectos/cuasi-identificadores y atributos objetivos; aplicar supresión, k-anonimato, l-diversidad o seudonimización) y resguardar las tablas de correspondencia cifradas y con acceso restringido.
> - **→ 4 Gestionado:** Evaluar el riesgo de reidentificación antes, durante y después de cada publicación relevante, con umbrales definidos (p. ej. k mínimo) y registro de las evaluaciones.
> - **→ 5 Optimizado:** Incorporar técnicas avanzadas donde aporten (privacidad diferencial, datos sintéticos) y reevaluar publicaciones históricas cuando aparezcan nuevas fuentes de cruce.

### A13. Cultura, capacitación y mejora continua
1. Ejecutamos un **programa de capacitación/sensibilización** continua en protección de datos para el personal.
2. Realizamos **monitoreo o auditorías internas** del cumplimiento y estamos **preparados para una fiscalización** de la Agencia (RAT, EIPD, registros ARCOP y de brechas, contratos disponibles).
> **Acciones para subir de nivel:**
> - **→ 2 Básico:** Realizar una primera sensibilización al personal que trata datos personales (charla o comunicado con lo esencial de la Ley 21.719 y el deber de reserva).
> - **→ 3 Definido:** Establecer un plan anual de capacitación por perfil (jurídico, TI, operativo, administrativo) y auditorías internas periódicas de cumplimiento.
> - **→ 4 Gestionado:** Medir la capacitación (cobertura, evaluación de aprendizaje) y el cierre de hallazgos de auditoría; mantener lista la evidencia para fiscalización (RAT, EIPD, registros ARCOP y de brechas, contratos).
> - **→ 5 Optimizado:** Evaluar la adopción de un **Modelo de Prevención de Infracciones (MPI)** certificable ante la Agencia (arts. 49-52; certificación por 3 años) y usar los resultados de auditorías y fiscalizaciones para mejorar el programa.

### A14. Cesiones y compartición con otros organismos
1. Las **cesiones o comunicaciones** de datos personales a otros órganos públicos o terceros están **identificadas y amparadas en convenios** u otros instrumentos que fijan su finalidad y condiciones (art. 22).
2. **Publicamos mensualmente** en el sitio web institucional los convenios de cesión o transferencia de datos personales suscritos (art. 22, inciso final).
> **Acciones para subir de nivel:**
> - **→ 2 Básico:** Listar con qué órganos públicos y terceros se comparten datos personales hoy (convenios, oficios, interoperabilidad, planillas) y detener las cesiones informales sin respaldo.
> - **→ 3 Definido:** Formalizar cada cesión en un convenio u otro instrumento que fije su finalidad y condiciones (art. 22), publicar mensualmente en el sitio web los convenios suscritos y definir el procedimiento para responder requerimientos de **tribunales, fiscalías u otras autoridades** (protocolo sugerido por la Guía SGD, Instrumento N° 3).
> - **→ 4 Gestionado:** Controlar periódicamente que los receptores usen los datos solo para el fin que justificó la cesión, llevar registro de cesiones y requerimientos atendidos, y medir el cumplimiento de la publicación mensual.
> - **→ 5 Optimizado:** Minimizar lo compartido (solo los campos necesarios; consulta en línea por interoperabilidad en vez de copias) y revisar las cesiones ante cambios normativos o de proceso.
>
> *Nota:* la **cesión** a otro responsable (órgano público o privado) es una figura distinta del **encargo** de tratamiento (A10): el receptor decide sobre los datos y queda sujeto a la finalidad que justificó la cesión, sin poder usarlos para otros fines (art. 22). El deber de **publicación mensual de los convenios** en el sitio web es del art. 22, inciso final (verificado contra el texto legal, 2026-07-13).

---

# Módulo B — Madurez de gobernanza de datos (MGDE)

*12 dimensiones · 32 preguntas. Alineado al MGDE (adaptación de DAMA-DMBOK al Estado) y al estado del arte (CMMI, Stanford, DCAM). Énfasis en instancias de gobernanza (B1, B2), interoperabilidad semántica (B7), adopción real (B11) y gobierno de modelos e IA (B12).*

**Correspondencia con las 12 dimensiones oficiales del MGDE** (Guía Técnica SGD, actualización 29-11-2024; 52 preguntas, respuestas 0/2/4/6, niveles por porcentaje: <40% Insuficiente · 40-59% Básico · 60-79% Medio · ≥80% Avanzado):

| Dimensión MGDE (oficial) | Cubierta en |
|---|---|
| Visión estratégica | B3 (incl. datos críticos como activos estratégicos), B10 |
| Gobernanza de datos | B1, B2, B4, B11 (adopción efectiva) |
| Arquitectura, diseño y documentación | B6, B7 |
| Almacenamiento y operación | B7, B8 |
| Seguridad y ciberseguridad de datos | B8 (incl. recuperación ante desastres) + Módulo A (A8) |
| Integración e interoperabilidad | B7 |
| Documentos y contenidos | B9 |
| Datos maestros y de referencia | B7 |
| Analítica e inteligencia de negocios | B10 (incl. B10.3 uso efectivo), B12 (gobierno de modelos e IA, incl. B12.4 IA generativa) |
| Calidad de datos | B5 |
| Datos abiertos | B4 (B4.2 cumplimiento normativo, B4.3 publicación con salvaguardas), A12 (anonimización) |
| Aspectos legales y normativos | B4 + Módulo A |

*Nota metodológica:* la equivalencia de niveles es por **etiqueta**, no por puntaje (este instrumento usa escala 1-5 tipo Likert; el MGDE oficial puntúa 0/2/4/6 y clasifica por porcentaje). Para un diagnóstico oficial comparable entre instituciones del Estado, aplicar además la matriz de evaluación del nivel de madurez del MGDE (Anexo N° 1 de la Guía Técnica).

### B1. Instancias y estructura de gobernanza **(énfasis · crítica ×1.5)**
1. Existen **instancias formales** de gobierno de datos (p. ej. un comité) con mandato escrito, periodicidad definida y **actas** de sus decisiones.
2. Hay **patrocinio de la alta dirección** y un(a) responsable de datos (CDO o equivalente) con autoridad transversal.
3. Están explícitos los **derechos de decisión** sobre los datos (qué se decide a nivel central y qué en cada área), y estas instancias se **articulan con ciberseguridad y con el/la DPO**.
> **Acciones para subir de nivel:**
> - **→ 2 Básico:** Reunir periódicamente —aunque sea de manera informal— a las áreas que más usan datos para coordinar decisiones y priorizar los problemas de datos que duelen.
> - **→ 3 Definido:** Constituir formalmente las instancias (**Comité Directivo, Comité Ejecutivo y mesas de trabajo**, según el MGDE) con mandato escrito, periodicidad, actas y derechos de decisión explícitos, articuladas con ciberseguridad y DPO; esta instancia puede asumir además las funciones del Comité Ejecutivo de la Ley 21.719 (Guía SGD).
> - **→ 4 Gestionado:** Hacer seguimiento del funcionamiento con indicadores (asistencia, decisiones implementadas, avance de la hoja de ruta) y reportar a la alta dirección.
> - **→ 5 Optimizado:** Evaluar anualmente el modelo (autoevaluación del comité, ajustes de composición y mandato) y anticipar necesidades nuevas, como dominios emergentes o gobernanza de IA.

### B2. Roles y responsabilidades sobre los datos **(énfasis · crítica ×1.5)**
1. Están designados los **dueños de datos (data owners)** por dominio (p. ej. datos de personas usuarias, RRHH, finanzas).
2. Están designados **administradores o custodios de datos (data stewards)** para los dominios prioritarios, con una **matriz de responsabilidades (RACI)** (roles MGDE: CDO, data steward, analista y arquitecto de datos).
> **Acciones para subir de nivel:**
> - **→ 2 Básico:** Identificar quién responde de hecho por cada conjunto de datos relevante (personas usuarias, RRHH, finanzas) y documentarlo, aunque sea en una lista simple.
> - **→ 3 Definido:** Nombrar formalmente dueños de datos (data owners) y custodios (data stewards) por dominio prioritario, con una matriz RACI aprobada.
> - **→ 4 Gestionado:** Evaluar el desempeño de los roles (responsabilidades cumplidas, problemas de calidad y acceso resueltos) e incorporarlos a los perfiles de cargo.
> - **→ 5 Optimizado:** Extender el modelo a todos los dominios, con comunidades de práctica entre stewards y mejora continua del modelo de roles.

### B3. Estrategia, visión y recursos
1. Existe una **estrategia o política de datos** documentada y alineada a los objetivos institucionales, con una hoja de ruta.
2. Hay **presupuesto, personas y herramientas** asignados a la gobernanza de datos, y se mide su avance con **indicadores**.
3. Los **datos críticos** de la institución están **identificados y priorizados como activos estratégicos** (principio central del MGDE: los datos como activo estratégico).
> **Acciones para subir de nivel:**
> - **→ 2 Básico:** Escribir un diagnóstico breve y objetivos de datos compartidos con la jefatura: qué problemas duelen hoy, qué se quiere lograr y cuáles son los datos críticos de la institución.
> - **→ 3 Definido:** Formalizar una estrategia o política de datos alineada a los objetivos institucionales, con hoja de ruta, presupuesto, personas y herramientas asignadas, y un inventario priorizado de los datos críticos como activos estratégicos.
> - **→ 4 Gestionado:** Medir el avance de la hoja de ruta con indicadores y revisarla al menos semestralmente en las instancias de gobernanza.
> - **→ 5 Optimizado:** Actualizar la estrategia con evidencia de valor (casos de uso, ahorros, mejoras de servicio) y anticipar capacidades futuras: interoperabilidad, analítica avanzada, IA.

### B4. Políticas, estándares y cumplimiento normativo
1. Contamos con **políticas** de gestión/gobernanza de datos aprobadas y vigentes, y con **estándares** de nomenclatura, formato y clasificación.
2. Verificamos el cumplimiento de la normativa aplicable (**Ley 21.719, Ley 21.180** de Transformación Digital, transparencia y datos abiertos).
3. Publicamos **conjuntos de datos abiertos** actualizados, con las debidas salvaguardas de **anonimización** (p. ej. en datos.gob.cl).
> **Acciones para subir de nivel:**
> - **→ 2 Básico:** Recopilar las prácticas y estándares que ya se usan (nomenclatura, formatos, clasificación) y unificar lo básico en un documento de referencia compartido.
> - **→ 3 Definido:** Aprobar y difundir políticas de gestión/gobernanza de datos y estándares, controlando el cumplimiento normativo con **participación del área jurídica** (criterio MGDE) e incorporando la publicación de datos abiertos con salvaguardas de anonimización.
> - **→ 4 Gestionado:** Controlar el cumplimiento de políticas y estándares (revisiones periódicas, checklists en proyectos) y gestionar las excepciones de manera documentada.
> - **→ 5 Optimizado:** Revisar las políticas en ciclos regulares con retroalimentación de las áreas y cambios normativos, midiendo su adopción real.

### B5. Calidad de datos
1. Tenemos definidas **dimensiones de calidad** (exactitud, completitud, consistencia, oportunidad, unicidad) y reglas de calidad para los datos críticos.
2. **Medimos** la calidad con indicadores y contamos con un proceso de **remediación** con responsables por dominio.
> **Acciones para subir de nivel:**
> - **→ 2 Básico:** Elegir los datos más críticos y corregir los problemas de calidad evidentes que ya se conocen (duplicados, campos vacíos, códigos inválidos).
> - **→ 3 Definido:** Definir dimensiones y reglas de calidad para los datos críticos y un proceso de remediación con responsables por dominio.
> - **→ 4 Gestionado:** Medir la calidad con indicadores y paneles periódicos, con metas y seguimiento de la remediación en las instancias de gobernanza.
> - **→ 5 Optimizado:** Prevenir en origen (validaciones en la captura, acuerdos de calidad con las fuentes) y mejorar continuamente las reglas según el uso real de los datos.

### B6. Metadatos, catálogo y linaje
1. Contamos con un **catálogo/inventario** de datos y un **glosario** con metadatos de negocio y técnicos.
2. Registramos el **linaje/trazabilidad** de las transformaciones de datos y clasificamos los datos por sensibilidad y grado de apertura.
> **Acciones para subir de nivel:**
> - **→ 2 Básico:** Levantar un inventario simple de las bases y conjuntos de datos existentes: dónde están, quién los administra y para qué sirven.
> - **→ 3 Definido:** Implementar un catálogo de datos con glosario de negocio y metadatos técnicos, clasificando por sensibilidad y grado de apertura, coordinado con el Catálogo/RAT.
> - **→ 4 Gestionado:** Registrar el linaje de las transformaciones críticas de forma automatizada desde los propios pipelines (transformaciones versionadas en Git, SQL/dbt u otras herramientas del entorno analítico) y medir la cobertura y actualización del catálogo (p. ej. % de activos documentados).
> - **→ 5 Optimizado:** Mantener el catálogo como pieza viva integrada a los flujos (alta automática de metadatos, linaje automatizado) y como base para la reutilización y la analítica.
>
> *Nota:* dada la fragmentación histórica de sistemas heterogéneos (plataformas centrales, sistemas locales y aplicaciones legadas; p. ej., en salud, sistemas hospitalarios y de atención primaria), levantar el linaje de forma manual suele ser inviable; priorizar el linaje automatizado o documentado directamente en los pipelines de datos.

### B7. Arquitectura, interoperabilidad e integración **(crítica ×1.5)**
1. La **arquitectura de datos y los modelos de datos** institucionales están definidos y documentados.
2. Los **datos maestros y de referencia** tienen una fuente autorizada única y gestionada (p. ej. maestros de personas, unidades organizativas, productos o prestaciones).
3. Los **flujos e integraciones** entre sistemas están documentados y usan estándares de **interoperabilidad** (incluida la plataforma de interoperabilidad del Estado).
4. Utilizamos y gobernamos **estándares semánticos y de terminología sectoriales** (p. ej., en salud: **HL7 FHIR, SNOMED CT, CIE-10/CIE-11**) para asegurar la consistencia del dato entre los distintos sistemas y unidades de la institución.
> **Acciones para subir de nivel:**
> - **→ 2 Básico:** Documentar los sistemas y flujos de datos principales (un diagrama simple de qué se integra con qué) e identificar los datos maestros y las terminologías/estándares sectoriales que se usan de hecho (p. ej., en salud: CIE, SNOMED CT; o códigos locales).
> - **→ 3 Definido:** Definir la arquitectura y los modelos de datos, gestionar datos maestros y de referencia, y documentar las integraciones bajo estándares de interoperabilidad (incluida la plataforma de interoperabilidad del Estado) y, para el dato sectorial, estándares semánticos y de terminología (p. ej., en salud: HL7 FHIR, SNOMED CT, CIE-10/CIE-11) con un responsable de su gobierno.
> - **→ 4 Gestionado:** Gobernar los cambios de arquitectura en las instancias de datos y medir la reutilización de servicios/APIs, la conformidad con los estándares y la cobertura de codificación estandarizada.
> - **→ 5 Optimizado:** Avanzar hacia interoperabilidad semántica por diseño entre los sistemas de la institución (p. ej., en salud: perfiles FHIR nacionales; mapeos terminológicos mantenidos) y evaluar continuamente la deuda técnica de datos.
>
> *Nota:* la interoperabilidad no es solo conectar sistemas (sintáctica) sino entender el significado del dato (semántica); el MGDE no profundiza en este punto, por lo que B7.4 lo agrega como exigencia, especialmente relevante en sectores con terminologías especializadas (p. ej., en salud, el dato clínico).

### B8. Seguridad y control de acceso (gobernanza)
1. Clasificamos los datos por sensibilidad y **gobernamos los accesos** según necesidad de conocer (*need-to-know*), en coordinación con el Catálogo/RAT y la política de seguridad.
2. Contamos con **respaldos y un plan de recuperación ante desastres**, probados periódicamente, para los datos y sistemas críticos (criterio MGDE: Recuperación ante desastres).
> **Acciones para subir de nivel:**
> - **→ 2 Básico:** Revisar quién tiene acceso a los repositorios de datos más sensibles, depurar los accesos en desuso y verificar que existan respaldos.
> - **→ 3 Definido:** Establecer el esquema de clasificación y gobierno de accesos según necesidad de conocer, alineado al Catálogo/RAT y la política de seguridad, con plan de respaldo y recuperación documentado (criterio MGDE).
> - **→ 4 Gestionado:** Probar periódicamente respaldos y recuperación (ejercicios de continuidad), revisar los accesos en ciclos definidos y medir las excepciones.
> - **→ 5 Optimizado:** Automatizar el ciclo de accesos (alta, baja y recertificación) y mejorar continuamente con las lecciones de incidentes y ejercicios.

### B9. Ciclo de vida del dato y gestión documental
1. Está definido el **ciclo de vida del dato** (creación → uso → archivo → **retención** → disposición/eliminación), con reglas de conservación **alineadas a los plazos legales de retención documental aplicables** (p. ej., en salud, la ficha clínica: mínimo 15 años).
2. Gestionamos **documentos y expedientes electrónicos** con metadatos y trazabilidad (Decreto 10/2023), incluida la **disposición final controlada** (eliminación segura o preservación).
> **Acciones para subir de nivel:**
> - **→ 2 Básico:** Identificar dónde se acumulan datos y documentos sin reglas de conservación (carpetas, correos, sistemas legados) y detener las eliminaciones o retenciones arbitrarias.
> - **→ 3 Definido:** Definir el ciclo de vida del dato con reglas de conservación y disposición (**tabla de retención documental**, según la Guía Técnica de Gestión Documental del Estado), incorporando los plazos legales de retención documental aplicables (p. ej., en salud, la ficha clínica: mínimo 15 años, Decreto 41/2012), y gestionar documentos y expedientes electrónicos con metadatos y trazabilidad (Decreto 10/2023).
> - **→ 4 Gestionado:** Controlar la aplicación de las reglas (eliminaciones seguras documentadas, transferencias al archivo) con indicadores de cumplimiento.
> - **→ 5 Optimizado:** Automatizar la retención y disposición en los sistemas y revisar las reglas ante cambios normativos o nuevas series documentales.
>
> ⚠️ *Nota para validación jurídica:* los plazos de retención varían según la serie documental y la normativa aplicable; conviene levantarlos con Jurídico/archivo (p. ej., en salud, el plazo mínimo de **15 años** para la ficha clínica proviene del **Reglamento sobre Fichas Clínicas (Decreto 41/2012, Ley 20.584)**, contado desde la última atención registrada). Confirmar además con el archivo central si esos plazos aplican de forma homogénea a las **bases de datos analíticas históricas**, o si estas —al pasar por **anonimización irreversible** (A12) y quedar fuera del ámbito de datos personales— pueden conservarse indefinidamente con fines estadísticos, históricos o de investigación, que es la práctica recomendada (estado del arte).

### B10. Cultura, alfabetización y gestión del cambio
1. Existe un programa de **alfabetización de datos** (*data literacy*) y capacitación, y se promueve el uso de datos en la toma de decisiones.
2. Gestionamos el **cambio** y la comunicación de la gobernanza de datos, y contamos con competencias y dotación suficientes en el equipo de datos.
3. La institución **produce y utiliza regularmente productos de datos** (indicadores, tableros, informes) en su gestión y toma de decisiones.
> **Acciones para subir de nivel:**
> - **→ 2 Básico:** Partir con actividades simples de difusión (charlas, boletines, casos de uso internos) y detectar las brechas de competencias en los equipos.
> - **→ 3 Definido:** Establecer un programa de alfabetización de datos (*data literacy*) por perfil y un plan de gestión del cambio que incluya **incentivos a la captura de datos en origen** y la **demostración del valor** del dato bien registrado (p. ej. un registro de calidad acelera el trámite del propio usuario), cerrando brechas de dotación del equipo de datos.
> - **→ 4 Gestionado:** Medir el programa (cobertura, aplicación en el trabajo, uso de datos en decisiones) y ajustar los contenidos por rol.
> - **→ 5 Optimizado:** Consolidar la cultura de datos (comunidades de práctica, incentivos, decisiones basadas en evidencia como norma) con mejora continua del programa.

### B11. Adopción y cumplimiento efectivo
1. Las **políticas y estándares de datos se aplican efectivamente** en el trabajo diario de las áreas (no son solo documentos publicados).
2. Las **decisiones de las instancias de gobernanza** de datos se **implementan** y se les hace seguimiento hasta su cierre.
> **Acciones para subir de nivel:**
> - **→ 2 Básico:** Difundir las políticas y estándares existentes en lenguaje simple (resúmenes de una página, inducciones) y levantar dónde no se están usando y por qué.
> - **→ 3 Definido:** Definir mecanismos formales de adopción: un responsable de aplicar cada política en cada área, y seguimiento de los acuerdos del comité con plazos, responsables y estado en acta.
> - **→ 4 Gestionado:** Medir la adopción real (uso de estándares en sistemas nuevos, % de acuerdos del comité implementados a tiempo, consultas breves a las áreas) y gestionar los desvíos.
> - **→ 5 Optimizado:** Retroalimentar las políticas con la práctica: simplificar o retirar las que no agregan valor y reconocer a las áreas que adoptan bien.
>
> *Nota:* esta dimensión mide **gobernanza real, no documental** — distingue a la institución que tiene políticas excelentes que nadie usa de la que las tiene vivas. Complementa el nivel 4 de la escala (que mide si *cada* práctica se controla) con una vista transversal de adopción.

### B12. Gobierno de modelos analíticos e IA
1. Los **modelos analíticos, predictivos o de IA** en uso están **inventariados** y cada uno tiene un **responsable** designado.
2. Cada modelo en uso cuenta con **documentación** de su propósito, los datos con que fue construido y sus limitaciones y riesgos.
3. El **desempeño de los modelos en operación se monitorea** periódicamente (exactitud, degradación, sesgos), con un procedimiento para ajustarlos o retirarlos.
4. El uso de **herramientas de IA de propósito general** (p. ej. IA generativa) por parte del personal está regulado por **lineamientos** que resguardan los datos personales y la información institucional.
> **Acciones para subir de nivel:**
> - **→ 2 Básico:** Levantar un listado simple de los modelos, algoritmos y reglas automatizadas en uso (incluidos pilotos y planillas con lógica de decisión) y quién responde por cada uno.
> - **→ 3 Definido:** Formalizar el inventario de modelos con responsable designado y una ficha por modelo (propósito, datos utilizados, limitaciones y riesgos), con revisión previa a producción: EIPD cuando trata datos personales (A7) y registro de decisiones automatizadas exigido por la matriz SGD; dictar lineamientos para el uso de herramientas de IA de propósito general (IA generativa) por el personal.
> - **→ 4 Gestionado:** Monitorear el desempeño de los modelos en operación con métricas y umbrales (exactitud, degradación, sesgos), reevaluación periódica y trazabilidad de versiones.
> - **→ 5 Optimizado:** Alinear el gobierno de modelos con los marcos nacionales (Política Nacional de IA, transparencia algorítmica del CPLT) y publicar información de los algoritmos de mayor impacto público.
>
> *Nota:* la dimensión se incluye aunque hoy exista poca IA en producción, porque los marcos formales ya apuntan allá: la **Ley 21.719** regula las decisiones automatizadas y el perfilamiento (la matriz de levantamiento SGD exige registrarlas con "información significativa sobre la lógica aplicada"), la **Política Nacional de IA (actualización 2024, D.S. 12/2024 MinCiencia)** tiene un eje de "Gobernanza y ética", y el **CPLT** elaboró y pilotó (con GobLab UAI) una **Instrucción General sobre Transparencia Algorítmica** —inédita en América Latina— que derivó en las **Recomendaciones sobre Transparencia Algorítmica** (Res. Ex. N° 372/2024, D.O. 30-08-2024), hoy de adopción voluntaria en los servicios públicos.

---

# Módulo C — Sector salud (opcional)

*3 dimensiones · 8 preguntas. **Opcional**: se activa marcando "🏥 Esta institución pertenece al sector salud" en la portada; no afecta a las instituciones que no lo marcan. Recoge, como espacio propio, el **régimen legal reforzado del dato de salud** —que antes de generalizar el instrumento estaba integrado en los Módulos A/B—: arts. 16 y 16 bis de la Ley 21.719, la Ley 20.584 y el Reglamento sobre Fichas Clínicas (Decreto 41/2012), la EIPD (art. 15 ter) y la interoperabilidad clínica. Contenido verificado contra el texto legal (2026-07-14).*

### C1. Datos de salud y régimen reforzado **(crítica ×1.5)**
1. Usamos los datos de salud y del **perfil biológico** solo para **fines de salud** (los que permiten las leyes sanitarias), y solo cuando una **norma nos autoriza** a tratarlos (art. 16 bis).
2. **No** usamos datos de salud ni muestras biológicas que se hayan recogido en contextos **laborales, educativos, deportivos, de seguros o de seguridad social**, salvo que una ley lo permita expresamente (art. 16 bis).
3. Protegemos los datos de salud, biométricos y del perfil biológico con **medidas de seguridad más estrictas** (cifrado, acceso restringido y registro de quién accede) y con **cuidados adicionales** para los datos de niños, niñas y adolescentes.
> **Acciones para subir de nivel:**
> - **→ 2 Básico:** Identificar dónde se tratan datos de salud, del perfil biológico y biométricos, y verificar que su uso responda a un fin sanitario y a una base de licitud.
> - **→ 3 Definido:** Documentar, para cada tratamiento de datos de salud, el fin sanitario que lo habilita (art. 16 bis) y sus medidas reforzadas de seguridad; formalizar el deber de reserva y secreto del personal clínico.
> - **→ 4 Gestionado:** Controlar periódicamente que no se traten datos de salud para fines ajenos a las leyes sanitarias ni datos recolectados en ámbitos laboral/educativo/de seguros sin autorización legal, midiendo accesos indebidos.
> - **→ 5 Optimizado:** Minimizar de forma continua (anonimización/seudonimización por defecto en la analítica clínica) y anticipar riesgos como la reidentificación por cruce de fuentes de salud.
>
> ⚠️ *Nota para validación jurídica:* el **art. 16 bis** restringe el tratamiento de datos de salud y del perfil biológico a los fines de las leyes sanitarias y **prohíbe** usar datos/muestras recolectados en el ámbito laboral, educativo, deportivo, de seguros o de seguridad social salvo autorización legal expresa (verificado contra el texto legal).

### C2. Ficha clínica y derechos del paciente (Ley 20.584)
1. Guardamos la **ficha clínica** al menos **15 años** desde la última atención, como exige el **Reglamento sobre Fichas Clínicas (Decreto 41/2012)**, con custodia y registro de quién accede a ella.
2. Cuando un paciente pide **ver o copiar su ficha clínica**, respondemos según la **Ley 20.584** y por el **mismo canal** con que atendemos los derechos de la Ley 21.719 (sin tener dos vías separadas).
> **Acciones para subir de nivel:**
> - **→ 2 Básico:** Identificar dónde están las fichas clínicas (en papel y electrónicas) y quién accede a ellas; cerrar los accesos evidentemente excesivos.
> - **→ 3 Definido:** Aplicar el Reglamento sobre Fichas Clínicas (Decreto 41/2012): conservación mínima de 15 años desde la última atención, con custodia y trazabilidad; formalizar el procedimiento de acceso y entrega de copia según la Ley 20.584.
> - **→ 4 Gestionado:** Medir el cumplimiento de las solicitudes de copia o rectificación de la ficha clínica (plazos y trazabilidad) y coordinarlas con el flujo ARCOP de la Ley 21.719 para no duplicar canales.
> - **→ 5 Optimizado:** Automatizar donde aporte (solicitud y entrega de copia, verificación de identidad) y usar las solicitudes recibidas como señal para mejorar la calidad del registro clínico.

### C3. Interoperabilidad clínica y datos de salud a gran escala
1. Usamos y mantenemos **estándares clínicos comunes** (HL7 FHIR, SNOMED CT, CIE-10/CIE-11) para que el dato clínico **signifique lo mismo** en los distintos establecimientos y sistemas de la **red asistencial**.
2. Antes de iniciar un **tratamiento masivo** de datos de salud (registros nacionales, listas de espera, tamizajes, modelos predictivos) hacemos una **Evaluación de Impacto (EIPD)** (art. 15 ter).
3. Cuando **reutilizamos** datos de salud para investigación, estadística o salud pública, lo hacemos con datos **anonimizados o seudonimizados**, cuidando que no se pueda **reidentificar** a las personas.
> **Acciones para subir de nivel:**
> - **→ 2 Básico:** Identificar las terminologías clínicas que se usan de hecho (CIE, SNOMED CT, códigos locales) y los tratamientos de datos de salud a gran escala (registros, listas de espera).
> - **→ 3 Definido:** Adoptar estándares semánticos y de terminología clínica (HL7 FHIR, SNOMED CT, CIE-10/CIE-11) con un responsable de su gobierno, y exigir EIPD previa a los tratamientos masivos de datos de salud (art. 15 ter).
> - **→ 4 Gestionado:** Medir la cobertura de codificación clínica estandarizada y la conformidad con los estándares; controlar que el uso secundario (investigación, estadística) pase por anonimización/seudonimización.
> - **→ 5 Optimizado:** Avanzar hacia interoperabilidad semántica por diseño en la red asistencial (perfiles FHIR nacionales, mapeos terminológicos mantenidos) e incorporar técnicas avanzadas (privacidad diferencial, datos sintéticos) en el uso secundario.

---

## Fuentes

- **Ley 21.719** — regula la protección y el tratamiento de datos personales y crea la Agencia de Protección de Datos Personales. Texto oficial (BCN): https://www.bcn.cl/leychile/navegar?idNorma=1209272
- **Guía Práctica** de implementación de la nueva ley (SGD): https://wikiguias.digital.gob.cl/datos-personales/guia-practica-implementacion-nueva-ley-datos-personales
- **Registro de Actividades de Tratamiento (RAT)** — plantilla SGD: https://wikiguias.digital.gob.cl/datos-personales/registro-de-actividades-de-tratamiento
- **Política de tratamiento de datos** (modelo SGD): https://wikiguias.digital.gob.cl/datos-personales/politica-tratamiento-datos
- **Guía de Anonimización de datos** (SGD): https://wikiguias.digital.gob.cl/guias/Guia_anonimizacion
- **MGDE — Marco de Referencia de Gestión de Datos del Estado**: https://wikiguias.digital.gob.cl/guias/Gu%C3%ADa_MGDE
- **Índice de leyes/reglamentos** (SGD): https://wikiguias.digital.gob.cl/es/Leyes
- **Decreto 10/2023** — Norma Técnica de Documentos y Expedientes Electrónicos: https://www.bcn.cl/leychile/navegar?idNorma=1195123
- **Política Nacional de Inteligencia Artificial** (actualización 2024, D.S. 12/2024 MinCiencia; eje gobernanza y ética): https://www.minciencia.gob.cl/areas/inteligencia-artificial/politica-nacional-de-inteligencia-artificial/
- **Transparencia algorítmica en el sector público** (CPLT + GobLab UAI; Recomendaciones sobre Transparencia Algorítmica, Res. Ex. N° 372/2024 CPLT, en adopción por los servicios): https://www.consejotransparencia.cl/organismos-publicos-avanzan-en-transparencia-algoritmica-siguiendo-recomendaciones-del-cplt/
- **Síntesis de la Ley 21.719** (BCN, Informe 12-25, abril 2025): https://obtienearchivo.bcn.cl/obtienearchivo?id=repositorio/10221/37137/1/Informe_12_25_Ley_Datos_Personales_rev.pdf
- **Guía Técnica de Gestión Documental del Estado** (2019): https://cms-dgd-prod.s3-us-west-2.amazonaws.com/uploads/pdf/Guia_de_Gesti%C3%B3n_Documental.pdf
- **MGDE — presentación oficial** (GobLab UAI / SGD, 12 dimensiones · 52 criterios · 4 niveles): https://goblab.uai.cl/en/espanol-gobierno-digital-presento-el-marco-de-gestion-de-datos-del-estado-de-chile-elaborado-con-goblab-uai/
- Referencia interna: `anonimizacion-datos/` (implementación de referencia de k-anonimato / l-diversidad).
- **Data Strategy Playbook** (BID / Public Digital) — modelo de "acciones para elevar el nivel de madurez" por condición: https://publicdigital.github.io/data-strategy-playbook/
