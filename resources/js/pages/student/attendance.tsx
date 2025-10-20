import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle, TrendingUp } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Adesua', href: dashboard().url },
    { title: 'Student', href: '/student' },
    { title: 'Attendance', href: '/student/attendance' },
];

type AttendanceData = {
    currentMonth: {
        present: number;
        absent: number;
        late: number;
        total: number;
        percentage: number;
    };
    recentAttendance: {
        date: string;
        status: 'present' | 'absent' | 'late';
        time?: string;
        notes?: string;
    }[];
    monthlyStats: {
        month: string;
        present: number;
        absent: number;
        late: number;
        percentage: number;
    }[];
};

type StudentAttendanceProps = {
    attendance?: AttendanceData;
};

export default function StudentAttendance() {
    const { attendance } = usePage().props as unknown as StudentAttendanceProps;
    
    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'present': return <CheckCircle className="h-4 w-4 text-green-500" />;
            case 'absent': return <XCircle className="h-4 w-4 text-red-500" />;
            case 'late': return <AlertCircle className="h-4 w-4 text-yellow-500" />;
            default: return <Clock className="h-4 w-4 text-gray-500" />;
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'present': return <Badge variant="default" className="bg-green-500">Present</Badge>;
            case 'absent': return <Badge variant="destructive">Absent</Badge>;
            case 'late': return <Badge variant="secondary" className="bg-yellow-500">Late</Badge>;
            default: return <Badge variant="outline">Unknown</Badge>;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Student - Attendance" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Attendance Record</h1>
                    <Button variant="outline" size="sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        View Calendar
                    </Button>
                </div>

                {attendance ? (
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        {/* Current Month Stats */}
                        <div className="lg:col-span-3">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <TrendingUp className="h-5 w-5" />
                                        Current Month Overview
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-green-600">{attendance.currentMonth.present}</div>
                                            <div className="text-sm text-muted-foreground">Present</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-red-600">{attendance.currentMonth.absent}</div>
                                            <div className="text-sm text-muted-foreground">Absent</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-yellow-600">{attendance.currentMonth.late}</div>
                                            <div className="text-sm text-muted-foreground">Late</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold">{attendance.currentMonth.percentage}%</div>
                                            <div className="text-sm text-muted-foreground">Attendance Rate</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Recent Attendance */}
                        <div className="lg:col-span-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Clock className="h-5 w-5" />
                                        Recent Attendance
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {attendance.recentAttendance.length > 0 ? (
                                            attendance.recentAttendance.map((record, index) => (
                                                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                                    <div className="flex items-center gap-3">
                                                        {getStatusIcon(record.status)}
                                                        <div>
                                                            <div className="font-medium">{record.date}</div>
                                                            {record.time && (
                                                                <div className="text-sm text-muted-foreground">{record.time}</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        {getStatusBadge(record.status)}
                                                        {record.notes && (
                                                            <div className="text-sm text-muted-foreground max-w-xs truncate">
                                                                {record.notes}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-8 text-muted-foreground">
                                                No attendance records found
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Monthly Trends */}
                        <div>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Calendar className="h-5 w-5" />
                                        Monthly Trends
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {attendance.monthlyStats.map((month, index) => (
                                            <div key={index} className="p-3 border rounded-lg">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="font-medium">{month.month}</div>
                                                    <div className="text-sm font-medium">{month.percentage}%</div>
                                                </div>
                                                <div className="grid grid-cols-3 gap-2 text-xs">
                                                    <div className="text-center">
                                                        <div className="text-green-600 font-medium">{month.present}</div>
                                                        <div className="text-muted-foreground">Present</div>
                                                    </div>
                                                    <div className="text-center">
                                                        <div className="text-red-600 font-medium">{month.absent}</div>
                                                        <div className="text-muted-foreground">Absent</div>
                                                    </div>
                                                    <div className="text-center">
                                                        <div className="text-yellow-600 font-medium">{month.late}</div>
                                                        <div className="text-muted-foreground">Late</div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                ) : (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-8">
                            <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-medium mb-2">No Attendance Data</h3>
                            <p className="text-sm text-muted-foreground text-center">
                                Attendance records are not available. Please contact your school administrator.
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}


