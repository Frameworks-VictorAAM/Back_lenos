# Fase 1: Construcción (Sigue la recomendación de multistage build)
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Fase 2: Ejecución
FROM node:20-alpine
WORKDIR /app
# Copiamos solo lo necesario de la fase anterior para que sea más ligero
COPY --from=builder /app ./
EXPOSE 5000
CMD ["node", "server.js"]