<!-- Gracias por contribuir. Completa este checklist antes de pedir revisión. -->

## Qué cambia y por qué
<!-- Describe el cambio. Si es normativo, cita la fuente oficial (URL + artículo o sección). -->

## Tipo
- [ ] `fix` corrección
- [ ] `feat` nueva capacidad
- [ ] `docs`
- [ ] `refactor` / `chore`

## Checklist
- [ ] Si toqué el **banco de preguntas**, actualicé el espejo: `src/data/banco.ts` **y** `docs/banco-preguntas.md`, y regeneré `docs/cuestionario.md` (`node scripts/generar-cuestionario.mjs`).
- [ ] Toda afirmación normativa está **citada** con su fuente oficial (artículo/sección); lo dudoso quedó marcado con ⚠️.
- [ ] `npm run check` y `npm run build` pasan.
- [ ] Mantuve el instrumento **genérico** (salud u otro sector solo como ejemplo, no como eje).
- [ ] Si es un cambio de criterio (dimensión, criticidad, peso, metodología), agregué/actualicé un **ADR** en `docs/decisiones/`.
- [ ] No incluí datos de respuestas reales (`datos/`, exports, `settings.local.json`).
- [ ] El/los commit(s) siguen Conventional Commits (`tipo(ámbito): resumen`).
