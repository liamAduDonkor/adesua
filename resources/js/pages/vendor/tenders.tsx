import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { DataTable } from '@/components/tables/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Calendar, DollarSign, Eye, Send, Clock } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Adesua', href: dashboard().url },
    { title: 'Vendor', href: '/vendor' },
    { title: 'Tenders', href: '/vendor/tenders' },
];

type Tender = {
    id: number;
    title: string;
    reference: string;
    category: string;
    publishedDate: string;
    closingDate: string;
    budget: number;
    status: 'open' | 'closed' | 'awarded' | 'cancelled';
    school?: string;
    region?: string;
    submissionStatus?: 'not_submitted' | 'submitted' | 'shortlisted' | 'rejected' | 'awarded';
};

type VendorTendersProps = {
    tenders?: Tender[];
    stats?: {
        open: number;
        submitted: number;
        shortlisted: number;
        awarded: number;
    };
};

export default function VendorTenders() {
    const { tenders, stats } = usePage().props as unknown as VendorTendersProps;

    // Mock data if none provided
    const mockTenders: Tender[] = tenders || [
        {
            id: 1,
            title: 'Supply of Educational Materials',
            reference: 'TND-2025-001',
            category: 'Educational Supplies',
            publishedDate: '2025-09-01',
            closingDate: '2025-11-15',
            budget: 150000,
            status: 'open',
            school: 'Accra Academy',
            region: 'Greater Accra',
            submissionStatus: 'not_submitted',
        },
        {
            id: 2,
            title: 'School Furniture Procurement',
            reference: 'TND-2025-002',
            category: 'Furniture',
            publishedDate: '2025-09-15',
            closingDate: '2025-11-30',
            budget: 250000,
            status: 'open',
            school: 'Kumasi High School',
            region: 'Ashanti',
            submissionStatus: 'submitted',
        },
        {
            id: 3,
            title: 'IT Equipment and Services',
            reference: 'TND-2025-003',
            category: 'IT Equipment',
            publishedDate: '2025-08-01',
            closingDate: '2025-10-15',
            budget: 500000,
            status: 'closed',
            school: 'Multiple Schools',
            region: 'National',
            submissionStatus: 'shortlisted',
        },
        {
            id: 4,
            title: 'Catering Services',
            reference: 'TND-2024-089',
            category: 'Services',
            publishedDate: '2024-12-01',
            closingDate: '2025-01-31',
            budget: 300000,
            status: 'awarded',
            school: 'Wesley Girls School',
            region: 'Central',
            submissionStatus: 'awarded',
        },
    ];

    const mockStats = stats || {
        open: mockTenders.filter(t => t.status === 'open').length,
        submitted: mockTenders.filter(t => t.submissionStatus === 'submitted').length,
        shortlisted: mockTenders.filter(t => t.submissionStatus === 'shortlisted').length,
        awarded: mockTenders.filter(t => t.submissionStatus === 'awarded').length,
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'open':
                return <Badge className="bg-green-500">Open</Badge>;
            case 'closed':
                return <Badge variant="secondary">Closed</Badge>;
            case 'awarded':
                return <Badge className="bg-blue-500">Awarded</Badge>;
            case 'cancelled':
                return <Badge variant="destructive">Cancelled</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    const getSubmissionBadge = (status?: string) => {
        switch (status) {
            case 'not_submitted':
                return <Badge variant="outline">Not Submitted</Badge>;
            case 'submitted':
                return <Badge className="bg-blue-500">Submitted</Badge>;
            case 'shortlisted':
                return <Badge className="bg-purple-500">Shortlisted</Badge>;
            case 'rejected':
                return <Badge variant="destructive">Rejected</Badge>;
            case 'awarded':
                return <Badge className="bg-green-500">Awarded</Badge>;
            default:
                return null;
        }
    };

    const tenderColumns = [
        {
            key: 'reference',
            label: 'Reference',
            sortable: true,
        },
        {
            key: 'title',
            label: 'Title',
            sortable: true,
        },
        {
            key: 'category',
            label: 'Category',
            sortable: true,
        },
        {
            key: 'closingDate',
            label: 'Closing Date',
            sortable: true,
            render: (value: string) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        },
        {
            key: 'budget',
            label: 'Budget (GHS)',
            sortable: true,
            render: (value: number) => value.toLocaleString(),
        },
        {
            key: 'status',
            label: 'Status',
            render: (value: string) => getStatusBadge(value),
        },
        {
            key: 'submissionStatus',
            label: 'Submission',
            render: (value: string) => getSubmissionBadge(value),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Vendor - Tenders" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-semibold">Tenders</h1>
                        <p className="text-sm text-muted-foreground">
                            Browse and apply for available tenders
                        </p>
                    </div>
                    <Button>
                        <FileText className="h-4 w-4 mr-2" />
                        My Applications
                    </Button>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Open Tenders</CardTitle>
                            <FileText className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{mockStats.open}</div>
                            <p className="text-xs text-muted-foreground">Available to apply</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Submitted</CardTitle>
                            <Send className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{mockStats.submitted}</div>
                            <p className="text-xs text-muted-foreground">Applications sent</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Shortlisted</CardTitle>
                            <Clock className="h-4 w-4 text-purple-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{mockStats.shortlisted}</div>
                            <p className="text-xs text-muted-foreground">Under review</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Awarded</CardTitle>
                            <DollarSign className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{mockStats.awarded}</div>
                            <p className="text-xs text-muted-foreground">Contracts won</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Tenders Table */}
                <DataTable
                    data={mockTenders}
                    columns={tenderColumns}
                    title="Available Tenders"
                    searchPlaceholder="Search tenders..."
                    actions={(row) => (
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                            </Button>
                            {row.status === 'open' && row.submissionStatus === 'not_submitted' && (
                                <Button size="sm">
                                    Apply
                                </Button>
                            )}
                        </div>
                    )}
                />
            </div>
        </AppLayout>
    );
}


