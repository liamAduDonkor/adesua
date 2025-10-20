import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, Users, CheckCircle, XCircle, Clock, Search } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Adesua', href: dashboard().url },
    { title: 'Teacher', href: '/teacher' },
    { title: 'Attendance', href: '/teacher/attendance' },
];

type Student = {
    id: number;
    name: string;
    student_id: string;
    class: string;
    status: 'present' | 'absent' | 'late' | 'excused';
    time?: string;
    notes?: string;
};

type AttendanceData = {
    date: string;
    class: string;
    students: Student[];
    summary: {
        present: number;
        absent: number;
        late: number;
        excused: number;
        total: number;
    };
};

type TeacherAttendanceProps = {
    attendance?: AttendanceData;
};

export default function TeacherAttendance() {
    const { attendance } = usePage().props as unknown as TeacherAttendanceProps;
    
    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'present': return <CheckCircle className="h-4 w-4 text-green-500" />;
            case 'absent': return <XCircle className="h-4 w-4 text-red-500" />;
            case 'late': return <Clock className="h-4 w-4 text-yellow-500" />;
            case 'excused': return <CheckCircle className="h-4 w-4 text-blue-500" />;
            default: return <Clock className="h-4 w-4 text-gray-500" />;
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'present': return <Badge variant="default" className="bg-green-500">Present</Badge>;
            case 'absent': return <Badge variant="destructive">Absent</Badge>;
            case 'late': return <Badge variant="secondary" className="bg-yellow-500">Late</Badge>;
            case 'excused': return <Badge variant="outline" className="bg-blue-500">Excused</Badge>;
            default: return <Badge variant="outline">Unknown</Badge>;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Teacher - Attendance" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Class Attendance</h1>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <Calendar className="h-4 w-4 mr-2" />
                            View Calendar
                        </Button>
                        <Button size="sm">
                            Save Attendance
                        </Button>
                    </div>
                </div>

                {attendance ? (
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
                        {/* Summary Cards */}
                        <div className="lg:col-span-4">
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                <Card>
                                    <CardContent className="p-4">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                            <div>
                                                <div className="text-2xl font-bold text-green-600">{attendance.summary.present}</div>
                                                <div className="text-sm text-muted-foreground">Present</div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="p-4">
                                        <div className="flex items-center gap-2">
                                            <XCircle className="h-4 w-4 text-red-500" />
                                            <div>
                                                <div className="text-2xl font-bold text-red-600">{attendance.summary.absent}</div>
                                                <div className="text-sm text-muted-foreground">Absent</div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="p-4">
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-yellow-500" />
                                            <div>
                                                <div className="text-2xl font-bold text-yellow-600">{attendance.summary.late}</div>
                                                <div className="text-sm text-muted-foreground">Late</div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="p-4">
                                        <div className="flex items-center gap-2">
                                            <Users className="h-4 w-4 text-blue-500" />
                                            <div>
                                                <div className="text-2xl font-bold">{attendance.summary.total}</div>
                                                <div className="text-sm text-muted-foreground">Total</div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        {/* Class Info */}
                        <div className="lg:col-span-1">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Calendar className="h-5 w-5" />
                                        Class Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div>
                                        <div className="text-sm text-muted-foreground">Date</div>
                                        <div className="font-medium">{attendance.date}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-muted-foreground">Class</div>
                                        <div className="font-medium">{attendance.class}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-muted-foreground">Attendance Rate</div>
                                        <div className="font-medium">
                                            {Math.round((attendance.summary.present / attendance.summary.total) * 100)}%
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Student List */}
                        <div className="lg:col-span-3">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Users className="h-5 w-5" />
                                        Student Attendance
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="mb-4">
                                        <div className="relative">
                                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                placeholder="Search students..."
                                                className="pl-8"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        {attendance.students.map((student) => (
                                            <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                                                <div className="flex items-center gap-3">
                                                    {getStatusIcon(student.status)}
                                                    <div>
                                                        <div className="font-medium">{student.name}</div>
                                                        <div className="text-sm text-muted-foreground">
                                                            ID: {student.student_id} | {student.class}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {student.time && (
                                                        <div className="text-sm text-muted-foreground">{student.time}</div>
                                                    )}
                                                    {getStatusBadge(student.status)}
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
                            <h3 className="text-lg font-medium mb-2">No Class Data</h3>
                            <p className="text-sm text-muted-foreground text-center">
                                Class attendance data is not available. Please select a class and date.
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}


