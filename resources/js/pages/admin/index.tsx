import AdminSidebarLayout from '@/layouts/app/admin-sidebar-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Adesua', href: dashboard().url },
    { title: 'Admin', href: '/admin' },
];

type DashboardProps = {
    dashboard?: {
        teachersTotal: number;
        studentsTotal: number;
        schoolsTotal: number;
        studentsByRegion: { region: string; total: number }[];
        teachersByRegion: { region: string; total: number }[];
    };
};

export default function AdminHome() {
    const { dashboard: data } = usePage().props as unknown as DashboardProps;
    return (
        <AdminSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin - Home" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-xl font-semibold">Admin - Home</h1>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
                    National dashboards, compliance, reports and user management.
                </p>
                {data && (
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="rounded-md border p-4">
                            <div className="text-sm text-neutral-500">Teachers</div>
                            <div className="mt-1 text-2xl font-semibold">{data.teachersTotal}</div>
                        </div>
                        <div className="rounded-md border p-4">
                            <div className="text-sm text-neutral-500">Students</div>
                            <div className="mt-1 text-2xl font-semibold">{data.studentsTotal}</div>
                        </div>
                        <div className="rounded-md border p-4">
                            <div className="text-sm text-neutral-500">Schools</div>
                            <div className="mt-1 text-2xl font-semibold">{data.schoolsTotal}</div>
                        </div>
                        <div className="rounded-md border p-4 sm:col-span-3">
                            <div className="text-sm font-medium">Students by Region</div>
                            <ul className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 text-sm">
                                {data.studentsByRegion.map((row) => (
                                    <li key={row.region} className="flex items-center justify-between rounded border p-2">
                                        <span>{row.region}</span>
                                        <span className="font-medium">{row.total}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="rounded-md border p-4 sm:col-span-3">
                            <div className="text-sm font-medium">Teachers by Region</div>
                            <ul className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 text-sm">
                                {data.teachersByRegion.map((row) => (
                                    <li key={row.region} className="flex items-center justify-between rounded border p-2">
                                        <span>{row.region}</span>
                                        <span className="font-medium">{row.total}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Link href="/admin/analytics" className="rounded-md border p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900">
                        <div className="font-medium">Analytics Dashboard</div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-300">Comprehensive performance analytics.</div>
                    </Link>
                    <Link href="/admin/search/teachers" className="rounded-md border p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900">
                        <div className="font-medium">Search Teachers</div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-300">Find teachers and view performance.</div>
                    </Link>
                    <Link href="/admin/search/students" className="rounded-md border p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900">
                        <div className="font-medium">Search Students</div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-300">Find students and view performance.</div>
                    </Link>
                    <Link href="/admin/search/vendors" className="rounded-md border p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900">
                        <div className="font-medium">Search Vendors</div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-300">Find vendors and view statistics.</div>
                    </Link>
                    <Link href="/admin/kpi" className="rounded-md border p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900">
                        <div className="font-medium">KPI</div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-300">Key performance indicators.</div>
                    </Link>
                    <Link href="/admin/compliance" className="rounded-md border p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900">
                        <div className="font-medium">Compliance</div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-300">School compliance scorecards.</div>
                    </Link>
                    <Link href="/admin/reports" className="rounded-md border p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900">
                        <div className="font-medium">Reports</div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-300">Generate & export reports.</div>
                    </Link>
                    <Link href="/admin/users" className="rounded-md border p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900">
                        <div className="font-medium">Users</div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-300">Manage system users.</div>
                    </Link>
                </div>
            </div>
        </AdminSidebarLayout>
    );
}


