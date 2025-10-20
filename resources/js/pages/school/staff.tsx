import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
    Users, 
    UserPlus, 
    Search, 
    Filter, 
    MoreHorizontal, 
    Mail, 
    Phone, 
    Calendar, 
    GraduationCap, 
    BookOpen, 
    Award, 
    Clock, 
    CheckCircle, 
    AlertCircle,
    Edit,
    Eye,
    Download,
    Upload,
    Settings,
    BarChart3
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Adesua', href: dashboard().url },
    { title: 'School', href: '/school' },
    { title: 'Staff', href: '/school/staff' },
];

type StaffMember = {
    id: number;
    name: string;
    email: string;
    phone?: string;
    position: string;
    department: string;
    hireDate: string;
    status: 'active' | 'inactive' | 'on_leave' | 'terminated';
    qualifications: string[];
    subjects?: string[];
    classes?: string[];
    performance: {
        rating: number;
        lastReview: string;
        attendance: number;
    };
    emergencyContact?: {
        name: string;
        phone: string;
        relationship: string;
    };
};

type StaffStats = {
    totalStaff: number;
    activeStaff: number;
    onLeave: number;
    newHires: number;
    departments: {
        name: string;
        count: number;
    }[];
    averagePerformance: number;
};

type SchoolStaffProps = {
    staff?: StaffMember[];
    stats?: StaffStats;
};

