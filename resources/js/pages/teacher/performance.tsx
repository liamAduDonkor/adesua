import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Users, Award, Target, BarChart3, Download, AlertCircle, CheckCircle } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Adesua', href: dashboard().url },
    { title: 'Teacher', href: '/teacher' },
    { title: 'Performance', href: '/teacher/performance' },
];

type ClassPerformance = {
    classId: string;
    className: string;
    studentCount: number;
    averageGrade: number;
    attendanceRate: number;
    completionRate: number;
    topPerformers: {
        name: string;
        grade: number;
    }[];
    strugglingStudents: {
        name: string;
        grade: number;
        issues: string[];
    }[];
};

type AssessmentResult = {
    id: number;
    title: string;
    type: 'exam' | 'assignment' | 'project' | 'quiz';
    class: string;
    date: string;
    averageScore: number;
    maxScore: number;
    passRate: number;
    distribution: {
        grade: string;
        count: number;
    }[];
};

type TeacherPerformanceData = {
    overallStats: {
        totalStudents: number;
        averageAttendance: number;
        averageGrade: number;
        classesTaught: number;
    };
    classPerformance: ClassPerformance[];
    recentAssessments: AssessmentResult[];
    trends: {
        month: string;
        attendance: number;
        averageGrade: number;
        studentCount: number;
    }[];
};

type TeacherPerformanceProps = {
    performance?: TeacherPerformanceData;
};

export default function TeacherPerformance() {
    const { performance } = usePage().props as unknown as TeacherPerformanceProps;
    
    const getGradeBadge = (grade: number) => {
        if (grade >= 3.7) return <Badge variant="default" className="bg-green-500">Excellent</Badge>;
        if (grade >= 3.3) return <Badge variant="default" className="bg-blue-500">Good</Badge>;
        if (grade >= 3.0) return <Badge variant="secondary" className="bg-yellow-500">Average</Badge>;
        if (grade >= 2.7) return <Badge variant="secondary" className="bg-orange-500">Below Average</Badge>;
        return <Badge variant="destructive">Poor</Badge>;
    };

    const getAssessmentIcon = (type: string) => {
        switch (type) {
            case 'exam': return <BarChart3 className="h-4 w-4 text-red-500" />;
            case 'assignment': return <Award className="h-4 w-4 text-blue-500" />;
            case 'project': return <Target className="h-4 w-4 text-purple-500" />;
            case 'quiz': return <TrendingUp className="h-4 w-4 text-green-500" />;
            default: return <BarChart3 className="h-4 w-4 text-gray-500" />;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Teacher - Performance" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Performance Analytics</h1>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <BarChart3 className="h-4 w-4 mr-2" />
                            View Charts
                        </Button>
                        <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Export Report
                        </Button>
                    </div>
                </div>

                {performance ? (
                    <div className="grid grid-cols-1 gap-6">
                        {/* Overall Stats */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                            <Card>
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-2">
                                        <Users className="h-4 w-4 text-blue-500" />
                                        <div>
                                            <div className="text-2xl font-bold text-blue-600">{performance.overallStats.totalStudents}</div>
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
                                            <div className="text-2xl font-bold text-green-600">{performance.overallStats.averageAttendance}%</div>
                                            <div className="text-sm text-muted-foreground">Avg Attendance</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-2">
                                        <Award className="h-4 w-4 text-purple-500" />
                                        <div>
                                            <div className="text-2xl font-bold text-purple-600">{performance.overallStats.averageGrade.toFixed(1)}</div>
                                            <div className="text-sm text-muted-foreground">Avg Grade</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-2">
                                        <Target className="h-4 w-4 text-orange-500" />
                                        <div>
                                            <div className="text-2xl font-bold text-orange-600">{performance.overallStats.classesTaught}</div>
                                            <div className="text-sm text-muted-foreground">Classes Taught</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Class Performance */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Users className="h-5 w-5" />
                                    Class Performance Overview
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {performance.classPerformance.map((classData) => (
                                        <div key={classData.classId} className="p-4 border rounded-lg">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="font-medium">{classData.className}</div>
                                                <div className="text-sm text-muted-foreground">{classData.studentCount} students</div>
                                            </div>
                                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-4">
                                                <div className="text-center">
                                                    <div className="text-lg font-semibold text-blue-600">{classData.averageGrade.toFixed(1)}</div>
                                                    <div className="text-sm text-muted-foreground">Average Grade</div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="text-lg font-semibold text-green-600">{classData.attendanceRate}%</div>
                                                    <div className="text-sm text-muted-foreground">Attendance Rate</div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="text-lg font-semibold text-purple-600">{classData.completionRate}%</div>
                                                    <div className="text-sm text-muted-foreground">Completion Rate</div>
                                                </div>
                                            </div>
                                            
                                            {/* Top Performers */}
                                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                <div>
                                                    <div className="font-medium mb-2 text-green-600">Top Performers</div>
                                                    <div className="space-y-1">
                                                        {classData.topPerformers.map((student, index) => (
                                                            <div key={index} className="flex items-center justify-between text-sm">
                                                                <span>{student.name}</span>
                                                                <Badge variant="default" className="bg-green-500">{student.grade.toFixed(1)}</Badge>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                
                                                {/* Struggling Students */}
                                                <div>
                                                    <div className="font-medium mb-2 text-red-600">Students Needing Support</div>
                                                    <div className="space-y-1">
                                                        {classData.strugglingStudents.map((student, index) => (
                                                            <div key={index} className="text-sm">
                                                                <div className="flex items-center justify-between">
                                                                    <span>{student.name}</span>
                                                                    <Badge variant="destructive">{student.grade.toFixed(1)}</Badge>
                                                                </div>
                                                                <div className="text-xs text-muted-foreground">
                                                                    {student.issues.join(', ')}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Recent Assessments */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BarChart3 className="h-5 w-5" />
                                    Recent Assessment Results
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {performance.recentAssessments.map((assessment) => (
                                        <div key={assessment.id} className="p-4 border rounded-lg">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-3">
                                                    {getAssessmentIcon(assessment.type)}
                                                    <div>
                                                        <div className="font-medium">{assessment.title}</div>
                                                        <div className="text-sm text-muted-foreground">
                                                            {assessment.class} • {assessment.date}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-medium">
                                                        {assessment.averageScore}/{assessment.maxScore}
                                                    </div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {((assessment.averageScore / assessment.maxScore) * 100).toFixed(1)}%
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                <div>
                                                    <div className="text-sm text-muted-foreground mb-1">Pass Rate</div>
                                                    <div className="text-lg font-semibold text-green-600">{assessment.passRate}%</div>
                                                </div>
                                                <div>
                                                    <div className="text-sm text-muted-foreground mb-1">Grade Distribution</div>
                                                    <div className="flex gap-1">
                                                        {assessment.distribution.map((dist, index) => (
                                                            <div key={index} className="text-center">
                                                                <div className="text-xs font-medium">{dist.grade}</div>
                                                                <div className="text-xs text-muted-foreground">{dist.count}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ) : (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-8">
                            <TrendingUp className="h-12 w-12 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-medium mb-2">Performance Data Not Available</h3>
                            <p className="text-sm text-muted-foreground text-center">
                                Performance analytics are not available. Please contact your school administrator.
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}


