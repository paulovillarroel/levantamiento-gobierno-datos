# 006 — Criterio explícito para las dimensiones críticas (×1.5)

| Campo | Detalle |
|-------|---------|
| **Fecha** | 2026-07-09 |
| **Responsable** | Paulo Villarroel |

## Contexto

Las dimensiones "críticas" pesan ×1.5 en el puntaje y encabezan las brechas priorizadas, pero el conjunto original (A3, A4, A8, A9, B1, B2) no respondía a un criterio explícito. Al revisarlas contra la Ley 21.719 quedó a la vista que dos **deberes legales directos y basales** no estaban marcados: la **base de licitud** (A2) —sin ella ningún tratamiento es válido; es el fundamento de todo el régimen para órganos públicos— y los **derechos de los titulares** (A6) —deber con plazos, de cara al ciudadano, con reclamo directo ante la Agencia—.

## Decisión

Criterio de criticidad, documentado en `docs/banco-preguntas.md` (⚠️ pendiente de validación jurídica):

- **Módulo A — crítico = deber legal directo y basal del responsable:** A2 (base de licitud), A3 (inventario/catálogo, art. 14 ter), A4 (datos sensibles, régimen reforzado), A6 (derechos ARCOP), A8 (deber de seguridad, art. 14 quinquies), A9 (notificación de brechas, art. 14 sexies). → Se **agregan A2 y A6** al conjunto.
- **No crítico = instrumental o condicional:** A1 (organizativa), A5 (consentimiento: excepcional en órganos públicos, cuya base habitual es la función legal), A7 (EIPD, según riesgo — *borderline* para la institución por el volumen de datos sensibles; se deja a decisión de Jurídico), A10/A11 (condicionales a encargados/transferencias), A12 (técnica), A13 (cultural).
- **Módulo B:** se mantienen B1 y B2 (instancias y roles), las fundaciones de gobernanza donde el MGDE pone su énfasis.

## Consecuencias

- El puntaje del Módulo A ahora pondera más el cumplimiento legal basal; las respuestas guardadas no requieren migración (los pesos se aplican al calcular).
- Queda un punto abierto para la contraparte jurídica: si A7 (EIPD) debe ser crítica dado que la institución trata datos sensibles a gran escala (donde la EIPD es exigible), y la clasificación exacta de gravedad de las infracciones asociadas a cada dimensión. *(Resuelto: A7 pasó a crítica en la ADR 008 — cuando el organismo trata datos sensibles a gran escala, la condición de alto riesgo se cumple por regla general.)*
