<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use App\Models\Student;
use App\Models\Vendor;
use App\Models\TeacherPerformance;
use App\Models\StudentPerformance;
use App\Models\VendorStatistics;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class AdminSearchController extends Controller
{
    /**
     * Search for teachers with performance data
     */
    public function searchTeachers(Request $request): Response
    {
        $query = Teacher::with(['user', 'school', 'performance'])
            ->join('users', 'teachers.user_id', '=', 'users.id')
            ->join('schools', 'teachers.school_id', '=', 'schools.id');

        // Search filters
        if ($request->filled('search')) {
            $searchTerm = $request->get('search');
            $query->where(function ($q) use ($searchTerm) {
                $q->where('users.name', 'like', "%{$searchTerm}%")
                  ->orWhere('users.email', 'like', "%{$searchTerm}%")
                  ->orWhere('teachers.staff_number', 'like', "%{$searchTerm}%")
                  ->orWhere('teachers.subject_specialization', 'like', "%{$searchTerm}%")
                  ->orWhere('schools.name', 'like', "%{$searchTerm}%");
            });
        }

        if ($request->filled('school_id')) {
            $query->where('teachers.school_id', $request->get('school_id'));
        }

        if ($request->filled('subject')) {
            $query->where('teachers.subject_specialization', 'like', "%{$request->get('subject')}%");
        }

        if ($request->filled('academic_year')) {
            $query->whereHas('performance', function ($q) use ($request) {
                $q->where('academic_year', $request->get('academic_year'));
            });
        }

        $teachers = $query->select('teachers.*', 'users.name', 'users.email', 'schools.name as school_name')
            ->paginate(20);

        // Get performance summary for each teacher
        $teachers->getCollection()->transform(function ($teacher) {
            $performance = TeacherPerformance::where('teacher_id', $teacher->id)
                ->selectRaw('
                    AVG(average_student_score) as avg_score,
                    AVG(attendance_rate) as avg_attendance,
                    AVG(punctuality_rate) as avg_punctuality,
                    COUNT(*) as total_records
                ')
                ->first();

            $teacher->performance_summary = $performance;
            return $teacher;
        });

        return Inertia::render('admin/search/teachers', [
            'teachers' => $teachers,
            'filters' => $request->only(['search', 'school_id', 'subject', 'academic_year']),
            'schools' => DB::table('schools')->select('id', 'name')->get(),
        ]);
    }

    /**
     * Search for students with performance data
     */
    public function searchStudents(Request $request): Response
    {
        $query = Student::with(['user', 'school', 'performance'])
            ->join('users', 'students.user_id', '=', 'users.id')
            ->join('schools', 'students.school_id', '=', 'schools.id');

        // Search filters
        if ($request->filled('search')) {
            $searchTerm = $request->get('search');
            $query->where(function ($q) use ($searchTerm) {
                $q->where('users.name', 'like', "%{$searchTerm}%")
                  ->orWhere('users.email', 'like', "%{$searchTerm}%")
                  ->orWhere('students.student_number', 'like', "%{$searchTerm}%")
                  ->orWhere('schools.name', 'like', "%{$searchTerm}%");
            });
        }

        if ($request->filled('school_id')) {
            $query->where('students.school_id', $request->get('school_id'));
        }

        if ($request->filled('class')) {
            $query->where('students.class', $request->get('class'));
        }

        if ($request->filled('academic_year')) {
            $query->whereHas('performance', function ($q) use ($request) {
                $q->where('academic_year', $request->get('academic_year'));
            });
        }

        $students = $query->select('students.*', 'users.name', 'users.email', 'schools.name as school_name')
            ->paginate(20);

        // Get performance summary for each student
        $students->getCollection()->transform(function ($student) {
            $performance = StudentPerformance::where('student_id', $student->id)
                ->selectRaw('
                    AVG(overall_average) as avg_score,
                    AVG(attendance_rate) as avg_attendance,
                    AVG(punctuality_rate) as avg_punctuality,
                    COUNT(*) as total_records
                ')
                ->first();

            $student->performance_summary = $performance;
            return $student;
        });

        return Inertia::render('admin/search/students', [
            'students' => $students,
            'filters' => $request->only(['search', 'school_id', 'class', 'academic_year']),
            'schools' => DB::table('schools')->select('id', 'name')->get(),
        ]);
    }

    /**
     * Search for vendors with statistics
     */
    public function searchVendors(Request $request): Response
    {
        $query = Vendor::with(['user', 'statistics'])
            ->join('users', 'vendors.user_id', '=', 'users.id');

        // Search filters
        if ($request->filled('search')) {
            $searchTerm = $request->get('search');
            $query->where(function ($q) use ($searchTerm) {
                $q->where('users.name', 'like', "%{$searchTerm}%")
                  ->orWhere('users.email', 'like', "%{$searchTerm}%")
                  ->orWhere('vendors.business_name', 'like', "%{$searchTerm}%")
                  ->orWhere('vendors.business_type', 'like', "%{$searchTerm}%")
                  ->orWhere('vendors.license_number', 'like', "%{$searchTerm}%");
            });
        }

        if ($request->filled('business_type')) {
            $query->where('vendors.business_type', $request->get('business_type'));
        }

        if ($request->filled('academic_year')) {
            $query->whereHas('statistics', function ($q) use ($request) {
                $q->where('academic_year', $request->get('academic_year'));
            });
        }

        $vendors = $query->select('vendors.*', 'users.name', 'users.email')
            ->paginate(20);

        // Get statistics summary for each vendor
        $vendors->getCollection()->transform(function ($vendor) {
            $statistics = VendorStatistics::where('vendor_id', $vendor->id)
                ->selectRaw('
                    SUM(contracts_awarded) as total_contracts,
                    SUM(total_contract_value) as total_value,
                    SUM(amount_paid) as total_paid,
                    AVG(delivery_performance) as avg_delivery,
                    AVG(quality_rating) as avg_quality,
                    AVG(timeliness_rating) as avg_timeliness,
                    COUNT(*) as total_records
                ')
                ->first();

            $vendor->statistics_summary = $statistics;
            return $vendor;
        });

        return Inertia::render('admin/search/vendors', [
            'vendors' => $vendors,
            'filters' => $request->only(['search', 'business_type', 'academic_year']),
        ]);
    }

    /**
     * Get detailed performance data for a specific teacher
     */
    public function teacherPerformance(Request $request, Teacher $teacher): Response
    {
        $performance = TeacherPerformance::where('teacher_id', $teacher->id)
            ->with('school')
            ->orderBy('academic_year', 'desc')
            ->orderBy('term', 'desc')
            ->paginate(10);

        $teacher->load(['user', 'school']);

        return Inertia::render('admin/performance/teacher', [
            'teacher' => $teacher,
            'performance' => $performance,
        ]);
    }

    /**
     * Get detailed performance data for a specific student
     */
    public function studentPerformance(Request $request, Student $student): Response
    {
        $performance = StudentPerformance::where('student_id', $student->id)
            ->with('school')
            ->orderBy('academic_year', 'desc')
            ->orderBy('term', 'desc')
            ->paginate(10);

        $student->load(['user', 'school']);

        return Inertia::render('admin/performance/student', [
            'student' => $student,
            'performance' => $performance,
        ]);
    }

    /**
     * Get detailed statistics for a specific vendor
     */
    public function vendorStatistics(Request $request, Vendor $vendor): Response
    {
        $statistics = VendorStatistics::where('vendor_id', $vendor->id)
            ->orderBy('academic_year', 'desc')
            ->paginate(10);

        $vendor->load(['user']);

        return Inertia::render('admin/statistics/vendor', [
            'vendor' => $vendor,
            'statistics' => $statistics,
        ]);
    }
}