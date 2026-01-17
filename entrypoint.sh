#!/bin/sh
set -e

# Run migrations if the database is ready
php artisan migrate --force

# Link storage
php artisan storage:link --force

# Cache configuration, routes, and views for performance
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Execute the main command (FrankenPHP)
exec "$@"
