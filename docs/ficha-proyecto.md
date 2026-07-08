# Ficha de proyecto

| Campo | Detalle |
|-------|---------|
| **Nombre del proyecto** | levantamiento-gobierno-datos |
| **Objetivo** | Herramienta de autoevaluación de madurez organizacional frente a la nueva Ley de Protección de Datos Personales (Ley 21.719, vigente 1-dic-2026) y del estado del arte en gobernanza de datos (MGDE). Formulario tipo Likert, simple y en lenguaje claro, que entrega un diagnóstico con puntajes por dimensión, brechas y recomendaciones para la institución. El levantamiento se hace **por sesiones** (una reunión por área/departamento) y la herramienta consolida las sesiones en un panorama institucional (matriz dimensión × área, brechas transversales). Está pensada para una institución **que recién arma su gobernanza (sin DPO aún)**: entrega meta institucional explícita (nivel 3 «Definido»), resumen ejecutivo para presentar a jefaturas y una ruta de arranque, de modo de usar el diagnóstico para impulsar la estrategia. |
| **Solicitante** | Paulo Villarroel (pvillarroeltapia@gmail.com). Solicitado el 2026-07-08. |
| **Responsable(s)** | Paulo Villarroel (validación de contenido con contraparte Jurídica / DPO pendiente). |
| **Entregable** | App web construida con **Astro + React + TypeScript** (build estático; se ejecuta en local con `npm run dev` / `npm run build`) + **servidor local opcional** (`npm run servidor`, SQLite vía `node:sqlite`, sin dependencias) para centralizar las sesiones en el equipo del facilitador + banco de preguntas documentado + README. |
| **Fuentes de datos** | No consume datos internos de ninguna institución. Se basa en fuentes normativas públicas: Ley 21.719; Guía Práctica de implementación (Secretaría de Gobierno Digital); MGDE (Marco de Gestión de Datos del Estado); Guía de Anonimización; plantilla RAT de la SGD. Las respuestas del cuestionario las genera cada usuario en su navegador y **no se almacenan en el repositorio**. |
| **Fecha de entrega** | Por definir (idealmente en uso antes del 1-dic-2026). |
| **Frecuencia** | Permanente — autoevaluación repetible (medición de avance en el tiempo). |
| **Estado** | En progreso |

## Notas

- **Naturaleza del dato:** las respuestas son un autodiagnóstico institucional; se tratan como datos y **nunca se suben al repo** (van a `.gitignore`, incluida la carpeta `datos/` del servidor SQLite). Persisten en el navegador de quien responde y, opcionalmente, en la base SQLite local del equipo facilitador; pueden exportarse/importarse como JSON local.
- **Validación pendiente:** el banco de preguntas debe revisarse con la contraparte Jurídica / DPO y contrastarse con el texto oficial de la Ley 21.719 y la Guía de la SGD antes de un uso formal. Ver `docs/banco-preguntas.md`.
- **Descargo:** instrumento orientativo de autodiagnóstico, no constituye asesoría legal.
