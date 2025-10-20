import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
    Wallet, 
    Plus, 
    CreditCard, 
    History, 
    Lock, 
    Smartphone, 
    DollarSign,
    TrendingUp,
    TrendingDown,
    Users,
    School,
    Calendar,
    Download,
    Upload,
    Settings,
    Shield,
    AlertCircle,
    CheckCircle
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Adesua', href: dashboard().url },
    { title: 'Parent', href: '/parent' },
    { title: 'Wallet', href: '/parent/wallet' },
];

type Transaction = {
    id: string;
    type: 'credit' | 'debit';
    amount: number;
    description: string;
    date: string;
    status: 'completed' | 'pending' | 'failed';
    category: 'topup' | 'school_payment' | 'refund' | 'transfer' | 'fee';
    childName?: string;
    school?: string;
    reference?: string;
};

type SpendingLimit = {
    daily: number;
    monthly: number;
    perChild: number;
    remaining: {
        daily: number;
        monthly: number;
    };
};

type WalletData = {
    balance: number;
    currency: string;
    isLocked: boolean;
    transactions: Transaction[];
    spendingLimits: SpendingLimit;
    children: {
        id: number;
        name: string;
        balance: number;
        spendingThisMonth: number;
    }[];
    monthlySpending: {
        month: string;
        amount: number;
        transactions: number;
    }[];
};

type ParentWalletProps = {
    wallet?: WalletData;
};

