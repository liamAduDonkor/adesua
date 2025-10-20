import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
    CheckCircle, 
    XCircle, 
    Clock, 
    AlertCircle, 
    DollarSign, 
    BookOpen, 
    Calendar,
    User,
    School,
    CreditCard,
    FileText,
    Eye,
    Check,
    X
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Adesua', href: dashboard().url },
    { title: 'Parent', href: '/parent' },
    { title: 'Approvals', href: '/parent/approvals' },
];

type ApprovalRequest = {
    id: string;
    childName: string;
    childId: string;
    requestType: 'purchase' | 'activity' | 'trip' | 'equipment' | 'meal' | 'uniform';
    title: string;
    description: string;
    amount?: number;
    currency: string;
    requestedDate: string;
    dueDate: string;
    status: 'pending' | 'approved' | 'rejected' | 'expired';
    school: string;
    teacher?: string;
    attachments?: {
        name: string;
        url: string;
        type: string;
    }[];
    priority: 'low' | 'medium' | 'high' | 'urgent';
};

type ParentApprovalsProps = {
    approvals?: ApprovalRequest[];
    summary: {
        pending: number;
        approved: number;
        rejected: number;
        totalAmount: number;
    };
};

export default function ParentApprovals() {
    const { approvals, summary } = usePage().props as unknown as ParentApprovalsProps;
    
    const getRequestIcon = (type: string) => {
        switch (type) {
            case 'purchase': return <CreditCard className="h-4 w-4 text-blue-500" />;
            case 'activity': return <BookOpen className="h-4 w-4 text-green-500" />;
            case 'trip': return <School className="h-4 w-4 text-purple-500" />;
            case 'equipment': return <FileText className="h-4 w-4 text-orange-500" />;
            case 'meal': return <DollarSign className="h-4 w-4 text-yellow-500" />;
            case 'uniform': return <User className="h-4 w-4 text-pink-500" />;
            default: return <AlertCircle className="h-4 w-4 text-gray-500" />;
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pending': return <Badge variant="secondary" className="bg-yellow-500">Pending</Badge>;
            case 'approved': return <Badge variant="default" className="bg-green-500">Approved</Badge>;
            case 'rejected': return <Badge variant="destructive">Rejected</Badge>;
            case 'expired': return <Badge variant="outline" className="bg-gray-500">Expired</Badge>;
            default: return <Badge variant="outline">Unknown</Badge>;
        }
    };

    const getPriorityBadge = (priority: string) => {
        switch (priority) {
            case 'urgent': return <Badge variant="destructive">Urgent</Badge>;
            case 'high': return <Badge variant="default" className="bg-red-500">High</Badge>;
            case 'medium': return <Badge variant="secondary" className="bg-yellow-500">Medium</Badge>;
            case 'low': return <Badge variant="outline">Low</Badge>;
            default: return <Badge variant="outline">Unknown</Badge>;
        }
    };

    const formatCurrency = (amount: number, currency: string = 'GHS') => {
        return new Intl.NumberFormat('en-GH', {
            style: 'currency',
            currency: currency,
        }).format(amount);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Parent - Approvals" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-semibold">Approval Requests</h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Review and approve requests from your children's school
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <Calendar className="h-4 w-4 mr-2" />
                            Calendar View
                        </Button>
                        <Button size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View All
                        </Button>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-yellow-500" />
                                <div>
                                    <div className="text-2xl font-bold text-yellow-600">{summary.pending}</div>
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
                                    <div className="text-2xl font-bold text-green-600">{summary.approved}</div>
                                    <div className="text-sm text-muted-foreground">Approved</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2">
                                <XCircle className="h-4 w-4 text-red-500" />
                                <div>
                                    <div className="text-2xl font-bold text-red-600">{summary.rejected}</div>
                                    <div className="text-sm text-muted-foreground">Rejected</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2">
                                <DollarSign className="h-4 w-4 text-blue-500" />
                                <div>
                                    <div className="text-2xl font-bold text-blue-600">
                                        {formatCurrency(summary.totalAmount)}
                                    </div>
                                    <div className="text-sm text-muted-foreground">Total Amount</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Approval Requests */}
                <div className="space-y-4">
                    {approvals && approvals.length > 0 ? (
                        approvals.map((approval) => (
                            <Card key={approval.id}>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="flex items-center gap-2">
                                            {getRequestIcon(approval.requestType)}
                                            {approval.title}
                                        </CardTitle>
                                        <div className="flex items-center gap-2">
                                            {getPriorityBadge(approval.priority)}
                                            {getStatusBadge(approval.status)}
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                                        {/* Request Details */}
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3">
                                                <User className="h-4 w-4 text-muted-foreground" />
                                                <div>
                                                    <div className="font-medium">{approval.childName}</div>
                                                    <div className="text-sm text-muted-foreground">Student ID: {approval.childId}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <School className="h-4 w-4 text-muted-foreground" />
                                                <div>
                                                    <div className="font-medium">{approval.school}</div>
                                                    <div className="text-sm text-muted-foreground">School</div>
                                                </div>
                                            </div>
                                            {approval.teacher && (
                                                <div className="flex items-center gap-3">
                                                    <User className="h-4 w-4 text-muted-foreground" />
                                                    <div>
                                                        <div className="font-medium">{approval.teacher}</div>
                                                        <div className="text-sm text-muted-foreground">Teacher</div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Request Information */}
                                        <div className="space-y-3">
                                            <div>
                                                <div className="font-medium mb-1">Description</div>
                                                <div className="text-sm text-muted-foreground">{approval.description}</div>
                                            </div>
                                            {approval.amount && (
                                                <div className="flex items-center gap-3">
                                                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                                                    <div>
                                                        <div className="font-medium">{formatCurrency(approval.amount, approval.currency)}</div>
                                                        <div className="text-sm text-muted-foreground">Amount</div>
                                                    </div>
                                                </div>
                                            )}
                                            <div className="flex items-center gap-3">
                                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                                <div>
                                                    <div className="font-medium">{approval.dueDate}</div>
                                                    <div className="text-sm text-muted-foreground">Due Date</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="space-y-3">
                                            {approval.status === 'pending' && (
                                                <div className="space-y-2">
                                                    <Button className="w-full" size="sm">
                                                        <Check className="h-4 w-4 mr-2" />
                                                        Approve
                                                    </Button>
                                                    <Button variant="destructive" className="w-full" size="sm">
                                                        <X className="h-4 w-4 mr-2" />
                                                        Reject
                                                    </Button>
                                                </div>
                                            )}
                                            
                                            {approval.attachments && approval.attachments.length > 0 && (
                                                <div>
                                                    <div className="font-medium mb-2">Attachments</div>
                                                    <div className="space-y-1">
                                                        {approval.attachments.map((attachment, index) => (
                                                            <div key={index} className="flex items-center gap-2 text-sm">
                                                                <FileText className="h-3 w-3 text-muted-foreground" />
                                                                <span className="text-muted-foreground">{attachment.name}</span>
                                                                <Button variant="outline" size="sm">
                                                                    <Eye className="h-3 w-3" />
                                                                </Button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            <div className="text-xs text-muted-foreground">
                                                Requested: {approval.requestedDate}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <Card>
                            <CardContent className="flex flex-col items-center justify-center py-8">
                                <CheckCircle className="h-12 w-12 text-muted-foreground mb-4" />
                                <h3 className="text-lg font-medium mb-2">No Approval Requests</h3>
                                <p className="text-sm text-muted-foreground text-center">
                                    You don't have any pending approval requests at the moment.
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                        <CardContent className="p-6 text-center">
                            <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-3" />
                            <h3 className="font-medium mb-2">Bulk Approve</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Approve multiple requests at once
                            </p>
                            <Button variant="outline" className="w-full">
                                Bulk Approve
                            </Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 text-center">
                            <Calendar className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                            <h3 className="font-medium mb-2">Approval History</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                View all past approval decisions
                            </p>
                            <Button variant="outline" className="w-full">
                                View History
                            </Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 text-center">
                            <AlertCircle className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
                            <h3 className="font-medium mb-2">Set Preferences</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Configure automatic approval settings
                            </p>
                            <Button variant="outline" className="w-full">
                                Preferences
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}


