#!/bin/bash

echo "🚀 Starting ADESUA Deployment..."

# Pull latest code
echo "📥 Pulling latest code..."
git pull origin master

# Install PHP dependencies
echo "📦 Installing Composer dependencies..."
composer install --no-dev --optimize-autoloader --no-interaction

# Install Node dependencies
echo "📦 Installing NPM dependencies..."
npm ci --silent

# Build frontend assets
echo "🏗️  Building frontend assets..."
npm run build

# Clear and optimize Laravel
echo "⚡ Optimizing Laravel..."
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

# Run database migrations
echo "🗄️  Running database migrations..."
php artisan migrate --force

# Restart queue workers
echo "🔄 Restarting queue workers..."
php artisan queue:restart

# Clear application cache if needed
echo "🧹 Clearing old cache..."
php artisan cache:clear

# Set proper permissions
echo "🔐 Setting file permissions..."
chmod -R 755 storage bootstrap/cache

echo "✅ Deployment complete!"
echo "🌐 Application is now live!"

