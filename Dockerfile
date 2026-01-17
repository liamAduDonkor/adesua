# Stage 1 - Build Frontend (Vite)
FROM node:20-bookworm AS frontend
WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Install build dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    make \
    g++ \
    git \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package*.json ./

# Install dependencies (using --include=dev because we need vite/tailwindcss to build)
RUN npm install --include=dev

# Copy source
COPY . .

# Build assets (Client)
RUN NODE_OPTIONS="--max-old-space-size=4096" npx vite build

# Build assets (SSR)
RUN NODE_OPTIONS="--max-old-space-size=4096" npx vite build --ssr

# Verify build
RUN if [ ! -d "public/build" ] || [ ! -d "bootstrap/ssr" ]; then \
    echo "ERROR: Build failed to produce output directories"; \
    exit 1; \
    fi

# Stage 2 - Backend
FROM php:8.2-fpm-bookworm AS backend

# System dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    curl \
    unzip \
    zip \
    nginx \
    supervisor \
    libpq-dev \
    libonig-dev \
    libzip-dev \
    libsqlite3-dev \
    libpng-dev \
    libicu-dev \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# PHP extensions
RUN docker-php-ext-install -j$(nproc) \
    pdo \
    pdo_mysql \
    pdo_pgsql \
    mbstring \
    zip \
    opcache \
    gd \
    intl

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Copy code
COPY . .

# Copy built assets
COPY --from=frontend --chown=www-data:www-data /app/public/build ./public/build
COPY --from=frontend --chown=www-data:www-data /app/bootstrap/ssr ./bootstrap/ssr

# Install PHP deps
RUN composer install --no-dev --optimize-autoloader

# Storage & permissions
RUN mkdir -p storage/framework/{sessions,views,cache} \
    storage/logs \
    bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# Nginx & Supervisor
COPY docker/nginx.conf /etc/nginx/sites-available/default
RUN rm -f /etc/nginx/sites-enabled/default && ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default
COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Environment
ENV APP_ENV=production \
    APP_DEBUG=false

EXPOSE 80

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
