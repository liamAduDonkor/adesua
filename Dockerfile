#### Build frontend assets
FROM node:20-bullseye AS node-build
WORKDIR /app

# Install JS dependencies and build Vite assets
COPY package*.json ./
COPY tsconfig.json vite.config.ts ./
COPY resources ./resources
RUN npm ci --include=dev
RUN npm run build


#### Install PHP dependencies
FROM composer:2 AS vendor
WORKDIR /app

COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-interaction --prefer-dist


#### Runtime
FROM php:8.2-cli-bullseye AS runtime
WORKDIR /var/www/html

# System packages & PHP extensions needed by Laravel
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        git \
        unzip \
        libzip-dev \
        libpq-dev \
    && docker-php-ext-install pdo_mysql pdo_pgsql pdo_sqlite zip \
    && rm -rf /var/lib/apt/lists/*

# Copy app source (without vendor/node_modules due to .dockerignore)
COPY . .

# Bring in production dependencies and compiled assets
COPY --from=vendor /app/vendor ./vendor
COPY --from=vendor /app/composer.lock ./composer.lock
COPY --from=vendor /app/composer.json ./composer.json
COPY --from=node-build /app/public/build ./public/build

# Ensure writable dirs for caches/sessions
RUN mkdir -p storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

ENV APP_ENV=production \
    APP_DEBUG=false \
    PORT=8080

EXPOSE 8080

# Cache config/routes/views on boot and serve the app
CMD ["sh", "-c", "php artisan storage:link --force >/dev/null 2>&1 || true && php artisan config:cache && php artisan route:cache && php artisan view:cache && php -d variables_order=EGPCS artisan serve --host=0.0.0.0 --port=${PORT:-8080}"]

