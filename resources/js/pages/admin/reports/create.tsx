import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
    FileText, 
    Building2, 
    BarChart3, 
    GraduationCap,
    CheckCircle,
    TrendingUp,
    Users,
    Calendar,
    Settings,
    ArrowLeft
} from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Admin', href: '/admin' },
    { label: 'Reports', href: '/admin/reports' },
    { label: 'Create Report' }
];

type ReportTemplate = {
    title: string;
    description: string;
    sections: string[];
};

type AdminReportsCreateProps = {
    reportTemplates: Record<string, ReportTemplate>;
    regions: string[];
    schools: Array<{ id: number; name: string; code: string; region: string }>;
};

export default function AdminReportsCreate() {
    const { reportTemplates, regions, schools } = usePage().props as unknown as AdminReportsCreateProps;
    
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        type: 'national',
        description: '',
        filters: {
            region: '',
            school_id: '',
            date_from: '',
            date_to: '',
            format: 'pdf'
        },
        schedule: {
            frequency: 'monthly',
            enabled: false
        },
        recipients: []
    });

    const [selectedTemplate, setSelectedTemplate] = useState<ReportTemplate | null>(null);

    const handleTemplateSelect = (type: string) => {
        setData('type', type);
        setSelectedTemplate(reportTemplates[type]);
        if (reportTemplates[type]) {
            setData('title', reportTemplates[type].title);
            setData('description', reportTemplates[type].description);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.reports.store'));
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

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin - Create Report" />
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Create New Report</h1>
                        <p className="text-muted-foreground">
                            Generate custom reports with advanced filtering and scheduling options
                        </p>
                    </div>
                    <Link href={route('admin.reports.index')}>
                        <Button variant="outline">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Reports
                        </Button>
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Report Template Selection */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5" />
                                Report Template
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {Object.entries(reportTemplates).map(([type, template]) => (
                                    <Card 
                                        key={type}
                                        className={`cursor-pointer transition-all ${
                                            data.type === type 
                                                ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-950' 
                                                : 'hover:bg-muted/50'
                                        }`}
                                        onClick={() => handleTemplateSelect(type)}
                                    >
                                        <CardContent className="p-4">
                                            <div className="flex items-center gap-3 mb-2">
                                                {getTypeIcon(type)}
                                                <h3 className="font-medium capitalize">{type}</h3>
                                            </div>
                                            <p className="text-sm text-muted-foreground mb-2">{template.title}</p>
                                            <p className="text-xs text-muted-foreground">{template.description}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Report Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Settings className="h-5 w-5" />
                                Report Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Report Title</Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="Enter report title"
                                        className={errors.title ? 'border-red-500' : ''}
                                    />
                                    {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="type">Report Type</Label>
                                    <Select value={data.type} onValueChange={(value) => handleTemplateSelect(value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select report type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.keys(reportTemplates).map((type) => (
                                                <SelectItem key={type} value={type}>
                                                    <div className="flex items-center gap-2">
                                                        {getTypeIcon(type)}
                                                        <span className="capitalize">{type}</span>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.type && <p className="text-sm text-red-500">{errors.type}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Enter report description"
                                    rows={3}
                                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.description ? 'border-red-500' : ''}`}
                                />
                                {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Filters */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="h-5 w-5" />
                                Filters & Options
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="region">Region</Label>
                                    <Select 
                                        value={data.filters.region} 
                                        onValueChange={(value) => setData('filters', { ...data.filters, region: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select region" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="">All Regions</SelectItem>
                                            {regions.map((region) => (
                                                <SelectItem key={region} value={region}>{region}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="school">School</Label>
                                    <Select 
                                        value={data.filters.school_id} 
                                        onValueChange={(value) => setData('filters', { ...data.filters, school_id: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select school" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="">All Schools</SelectItem>
                                            {schools.map((school) => (
                                                <SelectItem key={school.id} value={school.id.toString()}>
                                                    {school.name} ({school.code})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="date_from">From Date</Label>
                                    <Input
                                        id="date_from"
                                        type="date"
                                        value={data.filters.date_from}
                                        onChange={(e) => setData('filters', { ...data.filters, date_from: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="date_to">To Date</Label>
                                    <Input
                                        id="date_to"
                                        type="date"
                                        value={data.filters.date_to}
                                        onChange={(e) => setData('filters', { ...data.filters, date_to: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="format">Output Format</Label>
                                    <Select 
                                        value={data.filters.format} 
                                        onValueChange={(value) => setData('filters', { ...data.filters, format: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select format" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="pdf">PDF</SelectItem>
                                            <SelectItem value="excel">Excel</SelectItem>
                                            <SelectItem value="csv">CSV</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Schedule */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="h-5 w-5" />
                                Schedule (Optional)
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="schedule_enabled"
                                    checked={data.schedule.enabled}
                                    onCheckedChange={(checked) => 
                                        setData('schedule', { ...data.schedule, enabled: checked as boolean })
                                    }
                                />
                                <Label htmlFor="schedule_enabled">Enable automatic report generation</Label>
                            </div>

                            {data.schedule.enabled && (
                                <div className="space-y-2">
                                    <Label htmlFor="frequency">Frequency</Label>
                                    <Select 
                                        value={data.schedule.frequency} 
                                        onValueChange={(value) => setData('schedule', { ...data.schedule, frequency: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select frequency" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="daily">Daily</SelectItem>
                                            <SelectItem value="weekly">Weekly</SelectItem>
                                            <SelectItem value="monthly">Monthly</SelectItem>
                                            <SelectItem value="quarterly">Quarterly</SelectItem>
                                            <SelectItem value="yearly">Yearly</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Submit */}
                    <div className="flex justify-end gap-4">
                        <Link href={route('admin.reports.index')}>
                            <Button variant="outline">Cancel</Button>
                        </Link>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Generating...' : 'Generate Report'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppSidebarLayout>
    );
}
