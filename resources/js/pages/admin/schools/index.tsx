import { Link, router, usePage } from '@inertiajs/react';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/tables/DataTable';
import type { PageProps } from '@/types';
import { useMemo, useState } from 'react';

type SchoolRow = {
    id: number;
    name: string;
    code: string;
    city: string | null;
    region: string | null;
    phone: string | null;
};

export default function AdminSchoolsIndex() {
    const { props } = usePage<PageProps & { schools: any; filters: { q?: string } }>();
    const { schools, filters } = props as any;
    const [search, setSearch] = useState(filters?.q ?? '');

    const columns = useMemo(
        () => [
            {
                header: 'Name',
                accessorKey: 'name',
                cell: (row: any) => (
                    <Link href={route('admin.schools.show', row.row.original.id)} className="text-blue-600 hover:underline">
                        {row.getValue('name')}
                    </Link>
                ),
            },
            { header: 'Code', accessorKey: 'code' },
            { header: 'City', accessorKey: 'city' },
            { header: 'Region', accessorKey: 'region' },
            { header: 'Phone', accessorKey: 'phone' },
        ],
        [],
    );

    return (
        <AppSidebarLayout breadcrumbs={[{ label: 'Admin', href: route('dashboard') }, { label: 'Schools' }]}> 
            <div className="space-y-4">
                <Card className="p-4 flex items-center gap-2">
                    <Input
                        placeholder="Search name, code, city, region..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button
                        onClick={() => router.get(route('admin.schools.index'), { q: search }, { preserveState: true })}
                    >
                        Search
                    </Button>
                </Card>

                <Card className="p-0 overflow-hidden">
                    <DataTable columns={columns as any} data={schools.data as SchoolRow[]} pagination={schools} />
                </Card>
            </div>
        </AppSidebarLayout>
    );
}


