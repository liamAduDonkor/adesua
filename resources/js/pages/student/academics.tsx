import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, GraduationCap, Award, TrendingUp, Calendar, Download, FileText } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Adesua', href: dashboard().url },
    { title: 'Student', href: '/student' },
    { title: 'Academics', href: '/student/academics' },
];

type Course = {
    id: number;
    name: string;
    code: string;
    teacher: string;
    credits: number;
    grade?: string;
    gpa?: number;
    status: 'enrolled' | 'completed' | 'dropped';
};

type Assessment = {
    id: number;
    title: string;
    type: 'exam' | 'assignment' | 'project' | 'quiz';
    course: string;
    date: string;
    score?: number;
    maxScore: number;
    status: 'upcoming' | 'completed' | 'graded';
};

type AcademicData = {
    currentGPA: number;
    totalCredits: number;
    completedCredits: number;
    courses: Course[];
    assessments: Assessment[];
    academicYear: string;
    semester: string;
};

type StudentAcademicsProps = {
    academics?: AcademicData;
};

export default function StudentAcademics() {
    const { academics } = usePage().props as unknown as StudentAcademicsProps;
    
    const getGradeBadge = (grade?: string) => {
        if (!grade) return <Badge variant="outline">No Grade</Badge>;
        
        const gradeNum = parseFloat(grade);
        if (gradeNum >= 3.7) return <Badge variant="default" className="bg-green-500">A</Badge>;
        if (gradeNum >= 3.3) return <Badge variant="default" className="bg-blue-500">A-</Badge>;
        if (gradeNum >= 3.0) return <Badge variant="default" className="bg-blue-400">B+</Badge>;
        if (gradeNum >= 2.7) return <Badge variant="secondary" className="bg-yellow-500">B</Badge>;
        if (gradeNum >= 2.3) return <Badge variant="secondary" className="bg-orange-500">B-</Badge>;
        if (gradeNum >= 2.0) return <Badge variant="secondary" className="bg-red-400">C+</Badge>;
        return <Badge variant="destructive">C</Badge>;
    };

    const getAssessmentBadge = (status: string) => {
        switch (status) {
            case 'completed': return <Badge variant="default" className="bg-green-500">Completed</Badge>;
            case 'graded': return <Badge variant="default" className="bg-blue-500">Graded</Badge>;
            case 'upcoming': return <Badge variant="secondary" className="bg-yellow-500">Upcoming</Badge>;
            default: return <Badge variant="outline">Unknown</Badge>;
        }
    };

    const getAssessmentIcon = (type: string) => {
        switch (type) {
            case 'exam': return <FileText className="h-4 w-4 text-red-500" />;
            case 'assignment': return <BookOpen className="h-4 w-4 text-blue-500" />;
            case 'project': return <Award className="h-4 w-4 text-purple-500" />;
            case 'quiz': return <GraduationCap className="h-4 w-4 text-green-500" />;
            default: return <FileText className="h-4 w-4 text-gray-500" />;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Student - Academics" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Academic Performance</h1>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Export Report
                        </Button>
                        <Button variant="outline" size="sm">
                            <Calendar className="h-4 w-4 mr-2" />
                            Academic Calendar
                        </Button>
                    </div>
                </div>

                {academics ? (
                    <div className="grid grid-cols-1 gap-6">
                        {/* Academic Overview */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                            <Card>
                                <CardContent className="p-4">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-blue-600">{academics.currentGPA.toFixed(2)}</div>
                                        <div className="text-sm text-muted-foreground">Current GPA</div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-4">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-green-600">{academics.completedCredits}</div>
                                        <div className="text-sm text-muted-foreground">Completed Credits</div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-4">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-purple-600">{academics.totalCredits}</div>
                                        <div className="text-sm text-muted-foreground">Total Credits</div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-4">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-orange-600">{academics.courses.length}</div>
                                        <div className="text-sm text-muted-foreground">Active Courses</div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Current Courses */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BookOpen className="h-5 w-5" />
                                    Current Courses ({academics.academicYear} - {academics.semester})
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {academics.courses.length > 0 ? (
                                        academics.courses.map((course) => (
                                            <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                                                <div className="flex items-center gap-4">
                                                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                                        <BookOpen className="h-5 w-5 text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium">{course.name}</div>
                                                        <div className="text-sm text-muted-foreground">
                                                            {course.code} • {course.teacher} • {course.credits} credits
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    {course.grade && (
                                                        <div className="text-right">
                                                            <div className="font-medium">{course.grade}</div>
                                                            <div className="text-sm text-muted-foreground">GPA: {course.gpa?.toFixed(2)}</div>
                                                        </div>
                                                    )}
                                                    {getGradeBadge(course.grade)}
                                                    <Badge variant={course.status === 'enrolled' ? 'default' : 'secondary'}>
                                                        {course.status}
                                                    </Badge>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-8 text-muted-foreground">
                                            No courses enrolled for this semester
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Recent Assessments */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Award className="h-5 w-5" />
                                    Recent Assessments
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {academics.assessments.length > 0 ? (
                                        academics.assessments.map((assessment) => (
                                            <div key={assessment.id} className="flex items-center justify-between p-4 border rounded-lg">
                                                <div className="flex items-center gap-4">
                                                    {getAssessmentIcon(assessment.type)}
                                                    <div>
                                                        <div className="font-medium">{assessment.title}</div>
                                                        <div className="text-sm text-muted-foreground">
                                                            {assessment.course} • {assessment.date}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    {assessment.score !== undefined && (
                                                        <div className="text-right">
                                                            <div className="font-medium">
                                                                {assessment.score}/{assessment.maxScore}
                                                            </div>
                                                            <div className="text-sm text-muted-foreground">
                                                                {((assessment.score / assessment.maxScore) * 100).toFixed(1)}%
                                                            </div>
                                                        </div>
                                                    )}
                                                    {getAssessmentBadge(assessment.status)}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-8 text-muted-foreground">
                                            No assessments available
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ) : (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-8">
                            <GraduationCap className="h-12 w-12 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-medium mb-2">Academic Data Not Available</h3>
                            <p className="text-sm text-muted-foreground text-center">
                                Your academic information is not available. Please contact your school administrator.
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}


