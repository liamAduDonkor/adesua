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

class AdminAnalyticsController extends Controller
{
    /**
     * Get comprehensive analytics dashboard
     */
    public function dashboard(): Response
    {
        // Overall statistics
        $stats = [
            'total_teachers' => Teacher::count(),
            'total_students' => Student::count(),
            'total_vendors' => Vendor::count(),
            'total_schools' => DB::table('schools')->count(),
        ];

        // Teacher performance analytics
        $teacherAnalytics = [
            'average_performance' => TeacherPerformance::avg('average_student_score'),
            'attendance_rate' => TeacherPerformance::avg('attendance_rate'),
            'punctuality_rate' => TeacherPerformance::avg('punctuality_rate'),
            'performance_by_rating' => TeacherPerformance::selectRaw('performance_rating, COUNT(*) as count')
                ->groupBy('performance_rating')
                ->get()
                ->pluck('count', 'performance_rating'),
            'top_performing_teachers' => TeacherPerformance::with(['teacher.user', 'school'])
                ->orderBy('average_student_score', 'desc')
                ->limit(10)
                ->get(),
        ];

        // Student performance analytics
        $studentAnalytics = [
            'average_performance' => StudentPerformance::avg('overall_average'),
            'attendance_rate' => StudentPerformance::avg('attendance_rate'),
            'punctuality_rate' => StudentPerformance::avg('punctuality_rate'),
            'performance_by_rating' => StudentPerformance::selectRaw('performance_rating, COUNT(*) as count')
                ->groupBy('performance_rating')
                ->get()
                ->pluck('count', 'performance_rating'),
            'top_performing_students' => StudentPerformance::with(['student.user', 'school'])
                ->orderBy('overall_average', 'desc')
                ->limit(10)
                ->get(),
        ];

        // Vendor analytics
        $vendorAnalytics = [
            'total_contracts' => VendorStatistics::sum('contracts_awarded'),
            'total_contract_value' => VendorStatistics::sum('total_contract_value'),
            'total_amount_paid' => VendorStatistics::sum('amount_paid'),
            'average_delivery_performance' => VendorStatistics::avg('delivery_performance'),
            'average_quality_rating' => VendorStatistics::avg('quality_rating'),
            'average_timeliness_rating' => VendorStatistics::avg('timeliness_rating'),
            'compliance_status' => VendorStatistics::selectRaw('compliance_status, COUNT(*) as count')
                ->groupBy('compliance_status')
                ->get()
                ->pluck('count', 'compliance_status'),
            'top_vendors_by_value' => VendorStatistics::with(['vendor.user'])
                ->orderBy('total_contract_value', 'desc')
                ->limit(10)
                ->get(),
        ];

        // Regional analytics
        $regionalAnalytics = [
            'teachers_by_region' => DB::table('teachers')
                ->join('schools', 'teachers.school_id', '=', 'schools.id')
                ->select('schools.region', DB::raw('COUNT(*) as count'))
                ->groupBy('schools.region')
                ->get(),
            'students_by_region' => DB::table('students')
                ->join('schools', 'students.school_id', '=', 'schools.id')
                ->select('schools.region', DB::raw('COUNT(*) as count'))
                ->groupBy('schools.region')
                ->get(),
            'schools_by_region' => DB::table('schools')
                ->select('region', DB::raw('COUNT(*) as count'))
                ->groupBy('region')
                ->get(),
        ];

        // Performance trends (last 5 academic years)
        $performanceTrends = [
            'teacher_performance' => TeacherPerformance::selectRaw('academic_year, AVG(average_student_score) as avg_score')
                ->groupBy('academic_year')
                ->orderBy('academic_year', 'desc')
                ->limit(5)
                ->get(),
            'student_performance' => StudentPerformance::selectRaw('academic_year, AVG(overall_average) as avg_score')
                ->groupBy('academic_year')
                ->orderBy('academic_year', 'desc')
                ->limit(5)
                ->get(),
        ];

        return Inertia::render('admin/analytics/dashboard', [
            'stats' => $stats,
            'teacherAnalytics' => $teacherAnalytics,
            'studentAnalytics' => $studentAnalytics,
            'vendorAnalytics' => $vendorAnalytics,
            'regionalAnalytics' => $regionalAnalytics,
            'performanceTrends' => $performanceTrends,
        ]);
    }

