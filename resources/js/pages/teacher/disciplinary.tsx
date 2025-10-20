import { AppShell } from '@/components/app-shell';
import { Head } from '@inertiajs/react';

export default function TeacherDisciplinary() {
    return (
        <AppShell variant="sidebar">
            <Head title="Teacher - Disciplinary" />
            <div className="p-6">
                <h1 className="text-xl font-semibold">Teacher - Disciplinary</h1>
            </div>
        </AppShell>
    );
}


