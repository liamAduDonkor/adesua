import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BreadcrumbItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export default function AdminSchoolsShow() {
    const { props } = usePage<{ school: any; stats: { teachers: number; students: number } }>();
    const { school, stats } = props;

    const breadcrumbs: BreadcrumbItem[] = [
        { label: 'Admin', href: route('dashboard') },
        { label: 'Schools', href: route('admin.schools.index') },
        { label: school.name },
    ];

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="p-4 md:col-span-2 space-y-2">
                    <h2 className="text-xl font-semibold">{school.name}</h2>
                    <div className="text-sm text-muted-foreground">Code: {school.code}</div>
                    <div className="text-sm">{school.address}</div>
                    <div className="text-sm">{school.city}, {school.region}</div>
                    <div className="text-sm">{school.phone}</div>
                </Card>

                <div className="grid gap-4">
                    <Card className="p-4">
                        <div className="text-sm text-muted-foreground">Teachers</div>
                        <div className="text-2xl font-bold">{stats.teachers}</div>
                    </Card>
                    <Card className="p-4">
                        <div className="text-sm text-muted-foreground">Students</div>
                        <div className="text-2xl font-bold">{stats.students}</div>
                    </Card>
                </div>
            </div>
        </AppSidebarLayout>
    );
}


