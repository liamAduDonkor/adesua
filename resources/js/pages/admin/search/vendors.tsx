import AdminSidebarLayout from '@/layouts/app/admin-sidebar-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Adesua', href: dashboard().url },
    { title: 'Admin', href: '/admin' },
    { title: 'Search Vendors', href: '/admin/search/vendors' },
];

type VendorSearchProps = {
    vendors: {
        data: Array<{
            id: number;
            business_name: string;
            business_type: string;
            license_number: string;
            contact_person: string;
            phone: string;
            name: string;
            email: string;
            statistics_summary: {
                total_contracts: number;
                total_value: number;
                total_paid: number;
                avg_delivery: number;
                avg_quality: number;
                avg_timeliness: number;
                total_records: number;
            } | null;
        }>;
        links: any[];
        meta: any;
    };
    filters: {
        search?: string;
        business_type?: string;
        academic_year?: string;
    };
};

export default function VendorSearch() {
    const { vendors, filters } = usePage().props as unknown as VendorSearchProps;
    const [searchParams, setSearchParams] = useState(filters);

    const handleSearch = () => {
        const params = new URLSearchParams();
        Object.entries(searchParams).forEach(([key, value]) => {
            if (value) params.append(key, value);
        });
        window.location.href = `/admin/search/vendors?${params.toString()}`;
    };

    const getRatingColor = (rating: number | null) => {
        if (!rating) return 'text-gray-500';
        if (rating >= 4) return 'text-green-600';
        if (rating >= 3) return 'text-yellow-600';
        return 'text-red-600';
    };

    const getRatingLabel = (rating: number | null) => {
        if (!rating) return 'No Data';
        if (rating >= 4.5) return 'Excellent';
        if (rating >= 3.5) return 'Good';
        if (rating >= 2.5) return 'Satisfactory';
        return 'Needs Improvement';
    };

    const businessTypes = [
        'Supplies',
        'Maintenance',
        'Transportation',
        'Technology',
        'Food Services',
        'Security',
        'Cleaning',
        'Construction',
        'Other'
    ];

    return (
        <AdminSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin - Search Vendors" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-xl font-semibold">Search Vendors</h1>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
                    Search and analyze vendor performance and statistics.
                </p>

                {/* Search Filters */}
                <div className="rounded-md border p-4">
                    <h3 className="text-lg font-medium mb-4">Search Filters</h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <div>
                            <label className="block text-sm font-medium mb-1">Search Term</label>
                            <input
                                type="text"
                                value={searchParams.search || ''}
                                onChange={(e) => setSearchParams({ ...searchParams, search: e.target.value })}
                                placeholder="Business name, contact person, license..."
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Business Type</label>
                            <select
                                value={searchParams.business_type || ''}
                                onChange={(e) => setSearchParams({ ...searchParams, business_type: e.target.value })}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                            >
                                <option value="">All Types</option>
                                {businessTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Academic Year</label>
                            <input
                                type="text"
                                value={searchParams.academic_year || ''}
                                onChange={(e) => setSearchParams({ ...searchParams, academic_year: e.target.value })}
                                placeholder="2023/2024..."
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <button
                            onClick={handleSearch}
                            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                        >
                            Search
                        </button>
                    </div>
                </div>

                {/* Results */}
                <div className="rounded-md border p-4">
                    <h3 className="text-lg font-medium mb-4">Search Results ({vendors.data.length})</h3>
                    {vendors.data.length === 0 ? (
                        <p className="text-gray-500">No vendors found matching your criteria.</p>
                    ) : (
                        <div className="space-y-4">
                            {vendors.data.map((vendor) => (
                                <div key={vendor.id} className="rounded-md border p-4">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h4 className="font-medium">{vendor.business_name}</h4>
                                            <p className="text-sm text-gray-600">{vendor.name} ({vendor.email})</p>
                                            <div className="mt-2 grid grid-cols-1 gap-2 text-sm md:grid-cols-3">
                                                <div>
                                                    <span className="font-medium">Business Type:</span> {vendor.business_type}
                                                </div>
                                                <div>
                                                    <span className="font-medium">License:</span> {vendor.license_number}
                                                </div>
                                                <div>
                                                    <span className="font-medium">Contact:</span> {vendor.contact_person}
                                                </div>
                                                <div>
                                                    <span className="font-medium">Phone:</span> {vendor.phone}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ml-4 text-right">
                                            {vendor.statistics_summary ? (
                                                <div className="space-y-1 text-sm">
                                                    <div className="font-medium text-blue-600">
                                                        {vendor.statistics_summary.total_contracts} Contracts
                                                    </div>
                                                    <div className="text-gray-600">
                                                        Value: ₵{vendor.statistics_summary.total_value?.toLocaleString() || '0'}
                                                    </div>
                                                    <div className="text-gray-600">
                                                        Paid: ₵{vendor.statistics_summary.total_paid?.toLocaleString() || '0'}
                                                    </div>
                                                    <div className={`${getRatingColor(vendor.statistics_summary.avg_quality)}`}>
                                                        Quality: {vendor.statistics_summary.avg_quality?.toFixed(1) || 'N/A'} - {getRatingLabel(vendor.statistics_summary.avg_quality)}
                                                    </div>
                                                    <div className="text-gray-600">
                                                        Delivery: {vendor.statistics_summary.avg_delivery?.toFixed(1) || 'N/A'}%
                                                    </div>
                                                    <div className="text-gray-600">
                                                        Timeliness: {vendor.statistics_summary.avg_timeliness?.toFixed(1) || 'N/A'}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="text-sm text-gray-500">No statistics data</div>
                                            )}
                                            <div className="mt-2">
                                                <Link
                                                    href={`/admin/statistics/vendor/${vendor.id}`}
                                                    className="text-blue-600 hover:text-blue-800 text-sm"
                                                >
                                                    View Details →
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {vendors.links && vendors.links.length > 3 && (
                    <div className="flex justify-center">
                        <nav className="flex space-x-2">
                            {vendors.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`px-3 py-2 text-sm rounded-md ${
                                        link.active
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </nav>
                    </div>
                )}
            </div>
        </AdminSidebarLayout>
    );
}
