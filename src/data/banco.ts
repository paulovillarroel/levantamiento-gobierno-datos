// ============================================================================
// Banco de preguntas + escala de madurez (fuente de verdad de la app).
// Espejo legible en docs/banco-preguntas.md — mantener ambos sincronizados.
//
// Cada dimensión trae una escalera de `acciones` por nivel: la clave indica el
// nivel que se busca ALCANZAR (n2 = de Inicial a Básico, ... n5 = a Optimizado).
// ============================================================================
import type { Banco, Modulo, NivelEscala } from '../lib/tipos';

/**
 * Meta institucional mínima por dimensión: nivel 3 «Definido» (formalizado y documentado).
 * Es el estándar que exigen la Ley 21.719 y el MGDE; las dimensiones críticas del
 * Módulo A debieran alcanzarlo antes del 1-dic-2026.
 */
export const NIVEL_META = 3;

export const ESCALA: NivelEscala[] = [
  { v: 1, nombre: 'Inicial',    frase: 'No lo hacemos / caso a caso',    desc: 'No hay práctica formal; reactivo, depende de personas, sin documentar.',           color: 'var(--n1)', mgde: 'Insuficiente' },
  { v: 2, nombre: 'Básico',     frase: 'Lo hacemos de manera informal',  desc: 'Prácticas parciales, inconsistentes, sin formalizar.',                             color: 'var(--n2)', mgde: 'Básico' },
  { v: 3, nombre: 'Definido',   frase: 'Está formalizado y documentado', desc: 'Políticas/roles/instancias definidos, aprobados y aplicados transversalmente.',    color: 'var(--n3)', mgde: 'Medio' },
  { v: 4, nombre: 'Gestionado', frase: 'Lo medimos y controlamos',       desc: 'Se mide con indicadores, se controla el cumplimiento, decisiones con evidencia.',   color: 'var(--n4)', mgde: 'Avanzado' },
  { v: 5, nombre: 'Optimizado', frase: 'Mejoramos de forma continua',    desc: 'Mejora continua, se anticipan problemas, cultura de datos consolidada.',           color: 'var(--n5)', mgde: 'Avanzado+' },
];

export const FUENTES: ReadonlyArray<readonly [string, string]> = [
  ['Ley 21.719 (texto oficial, BCN)', 'https://www.bcn.cl/leychile/navegar?idNorma=1209272'],
  ['Guía Práctica de implementación (SGD, Ministerio de Hacienda)', 'https://wikiguias.digital.gob.cl/datos-personales/guia-practica-implementacion-nueva-ley-datos-personales'],
  ['Registro de Actividades de Tratamiento (RAT)', 'https://wikiguias.digital.gob.cl/datos-personales/registro-de-actividades-de-tratamiento'],
  ['Guía de Anonimización de datos', 'https://wikiguias.digital.gob.cl/guias/Guia_anonimizacion'],
  ['Marco de Referencia de Gestión de Datos del Estado (MGDE)', 'https://wikiguias.digital.gob.cl/guias/Gu%C3%ADa_MGDE'],
  ['Índice de leyes/reglamentos (SGD)', 'https://wikiguias.digital.gob.cl/es/Leyes'],
  ['Síntesis de la Ley 21.719 (BCN, Informe 12-25)', 'https://obtienearchivo.bcn.cl/obtienearchivo?id=repositorio/10221/37137/1/Informe_12_25_Ley_Datos_Personales_rev.pdf'],
  ['Decreto 10/2023 — Norma Técnica de Documentos y Expedientes Electrónicos', 'https://www.bcn.cl/leychile/navegar?idNorma=1195123'],
  ['Política Nacional de Inteligencia Artificial (actualización 2024, MinCiencia)', 'https://www.minciencia.gob.cl/areas/inteligencia-artificial/politica-nacional-de-inteligencia-artificial/'],
];

