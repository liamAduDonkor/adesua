import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Wallet, Plus, CreditCard, History, Lock, Smartphone } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Adesua', href: dashboard().url },
    { title: 'Student', href: '/student' },
    { title: 'Wallet', href: '/student/wallet' },
];

type WalletData = {
    balance: number;
    currency: string;
    isLocked: boolean;
    recentTransactions: {
        id: string;
        type: 'credit' | 'debit';
        amount: number;
        description: string;
        date: string;
        status: 'completed' | 'pending' | 'failed';
    }[];
    spendingLimits: {
        daily: number;
        monthly: number;
        remaining: {
            daily: number;
            monthly: number;
        };
    };
};

type StudentWalletProps = {
    wallet?: WalletData;
};

export default function StudentWallet() {
    const { wallet } = usePage().props as unknown as StudentWalletProps;
    
    const formatCurrency = (amount: number, currency: string = 'GHS') => {
        return new Intl.NumberFormat('en-GH', {
            style: 'currency',
            currency: currency,
        }).format(amount);
    };

    const getTransactionIcon = (type: string) => {
        return type === 'credit' ? (
            <Plus className="h-4 w-4 text-green-500" />
        ) : (
            <CreditCard className="h-4 w-4 text-red-500" />
        );
    };

    const getTransactionBadge = (status: string) => {
        switch (status) {
            case 'completed': return <Badge variant="default" className="bg-green-500">Completed</Badge>;
            case 'pending': return <Badge variant="secondary" className="bg-yellow-500">Pending</Badge>;
            case 'failed': return <Badge variant="destructive">Failed</Badge>;
            default: return <Badge variant="outline">Unknown</Badge>;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Student - Wallet" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">G-NEMFIS Wallet</h1>
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
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        {/* Balance Card */}
                        <div className="lg:col-span-3">
                            <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Wallet className="h-5 w-5" />
                                        Current Balance
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
                        </div>

                        {/* Spending Limits */}
                        <div className="lg:col-span-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Smartphone className="h-5 w-5" />
                                        Spending Limits
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div className="p-4 border rounded-lg">
                                            <div className="text-sm text-muted-foreground mb-1">Daily Limit</div>
                                            <div className="text-lg font-semibold">
                                                {formatCurrency(wallet.spendingLimits.daily, wallet.currency)}
                                            </div>
                                            <div className="text-sm text-muted-foreground mt-1">
                                                Remaining: {formatCurrency(wallet.spendingLimits.remaining.daily, wallet.currency)}
                                            </div>
                                        </div>
                                        <div className="p-4 border rounded-lg">
                                            <div className="text-sm text-muted-foreground mb-1">Monthly Limit</div>
                                            <div className="text-lg font-semibold">
                                                {formatCurrency(wallet.spendingLimits.monthly, wallet.currency)}
                                            </div>
                                            <div className="text-sm text-muted-foreground mt-1">
                                                Remaining: {formatCurrency(wallet.spendingLimits.remaining.monthly, wallet.currency)}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Quick Actions */}
                        <div>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Quick Actions</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <Button className="w-full" variant="outline">
                                        <Plus className="h-4 w-4 mr-2" />
                                        Top Up Wallet
                                    </Button>
                                    <Button className="w-full" variant="outline">
                                        <CreditCard className="h-4 w-4 mr-2" />
                                        Pay at School
                                    </Button>
                                    <Button className="w-full" variant="outline">
                                        <History className="h-4 w-4 mr-2" />
                                        Transaction History
                                    </Button>
                                    <Button className="w-full" variant="outline">
                                        <Lock className="h-4 w-4 mr-2" />
                                        Security Settings
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Recent Transactions */}
                        <div className="lg:col-span-3">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <History className="h-5 w-5" />
                                        Recent Transactions
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {wallet.recentTransactions.length > 0 ? (
                                            wallet.recentTransactions.map((transaction) => (
                                                <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                                                    <div className="flex items-center gap-3">
                                                        {getTransactionIcon(transaction.type)}
                                                        <div>
                                                            <div className="font-medium">{transaction.description}</div>
                                                            <div className="text-sm text-muted-foreground">{transaction.date}</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className={`font-medium ${
                                                            transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                                                        }`}>
                                                            {transaction.type === 'credit' ? '+' : '-'}
                                                            {formatCurrency(transaction.amount, wallet.currency)}
                                                        </div>
                                                        {getTransactionBadge(transaction.status)}
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-8 text-muted-foreground">
                                                No recent transactions
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
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


