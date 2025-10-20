# ADESUA Quick Start Guide

## Getting the Development Environment Running

### Step 1: Verify Prerequisites

Open Terminal and check if required tools are installed:

```bash
# Check Node.js (required)
node --version
# Should output: v18.x.x or higher

# Check npm (required)
npm --version
# Should output: v9.x.x or higher

# Check PHP (required)
php --version
# Should output: 8.2.x or higher

# Check Composer (required)
composer --version
# Should output: 2.x.x
```

If any are missing, install them:
- **Node.js**: Download from https://nodejs.org (LTS version)
- **PHP**: Use Homebrew: `brew install php@8.2`
- **Composer**: Download from https://getcomposer.org

### Step 2: Install Project Dependencies

```bash
# Navigate to project
cd /Users/liam/Desktop/fidget/adesua

# Install PHP dependencies
composer install

# Install Node.js dependencies
npm install

# Install additional charting library
npm install recharts
```

### Step 3: Setup Database

The project uses SQLite (already configured):

```bash
# Run database migrations
php artisan migrate

# (Optional) Seed with test data once seeders are created
php artisan db:seed
```

### Step 4: Start Development Servers

You need TWO terminal windows:

**Terminal 1 - Laravel Backend:**
```bash
cd /Users/liam/Desktop/fidget/adesua
php artisan serve
```
This starts the Laravel server at `http://localhost:8000`

**Terminal 2 - Frontend Assets:**
```bash
cd /Users/liam/Desktop/fidget/adesua
npm run dev
```
This starts Vite for hot module replacement

### Step 5: Access the Application

Open your browser and visit: `http://localhost:8000`

You should see the ADESUA welcome page.

---

## Default Test Accounts

After seeding the database, you can log in with these accounts:

### Admin Account
- **Email**: admin@adesua.gov.gh
- **Password**: password
- **Portal**: GES/MoE Admin Dashboard

### Student Account
- **Email**: student@example.com
- **Password**: password
- **Portal**: Student Portal

### Teacher Account
- **Email**: teacher@example.com
- **Password**: password
- **Portal**: Teacher Portal

### Parent Account
- **Email**: parent@example.com
- **Password**: password
- **Portal**: Parent Portal

### School Admin Account
- **Email**: school@example.com
- **Password**: password
- **Portal**: School Admin Portal

### Vendor Account
- **Email**: vendor@example.com
- **Password**: password
- **Portal**: Vendor Portal

---

## Common Issues & Solutions

### Issue: `node: command not found`
**Solution**: Node.js is not installed or not in PATH
```bash
# Install Node.js via Homebrew
brew install node

# Or download from https://nodejs.org
```

### Issue: `php: command not found`
**Solution**: PHP is not installed or not in PATH
```bash
# Install PHP via Homebrew
brew install php@8.2

# Add to PATH in ~/.zshrc
echo 'export PATH="/usr/local/opt/php@8.2/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

### Issue: `npm ERR! Cannot find module`
**Solution**: Dependencies not installed
```bash
rm -rf node_modules
npm install
```

### Issue: Port 8000 already in use
**Solution**: Another app is using port 8000
```bash
# Use a different port
php artisan serve --port=8001

# Or kill the process using port 8000
lsof -ti:8000 | xargs kill -9
```

### Issue: Database errors
**Solution**: Run migrations
```bash
php artisan migrate:fresh
```

---

## Development Workflow

### Making Changes to Frontend

1. Edit files in `resources/js/`
2. Save - Vite will auto-reload the browser
3. Check browser console for errors

### Making Changes to Backend

1. Edit controllers in `app/Http/Controllers/`
2. Edit routes in `routes/web.php`
3. Refresh browser to see changes

### Creating New Pages

1. Create page component in `resources/js/pages/[portal]/[page-name].tsx`
2. Add route in `routes/web.php`
3. Create controller if needed in `app/Http/Controllers/`

### Adding New Components

1. Create component in `resources/js/components/[category]/[ComponentName].tsx`
2. Import and use in your pages

---

## Project Structure Quick Reference

```
adesua/
├── app/
│   ├── Http/Controllers/     # Backend controllers
│   └── Models/               # Database models
├── database/
│   ├── migrations/           # Database schema
│   └── seeders/              # Test data generators
├── resources/
│   └── js/
│       ├── components/       # Reusable UI components
│       │   ├── charts/       # Chart components
│       │   ├── tables/       # Table components
│       │   └── ui/           # Basic UI components
│       ├── layouts/          # Page layouts
│       ├── pages/            # Page components
│       │   ├── admin/        # Admin portal pages
│       │   ├── parent/       # Parent portal pages
│       │   ├── school/       # School portal pages
│       │   ├── student/      # Student portal pages
│       │   ├── teacher/      # Teacher portal pages
│       │   └── vendor/       # Vendor portal pages
│       └── types/            # TypeScript types
├── routes/
│   ├── web.php               # Web routes
│   └── auth.php              # Auth routes
└── public/                   # Static assets
```

---

## Useful Commands

### Development
```bash
# Start dev server with hot reload
npm run dev

# Start Laravel server
php artisan serve

# Clear all caches
php artisan optimize:clear

# View routes
php artisan route:list
```

### Database
```bash
# Run migrations
php artisan migrate

# Rollback last migration
php artisan migrate:rollback

# Fresh start (drops all tables and re-migrates)
php artisan migrate:fresh

# Seed database
php artisan db:seed
```

### Code Quality
```bash
# Check TypeScript types
npm run types

# Lint code
npm run lint

# Format code
npm run format
```

### Building for Production
```bash
# Build frontend assets
npm run build

# Build with SSR support
npm run build:ssr
```

---

## Next Steps

1. **Review Current Implementation**: Check `PROJECT_STATUS.md` for detailed status
2. **Create Database Seeders**: Generate realistic test data (see section below)
3. **Complete Stub Pages**: Implement the 11 remaining minimal pages
4. **Backend APIs**: Create missing controllers for wallet, transactions, reporting
5. **Testing**: Test all user flows and fix bugs

---

## Creating Database Seeders (For Developers)

Create seeders for test data:

```bash
# Generate seeder files
php artisan make:seeder StudentSeeder
php artisan make:seeder TeacherSeeder
php artisan make:seeder SchoolSeeder
php artisan make:seeder VendorSeeder
php artisan make:seeder WalletSeeder
php artisan make:seeder AttendanceSeeder
php artisan make:seeder PerformanceSeeder
```

Then run:
```bash
php artisan db:seed
```

---

## Support & Documentation

- **Project Status**: See `PROJECT_STATUS.md`
- **Frontend Requirements**: See `frontend.md`
- **Architecture**: See `FRONTEND_BUILD_SUGGESTIONS.md`
- **Full Requirements**: See `All functional requirements Ghana Education Management System (ADESUA).pdf`

---

## Tips for Success

1. **Keep Dev Servers Running**: Don't stop the servers while developing
2. **Use Browser DevTools**: Check console for React errors
3. **Check Network Tab**: Verify API calls are working
4. **Test Different Roles**: Log in as different user types
5. **Mobile Testing**: Test responsive design at different widths
6. **Clear Cache**: Run `php artisan optimize:clear` if things act weird

---

Happy coding! 🚀
