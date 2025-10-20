import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { type BreadcrumbItem } from '@/types';

interface NavbarProps {
    breadcrumbs?: BreadcrumbItem[];
}

export default function Navbar({ breadcrumbs = [] }: NavbarProps) {
    return <AppSidebarHeader breadcrumbs={breadcrumbs} />;
}


