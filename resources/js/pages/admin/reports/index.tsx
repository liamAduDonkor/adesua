import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
    FileText, 
    Download, 
    Eye, 
    Calendar, 
    BarChart3, 
    TrendingUp, 
    Users, 
    Building2, 
    GraduationCap,
    Clock,
    CheckCircle,
    AlertCircle,
    Filter,
    Search,
    Plus,
    Settings,
    Share,
    Archive,
    FileSpreadsheet,
    FileText as FilePdf,
    FileText as FileCsv
} from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Admin', href: '/admin' },
    { label: 'Reports' }
];

type Report = {
    id: number;
    title: string;
    type: 'national' | 'regional' | 'school' | 'compliance' | 'performance' | 'financial' | 'enrollment';
    description: string;
    generatedDate: string;
    period: string;
    status: 'completed' | 'generating' | 'failed' | 'scheduled';
    size: string;
    format: 'pdf' | 'excel' | 'csv';
    author: string;
    recipients?: string[];
    downloadUrl?: string;
    previewUrl?: string;
    schedule?: {
        frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
        nextRun: string;
        enabled: boolean;
    };
};

type ReportStats = {
    totalReports: number;
    completedReports: number;
    generatingReports: number;
    scheduledReports: number;
    totalDownloads: number;
    reportTypes: {
        type: string;
        count: number;
        lastGenerated: string;
    }[];
    popularReports: {
        title: string;
        downloads: number;
        type: string;
    }[];
};

type AdminReportsProps = {
    reports?: any;
    stats?: ReportStats;
    filters?: {
        type?: string;
        status?: string;
        search?: string;
    };
};

