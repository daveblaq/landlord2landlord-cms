"use client";

import type { ComponentProps } from "react";
import { SidebarNavigationDefault } from "@/components/application/app-navigation/sidebar-navigation/sidebar-default";
import { useLeads } from "@/lib/api/leads";
import { useProperties } from "@/lib/api/properties";
import { useAuth } from "@/contexts/auth-context";

type AppSidebarProps = ComponentProps<typeof SidebarNavigationDefault>;

export function AppSidebar({ sections, ...props }: AppSidebarProps) {
    const { user } = useAuth();
    const { data } = useLeads({ status: "New", limit: 1 }, { staleTime: 60_000 });
    const newCount = data?.totalResults ?? 0;
    const { data: propertiesData } = useProperties({ limit: 1 }, { staleTime: 60_000 });
    const propertyCount = propertiesData?.totalResults ?? 0;

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
            .map((item) => {
                if (item.href === "/dashboard/leads" && newCount > 0) return { ...item, badge: newCount };
                if (item.href === "/dashboard/properties" && propertyCount > 0) return { ...item, badge: propertyCount };
                return item;
            }),
    }));

    return <SidebarNavigationDefault sections={filteredSections} {...props} />;
}
