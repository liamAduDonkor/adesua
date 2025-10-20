import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building2, Users, GraduationCap, TrendingUp, AlertCircle, CheckCircle, DollarSign, Calendar } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Adesua', href: dashboard().url },
    { title: 'School', href: '/school' },
    { title: 'Dashboard', href: '/school/dashboard' },
];

type SchoolStats = {
    totalStudents: number;
    totalTeachers: number;
    totalClasses: number;
    attendanceRate: number;
    complianceScore: number;
    budgetUtilization: number;
    recentEnrollments: number;
    pendingApprovals: number;
};

type Alert = {
    id: number;
    type: 'attendance' | 'compliance' | 'financial' | 'academic' | 'safety';
    title: string;
    message: string;
    severity: 'low' | 'medium' | 'high';
    date: string;
    status: 'new' | 'acknowledged' | 'resolved';
};

type RecentActivity = {
    id: number;
    type: 'enrollment' | 'attendance' | 'payment' | 'report' | 'alert';
    description: string;
    user: string;
    date: string;
    status: 'completed' | 'pending' | 'failed';
};

type SchoolDashboardData = {
    stats: SchoolStats;
    alerts: Alert[];
    recentActivity: RecentActivity[];
    complianceStatus: {
        category: string;
        score: number;
        status: 'compliant' | 'warning' | 'non-compliant';
        lastChecked: string;
    }[];
};

type SchoolDashboardProps = {
    dashboard?: SchoolDashboardData;
};

export default function SchoolDashboard() {
    const { dashboard: data } = usePage().props as unknown as SchoolDashboardProps;
    
    const getAlertIcon = (type: string) => {
        switch (type) {
            case 'attendance': return <Calendar className="h-4 w-4 text-yellow-500" />;
            case 'compliance': return <CheckCircle className="h-4 w-4 text-blue-500" />;
            case 'financial': return <DollarSign className="h-4 w-4 text-green-500" />;
            case 'academic': return <GraduationCap className="h-4 w-4 text-purple-500" />;
            case 'safety': return <AlertCircle className="h-4 w-4 text-red-500" />;
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

    const getComplianceBadge = (status: string) => {
        switch (status) {
            case 'compliant': return <Badge variant="default" className="bg-green-500">Compliant</Badge>;
            case 'warning': return <Badge variant="secondary" className="bg-yellow-500">Warning</Badge>;
            case 'non-compliant': return <Badge variant="destructive">Non-Compliant</Badge>;
            default: return <Badge variant="outline">Unknown</Badge>;
        }
    };

    const getActivityIcon = (type: string) => {
        switch (type) {
            case 'enrollment': return <Users className="h-4 w-4 text-blue-500" />;
            case 'attendance': return <Calendar className="h-4 w-4 text-green-500" />;
            case 'payment': return <DollarSign className="h-4 w-4 text-purple-500" />;
            case 'report': return <TrendingUp className="h-4 w-4 text-orange-500" />;
            case 'alert': return <AlertCircle className="h-4 w-4 text-red-500" />;
            default: return <AlertCircle className="h-4 w-4 text-gray-500" />;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="School - Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">School Dashboard</h1>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <TrendingUp className="h-4 w-4 mr-2" />
                            Generate Report
                        </Button>
                        <Button variant="outline" size="sm">
                            <Calendar className="h-4 w-4 mr-2" />
                            View Calendar
                        </Button>
                    </div>
                </div>

                {data ? (
                    <div className="grid grid-cols-1 gap-6">
                        {/* Key Metrics */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <Card>
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-2">
                                        <Users className="h-4 w-4 text-blue-500" />
                                        <div>
                                            <div className="text-2xl font-bold text-blue-600">{data.stats.totalStudents}</div>
                                            <div className="text-sm text-muted-foreground">Total Students</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-2">
                                        <GraduationCap className="h-4 w-4 text-green-500" />
                                        <div>
                                            <div className="text-2xl font-bold text-green-600">{data.stats.totalTeachers}</div>
                                            <div className="text-sm text-muted-foreground">Total Teachers</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4 text-purple-500" />
                                        <div>
                                            <div className="text-2xl font-bold text-purple-600">{data.stats.attendanceRate}%</div>
                                            <div className="text-sm text-muted-foreground">Attendance Rate</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-2">
                                        <Building2 className="h-4 w-4 text-orange-500" />
                                        <div>
                                            <div className="text-2xl font-bold text-orange-600">{data.stats.complianceScore}%</div>
                                            <div className="text-sm text-muted-foreground">Compliance Score</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                            {/* Recent Alerts */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <AlertCircle className="h-5 w-5" />
                                        Recent Alerts
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {data.alerts.length > 0 ? (
                                            data.alerts.slice(0, 5).map((alert) => (
                                                <div key={alert.id} className="flex items-start gap-3 p-3 border rounded-lg">
                                                    {getAlertIcon(alert.type)}
                                                    <div className="flex-1">
                                                        <div className="font-medium text-sm">{alert.title}</div>
                                                        <div className="text-xs text-muted-foreground">{alert.message}</div>
                                                        <div className="text-xs text-muted-foreground mt-1">{alert.date}</div>
                                                    </div>
                                                    {getAlertBadge(alert.severity)}
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-4 text-muted-foreground">
                                                No recent alerts
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Compliance Status */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <CheckCircle className="h-5 w-5" />
                                        Compliance Status
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {data.complianceStatus.map((item, index) => (
                                            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                                <div>
                                                    <div className="font-medium text-sm">{item.category}</div>
                                                    <div className="text-xs text-muted-foreground">
                                                        Last checked: {item.lastChecked}
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-sm font-medium">{item.score}%</div>
                                                    {getComplianceBadge(item.status)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Recent Activity */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <TrendingUp className="h-5 w-5" />
                                        Recent Activity
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {data.recentActivity.map((activity) => (
                                            <div key={activity.id} className="flex items-center gap-3 p-3 border rounded-lg">
                                                {getActivityIcon(activity.type)}
                                                <div className="flex-1">
                                                    <div className="font-medium text-sm">{activity.description}</div>
                                                    <div className="text-xs text-muted-foreground">
                                                        {activity.user} • {activity.date}
                                                    </div>
                                                </div>
                                                <Badge variant={activity.status === 'completed' ? 'default' : 'secondary'}>
                                                    {activity.status}
                                                </Badge>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Additional Stats */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <Card>
                                <CardContent className="p-4">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-green-600">{data.stats.budgetUtilization}%</div>
                                        <div className="text-sm text-muted-foreground">Budget Utilization</div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-4">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-blue-600">{data.stats.recentEnrollments}</div>
                                        <div className="text-sm text-muted-foreground">Recent Enrollments</div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-4">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-orange-600">{data.stats.pendingApprovals}</div>
                                        <div className="text-sm text-muted-foreground">Pending Approvals</div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                ) : (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-8">
                            <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-medium mb-2">Dashboard Data Not Available</h3>
                            <p className="text-sm text-muted-foreground text-center">
                                School dashboard information is not available. Please contact your system administrator.
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}


