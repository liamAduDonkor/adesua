import { AppShell } from '@/components/app-shell';
import { Head } from '@inertiajs/react';

export default function SchoolFinance() {
    return (
        <AppShell variant="sidebar">
            <Head title="School - Finance" />
            <div className="p-6">
                <h1 className="text-xl font-semibold">School - Finance</h1>
            </div>
        </AppShell>
    );
}


