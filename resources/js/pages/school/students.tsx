import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
    GraduationCap, 
    UserPlus, 
    Search, 
    Filter, 
    MoreHorizontal, 
    Mail, 
    Phone, 
    Calendar, 
    BookOpen, 
    Award, 
    Clock, 
    CheckCircle, 
    AlertCircle,
    Edit,
    Eye,
    Download,
    Upload,
    Settings,
    BarChart3,
    Users,
    TrendingUp,
    DollarSign,
    School,
    User
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Adesua', href: dashboard().url },
    { title: 'School', href: '/school' },
    { title: 'Students', href: '/school/students' },
];

type Student = {
    id: number;
    name: string;
    studentId: string;
    email?: string;
    phone?: string;
    grade: string;
    class: string;
    enrollmentDate: string;
    status: 'active' | 'inactive' | 'suspended' | 'graduated';
    attendance: {
        rate: number;
        totalDays: number;
        presentDays: number;
    };
    academic: {
        gpa: number;
        rank: number;
        subjects: string[];
        lastExam: string;
    };
    guardian?: {
        name: string;
        phone: string;
        email?: string;
        relationship: string;
    };
    fees: {
        total: number;
        paid: number;
        outstanding: number;
        currency: string;
    };
    performance: {
        level: 'excellent' | 'good' | 'average' | 'needs_improvement';
        trends: 'improving' | 'stable' | 'declining';
    };
};

type StudentStats = {
    totalStudents: number;
    activeStudents: number;
    graduated: number;
    newEnrollments: number;
    averageAttendance: number;
    averageGPA: number;
    gradeDistribution: {
        grade: string;
        count: number;
    }[];
    feeCollection: {
        total: number;
        collected: number;
        outstanding: number;
        currency: string;
    };
};

type SchoolStudentsProps = {
    students?: Student[];
    stats?: StudentStats;
};

