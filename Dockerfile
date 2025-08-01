FROM node:20

#Instala Chromium y dependencias necesarias para Puppeteer

RUN apt-get update && apt-get install -y
wget
ca-certificates
fonts-liberation
libappindicator3-1
libasound2
libatk-bridge2.0-0
libatk1.0-0
libcups2
libdbus-1-3
libgdk-pixbuf2.0-0
libnspr4
libnss3
libx11-xcb1
libxcomposite1
libxdamage1
libxrandr2
xdg-utils
libgbm1
libgtk-3-0
libxshmfence1
libxss1
libglu1
chromium
--no-install-recommends

#Define directorio de trabajo

WORKDIR /app

#Copia tu proyecto al contenedor

COPY . .

#Instala dependencias del proyecto

RUN npm install

#Expone el puerto que usa tu app

EXPOSE 3000

#Comando para iniciar la aplicación

CMD ["npm", "start"]
