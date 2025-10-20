import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, School, Calendar, TrendingUp, AlertCircle, CheckCircle, Clock, Plus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Adesua', href: dashboard().url },
    { title: 'Parent', href: '/parent' },
    { title: 'Children', href: '/parent/children' },
];

type Child = {
    id: number;
    name: string;
    studentId: string;
    class: string;
    school: string;
    enrollmentDate: string;
    status: 'active' | 'inactive' | 'suspended';
    attendanceRate: number;
    recentGrades: {
        subject: string;
        grade: string;
        date: string;
    }[];
    alerts: {
        type: 'attendance' | 'academic' | 'behavioral' | 'financial';
        message: string;
        date: string;
        severity: 'low' | 'medium' | 'high';
    }[];
};

type ParentChildrenProps = {
    children?: Child[];
};

export default function ParentChildren() {
    const { children } = usePage().props as unknown as ParentChildrenProps;
    
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'active': return <Badge variant="default" className="bg-green-500">Active</Badge>;
            case 'inactive': return <Badge variant="secondary">Inactive</Badge>;
            case 'suspended': return <Badge variant="destructive">Suspended</Badge>;
            default: return <Badge variant="outline">Unknown</Badge>;
        }
    };

    const getAlertIcon = (type: string) => {
        switch (type) {
            case 'attendance': return <Calendar className="h-4 w-4 text-yellow-500" />;
            case 'academic': return <TrendingUp className="h-4 w-4 text-blue-500" />;
            case 'behavioral': return <AlertCircle className="h-4 w-4 text-red-500" />;
            case 'financial': return <AlertCircle className="h-4 w-4 text-orange-500" />;
            default: return <AlertCircle className="h-4 w-4 text-gray-500" />;
        }
    };

    const getAlertBadge = (severity: string) => {
        switch (severity) {
            case 'high': return <Badge variant="destructive">High</Badge>;
            case 'medium': return <Badge variant="secondary" className="bg-yellow-500">Medium</Badge>;
            case 'low': return <Badge variant="outline">Low</Badge>;
            default: return <Badge variant="outline">Unknown</Badge>;
        }
    };

    const getGradeBadge = (grade: string) => {
        const gradeNum = parseFloat(grade);
        if (gradeNum >= 3.7) return <Badge variant="default" className="bg-green-500">A</Badge>;
        if (gradeNum >= 3.3) return <Badge variant="default" className="bg-blue-500">A-</Badge>;
        if (gradeNum >= 3.0) return <Badge variant="default" className="bg-blue-400">B+</Badge>;
        if (gradeNum >= 2.7) return <Badge variant="secondary" className="bg-yellow-500">B</Badge>;
        if (gradeNum >= 2.3) return <Badge variant="secondary" className="bg-orange-500">B-</Badge>;
        if (gradeNum >= 2.0) return <Badge variant="secondary" className="bg-red-400">C+</Badge>;
        return <Badge variant="destructive">C</Badge>;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Parent - Children" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">My Children</h1>
                    <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Link Child
                    </Button>
                </div>

                {children && children.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6">
                        {children.map((child) => (
                            <Card key={child.id}>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="flex items-center gap-2">
                                            <User className="h-5 w-5" />
                                            {child.name}
                                        </CardTitle>
                                        {getStatusBadge(child.status)}
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                                        {/* Basic Info */}
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3">
                                                <School className="h-4 w-4 text-muted-foreground" />
                                                <div>
                                                    <div className="font-medium">{child.school}</div>
                                                    <div className="text-sm text-muted-foreground">School</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                                <div>
                                                    <div className="font-medium">{child.class}</div>
                                                    <div className="text-sm text-muted-foreground">Class</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="h-4 w-4 text-muted-foreground">#</div>
                                                <div>
                                                    <div className="font-medium">{child.studentId}</div>
                                                    <div className="text-sm text-muted-foreground">Student ID</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Recent Grades */}
                                        <div>
                                            <div className="font-medium mb-3">Recent Grades</div>
                                            <div className="space-y-2">
                                                {child.recentGrades.length > 0 ? (
                                                    child.recentGrades.map((grade, index) => (
                                                        <div key={index} className="flex items-center justify-between p-2 border rounded">
                                                            <div>
                                                                <div className="font-medium text-sm">{grade.subject}</div>
                                                                <div className="text-xs text-muted-foreground">{grade.date}</div>
                                                            </div>
                                                            {getGradeBadge(grade.grade)}
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="text-sm text-muted-foreground">No recent grades</div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Alerts */}
                                        <div>
                                            <div className="font-medium mb-3">Recent Alerts</div>
                                            <div className="space-y-2">
                                                {child.alerts.length > 0 ? (
                                                    child.alerts.slice(0, 3).map((alert, index) => (
                                                        <div key={index} className="flex items-start gap-2 p-2 border rounded">
                                                            {getAlertIcon(alert.type)}
                                                            <div className="flex-1">
                                                                <div className="text-sm font-medium">{alert.message}</div>
                                                                <div className="text-xs text-muted-foreground">{alert.date}</div>
                                                            </div>
                                                            {getAlertBadge(alert.severity)}
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="text-sm text-muted-foreground">No recent alerts</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Attendance Rate */}
                                    <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-blue-600" />
                                                <span className="font-medium">Attendance Rate</span>
                                            </div>
                                            <div className="text-lg font-bold text-blue-600">{child.attendanceRate}%</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-8">
                            <User className="h-12 w-12 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-medium mb-2">No Children Linked</h3>
                            <p className="text-sm text-muted-foreground text-center mb-4">
                                You haven't linked any children to your account yet. Contact your school to link your children's accounts.
                            </p>
                            <Button>
                                <Plus className="h-4 w-4 mr-2" />
                                Link Child Account
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}


