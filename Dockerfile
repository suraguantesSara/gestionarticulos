# Usamos PHP con Apache
FROM php:8.1-apache

# Configuración del directorio de trabajo
WORKDIR /var/www/html

# Copiamos todo el código de nuestro proyecto
COPY . .

# Exponemos el puerto que usará el servidor
EXPOSE 80

# Arrancamos Apache
CMD ["apache2-foreground"]
