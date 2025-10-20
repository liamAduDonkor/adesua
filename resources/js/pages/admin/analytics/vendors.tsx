import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
    Package, 
    TrendingUp, 
    Award, 
    DollarSign,
    FileCheck,
    BarChart3,
    Star,
    Clock,
    Filter,
    Download,
    Search,
    CheckCircle,
    AlertTriangle,
    XCircle
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Admin', href: '/admin' },
    { label: 'Analytics', href: '/admin/analytics' },
    { label: 'Vendors' }
];

type VendorAnalyticsProps = {
    analytics: {
        summary: {
            total_records: number;
            total_contracts: number;
            total_value: number;
            total_paid: number;
            avg_delivery: number;
            avg_quality: number;
            avg_timeliness: number;
        };
        service_category_breakdown: Array<{
            service_category: string;
            contracts: number;
            value: number;
        }>;
        compliance_status: Array<{
            compliance_status: string;
            count: number;
        }>;
        top_vendors: Array<{
            vendor_id: number;
            contracts: number;
            value: number;
            avg_quality: number;
            vendor: {
                id: number;
                user: {
                    id: number;
                    name: string;
                    email: string;
                };
            };
        }>;
    };
    filters?: {
        academic_year?: string;
        service_category?: string;
    };
};

export default function VendorAnalytics() {
    const { analytics, filters } = usePage().props as unknown as VendorAnalyticsProps;

    const getComplianceColor = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'compliant': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
            case 'non-compliant': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
        }
    };

    const getComplianceIcon = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'compliant': return <CheckCircle className="h-4 w-4" />;
            case 'pending': return <AlertTriangle className="h-4 w-4" />;
            case 'non-compliant': return <XCircle className="h-4 w-4" />;
            default: return <FileCheck className="h-4 w-4" />;
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-GH', {
            style: 'currency',
            currency: 'GHS',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin - Vendor Analytics" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Vendor Performance Analytics</h1>
                        <p className="text-muted-foreground">
                            Comprehensive analysis of vendor performance and compliance
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Export
                        </Button>
                        <Button variant="outline" size="sm">
                            <Filter className="h-4 w-4 mr-2" />
                            Filters
                        </Button>
                    </div>
                </div>

                {/* Filters */}
                <Card>
                    <CardContent className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium mb-2 block">Academic Year</label>
                                <Input 
                                    type="text" 
                                    placeholder="e.g., 2023/2024"
                                    defaultValue={filters?.academic_year}
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-2 block">Service Category</label>
                                <Input 
                                    type="text" 
                                    placeholder="Search by category"
                                    defaultValue={filters?.service_category}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Summary Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Total Vendors</p>
                                    <p className="text-3xl font-bold mt-2">{analytics.summary.total_records}</p>
                                </div>
                                <Package className="h-12 w-12 text-blue-500 opacity-20" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Total Contracts</p>
                                    <p className="text-3xl font-bold mt-2">{analytics.summary.total_contracts}</p>
                                </div>
                                <FileCheck className="h-12 w-12 text-green-500 opacity-20" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Contract Value</p>
                                    <p className="text-2xl font-bold mt-2">
                                        {formatCurrency(analytics.summary.total_value || 0)}
                                    </p>
                                </div>
                                <DollarSign className="h-12 w-12 text-yellow-500 opacity-20" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Amount Paid</p>
                                    <p className="text-2xl font-bold mt-2">
                                        {formatCurrency(analytics.summary.total_paid || 0)}
                                    </p>
                                </div>
                                <DollarSign className="h-12 w-12 text-purple-500 opacity-20" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                    <Clock className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Avg. Delivery</p>
                                    <p className="text-2xl font-bold">
                                        {analytics.summary.avg_delivery?.toFixed(1) || 'N/A'}%
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                                    <Star className="h-6 w-6 text-green-600 dark:text-green-300" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Avg. Quality</p>
                                    <p className="text-2xl font-bold">
                                        {analytics.summary.avg_quality?.toFixed(1) || 'N/A'}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                                    <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-300" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Avg. Timeliness</p>
                                    <p className="text-2xl font-bold">
                                        {analytics.summary.avg_timeliness?.toFixed(1) || 'N/A'}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Compliance Status */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileCheck className="h-5 w-5" />
                            Compliance Status
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {analytics.compliance_status?.map((item) => {
                                const percentage = (item.count / analytics.summary.total_records) * 100;
                                return (
                                    <div key={item.compliance_status}>
                                        <div className="flex items-center justify-between mb-2">
                                            <Badge className={getComplianceColor(item.compliance_status)}>
                                                <span className="flex items-center gap-1">
                                                    {getComplianceIcon(item.compliance_status)}
                                                    {item.compliance_status}
                                                </span>
                                            </Badge>
                                            <span className="text-sm font-medium">
                                                {item.count} vendors ({percentage.toFixed(1)}%)
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div 
                                                className="bg-blue-500 h-2 rounded-full transition-all"
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Service Category Breakdown */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BarChart3 className="h-5 w-5" />
                            Service Category Breakdown
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {analytics.service_category_breakdown?.map((item, index) => (
                                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                                            <Package className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <p className="font-medium">{item.service_category}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {item.contracts} contract{item.contracts !== 1 ? 's' : ''}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold">{formatCurrency(item.value)}</p>
                                        <p className="text-xs text-muted-foreground">total value</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Top Vendors */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Award className="h-5 w-5" />
                            Top Vendors by Contract Value
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {analytics.top_vendors?.slice(0, 10).map((item, index) => (
                                <div key={item.vendor_id} className="flex items-center justify-between p-3 border rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 ${index < 3 ? 'bg-yellow-100 dark:bg-yellow-900' : 'bg-gray-100 dark:bg-gray-900'} rounded-full flex items-center justify-center`}>
                                            <span className="text-sm font-bold">{index + 1}</span>
                                        </div>
                                        <div>
                                            <p className="font-medium">{item.vendor?.user?.name}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {item.contracts} contract{item.contracts !== 1 ? 's' : ''}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold">{formatCurrency(item.value)}</p>
                                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                            <Star className="h-3 w-3 text-yellow-500" />
                                            <span>{item.avg_quality?.toFixed(1)} quality</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Links */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link href="/admin/search/vendors">
                        <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                            <CardContent className="p-4">
                                <div className="flex items-center gap-3">
                                    <Search className="h-8 w-8 text-blue-500" />
                                    <div>
                                        <h3 className="font-medium">Search Vendors</h3>
                                        <p className="text-sm text-muted-foreground">Find individual vendors</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/admin/analytics/teachers">
                        <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                            <CardContent className="p-4">
                                <div className="flex items-center gap-3">
                                    <BarChart3 className="h-8 w-8 text-green-500" />
                                    <div>
                                        <h3 className="font-medium">Teacher Analytics</h3>
                                        <p className="text-sm text-muted-foreground">View teacher performance</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/admin/analytics">
                        <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                            <CardContent className="p-4">
                                <div className="flex items-center gap-3">
                                    <TrendingUp className="h-8 w-8 text-purple-500" />
                                    <div>
                                        <h3 className="font-medium">Analytics Dashboard</h3>
                                        <p className="text-sm text-muted-foreground">Back to overview</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}

