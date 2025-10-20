import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
    Shield, 
    CheckCircle, 
    AlertCircle, 
    Clock, 
    Building2, 
    Users, 
    TrendingUp, 
    Download, 
    Eye, 
    FileText,
    Calendar,
    Target,
    BarChart3,
    AlertTriangle,
    XCircle
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Adesua', href: dashboard().url },
    { title: 'Admin', href: '/admin' },
    { title: 'Compliance', href: '/admin/compliance' },
];

type ComplianceItem = {
    id: number;
    school: string;
    region: string;
    category: 'safety' | 'academic' | 'financial' | 'administrative' | 'infrastructure';
    requirement: string;
    status: 'compliant' | 'non_compliant' | 'pending' | 'expired';
    dueDate: string;
    lastChecked: string;
    score: number;
    issues?: string[];
    correctiveActions?: string[];
    inspector?: string;
    priority: 'low' | 'medium' | 'high' | 'critical';
};

type ComplianceStats = {
    totalSchools: number;
    compliantSchools: number;
    nonCompliantSchools: number;
    pendingReviews: number;
    averageScore: number;
    criticalIssues: number;
    categories: {
        category: string;
        compliant: number;
        nonCompliant: number;
        pending: number;
    }[];
    regionalOverview: {
        region: string;
        schools: number;
        complianceRate: number;
        criticalIssues: number;
    }[];
};

type AdminComplianceProps = {
    compliance?: ComplianceItem[];
    stats?: ComplianceStats;
};

