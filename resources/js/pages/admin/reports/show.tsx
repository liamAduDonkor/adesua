import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
    FileText, 
    Download, 
    Calendar, 
    BarChart3, 
    TrendingUp, 
    Users, 
    Building2, 
    GraduationCap,
    Clock,
    CheckCircle,
    AlertCircle,
    Share,
    ArrowLeft,
    FileSpreadsheet,
    FileText as FilePdf,
    FileText as FileCsv,
    RefreshCw
} from 'lucide-react';

type Report = {
    id: number;
    title: string;
    type: string;
    description: string;
    status: string;
    created_at: string;
    author_id: number;
    filters: any;
    schedule: any;
    recipients: any;
};

type ReportData = {
    summary?: any;
    byRegion?: any[];
    kpis?: any;
    performance?: any;
    compliance?: any;
    financial?: any;
    enrollment?: any;
};

type AdminReportsShowProps = {
    report: Report;
    reportData: ReportData;
};

export default function AdminReportsShow() {
    const { report, reportData } = usePage().props as unknown as AdminReportsShowProps;

    const breadcrumbs: BreadcrumbItem[] = [
        { label: 'Admin', href: '/admin' },
        { label: 'Reports', href: '/admin/reports' },
        { label: report.title }
    ];

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'completed': return <Badge variant="default" className="bg-green-500">Completed</Badge>;
            case 'generating': return <Badge variant="secondary" className="bg-yellow-500">Generating</Badge>;
            case 'failed': return <Badge variant="destructive">Failed</Badge>;
            case 'scheduled': return <Badge variant="outline">Scheduled</Badge>;
            default: return <Badge variant="outline">Unknown</Badge>;
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'national': return <Building2 className="h-5 w-5 text-blue-500" />;
            case 'regional': return <BarChart3 className="h-5 w-5 text-green-500" />;
            case 'school': return <GraduationCap className="h-5 w-5 text-purple-500" />;
            case 'compliance': return <CheckCircle className="h-5 w-5 text-orange-500" />;
            case 'performance': return <TrendingUp className="h-5 w-5 text-red-500" />;
            case 'financial': return <FileText className="h-5 w-5 text-yellow-500" />;
            case 'enrollment': return <Users className="h-5 w-5 text-indigo-500" />;
            default: return <FileText className="h-5 w-5 text-gray-500" />;
        }
    };

    const renderReportData = () => {
        if (!reportData) return null;

        switch (report.type) {
            case 'national':
                return (
                    <div className="space-y-6">
                        {/* Summary */}
                        {reportData.summary && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>National Summary</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                        <div className="text-center p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                                            <div className="text-2xl font-bold text-blue-600">{reportData.summary.totalSchools}</div>
                                            <div className="text-sm text-muted-foreground">Total Schools</div>
                                        </div>
                                        <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                                            <div className="text-2xl font-bold text-green-600">{reportData.summary.totalStudents}</div>
                                            <div className="text-sm text-muted-foreground">Total Students</div>
                                        </div>
                                        <div className="text-center p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                                            <div className="text-2xl font-bold text-purple-600">{reportData.summary.totalTeachers}</div>
                                            <div className="text-sm text-muted-foreground">Total Teachers</div>
                                        </div>
                                        <div className="text-center p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                                            <div className="text-2xl font-bold text-orange-600">{reportData.summary.averagePTR?.toFixed(1)}</div>
                                            <div className="text-sm text-muted-foreground">Avg PTR</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* KPIs */}
                        {reportData.kpis && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Key Performance Indicators</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                        <div className="text-center p-4 border rounded-lg">
                                            <div className="text-2xl font-bold">{reportData.kpis.ger}%</div>
                                            <div className="text-sm text-muted-foreground">GER</div>
                                        </div>
                                        <div className="text-center p-4 border rounded-lg">
                                            <div className="text-2xl font-bold">{reportData.kpis.ner}%</div>
                                            <div className="text-sm text-muted-foreground">NER</div>
                                        </div>
                                        <div className="text-center p-4 border rounded-lg">
                                            <div className="text-2xl font-bold">{reportData.kpis.completionRate}%</div>
                                            <div className="text-sm text-muted-foreground">Completion Rate</div>
                                        </div>
                                        <div className="text-center p-4 border rounded-lg">
                                            <div className="text-2xl font-bold">{reportData.kpis.literacyRate}%</div>
                                            <div className="text-sm text-muted-foreground">Literacy Rate</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* By Region */}
                        {reportData.byRegion && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Data by Region</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        {reportData.byRegion.map((region: any, index: number) => (
                                            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                                <div className="font-medium">{region.region}</div>
                                                <div className="flex gap-4 text-sm text-muted-foreground">
                                                    <span>{region.school_count} schools</span>
                                                    <span>{region.student_count} students</span>
                                                    <span>{region.teacher_count} teachers</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                );

            case 'compliance':
                return (
                    <div className="space-y-6">
                        {/* Overview */}
                        {reportData.overview && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Compliance Overview</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                        <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                                            <div className="text-2xl font-bold text-green-600">{reportData.overview.compliantSchools}</div>
                                            <div className="text-sm text-muted-foreground">Compliant Schools</div>
                                        </div>
                                        <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                                            <div className="text-2xl font-bold text-yellow-600">{reportData.overview.partiallyCompliant}</div>
                                            <div className="text-sm text-muted-foreground">Partially Compliant</div>
                                        </div>
                                        <div className="text-center p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                                            <div className="text-2xl font-bold text-red-600">{reportData.overview.nonCompliant}</div>
                                            <div className="text-sm text-muted-foreground">Non-Compliant</div>
                                        </div>
                                        <div className="text-center p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                                            <div className="text-2xl font-bold text-blue-600">{reportData.overview.totalSchools}</div>
                                            <div className="text-sm text-muted-foreground">Total Schools</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                );

            default:
                return (
                    <Card>
                        <CardContent className="p-6 text-center">
                            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <p className="text-muted-foreground">Report data will be displayed here once generation is complete.</p>
                        </CardContent>
                    </Card>
                );
        }
    };

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title={`Admin - ${report.title}`} />
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">{report.title}</h1>
                        <p className="text-muted-foreground">{report.description}</p>
                    </div>
                    <div className="flex gap-2">
                        <Link href={route('admin.reports.index')}>
                            <Button variant="outline">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Reports
                            </Button>
                        </Link>
                        {report.status === 'completed' && (
                            <Link href={route('admin.reports.download', report.id)}>
                                <Button>
                                    <Download className="h-4 w-4 mr-2" />
                                    Download
                                </Button>
                            </Link>
                        )}
                        {report.status === 'generating' && (
                            <Button variant="outline" onClick={() => router.reload()}>
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Refresh
                            </Button>
                        )}
                    </div>
                </div>

                {/* Report Info */}
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                                {getTypeIcon(report.type)}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <Badge variant="outline" className="capitalize">{report.type}</Badge>
                                    {getStatusBadge(report.status)}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <span>Created: {new Date(report.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                        <span>Status: {report.status}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Users className="h-4 w-4 text-muted-foreground" />
                                        <span>Author ID: {report.author_id}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Report Data */}
                {renderReportData()}

                {/* Filters Applied */}
                {report.filters && Object.keys(report.filters).length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Applied Filters</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Object.entries(report.filters).map(([key, value]) => (
                                    <div key={key} className="flex items-center justify-between p-2 border rounded">
                                        <span className="font-medium capitalize">{key.replace('_', ' ')}:</span>
                                        <span className="text-muted-foreground">{value || 'All'}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Schedule Info */}
                {report.schedule && report.schedule.enabled && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Schedule Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div>
                                    <div className="font-medium">Frequency: {report.schedule.frequency}</div>
                                    <div className="text-sm text-muted-foreground">Next run: {report.schedule.nextRun}</div>
                                </div>
                                <Badge variant="outline">Scheduled</Badge>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppSidebarLayout>
    );
}
