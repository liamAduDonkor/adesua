import { AppShell } from '@/components/app-shell';
import { Head } from '@inertiajs/react';

export default function ParentNotifications() {
    return (
        <AppShell variant="sidebar">
            <Head title="Parent - Notifications" />
            <div className="p-6">
                <h1 className="text-xl font-semibold">Parent - Notifications</h1>
            </div>
        </AppShell>
    );
}


