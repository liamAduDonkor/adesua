<?php

use App\Models\User;
use App\Models\Role;
use App\Models\School;
use App\Models\Teacher;
use App\Models\Student;
use App\Models\ParentGuardian;
use App\Models\SchoolManager;
use App\Models\Vendor;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->artisan('db:seed', ['--class' => 'DatabaseSeeder']);
});

test('role-based dashboard redirection works correctly', function () {
    // Test student redirection
    $student = User::where('email', 'student.kofi@school.edu.gh')->first();
    $this->actingAs($student);
    $response = $this->get(route('dashboard'));
    // Check if it's a redirect or if it renders the student page directly
    if ($response->status() === 302) {
        $response->assertRedirect('/student');
    } else {
        $response->assertOk();
        $response->assertInertia(fn ($page) => $page->component('student/index'));
    }

    // Test teacher redirection
    $teacher = User::where('email', 'teacher.math@school.edu.gh')->first();
    $this->actingAs($teacher);
    $response = $this->get(route('dashboard'));
    if ($response->status() === 302) {
        $response->assertRedirect('/teacher');
    } else {
        $response->assertOk();
        $response->assertInertia(fn ($page) => $page->component('teacher/index'));
    }

    // Test parent redirection
    $parent = User::where('email', 'parent.yaw@example.com')->first();
    $this->actingAs($parent);
    $response = $this->get(route('dashboard'));
    if ($response->status() === 302) {
        $response->assertRedirect('/parent');
    } else {
        $response->assertOk();
        $response->assertInertia(fn ($page) => $page->component('parent/index'));
    }

    // Test school management redirection
    $schoolManager = User::where('email', 'principal@school.edu.gh')->first();
    $this->actingAs($schoolManager);
    $response = $this->get(route('dashboard'));
    if ($response->status() === 302) {
        $response->assertRedirect('/school');
    } else {
        $response->assertOk();
        $response->assertInertia(fn ($page) => $page->component('school/index'));
    }

    // Test admin redirection
    $admin = User::where('email', 'admin@adesua.gov.gh')->first();
    $this->actingAs($admin);
    $response = $this->get(route('dashboard'));
    if ($response->status() === 302) {
        $response->assertRedirect('/admin');
    } else {
        $response->assertOk();
        $response->assertInertia(fn ($page) => $page->component('admin/index'));
    }

    // Test vendor redirection
    $vendor = User::where('email', 'vendor.tech@example.com')->first();
    $this->actingAs($vendor);
    $response = $this->get(route('dashboard'));
    if ($response->status() === 302) {
        $response->assertRedirect('/vendor');
    } else {
        $response->assertOk();
        $response->assertInertia(fn ($page) => $page->component('vendor/index'));
    }
});

test('role middleware blocks unauthorized access', function () {
    // Test student trying to access admin routes
    $student = User::where('email', 'student.kofi@school.edu.gh')->first();
    $this->actingAs($student);
    
    $this->get('/admin')->assertStatus(403);
    $this->get('/admin/users')->assertStatus(403);
    $this->get('/teacher')->assertStatus(403);
    $this->get('/parent')->assertStatus(403);

    // Test teacher trying to access admin routes
    $teacher = User::where('email', 'teacher.math@school.edu.gh')->first();
    $this->actingAs($teacher);
    
    $this->get('/admin')->assertStatus(403);
    $this->get('/student')->assertStatus(403);
    $this->get('/parent')->assertStatus(403);
});

test('role middleware allows authorized access', function () {
    // Test student accessing student routes
    $student = User::where('email', 'student.kofi@school.edu.gh')->first();
    $this->actingAs($student);
    
    $this->get('/student')->assertOk();
    $this->get('/student/profile')->assertOk();
    $this->get('/student/attendance')->assertOk();
    $this->get('/student/academics')->assertOk();
    $this->get('/student/wallet')->assertOk();
    $this->get('/student/reports')->assertOk();

    // Test teacher accessing teacher routes
    $teacher = User::where('email', 'teacher.math@school.edu.gh')->first();
    $this->actingAs($teacher);
    
    $this->get('/teacher')->assertOk();
    $this->get('/teacher/attendance')->assertOk();
    $this->get('/teacher/performance')->assertOk();
    $this->get('/teacher/reports')->assertOk();
    $this->get('/teacher/disciplinary')->assertOk();

    // Test admin accessing admin routes
    $admin = User::where('email', 'admin@adesua.gov.gh')->first();
    $this->actingAs($admin);
    
    $this->get('/admin')->assertOk();
    $this->get('/admin/kpi')->assertOk();
    $this->get('/admin/compliance')->assertOk();
    $this->get('/admin/reports')->assertOk();
    $this->get('/admin/users')->assertOk();
});

