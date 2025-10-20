import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Adesua', href: dashboard().url },
    { title: 'Teacher', href: '/teacher' },
];

type DashboardProps = {
    dashboard?: {
        studentsTotal: number;
        classesCount: number;
        studentsByClass: { class: string; total: number }[];
    };
};

export default function TeacherHome() {
    const { dashboard: data } = usePage().props as unknown as DashboardProps;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Teacher - Home" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-xl font-semibold">Teacher - Home</h1>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
                    Take attendance, track performance, submit reports and incidents.
                </p>
                {data && (
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="rounded-md border p-4">
                            <div className="text-sm text-neutral-500">Students</div>
                            <div className="mt-1 text-2xl font-semibold">{data.studentsTotal}</div>
                        </div>
                        <div className="rounded-md border p-4">
                            <div className="text-sm text-neutral-500">Classes</div>
                            <div className="mt-1 text-2xl font-semibold">{data.classesCount}</div>
                        </div>
                        <div className="rounded-md border p-4">
                            <div className="text-sm text-neutral-500">By Class</div>
                            <ul className="mt-2 space-y-1 text-sm">
                                {data.studentsByClass.map((row) => (
                                    <li key={row.class} className="flex items-center justify-between">
                                        <span>{row.class}</span>
                                        <span className="font-medium">{row.total}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Link href="/teacher/attendance" className="rounded-md border p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900">
                        <div className="font-medium">Attendance</div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-300">Daily class logging.</div>
                    </Link>
                    <Link href="/teacher/performance" className="rounded-md border p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900">
                        <div className="font-medium">Performance</div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-300">Analytics & remediation.</div>
                    </Link>
                    <Link href="/teacher/reports" className="rounded-md border p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900">
                        <div className="font-medium">Reports</div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-300">Generate and export.</div>
                    </Link>
                    <Link href="/teacher/disciplinary" className="rounded-md border p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900">
                        <div className="font-medium">Disciplinary</div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-300">Submit incident reports.</div>
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}


