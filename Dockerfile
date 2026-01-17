# Stage 1: Build frontend assets
FROM node:20-slim AS node-build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Install PHP dependencies
FROM composer:2 AS vendor
WORKDIR /app
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-interaction --prefer-dist

# Stage 3: Runtime
FROM dunglas/frankenphp:1-php8.2 AS runtime

# Install system dependencies and PHP extensions
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    unzip \
    libzip-dev \
    libpq-dev \
    libicu-dev \
    libpng-dev \
    && docker-php-ext-install \
    pdo_mysql \
    pdo_pgsql \
    zip \
    intl \
    gd \
    opcache \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /var/www/html

# Copy application source
COPY . .

# Copy vendor and built assets from previous stages
COPY --from=vendor /app/vendor ./vendor
COPY --from=node-build /app/public/build ./public/build

# Setup storage and cache directories
RUN mkdir -p storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache

# Set environment variables
ENV APP_ENV=production \
    APP_DEBUG=false \
    ENTRYPOINT_COMMAND="php artisan migrate --force"

# Copy entrypoint script
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Use the entrypoint script
ENTRYPOINT ["entrypoint.sh"]

# Expose the port (Render uses 8080 or PORT env var)
EXPOSE 8080

# Start FrankenPHP
CMD ["frankenphp", "php-server", "--port", "8080"]
