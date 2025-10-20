import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
    TrendingUp, 
    TrendingDown, 
    Users, 
    GraduationCap, 
    Calendar, 
    DollarSign, 
    AlertCircle, 
    CheckCircle, 
    Clock, 
    BarChart3, 
    PieChart, 
    Activity,
    BookOpen,
    School,
    Shield,
    ClipboardList,
    CreditCard,
    FileText,
    Bell,
    Target,
    Award,
    Eye,
    Download,
    RefreshCw
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Adesua',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    const { auth } = usePage<SharedData>().props;
    const userRoles = (auth as any)?.user?.roles as string[] || [];
    const primaryRole = userRoles[0] as
        | 'student'
        | 'parent'
        | 'teacher'
        | 'school'
        | 'admin'
        | 'vendor'
        | undefined;

    function Title() {
        if (!primaryRole) return <Head title="Dashboard" />;
        const pretty = primaryRole.charAt(0).toUpperCase() + primaryRole.slice(1);
        return <Head title={`${pretty} Dashboard`} />;
    }

    function KPI({ label, value, change, icon: Icon, color = "blue" }: { 
        label: string; 
        value: string; 
        change?: string; 
        icon?: any; 
        color?: string;
    }) {
        const colorClasses = {
            blue: "text-blue-600",
            green: "text-green-600", 
            red: "text-red-600",
            yellow: "text-yellow-600",
            purple: "text-purple-600",
            orange: "text-orange-600"
        };

        return (
            <Card>
                <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-xs text-muted-foreground">{label}</div>
                            <div className={`mt-1 text-2xl font-semibold ${colorClasses[color as keyof typeof colorClasses]}`}>
                                {value}
                            </div>
                            {change && (
                                <div className="text-xs text-muted-foreground mt-1">
                                    {change}
                                </div>
                            )}
                        </div>
                        {Icon && (
                            <div className={`p-2 rounded-lg bg-${color}-100 dark:bg-${color}-900`}>
                                <Icon className={`h-5 w-5 ${colorClasses[color as keyof typeof colorClasses]}`} />
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        );
    }

    function ChartCard({ title, children, actions }: { 
        title: string; 
        children: React.ReactNode; 
        actions?: React.ReactNode;
    }) {
        return (
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{title}</CardTitle>
                    {actions}
                </CardHeader>
                <CardContent>
                    {children}
                </CardContent>
            </Card>
        );
    }

    function MiniChart({ type = "line" }: { type?: "line" | "bar" | "pie" }) {
        return (
            <div className="relative aspect-video overflow-hidden rounded-lg border border-sidebar-border/70 dark:border-sidebar-border">
                <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-xs text-muted-foreground">
                        {type === "line" && <TrendingUp className="h-8 w-8 mx-auto mb-1" />}
                        {type === "bar" && <BarChart3 className="h-8 w-8 mx-auto mb-1" />}
                        {type === "pie" && <PieChart className="h-8 w-8 mx-auto mb-1" />}
                        Chart Preview
                    </div>
                </div>
            </div>
        );
    }

    function AlertCard({ type, message, time }: { type: "info" | "warning" | "error" | "success"; message: string; time: string }) {
        const icons = {
            info: AlertCircle,
            warning: AlertCircle,
            error: AlertCircle,
            success: CheckCircle
        };
        const colors = {
            info: "text-blue-600 bg-blue-50 dark:bg-blue-900",
            warning: "text-yellow-600 bg-yellow-50 dark:bg-yellow-900",
            error: "text-red-600 bg-red-50 dark:bg-red-900",
            success: "text-green-600 bg-green-50 dark:bg-green-900"
        };
        const Icon = icons[type];
        
        return (
            <div className={`p-3 rounded-lg ${colors[type]}`}>
                <div className="flex items-start gap-2">
                    <Icon className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                        <div className="text-sm font-medium">{message}</div>
                        <div className="text-xs opacity-75 mt-1">{time}</div>
                    </div>
                </div>
            </div>
        );
    }

    function StudentView() {
        return (
            <>
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">Student Dashboard</h1>
                        <p className="text-muted-foreground">Track your academic progress and activities</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Refresh
                        </Button>
                        <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Export
                        </Button>
                    </div>
                </div>

                {/* KPIs */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-4 mb-6">
                    <KPI label="Attendance (30d)" value="96%" change="+2% from last month" icon={Calendar} color="green" />
                    <KPI label="Average Grade" value="B+" change="+0.3 GPA" icon={Award} color="blue" />
                    <KPI label="Active Courses" value="8" change="2 new this term" icon={BookOpen} color="purple" />
                    <KPI label="Assignments Due" value="3" change="Due this week" icon={Clock} color="orange" />
                </div>

                {/* Charts and Data */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
                    <ChartCard title="Grade Trends" actions={<Button variant="outline" size="sm"><Eye className="h-3 w-3" /></Button>}>
                        <MiniChart type="line" />
                    </ChartCard>
                    <ChartCard title="Attendance Calendar" actions={<Button variant="outline" size="sm"><Calendar className="h-3 w-3" /></Button>}>
                        <MiniChart type="bar" />
                    </ChartCard>
                    <ChartCard title="Subject Performance" actions={<Button variant="outline" size="sm"><PieChart className="h-3 w-3" /></Button>}>
                        <MiniChart type="pie" />
                    </ChartCard>
                </div>

                {/* Recent Activity */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                    <ChartCard title="Recent Activities">
                        <div className="space-y-3">
                            <AlertCard type="success" message="Submitted Mathematics assignment" time="2 hours ago" />
                            <AlertCard type="info" message="New grade posted for English" time="1 day ago" />
                            <AlertCard type="warning" message="Attendance below 95% this week" time="2 days ago" />
                        </div>
                    </ChartCard>
                    <ChartCard title="Upcoming Deadlines">
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex items-center gap-3">
                                    <FileText className="h-4 w-4 text-blue-500" />
                                    <div>
                                        <div className="font-medium">Science Project</div>
                                        <div className="text-sm text-muted-foreground">Due: Tomorrow</div>
                                    </div>
                                </div>
                                <Badge variant="secondary" className="bg-yellow-500">Urgent</Badge>
                            </div>
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex items-center gap-3">
                                    <BookOpen className="h-4 w-4 text-green-500" />
                                    <div>
                                        <div className="font-medium">History Essay</div>
                                        <div className="text-sm text-muted-foreground">Due: Next Week</div>
                                    </div>
                                </div>
                                <Badge variant="outline">Normal</Badge>
                            </div>
                        </div>
                    </ChartCard>
                </div>
            </>
        );
    }

    function ParentView() {
        return (
            <>
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">Parent Dashboard</h1>
                        <p className="text-muted-foreground">Monitor your children's progress and manage approvals</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <Bell className="h-4 w-4 mr-2" />
                            Notifications
                        </Button>
                        <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Reports
                        </Button>
                    </div>
                </div>

                {/* KPIs */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-4 mb-6">
                    <KPI label="Children" value="2" change="Both active" icon={Users} color="blue" />
                    <KPI label="Pending Approvals" value="3" change="2 urgent" icon={AlertCircle} color="yellow" />
                    <KPI label="Wallet Balance" value="₵ 420" change="₵ 50 spent this week" icon={DollarSign} color="green" />
                    <KPI label="Notifications" value="5" change="2 unread" icon={Bell} color="purple" />
                </div>

                {/* Charts and Data */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
                    <ChartCard title="Children Performance" actions={<Button variant="outline" size="sm"><TrendingUp className="h-3 w-3" /></Button>}>
                        <MiniChart type="line" />
                    </ChartCard>
                    <ChartCard title="Spending Overview" actions={<Button variant="outline" size="sm"><DollarSign className="h-3 w-3" /></Button>}>
                        <MiniChart type="bar" />
                    </ChartCard>
                    <ChartCard title="Approval Status" actions={<Button variant="outline" size="sm"><CheckCircle className="h-3 w-3" /></Button>}>
                        <MiniChart type="pie" />
                    </ChartCard>
                </div>

                {/* Recent Activity */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                    <ChartCard title="Recent Notifications">
                        <div className="space-y-3">
                            <AlertCard type="warning" message="Field trip approval needed for Sarah" time="1 hour ago" />
                            <AlertCard type="success" message="John's report card available" time="3 hours ago" />
                            <AlertCard type="info" message="School fee payment reminder" time="1 day ago" />
                        </div>
                    </ChartCard>
                    <ChartCard title="Children Overview">
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Users className="h-4 w-4 text-blue-500" />
                                    <div>
                                        <div className="font-medium">Sarah Johnson</div>
                                        <div className="text-sm text-muted-foreground">Grade 8 • 94% Attendance</div>
                                    </div>
                                </div>
                                <Badge variant="default" className="bg-green-500">Good</Badge>
                            </div>
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Users className="h-4 w-4 text-green-500" />
                                    <div>
                                        <div className="font-medium">John Johnson</div>
                                        <div className="text-sm text-muted-foreground">Grade 6 • 88% Attendance</div>
                                    </div>
                                </div>
                                <Badge variant="secondary" className="bg-yellow-500">Needs Attention</Badge>
                            </div>
                        </div>
                    </ChartCard>
                </div>
            </>
        );
    }

    function TeacherView() {
        return (
            <>
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
                        <p className="text-muted-foreground">Manage your classes and track student performance</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <Calendar className="h-4 w-4 mr-2" />
                            Attendance
                        </Button>
                        <Button variant="outline" size="sm">
                            <FileText className="h-4 w-4 mr-2" />
                            Reports
                        </Button>
                    </div>
                </div>

                {/* KPIs */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-4 mb-6">
                    <KPI label="Today's Attendance" value="45/48" change="94% rate" icon={Calendar} color="green" />
                    <KPI label="Performance Alerts" value="3" change="2 students struggling" icon={AlertCircle} color="yellow" />
                    <KPI label="Active Classes" value="6" change="3 subjects" icon={BookOpen} color="blue" />
                    <KPI label="Pending Reports" value="2" change="Due this week" icon={FileText} color="orange" />
                </div>

                {/* Charts and Data */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
                    <ChartCard title="Class Attendance Trends" actions={<Button variant="outline" size="sm"><TrendingUp className="h-3 w-3" /></Button>}>
                        <MiniChart type="line" />
                    </ChartCard>
                    <ChartCard title="Student Performance" actions={<Button variant="outline" size="sm"><BarChart3 className="h-3 w-3" /></Button>}>
                        <MiniChart type="bar" />
                    </ChartCard>
                    <ChartCard title="Grade Distribution" actions={<Button variant="outline" size="sm"><PieChart className="h-3 w-3" /></Button>}>
                        <MiniChart type="pie" />
                    </ChartCard>
                </div>

                {/* Recent Activity */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                    <ChartCard title="Performance Alerts">
                        <div className="space-y-3">
                            <AlertCard type="warning" message="Michael's grades declining in Math" time="2 hours ago" />
                            <AlertCard type="error" message="Sarah has missed 3 classes this week" time="4 hours ago" />
                            <AlertCard type="success" message="David improved significantly" time="1 day ago" />
                        </div>
                    </ChartCard>
                    <ChartCard title="Today's Schedule">
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Clock className="h-4 w-4 text-blue-500" />
                                    <div>
                                        <div className="font-medium">Mathematics - Grade 8A</div>
                                        <div className="text-sm text-muted-foreground">9:00 AM - 10:00 AM</div>
                                    </div>
                                </div>
                                <Badge variant="default" className="bg-green-500">Completed</Badge>
                            </div>
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Clock className="h-4 w-4 text-yellow-500" />
                                    <div>
                                        <div className="font-medium">Science - Grade 7B</div>
                                        <div className="text-sm text-muted-foreground">11:00 AM - 12:00 PM</div>
                                    </div>
                                </div>
                                <Badge variant="secondary" className="bg-yellow-500">Upcoming</Badge>
                            </div>
                        </div>
                    </ChartCard>
                </div>
            </>
        );
    }

    function SchoolView() {
        return (
            <>
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">School Dashboard</h1>
                        <p className="text-muted-foreground">Monitor school performance and compliance metrics</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <Shield className="h-4 w-4 mr-2" />
                            Compliance
                        </Button>
                        <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Reports
                        </Button>
                    </div>
                </div>

                {/* KPIs */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-4 mb-6">
                    <KPI label="Compliance Score" value="82%" change="+3% this month" icon={Shield} color="green" />
                    <KPI label="Pupil-Teacher Ratio" value="28:1" change="Within standards" icon={Users} color="blue" />
                    <KPI label="Today's Attendance" value="94%" change="Above average" icon={Calendar} color="green" />
                    <KPI label="Budget Utilization" value="61%" change="On track" icon={DollarSign} color="purple" />
                </div>

                {/* Charts and Data */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
                    <ChartCard title="School Performance Metrics" actions={<Button variant="outline" size="sm"><TrendingUp className="h-3 w-3" /></Button>}>
                        <MiniChart type="line" />
                    </ChartCard>
                    <ChartCard title="Compliance Overview" actions={<Button variant="outline" size="sm"><Shield className="h-3 w-3" /></Button>}>
                        <MiniChart type="bar" />
                    </ChartCard>
                    <ChartCard title="Budget Allocation" actions={<Button variant="outline" size="sm"><DollarSign className="h-3 w-3" /></Button>}>
                        <MiniChart type="pie" />
                    </ChartCard>
                </div>

                {/* Recent Activity */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                    <ChartCard title="Compliance Alerts">
                        <div className="space-y-3">
                            <AlertCard type="warning" message="PTR approaching limit in Grade 6" time="1 day ago" />
                            <AlertCard type="success" message="Safety inspection passed" time="3 days ago" />
                            <AlertCard type="info" message="Annual report due next month" time="1 week ago" />
                        </div>
                    </ChartCard>
                    <ChartCard title="Staff Overview">
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Users className="h-4 w-4 text-blue-500" />
                                    <div>
                                        <div className="font-medium">Teaching Staff</div>
                                        <div className="text-sm text-muted-foreground">45 teachers • 2 vacancies</div>
                                    </div>
                                </div>
                                <Badge variant="default" className="bg-green-500">Good</Badge>
                            </div>
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex items-center gap-3">
                                    <GraduationCap className="h-4 w-4 text-green-500" />
                                    <div>
                                        <div className="font-medium">Student Enrollment</div>
                                        <div className="text-sm text-muted-foreground">1,250 students • 98% capacity</div>
                                    </div>
                                </div>
                                <Badge variant="secondary" className="bg-yellow-500">Near Capacity</Badge>
                            </div>
                        </div>
                    </ChartCard>
                </div>
            </>
        );
    }

    function AdminView() {
        return (
            <>
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">National Dashboard</h1>
                        <p className="text-muted-foreground">Monitor national education metrics and compliance</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <BarChart3 className="h-4 w-4 mr-2" />
                            Analytics
                        </Button>
                        <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Export Data
                        </Button>
                    </div>
                </div>

                {/* KPIs */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-4 mb-6">
                    <KPI label="Gross Enrollment Rate" value="89%" change="+2% YoY" icon={TrendingUp} color="green" />
                    <KPI label="Net Enrollment Rate" value="84%" change="+1% YoY" icon={Users} color="blue" />
                    <KPI label="Pupil-Teacher Ratio" value="30:1" change="Within target" icon={GraduationCap} color="purple" />
                    <KPI label="Learning Outcomes" value="+6%" change="YoY improvement" icon={Target} color="green" />
                </div>

                {/* Charts and Data */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
                    <ChartCard title="National KPI Trends" actions={<Button variant="outline" size="sm"><TrendingUp className="h-3 w-3" /></Button>}>
                        <MiniChart type="line" />
                    </ChartCard>
                    <ChartCard title="Regional Performance" actions={<Button variant="outline" size="sm"><BarChart3 className="h-3 w-3" /></Button>}>
                        <MiniChart type="bar" />
                    </ChartCard>
                    <ChartCard title="Policy Compliance" actions={<Button variant="outline" size="sm"><Shield className="h-3 w-3" /></Button>}>
                        <MiniChart type="pie" />
                    </ChartCard>
                </div>

                {/* Recent Activity */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                    <ChartCard title="Policy Monitoring">
                        <div className="space-y-3">
                            <AlertCard type="success" message="New curriculum implementation 95% complete" time="2 hours ago" />
                            <AlertCard type="warning" message="3 schools below compliance threshold" time="1 day ago" />
                            <AlertCard type="info" message="Teacher training program launched" time="3 days ago" />
                        </div>
                    </ChartCard>
                    <ChartCard title="Regional Overview">
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex items-center gap-3">
                                    <School className="h-4 w-4 text-blue-500" />
                                    <div>
                                        <div className="font-medium">Greater Accra</div>
                                        <div className="text-sm text-muted-foreground">450 schools • 92% compliance</div>
                                    </div>
                                </div>
                                <Badge variant="default" className="bg-green-500">Excellent</Badge>
                            </div>
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex items-center gap-3">
                                    <School className="h-4 w-4 text-yellow-500" />
                                    <div>
                                        <div className="font-medium">Northern Region</div>
                                        <div className="text-sm text-muted-foreground">280 schools • 78% compliance</div>
                                    </div>
                                </div>
                                <Badge variant="secondary" className="bg-yellow-500">Needs Attention</Badge>
                            </div>
                        </div>
                    </ChartCard>
                </div>
            </>
        );
    }

    function VendorView() {
        return (
            <>
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">Vendor Dashboard</h1>
                        <p className="text-muted-foreground">Manage tenders and track payment status</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <ClipboardList className="h-4 w-4 mr-2" />
                            Tenders
                        </Button>
                        <Button variant="outline" size="sm">
                            <CreditCard className="h-4 w-4 mr-2" />
                            Payments
                        </Button>
                    </div>
                </div>

                {/* KPIs */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-4 mb-6">
                    <KPI label="Active Tenders" value="4" change="2 closing soon" icon={ClipboardList} color="blue" />
                    <KPI label="Pending Payments" value="₵ 12,300" change="3 invoices" icon={CreditCard} color="yellow" />
                    <KPI label="Compliance Status" value="Valid" change="Expires in 6 months" icon={Shield} color="green" />
                    <KPI label="Success Rate" value="87%" change="+5% this year" icon={Target} color="green" />
                </div>

                {/* Charts and Data */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
                    <ChartCard title="Tender Activity" actions={<Button variant="outline" size="sm"><TrendingUp className="h-3 w-3" /></Button>}>
                        <MiniChart type="line" />
                    </ChartCard>
                    <ChartCard title="Payment Timeline" actions={<Button variant="outline" size="sm"><CreditCard className="h-3 w-3" /></Button>}>
                        <MiniChart type="bar" />
                    </ChartCard>
                    <ChartCard title="Contract Distribution" actions={<Button variant="outline" size="sm"><PieChart className="h-3 w-3" /></Button>}>
                        <MiniChart type="pie" />
                    </ChartCard>
                </div>

                {/* Recent Activity */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                    <ChartCard title="Recent Activity">
                        <div className="space-y-3">
                            <AlertCard type="success" message="Tender submission successful" time="1 hour ago" />
                            <AlertCard type="info" message="Payment received for Invoice #1234" time="2 days ago" />
                            <AlertCard type="warning" message="Compliance renewal due next month" time="1 week ago" />
                        </div>
                    </ChartCard>
                    <ChartCard title="Active Contracts">
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex items-center gap-3">
                                    <ClipboardList className="h-4 w-4 text-blue-500" />
                                    <div>
                                        <div className="font-medium">School Supplies Contract</div>
                                        <div className="text-sm text-muted-foreground">₵ 25,000 • 6 months remaining</div>
                                    </div>
                                </div>
                                <Badge variant="default" className="bg-green-500">Active</Badge>
                            </div>
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex items-center gap-3">
                                    <ClipboardList className="h-4 w-4 text-yellow-500" />
                                    <div>
                                        <div className="font-medium">IT Equipment Tender</div>
                                        <div className="text-sm text-muted-foreground">₵ 50,000 • Under review</div>
                                    </div>
                                </div>
                                <Badge variant="secondary" className="bg-yellow-500">Pending</Badge>
                            </div>
                        </div>
                    </ChartCard>
                </div>
            </>
        );
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Title />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {!primaryRole && (
                    <div className="text-center py-12">
                        <div className="mb-4">
                            <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <h2 className="text-xl font-semibold mb-2">Welcome to Adesua</h2>
                            <p className="text-muted-foreground">Please contact your administrator to assign roles to your account.</p>
                        </div>
                        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                            <ChartCard title="System Overview">
                                <MiniChart type="line" />
                            </ChartCard>
                            <ChartCard title="User Statistics">
                                <MiniChart type="bar" />
                            </ChartCard>
                            <ChartCard title="Activity Summary">
                                <MiniChart type="pie" />
                            </ChartCard>
                        </div>
                    </div>
                )}
                {primaryRole === 'student' && <StudentView />}
                {primaryRole === 'parent' && <ParentView />}
                {primaryRole === 'teacher' && <TeacherView />}
                {primaryRole === 'school' && <SchoolView />}
                {primaryRole === 'admin' && <AdminView />}
                {primaryRole === 'vendor' && <VendorView />}
            </div>
        </AppLayout>
    );
}
