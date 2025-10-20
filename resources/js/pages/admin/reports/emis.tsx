import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
    Building2, 
    Users, 
    GraduationCap,
    BarChart3,
    TrendingUp,
    Download,
    ArrowLeft,
    Calendar,
    FileSpreadsheet,
    AlertCircle
} from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Admin', href: '/admin' },
    { label: 'Reports', href: '/admin/reports' },
    { label: 'EMIS Report' }
];

type EMISData = {
    year: number;
    schools: number;
    students: number;
    teachers: number;
    byRegion: Array<{ region: string; student_count: number }>;
    byLevel: Array<{ class: string; count: number }>;
    infrastructure: {
        totalClassrooms: number;
        totalLibraries: number;
        totalLabs: number;
        totalComputerLabs: number;
    };
};

type AdminEMISProps = {
    data: EMISData;
};

export default function AdminEMISReport() {
    const { data } = usePage().props as unknown as AdminEMISProps;
    const [selectedYear, setSelectedYear] = useState(data.year.toString());

    const handleYearChange = (year: string) => {
        setSelectedYear(year);
        router.get(route('admin.reports.emis'), { year }, { preserveState: true });
    };

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin - EMIS Report" />
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">EMIS Report</h1>
                        <p className="text-muted-foreground">
                            Education Management Information System - Annual School Census
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Select value={selectedYear} onValueChange={handleYearChange}>
                            <SelectTrigger className="w-[120px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="2024">2024</SelectItem>
                                <SelectItem value="2023">2023</SelectItem>
                                <SelectItem value="2022">2022</SelectItem>
                            </SelectContent>
                        </Select>
                        <Link href={route('admin.reports.index')}>
                            <Button variant="outline">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Reports
                            </Button>
                        </Link>
                        <Button>
                            <Download className="h-4 w-4 mr-2" />
                            Export PDF
                        </Button>
                    </div>
                </div>

                {/* Summary Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2">
                                <Building2 className="h-4 w-4 text-blue-500" />
                                <div>
                                    <div className="text-2xl font-bold text-blue-600">{data.schools}</div>
                                    <div className="text-sm text-muted-foreground">Total Schools</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-green-500" />
                                <div>
                                    <div className="text-2xl font-bold text-green-600">{data.students.toLocaleString()}</div>
                                    <div className="text-sm text-muted-foreground">Total Students</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2">
                                <GraduationCap className="h-4 w-4 text-purple-500" />
                                <div>
                                    <div className="text-2xl font-bold text-purple-600">{data.teachers.toLocaleString()}</div>
                                    <div className="text-sm text-muted-foreground">Total Teachers</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2">
                                <BarChart3 className="h-4 w-4 text-orange-500" />
                                <div>
                                    <div className="text-2xl font-bold text-orange-600">
                                        {(data.students / data.teachers).toFixed(1)}
                                    </div>
                                    <div className="text-sm text-muted-foreground">Student-Teacher Ratio</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Students by Region */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BarChart3 className="h-5 w-5" />
                            Students by Region
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {data.byRegion.map((region, index) => (
                                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                    <div className="font-medium">{region.region}</div>
                                    <div className="flex items-center gap-2">
                                        <div className="text-sm text-muted-foreground">
                                            {region.student_count.toLocaleString()} students
                                        </div>
                                        <Badge variant="outline">
                                            {((region.student_count / data.students) * 100).toFixed(1)}%
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Students by Level */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <GraduationCap className="h-5 w-5" />
                            Students by Level
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {data.byLevel.map((level, index) => (
                                <div key={index} className="text-center p-4 border rounded-lg">
                                    <div className="text-2xl font-bold">{level.count.toLocaleString()}</div>
                                    <div className="text-sm text-muted-foreground">{level.class}</div>
                                    <div className="text-xs text-muted-foreground mt-1">
                                        {((level.count / data.students) * 100).toFixed(1)}% of total
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Infrastructure */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Building2 className="h-5 w-5" />
                            Infrastructure Summary
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="text-center p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                                <div className="text-2xl font-bold text-blue-600">{data.infrastructure.totalClassrooms}</div>
                                <div className="text-sm text-muted-foreground">Total Classrooms</div>
                            </div>
                            <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                                <div className="text-2xl font-bold text-green-600">{data.infrastructure.totalLibraries}</div>
                                <div className="text-sm text-muted-foreground">Libraries</div>
                            </div>
                            <div className="text-center p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                                <div className="text-2xl font-bold text-purple-600">{data.infrastructure.totalLabs}</div>
                                <div className="text-sm text-muted-foreground">Science Labs</div>
                            </div>
                            <div className="text-center p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                                <div className="text-2xl font-bold text-orange-600">{data.infrastructure.totalComputerLabs}</div>
                                <div className="text-sm text-muted-foreground">Computer Labs</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Key Metrics */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5" />
                            Key Education Metrics
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center p-4 border rounded-lg">
                                <div className="text-3xl font-bold text-blue-600">95.2%</div>
                                <div className="text-sm text-muted-foreground">Gross Enrollment Rate (GER)</div>
                                <div className="text-xs text-muted-foreground mt-1">Target: 95%</div>
                            </div>
                            <div className="text-center p-4 border rounded-lg">
                                <div className="text-3xl font-bold text-green-600">87.8%</div>
                                <div className="text-sm text-muted-foreground">Net Enrollment Rate (NER)</div>
                                <div className="text-xs text-muted-foreground mt-1">Target: 90%</div>
                            </div>
                            <div className="text-center p-4 border rounded-lg">
                                <div className="text-3xl font-bold text-purple-600">78.5%</div>
                                <div className="text-sm text-muted-foreground">Completion Rate</div>
                                <div className="text-xs text-muted-foreground mt-1">Target: 85%</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppSidebarLayout>
    );
}
