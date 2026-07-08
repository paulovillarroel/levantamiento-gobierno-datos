// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// Sitio 100% estático que se ejecuta en local (npm run dev) o se compila a
// dist/ (npm run build). La herramienta no requiere servidor ni backend:
// todo el estado vive en el navegador del usuario. El servidor SQLite
// (servidor/servidor.mjs) es opcional y solo centraliza sesiones.
//
// `base` es configurable por entorno para servir el mismo build en dos lugares:
//   - GitHub Pages (por defecto): sitio de proyecto en /levantamiento-gobierno-datos/
//     En desarrollo la app queda en http://localhost:4321/levantamiento-gobierno-datos/
//     (la raíz "/" dará 404), igual que en Pages.
//   - Docker (BASE_PATH=/): nginx lo sirve en la raíz http://localhost:8080/
const base = process.env.BASE_PATH ?? '/levantamiento-gobierno-datos';

export default defineConfig({
  integrations: [react()],
  site: process.env.SITE_URL ?? 'https://paulovillarroel.github.io',
  base,
});