    /**
     * Get teacher performance analytics
     */
    public function teacherAnalytics(Request $request): Response
    {
        $query = TeacherPerformance::with(['teacher.user', 'school']);

        if ($request->filled('academic_year')) {
            $query->where('academic_year', $request->get('academic_year'));
        }

        if ($request->filled('school_id')) {
            $query->where('school_id', $request->get('school_id'));
        }

        if ($request->filled('subject')) {
            $query->where('subject', 'like', "%{$request->get('subject')}%");
        }

        $analytics = [
            'summary' => $query->selectRaw('
                COUNT(*) as total_records,
                AVG(average_student_score) as avg_score,
                AVG(attendance_rate) as avg_attendance,
                AVG(punctuality_rate) as avg_punctuality,
                MIN(average_student_score) as min_score,
                MAX(average_student_score) as max_score
            ')->first(),
            'performance_distribution' => $query->selectRaw('performance_rating, COUNT(*) as count')
                ->groupBy('performance_rating')
                ->get(),
            'subject_performance' => $query->selectRaw('subject, AVG(average_student_score) as avg_score, COUNT(*) as count')
                ->groupBy('subject')
                ->orderBy('avg_score', 'desc')
                ->get(),
            'school_performance' => $query->selectRaw('school_id, AVG(average_student_score) as avg_score, COUNT(*) as count')
                ->groupBy('school_id')
                ->with('school')
                ->orderBy('avg_score', 'desc')
                ->get(),
        ];

        return Inertia::render('admin/analytics/teachers', [
            'analytics' => $analytics,
            'filters' => $request->only(['academic_year', 'school_id', 'subject']),
            'schools' => DB::table('schools')->select('id', 'name')->get(),
        ]);
    }

    /**
     * Get student performance analytics
     */
    public function studentAnalytics(Request $request): Response
    {
        $query = StudentPerformance::with(['student.user', 'school']);

        if ($request->filled('academic_year')) {
            $query->where('academic_year', $request->get('academic_year'));
        }

        if ($request->filled('school_id')) {
            $query->where('school_id', $request->get('school_id'));
        }

        if ($request->filled('class')) {
            $query->where('class', $request->get('class'));
        }

        $analytics = [
            'summary' => $query->selectRaw('
                COUNT(*) as total_records,
                AVG(overall_average) as avg_score,
                AVG(attendance_rate) as avg_attendance,
                AVG(punctuality_rate) as avg_punctuality,
                MIN(overall_average) as min_score,
                MAX(overall_average) as max_score
            ')->first(),
            'performance_distribution' => $query->selectRaw('performance_rating, COUNT(*) as count')
                ->groupBy('performance_rating')
                ->get(),
            'class_performance' => $query->selectRaw('class, AVG(overall_average) as avg_score, COUNT(*) as count')
                ->groupBy('class')
                ->orderBy('avg_score', 'desc')
                ->get(),
            'school_performance' => $query->selectRaw('school_id, AVG(overall_average) as avg_score, COUNT(*) as count')
                ->groupBy('school_id')
                ->with('school')
                ->orderBy('avg_score', 'desc')
                ->get(),
        ];

        return Inertia::render('admin/analytics/students', [
            'analytics' => $analytics,
            'filters' => $request->only(['academic_year', 'school_id', 'class']),
            'schools' => DB::table('schools')->select('id', 'name')->get(),
        ]);
    }

    /**
     * Get vendor analytics
     */
    public function vendorAnalytics(Request $request): Response
    {
        $query = VendorStatistics::with(['vendor.user']);

        if ($request->filled('academic_year')) {
            $query->where('academic_year', $request->get('academic_year'));
        }

        if ($request->filled('service_category')) {
            $query->where('service_category', $request->get('service_category'));
        }

        $analytics = [
            'summary' => $query->selectRaw('
                COUNT(*) as total_records,
                SUM(contracts_awarded) as total_contracts,
                SUM(total_contract_value) as total_value,
                SUM(amount_paid) as total_paid,
                AVG(delivery_performance) as avg_delivery,
                AVG(quality_rating) as avg_quality,
                AVG(timeliness_rating) as avg_timeliness
            ')->first(),
            'service_category_breakdown' => $query->selectRaw('service_category, SUM(contracts_awarded) as contracts, SUM(total_contract_value) as value')
                ->groupBy('service_category')
                ->get(),
            'compliance_status' => $query->selectRaw('compliance_status, COUNT(*) as count')
                ->groupBy('compliance_status')
                ->get(),
            'top_vendors' => $query->selectRaw('vendor_id, SUM(contracts_awarded) as contracts, SUM(total_contract_value) as value, AVG(quality_rating) as avg_quality')
                ->groupBy('vendor_id')
                ->with('vendor.user')
                ->orderBy('value', 'desc')
                ->limit(20)
                ->get(),
        ];

        return Inertia::render('admin/analytics/vendors', [
            'analytics' => $analytics,
            'filters' => $request->only(['academic_year', 'service_category']),
        ]);
    }
}