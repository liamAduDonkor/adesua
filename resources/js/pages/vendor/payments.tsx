import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
    CreditCard, 
    DollarSign, 
    Clock, 
    CheckCircle, 
    AlertCircle, 
    Download, 
    Eye, 
    FileText,
    Calendar,
    TrendingUp,
    TrendingDown,
    Filter,
    Search,
    Receipt,
    Banknote,
    History,
    Send
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Adesua', href: dashboard().url },
    { title: 'Vendor', href: '/vendor' },
    { title: 'Payments', href: '/vendor/payments' },
];

type Payment = {
    id: number;
    invoiceNumber: string;
    contractReference: string;
    school: string;
    region: string;
    amount: number;
    currency: string;
    dueDate: string;
    status: 'pending' | 'paid' | 'overdue' | 'disputed' | 'cancelled';
    paymentDate?: string;
    paymentMethod?: string;
    description: string;
    category: 'supplies' | 'services' | 'equipment' | 'maintenance' | 'other';
    attachments?: {
        name: string;
        url: string;
        type: string;
    }[];
    notes?: string;
};

type PaymentStats = {
    totalInvoices: number;
    pendingPayments: number;
    paidAmount: number;
    overdueAmount: number;
    averagePaymentTime: number;
    currency: string;
    monthlyTrends: {
        month: string;
        invoiced: number;
        paid: number;
        pending: number;
    }[];
    categoryBreakdown: {
        category: string;
        amount: number;
        count: number;
    }[];
};

type VendorPaymentsProps = {
    payments?: Payment[];
    stats?: PaymentStats;
};

