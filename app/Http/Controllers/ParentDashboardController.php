<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class ParentDashboardController extends Controller
{
    public function __invoke(): Response
    {
        $user = Auth::user();

        $parent = DB::table('parents')->where('user_id', $user->id)->first();

        // Linkage: for now, assume parent-child associations via a pivot `parent_student` if exists; otherwise none
        $children = [];
        if (DB::schema()->hasTable('parent_student')) {
            $children = DB::table('parent_student')
                ->join('students', 'parent_student.student_id', '=', 'students.id')
                ->join('users', 'students.user_id', '=', 'users.id')
                ->leftJoin('schools', 'students.school_id', '=', 'schools.id')
                ->where('parent_student.parent_id', $parent->id ?? 0)
                ->get([
                    'students.id as studentId',
                    'users.name as name',
                    'students.class as class',
                    'schools.name as school',
                ])->map(function ($row) {
                    return [
                        'id' => (int) $row->studentId,
                        'name' => $row->name,
                        'class' => $row->class,
                        'school' => $row->school,
                    ];
                })->all();
        }

        // Teacher reports visible to the parent about their children only (placeholder counts)
        $reportsCount = 0;
        if (!empty($children)) {
            $studentIds = array_map(fn ($c) => $c['id'], $children);
            if (DB::schema()->hasTable('teacher_reports')) {
                $reportsCount = (int) DB::table('teacher_reports')
                    ->whereIn('student_id', $studentIds)
                    ->count();
            }
        }

        return Inertia::render('parent/index', [
            'dashboard' => [
                'children' => $children,
                'reportsCount' => $reportsCount,
            ],
        ]);
    }
}


