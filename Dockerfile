
FROM php:8.1-apache

WORKDIR /var/www/html

COPY . .

EXPOSE 80

CMD ["apache2-foreground"]

RUN echo "DirectoryIndex index.html index.php" >> /etc/apache2/apache2.conf