export const BANCO: Banco = {
  modulos: [
    {
      id: 'A',
      titulo: 'Módulo A — Preparación para la Ley 21.719',
      tituloCorto: 'Módulo A · Ley 21.719',
      descripcion: 'Cumplimiento y preparación de la institución frente a la nueva Ley de Protección de Datos Personales.',
      dimensiones: [
        {
          id: 'A1', nombre: 'Gobernanza y responsabilidad proactiva', peso: 1, critica: false,
          acciones: {
            n2: 'Ejecutar los "primeros pasos" de la Guía SGD: la jefatura designa a un(a) encargado(a) o responsable institucional —priorizando capacidad de gestión, sin esperar a contar con DPO— (Acción N° 1) y comunica a toda la institución el inicio de la implementación (Acción N° 3); empezar a reunir en un solo lugar la evidencia que ya existe (actas, políticas, oficios).',
            n3: 'Constituir formalmente el proyecto de implementación (acta y carta Gantt, Acción N° 2 de la Guía SGD) y el Comité Ejecutivo (representante de la jefatura, encargado(a) como secretaría técnica, jurídica, TI, control de gestión y las áreas que más datos tratan; ~2 sesiones al mes, con actas), y abrir un repositorio de evidencia de cumplimiento.',
            n4: 'Medir el avance del plan con indicadores (hitos de la carta Gantt, % de acciones de la Guía SGD completadas) y reportarlo periódicamente a la jefatura de servicio; evaluar la designación de un(a) DPO con autonomía e independencia.',
            n5: 'Revisar anualmente el modelo de gobernanza con las lecciones de auditorías, brechas y fiscalizaciones, anticipando cambios normativos; evaluar certificar un Modelo de Prevención de Infracciones (MPI) ante la Agencia.',
          },
          preguntas: [
            { id: 'A1.1', texto: 'La institución designó formalmente a un(a) encargado(a) o responsable institucional de la implementación de la Ley 21.719, con respaldo de la jefatura de servicio.' },
            { id: 'A1.2', texto: 'Contamos con un(a) Delegado(a) de Protección de Datos designado(a) —figura voluntaria que la Guía SGD recomienda—, con los requisitos técnicos, autonomía e independencia que establece la ley.' },
            { id: 'A1.3', texto: 'Mantenemos evidencia documentada (actas, políticas, registros) que permite demostrar el cumplimiento de la ley.' },
          ],
        },
        {
          id: 'A2', nombre: 'Base de licitud (órgano público)', peso: 1.5, critica: true,
          acciones: {
            n2: 'Identificar, para los tratamientos más relevantes, qué norma o función legal los habilita, y recordar al personal el deber de reserva al asumir sus funciones.',
            n3: 'Documentar la base de licitud de cada actividad del Catálogo/RAT (función legal del órgano, obligación legal, consentimiento u otra) y formalizar el deber de reserva (cláusulas de confidencialidad en contratos y convenios).',
            n4: 'Controlar periódicamente que ningún tratamiento se use con fines incompatibles con la finalidad declarada y auditar la vigencia de las bases de licitud documentadas.',
            n5: 'Revisar las bases de licitud ante cada cambio normativo o de proceso, y evaluar la licitud antes de crear nuevos tratamientos (integrado al checklist de privacidad desde el diseño).',
          },
          preguntas: [
            { id: 'A2.1', texto: 'Para cada tratamiento identificamos y documentamos su base de licitud (función legal del órgano, obligación legal, consentimiento u otra).' },
            { id: 'A2.2', texto: 'Los tratamientos se limitan al ejercicio de nuestras funciones y competencias legales, sin usos incompatibles con la finalidad declarada.' },
            { id: 'A2.3', texto: 'El personal conoce y aplica el deber de reserva/confidencialidad sobre los datos personales.' },
          ],
        },
        {
          id: 'A3', nombre: 'Inventario de datos y Catálogo/RAT', peso: 1.5, critica: true,
          acciones: {
            n2: 'Iniciar el levantamiento por las áreas que tratan más datos personales, usando la matriz de la Guía SGD (qué datos, si son sensibles, finalidad, dónde se almacenan, retención y transferencias), sin olvidar las unidades de soporte (oficina de partes, jurídica, bienestar), que suelen tratar datos sensibles.',
            n3: 'Completar el levantamiento en todas las áreas, elaborar el informe de hallazgos y construir el Catálogo/RAT (formatos tipo SGD; el RAT que publica la propia SGD, de 9 campos, sirve de modelo); asignar responsable de su mantención.',
            n4: 'Definir un proceso de actualización del RAT gatillado por nuevos sistemas, convenios o formularios, con indicadores de cobertura y vigencia (p. ej. % de actividades revisadas en los últimos 12 meses).',
            n5: 'Integrar el Catálogo/RAT con el catálogo de datos institucional (Módulo B) y usarlo como insumo vivo para EIPD, gestión de accesos y anonimización, revisando continuamente su calidad.',
          },
          preguntas: [
            { id: 'A3.1', texto: 'Realizamos un levantamiento de los datos personales que trata cada área (qué datos, si son sensibles, con qué finalidad, dónde se almacenan, cuánto se conservan y a quién se transfieren).' },
            { id: 'A3.2', texto: 'Contamos con un catálogo o registro de actividades de tratamiento (RAT) que documenta, por actividad, finalidad, base de licitud, categorías de datos y de titulares (deber de información y transparencia, art. 14 ter).' },
            { id: 'A3.3', texto: 'El RAT también registra destinatarios, plazos de conservación y fuente de los datos, y se mantiene actualizado.' },
          ],
        },
        {
          id: 'A4', nombre: 'Datos sensibles', peso: 1.5, critica: true,
          acciones: {
            n2: 'Identificar los sistemas y planillas donde hay datos sensibles (salud, situación socioeconómica, datos biométricos, etc.) o de niños, niñas y adolescentes, y cerrar los accesos evidentemente excesivos (carpetas compartidas abiertas, cuentas genéricas).',
            n3: 'Clasificar formalmente los datos sensibles en el Catálogo/RAT, verificar su base de licitud conforme a la finalidad y a la norma sectorial que los habilita, y definir reglas específicas para datos de NNA.',
            n4: 'Aplicar y monitorear medidas reforzadas (cifrado, control y registro de accesos) con revisiones periódicas de quién accede a qué, midiendo accesos indebidos e incidentes.',
            n5: 'Minimizar de forma continua (anonimización/seudonimización por defecto en analítica e investigación) y anticipar riesgos emergentes, como la reidentificación por cruce de fuentes.',
          },
          preguntas: [
            { id: 'A4.1', texto: 'Tenemos identificados y clasificados los datos sensibles que tratamos (p. ej. salud, situación socioeconómica, afiliación política o sindical, creencias, datos biométricos, vida sexual).' },
            { id: 'A4.2', texto: 'El tratamiento de datos sensibles se ampara en una base de licitud válida y se limita a los fines de la norma que lo habilita (p. ej., en salud, las leyes sanitarias).' },
            { id: 'A4.3', texto: 'Aplicamos medidas reforzadas a los datos sensibles (cifrado, acceso restringido, registro de accesos) y resguardos especiales para datos de niños, niñas y adolescentes.' },
          ],
        },
        {
          id: 'A5', nombre: 'Consentimiento, información y transparencia', peso: 1, critica: false,
          acciones: {
            n2: 'Revisar en qué formularios y trámites se recolectan datos con consentimiento y agregar avisos básicos de privacidad donde falten.',
            n3: 'Publicar la política de tratamiento con la información mínima (modelo SGD) y estandarizar los mecanismos de consentimiento (previo, libre, informado, específico e inequívoco; expreso para datos sensibles) y su retiro expedito y gratuito.',
            n4: 'Verificar periódicamente que avisos y consentimientos estén vigentes y sean consistentes con el Catálogo/RAT; medir las solicitudes de retiro y sus tiempos de respuesta.',
            n5: 'Probar la comprensión real de los avisos (lenguaje claro) con usuarios y mejorar continuamente los flujos de consentimiento con esa retroalimentación.',
          },
          preguntas: [
            { id: 'A5.1', texto: 'Cuando la base es el consentimiento, lo obtenemos en forma previa, libre, informada, específica e inequívoca, y de forma expresa para datos sensibles.' },
            { id: 'A5.2', texto: 'Publicamos políticas/avisos de privacidad con la información mínima (responsable, finalidades, base de licitud, destinatarios, plazos, derechos y canal de ejercicio).' },
            { id: 'A5.3', texto: 'Existe un mecanismo expedito, gratuito y permanentemente disponible para retirar (revocar) el consentimiento.' },
          ],
        },
        {
          id: 'A6', nombre: 'Derechos de los titulares (ARCOP + bloqueo/portabilidad)', peso: 1.5, critica: true,
          acciones: {
            n2: 'Definir un punto de entrada provisorio (p. ej. la OIRS) y una persona responsable de responder solicitudes de derechos mientras se formaliza el procedimiento.',
            n3: 'Formalizar el procedimiento ARCOP (acceso, rectificación, cancelación/supresión, oposición, portabilidad y bloqueo) con plazos legales, formatos de respuesta y registro trazable, y habilitar un canal único (la Guía SGD recomienda la OIRS para el sector público), unificando —sin duplicar— los flujos ya regulados por normativa sectorial (p. ej., en salud, la entrega de copia de la ficha clínica bajo la Ley 20.584).',
            n4: 'Medir el cumplimiento (volumen, plazos, tipo de derecho, resultado) y controlar los casos complejos: oposición a decisiones automatizadas y portabilidad en formato estructurado de uso común.',
            n5: 'Automatizar donde aporte (verificación de identidad, portabilidad) y usar las solicitudes recibidas como señal para mejorar procesos y calidad de datos.',
          },
          preguntas: [
            { id: 'A6.1', texto: 'Existe un canal y un procedimiento para ejercer los derechos de acceso, rectificación, cancelación/supresión, oposición, portabilidad y bloqueo.' },
            { id: 'A6.2', texto: 'Atendemos las solicitudes dentro del plazo legal y dejamos registro trazable (ingreso, respuesta y evidencia).' },
            { id: 'A6.3', texto: 'Gestionamos la oposición a decisiones automatizadas y perfilamiento, y podemos entregar los datos en formato estructurado, genérico y de uso común (portabilidad).' },
          ],
        },
        {
          id: 'A7', nombre: 'Evaluación de Impacto (EIPD/DPIA)', peso: 1.5, critica: true,
          acciones: {
            n2: 'Acordar criterios simples para reconocer los tratamientos que la ley somete siempre a EIPD (evaluación sistemática y exhaustiva con decisiones automatizadas, tratamiento masivo o a gran escala, observación sistemática de zonas de acceso público, datos sensibles en las hipótesis de excepción del consentimiento — art. 15 ter) y listar cuáles de los tratamientos actuales los cumplen.',
            n3: 'Adoptar una plantilla de EIPD y aplicarla en forma previa al inicio de los tratamientos de alto riesgo identificados, con análisis de riesgo y medidas de mitigación documentadas.',
            n4: 'Incorporar la EIPD como control obligatorio del ciclo de proyectos y sistemas —incluidos los de analítica, ciencia de datos y BI— (ningún tratamiento de alto riesgo inicia sin EIPD aprobada) y hacer seguimiento a las medidas comprometidas.',
            n5: 'Reevaluar las EIPD ante cambios relevantes del tratamiento y compartir aprendizajes entre áreas; consultar a la Agencia cuando el riesgo residual siga siendo alto.',
          },
          preguntas: [
            { id: 'A7.1', texto: 'Tenemos criterios para identificar tratamientos de alto riesgo que requieren una Evaluación de Impacto (EIPD).' },
            { id: 'A7.2', texto: 'Realizamos EIPD documentadas en forma previa al inicio de esos tratamientos, con análisis de riesgo y medidas de mitigación.' },
          ],
        },
        {
          id: 'A8', nombre: 'Seguridad y protección desde el diseño/por defecto', peso: 1.5, critica: true,
          acciones: {
            n2: 'Aplicar controles básicos en los sistemas con datos personales: cuentas individuales (no compartidas), mínimo privilegio, respaldos, y corte de accesos al desvincular personal.',
            n3: 'Formalizar medidas de seguridad por nivel de riesgo —alineadas con la Norma Técnica de Seguridad de la Información y Ciberseguridad (Decreto 7/2023, Ley 21.180)— y un checklist de privacidad desde el diseño/por defecto para nuevos desarrollos y adquisiciones.',
            n4: 'Medir el cumplimiento de los controles (cobertura de cifrado, revisiones de acceso, hallazgos y cierre de auditorías) y exigir el checklist de diseño aprobado en cada proyecto nuevo.',
            n5: 'Gestionar la seguridad como mejora continua: pruebas periódicas (escaneos de vulnerabilidades, ethical hacking), lecciones de incidentes propios y de otras instituciones públicas, y ajuste de controles.',
          },
          preguntas: [
            { id: 'A8.1', texto: 'Los accesos a los sistemas y bases con datos personales siguen el principio de mínimo privilegio: cada persona accede solo a lo que su función requiere.' },
            { id: 'A8.2', texto: 'Los datos personales sensibles están cifrados, tanto almacenados como en tránsito.' },
            { id: 'A8.3', texto: 'Los sistemas que tratan datos personales mantienen registros de acceso y actividad (logs).' },
            { id: 'A8.4', texto: 'Incorporamos la protección desde el diseño y por defecto al crear sistemas, servicios o formularios (minimizando la recolección).' },
          ],
        },
        {
          id: 'A9', nombre: 'Gestión de brechas de seguridad', peso: 1.5, critica: true,
          acciones: {
            n2: 'Definir a quién se avisa internamente ante un incidente con datos personales y llevar un registro simple de los incidentes que ocurran.',
            n3: 'Redactar y aprobar el protocolo de brechas con el flujo de notificación a la Agencia (por los medios más expeditos posibles y sin dilaciones indebidas) y la comunicación en lenguaje claro a los titulares cuando corresponda; mantener un registro estructurado de vulneraciones.',
            n4: 'Ensayar el protocolo con simulacros al menos anuales, medir tiempos de detección y notificación, y coordinarlo con el flujo de incidentes de ciberseguridad institucional.',
            n5: 'Analizar tendencias del registro de vulneraciones para prevenir recurrencias y mejorar el protocolo después de cada ensayo o brecha real.',
          },
          preguntas: [
            { id: 'A9.1', texto: 'Tenemos un procedimiento documentado para detectar, evaluar y gestionar brechas de datos personales.' },
            { id: 'A9.2', texto: 'El procedimiento define la notificación a la Agencia por los medios más expeditos posibles y sin dilaciones indebidas, y la comunicación en lenguaje claro a los titulares cuando la brecha afecte datos sensibles, de menores de 14 años o económico-financieros.' },
            { id: 'A9.3', texto: 'Mantenemos un registro de las vulneraciones (naturaleza, efectos, categorías de datos, titulares afectados y medidas adoptadas) y realizamos pruebas/simulacros de respuesta.' },
          ],
        },
        {
          id: 'A10', nombre: 'Encargados (procesadores) y terceros', peso: 1, critica: false,
          acciones: {
            n2: 'Listar los proveedores y convenios que implican tratamiento de datos por cuenta de la institución (soporte, nube, digitación, laboratorios, aseguradoras, etc.).',
            n3: 'Suscribir o actualizar los acuerdos de tratamiento (DPA) regulando finalidad, duración, seguridad, confidencialidad, subencargados y devolución/eliminación al término (art. 15 bis), e incluir cláusulas tipo en compras públicas y convenios (formatos SGD).',
            n4: 'Controlar el cumplimiento de los DPA (evidencia de medidas de seguridad del proveedor, certificaciones o auditorías) y mantener el inventario de encargados al día.',
            n5: 'Evaluar el riesgo de terceros en forma continua (criticidad, incidentes, dependencia) y ajustar cláusulas y controles según ese riesgo.',
          },
          preguntas: [
            { id: 'A10.1', texto: 'Tenemos identificados los encargados/terceros que tratan datos por cuenta de la institución.' },
            { id: 'A10.2', texto: 'Existen contratos o acuerdos de tratamiento (DPA) que regulan finalidad, duración, seguridad, confidencialidad, subencargados y la devolución/eliminación de datos al término del servicio.' },
          ],
        },
        {
          id: 'A11', nombre: 'Transferencias internacionales de datos', peso: 1, critica: false,
          acciones: {
            n2: 'Identificar qué servicios (especialmente en la nube) almacenan o procesan datos fuera de Chile, preguntando a TI y revisando los contratos vigentes.',
            n3: 'Documentar los flujos transfronterizos en el Catálogo/RAT y ampararlos en un mecanismo válido (país con nivel adecuado de protección, cláusulas contractuales modelo u otras garantías adecuadas — arts. 27-28: las cláusulas modelo las aprueba la Agencia; transitoriamente la Guía SGD refiere las CCM del Ministerio de Economía).',
            n4: 'Revisar periódicamente que los mecanismos sigan vigentes (cambios de proveedor, subencargados o países) y controlar toda nueva contratación cloud antes de firmar.',
            n5: 'Evaluar residencia de datos y minimización para reducir transferencias, anticipando decisiones de adecuación y cambios regulatorios.',
          },
          preguntas: [
            { id: 'A11.1', texto: 'Tenemos identificadas las transferencias internacionales de datos (incluidos servicios en la nube fuera de Chile).' },
            { id: 'A11.2', texto: 'Esas transferencias se amparan en un mecanismo válido (nivel adecuado de protección, cláusulas contractuales modelo u otras garantías apropiadas).' },
          ],
        },
        {
          id: 'A12', nombre: 'Anonimización / seudonimización', peso: 1, critica: false,
          acciones: {
            n2: 'Antes de compartir o publicar datos, eliminar los identificadores directos obvios (RUN, nombre, dirección, teléfono) y someter la salida a revisión de un par.',
            n3: 'Adoptar el procedimiento de la Guía de Anonimización (clasificar identificadores directos, indirectos/cuasi-identificadores y atributos objetivos; aplicar supresión, k-anonimato, l-diversidad o seudonimización) y resguardar las tablas de correspondencia cifradas y con acceso restringido.',
            n4: 'Evaluar el riesgo de reidentificación antes, durante y después de cada publicación relevante, con umbrales definidos (p. ej. k mínimo) y registro de las evaluaciones.',
            n5: 'Incorporar técnicas avanzadas donde aporten (privacidad diferencial, datos sintéticos) y reevaluar publicaciones históricas cuando aparezcan nuevas fuentes de cruce.',
          },
          preguntas: [
            { id: 'A12.1', texto: 'Antes de compartir o publicar datos, clasificamos los atributos (identificadores directos, identificadores indirectos o cuasi-identificadores, y atributos objetivos) y aplicamos técnicas adecuadas (supresión, k-anonimato, l-diversidad, seudonimización).' },
            { id: 'A12.2', texto: 'Cuando seudonimizamos, mantenemos la tabla de correspondencia cifrada y con acceso restringido, y evaluamos el riesgo de reidentificación antes, durante y después.' },
          ],
        },
        {
          id: 'A13', nombre: 'Cultura, capacitación y mejora continua', peso: 1, critica: false,
          acciones: {
            n2: 'Realizar una primera sensibilización al personal que trata datos personales (charla o comunicado con lo esencial de la Ley 21.719 y el deber de reserva).',
            n3: 'Establecer un plan anual de capacitación por perfil (jurídico, TI, operativo, administrativo) y auditorías internas periódicas de cumplimiento.',
            n4: 'Medir la capacitación (cobertura, evaluación de aprendizaje) y el cierre de hallazgos de auditoría; mantener lista la evidencia para fiscalización (RAT, EIPD, registros ARCOP y de brechas, contratos).',
            n5: 'Evaluar la adopción de un Modelo de Prevención de Infracciones (MPI) certificable ante la Agencia y usar los resultados de auditorías y fiscalizaciones para mejorar el programa.',
          },
          preguntas: [
            { id: 'A13.1', texto: 'Ejecutamos un programa de capacitación/sensibilización continua en protección de datos para el personal.' },
            { id: 'A13.2', texto: 'Realizamos monitoreo o auditorías internas del cumplimiento y estamos preparados para una fiscalización de la Agencia (RAT, EIPD, registros ARCOP y de brechas, contratos disponibles).' },
          ],
        },
        {
          id: 'A14', nombre: 'Cesiones y compartición con otros organismos', peso: 1, critica: false,
          acciones: {
            n2: 'Listar con qué órganos públicos y terceros se comparten datos personales hoy (convenios, oficios, interoperabilidad, planillas) y detener las cesiones informales sin respaldo.',
            n3: 'Formalizar cada cesión en un convenio u otro instrumento que fije su finalidad y condiciones (art. 22), publicar mensualmente en el sitio web los convenios suscritos y definir el procedimiento para responder requerimientos de tribunales, fiscalías u otras autoridades (protocolo sugerido por la Guía SGD).',
            n4: 'Controlar periódicamente que los receptores usen los datos solo para el fin que justificó la cesión, llevar registro de cesiones y requerimientos atendidos, y medir el cumplimiento de la publicación mensual.',
            n5: 'Minimizar lo compartido (solo los campos necesarios; consulta en línea por interoperabilidad en vez de copias) y revisar las cesiones ante cambios normativos o de proceso.',
          },
          preguntas: [
            { id: 'A14.1', texto: 'Las cesiones o comunicaciones de datos personales a otros órganos públicos o terceros están identificadas y amparadas en convenios u otros instrumentos que fijan su finalidad y condiciones.' },
            { id: 'A14.2', texto: 'Publicamos mensualmente en el sitio web institucional los convenios de cesión o transferencia de datos personales suscritos.' },
          ],
        },
      ],
    },
    {
      id: 'B',
      titulo: 'Módulo B — Madurez de gobernanza de datos (MGDE)',
      tituloCorto: 'Módulo B · Gobernanza (MGDE)',
      descripcion: 'Estado del arte en gobernanza y gestión de datos, alineado al Marco de Gestión de Datos del Estado (MGDE).',
      dimensiones: [
        {
          id: 'B1', nombre: 'Instancias y estructura de gobernanza', peso: 1.5, critica: true,
          acciones: {
            n2: 'Reunir periódicamente —aunque sea de manera informal— a las áreas que más usan datos para coordinar decisiones y priorizar los problemas de datos que duelen.',
            n3: 'Constituir formalmente las instancias de gobierno de datos (Comité Directivo, Comité Ejecutivo y mesas de trabajo, según el MGDE) con mandato escrito, periodicidad, actas y derechos de decisión explícitos, articuladas con ciberseguridad y DPO; esta instancia puede asumir además las funciones del Comité Ejecutivo de la Ley 21.719 (Guía SGD).',
            n4: 'Hacer seguimiento del funcionamiento con indicadores (asistencia, decisiones implementadas, avance de la hoja de ruta) y reportar a la alta dirección.',
            n5: 'Evaluar anualmente el modelo (autoevaluación del comité, ajustes de composición y mandato) y anticipar necesidades nuevas, como dominios emergentes o gobernanza de IA.',
          },
          preguntas: [
            { id: 'B1.1', texto: 'Existen instancias formales de gobierno de datos (p. ej. un comité) con mandato escrito, periodicidad definida y actas de sus decisiones.' },
            { id: 'B1.2', texto: 'Hay patrocinio de la alta dirección y un(a) responsable de datos (CDO o equivalente) con autoridad transversal.' },
            { id: 'B1.3', texto: 'Están explícitos los derechos de decisión sobre los datos (qué se decide a nivel central y qué en cada área), y estas instancias se articulan con ciberseguridad y con el/la DPO.' },
          ],
        },
        {
          id: 'B2', nombre: 'Roles y responsabilidades sobre los datos', peso: 1.5, critica: true,
          acciones: {
            n2: 'Identificar quién responde de hecho por cada conjunto de datos relevante (personas usuarias, RRHH, finanzas) y documentarlo, aunque sea en una lista simple.',
            n3: 'Nombrar formalmente dueños de datos (data owners) y custodios (data stewards) por dominio prioritario, con una matriz RACI aprobada.',
            n4: 'Evaluar el desempeño de los roles (responsabilidades cumplidas, problemas de calidad y acceso resueltos) e incorporarlos a los perfiles de cargo.',
            n5: 'Extender el modelo a todos los dominios, con comunidades de práctica entre stewards y mejora continua del modelo de roles.',
          },
          preguntas: [
            { id: 'B2.1', texto: 'Están designados los dueños de datos (data owners) por dominio (p. ej. datos de personas usuarias, RRHH, finanzas).' },
            { id: 'B2.2', texto: 'Están designados administradores o custodios de datos (data stewards) para los dominios prioritarios, con una matriz de responsabilidades (RACI).' },
          ],
        },
        {
          id: 'B3', nombre: 'Estrategia, visión y recursos', peso: 1, critica: false,
          acciones: {
            n2: 'Escribir un diagnóstico breve y objetivos de datos compartidos con la jefatura: qué problemas duelen hoy, qué se quiere lograr y cuáles son los datos críticos de la institución.',
            n3: 'Formalizar una estrategia o política de datos alineada a los objetivos institucionales, con hoja de ruta, presupuesto, personas y herramientas asignadas, y un inventario priorizado de los datos críticos como activos estratégicos.',
            n4: 'Medir el avance de la hoja de ruta con indicadores y revisarla al menos semestralmente en las instancias de gobernanza.',
            n5: 'Actualizar la estrategia con evidencia de valor (casos de uso, ahorros, mejoras de servicio) y anticipar capacidades futuras: interoperabilidad, analítica avanzada, IA.',
          },
          preguntas: [
            { id: 'B3.1', texto: 'Existe una estrategia o política de datos documentada y alineada a los objetivos institucionales, con una hoja de ruta.' },
            { id: 'B3.2', texto: 'Hay presupuesto, personas y herramientas asignados a la gobernanza de datos, y se mide su avance con indicadores.' },
            { id: 'B3.3', texto: 'Los datos críticos de la institución están identificados y priorizados como activos estratégicos.' },
          ],
        },
        {
          id: 'B4', nombre: 'Políticas, estándares y cumplimiento normativo', peso: 1, critica: false,
          acciones: {
            n2: 'Recopilar las prácticas y estándares que ya se usan (nomenclatura, formatos, clasificación) y unificar lo básico en un documento de referencia compartido.',
            n3: 'Aprobar y difundir políticas de gestión/gobernanza de datos y estándares de nomenclatura, formato y clasificación, controlando el cumplimiento normativo con participación del área jurídica (criterio MGDE) e incorporando la publicación de datos abiertos con salvaguardas de anonimización.',
            n4: 'Controlar el cumplimiento de políticas y estándares (revisiones periódicas, checklists en proyectos) y gestionar las excepciones de manera documentada.',
            n5: 'Revisar las políticas en ciclos regulares con retroalimentación de las áreas y cambios normativos, midiendo su adopción real.',
          },
          preguntas: [
            { id: 'B4.1', texto: 'Contamos con políticas de gestión/gobernanza de datos aprobadas y vigentes, y con estándares de nomenclatura, formato y clasificación.' },
            { id: 'B4.2', texto: 'Verificamos el cumplimiento de la normativa aplicable (Ley 21.719, Ley 21.180 de Transformación Digital, transparencia y datos abiertos).' },
            { id: 'B4.3', texto: 'Publicamos conjuntos de datos abiertos actualizados, con las debidas salvaguardas de anonimización (p. ej. en datos.gob.cl).' },
          ],
        },
        {
          id: 'B5', nombre: 'Calidad de datos', peso: 1, critica: false,
          acciones: {
            n2: 'Elegir los datos más críticos y corregir los problemas de calidad evidentes que ya se conocen (duplicados, campos vacíos, códigos inválidos).',
            n3: 'Definir dimensiones y reglas de calidad para los datos críticos (exactitud, completitud, consistencia, oportunidad, unicidad) y un proceso de remediación con responsables por dominio.',
            n4: 'Medir la calidad con indicadores y paneles periódicos, con metas y seguimiento de la remediación en las instancias de gobernanza.',
            n5: 'Prevenir en origen (validaciones en la captura, acuerdos de calidad con las fuentes) y mejorar continuamente las reglas según el uso real de los datos.',
          },
          preguntas: [
            { id: 'B5.1', texto: 'Tenemos definidas dimensiones de calidad (exactitud, completitud, consistencia, oportunidad, unicidad) y reglas de calidad para los datos críticos.' },
            { id: 'B5.2', texto: 'Medimos la calidad con indicadores y contamos con un proceso de remediación con responsables por dominio.' },
          ],
        },
        {
          id: 'B6', nombre: 'Metadatos, catálogo y linaje', peso: 1, critica: false,
          acciones: {
            n2: 'Levantar un inventario simple de las bases y conjuntos de datos existentes: dónde están, quién los administra y para qué sirven.',
            n3: 'Implementar un catálogo de datos con glosario de negocio y metadatos técnicos, clasificando por sensibilidad y grado de apertura, coordinado con el Catálogo/RAT.',
            n4: 'Registrar el linaje de las transformaciones críticas de forma automatizada desde los propios pipelines (transformaciones versionadas en Git, SQL/dbt u otras herramientas del entorno analítico) y medir la cobertura y actualización del catálogo (p. ej. % de activos documentados).',
            n5: 'Mantener el catálogo como pieza viva integrada a los flujos (alta automática de metadatos, linaje automatizado) y como base para la reutilización y la analítica.',
          },
          preguntas: [
            { id: 'B6.1', texto: 'Contamos con un catálogo/inventario de datos y un glosario con metadatos de negocio y técnicos.' },
            { id: 'B6.2', texto: 'Registramos el linaje/trazabilidad de las transformaciones de datos y clasificamos los datos por sensibilidad y grado de apertura.' },
          ],
        },
        {
          id: 'B7', nombre: 'Arquitectura, interoperabilidad e integración', peso: 1.5, critica: true,
          acciones: {
            n2: 'Documentar los sistemas y flujos de datos principales (un diagrama simple de qué se integra con qué) e identificar los datos maestros y las terminologías/estándares sectoriales que se usan de hecho (p. ej., en salud: CIE, SNOMED CT; o códigos locales).',
            n3: 'Definir la arquitectura y los modelos de datos, gestionar datos maestros y de referencia, y documentar las integraciones bajo estándares de interoperabilidad (incluida la plataforma de interoperabilidad del Estado) y, para el dato sectorial, estándares semánticos y de terminología (p. ej., en salud: HL7 FHIR, SNOMED CT, CIE-10/CIE-11) con un responsable de su gobierno.',
            n4: 'Gobernar los cambios de arquitectura en las instancias de datos y medir la reutilización de servicios/APIs, la conformidad con los estándares y la cobertura de codificación estandarizada.',
            n5: 'Avanzar hacia interoperabilidad semántica por diseño entre los sistemas de la institución (p. ej., en salud: perfiles FHIR nacionales; mapeos terminológicos mantenidos) y evaluar continuamente la deuda técnica de datos.',
          },
          preguntas: [
            { id: 'B7.1', texto: 'La arquitectura de datos y los modelos de datos institucionales están definidos y documentados.' },
            { id: 'B7.2', texto: 'Los datos maestros y de referencia tienen una fuente autorizada única y gestionada (p. ej. maestros de personas, unidades organizativas, productos o prestaciones).' },
            { id: 'B7.3', texto: 'Los flujos e integraciones entre sistemas están documentados y usan estándares de interoperabilidad (incluida la plataforma de interoperabilidad del Estado).' },
            { id: 'B7.4', texto: 'Utilizamos y gobernamos estándares semánticos y de terminología sectoriales (p. ej., en salud: HL7 FHIR, SNOMED CT, CIE-10/CIE-11) para asegurar la consistencia del dato entre los distintos sistemas y unidades de la institución.' },
          ],
        },
        {
          id: 'B8', nombre: 'Seguridad y control de acceso (gobernanza)', peso: 1, critica: false,
          acciones: {
            n2: 'Revisar quién tiene acceso a los repositorios de datos más sensibles, depurar los accesos en desuso y verificar que existan respaldos.',
            n3: 'Establecer un esquema de clasificación y gobierno de accesos según necesidad de conocer (need-to-know), alineado al Catálogo/RAT y la política de seguridad, con plan de respaldo y recuperación documentado (criterio MGDE).',
            n4: 'Probar periódicamente respaldos y recuperación (ejercicios de continuidad), revisar los accesos en ciclos definidos y medir las excepciones.',
            n5: 'Automatizar el ciclo de accesos (alta, baja y recertificación) y mejorar continuamente con las lecciones de incidentes y ejercicios.',
          },
          preguntas: [
            { id: 'B8.1', texto: 'Clasificamos los datos por sensibilidad y gobernamos los accesos según necesidad de conocer (need-to-know), en coordinación con el Catálogo/RAT y la política de seguridad.' },
            { id: 'B8.2', texto: 'Contamos con respaldos y un plan de recuperación ante desastres, probados periódicamente, para los datos y sistemas críticos.' },
          ],
        },
        {
          id: 'B9', nombre: 'Ciclo de vida del dato y gestión documental', peso: 1, critica: false,
          acciones: {
            n2: 'Identificar dónde se acumulan datos y documentos sin reglas de conservación (carpetas, correos, sistemas legados) y detener las eliminaciones o retenciones arbitrarias.',
            n3: 'Definir el ciclo de vida del dato con reglas de conservación y disposición (tabla de retención documental), incorporando los plazos legales de retención documental aplicables (p. ej., en salud, la ficha clínica: mínimo 15 años, Decreto 41/2012), y gestionar documentos y expedientes electrónicos con metadatos y trazabilidad (Decreto 10/2023).',
            n4: 'Controlar la aplicación de las reglas (eliminaciones seguras documentadas, transferencias al archivo) con indicadores de cumplimiento.',
            n5: 'Automatizar la retención y disposición en los sistemas y revisar las reglas ante cambios normativos o nuevas series documentales.',
          },
          preguntas: [
            { id: 'B9.1', texto: 'Está definido el ciclo de vida del dato (creación → uso → archivo → retención → disposición/eliminación), con reglas de conservación alineadas a los plazos legales de retención documental aplicables (p. ej., en salud, la ficha clínica: mínimo 15 años).' },
            { id: 'B9.2', texto: 'Gestionamos documentos y expedientes electrónicos con metadatos y trazabilidad (Decreto 10/2023), incluida la disposición final controlada (eliminación segura o preservación).' },
          ],
        },
        {
          id: 'B10', nombre: 'Cultura, alfabetización y gestión del cambio', peso: 1, critica: false,
          acciones: {
            n2: 'Partir con actividades simples de difusión (charlas, boletines, casos de uso internos) y detectar las brechas de competencias en los equipos.',
            n3: 'Establecer un programa de alfabetización de datos (data literacy) por perfil y un plan de gestión del cambio que incluya incentivos a la captura de datos en origen y la demostración del valor del dato bien registrado (p. ej. un registro de calidad acelera el trámite del propio usuario), cerrando brechas de dotación del equipo de datos.',
            n4: 'Medir el programa (cobertura, aplicación en el trabajo, uso de datos en decisiones) y ajustar los contenidos por rol.',
            n5: 'Consolidar la cultura de datos (comunidades de práctica, incentivos, decisiones basadas en evidencia como norma) con mejora continua del programa.',
          },
          preguntas: [
            { id: 'B10.1', texto: 'Existe un programa de alfabetización de datos (data literacy) y capacitación, y se promueve el uso de datos en la toma de decisiones.' },
            { id: 'B10.2', texto: 'Gestionamos el cambio y la comunicación de la gobernanza de datos, y contamos con competencias y dotación suficientes en el equipo de datos.' },
            { id: 'B10.3', texto: 'La institución produce y utiliza regularmente productos de datos (indicadores, tableros, informes) en su gestión y toma de decisiones.' },
          ],
        },
        {
          id: 'B11', nombre: 'Adopción y cumplimiento efectivo', peso: 1, critica: false,
          acciones: {
            n2: 'Difundir las políticas y estándares existentes en lenguaje simple (resúmenes de una página, inducciones) y levantar dónde no se están usando y por qué.',
            n3: 'Definir mecanismos formales de adopción: un responsable de aplicar cada política en cada área, y seguimiento de los acuerdos del comité con plazos, responsables y estado en acta.',
            n4: 'Medir la adopción real (uso de estándares en sistemas nuevos, % de acuerdos del comité implementados a tiempo, consultas breves a las áreas) y gestionar los desvíos.',
            n5: 'Retroalimentar las políticas con la práctica: simplificar o retirar las que no agregan valor y reconocer a las áreas que adoptan bien.',
          },
          preguntas: [
            { id: 'B11.1', texto: 'Las políticas y estándares de datos se aplican efectivamente en el trabajo diario de las áreas (no son solo documentos publicados).' },
            { id: 'B11.2', texto: 'Las decisiones de las instancias de gobernanza de datos se implementan y se les hace seguimiento hasta su cierre.' },
          ],
        },
        {
          id: 'B12', nombre: 'Gobierno de modelos analíticos e IA', peso: 1, critica: false,
          acciones: {
            n2: 'Levantar un listado simple de los modelos, algoritmos y reglas automatizadas en uso (incluidos pilotos y planillas con lógica de decisión) y quién responde por cada uno.',
            n3: 'Formalizar el inventario de modelos con responsable designado y una ficha por modelo (propósito, datos utilizados, limitaciones y riesgos), con revisión previa a producción: EIPD cuando trata datos personales (A7) y registro de decisiones automatizadas exigido por la matriz SGD; dictar lineamientos para el uso de herramientas de IA de propósito general (IA generativa) por el personal.',
            n4: 'Monitorear el desempeño de los modelos en operación con métricas y umbrales (exactitud, degradación, sesgos), reevaluación periódica y trazabilidad de versiones.',
            n5: 'Alinear el gobierno de modelos con los marcos nacionales (Política Nacional de IA, transparencia algorítmica del CPLT) y publicar información de los algoritmos de mayor impacto público.',
          },
          preguntas: [
            { id: 'B12.1', texto: 'Los modelos analíticos, predictivos o de IA en uso están inventariados y cada uno tiene un responsable designado.' },
            { id: 'B12.2', texto: 'Cada modelo en uso cuenta con documentación de su propósito, los datos con que fue construido y sus limitaciones y riesgos.' },
            { id: 'B12.3', texto: 'El desempeño de los modelos en operación se monitorea periódicamente (exactitud, degradación, sesgos), con un procedimiento para ajustarlos o retirarlos.' },
            { id: 'B12.4', texto: 'El uso de herramientas de IA de propósito general (p. ej. IA generativa) por parte del personal está regulado por lineamientos que resguardan los datos personales y la información institucional.' },
          ],
        },
      ],
    },
  ],
};

