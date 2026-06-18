"use client";

import type { ComponentProps } from "react";
import { SidebarNavigationDefault } from "@/components/application/app-navigation/sidebar-navigation/sidebar-default";
import { useLeads } from "@/lib/api/leads";

type AppSidebarProps = ComponentProps<typeof SidebarNavigationDefault>;

export function AppSidebar({ sections, ...props }: AppSidebarProps) {
    const { data } = useLeads({ status: "New", limit: 1 }, { staleTime: 60_000 });
    const newCount = data?.totalResults ?? 0;

    const sectionsWithBadge = sections.map((section) => ({
        ...section,
        items: section.items.map((item) =>
            item.href === "/dashboard/leads" && newCount > 0
                ? { ...item, badge: newCount }
                : item,
        ),
    }));

    return <SidebarNavigationDefault sections={sectionsWithBadge} {...props} />;
}