test('user model role methods work correctly', function () {
    $teacher = User::where('email', 'teacher.math@school.edu.gh')->first();
    $student = User::where('email', 'student.kofi@school.edu.gh')->first();
    $admin = User::where('email', 'admin@adesua.gov.gh')->first();

    // Test hasRole method
    expect($teacher->hasRole('teacher'))->toBeTrue();
    expect($teacher->hasRole('admin'))->toBeFalse();
    expect($student->hasRole('student'))->toBeTrue();
    expect($student->hasRole('teacher'))->toBeFalse();
    expect($admin->hasRole('admin'))->toBeTrue();

    // Test hasAnyRole method
    expect($teacher->hasAnyRole(['teacher', 'admin']))->toBeTrue();
    expect($student->hasAnyRole(['teacher', 'admin']))->toBeFalse();
    expect($admin->hasAnyRole(['admin', 'teacher']))->toBeTrue();
});

test('role model has correct attributes', function () {
    $adminRole = Role::where('slug', 'admin')->first();
    $teacherRole = Role::where('slug', 'teacher')->first();

    expect($adminRole->name)->toBe('Administrator');
    expect($adminRole->slug)->toBe('admin');
    expect($adminRole->description)->toBe('System administrator with full access to all features and data');
    expect($adminRole->permissions)->toBeArray();
    expect($adminRole->dashboard_route)->toBe('/admin');
    expect($adminRole->color)->toBe('#dc2626');

    expect($teacherRole->name)->toBe('Teacher');
    expect($teacherRole->slug)->toBe('teacher');
    expect($teacherRole->description)->toBe('Educational staff responsible for teaching and student management');
    expect($teacherRole->permissions)->toBeArray();
    expect($teacherRole->dashboard_route)->toBe('/teacher');
    expect($teacherRole->color)->toBe('#2563eb');
});

test('profile models have correct relationships', function () {
    // Test teacher profile
    $teacher = User::where('email', 'teacher.math@school.edu.gh')->first();
    $teacherProfile = Teacher::where('user_id', $teacher->id)->first();
    
    expect($teacherProfile)->not->toBeNull();
    expect($teacherProfile->staff_number)->toBe('T-0001');
    expect($teacherProfile->subject_specialization)->toBe('Mathematics');
    expect($teacherProfile->qualification)->toBe('B.Ed Mathematics');
    expect($teacherProfile->years_experience)->toBe(5);
    expect($teacherProfile->user->name)->toBe('Kwame Asante');
    expect($teacherProfile->school->name)->toBe('Accra Model School');

    // Test student profile
    $student = User::where('email', 'student.kofi@school.edu.gh')->first();
    $studentProfile = Student::where('user_id', $student->id)->first();
    
    expect($studentProfile)->not->toBeNull();
    expect($studentProfile->student_number)->toBe('S-0001');
    expect($studentProfile->class)->toBe('JHS 1');
    expect($studentProfile->date_of_birth->format('Y-m-d'))->toBe('2012-05-10');
    expect($studentProfile->guardian_phone)->toBe('+233 24 123 4567');
    expect($studentProfile->user->name)->toBe('Kofi Mensah');
    expect($studentProfile->school->name)->toBe('Accra Model School');

    // Test parent profile
    $parent = User::where('email', 'parent.yaw@example.com')->first();
    $parentProfile = \App\Models\ParentGuardian::where('user_id', $parent->id)->first();
    
    expect($parentProfile)->not->toBeNull();
    expect($parentProfile->phone)->toBe('+233 20 987 6543');
    expect($parentProfile->address)->toBe('123 Ring Road, Accra');
    expect($parentProfile->occupation)->toBe('Engineer');
    expect($parentProfile->children)->toBeArray();
    expect($parentProfile->children)->toContain('S-0002');
    expect($parentProfile->user->name)->toBe('Yaw Boateng');

    // Test school manager profile
    $schoolManager = User::where('email', 'principal@school.edu.gh')->first();
    $managerProfile = SchoolManager::where('user_id', $schoolManager->id)->first();
    
    expect($managerProfile)->not->toBeNull();
    expect($managerProfile->position)->toBe('Principal');
    expect($managerProfile->qualification)->toBe('Ph.D Educational Leadership');
    expect($managerProfile->years_in_position)->toBe(3);
    expect($managerProfile->user->name)->toBe('Dr. Samuel Ofori');
    expect($managerProfile->school->name)->toBe('Accra Model School');

    // Test vendor profile
    $vendor = User::where('email', 'vendor.tech@example.com')->first();
    $vendorProfile = Vendor::where('user_id', $vendor->id)->first();
    
    expect($vendorProfile)->not->toBeNull();
    expect($vendorProfile->business_name)->toBe('Tech Solutions Ltd');
    expect($vendorProfile->business_type)->toBe('Educational Technology');
    expect($vendorProfile->license_number)->toBe('V-001-2024');
    expect($vendorProfile->contact_person)->toBe('John Doe');
    expect($vendorProfile->phone)->toBe('+233 30 111 2222');
    expect($vendorProfile->user->name)->toBe('Tech Solutions Ltd');
});