/**
 * Módulo C — Sector salud (OPCIONAL). Preguntas sectoriales para instituciones de salud,
 * ancladas en el régimen reforzado de datos de salud (arts. 16 y 16 bis Ley 21.719),
 * la Ley 20.584 y el Reglamento sobre Fichas Clínicas (Decreto 41/2012), la EIPD (art. 15 ter)
 * y la interoperabilidad clínica. Se agrega al banco solo si la sesión marca `sectorSalud`.
 */
export const MODULO_SALUD: Modulo = {
  id: 'C',
  titulo: 'Módulo C — Sector salud (opcional)',
  tituloCorto: 'Módulo C · Sector salud',
  descripcion: 'Preguntas sectoriales para instituciones de salud: régimen reforzado de datos de salud, ficha clínica e interoperabilidad clínica. Responder solo si la institución pertenece al sector salud.',
  dimensiones: [
    {
      id: 'C1', nombre: 'Datos de salud y régimen reforzado', peso: 1.5, critica: true,
      acciones: {
        n2: 'Identificar dónde se tratan datos de salud, del perfil biológico y biométricos, y verificar que su uso responda a un fin sanitario y a una base de licitud.',
        n3: 'Documentar, para cada tratamiento de datos de salud, el fin sanitario que lo habilita (art. 16 bis) y sus medidas reforzadas de seguridad; formalizar el deber de reserva y secreto del personal clínico.',
        n4: 'Controlar periódicamente que no se traten datos de salud para fines ajenos a las leyes sanitarias ni datos recolectados en ámbitos laboral/educativo/de seguros sin autorización legal, midiendo accesos indebidos.',
        n5: 'Minimizar de forma continua (anonimización/seudonimización por defecto en la analítica clínica) y anticipar riesgos como la reidentificación por cruce de fuentes de salud.',
      },
      preguntas: [
        { id: 'C1.1', texto: 'El tratamiento de datos de salud y del perfil biológico humano se limita a los fines de las leyes especiales en materia sanitaria (art. 16 bis) y se ampara en una base de licitud válida.' },
        { id: 'C1.2', texto: 'No tratamos datos de salud ni muestras biológicas recolectados en el ámbito laboral, educativo, deportivo, de seguros o de seguridad social, salvo autorización legal expresa (art. 16 bis).' },
        { id: 'C1.3', texto: 'Aplicamos medidas reforzadas (cifrado, acceso restringido y registro de accesos) a los datos de salud, biométricos y del perfil biológico, con resguardos especiales para niños, niñas y adolescentes.' },
      ],
    },
    {
      id: 'C2', nombre: 'Ficha clínica y derechos del paciente (Ley 20.584)', peso: 1, critica: false,
      acciones: {
        n2: 'Identificar dónde están las fichas clínicas (en papel y electrónicas) y quién accede a ellas; cerrar los accesos evidentemente excesivos.',
        n3: 'Aplicar el Reglamento sobre Fichas Clínicas (Decreto 41/2012): conservación mínima de 15 años desde la última atención, con custodia y trazabilidad; formalizar el procedimiento de acceso y entrega de copia según la Ley 20.584.',
        n4: 'Medir el cumplimiento de las solicitudes de copia o rectificación de la ficha clínica (plazos y trazabilidad) y coordinarlas con el flujo ARCOP de la Ley 21.719 para no duplicar canales.',
        n5: 'Automatizar donde aporte (solicitud y entrega de copia, verificación de identidad) y usar las solicitudes recibidas como señal para mejorar la calidad del registro clínico.',
      },
      preguntas: [
        { id: 'C2.1', texto: 'La ficha clínica se conserva conforme al Reglamento sobre Fichas Clínicas (Decreto 41/2012): plazo mínimo de 15 años desde la última atención, con custodia y trazabilidad.' },
        { id: 'C2.2', texto: 'El acceso y la entrega de copia de la ficha clínica se gestionan según la Ley 20.584, coordinados con el procedimiento ARCOP de la Ley 21.719 en un canal único (sin duplicar).' },
      ],
    },
    {
      id: 'C3', nombre: 'Interoperabilidad clínica y datos de salud a gran escala', peso: 1, critica: false,
      acciones: {
        n2: 'Identificar las terminologías clínicas que se usan de hecho (CIE, SNOMED CT, códigos locales) y los tratamientos de datos de salud a gran escala (registros, listas de espera).',
        n3: 'Adoptar estándares semánticos y de terminología clínica (HL7 FHIR, SNOMED CT, CIE-10/CIE-11) con un responsable de su gobierno, y exigir EIPD previa a los tratamientos masivos de datos de salud (art. 15 ter).',
        n4: 'Medir la cobertura de codificación clínica estandarizada y la conformidad con los estándares; controlar que el uso secundario (investigación, estadística) pase por anonimización/seudonimización.',
        n5: 'Avanzar hacia interoperabilidad semántica por diseño en la red asistencial (perfiles FHIR nacionales, mapeos terminológicos mantenidos) e incorporar técnicas avanzadas (privacidad diferencial, datos sintéticos) en el uso secundario.',
      },
      preguntas: [
        { id: 'C3.1', texto: 'Usamos y gobernamos estándares semánticos y de terminología clínica (HL7 FHIR, SNOMED CT, CIE-10/CIE-11) para la consistencia del dato clínico entre los nodos de la red asistencial.' },
        { id: 'C3.2', texto: 'Los tratamientos masivos o a gran escala de datos de salud (registros nacionales, listas de espera, tamizajes, modelos predictivos) cuentan con una Evaluación de Impacto (EIPD) previa (art. 15 ter).' },
        { id: 'C3.3', texto: 'El uso secundario de datos de salud (investigación, estadística y salud pública) se realiza con anonimización o seudonimización y control del riesgo de reidentificación.' },
      ],
    },
  ],
};

/** Banco activo según el sector: agrega el Módulo C (salud) si la sesión lo marca. */
export function componerBanco(sectorSalud: boolean): Banco {
  return { modulos: sectorSalud ? [...BANCO.modulos, MODULO_SALUD] : BANCO.modulos };
}

/** Cuenta las preguntas de un banco cualquiera (para totales dinámicos con/sin Módulo C). */
export function contarPreguntasBanco(banco: Banco): number {
  return banco.modulos.reduce((n, m) => n + m.dimensiones.reduce((k, d) => k + d.preguntas.length, 0), 0);
}

/** Lista plana de todas las preguntas del banco. */
export function todasLasPreguntas(): { modId: string; dim: Banco['modulos'][number]['dimensiones'][number]; pregunta: { id: string; texto: string } }[] {
  const out: { modId: string; dim: Banco['modulos'][number]['dimensiones'][number]; pregunta: { id: string; texto: string } }[] = [];
  for (const mod of BANCO.modulos) {
    for (const dim of mod.dimensiones) {
      for (const pregunta of dim.preguntas) {
        out.push({ modId: mod.id, dim, pregunta });
      }
    }
  }
  return out;
}

export const TOTAL_PREGUNTAS = todasLasPreguntas().length;
