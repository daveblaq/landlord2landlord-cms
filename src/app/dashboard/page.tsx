"use client";

import {
    Building01,
    Users01,
    LogOut01,
    HomeLine,
    CurrencyPound,
    TrendUp01,
    Users03,
    Building02,
    Settings01,
    ChartBreakoutSquare,
} from "@untitledui/icons";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AppSidebar } from "@/components/app/app-sidebar";
import { DashboardHeader } from "@/components/application/page-headers/dashboard-header";
import { MetricsIcon03 } from "@/components/application/metrics/metrics";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { ThemeToggle } from "@/components/application/app-navigation/base-components/theme-toggle";
import { NeedsAttentionSection } from "@/components/app/needs-attention-section";
import { useAuth } from "@/contexts/auth-context";
import type { NavItemType } from "@/components/application/app-navigation/config";
import { useStats } from "@/lib/api/stats";
import { useActivities } from "@/lib/api/activities";
import { useLeads } from "@/lib/api/leads";
import { useProperties } from "@/lib/api/properties";

// ─── Navigation Config ────────────────────────────────────────────────────────

const buildNavSections = (newLeadCount: number | undefined): Array<{ label: string; items: NavItemType[] }> => [
    {
        label: "Main",
        items: [
            {
                label: "Dashboard",
                href: "/dashboard",
                icon: HomeLine,
            },
            {
                label: "Properties",
                href: "/dashboard/properties",
                icon: Building01,
            },
            {
                label: "Leads",
                href: "/dashboard/leads",
                icon: Users01,
                badge: newLeadCount ? (
                    <span
                        className="inline-flex items-center justify-center min-w-[18px] h-[18px] rounded-full bg-brand-500 px-1 text-[10px] font-semibold text-white"
                        aria-label={`${newLeadCount} new leads`}
                    >
                        {newLeadCount}
                    </span>
                ) : undefined,
            },
            {
                label: "Settings",
                href: "/dashboard/settings",
                icon: Settings01,
            },
        ],
    },
];

// ─── Dashboard Page ───────────────────────────────────────────────────────────

