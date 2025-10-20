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
    Users, 
    TrendingUp, 
    BarChart3, 
    Clock,
    CheckCircle,
    AlertTriangle,
    BookOpen,
    Target,
    Eye,
    Send,
    Plus
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Adesua', href: dashboard().url },
    { title: 'Teacher', href: '/teacher' },
    { title: 'Reports', href: '/teacher/reports' },
];

type Report = {
    id: string;
    title: string;
    type: 'attendance' | 'academic' | 'behavioral' | 'comprehensive' | 'incident';
    class: string;
    period: string;
    generatedDate: string;
    status: 'draft' | 'submitted' | 'approved' | 'rejected';
    downloadUrl?: string;
    previewUrl?: string;
    size: string;
    recipient?: string;
};

type IncidentReport = {
    id: string;
    studentName: string;
    studentId: string;
    incidentType: 'disciplinary' | 'academic' | 'behavioral' | 'safety';
    severity: 'low' | 'medium' | 'high' | 'critical';
    date: string;
    description: string;
    status: 'pending' | 'investigating' | 'resolved' | 'escalated';
    actions?: string[];
};

type TeacherReportsProps = {
    reports?: Report[];
    incidentReports?: IncidentReport[];
    academicYear: string;
    semester: string;
    classes: string[];
};

