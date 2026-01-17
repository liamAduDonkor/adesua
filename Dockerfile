# Stage 1 - Build Frontend (Vite)
FROM node:20 AS frontend
WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including devDependencies needed for build)
# Don't set NODE_ENV=production here, we need dev dependencies to build
RUN npm ci

# Copy all source files needed for build
COPY . .

# Verify required files exist
RUN test -f vite.config.ts || (echo "ERROR: vite.config.ts missing!" && exit 1)
RUN test -f resources/css/app.css || (echo "ERROR: resources/css/app.css missing!" && exit 1)
RUN test -f resources/js/app.tsx || (echo "ERROR: resources/js/app.tsx missing!" && exit 1)

# Ensure public/build directory exists and is writable
RUN mkdir -p public/build && chmod -R 755 public

# Build assets for production
# Set NODE_ENV=production only for the build command to optimize output
# Vite will output to public/build automatically
RUN NODE_ENV=production npm run build

# Verify build output exists
RUN if [ ! -d "public/build" ] || [ -z "$(ls -A public/build)" ]; then \
    echo "ERROR: Build output directory is empty or missing!" && \
    ls -la public/ && \
    exit 1; \
    else \
    echo "Build successful! Contents:" && \
    ls -la public/build/; \
    fi

# Stage 2 - Backend (Laravel + PHP + Composer)
FROM php:8.2-fpm AS backend

# Install system dependencies
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
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install -j$(nproc) \
    pdo \
    pdo_mysql \
    pdo_pgsql \
    mbstring \
    zip \
    opcache \
    gd

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Copy app files
COPY . .

# Copy built frontend from Stage 1 (Laravel Vite outputs to public/build)
COPY --from=frontend --chown=www-data:www-data /app/public/build ./public/build

# Verify build assets were copied correctly
RUN ls -la public/build/ 2>/dev/null || echo "Warning: public/build directory may be empty"

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Create necessary directories and set permissions
RUN mkdir -p storage/framework/{sessions,views,cache} \
    storage/logs \
    bootstrap/cache \
    database \
    /var/log/supervisor \
    && chown -R www-data:www-data storage bootstrap/cache database \
    && chmod -R 775 storage bootstrap/cache database

# Copy nginx configuration
RUN rm -f /etc/nginx/sites-enabled/default
COPY docker/nginx.conf /etc/nginx/sites-available/default
RUN ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default

# Copy supervisor configuration
COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Copy entrypoint script
COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# PHP configuration
RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini" && \
    echo "upload_max_filesize = 10M" >> "$PHP_INI_DIR/php.ini" && \
    echo "post_max_size = 10M" >> "$PHP_INI_DIR/php.ini" && \
    echo "memory_limit = 256M" >> "$PHP_INI_DIR/php.ini"

# Set environment variables for production
ENV APP_ENV=production \
    APP_DEBUG=false

# Expose port 80
EXPOSE 80

# Use supervisor to manage nginx and php-fpm
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
