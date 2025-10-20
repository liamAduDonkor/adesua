import AdminSidebarLayout from '@/layouts/app/admin-sidebar-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Adesua', href: dashboard().url },
    { title: 'Admin', href: '/admin' },
    { title: 'Search Teachers', href: '/admin/search/teachers' },
];

type TeacherSearchProps = {
    teachers: {
        data: Array<{
            id: number;
            staff_number: string;
            subject_specialization: string;
            qualification: string;
            years_experience: number;
            name: string;
            email: string;
            school_name: string;
            performance_summary: {
                avg_score: number;
                avg_attendance: number;
                avg_punctuality: number;
                total_records: number;
            } | null;
        }>;
        links: any[];
        meta: any;
    };
    filters: {
        search?: string;
        school_id?: string;
        subject?: string;
        academic_year?: string;
    };
    schools: Array<{ id: number; name: string }>;
};

export default function TeacherSearch() {
    const { teachers, filters, schools } = usePage().props as unknown as TeacherSearchProps;
    const [searchParams, setSearchParams] = useState(filters);

    const handleSearch = () => {
        const params = new URLSearchParams();
        Object.entries(searchParams).forEach(([key, value]) => {
            if (value) params.append(key, value);
        });
        window.location.href = `/admin/search/teachers?${params.toString()}`;
    };

    const getPerformanceColor = (score: number | null) => {
        if (!score) return 'text-gray-500';
        if (score >= 80) return 'text-green-600';
        if (score >= 60) return 'text-yellow-600';
        return 'text-red-600';
    };

    const getPerformanceLabel = (score: number | null) => {
        if (!score) return 'No Data';
        if (score >= 80) return 'Excellent';
        if (score >= 60) return 'Good';
        if (score >= 40) return 'Satisfactory';
        return 'Needs Improvement';
    };

    return (
        <AdminSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin - Search Teachers" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-xl font-semibold">Search Teachers</h1>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
                    Search and analyze teacher performance across all schools.
                </p>

                {/* Search Filters */}
                <div className="rounded-md border p-4">
                    <h3 className="text-lg font-medium mb-4">Search Filters</h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Search Term</label>
                            <input
                                type="text"
                                value={searchParams.search || ''}
                                onChange={(e) => setSearchParams({ ...searchParams, search: e.target.value })}
                                placeholder="Name, email, staff number..."
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">School</label>
                            <select
                                value={searchParams.school_id || ''}
                                onChange={(e) => setSearchParams({ ...searchParams, school_id: e.target.value })}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                            >
                                <option value="">All Schools</option>
                                {schools.map((school) => (
                                    <option key={school.id} value={school.id}>
                                        {school.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Subject</label>
                            <input
                                type="text"
                                value={searchParams.subject || ''}
                                onChange={(e) => setSearchParams({ ...searchParams, subject: e.target.value })}
                                placeholder="Subject specialization..."
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                            />
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
                    <h3 className="text-lg font-medium mb-4">Search Results ({teachers.data.length})</h3>
                    {teachers.data.length === 0 ? (
                        <p className="text-gray-500">No teachers found matching your criteria.</p>
                    ) : (
                        <div className="space-y-4">
                            {teachers.data.map((teacher) => (
                                <div key={teacher.id} className="rounded-md border p-4">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h4 className="font-medium">{teacher.name}</h4>
                                            <p className="text-sm text-gray-600">{teacher.email}</p>
                                            <div className="mt-2 grid grid-cols-1 gap-2 text-sm md:grid-cols-3">
                                                <div>
                                                    <span className="font-medium">Staff Number:</span> {teacher.staff_number}
                                                </div>
                                                <div>
                                                    <span className="font-medium">Subject:</span> {teacher.subject_specialization}
                                                </div>
                                                <div>
                                                    <span className="font-medium">School:</span> {teacher.school_name}
                                                </div>
                                                <div>
                                                    <span className="font-medium">Qualification:</span> {teacher.qualification}
                                                </div>
                                                <div>
                                                    <span className="font-medium">Experience:</span> {teacher.years_experience} years
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ml-4 text-right">
                                            {teacher.performance_summary ? (
                                                <div className="space-y-1 text-sm">
                                                    <div className={`font-medium ${getPerformanceColor(teacher.performance_summary.avg_score)}`}>
                                                        {teacher.performance_summary.avg_score?.toFixed(1) || 'N/A'} - {getPerformanceLabel(teacher.performance_summary.avg_score)}
                                                    </div>
                                                    <div className="text-gray-600">
                                                        Attendance: {teacher.performance_summary.avg_attendance?.toFixed(1) || 'N/A'}%
                                                    </div>
                                                    <div className="text-gray-600">
                                                        Punctuality: {teacher.performance_summary.avg_punctuality?.toFixed(1) || 'N/A'}%
                                                    </div>
                                                    <div className="text-gray-600">
                                                        Records: {teacher.performance_summary.total_records}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="text-sm text-gray-500">No performance data</div>
                                            )}
                                            <div className="mt-2">
                                                <Link
                                                    href={`/admin/performance/teacher/${teacher.id}`}
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
                {teachers.links && teachers.links.length > 3 && (
                    <div className="flex justify-center">
                        <nav className="flex space-x-2">
                            {teachers.links.map((link, index) => (
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
