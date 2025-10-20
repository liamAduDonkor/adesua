import { NavFooter } from '@/components/nav-footer';
import { type NavItem } from '@/types';

interface FooterProps {
    items?: NavItem[];
    className?: string;
}

export default function Footer({ items = [], className }: FooterProps) {
    return <NavFooter items={items} className={className} />;
}


