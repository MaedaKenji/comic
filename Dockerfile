FROM dunglas/frankenphp:1-php8.5

RUN apt-get update && apt-get install -y \
    libatomic1 \
    default-mysql-client \
    git \
    curl \
    zip \
    unzip \
    wget \
    procps \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Pasang ekstensi PHP yang dibutuhkan Laravel menggunakan helper bawaan FrankenPHP
RUN install-php-extensions pdo_mysql pcntl bcmath gd intl zip

# ==========================================
# GANTI BAGIAN INSTALASI NODE.JS DENGAN INI:
# ==========================================

# 1. Tentukan environment variable untuk NVM
ENV NVM_DIR=/root/.nvm
ENV NODE_VERSION=24

# 2. Unduh, pasang NVM, dan install Node.js versi tertentu
RUN mkdir -p $NVM_DIR \
    && curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash \
    && . "$NVM_DIR/nvm.sh" \
    && nvm install ${NODE_VERSION} \
    && nvm use v${NODE_VERSION} \
    && nvm alias default v${NODE_VERSION}

# Pastikan PATH ini sesuai dengan versi spesifik yang diinstal NVM (v24.16.0)
ENV PATH="${NVM_DIR}/versions/node/v24.16.0/bin:${PATH}"

# Tes verifikasi hasil build
# RUN node -v && npm -v

# Tentukan folder kerja standar FrankenPHP
WORKDIR /app

# ==========================================
# 2. CACHE LAYER (Dependencies)
# ==========================================
COPY composer.json composer.lock package.json package-lock.json ./



# 1. Ambil binary Composer resmi dari image Composer (Cara paling bersih & cepat)
COPY --from=composer:2.8.12 /usr/bin/composer /usr/bin/composer

# 2. Jalankan instalasi library PHP Laravel (Tanpa interaksi manual)
RUN composer install --no-interaction --no-plugins --no-scripts --prefer-dist

# 3. Jalankan instalasi library Node.js React
RUN npm ci

# ==========================================
# 3. APPLICATION LAYER & PRODUCTION BUILD
# ==========================================
# Copy seluruh kode proyek komik kamu
COPY . .

# Buat file env dari template
RUN cp .env.example .env

# Build aset frontend Vite/React TypeScript kamu
RUN npm run build

# Bersihkan cache internal Laravel
RUN CACHE_STORE=file php artisan config:clear \
    && CACHE_STORE=file php artisan cache:clear \
    && CACHE_STORE=file php artisan route:clear \
    && CACHE_STORE=file php artisan view:clear
# Atur izin folder agar tidak error 500
RUN chmod -R 777 storage bootstrap/cache

# Ekspos port 80 (HTTP) dan 443 (HTTPS) bawaan Caddy/FrankenPHP
EXPOSE 80
EXPOSE 443

# Jalankan server FrankenPHP dengan mode development/local (tanpa HTTPS paksa dulu)
CMD ["frankenphp", "run", "--config", "/etc/caddy/Caddyfile"]