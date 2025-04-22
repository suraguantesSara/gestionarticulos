# Usamos PHP con Apache como base
FROM php:8.1-apache

# Actualizamos paquetes e instalamos Node.js y npm
RUN apt update && apt install -y nodejs npm

# Configuramos el directorio de trabajo
WORKDIR /var/www/html

# Copiamos todo el código del proyecto
COPY . .

# Instalamos dependencias de Node.js
RUN npm install

# Exponemos los puertos de PHP y Node.js
EXPOSE 80 3000

# Comando para arrancar Apache y Node.js juntos
CMD service apache2 start && npm start
