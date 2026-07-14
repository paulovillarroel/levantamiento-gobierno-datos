# Guía de contribución

¡Gracias por tu interés en mejorar este instrumento! Es una herramienta **de uso referencial** para el diagnóstico de madurez en protección y gobernanza de datos de instituciones públicas. Las contribuciones más valiosas son las que **mejoran la precisión normativa** del banco de preguntas y las que lo hacen **más útil para cualquier institución** (no atado a un sector).

## Formas de contribuir

### 1. Abrir un *issue*
En **New issue** elige la plantilla que corresponda:

- **⚖️ Corrección normativa** — una pregunta, acción o nota que no refleja bien la Ley 21.719, el MGDE u otra fuente oficial. *Requiere citar la fuente.*
- **➕ Sugerencia de pregunta o dimensión** — una capacidad que el instrumento no mide y debería.
- **🐛 Reporte de error** — algo falla en la app, el servidor SQLite, el Docker o el skill.

### 2. Enviar un *Pull Request*
Para cambios concretos. Antes de abrirlo, lee las convenciones de abajo.

## Regla de oro: el contenido normativo se cita, no se recuerda
Toda afirmación del banco que toque una obligación legal o un marco debe **anclarse en una fuente oficial** (las de la sección *Fuentes* del [README](README.md)), idealmente con el **artículo o sección** exacto. No agregues normativa "de memoria".

- Si un punto es dudoso o depende de interpretación jurídica, márcalo con **⚠️** en `docs/banco-preguntas.md` para validación de Jurídico/DPO — no lo afirmes como certeza.
- Mantén el instrumento **genérico**: la salud (u otro sector) solo como *ejemplo* (`p. ej., en salud, …`), nunca como el eje.

## El "espejo": tres archivos que van juntos
El banco de preguntas vive en **tres** lugares que **deben quedar sincronizados en el mismo PR**:

1. `src/data/banco.ts` — **fuente de verdad** (lo que consume la app).
2. `docs/banco-preguntas.md` — espejo legible (con notas jurídicas y acciones por nivel).
3. `docs/cuestionario.md` — versión imprimible; **se regenera, no se edita a mano**:
   ```bash
   node scripts/generar-cuestionario.mjs
   ```

Un PR que cambia preguntas sin actualizar los tres no se acepta.

## Principio de instrumento liviano
Es un **levantamiento inicial**, respondible en una reunión. Antes de proponer preguntas nuevas, considera si el punto no está ya cubierto por otra dimensión. Preferimos **pocas preguntas que midan bien** a un checklist exhaustivo (el detalle fino pertenece a la fase de protocolos, no al diagnóstico). Toda pregunta nueva debe justificar su aporte y su anclaje.

## Decisiones de diseño (ADR)
Los cambios de criterio (nueva dimensión, cambio de criticidad o peso, metodología de puntaje) se documentan como un **ADR** en `docs/decisiones/NNN-titulo.md`, siguiendo el formato de los existentes.

## Convención de *commits*
Usamos [Conventional Commits](https://www.conventionalcommits.org/):

```
<tipo>(<ámbito>): <resumen en imperativo>
```

- **Tipos:** `feat`, `fix`, `docs`, `refactor`, `chore`, `test`.
- **Ámbitos sugeridos:** `banco` (preguntas), `app`, `servidor`, `skill`, `infra`, `docs`.
- Ejemplos: `fix(banco): corregir base de licitud de A2 según art. 20`, `feat(app): exportar consolidado a PDF`.
- Un cambio con ámbito `banco` **debe** actualizar el espejo (ver arriba).

## Antes de abrir el PR

```bash
npm install
npm run check                            # typecheck (debe pasar)
npm run build                            # build estático (debe pasar)
node scripts/generar-cuestionario.mjs    # solo si tocaste el banco
```

- Trabaja en una **rama** desde `main` y abre el PR **contra `main`**.
- Describe **qué** cambia y **por qué**; si es normativo, cita la fuente.
- **Nunca** incluyas datos de respuestas reales: la carpeta `datos/`, los JSON/CSV exportados y `.claude/settings.local.json` están en `.gitignore` — no los subas.

## Privacidad
Cuando se aplica, este instrumento trata datos institucionales sensibles. Las **respuestas nunca van al repositorio**. Si necesitas ejemplos, usa datos ficticios.

## Alcance y licencia
El instrumento no constituye asesoría legal; su contenido debe validarse con el equipo jurídico de cada institución. Al contribuir, aceptas que tu aporte se licencie bajo **MIT** (ver [`LICENSE`](LICENSE)).
