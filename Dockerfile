FROM ubuntu:22.04

# Actualizar e instalar dependencias
RUN apt update && apt install -y nodejs npm php apache2 libapache2-mod-php

WORKDIR /app

# Copiar archivos del proyecto
COPY . .

# Instalar dependencias de Node.js
RUN npm install

# Exponer puertos para Node.js y PHP
EXPOSE 3000 80

# Comando para iniciar Apache y Node.js juntos
CMD service apache2 start && npm start