export default function AdminCompliance() {
    const { compliance, stats } = usePage().props as unknown as AdminComplianceProps;
    
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'compliant': return <Badge variant="default" className="bg-green-500">Compliant</Badge>;
            case 'non_compliant': return <Badge variant="destructive">Non-Compliant</Badge>;
            case 'pending': return <Badge variant="secondary" className="bg-yellow-500">Pending</Badge>;
            case 'expired': return <Badge variant="destructive">Expired</Badge>;
            default: return <Badge variant="outline">Unknown</Badge>;
        }
    };

    const getPriorityBadge = (priority: string) => {
        switch (priority) {
            case 'critical': return <Badge variant="destructive">Critical</Badge>;
            case 'high': return <Badge variant="default" className="bg-red-500">High</Badge>;
            case 'medium': return <Badge variant="secondary" className="bg-yellow-500">Medium</Badge>;
            case 'low': return <Badge variant="outline">Low</Badge>;
            default: return <Badge variant="outline">Unknown</Badge>;
        }
    };

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'safety': return <Shield className="h-4 w-4 text-red-500" />;
            case 'academic': return <Users className="h-4 w-4 text-blue-500" />;
            case 'financial': return <TrendingUp className="h-4 w-4 text-green-500" />;
            case 'administrative': return <FileText className="h-4 w-4 text-purple-500" />;
            case 'infrastructure': return <Building2 className="h-4 w-4 text-orange-500" />;
            default: return <AlertCircle className="h-4 w-4 text-gray-500" />;
        }
    };

    const getScoreBadge = (score: number) => {
        if (score >= 90) return <Badge variant="default" className="bg-green-500">Excellent</Badge>;
        if (score >= 80) return <Badge variant="default" className="bg-blue-500">Good</Badge>;
        if (score >= 70) return <Badge variant="secondary" className="bg-yellow-500">Fair</Badge>;
        return <Badge variant="destructive">Poor</Badge>;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin - Compliance Monitoring" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-semibold">Compliance Monitoring</h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Monitor school compliance with educational standards and regulations
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <BarChart3 className="h-4 w-4 mr-2" />
                            Analytics
                        </Button>
                        <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Export Report
                        </Button>
                        <Button size="sm">
                            <Calendar className="h-4 w-4 mr-2" />
                            Schedule Inspection
                        </Button>
                    </div>
                </div>

                {/* Stats Overview */}
                {stats && (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center gap-2">
                                    <Building2 className="h-4 w-4 text-blue-500" />
                                    <div>
                                        <div className="text-2xl font-bold text-blue-600">{stats.totalSchools}</div>
                                        <div className="text-sm text-muted-foreground">Total Schools</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <div>
                                        <div className="text-2xl font-bold text-green-600">{stats.compliantSchools}</div>
                                        <div className="text-sm text-muted-foreground">Compliant</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center gap-2">
                                    <XCircle className="h-4 w-4 text-red-500" />
                                    <div>
                                        <div className="text-2xl font-bold text-red-600">{stats.nonCompliantSchools}</div>
                                        <div className="text-sm text-muted-foreground">Non-Compliant</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center gap-2">
                                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                                    <div>
                                        <div className="text-2xl font-bold text-orange-600">{stats.criticalIssues}</div>
                                        <div className="text-sm text-muted-foreground">Critical Issues</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Compliance Items */}
                <div className="grid grid-cols-1 gap-4">
                    {compliance && compliance.length > 0 ? (
                        compliance.map((item) => (
                            <Card key={item.id}>
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                                                {getCategoryIcon(item.category)}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-lg font-semibold">{item.school}</h3>
                                                    <Badge variant="outline">{item.region}</Badge>
                                                    {getStatusBadge(item.status)}
                                                    {getPriorityBadge(item.priority)}
                                                    {getScoreBadge(item.score)}
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                    <div className="space-y-2">
                                                        <div className="flex items-center gap-2">
                                                            <FileText className="h-4 w-4 text-muted-foreground" />
                                                            <span className="text-sm font-medium">Requirement:</span>
                                                        </div>
                                                        <div className="text-sm text-muted-foreground ml-6">{item.requirement}</div>
                                                        <div className="flex items-center gap-2">
                                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                                            <span className="text-sm">Due: {item.dueDate}</span>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <div className="flex items-center gap-2">
                                                            <Clock className="h-4 w-4 text-muted-foreground" />
                                                            <span className="text-sm">Last Checked: {item.lastChecked}</span>
                                                        </div>
                                                        {item.inspector && (
                                                            <div className="flex items-center gap-2">
                                                                <Users className="h-4 w-4 text-muted-foreground" />
                                                                <span className="text-sm">Inspector: {item.inspector}</span>
                                                            </div>
                                                        )}
                                                        <div className="flex items-center gap-2">
                                                            <Target className="h-4 w-4 text-muted-foreground" />
                                                            <span className="text-sm">Score: {item.score}/100</span>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        {item.issues && item.issues.length > 0 && (
                                                            <div>
                                                                <div className="text-sm font-medium mb-1">Issues:</div>
                                                                <div className="space-y-1">
                                                                    {item.issues.map((issue, index) => (
                                                                        <div key={index} className="text-sm text-red-600 flex items-center gap-1">
                                                                            <AlertCircle className="h-3 w-3" />
                                                                            {issue}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                        {item.correctiveActions && item.correctiveActions.length > 0 && (
                                                            <div>
                                                                <div className="text-sm font-medium mb-1">Actions:</div>
                                                                <div className="space-y-1">
                                                                    {item.correctiveActions.map((action, index) => (
                                                                        <div key={index} className="text-sm text-blue-600 flex items-center gap-1">
                                                                            <CheckCircle className="h-3 w-3" />
                                                                            {action}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                <FileText className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <Card>
                            <CardContent className="flex flex-col items-center justify-center py-12">
                                <Shield className="h-12 w-12 text-muted-foreground mb-4" />
                                <h3 className="text-lg font-medium mb-2">No Compliance Data</h3>
                                <p className="text-sm text-muted-foreground text-center mb-4">
                                    No compliance monitoring data available. Schedule inspections to begin monitoring.
                                </p>
                                <Button>
                                    <Calendar className="h-4 w-4 mr-2" />
                                    Schedule Inspection
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Category Overview */}
                {stats && stats.categories.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BarChart3 className="h-5 w-5" />
                                Compliance by Category
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                                {stats.categories.map((category, index) => (
                                    <div key={index} className="p-4 border rounded-lg">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="font-medium capitalize">{category.category}</div>
                                            <div className="text-sm text-muted-foreground">
                                                {category.compliant + category.nonCompliant + category.pending} total
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-green-600">Compliant</span>
                                                <span className="font-medium">{category.compliant}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-red-600">Non-Compliant</span>
                                                <span className="font-medium">{category.nonCompliant}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-yellow-600">Pending</span>
                                                <span className="font-medium">{category.pending}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Regional Overview */}
                {stats && stats.regionalOverview.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Building2 className="h-5 w-5" />
                                Regional Compliance Overview
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {stats.regionalOverview.map((region, index) => (
                                    <div key={index} className="p-4 border rounded-lg">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="font-medium">{region.region}</div>
                                            <div className="text-sm text-muted-foreground">{region.schools} schools</div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm">Compliance Rate</span>
                                                <span className="font-medium">{region.complianceRate}%</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm">Critical Issues</span>
                                                <span className="font-medium text-red-600">{region.criticalIssues}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="p-6 text-center">
                            <Calendar className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                            <h3 className="font-medium mb-2">Schedule Inspection</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Schedule compliance inspections for schools
                            </p>
                            <Button variant="outline" className="w-full">
                                Schedule
                            </Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 text-center">
                            <FileText className="h-8 w-8 text-green-500 mx-auto mb-3" />
                            <h3 className="font-medium mb-2">Generate Report</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Create comprehensive compliance reports
                            </p>
                            <Button variant="outline" className="w-full">
                                Generate
                            </Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 text-center">
                            <AlertTriangle className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
                            <h3 className="font-medium mb-2">Issue Alerts</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Send compliance alerts to schools
                            </p>
                            <Button variant="outline" className="w-full">
                                Send Alerts
                            </Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 text-center">
                            <BarChart3 className="h-8 w-8 text-purple-500 mx-auto mb-3" />
                            <h3 className="font-medium mb-2">Analytics</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                View compliance analytics and trends
                            </p>
                            <Button variant="outline" className="w-full">
                                View Analytics
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}


