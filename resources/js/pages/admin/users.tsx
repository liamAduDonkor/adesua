import { AppShell } from '@/components/app-shell';
import { Head } from '@inertiajs/react';

export default function AdminUsers() {
    return (
        <AppShell variant="sidebar">
            <Head title="Admin - Users" />
            <div className="p-6">
                <h1 className="text-xl font-semibold">Admin - Users</h1>
            </div>
        </AppShell>
    );
}


