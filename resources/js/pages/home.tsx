import { Head, usePage, Link } from '@inertiajs/react';
import { type SharedData } from '@/types';
import { dashboard } from '@/routes';
import { 
    GraduationCap, 
    Users, 
    BarChart3, 
    Shield, 
    BookOpen, 
    Clock, 
    CheckCircle, 
    TrendingUp,
    ArrowRight,
    User,
    Calendar,
    Wallet,
    FileText,
    Building2,
    DollarSign,
    ClipboardList,
    CreditCard,
    FileCheck,
    Search,
    Bell,
    AlertTriangle
} from 'lucide-react';

export default function Home() {
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

    const roleFeatures = {
        student: {
            title: "Student Portal",
            description: "Access your academic journey, track attendance, manage your wallet, and view performance reports.",
            icon: GraduationCap,
            color: "bg-blue-500",
            features: [
                { icon: User, title: "Profile Management", description: "Update personal information and academic details" },
                { icon: Calendar, title: "Attendance Tracking", description: "View attendance records and calendar" },
                { icon: BookOpen, title: "Academic Progress", description: "Track grades, courses, and performance" },
                { icon: Wallet, title: "Digital Wallet", description: "Manage payments and transactions" },
                { icon: FileText, title: "Reports & Certificates", description: "Download academic reports and certificates" }
            ]
        },
        parent: {
            title: "Parent Portal",
            description: "Monitor your children's progress, manage approvals, and stay connected with their education.",
            icon: Users,
            color: "bg-green-500",
            features: [
                { icon: Users, title: "Children Management", description: "View and manage linked student accounts" },
                { icon: CheckCircle, title: "Approvals", description: "Approve purchases and school requests" },
                { icon: Wallet, title: "Wallet Management", description: "Load funds and review spending history" },
                { icon: Bell, title: "Notifications", description: "Receive alerts and updates" }
            ]
        },
        teacher: {
            title: "Teacher Portal",
            description: "Manage classes, track student performance, submit reports, and monitor attendance.",
            icon: BookOpen,
            color: "bg-purple-500",
            features: [
                { icon: Calendar, title: "Attendance Logging", description: "Daily class attendance management" },
                { icon: TrendingUp, title: "Performance Analytics", description: "Track student progress and trends" },
                { icon: FileText, title: "Report Generation", description: "Create and submit academic reports" },
                { icon: AlertTriangle, title: "Disciplinary Actions", description: "Submit incident reports and actions" }
            ]
        },
        school: {
            title: "School Management",
            description: "Comprehensive school administration with staff management, student tracking, and financial oversight.",
            icon: Building2,
            color: "bg-orange-500",
            features: [
                { icon: Users, title: "Staff Management", description: "Manage teachers and administrative staff" },
                { icon: GraduationCap, title: "Student Registry", description: "Enrollment and student information management" },
                { icon: BarChart3, title: "Analytics Dashboard", description: "School performance and compliance metrics" },
                { icon: DollarSign, title: "Financial Management", description: "Budget tracking and fee management" }
            ]
        },
        admin: {
            title: "Administration",
            description: "National-level oversight with comprehensive analytics, compliance monitoring, and system management.",
            icon: Shield,
            color: "bg-red-500",
            features: [
                { icon: BarChart3, title: "Analytics Dashboard", description: "National education performance metrics" },
                { icon: Search, title: "Search & Discovery", description: "Find teachers, students, and vendors" },
                { icon: TrendingUp, title: "KPI Monitoring", description: "Key performance indicators tracking" },
                { icon: Shield, title: "Compliance Management", description: "School compliance and standards monitoring" },
                { icon: FileText, title: "Report Generation", description: "National and regional reports" },
                { icon: Users, title: "User Management", description: "System user administration" }
            ]
        },
        vendor: {
            title: "Vendor Portal",
            description: "Manage tenders, track payments, and maintain compliance with educational procurement standards.",
            icon: ClipboardList,
            color: "bg-teal-500",
            features: [
                { icon: ClipboardList, title: "Tender Management", description: "Browse and respond to educational tenders" },
                { icon: CreditCard, title: "Payment Tracking", description: "Monitor invoices and payment status" },
                { icon: FileCheck, title: "Compliance Status", description: "Maintain tax clearance and certifications" }
            ]
        }
    };

    const quickStats = [
        { label: "Active Users", value: "150,000+", icon: Users },
        { label: "Schools Connected", value: "2,500+", icon: Building2 },
        { label: "Teachers Online", value: "8,500+", icon: GraduationCap },
        { label: "Compliance Rate", value: "94%", icon: CheckCircle }
    ];

    return (
        <>
            <Head title="Home - Adesua Education Management System" />
            <div className="min-h-screen bg-[#FDFDFC] dark:bg-[#0a0a0a]">
                {/* Hero Section */}
                <div className="bg-gradient-to-br from-[#1b1b18] to-[#2a2a26] dark:from-[#0a0a0a] dark:to-[#1a1a1a] text-[#FDFDFC] py-20">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="text-center mb-12">
                            <h1 className="text-4xl font-bold mb-4 lg:text-5xl">
                                Welcome to Adesua
                            </h1>
                            <p className="text-xl text-[#AFAFA9] mb-8 max-w-3xl mx-auto">
                                Ghana's comprehensive education management system connecting schools, students, teachers, and administrators.
                            </p>
                            
                            {auth?.user ? (
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <Link
                                        href={dashboard()}
                                        className="inline-flex items-center gap-2 rounded-lg px-8 py-4 text-lg font-medium bg-[#EDEDEC] text-[#0a0a0a] hover:bg-[#d7d7d5] transition-colors"
                                    >
                                        Continue to Dashboard
                                        <ArrowRight className="h-5 w-5" />
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <Link
                                        href={dashboard()}
                                        className="inline-flex items-center gap-2 rounded-lg px-8 py-4 text-lg font-medium bg-[#EDEDEC] text-[#0a0a0a] hover:bg-[#d7d7d5] transition-colors"
                                    >
                                        Go to Dashboard
                                        <ArrowRight className="h-5 w-5" />
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {quickStats.map((stat, index) => {
                                const IconComponent = stat.icon;
                                return (
                                    <div key={index} className="text-center">
                                        <div className="inline-flex items-center justify-center w-12 h-12 bg-[#EDEDEC] text-[#0a0a0a] rounded-lg mb-3">
                                            <IconComponent className="h-6 w-6" />
                                        </div>
                                        <div className="text-2xl font-bold text-[#EDEDEC] mb-1">
                                            {stat.value}
                                        </div>
                                        <div className="text-sm text-[#AFAFA9]">
                                            {stat.label}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Role-based Content */}
                {primaryRole && roleFeatures[primaryRole] && (
                    <div className="py-16">
                        <div className="max-w-6xl mx-auto px-6">
                            <div className="text-center mb-12">
                                <div className={`inline-flex items-center justify-center w-16 h-16 ${roleFeatures[primaryRole].color} text-white rounded-xl mb-4`}>
                                    {(() => {
                                        const IconComponent = roleFeatures[primaryRole].icon;
                                        return <IconComponent className="h-8 w-8" />;
                                    })()}
                                </div>
                                <h2 className="text-3xl font-bold text-[#1b1b18] dark:text-[#EDEDEC] mb-4">
                                    {roleFeatures[primaryRole].title}
                                </h2>
                                <p className="text-lg text-[#4A4A45] dark:text-[#AFAFA9] max-w-2xl mx-auto">
                                    {roleFeatures[primaryRole].description}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {roleFeatures[primaryRole].features.map((feature, index) => {
                                    const IconComponent = feature.icon;
                                    return (
                                        <Link
                                            key={index}
                                            href={dashboard()}
                                            className="group bg-white dark:bg-[#1a1a1a] rounded-xl p-6 border border-[#E5E5E3] dark:border-[#2a2a2a] hover:shadow-lg hover:border-[#1b1b18] dark:hover:border-[#EDEDEC] transition-all"
                                        >
                                            <div className="flex items-center mb-4">
                                                <div className="p-2 bg-[#F8F8F7] dark:bg-[#2a2a2a] rounded-lg group-hover:bg-[#1b1b18] dark:group-hover:bg-[#EDEDEC] transition-colors">
                                                    <IconComponent className="h-5 w-5 text-[#1b1b18] dark:text-[#EDEDEC] group-hover:text-[#FDFDFC] dark:group-hover:text-[#0a0a0a]" />
                                                </div>
                                            </div>
                                            <h3 className="text-lg font-semibold text-[#1b1b18] dark:text-[#EDEDEC] mb-2">
                                                {feature.title}
                                            </h3>
                                            <p className="text-sm text-[#4A4A45] dark:text-[#AFAFA9]">
                                                {feature.description}
                                            </p>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {/* System Overview */}
                <div className="bg-[#F8F8F7] dark:bg-[#111111] py-16">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-[#1b1b18] dark:text-[#EDEDEC] mb-4">
                                System Overview
                            </h2>
                            <p className="text-lg text-[#4A4A45] dark:text-[#AFAFA9] max-w-2xl mx-auto">
                                Comprehensive tools for every stakeholder in Ghana's education system
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {Object.entries(roleFeatures).map(([role, config]) => {
                                const IconComponent = config.icon;
                                return (
                                    <div key={role} className="bg-white dark:bg-[#1a1a1a] rounded-xl p-6 border border-[#E5E5E3] dark:border-[#2a2a2a]">
                                        <div className="flex items-center mb-4">
                                            <div className={`p-2 ${config.color} text-white rounded-lg`}>
                                                <IconComponent className="h-6 w-6" />
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-semibold text-[#1b1b18] dark:text-[#EDEDEC] mb-2">
                                            {config.title}
                                        </h3>
                                        <p className="text-[#4A4A45] dark:text-[#AFAFA9] mb-4">
                                            {config.description}
                                        </p>
                                        <div className="text-sm text-[#4A4A45] dark:text-[#AFAFA9]">
                                            {config.features.length} key features available
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="py-16">
                    <div className="max-w-4xl mx-auto text-center px-6">
                        <h2 className="text-3xl font-bold text-[#1b1b18] dark:text-[#EDEDEC] mb-4">
                            Access Your Dashboard
                        </h2>
                        <p className="text-lg text-[#4A4A45] dark:text-[#AFAFA9] mb-8">
                            Manage your educational journey and access all your personalized features and tools.
                        </p>
                        <Link
                            href={dashboard()}
                            className="inline-flex items-center gap-2 rounded-lg px-8 py-4 text-lg font-medium text-[#FDFDFC] bg-[#1b1b18] hover:bg-[#141411] dark:text-[#0a0a0a] dark:bg-[#EDEDEC] dark:hover:bg-[#d7d7d5] transition-colors"
                        >
                            Go to Dashboard
                            <ArrowRight className="h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}


