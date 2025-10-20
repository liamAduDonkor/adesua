import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Adesua', href: dashboard().url },
    { title: 'Vendor', href: '/vendor' },
];

export default function VendorHome() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Vendor - Home" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-xl font-semibold">Vendor - Home</h1>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
                    Manage profile, tenders, payments and compliance.
                </p>
                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Link href="/vendor/tenders" className="rounded-md border p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900">
                        <div className="font-medium">Tenders</div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-300">Browse and respond.</div>
                    </Link>
                    <Link href="/vendor/payments" className="rounded-md border p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900">
                        <div className="font-medium">Payments</div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-300">Invoices and payouts.</div>
                    </Link>
                    <Link href="/vendor/compliance" className="rounded-md border p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900">
                        <div className="font-medium">Compliance</div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-300">Tax clearance & verification.</div>
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}