export default function SchoolStaff() {
    const { staff, stats } = usePage().props as unknown as SchoolStaffProps;
    
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'active': return <Badge variant="default" className="bg-green-500">Active</Badge>;
            case 'inactive': return <Badge variant="secondary">Inactive</Badge>;
            case 'on_leave': return <Badge variant="secondary" className="bg-yellow-500">On Leave</Badge>;
            case 'terminated': return <Badge variant="destructive">Terminated</Badge>;
            default: return <Badge variant="outline">Unknown</Badge>;
        }
    };

    const getPerformanceBadge = (rating: number) => {
        if (rating >= 4.5) return <Badge variant="default" className="bg-green-500">Excellent</Badge>;
        if (rating >= 3.5) return <Badge variant="default" className="bg-blue-500">Good</Badge>;
        if (rating >= 2.5) return <Badge variant="secondary" className="bg-yellow-500">Average</Badge>;
        return <Badge variant="destructive">Needs Improvement</Badge>;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="School - Staff Management" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-semibold">Staff Management</h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Manage teaching and administrative staff
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Export
                        </Button>
                        <Button variant="outline" size="sm">
                            <Upload className="h-4 w-4 mr-2" />
                            Import
                        </Button>
                        <Button size="sm">
                            <UserPlus className="h-4 w-4 mr-2" />
                            Add Staff
                        </Button>
                    </div>
                </div>

                {/* Stats Overview */}
                {stats && (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center gap-2">
                                    <Users className="h-4 w-4 text-blue-500" />
                                    <div>
                                        <div className="text-2xl font-bold text-blue-600">{stats.totalStaff}</div>
                                        <div className="text-sm text-muted-foreground">Total Staff</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <div>
                                        <div className="text-2xl font-bold text-green-600">{stats.activeStaff}</div>
                                        <div className="text-sm text-muted-foreground">Active</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-yellow-500" />
                                    <div>
                                        <div className="text-2xl font-bold text-yellow-600">{stats.onLeave}</div>
                                        <div className="text-sm text-muted-foreground">On Leave</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center gap-2">
                                    <UserPlus className="h-4 w-4 text-purple-500" />
                                    <div>
                                        <div className="text-2xl font-bold text-purple-600">{stats.newHires}</div>
                                        <div className="text-sm text-muted-foreground">New This Year</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Search and Filters */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search staff by name, position, or department..."
                            className="pl-8"
                        />
                    </div>
                    <Button variant="outline">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                    </Button>
                </div>

                {/* Staff List */}
                <div className="grid grid-cols-1 gap-4">
                    {staff && staff.length > 0 ? (
                        staff.map((member) => (
                            <Card key={member.id}>
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                                                <Users className="h-6 w-6 text-blue-600" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-lg font-semibold">{member.name}</h3>
                                                    {getStatusBadge(member.status)}
                                                    {getPerformanceBadge(member.performance.rating)}
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                    <div className="space-y-2">
                                                        <div className="flex items-center gap-2">
                                                            <GraduationCap className="h-4 w-4 text-muted-foreground" />
                                                            <span className="text-sm">{member.position}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                                                            <span className="text-sm">{member.department}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                                            <span className="text-sm">Hired: {member.hireDate}</span>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <div className="flex items-center gap-2">
                                                            <Mail className="h-4 w-4 text-muted-foreground" />
                                                            <span className="text-sm">{member.email}</span>
                                                        </div>
                                                        {member.phone && (
                                                            <div className="flex items-center gap-2">
                                                                <Phone className="h-4 w-4 text-muted-foreground" />
                                                                <span className="text-sm">{member.phone}</span>
                                                            </div>
                                                        )}
                                                        <div className="flex items-center gap-2">
                                                            <Award className="h-4 w-4 text-muted-foreground" />
                                                            <span className="text-sm">Rating: {member.performance.rating}/5</span>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        {member.subjects && member.subjects.length > 0 && (
                                                            <div>
                                                                <div className="text-sm font-medium mb-1">Subjects:</div>
                                                                <div className="flex flex-wrap gap-1">
                                                                    {member.subjects.map((subject, index) => (
                                                                        <Badge key={index} variant="outline" className="text-xs">
                                                                            {subject}
                                                                        </Badge>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                        {member.classes && member.classes.length > 0 && (
                                                            <div>
                                                                <div className="text-sm font-medium mb-1">Classes:</div>
                                                                <div className="flex flex-wrap gap-1">
                                                                    {member.classes.map((className, index) => (
                                                                        <Badge key={index} variant="outline" className="text-xs">
                                                                            {className}
                                                                        </Badge>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                {member.qualifications.length > 0 && (
                                                    <div className="mt-3">
                                                        <div className="text-sm font-medium mb-1">Qualifications:</div>
                                                        <div className="flex flex-wrap gap-1">
                                                            {member.qualifications.map((qual, index) => (
                                                                <Badge key={index} variant="secondary" className="text-xs">
                                                                    {qual}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <Card>
                            <CardContent className="flex flex-col items-center justify-center py-12">
                                <Users className="h-12 w-12 text-muted-foreground mb-4" />
                                <h3 className="text-lg font-medium mb-2">No Staff Found</h3>
                                <p className="text-sm text-muted-foreground text-center mb-4">
                                    No staff members found. Add your first staff member to get started.
                                </p>
                                <Button>
                                    <UserPlus className="h-4 w-4 mr-2" />
                                    Add Staff Member
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Department Overview */}
                {stats && stats.departments.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BarChart3 className="h-5 w-5" />
                                Department Overview
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {stats.departments.map((dept, index) => (
                                    <div key={index} className="p-4 border rounded-lg">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="font-medium">{dept.name}</div>
                                                <div className="text-sm text-muted-foreground">{dept.count} staff members</div>
                                            </div>
                                            <div className="text-2xl font-bold text-blue-600">{dept.count}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="p-6 text-center">
                            <UserPlus className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                            <h3 className="font-medium mb-2">Add New Staff</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Register new teaching or administrative staff
                            </p>
                            <Button variant="outline" className="w-full">
                                Add Staff
                            </Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 text-center">
                            <BarChart3 className="h-8 w-8 text-green-500 mx-auto mb-3" />
                            <h3 className="font-medium mb-2">Performance Reports</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Generate staff performance analytics
                            </p>
                            <Button variant="outline" className="w-full">
                                View Reports
                            </Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 text-center">
                            <Calendar className="h-8 w-8 text-purple-500 mx-auto mb-3" />
                            <h3 className="font-medium mb-2">Schedule Management</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Manage staff schedules and assignments
                            </p>
                            <Button variant="outline" className="w-full">
                                Manage Schedule
                            </Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 text-center">
                            <Settings className="h-8 w-8 text-orange-500 mx-auto mb-3" />
                            <h3 className="font-medium mb-2">Staff Settings</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Configure staff management preferences
                            </p>
                            <Button variant="outline" className="w-full">
                                Settings
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}


