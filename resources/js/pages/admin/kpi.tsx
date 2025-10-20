import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Users, GraduationCap, Building2, Target, BarChart3, Download } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Adesua', href: dashboard().url },
    { title: 'Admin', href: '/admin' },
    { title: 'KPIs', href: '/admin/kpi' },
];

type KPIData = {
    national: {
        grossEnrollmentRate: number;
        netEnrollmentRate: number;
        pupilTeacherRatio: number;
        completionRate: number;
        literacyRate: number;
    };
    regional: {
        region: string;
        enrollment: number;
        teachers: number;
        schools: number;
        compliance: number;
    }[];
    trends: {
        month: string;
        enrollment: number;
        teachers: number;
        schools: number;
    }[];
};

type AdminKPIProps = {
    kpi?: KPIData;
};

export default function AdminKPI() {
    const { kpi } = usePage().props as unknown as AdminKPIProps;
    
    const getComplianceBadge = (score: number) => {
        if (score >= 90) return <Badge variant="default" className="bg-green-500">Excellent</Badge>;
        if (score >= 80) return <Badge variant="default" className="bg-blue-500">Good</Badge>;
        if (score >= 70) return <Badge variant="secondary" className="bg-yellow-500">Fair</Badge>;
        return <Badge variant="destructive">Needs Improvement</Badge>;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin - KPIs" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Key Performance Indicators</h1>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <BarChart3 className="h-4 w-4 mr-2" />
                            View Charts
                        </Button>
                        <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Export Data
                        </Button>
                    </div>
                </div>

                {kpi ? (
                    <div className="grid grid-cols-1 gap-6">
                        {/* National KPIs */}
                        <div>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Target className="h-5 w-5" />
                                        National Education KPIs
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
                                        <div className="text-center p-4 border rounded-lg">
                                            <div className="text-2xl font-bold text-blue-600">{kpi.national.grossEnrollmentRate}%</div>
                                            <div className="text-sm text-muted-foreground">Gross Enrollment Rate</div>
                                            <div className="text-xs text-muted-foreground mt-1">GER</div>
                                        </div>
                                        <div className="text-center p-4 border rounded-lg">
                                            <div className="text-2xl font-bold text-green-600">{kpi.national.netEnrollmentRate}%</div>
                                            <div className="text-sm text-muted-foreground">Net Enrollment Rate</div>
                                            <div className="text-xs text-muted-foreground mt-1">NER</div>
                                        </div>
                                        <div className="text-center p-4 border rounded-lg">
                                            <div className="text-2xl font-bold text-purple-600">{kpi.national.pupilTeacherRatio}</div>
                                            <div className="text-sm text-muted-foreground">Pupil-Teacher Ratio</div>
                                            <div className="text-xs text-muted-foreground mt-1">PTR</div>
                                        </div>
                                        <div className="text-center p-4 border rounded-lg">
                                            <div className="text-2xl font-bold text-orange-600">{kpi.national.completionRate}%</div>
                                            <div className="text-sm text-muted-foreground">Completion Rate</div>
                                            <div className="text-xs text-muted-foreground mt-1">CR</div>
                                        </div>
                                        <div className="text-center p-4 border rounded-lg">
                                            <div className="text-2xl font-bold text-red-600">{kpi.national.literacyRate}%</div>
                                            <div className="text-sm text-muted-foreground">Literacy Rate</div>
                                            <div className="text-xs text-muted-foreground mt-1">LR</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Regional Performance */}
                        <div>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Building2 className="h-5 w-5" />
                                        Regional Performance
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                        {kpi.regional.map((region, index) => (
                                            <div key={index} className="p-4 border rounded-lg">
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="font-medium">{region.region}</div>
                                                    {getComplianceBadge(region.compliance)}
                                                </div>
                                                <div className="grid grid-cols-2 gap-2 text-sm">
                                                    <div>
                                                        <div className="text-muted-foreground">Enrollment</div>
                                                        <div className="font-medium">{region.enrollment.toLocaleString()}</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-muted-foreground">Teachers</div>
                                                        <div className="font-medium">{region.teachers.toLocaleString()}</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-muted-foreground">Schools</div>
                                                        <div className="font-medium">{region.schools}</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-muted-foreground">Compliance</div>
                                                        <div className="font-medium">{region.compliance}%</div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Trends */}
                        <div>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <TrendingUp className="h-5 w-5" />
                                        Monthly Trends
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {kpi.trends.map((trend, index) => (
                                            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                                <div className="font-medium">{trend.month}</div>
                                                <div className="flex items-center gap-6 text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <Users className="h-4 w-4 text-blue-500" />
                                                        <span className="text-muted-foreground">Enrollment:</span>
                                                        <span className="font-medium">{trend.enrollment.toLocaleString()}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <GraduationCap className="h-4 w-4 text-green-500" />
                                                        <span className="text-muted-foreground">Teachers:</span>
                                                        <span className="font-medium">{trend.teachers.toLocaleString()}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Building2 className="h-4 w-4 text-purple-500" />
                                                        <span className="text-muted-foreground">Schools:</span>
                                                        <span className="font-medium">{trend.schools}</span>
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
                            <BarChart3 className="h-12 w-12 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-medium mb-2">KPI Data Not Available</h3>
                            <p className="text-sm text-muted-foreground text-center">
                                Key performance indicator data is not available. Please contact the system administrator.
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}


