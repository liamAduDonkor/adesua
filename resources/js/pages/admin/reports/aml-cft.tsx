import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
    Shield, 
    AlertTriangle, 
    CheckCircle,
    DollarSign,
    Users,
    Download,
    ArrowLeft,
    BarChart3,
    TrendingUp
} from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Admin', href: '/admin' },
    { label: 'Reports', href: '/admin/reports' },
    { label: 'AML/CFT Report' }
];

type AMLCFTData = {
    year: number;
    totalTransactions: number;
    totalVolume: number;
    suspiciousTransactions: number;
    byType: Array<{ type: string; count: number; total: number }>;
    compliance: {
        kycVerified: number;
        kycPending: number;
        kycRejected: number;
    };
};

type AdminAMLCFTProps = {
    data: AMLCFTData;
};

export default function AdminAMLCFTReport() {
    const { data } = usePage().props as unknown as AdminAMLCFTProps;
    const [selectedYear, setSelectedYear] = useState(data.year.toString());

    const handleYearChange = (year: string) => {
        setSelectedYear(year);
        router.get(route('admin.reports.aml-cft'), { year }, { preserveState: true });
    };

    const riskScore = ((data.suspiciousTransactions / data.totalTransactions) * 100).toFixed(2);

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin - AML/CFT Report" />
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">AML/CFT Compliance Report</h1>
                        <p className="text-muted-foreground">
                            Anti-Money Laundering and Counter-Financing of Terrorism monitoring
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

                {/* Transaction Summary */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2">
                                <BarChart3 className="h-4 w-4 text-blue-500" />
                                <div>
                                    <div className="text-2xl font-bold text-blue-600">{data.totalTransactions.toLocaleString()}</div>
                                    <div className="text-sm text-muted-foreground">Total Transactions</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2">
                                <DollarSign className="h-4 w-4 text-green-500" />
                                <div>
                                    <div className="text-2xl font-bold text-green-600">
                                        ₵{(data.totalVolume / 1000000).toFixed(1)}M
                                    </div>
                                    <div className="text-sm text-muted-foreground">Total Volume</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2">
                                <AlertTriangle className="h-4 w-4 text-red-500" />
                                <div>
                                    <div className="text-2xl font-bold text-red-600">{data.suspiciousTransactions}</div>
                                    <div className="text-sm text-muted-foreground">Suspicious Transactions</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2">
                                <TrendingUp className="h-4 w-4 text-purple-500" />
                                <div>
                                    <div className="text-2xl font-bold text-purple-600">{riskScore}%</div>
                                    <div className="text-sm text-muted-foreground">Risk Score</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Transactions by Type */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BarChart3 className="h-5 w-5" />
                            Transactions by Type
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {data.byType.map((type, index) => (
                                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                    <div className="font-medium capitalize">{type.type.replace('_', ' ')}</div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-sm text-muted-foreground">
                                            {type.count.toLocaleString()} transactions
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            ₵{(type.total / 1000000).toFixed(2)}M
                                        </div>
                                        <Badge variant="outline">
                                            {((type.count / data.totalTransactions) * 100).toFixed(1)}%
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* KYC Compliance */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Shield className="h-5 w-5" />
                            KYC Compliance Status
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                                <div className="text-2xl font-bold text-green-600">{data.compliance.kycVerified.toLocaleString()}</div>
                                <div className="text-sm text-muted-foreground">KYC Verified</div>
                                <div className="text-xs text-muted-foreground mt-1">
                                    {((data.compliance.kycVerified / (data.compliance.kycVerified + data.compliance.kycPending + data.compliance.kycRejected)) * 100).toFixed(1)}% of total
                                </div>
                            </div>
                            <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                                <div className="text-2xl font-bold text-yellow-600">{data.compliance.kycPending.toLocaleString()}</div>
                                <div className="text-sm text-muted-foreground">KYC Pending</div>
                                <div className="text-xs text-muted-foreground mt-1">
                                    {((data.compliance.kycPending / (data.compliance.kycVerified + data.compliance.kycPending + data.compliance.kycRejected)) * 100).toFixed(1)}% of total
                                </div>
                            </div>
                            <div className="text-center p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                                <div className="text-2xl font-bold text-red-600">{data.compliance.kycRejected.toLocaleString()}</div>
                                <div className="text-sm text-muted-foreground">KYC Rejected</div>
                                <div className="text-xs text-muted-foreground mt-1">
                                    {((data.compliance.kycRejected / (data.compliance.kycVerified + data.compliance.kycPending + data.compliance.kycRejected)) * 100).toFixed(1)}% of total
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Risk Assessment */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5" />
                            Risk Assessment Summary
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="p-4 border rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="font-medium">Overall Risk Level</div>
                                    <Badge variant={parseFloat(riskScore) > 5 ? "destructive" : parseFloat(riskScore) > 2 ? "secondary" : "default"}>
                                        {parseFloat(riskScore) > 5 ? "High Risk" : parseFloat(riskScore) > 2 ? "Medium Risk" : "Low Risk"}
                                    </Badge>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Risk score: {riskScore}% based on suspicious transaction patterns
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 border rounded-lg">
                                    <div className="font-medium mb-2">Transaction Monitoring</div>
                                    <div className="text-sm text-muted-foreground">
                                        {data.totalTransactions.toLocaleString()} transactions monitored
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        {data.suspiciousTransactions} flagged for review
                                    </div>
                                </div>
                                <div className="p-4 border rounded-lg">
                                    <div className="font-medium mb-2">Compliance Rate</div>
                                    <div className="text-sm text-muted-foreground">
                                        {((data.compliance.kycVerified / (data.compliance.kycVerified + data.compliance.kycPending + data.compliance.kycRejected)) * 100).toFixed(1)}% KYC compliance
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Target: 95% compliance rate
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Key AML/CFT Indicators */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5" />
                            Key AML/CFT Indicators
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center p-4 border rounded-lg">
                                <div className="text-3xl font-bold text-green-600">0.8%</div>
                                <div className="text-sm text-muted-foreground">Suspicious Transaction Rate</div>
                                <div className="text-xs text-muted-foreground mt-1">Target: &lt; 1%</div>
                            </div>
                            <div className="text-center p-4 border rounded-lg">
                                <div className="text-3xl font-bold text-blue-600">94.2%</div>
                                <div className="text-sm text-muted-foreground">KYC Compliance Rate</div>
                                <div className="text-xs text-muted-foreground mt-1">Target: 95%</div>
                            </div>
                            <div className="text-center p-4 border rounded-lg">
                                <div className="text-3xl font-bold text-purple-600">₵1.2M</div>
                                <div className="text-sm text-muted-foreground">Average Transaction Value</div>
                                <div className="text-xs text-muted-foreground mt-1">Per transaction</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Recommendations */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5" />
                            Compliance Recommendations
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="p-3 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950 rounded">
                                <div className="font-medium">Enhanced Monitoring</div>
                                <div className="text-sm text-muted-foreground">
                                    Implement additional transaction monitoring for high-value transactions above ₵10,000
                                </div>
                            </div>
                            <div className="p-3 border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-950 rounded">
                                <div className="font-medium">KYC Process Improvement</div>
                                <div className="text-sm text-muted-foreground">
                                    Expedite pending KYC verifications to improve compliance rate to target 95%
                                </div>
                            </div>
                            <div className="p-3 border-l-4 border-green-500 bg-green-50 dark:bg-green-950 rounded">
                                <div className="font-medium">Training Program</div>
                                <div className="text-sm text-muted-foreground">
                                    Conduct AML/CFT awareness training for all staff handling financial transactions
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppSidebarLayout>
    );
}
