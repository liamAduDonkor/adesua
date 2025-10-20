import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

type AttendanceData = {
    date: string;
    present: boolean;
    status?: 'present' | 'absent' | 'late' | 'excused';
};

type AttendanceChartProps = {
    data: AttendanceData[];
    title?: string;
};

const statusColors = {
    present: 'bg-green-500',
    absent: 'bg-red-500',
    late: 'bg-yellow-500',
    excused: 'bg-blue-500',
};

const statusLabels = {
    present: 'Present',
    absent: 'Absent',
    late: 'Late',
    excused: 'Excused',
};

export function AttendanceChart({ data, title = 'Attendance Overview' }: AttendanceChartProps) {
    // Group by month for display
    const groupedData = data.reduce((acc, item) => {
        const month = new Date(item.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        if (!acc[month]) {
            acc[month] = [];
        }
        acc[month].push(item);
        return acc;
    }, {} as Record<string, AttendanceData[]>);

    // Calculate stats
    const totalDays = data.length;
    const presentDays = data.filter(d => d.status === 'present').length;
    const absentDays = data.filter(d => d.status === 'absent').length;
    const lateDays = data.filter(d => d.status === 'late').length;
    const attendanceRate = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {/* Stats Summary */}
                <div className="grid grid-cols-2 gap-4 mb-6 md:grid-cols-4">
                    <div className="rounded-lg border p-3">
                        <div className="text-2xl font-bold text-green-500">{attendanceRate}%</div>
                        <div className="text-xs text-muted-foreground">Attendance Rate</div>
                    </div>
                    <div className="rounded-lg border p-3">
                        <div className="text-2xl font-bold">{presentDays}</div>
                        <div className="text-xs text-muted-foreground">Present Days</div>
                    </div>
                    <div className="rounded-lg border p-3">
                        <div className="text-2xl font-bold text-red-500">{absentDays}</div>
                        <div className="text-xs text-muted-foreground">Absent Days</div>
                    </div>
                    <div className="rounded-lg border p-3">
                        <div className="text-2xl font-bold text-yellow-500">{lateDays}</div>
                        <div className="text-xs text-muted-foreground">Late Days</div>
                    </div>
                </div>

                {/* Calendar Grid */}
                <div className="space-y-4">
                    {Object.entries(groupedData).map(([month, days]) => (
                        <div key={month}>
                            <h4 className="text-sm font-medium mb-2">{month}</h4>
                            <div className="flex flex-wrap gap-1">
                                {days.map((day, idx) => (
                                    <div
                                        key={idx}
                                        className={`h-8 w-8 rounded flex items-center justify-center text-xs ${
                                            day.status ? statusColors[day.status] : 'bg-gray-200 dark:bg-gray-700'
                                        } text-white`}
                                        title={`${day.date} - ${day.status ? statusLabels[day.status] : 'Unknown'}`}
                                    >
                                        {new Date(day.date).getDate()}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t">
                    {Object.entries(statusLabels).map(([key, label]) => (
                        <div key={key} className="flex items-center gap-2">
                            <div className={`h-4 w-4 rounded ${statusColors[key as keyof typeof statusColors]}`} />
                            <span className="text-sm text-muted-foreground">{label}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