export default function ParentWallet() {
    const { wallet } = usePage().props as unknown as ParentWalletProps;
    
    const formatCurrency = (amount: number, currency: string = 'GHS') => {
        return new Intl.NumberFormat('en-GH', {
            style: 'currency',
            currency: currency,
        }).format(amount);
    };

    const getTransactionIcon = (type: string, category: string) => {
        if (type === 'credit') {
            switch (category) {
                case 'topup': return <Plus className="h-4 w-4 text-green-500" />;
                case 'refund': return <TrendingUp className="h-4 w-4 text-blue-500" />;
                default: return <Plus className="h-4 w-4 text-green-500" />;
            }
        } else {
            switch (category) {
                case 'school_payment': return <School className="h-4 w-4 text-purple-500" />;
                case 'transfer': return <CreditCard className="h-4 w-4 text-orange-500" />;
                case 'fee': return <DollarSign className="h-4 w-4 text-red-500" />;
                default: return <CreditCard className="h-4 w-4 text-red-500" />;
            }
        }
    };

    const getTransactionBadge = (status: string) => {
        switch (status) {
            case 'completed': return <Badge variant="default" className="bg-green-500">Completed</Badge>;
            case 'pending': return <Badge variant="secondary" className="bg-yellow-500">Pending</Badge>;
            case 'failed': return <Badge variant="destructive">Failed</Badge>;
            default: return <Badge variant="outline">Unknown</Badge>;
        }
    };

    const getCategoryBadge = (category: string) => {
        switch (category) {
            case 'topup': return <Badge variant="outline" className="bg-green-100 text-green-800">Top-up</Badge>;
            case 'school_payment': return <Badge variant="outline" className="bg-purple-100 text-purple-800">School Payment</Badge>;
            case 'refund': return <Badge variant="outline" className="bg-blue-100 text-blue-800">Refund</Badge>;
            case 'transfer': return <Badge variant="outline" className="bg-orange-100 text-orange-800">Transfer</Badge>;
            case 'fee': return <Badge variant="outline" className="bg-red-100 text-red-800">Fee</Badge>;
            default: return <Badge variant="outline">Other</Badge>;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Parent - Wallet" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-semibold">Family Wallet</h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Manage funds for your children's school expenses
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <History className="h-4 w-4 mr-2" />
                            History
                        </Button>
                        <Button size="sm">
                            <Plus className="h-4 w-4 mr-2" />
                            Top Up
                        </Button>
                    </div>
                </div>

                {wallet ? (
                    <div className="grid grid-cols-1 gap-6">
                        {/* Balance Card */}
                        <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Wallet className="h-5 w-5" />
                                    Family Wallet Balance
                                    {wallet.isLocked && (
                                        <Lock className="h-4 w-4 ml-auto" />
                                    )}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold mb-2">
                                    {formatCurrency(wallet.balance, wallet.currency)}
                                </div>
                                {wallet.isLocked && (
                                    <div className="text-sm opacity-90">
                                        Wallet is locked for security
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Spending Limits */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Calendar className="h-5 w-5" />
                                        Daily Limit
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-blue-600">
                                        {formatCurrency(wallet.spendingLimits.daily, wallet.currency)}
                                    </div>
                                    <div className="text-sm text-muted-foreground mt-1">
                                        Remaining: {formatCurrency(wallet.spendingLimits.remaining.daily, wallet.currency)}
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <TrendingUp className="h-5 w-5" />
                                        Monthly Limit
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-green-600">
                                        {formatCurrency(wallet.spendingLimits.monthly, wallet.currency)}
                                    </div>
                                    <div className="text-sm text-muted-foreground mt-1">
                                        Remaining: {formatCurrency(wallet.spendingLimits.remaining.monthly, wallet.currency)}
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Users className="h-5 w-5" />
                                        Per Child Limit
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-purple-600">
                                        {formatCurrency(wallet.spendingLimits.perChild, wallet.currency)}
                                    </div>
                                    <div className="text-sm text-muted-foreground mt-1">
                                        Maximum per child
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Children Overview */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Users className="h-5 w-5" />
                                    Children Spending Overview
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {wallet.children.map((child) => (
                                        <div key={child.id} className="p-4 border rounded-lg">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="font-medium">{child.name}</div>
                                                <div className="text-sm text-muted-foreground">
                                                    {formatCurrency(child.balance, wallet.currency)}
                                                </div>
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                Spent this month: {formatCurrency(child.spendingThisMonth, wallet.currency)}
                                            </div>
                                            <div className="mt-2 flex gap-2">
                                                <Button variant="outline" size="sm">
                                                    <Plus className="h-3 w-3 mr-1" />
                                                    Add Funds
                                                </Button>
                                                <Button variant="outline" size="sm">
                                                    <History className="h-3 w-3 mr-1" />
                                                    History
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Recent Transactions */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <History className="h-5 w-5" />
                                    Recent Transactions
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {wallet.transactions.length > 0 ? (
                                        wallet.transactions.slice(0, 10).map((transaction) => (
                                            <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                                                <div className="flex items-center gap-3">
                                                    {getTransactionIcon(transaction.type, transaction.category)}
                                                    <div>
                                                        <div className="font-medium">{transaction.description}</div>
                                                        <div className="text-sm text-muted-foreground">
                                                            {transaction.date}
                                                            {transaction.childName && ` • ${transaction.childName}`}
                                                            {transaction.school && ` • ${transaction.school}`}
                                                        </div>
                                                        {transaction.reference && (
                                                            <div className="text-xs text-muted-foreground">
                                                                Ref: {transaction.reference}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className={`font-medium ${
                                                        transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                                                    }`}>
                                                        {transaction.type === 'credit' ? '+' : '-'}
                                                        {formatCurrency(transaction.amount, wallet.currency)}
                                                    </div>
                                                    {getCategoryBadge(transaction.category)}
                                                    {getTransactionBadge(transaction.status)}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-8 text-muted-foreground">
                                            <History className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                            <h3 className="text-lg font-medium mb-2">No Transactions Yet</h3>
                                            <p className="text-sm">
                                                Your transaction history will appear here.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Actions */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <Card>
                                <CardContent className="p-6 text-center">
                                    <Plus className="h-8 w-8 text-green-500 mx-auto mb-3" />
                                    <h3 className="font-medium mb-2">Top Up Wallet</h3>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Add funds to your family wallet
                                    </p>
                                    <Button variant="outline" className="w-full">
                                        Add Funds
                                    </Button>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-6 text-center">
                                    <CreditCard className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                                    <h3 className="font-medium mb-2">Pay School Fees</h3>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Make payments for school expenses
                                    </p>
                                    <Button variant="outline" className="w-full">
                                        Make Payment
                                    </Button>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-6 text-center">
                                    <Download className="h-8 w-8 text-purple-500 mx-auto mb-3" />
                                    <h3 className="font-medium mb-2">Export Statement</h3>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Download transaction history
                                    </p>
                                    <Button variant="outline" className="w-full">
                                        Export PDF
                                    </Button>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-6 text-center">
                                    <Settings className="h-8 w-8 text-orange-500 mx-auto mb-3" />
                                    <h3 className="font-medium mb-2">Wallet Settings</h3>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Manage spending limits and preferences
                                    </p>
                                    <Button variant="outline" className="w-full">
                                        Settings
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Monthly Spending Trends */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5" />
                                    Monthly Spending Trends
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {wallet.monthlySpending.map((month, index) => (
                                        <div key={index} className="p-4 border rounded-lg">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="font-medium">{month.month}</div>
                                                <div className="text-sm text-muted-foreground">
                                                    {month.transactions} transactions
                                                </div>
                                            </div>
                                            <div className="text-lg font-bold text-blue-600">
                                                {formatCurrency(month.amount, wallet.currency)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ) : (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-8">
                            <Wallet className="h-12 w-12 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-medium mb-2">Wallet Not Available</h3>
                            <p className="text-sm text-muted-foreground text-center">
                                Your wallet information is not available. Please contact your school administrator.
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}


