import { NavFooter } from '@/components/nav-footer';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarGroup,
    SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { Input } from '@/components/ui/input';
import { type NavItem } from '@/types';
import { Link, usePage, type InertiaLinkProps } from '@inertiajs/react';
import { 
    Home, 
    User, 
    Calendar, 
    GraduationCap, 
    Wallet, 
    FileText, 
    Users, 
    CheckCircle, 
    Bell, 
    BarChart3, 
    Shield, 
    Settings, 
    Building2, 
    DollarSign, 
    ClipboardList, 
    TrendingUp, 
    UserCheck, 
    AlertTriangle, 
    ShoppingCart, 
    CreditCard, 
    FileCheck,
    Search
} from 'lucide-react';
import { useState, useMemo } from 'react';
import AppLogo from './app-logo';

const footerNavItems: NavItem[] = [
    {
        title: 'Help & Support',
        href: '/help',
        icon: null,
    },
    {
        title: 'Privacy Policy',
        href: '/privacy',
        icon: null,
    },
    {
        title: 'Terms of Service',
        href: '/terms',
        icon: null,
    },
];

export function AppSidebar() {
    const page = usePage();
    const auth = (page.props as any).auth;
    const userRoles: string[] = auth?.user?.roles || [];
    const currentUrl: string = (page as any).url || '/';
    const [searchQuery, setSearchQuery] = useState('');
    
    // Debug logging
    console.log('AppSidebar - User roles:', userRoles);
    console.log('AppSidebar - Auth user:', auth?.user);
    
    type HrefType = NonNullable<InertiaLinkProps['href']>;
    const hrefToString = (href: HrefType): string => {
        if (typeof href === 'string') return href;
        const maybeUrl = (href as any).url ?? (href as any).href;
        return typeof maybeUrl === 'string' ? maybeUrl : String(maybeUrl ?? '');
    };
    const normalizePath = (path: string) => {
        if (!path) return '/';
        // keep root as '/'; remove trailing slash elsewhere
        return path !== '/' && path.endsWith('/') ? path.slice(0, -1) : path;
    };
    const isActive = (href: HrefType) => {
        const path = normalizePath(hrefToString(href));
        const current = normalizePath(currentUrl);
        return current === path;
    };

    // Function to check if user has access to a specific role's menu
    const hasAccessToRole = (role: string): boolean => {
        // If user has no roles, show no menus (secure by default)
        if (userRoles.length === 0) return false;
        
        // Check if user has the specific role
        return userRoles.includes(role);
    };

    // Function to check if user has access to a specific menu item
    const hasAccessToMenuItem = (role: string, itemTitle: string): boolean => {
        // For now, if user has access to the role, they have access to all items
        // This can be enhanced later with more granular permissions
        return hasAccessToRole(role);
    };

    const roleMenus: Record<string, { title: string; items: { title: string; href: string; icon: any; badge?: string | number; status?: 'active' | 'warning' | 'error' }[] }> = {
        student: {
            title: 'Student Portal',
            items: [
                { title: 'Dashboard', href: '/student', icon: Home },
                { title: 'Profile', href: '/student/profile', icon: User },
                { title: 'Attendance', href: '/student/attendance', icon: Calendar, badge: 3, status: 'warning' },
                { title: 'Academics', href: '/student/academics', icon: GraduationCap },
                { title: 'Wallet', href: '/student/wallet', icon: Wallet, badge: 'New' },
                { title: 'Reports', href: '/student/reports', icon: FileText },
            ],
        },
        parent: {
            title: 'Parent Portal',
            items: [
                { title: 'Dashboard', href: '/parent', icon: Home },
                { title: 'Children', href: '/parent/children', icon: Users },
                { title: 'Approvals', href: '/parent/approvals', icon: CheckCircle, badge: 2 },
                { title: 'Wallet', href: '/parent/wallet', icon: Wallet },
                { title: 'Notifications', href: '/parent/notifications', icon: Bell, badge: 5, status: 'error' },
            ],
        },
        teacher: {
            title: 'Teacher Portal',
            items: [
                { title: 'Dashboard', href: '/teacher', icon: Home },
                { title: 'Attendance', href: '/teacher/attendance', icon: Calendar },
                { title: 'Performance', href: '/teacher/performance', icon: TrendingUp },
                { title: 'Reports', href: '/teacher/reports', icon: FileText },
                { title: 'Disciplinary', href: '/teacher/disciplinary', icon: AlertTriangle },
            ],
        },
        school: {
            title: 'School Management',
            items: [
                { title: 'Dashboard', href: '/school', icon: Home },
                { title: 'Staff', href: '/school/staff', icon: UserCheck },
                { title: 'Students', href: '/school/students', icon: Users },
                { title: 'Analytics', href: '/school/dashboard', icon: BarChart3 },
                { title: 'Finance', href: '/school/finance', icon: DollarSign },
            ],
        },
        admin: {
            title: 'Administration',
            items: [
                { title: 'Dashboard', href: '/admin', icon: Home },
                { title: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
                { title: 'Schools', href: '/admin/schools', icon: Building2 },
                { title: 'Search Teachers', href: '/admin/search/teachers', icon: Search },
                { title: 'Search Students', href: '/admin/search/students', icon: Search },
                { title: 'Search Vendors', href: '/admin/search/vendors', icon: Search },
                { title: 'KPIs', href: '/admin/kpi', icon: TrendingUp },
                { title: 'Compliance', href: '/admin/compliance', icon: Shield },
                { title: 'Reports', href: '/admin/reports', icon: FileText },
                { title: 'Users', href: '/admin/users', icon: Users },
            ],
        },
        vendor: {
            title: 'Vendor Portal',
            items: [
                { title: 'Dashboard', href: '/vendor', icon: Home },
                { title: 'Tenders', href: '/vendor/tenders', icon: ClipboardList },
                { title: 'Payments', href: '/vendor/payments', icon: CreditCard },
                { title: 'Compliance', href: '/vendor/compliance', icon: FileCheck },
            ],
        },
    };

    // Filter roles based on user permissions
    const visibleRoleKeys = Object.keys(roleMenus).filter(role => hasAccessToRole(role));

    // Filter menu items based on search query and user roles
    const filteredRoleMenus = useMemo(() => {
        const filtered: typeof roleMenus = {};
        const query = searchQuery.toLowerCase();

        console.log('Filtering menus for roles:', userRoles);

        Object.entries(roleMenus).forEach(([role, config]) => {
            // First filter by user roles - only show menus user has access to
            if (!hasAccessToRole(role)) {
                console.log(`Filtering out role: ${role} - user doesn't have access`);
                return;
            }

            console.log(`Including role: ${role} - user has access`);

            // If no search query, show all items for this role
            if (!searchQuery.trim()) {
                filtered[role] = config;
                return;
            }

            // If there's a search query, filter items within this role
            const filteredItems = config.items.filter(item => 
                item.title.toLowerCase().includes(query) ||
                config.title.toLowerCase().includes(query)
            );

            if (filteredItems.length > 0) {
                filtered[role] = {
                    ...config,
                    items: filteredItems
                };
            }
        });

        console.log('Final filtered menus:', Object.keys(filtered));
        return filtered;
    }, [searchQuery, userRoles]);

    return (
        <Sidebar 
            collapsible="icon" 
            variant="inset"
            className="border-r border-sidebar-border bg-gradient-to-b from-[#F8F9FA] to-[#F0F4F8] dark:from-[#0a0a0a] dark:to-[#111111] text-sidebar-foreground shadow-xl"
        >
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
                
                {/* Search Input */}
                <div className="px-3 py-3">
                    <div className="relative group">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-[#00A651] transition-colors" />
                        <Input
                            placeholder="Search menu..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 h-10 text-sm bg-white/60 dark:bg-[#1a1a1a]/60 backdrop-blur-sm border-[#E5E5E3]/50 dark:border-[#2a2a2a]/50 focus:bg-white/80 dark:focus:bg-[#1a1a1a]/80 focus:border-[#00A651]/50 dark:focus:border-[#00A651]/50 transition-all duration-300 rounded-xl shadow-sm hover:shadow-md"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-[#00A651] transition-colors"
                            >
                                ×
                            </button>
                        )}
                    </div>
                </div>
            </SidebarHeader>

            <SidebarContent className="overflow-y-auto scrollbar-thin scrollbar-thumb-[#00A651]/20 scrollbar-track-transparent">
                <SidebarGroup className="px-3 py-0 mt-4">
                    <SidebarGroupLabel className="text-xs font-bold text-[#00A651] uppercase tracking-wider px-3 py-2 bg-[#00A651]/10 dark:bg-[#00A651]/20 rounded-lg mb-3">
                        Navigation
                    </SidebarGroupLabel>
                    <SidebarMenu>
                        {Object.keys(filteredRoleMenus).map((key) => {
                            const role = key as keyof typeof filteredRoleMenus;
                            const cfg = filteredRoleMenus[role];
                            if (!cfg) return null;
                            return (
                                <SidebarGroup key={`role-${role}`} className="px-0 py-0 mt-6">
                                    <SidebarGroupLabel className="text-sm font-bold text-[#1a1a1a] dark:text-[#EDEDEC] mb-3 px-3 py-2 bg-white/60 dark:bg-[#1a1a1a]/60 backdrop-blur-sm rounded-lg border border-[#E5E5E3]/30 dark:border-[#2a2a2a]/30 shadow-sm">
                                        {cfg.title}
                                    </SidebarGroupLabel>
                                    <SidebarMenu className="space-y-1">
                                        {cfg.items.map((item) => {
                                                const IconComponent = item.icon;
                                                const getBadgeColor = (status?: string) => {
                                                    switch (status) {
                                                        case 'error': return 'bg-red-500 text-white';
                                                        case 'warning': return 'bg-yellow-500 text-white';
                                                        case 'active': return 'bg-green-500 text-white';
                                                        default: return 'bg-blue-500 text-white';
                                                    }
                                                };
                                                
                                                return (
                                                    <SidebarMenuItem key={`${role}-${item.title}`}>
                                                        <SidebarMenuButton 
                                                            asChild 
                                                            isActive={isActive(item.href)}
                                                            className="group hover:bg-[#00A651]/10 dark:hover:bg-[#00A651]/20 hover:text-[#00A651] dark:hover:text-[#00A651] transition-all duration-300 rounded-xl mx-2 p-3 hover:shadow-md"
                                                        >
                                                            <Link href={item.href} prefetch className="flex items-center justify-between w-full">
                                                                <div className="flex items-center">
                                                                    <div className="p-1.5 bg-white/60 dark:bg-[#1a1a1a]/60 rounded-lg group-hover:bg-[#00A651]/20 dark:group-hover:bg-[#00A651]/30 transition-colors mr-3">
                                                                        <IconComponent className="h-4 w-4 flex-shrink-0 group-hover:text-[#00A651] transition-colors" />
                                                                    </div>
                                                                    <span className="truncate font-medium group-hover:text-[#00A651] dark:group-hover:text-[#00A651] transition-colors">{item.title}</span>
                                                                </div>
                                                                {item.badge && (
                                                                    <span className={`ml-auto px-2 py-1 text-xs font-semibold rounded-full shadow-sm ${getBadgeColor(item.status)}`}>
                                                                        {item.badge}
                                                                    </span>
                                                                )}
                                                            </Link>
                                                        </SidebarMenuButton>
                                                    </SidebarMenuItem>
                                                );
                                            })}
                                    </SidebarMenu>
                                </SidebarGroup>
                            );
                        })}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t border-[#E5E5E3]/30 dark:border-[#2a2a2a]/30 bg-white/40 dark:bg-[#1a1a1a]/40 backdrop-blur-sm">
                <NavFooter items={footerNavItems} className="mt-auto px-3 py-3" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
