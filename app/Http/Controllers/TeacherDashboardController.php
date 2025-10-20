<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class TeacherDashboardController extends Controller
{
    public function __invoke(): Response
    {
        $user = Auth::user();

        $teacher = DB::table('teachers')->where('user_id', $user->id)->first();

        $schoolId = $teacher->school_id ?? null;

        $studentsTotal = 0;
        $classesCount = 0;
        $studentsByClass = [];

        if ($schoolId) {
            $studentsTotal = (int) DB::table('students')
                ->where('school_id', $schoolId)
                ->count();

            $byClass = DB::table('students')
                ->select('class', DB::raw('count(*) as total'))
                ->where('school_id', $schoolId)
                ->groupBy('class')
                ->orderBy('class')
                ->get();

            $studentsByClass = $byClass->map(function ($row) {
                return [
                    'class' => $row->class ?? 'Unassigned',
                    'total' => (int) $row->total,
                ];
            })->all();

            $classesCount = count($studentsByClass);
        }

        return Inertia::render('teacher/index', [
            'dashboard' => [
                'studentsTotal' => $studentsTotal,
                'classesCount' => $classesCount,
                'studentsByClass' => $studentsByClass,
            ],
        ]);
    }
}


