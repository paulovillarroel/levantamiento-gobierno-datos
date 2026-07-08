# syntax=docker/dockerfile:1

# ============================================================================
# Imagen del SERVIDOR de consolidación de sesiones (SQLite).
# Sin dependencias: usa el SQLite integrado de Node (node:sqlite, Node >= 23.4).
# La base vive en /app/datos (volumen). Escucha en el puerto 8787.
# ============================================================================
FROM node:24-alpine
WORKDIR /app
COPY servidor/servidor.mjs ./servidor/servidor.mjs
# Punto de montaje del volumen; que 'node' (uid 1000) pueda escribir la BD.
RUN mkdir -p /app/datos && chown -R node:node /app
USER node
ENV PUERTO=8787
EXPOSE 8787
CMD ["node", "servidor/servidor.mjs"]
