# Usa una imagen base con Puppeteer y Chromium preinstalado
FROM ghcr.io/puppeteer/puppeteer:latest

# Establece el directorio de trabajo
WORKDIR /app

# Copia archivos
COPY package*.json ./
RUN npm install

COPY . .

# Exponer el puerto
EXPOSE 3000
ENV PORT=3000

# Comando de inicio
CMD ["npm", "start"]
