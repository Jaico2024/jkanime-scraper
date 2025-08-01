# Usa una imagen base con Puppeteer y Chromium preinstalado
FROM ghcr.io/puppeteer/puppeteer:latest

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos al contenedor
COPY . .

# Instala las dependencias del proyecto
RUN npm install

# Expón el puerto (Railway leerá desde process.env.PORT)
EXPOSE 3000

# Comando para iniciar la app
CMD ["npm", "start"]
