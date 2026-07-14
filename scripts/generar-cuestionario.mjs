// Genera docs/cuestionario.md (solo preguntas, imprimible) desde src/data/banco.ts.
// Uso: node scripts/generar-cuestionario.mjs   (Node ≥ 23.6: importa TS nativamente)
import { componerBanco, contarPreguntasBanco, ESCALA } from '../src/data/banco.ts';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// Imprimible completo: incluye el Módulo C (sector salud), marcado como opcional.
const banco = componerBanco(true);
const TOTAL = contarPreguntasBanco(banco);

const L = [];
L.push('# Cuestionario — Autoevaluación de madurez (Ley 21.719 + Gobernanza de datos)');
L.push('');
L.push('> Versión imprimible de **solo las preguntas** para las reuniones de levantamiento por área/departamento.');
L.push('> Generado automáticamente desde `src/data/banco.ts` — **no editar a mano**; regenerar con `node scripts/generar-cuestionario.mjs`.');
L.push('> La versión completa (con acciones por nivel y notas jurídicas) está en `docs/banco-preguntas.md`.');
L.push('> Incluye el **Módulo C — Sector salud (opcional)**: respóndelo solo si la institución pertenece al sector salud.');
L.push('');
L.push('**Datos de la sesión**');
L.push('');
L.push('| Campo | Respuesta |');
L.push('|---|---|');
L.push('| Institución / Subsecretaría / Servicio | |');
L.push('| Área / Unidad / Departamento | |');
L.push('| Rol de quien responde | |');
L.push('| Participantes de la reunión | |');
L.push('| Fecha | |');
L.push('');
L.push('## Escala de respuesta (igual para todas las preguntas)');
L.push('');
L.push('| Nivel | Etiqueta | Qué significa |');
L.push('|:---:|---|---|');
for (const e of ESCALA) {
  L.push(`| ${e.v} | **${e.nombre}** — "${e.frase}" | ${e.desc} |`);
}
L.push('');
L.push('Si no sabe o no aplica, marque **NS** (No sé / No aplica): esa pregunta no se promedia y queda como pendiente por cerrar.');
L.push('');

for (const mod of banco.modulos) {
  L.push('---');
  L.push('');
  L.push(`# ${mod.titulo}`);
  L.push('');
  L.push(`*${mod.descripcion}*`);
  L.push('');
  for (const dim of mod.dimensiones) {
    L.push(`### ${dim.id}. ${dim.nombre}${dim.critica ? ' **(crítica ×1.5)**' : ''}`);
    L.push('');
    L.push('| ID | Pregunta | 1 | 2 | 3 | 4 | 5 | NS |');
    L.push('|---|---|:-:|:-:|:-:|:-:|:-:|:-:|');
    for (const p of dim.preguntas) {
      L.push(`| ${p.id} | ${p.texto} | | | | | | |`);
    }
    L.push('');
  }
}

L.push('---');
L.push('');
L.push(`*Total: ${TOTAL} preguntas (69 base + 8 del Módulo C opcional para salud) · 45–60 min en reunión de levantamiento por área (15–20 min si se responde individualmente). Instrumento de uso referencial; no constituye asesoría legal.*`);
L.push('');

const out = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'docs', 'cuestionario.md');
writeFileSync(out, L.join('\n'));
console.log(`OK: ${out} (${TOTAL} preguntas, incluye Módulo C opcional)`);
