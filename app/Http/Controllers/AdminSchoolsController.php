<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminSchoolsController extends Controller
{
    public function index(Request $request)
    {
        $query = DB::table('schools')->select('id', 'name', 'code', 'city', 'region', 'phone');

        if ($search = $request->string('q')->toString()) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('code', 'like', "%{$search}%")
                    ->orWhere('city', 'like', "%{$search}%")
                    ->orWhere('region', 'like', "%{$search}%");
            });
        }

        $schools = $query->orderBy('region')->orderBy('name')->paginate(25)->withQueryString();

        return Inertia::render('admin/schools/index', [
            'schools' => $schools,
            'filters' => [
                'q' => $search,
            ],
        ]);
    }

    public function show(int $schoolId)
    {
        $school = DB::table('schools')->where('id', $schoolId)->first();
        abort_if(!$school, 404);

        $teacherCount = DB::table('teachers')->where('school_id', $schoolId)->count();
        $studentCount = DB::table('students')->where('school_id', $schoolId)->count();

        return Inertia::render('admin/schools/show', [
            'school' => $school,
            'stats' => [
                'teachers' => $teacherCount,
                'students' => $studentCount,
            ],
        ]);
    }
}


