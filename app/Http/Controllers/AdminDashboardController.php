<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class AdminDashboardController extends Controller
{
    public function __invoke(): Response
    {
        $teachersTotal = (int) DB::table('teachers')->count();
        $studentsTotal = (int) DB::table('students')->count();
        $schoolsTotal = (int) DB::table('schools')->count();

        $studentsByRegion = DB::table('students')
            ->join('schools', 'students.school_id', '=', 'schools.id')
            ->select('schools.region as region', DB::raw('count(students.id) as total'))
            ->groupBy('schools.region')
            ->orderBy('schools.region')
            ->get()
            ->map(function ($row) {
                return [
                    'region' => $row->region ?? 'Unspecified',
                    'total' => (int) $row->total,
                ];
            })
            ->all();

        $teachersByRegion = DB::table('teachers')
            ->join('schools', 'teachers.school_id', '=', 'schools.id')
            ->select('schools.region as region', DB::raw('count(teachers.id) as total'))
            ->groupBy('schools.region')
            ->orderBy('schools.region')
            ->get()
            ->map(function ($row) {
                return [
                    'region' => $row->region ?? 'Unspecified',
                    'total' => (int) $row->total,
                ];
            })
            ->all();

        return Inertia::render('admin/index', [
            'dashboard' => [
                'teachersTotal' => $teachersTotal,
                'studentsTotal' => $studentsTotal,
                'schoolsTotal' => $schoolsTotal,
                'studentsByRegion' => $studentsByRegion,
                'teachersByRegion' => $teachersByRegion,
            ],
        ]);
    }
}