export default function TeacherReports() {
    const { reports, incidentReports, academicYear, semester, classes } = usePage().props as unknown as TeacherReportsProps;
    
    const getReportIcon = (type: string) => {
        switch (type) {
            case 'attendance': return <Clock className="h-4 w-4 text-green-500" />;
            case 'academic': return <BookOpen className="h-4 w-4 text-blue-500" />;
            case 'behavioral': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
            case 'comprehensive': return <BarChart3 className="h-4 w-4 text-purple-500" />;
            case 'incident': return <AlertTriangle className="h-4 w-4 text-red-500" />;
            default: return <FileText className="h-4 w-4 text-gray-500" />;
        }
    };

    const getReportBadge = (status: string) => {
        switch (status) {
            case 'draft': return <Badge variant="outline" className="bg-gray-100">Draft</Badge>;
            case 'submitted': return <Badge variant="secondary" className="bg-yellow-500">Submitted</Badge>;
            case 'approved': return <Badge variant="default" className="bg-green-500">Approved</Badge>;
            case 'rejected': return <Badge variant="destructive">Rejected</Badge>;
            default: return <Badge variant="outline">Unknown</Badge>;
        }
    };

    const getIncidentBadge = (severity: string) => {
        switch (severity) {
            case 'low': return <Badge variant="outline" className="bg-green-100 text-green-800">Low</Badge>;
            case 'medium': return <Badge variant="secondary" className="bg-yellow-500">Medium</Badge>;
            case 'high': return <Badge variant="default" className="bg-orange-500">High</Badge>;
            case 'critical': return <Badge variant="destructive">Critical</Badge>;
            default: return <Badge variant="outline">Unknown</Badge>;
        }
    };

    const getIncidentStatusBadge = (status: string) => {
        switch (status) {
            case 'pending': return <Badge variant="outline" className="bg-gray-100">Pending</Badge>;
            case 'investigating': return <Badge variant="secondary" className="bg-blue-500">Investigating</Badge>;
            case 'resolved': return <Badge variant="default" className="bg-green-500">Resolved</Badge>;
            case 'escalated': return <Badge variant="destructive">Escalated</Badge>;
            default: return <Badge variant="outline">Unknown</Badge>;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Teacher - Reports" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-semibold">Reports & Documentation</h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            {academicYear} - {semester} • Manage class reports and incident documentation
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <Calendar className="h-4 w-4 mr-2" />
                            Academic Calendar
                        </Button>
                        <Button size="sm">
                            <Plus className="h-4 w-4 mr-2" />
                            New Report
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Class Reports */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5" />
                                Class Reports
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
                                                        {report.class} • {report.period} • {report.size}
                                                    </div>
                                                    <div className="text-xs text-muted-foreground">
                                                        Generated: {report.generatedDate}
                                                        {report.recipient && ` • To: ${report.recipient}`}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {getReportBadge(report.status)}
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
                                                    {report.status === 'draft' && (
                                                        <Button variant="outline" size="sm">
                                                            <Send className="h-3 w-3" />
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-muted-foreground">
                                        <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                        <h3 className="text-lg font-medium mb-2">No Reports Yet</h3>
                                        <p className="text-sm">
                                            Create your first class report to track student progress and attendance.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Incident Reports */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <AlertTriangle className="h-5 w-5" />
                                Incident Reports
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {incidentReports && incidentReports.length > 0 ? (
                                    incidentReports.map((incident) => (
                                        <div key={incident.id} className="flex items-center justify-between p-4 border rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <AlertTriangle className="h-4 w-4 text-red-500" />
                                                <div>
                                                    <div className="font-medium">{incident.studentName}</div>
                                                    <div className="text-sm text-muted-foreground">
                                                        ID: {incident.studentId} • {incident.incidentType}
                                                    </div>
                                                    <div className="text-xs text-muted-foreground">
                                                        {incident.date} • {incident.description.substring(0, 50)}...
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {getIncidentBadge(incident.severity)}
                                                {getIncidentStatusBadge(incident.status)}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-muted-foreground">
                                        <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                        <h3 className="text-lg font-medium mb-2">No Incidents Reported</h3>
                                        <p className="text-sm">
                                            Incident reports will appear here when submitted.
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
                            Available Report Types
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                            <div className="text-center p-4 border rounded-lg">
                                <Clock className="h-8 w-8 text-green-500 mx-auto mb-2" />
                                <div className="font-medium">Attendance Reports</div>
                                <div className="text-sm text-muted-foreground">Daily and monthly attendance tracking</div>
                            </div>
                            <div className="text-center p-4 border rounded-lg">
                                <BookOpen className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                                <div className="font-medium">Academic Reports</div>
                                <div className="text-sm text-muted-foreground">Student performance and grades</div>
                            </div>
                            <div className="text-center p-4 border rounded-lg">
                                <AlertTriangle className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                                <div className="font-medium">Behavioral Reports</div>
                                <div className="text-sm text-muted-foreground">Student conduct and discipline</div>
                            </div>
                            <div className="text-center p-4 border rounded-lg">
                                <BarChart3 className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                                <div className="font-medium">Comprehensive Reports</div>
                                <div className="text-sm text-muted-foreground">Complete class overview</div>
                            </div>
                            <div className="text-center p-4 border rounded-lg">
                                <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                                <div className="font-medium">Incident Reports</div>
                                <div className="text-sm text-muted-foreground">Safety and disciplinary incidents</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="p-6 text-center">
                            <FileText className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                            <h3 className="font-medium mb-2">Create Attendance Report</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Generate attendance report for selected class and period
                            </p>
                            <Button variant="outline" className="w-full">
                                Create Report
                            </Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 text-center">
                            <BookOpen className="h-8 w-8 text-green-500 mx-auto mb-3" />
                            <h3 className="font-medium mb-2">Academic Performance</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Generate academic performance report with grades and trends
                            </p>
                            <Button variant="outline" className="w-full">
                                Generate Report
                            </Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 text-center">
                            <AlertTriangle className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
                            <h3 className="font-medium mb-2">Submit Incident</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Report disciplinary or safety incidents
                            </p>
                            <Button variant="outline" className="w-full">
                                Submit Incident
                            </Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 text-center">
                            <Download className="h-8 w-8 text-purple-500 mx-auto mb-3" />
                            <h3 className="font-medium mb-2">Export All Reports</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Download all reports as a ZIP file
                            </p>
                            <Button variant="outline" className="w-full">
                                Export All
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Classes Overview */}
                {classes && classes.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5" />
                                Your Classes
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {classes.map((className, index) => (
                                    <div key={index} className="p-4 border rounded-lg text-center">
                                        <div className="font-medium mb-2">{className}</div>
                                        <div className="text-sm text-muted-foreground mb-3">
                                            {academicYear} - {semester}
                                        </div>
                                        <div className="flex gap-2 justify-center">
                                            <Button variant="outline" size="sm">
                                                <FileText className="h-3 w-3 mr-1" />
                                                Report
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                <Users className="h-3 w-3 mr-1" />
                                                Students
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}


