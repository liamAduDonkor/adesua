import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Adesua', href: dashboard().url },
    { title: 'Parent', href: '/parent' },
];

type DashboardProps = {
    dashboard?: {
        children: { id: number; name: string; class: string | null; school: string | null }[];
        reportsCount: number;
    };
};

export default function ParentHome() {
    const { dashboard: data } = usePage().props as unknown as DashboardProps;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Parent - Home" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-xl font-semibold">Parent - Home</h1>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
                    Manage children, approvals, wallet and notifications.
                </p>
                {data && (
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="rounded-md border p-4">
                            <div className="text-sm text-neutral-500">Linked Children</div>
                            <div className="mt-1 text-2xl font-semibold">{data.children.length}</div>
                        </div>
                        <div className="rounded-md border p-4">
                            <div className="text-sm text-neutral-500">Teacher Reports</div>
                            <div className="mt-1 text-2xl font-semibold">{data.reportsCount}</div>
                        </div>
                        <div className="rounded-md border p-4 sm:col-span-3">
                            <div className="text-sm font-medium">Children</div>
                            {data.children.length === 0 ? (
                                <div className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">No children linked yet.</div>
                            ) : (
                                <ul className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 text-sm">
                                    {data.children.map((c) => (
                                        <li key={c.id} className="rounded border p-2">
                                            <div className="font-medium">{c.name}</div>
                                            <div className="text-neutral-600 dark:text-neutral-300">{c.class ?? 'Class N/A'}</div>
                                            <div className="text-neutral-600 dark:text-neutral-300">{c.school ?? 'School N/A'}</div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                )}
                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Link href="/parent/children" className="rounded-md border p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900">
                        <div className="font-medium">Children</div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-300">View linked student accounts.</div>
                    </Link>
                    <Link href="/parent/approvals" className="rounded-md border p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900">
                        <div className="font-medium">Approvals</div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-300">Approve purchases and requests.</div>
                    </Link>
                    <Link href="/parent/wallet" className="rounded-md border p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900">
                        <div className="font-medium">Wallet</div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-300">Load funds and review history.</div>
                    </Link>
                    <Link href="/parent/notifications" className="rounded-md border p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900">
                        <div className="font-medium">Notifications</div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-300">Alerts for attendance and spending.</div>
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}


