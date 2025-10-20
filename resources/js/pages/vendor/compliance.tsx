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
    Calendar, 
    FileText, 
    Download, 
    Eye, 
    Upload,
    TrendingUp,
    AlertTriangle,
    XCircle,
    Settings,
    RefreshCw,
    Award,
    Building2
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Adesua', href: dashboard().url },
    { title: 'Vendor', href: '/vendor' },
    { title: 'Compliance', href: '/vendor/compliance' },
];

type ComplianceItem = {
    id: number;
    requirement: string;
    category: 'tax_clearance' | 'business_registration' | 'insurance' | 'certification' | 'safety' | 'environmental';
    status: 'valid' | 'expired' | 'expiring_soon' | 'missing' | 'pending_renewal';
    issueDate: string;
    expiryDate: string;
    issuer: string;
    documentNumber: string;
    description: string;
    priority: 'low' | 'medium' | 'high' | 'critical';
    attachments?: {
        name: string;
        url: string;
        type: string;
    }[];
    renewalReminder?: {
        daysUntilExpiry: number;
        reminderSent: boolean;
    };
};

type ComplianceStats = {
    totalRequirements: number;
    validDocuments: number;
    expiringSoon: number;
    expiredDocuments: number;
    missingDocuments: number;
    overallCompliance: number;
    categories: {
        category: string;
        valid: number;
        expiring: number;
        expired: number;
        missing: number;
    }[];
    upcomingRenewals: {
        requirement: string;
        expiryDate: string;
        daysUntilExpiry: number;
        priority: string;
    }[];
};

type VendorComplianceProps = {
    compliance?: ComplianceItem[];
    stats?: ComplianceStats;
};

