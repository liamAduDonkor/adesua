import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, Mail, Phone, MapPin, Calendar, GraduationCap, School } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Adesua', href: dashboard().url },
    { title: 'Student', href: '/student' },
    { title: 'Profile', href: '/student/profile' },
];

type StudentProfileProps = {
    student?: {
        id: number;
        name: string;
        email: string;
        phone?: string;
        address?: string;
        date_of_birth?: string;
        student_id: string;
        class?: string;
        school?: string;
        enrollment_date?: string;
        status: 'active' | 'inactive' | 'suspended';
        guardian_name?: string;
        guardian_phone?: string;
    };
};

export default function StudentProfile() {
    const { student } = usePage().props as unknown as StudentProfileProps;
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Student - Profile" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Student Profile</h1>
                    <Button variant="outline" size="sm">
                        Edit Profile
                    </Button>
                </div>

                {student ? (
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* Personal Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5" />
                                    Personal Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <div className="font-medium">{student.name}</div>
                                        <div className="text-sm text-muted-foreground">Full Name</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <div className="font-medium">{student.email}</div>
                                        <div className="text-sm text-muted-foreground">Email Address</div>
                                    </div>
                                </div>
                                {student.phone && (
                                    <div className="flex items-center gap-3">
                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <div className="font-medium">{student.phone}</div>
                                            <div className="text-sm text-muted-foreground">Phone Number</div>
                                        </div>
                                    </div>
                                )}
                                {student.address && (
                                    <div className="flex items-center gap-3">
                                        <MapPin className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <div className="font-medium">{student.address}</div>
                                            <div className="text-sm text-muted-foreground">Address</div>
                                        </div>
                                    </div>
                                )}
                                {student.date_of_birth && (
                                    <div className="flex items-center gap-3">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <div className="font-medium">{student.date_of_birth}</div>
                                            <div className="text-sm text-muted-foreground">Date of Birth</div>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Academic Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <GraduationCap className="h-5 w-5" />
                                    Academic Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-4 w-4 text-muted-foreground">#</div>
                                    <div>
                                        <div className="font-medium">{student.student_id}</div>
                                        <div className="text-sm text-muted-foreground">Student ID</div>
                                    </div>
                                </div>
                                {student.class && (
                                    <div className="flex items-center gap-3">
                                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <div className="font-medium">{student.class}</div>
                                            <div className="text-sm text-muted-foreground">Class</div>
                                        </div>
                                    </div>
                                )}
                                {student.school && (
                                    <div className="flex items-center gap-3">
                                        <School className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <div className="font-medium">{student.school}</div>
                                            <div className="text-sm text-muted-foreground">School</div>
                                        </div>
                                    </div>
                                )}
                                {student.enrollment_date && (
                                    <div className="flex items-center gap-3">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <div className="font-medium">{student.enrollment_date}</div>
                                            <div className="text-sm text-muted-foreground">Enrollment Date</div>
                                        </div>
                                    </div>
                                )}
                                <div className="flex items-center gap-3">
                                    <Badge variant={student.status === 'active' ? 'default' : 'secondary'}>
                                        {student.status}
                                    </Badge>
                                    <div className="text-sm text-muted-foreground">Status</div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Guardian Information */}
                        {(student.guardian_name || student.guardian_phone) && (
                            <Card className="lg:col-span-2">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <User className="h-5 w-5" />
                                        Guardian Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        {student.guardian_name && (
                                            <div className="flex items-center gap-3">
                                                <User className="h-4 w-4 text-muted-foreground" />
                                                <div>
                                                    <div className="font-medium">{student.guardian_name}</div>
                                                    <div className="text-sm text-muted-foreground">Guardian Name</div>
                                                </div>
                                            </div>
                                        )}
                                        {student.guardian_phone && (
                                            <div className="flex items-center gap-3">
                                                <Phone className="h-4 w-4 text-muted-foreground" />
                                                <div>
                                                    <div className="font-medium">{student.guardian_phone}</div>
                                                    <div className="text-sm text-muted-foreground">Guardian Phone</div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                ) : (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-8">
                            <User className="h-12 w-12 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-medium mb-2">Profile Not Found</h3>
                            <p className="text-sm text-muted-foreground text-center">
                                Student profile information is not available. Please contact your school administrator.
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}


