import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
    FileText, 
    Download, 
    Calendar, 
    Award, 
    TrendingUp, 
    BookOpen, 
    Clock, 
    CheckCircle,
    AlertCircle,
    GraduationCap,
    BarChart3,
    Eye
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Adesua', href: dashboard().url },
    { title: 'Student', href: '/student' },
    { title: 'Reports', href: '/student/reports' },
];

type Report = {
    id: string;
    title: string;
    type: 'academic' | 'attendance' | 'behavioral' | 'financial' | 'comprehensive';
    period: string;
    generatedDate: string;
    status: 'available' | 'generating' | 'expired';
    downloadUrl?: string;
    previewUrl?: string;
    size: string;
};

type Certificate = {
    id: string;
    title: string;
    type: 'completion' | 'achievement' | 'participation' | 'excellence';
    issuedDate: string;
    issuer: string;
    verificationCode: string;
    downloadUrl?: string;
    previewUrl?: string;
};

type StudentReportsProps = {
    reports?: Report[];
    certificates?: Certificate[];
    academicYear: string;
    semester: string;
};

export default function StudentReports() {
    const { reports, certificates, academicYear, semester } = usePage().props as unknown as StudentReportsProps;
    
    const getReportIcon = (type: string) => {
        switch (type) {
            case 'academic': return <BookOpen className="h-4 w-4 text-blue-500" />;
            case 'attendance': return <Clock className="h-4 w-4 text-green-500" />;
            case 'behavioral': return <AlertCircle className="h-4 w-4 text-yellow-500" />;
            case 'financial': return <TrendingUp className="h-4 w-4 text-purple-500" />;
            case 'comprehensive': return <BarChart3 className="h-4 w-4 text-red-500" />;
            default: return <FileText className="h-4 w-4 text-gray-500" />;
        }
    };

    const getReportBadge = (status: string) => {
        switch (status) {
            case 'available': return <Badge variant="default" className="bg-green-500">Available</Badge>;
            case 'generating': return <Badge variant="secondary" className="bg-yellow-500">Generating</Badge>;
            case 'expired': return <Badge variant="destructive">Expired</Badge>;
            default: return <Badge variant="outline">Unknown</Badge>;
        }
    };

    const getCertificateIcon = (type: string) => {
        switch (type) {
            case 'completion': return <GraduationCap className="h-4 w-4 text-blue-500" />;
            case 'achievement': return <Award className="h-4 w-4 text-gold-500" />;
            case 'participation': return <CheckCircle className="h-4 w-4 text-green-500" />;
            case 'excellence': return <Award className="h-4 w-4 text-purple-500" />;
            default: return <Award className="h-4 w-4 text-gray-500" />;
        }
    };

    const getCertificateBadge = (type: string) => {
        switch (type) {
            case 'completion': return <Badge variant="default" className="bg-blue-500">Completion</Badge>;
            case 'achievement': return <Badge variant="default" className="bg-yellow-500">Achievement</Badge>;
            case 'participation': return <Badge variant="default" className="bg-green-500">Participation</Badge>;
            case 'excellence': return <Badge variant="default" className="bg-purple-500">Excellence</Badge>;
            default: return <Badge variant="outline">Certificate</Badge>;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Student - Reports" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-semibold">Academic Reports & Certificates</h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            {academicYear} - {semester} • Download your academic documents
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <Calendar className="h-4 w-4 mr-2" />
                            Academic Calendar
                        </Button>
                        <Button size="sm">
                            <FileText className="h-4 w-4 mr-2" />
                            Request Report
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Available Reports */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5" />
                                Available Reports
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {reports && reports.length > 0 ? (
                                    reports.map((report) => (
                                        <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                                            <div className="flex items-center gap-3">
                                                {getReportIcon(report.type)}
                                                <div>
                                                    <div className="font-medium">{report.title}</div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {report.period} • {report.size}
                                                    </div>
                                                    <div className="text-xs text-muted-foreground">
                                                        Generated: {report.generatedDate}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {getReportBadge(report.status)}
                                                {report.status === 'available' && (
                                                    <div className="flex gap-1">
                                                        {report.previewUrl && (
                                                            <Button variant="outline" size="sm">
                                                                <Eye className="h-3 w-3" />
                                                            </Button>
                                                        )}
                                                        {report.downloadUrl && (
                                                            <Button variant="outline" size="sm">
                                                                <Download className="h-3 w-3" />
                                                            </Button>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-muted-foreground">
                                        <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                        <h3 className="text-lg font-medium mb-2">No Reports Available</h3>
                                        <p className="text-sm">
                                            Academic reports will appear here once they are generated by your school.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Certificates */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Award className="h-5 w-5" />
                                Certificates & Awards
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {certificates && certificates.length > 0 ? (
                                    certificates.map((certificate) => (
                                        <div key={certificate.id} className="flex items-center justify-between p-4 border rounded-lg">
                                            <div className="flex items-center gap-3">
                                                {getCertificateIcon(certificate.type)}
                                                <div>
                                                    <div className="font-medium">{certificate.title}</div>
                                                    <div className="text-sm text-muted-foreground">
                                                        Issued by: {certificate.issuer}
                                                    </div>
                                                    <div className="text-xs text-muted-foreground">
                                                        {certificate.issuedDate} • Code: {certificate.verificationCode}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {getCertificateBadge(certificate.type)}
                                                <div className="flex gap-1">
                                                    {certificate.previewUrl && (
                                                        <Button variant="outline" size="sm">
                                                            <Eye className="h-3 w-3" />
                                                        </Button>
                                                    )}
                                                    {certificate.downloadUrl && (
                                                        <Button variant="outline" size="sm">
                                                            <Download className="h-3 w-3" />
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-muted-foreground">
                                        <Award className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                        <h3 className="text-lg font-medium mb-2">No Certificates Yet</h3>
                                        <p className="text-sm">
                                            Certificates and awards will appear here as you earn them.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Report Types Overview */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BarChart3 className="h-5 w-5" />
                            Report Types Available
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                            <div className="text-center p-4 border rounded-lg">
                                <BookOpen className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                                <div className="font-medium">Academic Reports</div>
                                <div className="text-sm text-muted-foreground">Grades, GPA, course completion</div>
                            </div>
                            <div className="text-center p-4 border rounded-lg">
                                <Clock className="h-8 w-8 text-green-500 mx-auto mb-2" />
                                <div className="font-medium">Attendance Reports</div>
                                <div className="text-sm text-muted-foreground">Daily attendance tracking</div>
                            </div>
                            <div className="text-center p-4 border rounded-lg">
                                <AlertCircle className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                                <div className="font-medium">Behavioral Reports</div>
                                <div className="text-sm text-muted-foreground">Disciplinary records</div>
                            </div>
                            <div className="text-center p-4 border rounded-lg">
                                <TrendingUp className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                                <div className="font-medium">Financial Reports</div>
                                <div className="text-sm text-muted-foreground">Fee payments, wallet activity</div>
                            </div>
                            <div className="text-center p-4 border rounded-lg">
                                <BarChart3 className="h-8 w-8 text-red-500 mx-auto mb-2" />
                                <div className="font-medium">Comprehensive Reports</div>
                                <div className="text-sm text-muted-foreground">Complete academic profile</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                        <CardContent className="p-6 text-center">
                            <FileText className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                            <h3 className="font-medium mb-2">Request New Report</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Request a specific academic report from your school
                            </p>
                            <Button variant="outline" className="w-full">
                                Request Report
                            </Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 text-center">
                            <Download className="h-8 w-8 text-green-500 mx-auto mb-3" />
                            <h3 className="font-medium mb-2">Download All Reports</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Download all available reports as a ZIP file
                            </p>
                            <Button variant="outline" className="w-full">
                                Download All
                            </Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 text-center">
                            <Calendar className="h-8 w-8 text-purple-500 mx-auto mb-3" />
                            <h3 className="font-medium mb-2">Academic Calendar</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                View important dates and deadlines
                            </p>
                            <Button variant="outline" className="w-full">
                                View Calendar
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}


