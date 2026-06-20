"use client";

import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/app/app-sidebar";
import { DashboardHeader } from "@/components/application/page-headers/dashboard-header";
import { ThemeToggle } from "@/components/application/app-navigation/base-components/theme-toggle";
import { useAuth } from "@/contexts/auth-context";
import type { NavItemType } from "@/components/application/app-navigation/config";
import {
    Building01,
    Users01,
    LogOut01,
    HomeLine,
    Settings01,
    Users03,
} from "@untitledui/icons";

const mainNavSections: Array<{ label: string; items: NavItemType[] }> = [
    {
        label: "Main",
        items: [
            { label: "Dashboard", href: "/dashboard", icon: HomeLine },
            { label: "Properties", href: "/dashboard/properties", icon: Building01 },
            { label: "Leads", href: "/dashboard/leads", icon: Users01 },
            { label: "Concierges", href: "/dashboard/concierges", icon: Users03 },
            { label: "Settings", href: "/dashboard/settings", icon: Settings01 },
        ],
    },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { logout } = useAuth();

    const isDashboardHome = pathname === "/dashboard" || pathname === "/dashboard/";

    return (
        <div className="flex flex-col lg:flex-row min-h-dvh bg-primary">
            {/* Sidebar */}
            <AppSidebar
                activeUrl={pathname}
                sections={mainNavSections}
                footerContent={(collapsed) => <ThemeToggle collapsed={collapsed} />}
                footerItems={[
                    { label: "Logout", icon: LogOut01, onClick: () => logout() },
                ]}
                showAccountCard={false}
            />

            {/* Main content area */}
            <main className="flex flex-1 flex-col lg:h-dvh lg:overflow-hidden min-w-0">
                {/* Header */}
                <div className={`px-4 pt-6 md:px-8 lg:pt-8 bg-primary z-10 shrink-0 ${isDashboardHome ? "pb-0" : "pb-4 border-b border-secondary hidden lg:block"}`}>
                    <DashboardHeader />
                </div>
                
                {/* Scrollable page content */}
                <div className="flex-1 lg:overflow-y-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