export default function DashboardPage() {
    const pathname = usePathname();
    const { logout } = useAuth();

    // ── Core stats & activity ──────────────────────────────────────────────
    const { data: stats, isLoading } = useStats();
    const { data: activities, isLoading: isLoadingActivities } = useActivities();

    // ── Needs Attention queries ────────────────────────────────────────────
    const { data: newLeadsData } = useLeads({ status: "New", limit: 5 });
    const { data: pendingPropertiesData } = useProperties({ status: "pending-review", limit: 5 });

    // ── Lead pipeline queries (parallel) ──────────────────────────────────
    const { data: pipelineNew, isLoading: isPNew } = useLeads({ status: "New" });
    const { data: pipelineContacted, isLoading: isPContacted } = useLeads({ status: "Contacted" });
    const { data: pipelineQualified, isLoading: isPQualified } = useLeads({ status: "Qualified" });
    const { data: pipelineClosed, isLoading: isPClosed } = useLeads({ status: "Closed" });
    const isPipelineLoading = isPNew || isPContacted || isPQualified || isPClosed;

    // ── Property status queries (parallel) ────────────────────────────────
    const { data: publishedProps, isLoading: isPublishedLoading } = useProperties({ status: "published" });
    const { data: pendingReviewProps, isLoading: isPendingLoading } = useProperties({ status: "pending-review" });
    const { data: draftProps, isLoading: isDraftLoading } = useProperties({ status: "draft" });

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "GBP",
            maximumFractionDigits: 0,
        }).format(value);
    };

    const formatRelativeTime = (dateInput: string | Date): string => {
        const date = new Date(dateInput);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / (60 * 1000));
        const diffHours = Math.floor(diffMs / (60 * 60 * 1000));
        const diffDays = Math.floor(diffMs / (24 * 60 * 60 * 1000));

        if (diffMins < 1) return "Just now";
        if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? "s" : ""} ago`;
        if (diffHours < 24) return `${diffHours} hr${diffHours > 1 ? "s" : ""} ago`;
        if (diffDays === 1) return "Yesterday";
        if (diffDays < 7) return `${diffDays} days ago`;

        return date.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    const metricsConfig = [
        {
            icon: Building02,
            subtitle: "Total Properties",
            title: isLoading || !stats ? "" : stats.totalProperties.value.toString(),
            change: stats?.totalProperties.change || "0%",
            changeTrend: stats?.totalProperties.trend || "positive",
        },
        {
            icon: Users03,
            subtitle: "Active Leads",
            title: isLoading || !stats ? "" : stats.activeLeads.value.toString(),
            change: stats?.activeLeads.change || "0%",
            changeTrend: stats?.activeLeads.trend || "positive",
        },
        {
            icon: CurrencyPound,
            subtitle: "Avg. Monthly Rent",
            title: isLoading || !stats ? "" : formatCurrency(stats.avgMonthlyRent.value),
            change: stats?.avgMonthlyRent.change || "0%",
            changeTrend: stats?.avgMonthlyRent.trend || "positive",
        },
        {
            icon: TrendUp01,
            subtitle: "Conversion Rate",
            title: isLoading || !stats ? "" : `${stats.conversionRate.value.toFixed(1).replace(/\.0$/, "")}%`,
            change: stats?.conversionRate.change || "0%",
            changeTrend: stats?.conversionRate.trend || "positive",
        },
    ];

    const pipelineRows = [
        { label: "New", count: pipelineNew?.totalResults },
        { label: "Contacted", count: pipelineContacted?.totalResults },
        { label: "Qualified", count: pipelineQualified?.totalResults },
        { label: "Closed", count: pipelineClosed?.totalResults },
    ];

    const propertyStatusRows = [
        {
            label: "Published",
            count: isPublishedLoading ? undefined : publishedProps?.totalResults,
            status: "published",
            dot: "bg-success-500",
        },
        {
            label: "Pending Review",
            count: isPendingLoading ? undefined : pendingReviewProps?.totalResults,
            status: "pending-review",
            dot: "bg-warning-500",
        },
        {
            label: "Draft",
            count: isDraftLoading ? undefined : draftProps?.totalResults,
            status: "draft",
            dot: "bg-secondary",
        },
    ];

    const newLeadCount = newLeadsData?.totalResults;
    const navSections = buildNavSections(newLeadCount);

    return (
        <div className="flex flex-col lg:flex-row min-h-dvh bg-primary">
            {/* Sidebar */}
            <AppSidebar
                activeUrl={pathname}
                sections={navSections}
                footerContent={(collapsed) => <ThemeToggle collapsed={collapsed} />}
                footerItems={[
                    {
                        label: "Logout",
                        icon: LogOut01,
                        onClick: () => logout(),
                    },
                ]}
                showAccountCard={false}
            />

            {/* Main content area */}
            <main className="flex flex-1 flex-col min-w-0">
                <div className="px-4 pt-6 pb-0 md:px-8 lg:pt-8">
                    <DashboardHeader />
                </div>

                {/* Page Body */}
                <div className="flex-1 px-4 py-6 md:px-8 md:py-8 space-y-8">

                    {/* Metrics Grid */}
                    <section>
                        <h2 className="text-sm font-semibold uppercase tracking-wider text-quaternary mb-4">
                            Overview
                        </h2>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            {metricsConfig.map((metric) => (
                                <MetricsIcon03
                                    key={metric.subtitle}
                                    icon={metric.icon}
                                    subtitle={metric.subtitle}
                                    title={metric.title}
                                    change={metric.change}
                                    changeTrend={metric.changeTrend}
                                    actions={false}
                                    isLoading={isLoading}
                                />
                            ))}

                            {/* Lead Pipeline card */}
                            <div className="rounded-xl bg-primary shadow-xs ring-1 ring-secondary ring-inset">
                                <div className="flex flex-col gap-4 px-4 py-5 md:gap-5 md:px-5">
                                    {isPipelineLoading ? (
                                        <>
                                            <div className="h-10 w-10 rounded-lg bg-secondary animate-pulse" />
                                            <div className="flex flex-col gap-2.5">
                                                <div className="h-4 w-28 rounded bg-secondary_hover animate-pulse" />
                                                {[1, 2, 3, 4].map((i) => (
                                                    <div key={i} className="flex justify-between">
                                                        <div className="h-3.5 w-16 rounded bg-secondary_hover animate-pulse" />
                                                        <div className="h-3.5 w-6 rounded bg-secondary_hover animate-pulse" />
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <FeaturedIcon color="gray" theme="modern" icon={ChartBreakoutSquare} size="sm" />
                                            <div className="flex flex-col gap-3">
                                                <h3 className="text-sm font-semibold text-tertiary">Lead Pipeline</h3>
                                                <div className="flex flex-col gap-1.5">
                                                    {pipelineRows.map(({ label, count }) => (
                                                        <div key={label} className="flex items-center justify-between">
                                                            <span className="text-sm text-tertiary">{label}</span>
                                                            <span className="text-sm font-semibold text-primary">
                                                                {count ?? "—"}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Needs Attention — renders only when there's something to action */}
                    <NeedsAttentionSection
                        newLeads={newLeadsData?.results}
                        pendingProperties={pendingPropertiesData?.results}
                    />

                    {/* Bottom two-column layout */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

                        {/* Recent Activity */}
                        <section className="lg:col-span-2">
                            <div className="rounded-xl bg-primary shadow-xs ring-1 ring-secondary ring-inset">
                                <div className="flex items-center justify-between px-5 py-4 border-b border-secondary">
                                    <h2 className="text-md font-semibold text-primary">Recent Activity</h2>
                                    <Link href="/dashboard/leads" className="text-sm font-medium text-brand-700 hover:underline">
                                        View all
                                    </Link>
                                </div>
                                <ul className="divide-y divide-secondary">
                                    {isLoadingActivities || !activities ? (
                                        Array.from({ length: 5 }).map((_, idx) => (
                                            <li key={idx} className="flex items-start gap-4 px-5 py-4">
                                                <div className="h-8 w-8 shrink-0 rounded-full bg-secondary animate-pulse" />
                                                <div className="flex-1 space-y-2 min-w-0">
                                                    <div className="h-4 w-1/3 rounded bg-secondary_hover animate-pulse" />
                                                    <div className="h-3.5 w-2/3 rounded bg-secondary_hover animate-pulse" />
                                                </div>
                                                <div className="h-3 w-12 rounded bg-secondary_hover animate-pulse" />
                                            </li>
                                        ))
                                    ) : activities.length === 0 ? (
                                        <li className="px-5 py-6 text-center text-sm text-tertiary">
                                            No recent activities found.
                                        </li>
                                    ) : (
                                        activities.map((activity) => (
                                            <li
                                                key={activity.id}
                                                className="flex items-start gap-4 px-5 py-4 hover:bg-secondary_subtle transition-colors duration-150"
                                            >
                                                <div
                                                    className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${activity.color}`}
                                                >
                                                    {activity.type === "lead" ? (
                                                        <Users01 className="h-4 w-4 text-white" />
                                                    ) : (
                                                        <Building01 className="h-4 w-4 text-white" />
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-semibold text-primary truncate">
                                                        {activity.title}
                                                    </p>
                                                    <p className="text-sm text-tertiary truncate">
                                                        {activity.description}
                                                    </p>
                                                </div>
                                                <span className="shrink-0 text-xs text-quaternary whitespace-nowrap">
                                                    {formatRelativeTime(activity.time)}
                                                </span>
                                            </li>
                                        ))
                                    )}
                                </ul>
                            </div>
                        </section>

                        {/* Quick Actions + Property Status */}
                        <section className="lg:col-span-1">
                            <div className="rounded-xl bg-primary shadow-xs ring-1 ring-secondary ring-inset h-full">
                                <div className="px-5 py-4 border-b border-secondary">
                                    <h2 className="text-md font-semibold text-primary">Quick Actions</h2>
                                </div>
                                <div className="p-5 flex flex-col gap-3">
                                    {[
                                        {
                                            label: "Add New Property",
                                            icon: Building01,
                                            href: "/dashboard/properties/new",
                                            color: "bg-brand-50 text-brand-700 hover:bg-brand-100 dark:bg-brand-950/20 dark:text-brand-300 dark:hover:bg-brand-900/35",
                                            iconColor: "text-brand-600 dark:text-brand-400",
                                        },
                                        {
                                            label: "View All Leads",
                                            icon: Users01,
                                            href: "/dashboard/leads",
                                            color: "bg-success-50 text-success-700 hover:bg-success-100 dark:bg-success-950/20 dark:text-success-300 dark:hover:bg-success-900/35",
                                            iconColor: "text-success-600 dark:text-success-400",
                                        },
                                    ].map((action) => (
                                        <a
                                            key={action.label}
                                            href={action.href}
                                            className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition-colors duration-150 ${action.color}`}
                                        >
                                            <action.icon className={`h-5 w-5 shrink-0 ${action.iconColor}`} />
                                            {action.label}
                                        </a>
                                    ))}
                                </div>

                                {/* Property Status Summary */}
                                <div className="border-t border-secondary px-5 py-4">
                                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-quaternary">
                                        Property Status
                                    </p>
                                    <div className="flex flex-col gap-2">
                                        {propertyStatusRows.map(({ label, count, status, dot }) => (
                                            <Link
                                                key={status}
                                                href={`/dashboard/properties?status=${status}`}
                                                className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-secondary_subtle"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <span className={`h-2 w-2 shrink-0 rounded-full ${dot}`} />
                                                    <span className="text-tertiary">{label}</span>
                                                </div>
                                                <span className="font-semibold text-primary">
                                                    {count ?? "—"}
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}
