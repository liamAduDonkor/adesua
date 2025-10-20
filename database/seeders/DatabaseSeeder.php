<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1) Seed roles from JSON
        $rolesPath = database_path('seeders/data/roles.json');
        if (File::exists($rolesPath)) {
            $rolesJson = File::get($rolesPath);
            $roles = json_decode($rolesJson, true);
            if (is_array($roles)) {
                foreach ($roles as $role) {
                    if (!isset($role['name']) || !isset($role['slug'])) {
                        continue;
                    }
                    DB::table('roles')->updateOrInsert(
                        ['slug' => $role['slug']],
                        [
                            'name' => $role['name'],
                            'description' => $role['description'] ?? null,
                            'permissions' => json_encode($role['permissions'] ?? []),
                            'dashboard_route' => $role['dashboard_route'] ?? null,
                            'color' => $role['color'] ?? null,
                            'updated_at' => now(),
                            'created_at' => now()
                        ]
                    );
                }
            }
        }

        // 2) Seed schools from JSON (if available)
        $schoolsPath = database_path('seeders/data/schools.json');
        $schoolCodeToId = [];
        if (File::exists($schoolsPath)) {
            $schoolsJson = File::get($schoolsPath);
            $schools = json_decode($schoolsJson, true);
            if (is_array($schools)) {
                foreach ($schools as $school) {
                    if (!isset($school['code']) || !isset($school['name'])) {
                        continue;
                    }
                    DB::table('schools')->updateOrInsert(
                        ['code' => $school['code']],
                        [
                            'name' => $school['name'],
                            'address' => $school['address'] ?? null,
                            'city' => $school['city'] ?? null,
                            'region' => $school['region'] ?? null,
                            'phone' => $school['phone'] ?? null,
                            'updated_at' => now(),
                            'created_at' => now(),
                        ]
                    );
                }

                // Build map code -> id
                $rows = DB::table('schools')->whereIn('code', array_column($schools, 'code'))->get(['id', 'code']);
                foreach ($rows as $row) {
                    $schoolCodeToId[$row->code] = $row->id;
                }
            }
        }

        // 3) Seed users from JSON and attach roles + profiles
        $usersPath = database_path('seeders/data/users.json');
        if (File::exists($usersPath)) {
            $json = File::get($usersPath);
            $records = json_decode($json, true);

            if (is_array($records)) {
                foreach ($records as $record) {
                    if (!isset($record['email']) || !isset($record['name']) || !isset($record['password'])) {
                        continue;
                    }

                    $attributes = [
                        'name' => $record['name'],
                        'password' => $record['password'], // hashed via model cast
                    ];

                    if (($record['email_verified_at'] ?? null) === 'now') {
                        $attributes['email_verified_at'] = now();
                    } elseif (!empty($record['email_verified_at'])) {
                        $attributes['email_verified_at'] = $record['email_verified_at'];
                    }

                    /** @var User $user */
                    $user = User::updateOrCreate(
                        ['email' => $record['email']],
                        $attributes
                    );

                    // Attach roles
                    $recordRoles = $record['roles'] ?? [];
                    if (is_string($recordRoles)) {
                        $recordRoles = [$recordRoles];
                    }
                    if (is_array($recordRoles) && count($recordRoles) > 0) {
                        $roleRows = DB::table('roles')->whereIn('slug', $recordRoles)->get(['id', 'slug']);
                        foreach ($roleRows as $roleRow) {
                            DB::table('role_user')->updateOrInsert(
                                ['role_id' => $roleRow->id, 'user_id' => $user->id],
                                ['created_at' => now(), 'updated_at' => now()]
                            );
                        }
                    }

                    // Optional school assignment by code
                    $schoolId = null;
                    if (!empty($record['school_code'])) {
                        $schoolId = $schoolCodeToId[$record['school_code']] ?? null;
                    }

                    // Profiles based on provided sections
                    if (!empty($record['teacher'])) {
                        DB::table('teachers')->updateOrInsert(
                            ['user_id' => $user->id],
                            [
                                'school_id' => $schoolId,
                                'staff_number' => $record['teacher']['staff_number'] ?? null,
                                'subject_specialization' => $record['teacher']['subject_specialization'] ?? null,
                                'qualification' => $record['teacher']['qualification'] ?? null,
                                'years_experience' => $record['teacher']['years_experience'] ?? null,
                                'updated_at' => now(),
                                'created_at' => now(),
                            ]
                        );
                    }

                    if (!empty($record['student'])) {
                        DB::table('students')->updateOrInsert(
                            ['user_id' => $user->id],
                            [
                                'school_id' => $schoolId,
                                'student_number' => $record['student']['student_number'] ?? null,
                                'date_of_birth' => $record['student']['date_of_birth'] ?? null,
                                'class' => $record['student']['class'] ?? null,
                                'guardian_phone' => $record['student']['guardian_phone'] ?? null,
                                'updated_at' => now(),
                                'created_at' => now(),
                            ]
                        );
                    }

                    if (!empty($record['parent'])) {
                        DB::table('parents')->updateOrInsert(
                            ['user_id' => $user->id],
                            [
                                'phone' => $record['parent']['phone'] ?? null,
                                'address' => $record['parent']['address'] ?? null,
                                'occupation' => $record['parent']['occupation'] ?? null,
                                'children' => json_encode($record['parent']['children'] ?? []),
                                'updated_at' => now(),
                                'created_at' => now(),
                            ]
                        );
                    }

                    if (!empty($record['school_management'])) {
                        DB::table('school_managers')->updateOrInsert(
                            ['user_id' => $user->id],
                            [
                                'school_id' => $schoolId,
                                'position' => $record['school_management']['position'] ?? null,
                                'qualification' => $record['school_management']['qualification'] ?? null,
                                'years_in_position' => $record['school_management']['years_in_position'] ?? null,
                                'updated_at' => now(),
                                'created_at' => now(),
                            ]
                        );
                    }

                    if (!empty($record['vendor'])) {
                        DB::table('vendors')->updateOrInsert(
                            ['user_id' => $user->id],
                            [
                                'business_name' => $record['vendor']['business_name'] ?? null,
                                'business_type' => $record['vendor']['business_type'] ?? null,
                                'license_number' => $record['vendor']['license_number'] ?? null,
                                'contact_person' => $record['vendor']['contact_person'] ?? null,
                                'phone' => $record['vendor']['phone'] ?? null,
                                'updated_at' => now(),
                                'created_at' => now(),
                            ]
                        );
                    }
                }
            }
        }
    }
}
