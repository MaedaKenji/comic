FROM dunglas/frankenphp:1-php8.5

# 1. Pasang paket OS standar & Node.js 24 langsung dari repositori resmi NodeSource
RUN apt-get update && apt-get install -y \
    libatomic1 \
    default-mysql-client \
    git \
    curl \
    zip \
    unzip \
    wget \
    procps \
    && curl -fsSL https://deb.nodesource.com/setup_24.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# 2. Pasang ekstensi PHP yang dibutuhkan Laravel menggunakan helper bawaan FrankenPHP
RUN install-php-extensions pdo_mysql pdo_sqlite pcntl bcmath gd intl zip

# 3. Tentukan folder kerja standar FrankenPHP
WORKDIR /app

# 4. Salin dependency manager terlebih dahulu (Optimasi Cache Layer)
COPY composer.json composer.lock package.json package-lock.json ./
COPY --from=composer:2.8.12 /usr/bin/composer /usr/bin/composer

# 5. Jalankan instalasi dependensi tanpa skrip development (Lebih ringan & cepat)
RUN composer install --no-interaction --no-plugins --no-scripts --prefer-dist --no-dev
RUN npm ci

# 6. Salin seluruh source code proyek
COPY . .
RUN cp .env.example .env

# 7. Blokir sisa-sisa file mode dev server Vite jika bocor dari folder lokal
RUN rm -f public/hot bootstrap/cache/*.php

# 8. Kompilasi aset frontend React/Tailwind menjadi file statis matang
RUN DB_CONNECTION=sqlite DB_DATABASE=:memory: npm run build

# 9. Jalankan optimasi internal Composer untuk production (Classmap mapping)
RUN composer dump-autoload --optimize --no-dev
RUN php artisan storage:link

# 10. Atur izin folder runtime Laravel agar tidak Error 500
RUN chmod -R 775 storage bootstrap/cache

# 11. Ekspos port 80 (HTTP) dan 443 (HTTPS) bawaan Caddy/FrankenPHP
EXPOSE 80
EXPOSE 443

# 12. Jalankan server FrankenPHP Production
CMD ["frankenphp", "run", "--config", "/etc/caddy/Caddyfile"]