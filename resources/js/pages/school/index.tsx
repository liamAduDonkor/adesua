import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Adesua', href: dashboard().url },
    { title: 'School', href: '/school' },
];

export default function SchoolHome() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="School - Home" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-xl font-semibold">School - Home</h1>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
                    Staff, students, finance, and school dashboards at a glance.
                </p>
                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Link href="/school/staff" className="rounded-md border p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900">
                        <div className="font-medium">Staff</div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-300">Manage staff and deployment.</div>
                    </Link>
                    <Link href="/school/students" className="rounded-md border p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900">
                        <div className="font-medium">Students</div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-300">Registry and attendance.</div>
                    </Link>
                    <Link href="/school/dashboard" className="rounded-md border p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900">
                        <div className="font-medium">Dashboard</div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-300">Compliance and KPIs.</div>
                    </Link>
                    <Link href="/school/finance" className="rounded-md border p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900">
                        <div className="font-medium">Finance</div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-300">Fees and budget overview.</div>
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}


