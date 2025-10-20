<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Carbon\Carbon;

class AdminReportsController extends Controller
{
    public function index(Request $request)
    {
        $query = DB::table('reports')->select('*');

        // Filter by type
        if ($request->has('type') && $request->type !== 'all') {
            $query->where('type', $request->type);
        }

        // Filter by status
        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        // Search
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhere('type', 'like', "%{$search}%");
            });
        }

        $reports = $query->orderBy('created_at', 'desc')->paginate(20)->withQueryString();

        // Get report statistics
        $stats = [
            'totalReports' => DB::table('reports')->count(),
            'completedReports' => DB::table('reports')->where('status', 'completed')->count(),
            'generatingReports' => DB::table('reports')->where('status', 'generating')->count(),
            'scheduledReports' => DB::table('reports')->where('status', 'scheduled')->count(),
            'totalDownloads' => DB::table('reports')->sum('download_count'),
            'reportTypes' => DB::table('reports')
                ->select('type', DB::raw('count(*) as count'), DB::raw('max(created_at) as last_generated'))
                ->groupBy('type')
                ->get(),
            'popularReports' => DB::table('reports')
                ->select('title', 'download_count', 'type')
                ->orderBy('download_count', 'desc')
                ->limit(5)
                ->get()
        ];

        return Inertia::render('admin/reports/index', [
            'reports' => $reports,
            'stats' => $stats,
            'filters' => $request->only(['type', 'status', 'search'])
        ]);
    }

    public function create()
    {
        $reportTemplates = [
            'national' => [
                'title' => 'National Education Overview',
                'description' => 'Comprehensive national education statistics and KPIs',
                'sections' => ['enrollment', 'teachers', 'infrastructure', 'performance']
            ],
            'regional' => [
                'title' => 'Regional Performance Report',
                'description' => 'Regional education performance and compliance metrics',
                'sections' => ['schools', 'teachers', 'students', 'compliance']
            ],
            'school' => [
                'title' => 'School Performance Report',
                'description' => 'Individual school performance and compliance data',
                'sections' => ['academics', 'attendance', 'staff', 'finance']
            ],
            'compliance' => [
                'title' => 'Compliance Scorecard',
                'description' => 'School compliance with national standards',
                'sections' => ['infrastructure', 'staffing', 'curriculum', 'safety']
            ],
            'performance' => [
                'title' => 'Performance Analytics',
                'description' => 'Student and teacher performance analytics',
                'sections' => ['academic', 'attendance', 'behavior', 'improvement']
            ],
            'financial' => [
                'title' => 'Financial Audit Report',
                'description' => 'Financial compliance and budget utilization',
                'sections' => ['budget', 'expenditure', 'grants', 'audit']
            ],
            'enrollment' => [
                'title' => 'Enrollment Statistics',
                'description' => 'Student enrollment trends and demographics',
                'sections' => ['demographics', 'trends', 'projections', 'retention']
            ]
        ];

        $regions = DB::table('schools')->select('region')->distinct()->pluck('region');
        $schools = DB::table('schools')->select('id', 'name', 'code', 'region')->get();

        return Inertia::render('admin/reports/create', [
            'reportTemplates' => $reportTemplates,
            'regions' => $regions,
            'schools' => $schools
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'type' => 'required|string|in:national,regional,school,compliance,performance,financial,enrollment',
            'description' => 'required|string',
            'filters' => 'array',
            'schedule' => 'array',
            'recipients' => 'array'
        ]);

        $reportId = DB::table('reports')->insertGetId([
            'title' => $request->title,
            'type' => $request->type,
            'description' => $request->description,
            'filters' => json_encode($request->filters ?? []),
            'schedule' => json_encode($request->schedule ?? []),
            'recipients' => json_encode($request->recipients ?? []),
            'status' => 'generating',
            'author_id' => Auth::id(),
            'created_at' => now(),
            'updated_at' => now()
        ]);

        // Queue report generation
        // dispatch(new GenerateReportJob($reportId));

        return redirect()->route('admin.reports.show', $reportId)
            ->with('success', 'Report generation started successfully.');
    }

    public function show($id)
    {
        $report = DB::table('reports')->where('id', $id)->first();
        
        if (!$report) {
            abort(404);
        }

        $reportData = $this->generateReportData($report);
        
        return Inertia::render('admin/reports/show', [
            'report' => $report,
            'reportData' => $reportData
        ]);
    }

    public function download($id)
    {
        $report = DB::table('reports')->where('id', $id)->first();
        
        if (!$report || $report->status !== 'completed') {
            abort(404);
        }

        // Increment download count
        DB::table('reports')->where('id', $id)->increment('download_count');

        // Return file download response
        return response()->download(storage_path("app/reports/{$report->file_path}"));
    }

    public function schedule(Request $request)
    {
        $request->validate([
            'report_id' => 'required|exists:reports,id',
            'frequency' => 'required|in:daily,weekly,monthly,quarterly,yearly',
            'enabled' => 'boolean'
        ]);

        DB::table('reports')->where('id', $request->report_id)->update([
            'schedule' => json_encode([
                'frequency' => $request->frequency,
                'enabled' => $request->enabled ?? true,
                'next_run' => $this->calculateNextRun($request->frequency)
            ]),
            'updated_at' => now()
        ]);

        return back()->with('success', 'Report schedule updated successfully.');
    }

    // Statutory Reports
    public function emisReport(Request $request)
    {
        $year = $request->get('year', date('Y'));
        
        $data = [
            'year' => $year,
            'schools' => DB::table('schools')->count(),
            'students' => DB::table('students')->count(),
            'teachers' => DB::table('teachers')->count(),
            'byRegion' => DB::table('schools')
                ->join('students', 'schools.id', '=', 'students.school_id')
                ->select('schools.region', DB::raw('count(students.id) as student_count'))
                ->groupBy('schools.region')
                ->get(),
            'byLevel' => DB::table('students')
                ->select('class', DB::raw('count(*) as count'))
                ->groupBy('class')
                ->get(),
            'infrastructure' => [
                'totalClassrooms' => DB::table('schools')->sum('classroom_count'),
                'totalLibraries' => DB::table('schools')->where('has_library', true)->count(),
                'totalLabs' => DB::table('schools')->where('has_lab', true)->count(),
                'totalComputerLabs' => DB::table('schools')->where('has_computer_lab', true)->count()
            ]
        ];

        return Inertia::render('admin/reports/emis', ['data' => $data]);
    }

    public function financialAudit(Request $request)
    {
        $year = $request->get('year', date('Y'));
        
        $data = [
            'year' => $year,
            'totalBudget' => DB::table('school_budgets')->sum('amount'),
            'totalExpenditure' => DB::table('school_expenditures')->sum('amount'),
            'byCategory' => DB::table('school_expenditures')
                ->select('category', DB::raw('sum(amount) as total'))
                ->groupBy('category')
                ->get(),
            'byRegion' => DB::table('school_budgets')
                ->join('schools', 'school_budgets.school_id', '=', 'schools.id')
                ->select('schools.region', DB::raw('sum(school_budgets.amount) as total'))
                ->groupBy('schools.region')
                ->get(),
            'compliance' => [
                'auditedSchools' => DB::table('schools')->where('audit_status', 'completed')->count(),
                'pendingAudits' => DB::table('schools')->where('audit_status', 'pending')->count(),
                'nonCompliant' => DB::table('schools')->where('audit_status', 'non_compliant')->count()
            ]
        ];

        return Inertia::render('admin/reports/financial-audit', ['data' => $data]);
    }

    public function amlCftReport(Request $request)
    {
        $year = $request->get('year', date('Y'));
        
        $data = [
            'year' => $year,
            'totalTransactions' => DB::table('wallet_transactions')->count(),
            'totalVolume' => DB::table('wallet_transactions')->sum('amount'),
            'suspiciousTransactions' => DB::table('wallet_transactions')
                ->where('risk_score', '>', 70)
                ->count(),
            'byType' => DB::table('wallet_transactions')
                ->select('type', DB::raw('count(*) as count'), DB::raw('sum(amount) as total'))
                ->groupBy('type')
                ->get(),
            'compliance' => [
                'kycVerified' => DB::table('users')->where('kyc_status', 'verified')->count(),
                'kycPending' => DB::table('users')->where('kyc_status', 'pending')->count(),
                'kycRejected' => DB::table('users')->where('kyc_status', 'rejected')->count()
            ]
        ];

        return Inertia::render('admin/reports/aml-cft', ['data' => $data]);
    }

    private function generateReportData($report)
    {
        $filters = json_decode($report->filters, true) ?? [];
        
        switch ($report->type) {
            case 'national':
                return $this->generateNationalReport($filters);
            case 'regional':
                return $this->generateRegionalReport($filters);
            case 'school':
                return $this->generateSchoolReport($filters);
            case 'compliance':
                return $this->generateComplianceReport($filters);
            case 'performance':
                return $this->generatePerformanceReport($filters);
            case 'financial':
                return $this->generateFinancialReport($filters);
            case 'enrollment':
                return $this->generateEnrollmentReport($filters);
            default:
                return [];
        }
    }

    private function generateNationalReport($filters)
    {
        return [
            'summary' => [
                'totalSchools' => DB::table('schools')->count(),
                'totalStudents' => DB::table('students')->count(),
                'totalTeachers' => DB::table('teachers')->count(),
                'averagePTR' => DB::table('schools')
                    ->join('students', 'schools.id', '=', 'students.school_id')
                    ->join('teachers', 'schools.id', '=', 'teachers.school_id')
                    ->selectRaw('AVG(COUNT(students.id) / COUNT(teachers.id)) as ptr')
                    ->groupBy('schools.id')
                    ->first()->ptr ?? 0
            ],
            'byRegion' => DB::table('schools')
                ->leftJoin('students', 'schools.id', '=', 'students.school_id')
                ->leftJoin('teachers', 'schools.id', '=', 'teachers.school_id')
                ->select('schools.region', 
                    DB::raw('COUNT(DISTINCT schools.id) as school_count'),
                    DB::raw('COUNT(DISTINCT students.id) as student_count'),
                    DB::raw('COUNT(DISTINCT teachers.id) as teacher_count'))
                ->groupBy('schools.region')
                ->get(),
            'kpis' => [
                'ger' => $this->calculateGER(),
                'ner' => $this->calculateNER(),
                'completionRate' => $this->calculateCompletionRate(),
                'literacyRate' => $this->calculateLiteracyRate()
            ]
        ];
    }

    private function generateRegionalReport($filters)
    {
        $region = $filters['region'] ?? null;
        
        if (!$region) {
            return [];
        }

        return [
            'region' => $region,
            'summary' => [
                'schools' => DB::table('schools')->where('region', $region)->count(),
                'students' => DB::table('students')
                    ->join('schools', 'students.school_id', '=', 'schools.id')
                    ->where('schools.region', $region)
                    ->count(),
                'teachers' => DB::table('teachers')
                    ->join('schools', 'teachers.school_id', '=', 'schools.id')
                    ->where('schools.region', $region)
                    ->count()
            ],
            'performance' => [
                'averageAttendance' => $this->calculateAverageAttendance($region),
                'complianceScore' => $this->calculateComplianceScore($region),
                'performanceRating' => $this->calculatePerformanceRating($region)
            ]
        ];
    }

    private function generateSchoolReport($filters)
    {
        $schoolId = $filters['school_id'] ?? null;
        
        if (!$schoolId) {
            return [];
        }

        $school = DB::table('schools')->where('id', $schoolId)->first();
        
        return [
            'school' => $school,
            'summary' => [
                'students' => DB::table('students')->where('school_id', $schoolId)->count(),
                'teachers' => DB::table('teachers')->where('school_id', $schoolId)->count(),
                'classes' => DB::table('students')->where('school_id', $schoolId)->distinct('class')->count()
            ],
            'performance' => [
                'attendance' => $this->calculateSchoolAttendance($schoolId),
                'academic' => $this->calculateSchoolAcademicPerformance($schoolId),
                'compliance' => $this->calculateSchoolCompliance($schoolId)
            ]
        ];
    }

    private function generateComplianceReport($filters)
    {
        return [
            'overview' => [
                'totalSchools' => DB::table('schools')->count(),
                'compliantSchools' => DB::table('schools')->where('compliance_score', '>=', 80)->count(),
                'partiallyCompliant' => DB::table('schools')->whereBetween('compliance_score', [60, 79])->count(),
                'nonCompliant' => DB::table('schools')->where('compliance_score', '<', 60)->count()
            ],
            'byRegion' => DB::table('schools')
                ->select('region', 
                    DB::raw('AVG(compliance_score) as avg_score'),
                    DB::raw('COUNT(*) as school_count'))
                ->groupBy('region')
                ->get(),
            'byCategory' => [
                'infrastructure' => $this->calculateInfrastructureCompliance(),
                'staffing' => $this->calculateStaffingCompliance(),
                'curriculum' => $this->calculateCurriculumCompliance(),
                'safety' => $this->calculateSafetyCompliance()
            ]
        ];
    }

    private function generatePerformanceReport($filters)
    {
        return [
            'studentPerformance' => [
                'overall' => $this->calculateOverallStudentPerformance(),
                'bySubject' => $this->calculatePerformanceBySubject(),
                'byRegion' => $this->calculatePerformanceByRegion(),
                'trends' => $this->calculatePerformanceTrends()
            ],
            'teacherPerformance' => [
                'overall' => $this->calculateOverallTeacherPerformance(),
                'bySubject' => $this->calculateTeacherPerformanceBySubject(),
                'byRegion' => $this->calculateTeacherPerformanceByRegion(),
                'trends' => $this->calculateTeacherPerformanceTrends()
            ]
        ];
    }

    private function generateFinancialReport($filters)
    {
        return [
            'overview' => [
                'totalBudget' => DB::table('school_budgets')->sum('amount'),
                'totalExpenditure' => DB::table('school_expenditures')->sum('amount'),
                'utilizationRate' => $this->calculateBudgetUtilizationRate()
            ],
            'byRegion' => DB::table('school_budgets')
                ->join('schools', 'school_budgets.school_id', '=', 'schools.id')
                ->select('schools.region', 
                    DB::raw('SUM(school_budgets.amount) as budget'),
                    DB::raw('SUM(school_expenditures.amount) as expenditure'))
                ->leftJoin('school_expenditures', 'schools.id', '=', 'school_expenditures.school_id')
                ->groupBy('schools.region')
                ->get(),
            'byCategory' => DB::table('school_expenditures')
                ->select('category', DB::raw('SUM(amount) as total'))
                ->groupBy('category')
                ->get()
        ];
    }

    private function generateEnrollmentReport($filters)
    {
        return [
            'overview' => [
                'totalEnrollment' => DB::table('students')->count(),
                'newEnrollments' => DB::table('students')->whereYear('created_at', date('Y'))->count(),
                'dropouts' => DB::table('students')->where('status', 'dropped_out')->count()
            ],
            'byRegion' => DB::table('students')
                ->join('schools', 'students.school_id', '=', 'schools.id')
                ->select('schools.region', DB::raw('COUNT(*) as count'))
                ->groupBy('schools.region')
                ->get(),
            'byClass' => DB::table('students')
                ->select('class', DB::raw('COUNT(*) as count'))
                ->groupBy('class')
                ->get(),
            'trends' => $this->calculateEnrollmentTrends()
        ];
    }

    // Helper methods for calculations
    private function calculateGER() { return 95.2; } // Mock data
    private function calculateNER() { return 87.8; } // Mock data
    private function calculateCompletionRate() { return 78.5; } // Mock data
    private function calculateLiteracyRate() { return 82.3; } // Mock data
    private function calculateAverageAttendance($region) { return 85.7; } // Mock data
    private function calculateComplianceScore($region) { return 78.9; } // Mock data
    private function calculatePerformanceRating($region) { return 'Good'; } // Mock data
    private function calculateSchoolAttendance($schoolId) { return 88.2; } // Mock data
    private function calculateSchoolAcademicPerformance($schoolId) { return 75.4; } // Mock data
    private function calculateSchoolCompliance($schoolId) { return 82.1; } // Mock data
    private function calculateInfrastructureCompliance() { return 76.8; } // Mock data
    private function calculateStaffingCompliance() { return 81.2; } // Mock data
    private function calculateCurriculumCompliance() { return 89.5; } // Mock data
    private function calculateSafetyCompliance() { return 73.4; } // Mock data
    private function calculateOverallStudentPerformance() { return 78.9; } // Mock data
    private function calculatePerformanceBySubject() { return []; } // Mock data
    private function calculatePerformanceByRegion() { return []; } // Mock data
    private function calculatePerformanceTrends() { return []; } // Mock data
    private function calculateOverallTeacherPerformance() { return 82.1; } // Mock data
    private function calculateTeacherPerformanceBySubject() { return []; } // Mock data
    private function calculateTeacherPerformanceByRegion() { return []; } // Mock data
    private function calculateTeacherPerformanceTrends() { return []; } // Mock data
    private function calculateBudgetUtilizationRate() { return 87.3; } // Mock data
    private function calculateEnrollmentTrends() { return []; } // Mock data

    private function calculateNextRun($frequency)
    {
        $now = Carbon::now();
        
        switch ($frequency) {
            case 'daily':
                return $now->addDay()->format('Y-m-d H:i:s');
            case 'weekly':
                return $now->addWeek()->format('Y-m-d H:i:s');
            case 'monthly':
                return $now->addMonth()->format('Y-m-d H:i:s');
            case 'quarterly':
                return $now->addMonths(3)->format('Y-m-d H:i:s');
            case 'yearly':
                return $now->addYear()->format('Y-m-d H:i:s');
            default:
                return $now->addDay()->format('Y-m-d H:i:s');
        }
    }
}
