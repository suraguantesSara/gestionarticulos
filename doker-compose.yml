version: '3'

services:
  nodejs:
    container_name: node_server
    build: .
    working_dir: /app
    ports:
      - "3000:3000"
    volumes:
      - ./app:/app
    environment:
      - PORT=3000

  php:
    container_name: php_server
    image: php:8.2-apache
    working_dir: /var/www/html
    ports:
      - "8080:80"
    volumes:
      - ./php:/var/www/html