export default function VendorCompliance() {
    const { compliance, stats } = usePage().props as unknown as VendorComplianceProps;
    
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'valid': return <Badge variant="default" className="bg-green-500">Valid</Badge>;
            case 'expired': return <Badge variant="destructive">Expired</Badge>;
            case 'expiring_soon': return <Badge variant="secondary" className="bg-yellow-500">Expiring Soon</Badge>;
            case 'missing': return <Badge variant="destructive">Missing</Badge>;
            case 'pending_renewal': return <Badge variant="outline">Pending Renewal</Badge>;
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
            case 'tax_clearance': return <FileText className="h-4 w-4 text-blue-500" />;
            case 'business_registration': return <Building2 className="h-4 w-4 text-green-500" />;
            case 'insurance': return <Shield className="h-4 w-4 text-purple-500" />;
            case 'certification': return <Award className="h-4 w-4 text-orange-500" />;
            case 'safety': return <AlertTriangle className="h-4 w-4 text-red-500" />;
            case 'environmental': return <CheckCircle className="h-4 w-4 text-teal-500" />;
            default: return <FileText className="h-4 w-4 text-gray-500" />;
        }
    };

    const getDaysUntilExpiry = (expiryDate: string) => {
        const expiry = new Date(expiryDate);
        const today = new Date();
        const diffTime = expiry.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const getExpiryStatus = (expiryDate: string) => {
        const days = getDaysUntilExpiry(expiryDate);
        if (days < 0) return 'expired';
        if (days <= 30) return 'expiring_soon';
        return 'valid';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Vendor - Compliance Management" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-semibold">Compliance Management</h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Manage vendor compliance documents and certifications
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Refresh
                        </Button>
                        <Button variant="outline" size="sm">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Document
                        </Button>
                        <Button size="sm">
                            <Settings className="h-4 w-4 mr-2" />
                            Manage Requirements
                        </Button>
                    </div>
                </div>

                {/* Stats Overview */}
                {stats && (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center gap-2">
                                    <Shield className="h-4 w-4 text-blue-500" />
                                    <div>
                                        <div className="text-2xl font-bold text-blue-600">{stats.totalRequirements}</div>
                                        <div className="text-sm text-muted-foreground">Total Requirements</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <div>
                                        <div className="text-2xl font-bold text-green-600">{stats.validDocuments}</div>
                                        <div className="text-sm text-muted-foreground">Valid Documents</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-yellow-500" />
                                    <div>
                                        <div className="text-2xl font-bold text-yellow-600">{stats.expiringSoon}</div>
                                        <div className="text-sm text-muted-foreground">Expiring Soon</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center gap-2">
                                    <XCircle className="h-4 w-4 text-red-500" />
                                    <div>
                                        <div className="text-2xl font-bold text-red-600">{stats.expiredDocuments}</div>
                                        <div className="text-sm text-muted-foreground">Expired</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Overall Compliance Score */}
                {stats && (
                    <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5" />
                                Overall Compliance Score
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold mb-2">{stats.overallCompliance}%</div>
                            <div className="text-sm opacity-90">
                                {stats.overallCompliance >= 90 ? 'Excellent' : 
                                 stats.overallCompliance >= 80 ? 'Good' : 
                                 stats.overallCompliance >= 70 ? 'Fair' : 'Needs Improvement'}
                            </div>
                        </CardContent>
                    </Card>
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
                                                    <h3 className="text-lg font-semibold">{item.requirement}</h3>
                                                    <Badge variant="outline" className="capitalize">{item.category.replace('_', ' ')}</Badge>
                                                    {getStatusBadge(item.status)}
                                                    {getPriorityBadge(item.priority)}
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                    <div className="space-y-2">
                                                        <div className="flex items-center gap-2">
                                                            <FileText className="h-4 w-4 text-muted-foreground" />
                                                            <span className="text-sm font-medium">Document:</span>
                                                        </div>
                                                        <div className="text-sm text-muted-foreground ml-6">{item.documentNumber}</div>
                                                        <div className="flex items-center gap-2">
                                                            <Building2 className="h-4 w-4 text-muted-foreground" />
                                                            <span className="text-sm">Issuer: {item.issuer}</span>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <div className="flex items-center gap-2">
                                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                                            <span className="text-sm font-medium">Issue Date:</span>
                                                        </div>
                                                        <div className="text-sm text-muted-foreground ml-6">{item.issueDate}</div>
                                                        <div className="flex items-center gap-2">
                                                            <Clock className="h-4 w-4 text-muted-foreground" />
                                                            <span className="text-sm">Expiry: {item.expiryDate}</span>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <div className="flex items-center gap-2">
                                                            <AlertCircle className="h-4 w-4 text-muted-foreground" />
                                                            <span className="text-sm font-medium">Status:</span>
                                                        </div>
                                                        <div className="text-sm text-muted-foreground ml-6">{item.description}</div>
                                                        {item.renewalReminder && (
                                                            <div className="flex items-center gap-2">
                                                                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                                                                <span className="text-sm text-yellow-600">
                                                                    {item.renewalReminder.daysUntilExpiry} days until expiry
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                {item.attachments && item.attachments.length > 0 && (
                                                    <div className="mt-3">
                                                        <div className="text-sm font-medium mb-1">Attachments:</div>
                                                        <div className="flex flex-wrap gap-1">
                                                            {item.attachments.map((attachment, index) => (
                                                                <Badge key={index} variant="outline" className="text-xs">
                                                                    {attachment.name}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                <Download className="h-4 w-4" />
                                            </Button>
                                            {(item.status === 'expired' || item.status === 'expiring_soon') && (
                                                <Button variant="outline" size="sm">
                                                    <RefreshCw className="h-4 w-4" />
                                                </Button>
                                            )}
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
                                    No compliance documents found. Upload your first document to get started.
                                </p>
                                <Button>
                                    <Upload className="h-4 w-4 mr-2" />
                                    Upload Document
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
                                <Building2 className="h-5 w-5" />
                                Compliance by Category
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {stats.categories.map((category, index) => (
                                    <div key={index} className="p-4 border rounded-lg">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="font-medium capitalize">{category.category.replace('_', ' ')}</div>
                                            <div className="text-sm text-muted-foreground">
                                                {category.valid + category.expiring + category.expired + category.missing} total
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-green-600">Valid</span>
                                                <span className="font-medium">{category.valid}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-yellow-600">Expiring</span>
                                                <span className="font-medium">{category.expiring}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-red-600">Expired</span>
                                                <span className="font-medium">{category.expired}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-600">Missing</span>
                                                <span className="font-medium">{category.missing}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Upcoming Renewals */}
                {stats && stats.upcomingRenewals.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <AlertTriangle className="h-5 w-5" />
                                Upcoming Renewals
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {stats.upcomingRenewals.map((renewal, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <AlertTriangle className="h-4 w-4 text-yellow-500" />
                                            <div>
                                                <div className="font-medium">{renewal.requirement}</div>
                                                <div className="text-sm text-muted-foreground">
                                                    Expires: {renewal.expiryDate}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="secondary" className="bg-yellow-500">
                                                {renewal.daysUntilExpiry} days
                                            </Badge>
                                            {getPriorityBadge(renewal.priority)}
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
                            <Upload className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                            <h3 className="font-medium mb-2">Upload Document</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Upload new compliance documents
                            </p>
                            <Button variant="outline" className="w-full">
                                Upload
                            </Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 text-center">
                            <RefreshCw className="h-8 w-8 text-green-500 mx-auto mb-3" />
                            <h3 className="font-medium mb-2">Renew Documents</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Renew expired or expiring documents
                            </p>
                            <Button variant="outline" className="w-full">
                                Renew
                            </Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 text-center">
                            <Download className="h-8 w-8 text-purple-500 mx-auto mb-3" />
                            <h3 className="font-medium mb-2">Download Reports</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Download compliance reports
                            </p>
                            <Button variant="outline" className="w-full">
                                Download
                            </Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 text-center">
                            <Settings className="h-8 w-8 text-orange-500 mx-auto mb-3" />
                            <h3 className="font-medium mb-2">Manage Requirements</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Configure compliance requirements
                            </p>
                            <Button variant="outline" className="w-full">
                                Settings
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}


