# === STAGE 1: Frontend Build ===
FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# === STAGE 2: Backend & Runtime ===
FROM php:8.3-fpm-alpine
WORKDIR /var/www

# Install system dependencies & PHP extensions yang butuh dicompile (seperti pdo_mysql)
RUN apk add --no-cache unzip libpng-dev libjpeg-turbo-dev freetype-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo_mysql gd

# Install Composer secara resmi
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy source code proyek
COPY . .

# Copy hasil build frontend dari STAGE 1 ke folder public
COPY --from=frontend-builder /app/public/build ./public/build

# Install PHP dependencies tanpa development packages
RUN composer install --no-interaction --prefer-dist --optimize-autoloader --no-dev

# Atur permission folder storage agar container bisa menulis log/cache
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

EXPOSE 8000
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]