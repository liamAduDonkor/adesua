import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { 
    GraduationCap, 
    Users, 
    BarChart3, 
    Shield, 
    BookOpen, 
    Clock, 
    CheckCircle, 
    TrendingUp,
    Heart,
    Star,
    ArrowRight
} from 'lucide-react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    const features = [
        {
            icon: GraduationCap,
            title: "Student Management",
            description: "Comprehensive student profiles, attendance tracking, and academic performance monitoring."
        },
        {
            icon: Users,
            title: "Teacher Portal",
            description: "Class management, performance analytics, and streamlined reporting tools."
        },
        {
            icon: BarChart3,
            title: "Analytics Dashboard",
            description: "Real-time insights into school performance, compliance metrics, and educational outcomes."
        },
        {
            icon: Shield,
            title: "Compliance Monitoring",
            description: "Automated compliance tracking and reporting for educational standards and regulations."
        },
        {
            icon: BookOpen,
            title: "Academic Tracking",
            description: "Detailed academic progress monitoring with performance trends and improvement recommendations."
        },
        {
            icon: Clock,
            title: "Attendance Management",
            description: "Digital attendance logging with real-time notifications and automated reporting."
        }
    ];

    const stats = [
        { label: "Schools Connected", value: "2,500+" },
        { label: "Students Enrolled", value: "150,000+" },
        { label: "Teachers Active", value: "8,500+" },
        { label: "Compliance Rate", value: "94%" }
    ];

    return (
        <>
            <Head title="Adesua - Ghana Education Management System">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="min-h-screen bg-gradient-to-br from-[#F8F9FA] via-[#FDFDFC] to-[#F0F4F8] text-[#1a1a1a] dark:from-[#0a0a0a] dark:via-[#111111] dark:to-[#0f0f0f] dark:text-[#EDEDEC]">
                {/* Hero Section */}
                <div className="relative flex min-h-screen flex-col items-center justify-center p-6 lg:p-10 overflow-hidden">
                    {/* Background decorative elements */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#FFD700]/20 to-[#FF6B35]/20 rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[#00A651]/20 to-[#0066CC]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#FFD700]/10 to-[#00A651]/10 rounded-full blur-3xl animate-pulse delay-500"></div>
                    </div>
                    
                    <div className="relative w-full max-w-4xl text-center z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-[#1a1a1a]/80 backdrop-blur-sm rounded-full border border-[#E5E5E3] dark:border-[#2a2a2a] mb-8 shadow-sm">
                            <div className="w-2 h-2 bg-[#00A651] rounded-full animate-pulse"></div>
                            <span className="text-sm font-medium text-[#4A4A45] dark:text-[#AFAFA9]">Ghana Education Management System</span>
                        </div>
                        
                        <h1 className="text-6xl font-bold tracking-tight bg-gradient-to-r from-[#1a1a1a] via-[#00A651] to-[#FFD700] dark:from-[#EDEDEC] dark:via-[#00A651] dark:to-[#FFD700] bg-clip-text text-transparent lg:text-7xl mb-4">
                            Adesua
                        </h1>
                        <p className="mt-4 text-2xl font-semibold text-[#2d2d2a] dark:text-[#d0d0d0] lg:text-3xl">
                            The Art of Learning
                        </p>
                        <p className="mt-6 text-lg text-[#4A4A45] dark:text-[#AFAFA9] max-w-2xl mx-auto leading-relaxed">
                            Ghana's comprehensive education management system connecting schools, students, teachers, and administrators in one unified platform.
                        </p>

                        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
                            {auth?.user ? (
                                <Link
                                    href={dashboard()}
                                    className="group inline-flex items-center gap-3 rounded-xl px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-[#00A651] to-[#0066CC] hover:from-[#008A42] hover:to-[#0052A3] shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                                >
                                    Go to Dashboard
                                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="group inline-flex items-center gap-3 rounded-xl px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-[#00A651] to-[#0066CC] hover:from-[#008A42] hover:to-[#0052A3] shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                                    >
                                        Log in
                                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                    <Link
                                        href={register()}
                                        className="group inline-flex items-center gap-3 rounded-xl px-8 py-4 text-lg font-semibold text-[#1a1a1a] bg-white/90 dark:bg-[#1a1a1a]/90 backdrop-blur-sm border-2 border-[#00A651] hover:bg-[#00A651] hover:text-white dark:text-[#EDEDEC] dark:border-[#00A651] dark:hover:bg-[#00A651] shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="relative bg-gradient-to-r from-[#F8F9FA] to-[#F0F4F8] dark:from-[#111111] dark:to-[#0f0f0f] py-20 overflow-hidden">
                    <div className="absolute inset-0 opacity-30">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#00A651]/5 to-transparent"></div>
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0066CC]/5"></div>
                    </div>
                    <div className="relative max-w-6xl mx-auto px-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="group text-center p-6 bg-white/60 dark:bg-[#1a1a1a]/60 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-[#2a2a2a]/20 hover:bg-white/80 dark:hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:shadow-lg">
                                    <div className="text-4xl font-bold bg-gradient-to-r from-[#00A651] to-[#0066CC] bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                                        {stat.value}
                                    </div>
                                    <div className="mt-3 text-sm font-medium text-[#4A4A45] dark:text-[#AFAFA9] group-hover:text-[#2d2d2a] dark:group-hover:text-[#d0d0d0] transition-colors">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="py-24 bg-gradient-to-b from-white to-[#F8F9FA] dark:from-[#0a0a0a] dark:to-[#111111]">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="text-center mb-20">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00A651]/10 dark:bg-[#00A651]/20 rounded-full mb-6">
                                <div className="w-2 h-2 bg-[#00A651] rounded-full"></div>
                                <span className="text-sm font-medium text-[#00A651]">Features</span>
                            </div>
                            <h2 className="text-4xl font-bold bg-gradient-to-r from-[#1a1a1a] to-[#00A651] dark:from-[#EDEDEC] dark:to-[#00A651] bg-clip-text text-transparent mb-6">
                                Comprehensive Education Management
                            </h2>
                            <p className="text-xl text-[#4A4A45] dark:text-[#AFAFA9] max-w-3xl mx-auto leading-relaxed">
                                Everything you need to manage educational institutions, from student enrollment to compliance reporting.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {features.map((feature, index) => {
                                const IconComponent = feature.icon;
                                return (
                                    <div key={index} className="group bg-white/80 dark:bg-[#1a1a1a]/80 backdrop-blur-sm rounded-2xl p-8 border border-[#E5E5E3]/50 dark:border-[#2a2a2a]/50 hover:border-[#00A651]/30 dark:hover:border-[#00A651]/30 hover:shadow-xl hover:shadow-[#00A651]/10 dark:hover:shadow-[#00A651]/20 transition-all duration-300 hover:-translate-y-1">
                                        <div className="flex items-center mb-6">
                                            <div className="p-3 bg-gradient-to-br from-[#00A651] to-[#0066CC] rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                                <IconComponent className="h-7 w-7 text-white" />
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold text-[#1a1a1a] dark:text-[#EDEDEC] mb-3 group-hover:text-[#00A651] transition-colors">
                                            {feature.title}
                                        </h3>
                                        <p className="text-[#4A4A45] dark:text-[#AFAFA9] leading-relaxed group-hover:text-[#2d2d2a] dark:group-hover:text-[#d0d0d0] transition-colors">
                                            {feature.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Benefits Section */}
                <div className="relative bg-gradient-to-br from-[#F8F9FA] via-[#F0F4F8] to-[#E8F4FD] dark:from-[#111111] dark:via-[#0f0f0f] dark:to-[#0a0a0a] py-24 overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#00A651]/10 to-transparent"></div>
                        <div className="absolute inset-0 bg-gradient-to-tl from-[#FFD700]/5 to-transparent"></div>
                    </div>
                    <div className="relative max-w-6xl mx-auto px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00A651]/10 dark:bg-[#00A651]/20 rounded-full mb-6">
                                    <div className="w-2 h-2 bg-[#00A651] rounded-full"></div>
                                    <span className="text-sm font-medium text-[#00A651]">Why Choose Adesua?</span>
                                </div>
                                <h2 className="text-4xl font-bold bg-gradient-to-r from-[#1a1a1a] to-[#00A651] dark:from-[#EDEDEC] dark:to-[#00A651] bg-clip-text text-transparent mb-8">
                                    Built for Ghana's Education System
                                </h2>
                                <div className="space-y-8">
                                    <div className="group flex items-start gap-6 p-4 rounded-xl hover:bg-white/50 dark:hover:bg-[#1a1a1a]/50 transition-all duration-300">
                                        <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                            <CheckCircle className="h-6 w-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-[#1a1a1a] dark:text-[#EDEDEC] mb-2 group-hover:text-[#00A651] transition-colors">
                                                Real-time Monitoring
                                            </h3>
                                            <p className="text-[#4A4A45] dark:text-[#AFAFA9] leading-relaxed">
                                                Track attendance, performance, and compliance metrics in real-time across all institutions.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="group flex items-start gap-6 p-4 rounded-xl hover:bg-white/50 dark:hover:bg-[#1a1a1a]/50 transition-all duration-300">
                                        <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                            <TrendingUp className="h-6 w-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-[#1a1a1a] dark:text-[#EDEDEC] mb-2 group-hover:text-[#00A651] transition-colors">
                                                Data-Driven Insights
                                            </h3>
                                            <p className="text-[#4A4A45] dark:text-[#AFAFA9] leading-relaxed">
                                                Comprehensive analytics help identify trends and improve educational outcomes.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="group flex items-start gap-6 p-4 rounded-xl hover:bg-white/50 dark:hover:bg-[#1a1a1a]/50 transition-all duration-300">
                                        <div className="p-3 bg-gradient-to-br from-[#FFD700] to-[#FF6B35] rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                            <Heart className="h-6 w-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-[#1a1a1a] dark:text-[#EDEDEC] mb-2 group-hover:text-[#00A651] transition-colors">
                                                Built for Ghana
                                            </h3>
                                            <p className="text-[#4A4A45] dark:text-[#AFAFA9] leading-relaxed">
                                                Designed specifically for Ghana's education system and regulatory requirements.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="bg-white/80 dark:bg-[#1a1a1a]/80 backdrop-blur-sm rounded-3xl p-10 border border-white/20 dark:border-[#2a2a2a]/20 shadow-2xl">
                                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-[#FFD700] to-[#FF6B35] rounded-full animate-pulse"></div>
                                    <div className="text-center">
                                        <div className="p-4 bg-gradient-to-br from-[#FFD700] to-[#FF6B35] rounded-2xl w-fit mx-auto mb-6 shadow-lg">
                                            <Star className="h-12 w-12 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-[#1a1a1a] dark:text-[#EDEDEC] mb-4">
                                            Trusted by Educators
                                        </h3>
                                        <blockquote className="text-lg text-[#4A4A45] dark:text-[#AFAFA9] leading-relaxed mb-6 italic">
                                            "Adesua has transformed how we manage our school operations. The insights and automation have improved our compliance and student outcomes significantly."
                                        </blockquote>
                                        <div className="text-sm font-semibold text-[#00A651]">
                                            — Headmaster, Accra Academy
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="relative py-24 bg-gradient-to-br from-[#00A651] via-[#0066CC] to-[#00A651] overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/5"></div>
                    </div>
                    <div className="relative max-w-4xl mx-auto text-center px-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-8">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            <span className="text-sm font-medium text-white">Get Started Today</span>
                        </div>
                        <h2 className="text-4xl font-bold text-white mb-6 lg:text-5xl">
                            Ready to Transform Education Management?
                        </h2>
                        <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
                            Join thousands of educators already using Adesua to streamline their operations and improve student outcomes.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            {!auth?.user && (
                                <>
                                    <Link
                                        href={register()}
                                        className="group inline-flex items-center gap-3 rounded-xl px-10 py-5 text-lg font-bold text-[#00A651] bg-white hover:bg-white/90 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300"
                                    >
                                        Start Your Journey
                                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                    <Link
                                        href={login()}
                                        className="group inline-flex items-center gap-3 rounded-xl px-10 py-5 text-lg font-bold text-white bg-white/20 backdrop-blur-sm border-2 border-white/30 hover:bg-white/30 hover:border-white/50 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                                    >
                                        Sign In
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2d2d2a] dark:from-[#0a0a0a] dark:to-[#111111] text-white py-16">
                    <div className="max-w-6xl mx-auto px-6 text-center">
                        <div className="mb-8">
                            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-[#00A651] bg-clip-text text-transparent">Adesua</h3>
                            <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
                                Empowering Ghana's education system through technology
                            </p>
                        </div>
                        <div className="border-t border-white/20 pt-8">
                            <div className="text-sm text-white/60">
                                © 2024 Adesua Education Management System. All rights reserved.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