export default function AdminReports() {
    const { reports, stats, filters } = usePage().props as unknown as AdminReportsProps;
    const [search, setSearch] = useState(filters?.search || '');
    const [typeFilter, setTypeFilter] = useState(filters?.type || 'all');
    const [statusFilter, setStatusFilter] = useState(filters?.status || 'all');
    
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
            case 'national': return <Building2 className="h-4 w-4 text-blue-500" />;
            case 'regional': return <BarChart3 className="h-4 w-4 text-green-500" />;
            case 'school': return <GraduationCap className="h-4 w-4 text-purple-500" />;
            case 'compliance': return <CheckCircle className="h-4 w-4 text-orange-500" />;
            case 'performance': return <TrendingUp className="h-4 w-4 text-red-500" />;
            case 'financial': return <FileText className="h-4 w-4 text-yellow-500" />;
            case 'enrollment': return <Users className="h-4 w-4 text-indigo-500" />;
            default: return <FileText className="h-4 w-4 text-gray-500" />;
        }
    };

    const getFormatIcon = (format: string) => {
        switch (format) {
            case 'pdf': return <FilePdf className="h-4 w-4 text-red-500" />;
            case 'excel': return <FileSpreadsheet className="h-4 w-4 text-green-500" />;
            case 'csv': return <FileCsv className="h-4 w-4 text-blue-500" />;
            default: return <FileText className="h-4 w-4 text-gray-500" />;
        }
    };

    const handleSearch = () => {
        router.get(route('admin.reports.index'), {
            search,
            type: typeFilter,
            status: statusFilter
        }, { preserveState: true });
    };

    const handleFilterChange = (filterType: string, value: string) => {
        if (filterType === 'type') {
            setTypeFilter(value);
        } else if (filterType === 'status') {
            setStatusFilter(value);
        }
        
        router.get(route('admin.reports.index'), {
            search,
            type: filterType === 'type' ? value : typeFilter,
            status: filterType === 'status' ? value : statusFilter
        }, { preserveState: true });
    };

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin - Reports" />
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Report Management</h1>
                        <p className="text-muted-foreground">
                            Generate, manage, and distribute national education reports
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Link href={route('admin.reports.create')}>
                            <Button>
                                <Plus className="h-4 w-4 mr-2" />
                                New Report
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Stats Overview */}
                {stats && (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-blue-500" />
                                    <div>
                                        <div className="text-2xl font-bold text-blue-600">{stats.totalReports}</div>
                                        <div className="text-sm text-muted-foreground">Total Reports</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <div>
                                        <div className="text-2xl font-bold text-green-600">{stats.completedReports}</div>
                                        <div className="text-sm text-muted-foreground">Completed</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-yellow-500" />
                                    <div>
                                        <div className="text-2xl font-bold text-yellow-600">{stats.generatingReports}</div>
                                        <div className="text-sm text-muted-foreground">Generating</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center gap-2">
                                    <Download className="h-4 w-4 text-purple-500" />
                                    <div>
                                        <div className="text-2xl font-bold text-purple-600">{stats.totalDownloads}</div>
                                        <div className="text-sm text-muted-foreground">Downloads</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Search and Filters */}
                <Card>
                    <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search reports by title, type, or description..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pl-8"
                                />
                            </div>
                            <Select value={typeFilter} onValueChange={(value) => handleFilterChange('type', value)}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Report Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Types</SelectItem>
                                    <SelectItem value="national">National</SelectItem>
                                    <SelectItem value="regional">Regional</SelectItem>
                                    <SelectItem value="school">School</SelectItem>
                                    <SelectItem value="compliance">Compliance</SelectItem>
                                    <SelectItem value="performance">Performance</SelectItem>
                                    <SelectItem value="financial">Financial</SelectItem>
                                    <SelectItem value="enrollment">Enrollment</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={statusFilter} onValueChange={(value) => handleFilterChange('status', value)}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                    <SelectItem value="generating">Generating</SelectItem>
                                    <SelectItem value="failed">Failed</SelectItem>
                                    <SelectItem value="scheduled">Scheduled</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button onClick={handleSearch}>
                                <Search className="h-4 w-4 mr-2" />
                                Search
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Statutory Reports Quick Access */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            Statutory Reports
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Link href={route('admin.reports.emis')}>
                                <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                                    <CardContent className="p-4">
                                        <div className="flex items-center gap-3">
                                            <Building2 className="h-8 w-8 text-blue-500" />
                                            <div>
                                                <h3 className="font-medium">EMIS Report</h3>
                                                <p className="text-sm text-muted-foreground">Education Management Information System</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                            <Link href={route('admin.reports.financial-audit')}>
                                <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                                    <CardContent className="p-4">
                                        <div className="flex items-center gap-3">
                                            <FileSpreadsheet className="h-8 w-8 text-green-500" />
                                            <div>
                                                <h3 className="font-medium">Financial Audit</h3>
                                                <p className="text-sm text-muted-foreground">Budget utilization and compliance</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                            <Link href={route('admin.reports.aml-cft')}>
                                <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                                    <CardContent className="p-4">
                                        <div className="flex items-center gap-3">
                                            <AlertCircle className="h-8 w-8 text-orange-500" />
                                            <div>
                                                <h3 className="font-medium">AML/CFT Report</h3>
                                                <p className="text-sm text-muted-foreground">Anti-Money Laundering compliance</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                {/* Reports List */}
                <div className="space-y-4">
                    {reports && reports.data && reports.data.length > 0 ? (
                        reports.data.map((report: any) => (
                            <Card key={report.id}>
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                                                {getTypeIcon(report.type)}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-lg font-semibold">{report.title}</h3>
                                                    <Badge variant="outline" className="capitalize">{report.type}</Badge>
                                                    {getStatusBadge(report.status)}
                                                    <div className="flex items-center gap-1">
                                                        {getFormatIcon(report.format)}
                                                        <span className="text-sm font-medium uppercase">{report.format}</span>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                    <div className="space-y-2">
                                                        <div className="flex items-center gap-2">
                                                            <FileText className="h-4 w-4 text-muted-foreground" />
                                                            <span className="text-sm font-medium">Description:</span>
                                                        </div>
                                                        <div className="text-sm text-muted-foreground ml-6">{report.description}</div>
                                                        <div className="flex items-center gap-2">
                                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                                            <span className="text-sm">Period: {report.period}</span>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <div className="flex items-center gap-2">
                                                            <Clock className="h-4 w-4 text-muted-foreground" />
                                                            <span className="text-sm">Generated: {report.generatedDate}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Users className="h-4 w-4 text-muted-foreground" />
                                                            <span className="text-sm">Author: {report.author}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <FileText className="h-4 w-4 text-muted-foreground" />
                                                            <span className="text-sm">Size: {report.size}</span>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        {report.recipients && report.recipients.length > 0 && (
                                                            <div>
                                                                <div className="text-sm font-medium mb-1">Recipients:</div>
                                                                <div className="flex flex-wrap gap-1">
                                                                    {report.recipients.slice(0, 3).map((recipient: string, index: number) => (
                                                                        <Badge key={index} variant="outline" className="text-xs">
                                                                            {recipient}
                                                                        </Badge>
                                                                    ))}
                                                                    {report.recipients.length > 3 && (
                                                                        <Badge variant="outline" className="text-xs">
                                                                            +{report.recipients.length - 3} more
                                                                        </Badge>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}
                                                        {report.schedule && (
                                                            <div>
                                                                <div className="text-sm font-medium mb-1">Schedule:</div>
                                                                <div className="text-sm text-muted-foreground">
                                                                    {report.schedule.frequency} • Next: {report.schedule.nextRun}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Link href={route('admin.reports.show', report.id)}>
                                                <Button variant="outline" size="sm">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            {report.status === 'completed' && (
                                                <Link href={route('admin.reports.download', report.id)}>
                                                    <Button variant="outline" size="sm">
                                                        <Download className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                            )}
                                            <Button variant="outline" size="sm">
                                                <Share className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <Card>
                            <CardContent className="flex flex-col items-center justify-center py-12">
                                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                                <h3 className="text-lg font-medium mb-2">No Reports Found</h3>
                                <p className="text-sm text-muted-foreground text-center mb-4">
                                    No reports available. Generate your first report to get started.
                                </p>
                                <Link href={route('admin.reports.create')}>
                                    <Button>
                                        <Plus className="h-4 w-4 mr-2" />
                                        Generate Report
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Pagination */}
                {reports && reports.links && (
                    <div className="flex justify-center">
                        <div className="flex gap-2">
                            {reports.links.map((link: any, index: number) => (
                                <Button
                                    key={index}
                                    variant={link.active ? "default" : "outline"}
                                    size="sm"
                                    disabled={!link.url}
                                    onClick={() => link.url && router.get(link.url)}
                                >
                                    <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                </Button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppSidebarLayout>
    );
}
