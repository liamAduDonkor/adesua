import AdminSidebarLayout from '@/layouts/app/admin-sidebar-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import GhanaRegionalMap from '@/components/charts/GhanaRegionalMap';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Adesua', href: dashboard().url },
    { title: 'Admin', href: '/admin' },
    { title: 'Analytics', href: '/admin/analytics' },
];

type AnalyticsProps = {
    stats: {
        total_teachers: number;
        total_students: number;
        total_vendors: number;
        total_schools: number;
    };
    teacherAnalytics: {
        average_performance: number;
        attendance_rate: number;
        punctuality_rate: number;
        performance_by_rating: Record<string, number>;
        top_performing_teachers: any[];
    };
    studentAnalytics: {
        average_performance: number;
        attendance_rate: number;
        punctuality_rate: number;
        performance_by_rating: Record<string, number>;
        top_performing_students: any[];
    };
    vendorAnalytics: {
        total_contracts: number;
        total_contract_value: number;
        total_amount_paid: number;
        average_delivery_performance: number;
        average_quality_rating: number;
        average_timeliness_rating: number;
        compliance_status: Record<string, number>;
        top_vendors_by_value: any[];
    };
    regionalAnalytics: {
        teachers_by_region: Array<{ region: string; count: number }>;
        students_by_region: Array<{ region: string; count: number }>;
        schools_by_region: Array<{ region: string; count: number }>;
    };
    performanceTrends: {
        teacher_performance: Array<{ academic_year: string; avg_score: number }>;
        student_performance: Array<{ academic_year: string; avg_score: number }>;
    };
};

export default function AdminAnalyticsDashboard() {
    const props = usePage().props as unknown as AnalyticsProps;
    const { stats, teacherAnalytics, studentAnalytics, vendorAnalytics, regionalAnalytics, performanceTrends } = props;

    return (
        <AdminSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin - Analytics Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-xl font-semibold">Analytics Dashboard</h1>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
                    Comprehensive performance analytics and insights across all entities.
                </p>

                {/* Overall Statistics */}
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-md border p-4">
                        <div className="text-sm text-neutral-500">Total Teachers</div>
                        <div className="mt-1 text-2xl font-semibold">{stats.total_teachers}</div>
                    </div>
                    <div className="rounded-md border p-4">
                        <div className="text-sm text-neutral-500">Total Students</div>
                        <div className="mt-1 text-2xl font-semibold">{stats.total_students}</div>
                    </div>
                    <div className="rounded-md border p-4">
                        <div className="text-sm text-neutral-500">Total Vendors</div>
                        <div className="mt-1 text-2xl font-semibold">{stats.total_vendors}</div>
                    </div>
                    <div className="rounded-md border p-4">
                        <div className="text-sm text-neutral-500">Total Schools</div>
                        <div className="mt-1 text-2xl font-semibold">{stats.total_schools}</div>
                    </div>
                </div>

                {/* Teacher Analytics */}
                <div className="rounded-md border p-4">
                    <h3 className="text-lg font-medium mb-4">Teacher Performance Analytics</h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="text-center">
                            <div className="text-sm text-neutral-500">Average Performance</div>
                            <div className="text-xl font-semibold">{teacherAnalytics.average_performance?.toFixed(1) || 'N/A'}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-sm text-neutral-500">Attendance Rate</div>
                            <div className="text-xl font-semibold">{teacherAnalytics.attendance_rate?.toFixed(1) || 'N/A'}%</div>
                        </div>
                        <div className="text-center">
                            <div className="text-sm text-neutral-500">Punctuality Rate</div>
                            <div className="text-xl font-semibold">{teacherAnalytics.punctuality_rate?.toFixed(1) || 'N/A'}%</div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <Link href="/admin/analytics/teachers" className="text-blue-600 hover:text-blue-800">
                            View Detailed Teacher Analytics →
                        </Link>
                    </div>
                </div>

                {/* Student Analytics */}
                <div className="rounded-md border p-4">
                    <h3 className="text-lg font-medium mb-4">Student Performance Analytics</h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="text-center">
                            <div className="text-sm text-neutral-500">Average Performance</div>
                            <div className="text-xl font-semibold">{studentAnalytics.average_performance?.toFixed(1) || 'N/A'}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-sm text-neutral-500">Attendance Rate</div>
                            <div className="text-xl font-semibold">{studentAnalytics.attendance_rate?.toFixed(1) || 'N/A'}%</div>
                        </div>
                        <div className="text-center">
                            <div className="text-sm text-neutral-500">Punctuality Rate</div>
                            <div className="text-xl font-semibold">{studentAnalytics.punctuality_rate?.toFixed(1) || 'N/A'}%</div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <Link href="/admin/analytics/students" className="text-blue-600 hover:text-blue-800">
                            View Detailed Student Analytics →
                        </Link>
                    </div>
                </div>

                {/* Vendor Analytics */}
                <div className="rounded-md border p-4">
                    <h3 className="text-lg font-medium mb-4">Vendor Analytics</h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="text-center">
                            <div className="text-sm text-neutral-500">Total Contracts</div>
                            <div className="text-xl font-semibold">{vendorAnalytics.total_contracts}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-sm text-neutral-500">Contract Value</div>
                            <div className="text-xl font-semibold">₵{vendorAnalytics.total_contract_value?.toLocaleString() || '0'}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-sm text-neutral-500">Amount Paid</div>
                            <div className="text-xl font-semibold">₵{vendorAnalytics.total_amount_paid?.toLocaleString() || '0'}</div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <Link href="/admin/analytics/vendors" className="text-blue-600 hover:text-blue-800">
                            View Detailed Vendor Analytics →
                        </Link>
                    </div>
                </div>

                {/* Ghana Regional Map */}
                <GhanaRegionalMap regionalData={regionalAnalytics} />

                {/* Regional Distribution */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="rounded-md border p-4">
                        <h4 className="font-medium mb-2">Teachers by Region</h4>
                        <ul className="space-y-1 text-sm">
                            {regionalAnalytics.teachers_by_region.map((item) => (
                                <li key={item.region} className="flex justify-between">
                                    <span>{item.region}</span>
                                    <span className="font-medium">{item.count}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="rounded-md border p-4">
                        <h4 className="font-medium mb-2">Students by Region</h4>
                        <ul className="space-y-1 text-sm">
                            {regionalAnalytics.students_by_region.map((item) => (
                                <li key={item.region} className="flex justify-between">
                                    <span>{item.region}</span>
                                    <span className="font-medium">{item.count}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="rounded-md border p-4">
                        <h4 className="font-medium mb-2">Schools by Region</h4>
                        <ul className="space-y-1 text-sm">
                            {regionalAnalytics.schools_by_region.map((item) => (
                                <li key={item.region} className="flex justify-between">
                                    <span>{item.region}</span>
                                    <span className="font-medium">{item.count}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                    <Link href="/admin/search/teachers" className="rounded-md border p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900">
                        <div className="font-medium">Search Teachers</div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-300">Find and analyze teacher performance.</div>
                    </Link>
                    <Link href="/admin/search/students" className="rounded-md border p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900">
                        <div className="font-medium">Search Students</div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-300">Find and analyze student performance.</div>
                    </Link>
                    <Link href="/admin/search/vendors" className="rounded-md border p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900">
                        <div className="font-medium">Search Vendors</div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-300">Find and analyze vendor statistics.</div>
                    </Link>
                </div>
            </div>
        </AdminSidebarLayout>
    );
}
