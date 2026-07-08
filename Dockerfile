# syntax=docker/dockerfile:1

# ============================================================================
# Imagen del FORMULARIO (sitio estático). Sirve para:
#   - compartir solo el formulario:  docker build -t levantamiento . && docker run -p 8080:8080 levantamiento
#   - como servicio "app" del docker-compose (formulario + servidor SQLite).
# El estado vive en el navegador; esta imagen no guarda datos.
# ============================================================================

# ---- build: compila el sitio estático de Astro ----
FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# En Docker servimos en la raíz "/", no en la base de GitHub Pages.
ENV BASE_PATH=/
RUN npm run build

# ---- runtime: nginx sirve dist/ ----
FROM nginx:alpine AS runtime
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
