import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
    Users, 
    TrendingUp, 
    Award, 
    Calendar,
    BookOpen,
    BarChart3,
    ArrowUp,
    ArrowDown,
    Filter,
    Download,
    Search
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Admin', href: '/admin' },
    { label: 'Analytics', href: '/admin/analytics' },
    { label: 'Teachers' }
];

type TeacherAnalyticsProps = {
    analytics: {
        summary: {
            total_records: number;
            avg_score: number;
            avg_attendance: number;
            avg_punctuality: number;
            min_score: number;
            max_score: number;
        };
        performance_distribution: Array<{
            performance_rating: string;
            count: number;
        }>;
        subject_performance: Array<{
            subject: string;
            avg_score: number;
            count: number;
        }>;
        school_performance: Array<{
            school_id: number;
            avg_score: number;
            count: number;
            school: {
                id: number;
                name: string;
            };
        }>;
    };
    filters?: {
        academic_year?: string;
        school_id?: string;
        subject?: string;
    };
    schools: Array<{
        id: number;
        name: string;
    }>;
};

export default function TeacherAnalytics() {
    const { analytics, filters, schools } = usePage().props as unknown as TeacherAnalyticsProps;

    const getRatingColor = (rating: string) => {
        switch (rating?.toLowerCase()) {
            case 'excellent': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'good': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
            case 'satisfactory': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
            case 'needs improvement': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
            case 'poor': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin - Teacher Analytics" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Teacher Performance Analytics</h1>
                        <p className="text-muted-foreground">
                            Comprehensive analysis of teacher performance metrics
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Export
                        </Button>
                        <Button variant="outline" size="sm">
                            <Filter className="h-4 w-4 mr-2" />
                            Filters
                        </Button>
                    </div>
                </div>

                {/* Filters */}
                <Card>
                    <CardContent className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="text-sm font-medium mb-2 block">Academic Year</label>
                                <Input 
                                    type="text" 
                                    placeholder="e.g., 2023/2024"
                                    defaultValue={filters?.academic_year}
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-2 block">School</label>
                                <Select defaultValue={filters?.school_id}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="All Schools" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Schools</SelectItem>
                                        {schools?.map((school) => (
                                            <SelectItem key={school.id} value={school.id.toString()}>
                                                {school.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-2 block">Subject</label>
                                <Input 
                                    type="text" 
                                    placeholder="Search by subject"
                                    defaultValue={filters?.subject}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Summary Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Total Teachers</p>
                                    <p className="text-3xl font-bold mt-2">{analytics.summary.total_records}</p>
                                </div>
                                <Users className="h-12 w-12 text-blue-500 opacity-20" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Average Performance</p>
                                    <p className="text-3xl font-bold mt-2">
                                        {analytics.summary.avg_score?.toFixed(1) || 'N/A'}
                                    </p>
                                </div>
                                <TrendingUp className="h-12 w-12 text-green-500 opacity-20" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Attendance Rate</p>
                                    <p className="text-3xl font-bold mt-2">
                                        {analytics.summary.avg_attendance?.toFixed(1) || 'N/A'}%
                                    </p>
                                </div>
                                <Calendar className="h-12 w-12 text-purple-500 opacity-20" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Performance Distribution */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BarChart3 className="h-5 w-5" />
                            Performance Distribution
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {analytics.performance_distribution?.map((item) => {
                                const percentage = (item.count / analytics.summary.total_records) * 100;
                                return (
                                    <div key={item.performance_rating}>
                                        <div className="flex items-center justify-between mb-2">
                                            <Badge className={getRatingColor(item.performance_rating)}>
                                                {item.performance_rating}
                                            </Badge>
                                            <span className="text-sm font-medium">
                                                {item.count} teachers ({percentage.toFixed(1)}%)
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div 
                                                className="bg-blue-500 h-2 rounded-full transition-all"
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Subject Performance */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BookOpen className="h-5 w-5" />
                            Performance by Subject
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {analytics.subject_performance?.slice(0, 10).map((item, index) => (
                                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                                            <span className="text-sm font-bold">{index + 1}</span>
                                        </div>
                                        <div>
                                            <p className="font-medium">{item.subject}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {item.count} teacher{item.count !== 1 ? 's' : ''}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold">{item.avg_score?.toFixed(1)}</p>
                                        <p className="text-xs text-muted-foreground">avg score</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* School Performance */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Award className="h-5 w-5" />
                            Top Performing Schools
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {analytics.school_performance?.slice(0, 10).map((item, index) => (
                                <div key={item.school_id} className="flex items-center justify-between p-3 border rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 ${index < 3 ? 'bg-yellow-100 dark:bg-yellow-900' : 'bg-gray-100 dark:bg-gray-900'} rounded-full flex items-center justify-center`}>
                                            <span className="text-sm font-bold">{index + 1}</span>
                                        </div>
                                        <div>
                                            <p className="font-medium">{item.school?.name}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {item.count} teacher{item.count !== 1 ? 's' : ''}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold">{item.avg_score?.toFixed(1)}</p>
                                        <div className="flex items-center gap-1 text-xs text-green-600">
                                            <ArrowUp className="h-3 w-3" />
                                            <span>avg score</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Links */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link href="/admin/search/teachers">
                        <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                            <CardContent className="p-4">
                                <div className="flex items-center gap-3">
                                    <Search className="h-8 w-8 text-blue-500" />
                                    <div>
                                        <h3 className="font-medium">Search Teachers</h3>
                                        <p className="text-sm text-muted-foreground">Find individual teachers</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/admin/analytics/students">
                        <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                            <CardContent className="p-4">
                                <div className="flex items-center gap-3">
                                    <BarChart3 className="h-8 w-8 text-green-500" />
                                    <div>
                                        <h3 className="font-medium">Student Analytics</h3>
                                        <p className="text-sm text-muted-foreground">View student performance</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/admin/analytics">
                        <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                            <CardContent className="p-4">
                                <div className="flex items-center gap-3">
                                    <TrendingUp className="h-8 w-8 text-purple-500" />
                                    <div>
                                        <h3 className="font-medium">Analytics Dashboard</h3>
                                        <p className="text-sm text-muted-foreground">Back to overview</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}

