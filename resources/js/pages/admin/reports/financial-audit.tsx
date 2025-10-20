import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
    DollarSign, 
    TrendingUp, 
    CheckCircle,
    AlertCircle,
    Download,
    ArrowLeft,
    FileSpreadsheet,
    BarChart3,
    Building2
} from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Admin', href: '/admin' },
    { label: 'Reports', href: '/admin/reports' },
    { label: 'Financial Audit Report' }
];

type FinancialAuditData = {
    year: number;
    totalBudget: number;
    totalExpenditure: number;
    byCategory: Array<{ category: string; total: number }>;
    byRegion: Array<{ region: string; budget: number; expenditure: number }>;
    compliance: {
        auditedSchools: number;
        pendingAudits: number;
        nonCompliant: number;
    };
};

type AdminFinancialAuditProps = {
    data: FinancialAuditData;
};

export default function AdminFinancialAuditReport() {
    const { data } = usePage().props as unknown as AdminFinancialAuditProps;
    const [selectedYear, setSelectedYear] = useState(data.year.toString());

    const handleYearChange = (year: string) => {
        setSelectedYear(year);
        router.get(route('admin.reports.financial-audit'), { year }, { preserveState: true });
    };

    const utilizationRate = ((data.totalExpenditure / data.totalBudget) * 100).toFixed(1);

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin - Financial Audit Report" />
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Financial Audit Report</h1>
                        <p className="text-muted-foreground">
                            Budget utilization, expenditure analysis, and compliance monitoring
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

                {/* Financial Summary */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2">
                                <DollarSign className="h-4 w-4 text-green-500" />
                                <div>
                                    <div className="text-2xl font-bold text-green-600">
                                        ₵{(data.totalBudget / 1000000).toFixed(1)}M
                                    </div>
                                    <div className="text-sm text-muted-foreground">Total Budget</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2">
                                <TrendingUp className="h-4 w-4 text-blue-500" />
                                <div>
                                    <div className="text-2xl font-bold text-blue-600">
                                        ₵{(data.totalExpenditure / 1000000).toFixed(1)}M
                                    </div>
                                    <div className="text-sm text-muted-foreground">Total Expenditure</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2">
                                <BarChart3 className="h-4 w-4 text-purple-500" />
                                <div>
                                    <div className="text-2xl font-bold text-purple-600">{utilizationRate}%</div>
                                    <div className="text-sm text-muted-foreground">Utilization Rate</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2">
                                <DollarSign className="h-4 w-4 text-orange-500" />
                                <div>
                                    <div className="text-2xl font-bold text-orange-600">
                                        ₵{((data.totalBudget - data.totalExpenditure) / 1000000).toFixed(1)}M
                                    </div>
                                    <div className="text-sm text-muted-foreground">Remaining Budget</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Expenditure by Category */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BarChart3 className="h-5 w-5" />
                            Expenditure by Category
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {data.byCategory.map((category, index) => (
                                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                    <div className="font-medium capitalize">{category.category.replace('_', ' ')}</div>
                                    <div className="flex items-center gap-2">
                                        <div className="text-sm text-muted-foreground">
                                            ₵{(category.total / 1000000).toFixed(2)}M
                                        </div>
                                        <Badge variant="outline">
                                            {((category.total / data.totalExpenditure) * 100).toFixed(1)}%
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Regional Analysis */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Building2 className="h-5 w-5" />
                            Regional Budget Analysis
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {data.byRegion.map((region, index) => {
                                const regionalUtilization = ((region.expenditure / region.budget) * 100).toFixed(1);
                                return (
                                    <div key={index} className="p-4 border rounded-lg">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="font-medium">{region.region}</div>
                                            <Badge variant={parseFloat(regionalUtilization) > 90 ? "destructive" : "default"}>
                                                {regionalUtilization}% utilized
                                            </Badge>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <div className="text-muted-foreground">Budget</div>
                                                <div className="font-medium">₵{(region.budget / 1000000).toFixed(2)}M</div>
                                            </div>
                                            <div>
                                                <div className="text-muted-foreground">Expenditure</div>
                                                <div className="font-medium">₵{(region.expenditure / 1000000).toFixed(2)}M</div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Compliance Status */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5" />
                            Audit Compliance Status
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                                <div className="text-2xl font-bold text-green-600">{data.compliance.auditedSchools}</div>
                                <div className="text-sm text-muted-foreground">Audited Schools</div>
                                <div className="text-xs text-muted-foreground mt-1">
                                    {((data.compliance.auditedSchools / (data.compliance.auditedSchools + data.compliance.pendingAudits + data.compliance.nonCompliant)) * 100).toFixed(1)}% of total
                                </div>
                            </div>
                            <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                                <div className="text-2xl font-bold text-yellow-600">{data.compliance.pendingAudits}</div>
                                <div className="text-sm text-muted-foreground">Pending Audits</div>
                                <div className="text-xs text-muted-foreground mt-1">
                                    {((data.compliance.pendingAudits / (data.compliance.auditedSchools + data.compliance.pendingAudits + data.compliance.nonCompliant)) * 100).toFixed(1)}% of total
                                </div>
                            </div>
                            <div className="text-center p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                                <div className="text-2xl font-bold text-red-600">{data.compliance.nonCompliant}</div>
                                <div className="text-sm text-muted-foreground">Non-Compliant</div>
                                <div className="text-xs text-muted-foreground mt-1">
                                    {((data.compliance.nonCompliant / (data.compliance.auditedSchools + data.compliance.pendingAudits + data.compliance.nonCompliant)) * 100).toFixed(1)}% of total
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Key Financial Indicators */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5" />
                            Key Financial Indicators
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center p-4 border rounded-lg">
                                <div className="text-3xl font-bold text-green-600">87.3%</div>
                                <div className="text-sm text-muted-foreground">Budget Utilization Rate</div>
                                <div className="text-xs text-muted-foreground mt-1">Target: 85%</div>
                            </div>
                            <div className="text-center p-4 border rounded-lg">
                                <div className="text-3xl font-bold text-blue-600">₵2.1M</div>
                                <div className="text-sm text-muted-foreground">Average School Budget</div>
                                <div className="text-xs text-muted-foreground mt-1">Per school allocation</div>
                            </div>
                            <div className="text-center p-4 border rounded-lg">
                                <div className="text-3xl font-bold text-purple-600">92.5%</div>
                                <div className="text-sm text-muted-foreground">Audit Compliance Rate</div>
                                <div className="text-xs text-muted-foreground mt-1">Target: 95%</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppSidebarLayout>
    );
}
