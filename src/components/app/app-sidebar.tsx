"use client";

import type { ComponentProps } from "react";
import { SidebarNavigationDefault } from "@/components/application/app-navigation/sidebar-navigation/sidebar-default";
import { useLeads } from "@/lib/api/leads";
import { useAuth } from "@/contexts/auth-context";

type AppSidebarProps = ComponentProps<typeof SidebarNavigationDefault>;

export function AppSidebar({ sections, ...props }: AppSidebarProps) {
    const { user } = useAuth();
    const { data } = useLeads({ limit: 1 }, { staleTime: 60_000 });
    const newCount = data?.totalResults ?? 0;

    const filteredSections = sections.map((section) => ({
        ...section,
        items: section.items
            .filter((item) => {
                // Hide Concierges navigation item if the user is not an admin
                if (item.href === "/dashboard/concierges" && user?.role !== "admin") {
                    return false;
                }
                return true;
            })
            .map((item) =>
                item.href === "/dashboard/leads" && newCount > 0
                    ? { ...item, badge: newCount }
                    : item,
            ),
    }));

    return <SidebarNavigationDefault sections={filteredSections} {...props} />;
}
