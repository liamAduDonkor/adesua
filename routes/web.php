<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $user = Auth::user();
        // Get user roles from database
        $userRoles = DB::table('role_user')
            ->join('roles', 'role_user.role_id', '=', 'roles.id')
            ->where('role_user.user_id', $user->id)
            ->pluck('roles.slug')
            ->values()
            ->all();
        
        // Redirect based on user's first role
        if (!empty($userRoles)) {
            switch ($userRoles[0]) {
                case 'student':
                    return Inertia::render('student/index');
                case 'parent':
                    return Inertia::render('parent/index');
                case 'teacher':
                    return Inertia::render('teacher/index');
                case 'school':
                    return Inertia::render('school/index');
                case 'admin':
                    return Inertia::render('admin/index');
                case 'vendor':
                    return Inertia::render('vendor/index');
            }
        }
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Student portal
    Route::prefix('student')->middleware('role:student')->group(function () {
        Route::get('/', fn() => Inertia::render('student/index'));
        Route::get('profile', fn() => Inertia::render('student/profile'));
        Route::get('attendance', fn() => Inertia::render('student/attendance'));
        Route::get('academics', fn() => Inertia::render('student/academics'));
        Route::get('wallet', fn() => Inertia::render('student/wallet'));
        Route::get('reports', fn() => Inertia::render('student/reports'));
    });

    // Parent portal
    Route::prefix('parent')->middleware('role:parent')->group(function () {
        Route::get('/', \App\Http\Controllers\ParentDashboardController::class);
        Route::get('children', fn() => Inertia::render('parent/children'));
        Route::get('approvals', fn() => Inertia::render('parent/approvals'));
        Route::get('wallet', fn() => Inertia::render('parent/wallet'));
        Route::get('notifications', fn() => Inertia::render('parent/notifications'));
    });

    // Teacher portal
    Route::prefix('teacher')->middleware('role:teacher')->group(function () {
        Route::get('/', \App\Http\Controllers\TeacherDashboardController::class);
        Route::get('attendance', fn() => Inertia::render('teacher/attendance'));
        Route::get('performance', fn() => Inertia::render('teacher/performance'));
        Route::get('reports', fn() => Inertia::render('teacher/reports'));
        Route::get('disciplinary', fn() => Inertia::render('teacher/disciplinary'));
    });

    // School admin portal
    Route::prefix('school')->middleware('role:school')->group(function () {
        Route::get('/', fn() => Inertia::render('school/index'));
        Route::get('staff', fn() => Inertia::render('school/staff'));
        Route::get('students', fn() => Inertia::render('school/students'));
        Route::get('dashboard', fn() => Inertia::render('school/dashboard'));
        Route::get('finance', fn() => Inertia::render('school/finance'));
    });

    // Admin portal
    Route::prefix('admin')->middleware('role:admin')->group(function () {
        Route::get('/', \App\Http\Controllers\AdminDashboardController::class);
        Route::get('kpi', fn() => Inertia::render('admin/kpi'));
        Route::get('compliance', fn() => Inertia::render('admin/compliance'));
        Route::get('users', fn() => Inertia::render('admin/users'));
        // Schools
        Route::get('schools', [\App\Http\Controllers\AdminSchoolsController::class, 'index'])->name('admin.schools.index');
        Route::get('schools/{school}', [\App\Http\Controllers\AdminSchoolsController::class, 'show'])->name('admin.schools.show');
        
        // Reports
        Route::prefix('reports')->group(function () {
            Route::get('/', [\App\Http\Controllers\AdminReportsController::class, 'index'])->name('admin.reports.index');
            Route::get('create', [\App\Http\Controllers\AdminReportsController::class, 'create'])->name('admin.reports.create');
            Route::post('/', [\App\Http\Controllers\AdminReportsController::class, 'store'])->name('admin.reports.store');
            Route::get('{report}', [\App\Http\Controllers\AdminReportsController::class, 'show'])->name('admin.reports.show');
            Route::get('{report}/download', [\App\Http\Controllers\AdminReportsController::class, 'download'])->name('admin.reports.download');
            Route::post('{report}/schedule', [\App\Http\Controllers\AdminReportsController::class, 'schedule'])->name('admin.reports.schedule');
            
            // Statutory Reports
            Route::get('emis', [\App\Http\Controllers\AdminReportsController::class, 'emisReport'])->name('admin.reports.emis');
            Route::get('financial-audit', [\App\Http\Controllers\AdminReportsController::class, 'financialAudit'])->name('admin.reports.financial-audit');
            Route::get('aml-cft', [\App\Http\Controllers\AdminReportsController::class, 'amlCftReport'])->name('admin.reports.aml-cft');
        });
        
        // Analytics
        Route::get('analytics', \App\Http\Controllers\AdminAnalyticsController::class . '@dashboard');
        Route::get('analytics/teachers', \App\Http\Controllers\AdminAnalyticsController::class . '@teacherAnalytics');
        Route::get('analytics/students', \App\Http\Controllers\AdminAnalyticsController::class . '@studentAnalytics');
        Route::get('analytics/vendors', \App\Http\Controllers\AdminAnalyticsController::class . '@vendorAnalytics');
        
        // Search functionality
        Route::get('search/teachers', \App\Http\Controllers\AdminSearchController::class . '@searchTeachers');
        Route::get('search/students', \App\Http\Controllers\AdminSearchController::class . '@searchStudents');
        Route::get('search/vendors', \App\Http\Controllers\AdminSearchController::class . '@searchVendors');
        
        // Performance details
        Route::get('performance/teacher/{teacher}', \App\Http\Controllers\AdminSearchController::class . '@teacherPerformance');
        Route::get('performance/student/{student}', \App\Http\Controllers\AdminSearchController::class . '@studentPerformance');
        Route::get('statistics/vendor/{vendor}', \App\Http\Controllers\AdminSearchController::class . '@vendorStatistics');
    });

    // Vendor portal
    Route::prefix('vendor')->middleware('role:vendor')->group(function () {
        Route::get('/', fn() => Inertia::render('vendor/index'));
        Route::get('tenders', fn() => Inertia::render('vendor/tenders'));
        Route::get('payments', fn() => Inertia::render('vendor/payments'));
        Route::get('compliance', fn() => Inertia::render('vendor/compliance'));
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
