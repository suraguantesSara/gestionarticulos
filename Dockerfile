
version: '3'

services:
  nodejs:
    build: .
    ports:
      - "3000:3000"

  php:
    image: php:8.2-apache
    volumes:
      - .:/var/www/html
    ports:
      - "8080:80"