export default function VendorPayments() {
    const { payments, stats } = usePage().props as unknown as VendorPaymentsProps;
    
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pending': return <Badge variant="secondary" className="bg-yellow-500">Pending</Badge>;
            case 'paid': return <Badge variant="default" className="bg-green-500">Paid</Badge>;
            case 'overdue': return <Badge variant="destructive">Overdue</Badge>;
            case 'disputed': return <Badge variant="destructive">Disputed</Badge>;
            case 'cancelled': return <Badge variant="outline">Cancelled</Badge>;
            default: return <Badge variant="outline">Unknown</Badge>;
        }
    };

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'supplies': return <FileText className="h-4 w-4 text-blue-500" />;
            case 'services': return <CheckCircle className="h-4 w-4 text-green-500" />;
            case 'equipment': return <CreditCard className="h-4 w-4 text-purple-500" />;
            case 'maintenance': return <Clock className="h-4 w-4 text-orange-500" />;
            case 'other': return <DollarSign className="h-4 w-4 text-gray-500" />;
            default: return <DollarSign className="h-4 w-4 text-gray-500" />;
        }
    };

    const formatCurrency = (amount: number, currency: string = 'GHS') => {
        return new Intl.NumberFormat('en-GH', {
            style: 'currency',
            currency: currency,
        }).format(amount);
    };

    const getDaysOverdue = (dueDate: string) => {
        const due = new Date(dueDate);
        const today = new Date();
        const diffTime = today.getTime() - due.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : 0;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Vendor - Payment Management" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-semibold">Payment Management</h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Track invoices, payments, and financial transactions
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Export
                        </Button>
                        <Button variant="outline" size="sm">
                            <Send className="h-4 w-4 mr-2" />
                            Send Invoice
                        </Button>
                        <Button size="sm">
                            <Receipt className="h-4 w-4 mr-2" />
                            New Invoice
                        </Button>
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
                                        <div className="text-2xl font-bold text-blue-600">{stats.totalInvoices}</div>
                                        <div className="text-sm text-muted-foreground">Total Invoices</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-yellow-500" />
                                    <div>
                                        <div className="text-2xl font-bold text-yellow-600">{stats.pendingPayments}</div>
                                        <div className="text-sm text-muted-foreground">Pending</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <div>
                                        <div className="text-2xl font-bold text-green-600">
                                            {formatCurrency(stats.paidAmount, stats.currency)}
                                        </div>
                                        <div className="text-sm text-muted-foreground">Paid Amount</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center gap-2">
                                    <AlertCircle className="h-4 w-4 text-red-500" />
                                    <div>
                                        <div className="text-2xl font-bold text-red-600">
                                            {formatCurrency(stats.overdueAmount, stats.currency)}
                                        </div>
                                        <div className="text-sm text-muted-foreground">Overdue</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Search and Filters */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search invoices by number, school, or contract..."
                            className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <Button variant="outline">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                    </Button>
                </div>

                {/* Payments List */}
                <div className="grid grid-cols-1 gap-4">
                    {payments && payments.length > 0 ? (
                        payments.map((payment) => (
                            <Card key={payment.id}>
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                                                {getCategoryIcon(payment.category)}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-lg font-semibold">{payment.invoiceNumber}</h3>
                                                    <Badge variant="outline">{payment.contractReference}</Badge>
                                                    {getStatusBadge(payment.status)}
                                                    {payment.status === 'overdue' && (
                                                        <Badge variant="destructive">
                                                            {getDaysOverdue(payment.dueDate)} days overdue
                                                        </Badge>
                                                    )}
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                    <div className="space-y-2">
                                                        <div className="flex items-center gap-2">
                                                            <FileText className="h-4 w-4 text-muted-foreground" />
                                                            <span className="text-sm font-medium">School:</span>
                                                        </div>
                                                        <div className="text-sm text-muted-foreground ml-6">{payment.school}</div>
                                                        <div className="flex items-center gap-2">
                                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                                            <span className="text-sm">Due: {payment.dueDate}</span>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <div className="flex items-center gap-2">
                                                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                                                            <span className="text-sm font-medium">Amount:</span>
                                                        </div>
                                                        <div className="text-lg font-bold text-blue-600 ml-6">
                                                            {formatCurrency(payment.amount, payment.currency)}
                                                        </div>
                                                        {payment.paymentDate && (
                                                            <div className="flex items-center gap-2">
                                                                <CheckCircle className="h-4 w-4 text-muted-foreground" />
                                                                <span className="text-sm">Paid: {payment.paymentDate}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="space-y-2">
                                                        <div className="flex items-center gap-2">
                                                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                                                            <span className="text-sm font-medium">Description:</span>
                                                        </div>
                                                        <div className="text-sm text-muted-foreground ml-6">{payment.description}</div>
                                                        {payment.paymentMethod && (
                                                            <div className="flex items-center gap-2">
                                                                <Banknote className="h-4 w-4 text-muted-foreground" />
                                                                <span className="text-sm">Method: {payment.paymentMethod}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                {payment.attachments && payment.attachments.length > 0 && (
                                                    <div className="mt-3">
                                                        <div className="text-sm font-medium mb-1">Attachments:</div>
                                                        <div className="flex flex-wrap gap-1">
                                                            {payment.attachments.map((attachment, index) => (
                                                                <Badge key={index} variant="outline" className="text-xs">
                                                                    {attachment.name}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                                {payment.notes && (
                                                    <div className="mt-3">
                                                        <div className="text-sm font-medium mb-1">Notes:</div>
                                                        <div className="text-sm text-muted-foreground">{payment.notes}</div>
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
                                            {payment.status === 'pending' && (
                                                <Button variant="outline" size="sm">
                                                    <Send className="h-4 w-4" />
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
                                <CreditCard className="h-12 w-12 text-muted-foreground mb-4" />
                                <h3 className="text-lg font-medium mb-2">No Payments Found</h3>
                                <p className="text-sm text-muted-foreground text-center mb-4">
                                    No payment records available. Create your first invoice to get started.
                                </p>
                                <Button>
                                    <Receipt className="h-4 w-4 mr-2" />
                                    Create Invoice
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Monthly Trends */}
                {stats && stats.monthlyTrends.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5" />
                                Monthly Payment Trends
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {stats.monthlyTrends.map((trend, index) => (
                                    <div key={index} className="p-4 border rounded-lg">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="font-medium">{trend.month}</div>
                                            <div className="text-sm text-muted-foreground">
                                                {trend.count} invoices
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-blue-600">Invoiced</span>
                                                <span className="font-medium">{formatCurrency(trend.invoiced, stats.currency)}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-green-600">Paid</span>
                                                <span className="font-medium">{formatCurrency(trend.paid, stats.currency)}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-yellow-600">Pending</span>
                                                <span className="font-medium">{formatCurrency(trend.pending, stats.currency)}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Category Breakdown */}
                {stats && stats.categoryBreakdown.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BarChart3 className="h-5 w-5" />
                                Payment by Category
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                                {stats.categoryBreakdown.map((category, index) => (
                                    <div key={index} className="p-4 border rounded-lg">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="font-medium capitalize">{category.category}</div>
                                            <div className="text-sm text-muted-foreground">{category.count} invoices</div>
                                        </div>
                                        <div className="text-lg font-bold text-blue-600">
                                            {formatCurrency(category.amount, stats.currency)}
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
                            <Receipt className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                            <h3 className="font-medium mb-2">Create Invoice</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Generate new invoices for completed work
                            </p>
                            <Button variant="outline" className="w-full">
                                Create Invoice
                            </Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 text-center">
                            <Send className="h-8 w-8 text-green-500 mx-auto mb-3" />
                            <h3 className="font-medium mb-2">Send Reminders</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Send payment reminders to schools
                            </p>
                            <Button variant="outline" className="w-full">
                                Send Reminders
                            </Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 text-center">
                            <History className="h-8 w-8 text-purple-500 mx-auto mb-3" />
                            <h3 className="font-medium mb-2">Payment History</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                View detailed payment history
                            </p>
                            <Button variant="outline" className="w-full">
                                View History
                            </Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 text-center">
                            <Download className="h-8 w-8 text-orange-500 mx-auto mb-3" />
                            <h3 className="font-medium mb-2">Export Reports</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Download payment reports and statements
                            </p>
                            <Button variant="outline" className="w-full">
                                Export
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}


