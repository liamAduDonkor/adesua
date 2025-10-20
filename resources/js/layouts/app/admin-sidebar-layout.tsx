import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';
import { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';

export default function AdminSidebarLayout({
    children,
    breadcrumbs = [],
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    const page = usePage();
    const currentUrl = (page as any).url || '/';
    const [activeMenuItem, setActiveMenuItem] = useState<string | null>(null);

    // Define admin menu items with their content
    const adminMenuItems = {
        '/admin': {
            title: 'Admin Dashboard',
            content: 'Overview of system statistics and key metrics',
            icon: '📊'
        },
        '/admin/analytics': {
            title: 'Analytics Dashboard',
            content: 'Comprehensive performance analytics across all entities',
            icon: '📈'
        },
        '/admin/search/teachers': {
            title: 'Teacher Search',
            content: 'Search and analyze teacher performance data',
            icon: '👨‍🏫'
        },
        '/admin/search/students': {
            title: 'Student Search',
            content: 'Search and analyze student performance data',
            icon: '👨‍🎓'
        },
        '/admin/search/vendors': {
            title: 'Vendor Search',
            content: 'Search and analyze vendor statistics and contracts',
            icon: '🏢'
        },
        '/admin/kpi': {
            title: 'Key Performance Indicators',
            content: 'Monitor critical performance metrics and benchmarks',
            icon: '🎯'
        },
        '/admin/compliance': {
            title: 'Compliance Management',
            content: 'Track school compliance and regulatory requirements',
            icon: '✅'
        },
        '/admin/reports': {
            title: 'Reports & Analytics',
            content: 'Generate comprehensive reports and data exports',
            icon: '📋'
        },
        '/admin/users': {
            title: 'User Management',
            content: 'Manage system users, roles, and permissions',
            icon: '👥'
        }
    };

    // Determine active menu item based on current URL
    useEffect(() => {
        const activeItem = Object.keys(adminMenuItems).find(key => 
            currentUrl === key || (key !== '/admin' && currentUrl.startsWith(key))
        );
        setActiveMenuItem(activeItem || null);
    }, [currentUrl]);

    const activeItemData = activeMenuItem ? adminMenuItems[activeMenuItem as keyof typeof adminMenuItems] : null;

    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <div className="flex flex-1">
                <AppContent variant="sidebar" className="overflow-x-hidden flex-1">
                    <AppSidebarHeader breadcrumbs={breadcrumbs} />
                    {children}
                </AppContent>
                
                {/* Side Content Panel */}
                {activeItemData && (
                    <div className="w-80 border-l border-gray-200 bg-gray-50 dark:bg-gray-900 dark:border-gray-700 flex-shrink-0">
                        <div className="p-6">
                            <div className="flex items-center mb-4">
                                <span className="text-2xl mr-3">{activeItemData.icon}</span>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                    {activeItemData.title}
                                </h3>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                                {activeItemData.content}
                            </p>
                            
                            {/* Quick Actions */}
                            <div className="space-y-3">
                                <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                    Quick Actions
                                </h4>
                                
                                {activeMenuItem === '/admin' && (
                                    <div className="space-y-2">
                                        <button className="w-full text-left px-3 py-2 text-sm bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                                            View System Overview
                                        </button>
                                        <button className="w-full text-left px-3 py-2 text-sm bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-md hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                                            Export Statistics
                                        </button>
                                    </div>
                                )}
                                
                                {activeMenuItem === '/admin/analytics' && (
                                    <div className="space-y-2">
                                        <button className="w-full text-left px-3 py-2 text-sm bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                                            Teacher Analytics
                                        </button>
                                        <button className="w-full text-left px-3 py-2 text-sm bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-md hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                                            Student Analytics
                                        </button>
                                        <button className="w-full text-left px-3 py-2 text-sm bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-md hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
                                            Vendor Analytics
                                        </button>
                                    </div>
                                )}
                                
                                {(activeMenuItem === '/admin/search/teachers' || activeMenuItem === '/admin/search/students' || activeMenuItem === '/admin/search/vendors') && (
                                    <div className="space-y-2">
                                        <button className="w-full text-left px-3 py-2 text-sm bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                                            Advanced Filters
                                        </button>
                                        <button className="w-full text-left px-3 py-2 text-sm bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-md hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                                            Export Results
                                        </button>
                                        <button className="w-full text-left px-3 py-2 text-sm bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-md hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
                                            Save Search
                                        </button>
                                    </div>
                                )}
                                
                                {activeMenuItem === '/admin/kpi' && (
                                    <div className="space-y-2">
                                        <button className="w-full text-left px-3 py-2 text-sm bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                                            Set Targets
                                        </button>
                                        <button className="w-full text-left px-3 py-2 text-sm bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-md hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                                            View Trends
                                        </button>
                                    </div>
                                )}
                                
                                {activeMenuItem === '/admin/compliance' && (
                                    <div className="space-y-2">
                                        <button className="w-full text-left px-3 py-2 text-sm bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                                            Check Compliance
                                        </button>
                                        <button className="w-full text-left px-3 py-2 text-sm bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-md hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                                            Generate Report
                                        </button>
                                    </div>
                                )}
                                
                                {activeMenuItem === '/admin/reports' && (
                                    <div className="space-y-2">
                                        <button className="w-full text-left px-3 py-2 text-sm bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                                            Custom Report
                                        </button>
                                        <button className="w-full text-left px-3 py-2 text-sm bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-md hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                                            Schedule Report
                                        </button>
                                    </div>
                                )}
                                
                                {activeMenuItem === '/admin/users' && (
                                    <div className="space-y-2">
                                        <button className="w-full text-left px-3 py-2 text-sm bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                                            Add User
                                        </button>
                                        <button className="w-full text-left px-3 py-2 text-sm bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-md hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                                            Manage Roles
                                        </button>
                                    </div>
                                )}
                            </div>
                            
                            {/* Recent Activity */}
                            <div className="mt-8">
                                <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
                                    Recent Activity
                                </h4>
                                <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                        <span>System updated successfully</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                                        <span>New performance data imported</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                                        <span>Compliance check scheduled</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}
