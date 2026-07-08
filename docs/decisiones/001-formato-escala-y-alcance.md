# 001 — Formato, escala y alcance de la herramienta de autoevaluación

| Campo | Detalle |
|-------|---------|
| **Fecha** | 2026-07-08 |
| **Responsable** | Paulo Villarroel |

## Contexto

Se necesita un instrumento para que las áreas de la institución evalúen su madurez frente a la Ley 21.719 (vigente 1-dic-2026) y frente al estado del arte en gobernanza de datos. Debía ser simple de responder, en lenguaje claro y fácil de distribuir en una institución (navegadores heterogéneos/restringidos, sensibilidad del tema). Se definieron tres ejes: **formato**, **escala de respuesta** y **alcance**.

## Opciones consideradas

**Formato**
1. **App web en un archivo HTML autónomo** — se abre con doble clic, sin servidor ni instalación; los datos no salen del equipo.
2. **Planilla Excel** con puntaje automático — familiar, pero dispersa versiones y depende de macros/fórmulas.
3. **Google Forms** + hoja de resultados — cómodo para muchos respondentes, pero las respuestas viven en la nube (indeseable para este tema) y requiere cuenta Google.
4. **Documento** con banco de preguntas — sólo especificación, sin herramienta interactiva.

**Escala**
1. **Madurez 1-5 con lenguaje claro** (anclada a niveles tipo CMMI: Inicial→Optimizado), mapeada a los 4 niveles del MGDE.
2. **Likert de acuerdo 1-5** (Totalmente en desacuerdo→Totalmente de acuerdo).

**Alcance**
1. **Dos módulos**: A) preparación Ley 21.719 · B) gobernanza de datos (MGDE).
2. Sólo Ley 21.719.
3. Sólo gobernanza (MGDE).

## Decisión

- **Formato:** app web en **un solo `index.html` autónomo** (CSS/JS inline, sin dependencias externas ni CDN; funciona con `file://` y offline).
- **Escala:** **madurez 1-5 en lenguaje claro** + opción "No sé / No aplica", con mapeo a los 4 niveles del MGDE (Insuficiente/Básico/Medio/Avanzado).
- **Alcance:** **dos módulos** (A: Ley 21.719 con 13 dimensiones; B: gobernanza/MGDE con 10 dimensiones), ~47 preguntas en total.

## Justificación

- **Portabilidad y privacidad:** un HTML autónomo se distribuye por correo, se abre con doble clic y **ningún dato sale del equipo** (localStorage + export/import local). Es coherente con la convención del equipo "datos en OneDrive, nunca al repo" y con la naturaleza del tema (protección de datos).
- **Sin infraestructura:** no requiere servidor, cuentas, ni permisos de instalación en la institución.
- **Escala de madurez, no sólo acuerdo:** el objetivo es medir *madurez*; anclar cada nivel con una frase en lenguaje claro conserva la simpleza de un Likert pero produce un diagnóstico accionable y comparable con el instrumento oficial del MGDE (4 niveles).
- **Dos módulos:** el solicitante pidió evaluar tanto el cumplimiento de la nueva ley como el estado del arte en gobernanza de datos; se resuelven como dos subpuntajes con un panel combinado.