export default function SchoolStudents() {
    const { students, stats } = usePage().props as unknown as SchoolStudentsProps;
    
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'active': return <Badge variant="default" className="bg-green-500">Active</Badge>;
            case 'inactive': return <Badge variant="secondary">Inactive</Badge>;
            case 'suspended': return <Badge variant="destructive">Suspended</Badge>;
            case 'graduated': return <Badge variant="default" className="bg-blue-500">Graduated</Badge>;
            default: return <Badge variant="outline">Unknown</Badge>;
        }
    };

    const getPerformanceBadge = (level: string) => {
        switch (level) {
            case 'excellent': return <Badge variant="default" className="bg-green-500">Excellent</Badge>;
            case 'good': return <Badge variant="default" className="bg-blue-500">Good</Badge>;
            case 'average': return <Badge variant="secondary" className="bg-yellow-500">Average</Badge>;
            case 'needs_improvement': return <Badge variant="destructive">Needs Improvement</Badge>;
            default: return <Badge variant="outline">Unknown</Badge>;
        }
    };

    const getAttendanceBadge = (rate: number) => {
        if (rate >= 95) return <Badge variant="default" className="bg-green-500">Excellent</Badge>;
        if (rate >= 85) return <Badge variant="default" className="bg-blue-500">Good</Badge>;
        if (rate >= 75) return <Badge variant="secondary" className="bg-yellow-500">Fair</Badge>;
        return <Badge variant="destructive">Poor</Badge>;
    };

    const formatCurrency = (amount: number, currency: string = 'GHS') => {
        return new Intl.NumberFormat('en-GH', {
            style: 'currency',
            currency: currency,
        }).format(amount);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="School - Student Management" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-semibold">Student Management</h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Manage student enrollment, performance, and records
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Export
                        </Button>
                        <Button variant="outline" size="sm">
                            <Upload className="h-4 w-4 mr-2" />
                            Import
                        </Button>
                        <Button size="sm">
                            <UserPlus className="h-4 w-4 mr-2" />
                            Enroll Student
                        </Button>
                    </div>
                </div>

                {/* Stats Overview */}
                {stats && (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center gap-2">
                                    <GraduationCap className="h-4 w-4 text-blue-500" />
                                    <div>
                                        <div className="text-2xl font-bold text-blue-600">{stats.totalStudents}</div>
                                        <div className="text-sm text-muted-foreground">Total Students</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <div>
                                        <div className="text-2xl font-bold text-green-600">{stats.activeStudents}</div>
                                        <div className="text-sm text-muted-foreground">Active</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center gap-2">
                                    <Award className="h-4 w-4 text-purple-500" />
                                    <div>
                                        <div className="text-2xl font-bold text-purple-600">{stats.averageAttendance}%</div>
                                        <div className="text-sm text-muted-foreground">Avg Attendance</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="h-4 w-4 text-orange-500" />
                                    <div>
                                        <div className="text-2xl font-bold text-orange-600">{stats.averageGPA}</div>
                                        <div className="text-sm text-muted-foreground">Average GPA</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Search and Filters */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search students by name, ID, grade, or class..."
                            className="pl-8"
                        />
                    </div>
                    <Button variant="outline">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                    </Button>
                </div>

                {/* Students List */}
                <div className="grid grid-cols-1 gap-4">
                    {students && students.length > 0 ? (
                        students.map((student) => (
                            <Card key={student.id}>
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                                                <GraduationCap className="h-6 w-6 text-green-600" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-lg font-semibold">{student.name}</h3>
                                                    <Badge variant="outline">ID: {student.studentId}</Badge>
                                                    {getStatusBadge(student.status)}
                                                    {getPerformanceBadge(student.performance.level)}
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                    <div className="space-y-2">
                                                        <div className="flex items-center gap-2">
                                                            <School className="h-4 w-4 text-muted-foreground" />
                                                            <span className="text-sm">{student.grade} - {student.class}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                                            <span className="text-sm">Enrolled: {student.enrollmentDate}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Clock className="h-4 w-4 text-muted-foreground" />
                                                            <span className="text-sm">Attendance: {student.attendance.rate}%</span>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        {student.email && (
                                                            <div className="flex items-center gap-2">
                                                                <Mail className="h-4 w-4 text-muted-foreground" />
                                                                <span className="text-sm">{student.email}</span>
                                                            </div>
                                                        )}
                                                        {student.phone && (
                                                            <div className="flex items-center gap-2">
                                                                <Phone className="h-4 w-4 text-muted-foreground" />
                                                                <span className="text-sm">{student.phone}</span>
                                                            </div>
                                                        )}
                                                        <div className="flex items-center gap-2">
                                                            <Award className="h-4 w-4 text-muted-foreground" />
                                                            <span className="text-sm">GPA: {student.academic.gpa}</span>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <div className="flex items-center gap-2">
                                                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                                                            <span className="text-sm">
                                                                Fees: {formatCurrency(student.fees.paid, student.fees.currency)} / {formatCurrency(student.fees.total, student.fees.currency)}
                                                            </span>
                                                        </div>
                                                        {student.fees.outstanding > 0 && (
                                                            <div className="flex items-center gap-2">
                                                                <AlertCircle className="h-4 w-4 text-red-500" />
                                                                <span className="text-sm text-red-600">
                                                                    Outstanding: {formatCurrency(student.fees.outstanding, student.fees.currency)}
                                                                </span>
                                                            </div>
                                                        )}
                                                        <div className="flex items-center gap-2">
                                                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                                                            <span className="text-sm">Rank: #{student.academic.rank}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {student.academic.subjects.length > 0 && (
                                                    <div className="mt-3">
                                                        <div className="text-sm font-medium mb-1">Subjects:</div>
                                                        <div className="flex flex-wrap gap-1">
                                                            {student.academic.subjects.map((subject, index) => (
                                                                <Badge key={index} variant="outline" className="text-xs">
                                                                    {subject}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                                {student.guardian && (
                                                    <div className="mt-3">
                                                        <div className="text-sm font-medium mb-1">Guardian:</div>
                                                        <div className="text-sm text-muted-foreground">
                                                            {student.guardian.name} ({student.guardian.relationship}) - {student.guardian.phone}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <Card>
                            <CardContent className="flex flex-col items-center justify-center py-12">
                                <GraduationCap className="h-12 w-12 text-muted-foreground mb-4" />
                                <h3 className="text-lg font-medium mb-2">No Students Found</h3>
                                <p className="text-sm text-muted-foreground text-center mb-4">
                                    No students found. Enroll your first student to get started.
                                </p>
                                <Button>
                                    <UserPlus className="h-4 w-4 mr-2" />
                                    Enroll Student
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Grade Distribution */}
                {stats && stats.gradeDistribution.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BarChart3 className="h-5 w-5" />
                                Grade Distribution
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {stats.gradeDistribution.map((grade, index) => (
                                    <div key={index} className="p-4 border rounded-lg">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="font-medium">Grade {grade.grade}</div>
                                                <div className="text-sm text-muted-foreground">{grade.count} students</div>
                                            </div>
                                            <div className="text-2xl font-bold text-blue-600">{grade.count}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Fee Collection Overview */}
                {stats && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <DollarSign className="h-5 w-5" />
                                Fee Collection Overview
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="p-4 border rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="font-medium">Total Fees</div>
                                            <div className="text-sm text-muted-foreground">Expected amount</div>
                                        </div>
                                        <div className="text-2xl font-bold text-blue-600">
                                            {formatCurrency(stats.feeCollection.total, stats.feeCollection.currency)}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 border rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="font-medium">Collected</div>
                                            <div className="text-sm text-muted-foreground">Amount received</div>
                                        </div>
                                        <div className="text-2xl font-bold text-green-600">
                                            {formatCurrency(stats.feeCollection.collected, stats.feeCollection.currency)}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 border rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="font-medium">Outstanding</div>
                                            <div className="text-sm text-muted-foreground">Pending collection</div>
                                        </div>
                                        <div className="text-2xl font-bold text-red-600">
                                            {formatCurrency(stats.feeCollection.outstanding, stats.feeCollection.currency)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="p-6 text-center">
                            <UserPlus className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                            <h3 className="font-medium mb-2">Enroll New Student</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Register new students to the school
                            </p>
                            <Button variant="outline" className="w-full">
                                Enroll Student
                            </Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 text-center">
                            <BarChart3 className="h-8 w-8 text-green-500 mx-auto mb-3" />
                            <h3 className="font-medium mb-2">Academic Reports</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Generate student performance reports
                            </p>
                            <Button variant="outline" className="w-full">
                                View Reports
                            </Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 text-center">
                            <Calendar className="h-8 w-8 text-purple-500 mx-auto mb-3" />
                            <h3 className="font-medium mb-2">Attendance Management</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Track and manage student attendance
                            </p>
                            <Button variant="outline" className="w-full">
                                Manage Attendance
                            </Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 text-center">
                            <DollarSign className="h-8 w-8 text-orange-500 mx-auto mb-3" />
                            <h3 className="font-medium mb-2">Fee Management</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Manage student fees and payments
                            </p>
                            <Button variant="outline" className="w-full">
                                Manage Fees
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}