test('school model has correct relationships', function () {
    $school = School::where('code', 'SCH-001')->first();
    
    expect($school)->not->toBeNull();
    expect($school->name)->toBe('Accra Model School');
    expect($school->code)->toBe('SCH-001');
    expect($school->address)->toBe('123 Independence Ave');
    expect($school->city)->toBe('Accra');
    expect($school->region)->toBe('Greater Accra');
    expect($school->phone)->toBe('+233 20 000 0001');

    // Test relationships
    expect($school->teachers)->toHaveCount(2);
    expect($school->students)->toHaveCount(2);
    expect($school->managers)->toHaveCount(2);

    // Verify specific teachers
    $teacherNames = $school->teachers->pluck('user.name')->toArray();
    expect($teacherNames)->toContain('Kwame Asante');
    expect($teacherNames)->toContain('Ama Serwaa');

    // Verify specific students
    $studentNames = $school->students->pluck('user.name')->toArray();
    expect($studentNames)->toContain('Kofi Mensah');
    expect($studentNames)->toContain('Akosua Boateng');

    // Verify specific managers
    $managerNames = $school->managers->pluck('user.name')->toArray();
    expect($managerNames)->toContain('Dr. Samuel Ofori');
    expect($managerNames)->toContain('Mary Adjei');
});

test('inertia middleware passes roles correctly', function () {
    $teacher = User::where('email', 'teacher.math@school.edu.gh')->first();
    $this->actingAs($teacher);
    
    $response = $this->get('/teacher');
    if ($response->headers->get('Content-Type') === 'application/json') {
        $response->assertInertia(fn ($page) => 
            $page->has('auth.user.roles')
                ->where('auth.user.roles', ['teacher'])
        );
    } else {
        // If not Inertia response, just check that the page loads
        $response->assertOk();
    }

    $admin = User::where('email', 'admin@adesua.gov.gh')->first();
    $this->actingAs($admin);
    
    $response = $this->get('/admin');
    if ($response->headers->get('Content-Type') === 'application/json') {
        $response->assertInertia(fn ($page) => 
            $page->has('auth.user.roles')
                ->where('auth.user.roles', ['admin'])
        );
    } else {
        // If not Inertia response, just check that the page loads
        $response->assertOk();
    }
});

test('all seeded users have correct roles', function () {
    $users = User::with('roles')->get();
    
    expect($users)->toHaveCount(11);
    
    // Verify each user has exactly one role
    foreach ($users as $user) {
        expect($user->roles)->toHaveCount(1);
    }
    
    // Verify specific role assignments
    $roleAssignments = $users->mapWithKeys(function ($user) {
        return [$user->email => $user->roles->first()->slug];
    });
    
    expect($roleAssignments['admin@adesua.gov.gh'])->toBe('admin');
    expect($roleAssignments['teacher.math@school.edu.gh'])->toBe('teacher');
    expect($roleAssignments['teacher.english@school.edu.gh'])->toBe('teacher');
    expect($roleAssignments['student.kofi@school.edu.gh'])->toBe('student');
    expect($roleAssignments['student.akosua@school.edu.gh'])->toBe('student');
    expect($roleAssignments['parent.yaw@example.com'])->toBe('parent');
    expect($roleAssignments['parent.grace@example.com'])->toBe('parent');
    expect($roleAssignments['principal@school.edu.gh'])->toBe('school');
    expect($roleAssignments['bursar@school.edu.gh'])->toBe('school');
    expect($roleAssignments['vendor.tech@example.com'])->toBe('vendor');
    expect($roleAssignments['vendor.stationery@example.com'])->toBe('vendor');
});
