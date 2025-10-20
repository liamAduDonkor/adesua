import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Adesua', href: dashboard().url },
    { title: 'Student', href: '/student' },
];

export default function StudentHome() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Student - Home" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-xl font-semibold">Student - Home</h1>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
                    Access your profile, attendance, academics, wallet and reports.
                </p>

                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Link href="/student/profile" className="rounded-md border p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900">
                        <div className="font-medium">Profile</div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-300">View and update your details.</div>
                    </Link>
                    <Link href="/student/attendance" className="rounded-md border p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900">
                        <div className="font-medium">Attendance</div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-300">Calendar and daily summary.</div>
                    </Link>
                    <Link href="/student/academics" className="rounded-md border p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900">
                        <div className="font-medium">Academics</div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-300">Courses and performance.</div>
                    </Link>
                    <Link href="/student/wallet" className="rounded-md border p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900">
                        <div className="font-medium">Wallet</div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-300">Balance, top-up, and history.</div>
                    </Link>
                    <Link href="/student/reports" className="rounded-md border p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900">
                        <div className="font-medium">Reports</div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-300">Academic reports and downloads.</div>
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}


