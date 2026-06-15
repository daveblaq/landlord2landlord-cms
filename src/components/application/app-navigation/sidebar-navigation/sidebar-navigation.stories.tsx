import React from "react";
import type { FC } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Archive, BarChart01, BarChartSquare02, Calendar, CheckCircle, CheckDone01, ChevronRight, ClockFastForward, CurrencyDollarCircle, File05, FileCheck02, Folder, Grid03, Home03, HomeLine, Inbox01, LayoutAlt01, LifeBuoy01, LineChartUp03, MessageChatCircle, NotificationBox, Package, PieChart03, Rows01, Settings01, Settings03, Star01, Stars01, User01, UserSquare, Users01, UsersPlus, Zap } from "@untitledui/icons";
import type { NavItemDividerType, NavItemType } from "@/components/application/app-navigation/config";
import { Avatar } from "@/components/base/avatar/avatar";
import { Badge, BadgeWithDot } from "@/components/base/badges/badges";
import { FeaturedCardCookiePreferences } from "./cookie-preferences";
import { FeaturedCardCurrentProjectsDemo } from "./current-projects";
import { FeaturedCardEventCTA } from "./event-cta";
import { FeaturedCardFreeTrialCTA } from "./free-trial";
import { FeaturedCardImage } from "./image";
import { FeaturedCardMessage } from "./message";
import { FeaturedCardOnboardingSteps } from "./onboarding-steps";
import { FeaturedCardProgressBar } from "./progress-bar";
import { FeaturedCardProgressCircle } from "./progress-circle";
import { FeaturedCardQRCode } from "./qr-code";
import { FeaturedCardReferralLink } from "./referral-link";
import { SidebarNavigationDualTier } from "./sidebar-dual-tier";
import { SidebarNavigationDefault } from "./sidebar-default";
import { SidebarNavigationSectionDividers } from "./sidebar-section-dividers";
import { SidebarNavigationSectionsSubheadings } from "./sidebar-sections-subheadings";
import { SidebarNavigationSimple } from "./sidebar-simple";
import { SidebarNavigationSlim } from "./sidebar-slim";
import { FeaturedCardSupportCTA } from "./support-cta";
import { FeaturedCardUpgradeCTA } from "./upgrade-cta";


const meta = {
    title: "Application/Sidebar Navigation",
    component: SidebarNavigationSimple,
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component:
                    "Sidebar navigation components for application layouts with multiple variants including simple, dual-tier, slim, and sectioned layouts with various featured card options.",
            },
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof SidebarNavigationSimple>;

export default meta;
type Story = StoryObj<typeof SidebarNavigationSimple>;

// Sample navigation items
const sampleNavItems = [
    { label: "Home", href: "/", icon: Home03 },
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: BarChart01,
        items: [
            { label: "Overview", href: "/dashboard/overview" },
            { label: "Analytics", href: "/dashboard/analytics" },
            { label: "Reports", href: "/dashboard/reports" },
            { label: "Notifications", href: "/dashboard/notifications" },
        ],
    },
    {
        label: "Projects",
        href: "/projects",
        icon: FileCheck02,
        badge: (
            <Badge color="brand" size="sm">
                10
            </Badge>
        ),
    },
    {
        label: "Tasks",
        href: "/tasks",
        icon: CheckCircle,
        items: [
            { label: "My tasks", href: "/tasks/mine" },
            { label: "Assigned to me", href: "/tasks/assigned" },
            { label: "Completed", href: "/tasks/completed" },
        ],
    },
    { label: "Team", href: "/team", icon: Users01 },
    { label: "Calendar", href: "/calendar", icon: Calendar },
    {
        label: "Messages",
        href: "/messages",
        icon: MessageChatCircle,
        badge: (
            <Badge color="error" size="sm">
                3
            </Badge>
        ),
    },
];

const sampleFooterItems = [
    { label: "Support", href: "/support", icon: LifeBuoy01 },
    { label: "Settings", href: "/settings", icon: Settings01 },
];

// ============================================================================
// 1. SIMPLE
// ============================================================================
const navItemsSimple: NavItemType[] = [
    {
        label: "Home",
        href: "/",
        icon: HomeLine,
        items: [
            { label: "Overview", href: "/overview", icon: Grid03 },
            { label: "Products", href: "/products", icon: Package },
            { label: "Orders", href: "/orders", icon: CurrencyDollarCircle },
            { label: "Customers", href: "/customers", icon: Users01 },
        ],
    },
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: BarChartSquare02,
        items: [
            { label: "Overview", href: "/dashboard/overview", icon: Grid03 },
            { label: "Notifications", href: "/dashboard/notifications", icon: NotificationBox, badge: 10 },
            { label: "Analytics", href: "/dashboard/analytics", icon: LineChartUp03 },
            { label: "Saved reports", href: "/dashboard/saved-reports", icon: Star01 },
        ],
    },
    {
        label: "Projects",
        href: "/projects",
        icon: Rows01,
        items: [
            { label: "View all", href: "/projects/all", icon: Rows01 },
            { label: "Personal", href: "/projects/personal", icon: User01 },
            { label: "Team", href: "/projects/team", icon: Users01 },
            { label: "Shared with me", href: "/projects/shared-with-me", icon: UsersPlus },
            { label: "Archive", href: "/projects/archive", icon: Archive },
        ],
    },
    {
        label: "Tasks",
        href: "/tasks",
        icon: CheckDone01,
        badge: 10,
    },
    {
        label: "Reporting",
        href: "/reporting",
        icon: PieChart03,
    },
    {
        label: "Users",
        href: "/users",
        icon: Users01,
    },
];

export const Simple: Story = {
    render: () => (
        <div className="h-screen">
            <SidebarNavigationSimple
                items={navItemsSimple}
                footerItems={[
                    {
                        label: "Settings",
                        href: "/settings",
                        icon: Settings01,
                    },
                    {
                        label: "Support",
                        href: "/support",
                        icon: MessageChatCircle,
                        badge: (
                            <BadgeWithDot color="success" type="modern" size="sm">
                                Online
                            </BadgeWithDot>
                        ),
                    },
                    {
                        label: "Open in browser",
                        href: "https://www.untitledui.com/",
                        icon: LayoutAlt01,
                    },
                ]}
                featureCard={
                    <FeaturedCardProgressBar
                        title="Used space"
                        description="Your team has used 80% of your available space. Need more?"
                        confirmLabel="Upgrade plan"
                        progress={80}
                        className="hidden md:flex"
                        onDismiss={() => {}}
                        onConfirm={() => {}}
                    />
                }
            />
        </div>
    ),
};

// ============================================================================
// 2. DUAL-TIER
// ============================================================================
const navItemsDualTier: (NavItemType & { icon: FC<{ className?: string }> })[] = [
    {
        label: "Home",
        href: "/",
        icon: HomeLine,
        items: [
            { label: "Overview", href: "/overview", icon: Grid03 },
            { label: "Products", href: "/products", icon: Package },
            { label: "Orders", href: "/orders", icon: CurrencyDollarCircle },
            { label: "Customers", href: "/customers", icon: Users01 },
            { label: "Inbox", href: "/inbox", icon: Inbox01, badge: 4 },
            { label: "What's new?", href: "/whats-new", icon: Stars01 },
        ],
    },
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: BarChartSquare02,
        items: [
            { label: "Overview", href: "/dashboard/overview", icon: Grid03 },
            { label: "Notifications", href: "/dashboard/notifications", icon: NotificationBox, badge: 10 },
            { label: "Analytics", href: "/dashboard/analytics", icon: LineChartUp03 },
            { label: "Saved reports", href: "/dashboard/saved-reports", icon: Star01 },
            { label: "Scheduled reports", href: "/dashboard/scheduled-reports", icon: ClockFastForward },
            { label: "User reports", href: "/dashboard/user-reports", icon: UserSquare },
            { label: "Manage notifications", href: "/dashboard/manage-notifications", icon: Settings03 },
        ],
    },
    {
        label: "Projects",
        href: "/projects",
        icon: Rows01,
        items: [
            { label: "View all", href: "/projects/all", icon: Rows01 },
            { label: "Personal", href: "/projects/personal", icon: User01 },
            { label: "Team", href: "/projects/team", icon: Users01 },
            { label: "Shared with me", href: "/projects/shared-with-me", icon: UsersPlus },
            { label: "Archive", href: "/projects/archive", icon: Archive },
        ],
    },
    {
        label: "Tasks",
        href: "/tasks",
        icon: CheckDone01,
        badge: 10,
    },
    {
        label: "Reporting",
        href: "/reporting",
        icon: PieChart03,
    },
    {
        label: "Users",
        href: "/users",
        icon: Users01,
    },
];

export const DualTier: Story = {
    render: () => (
        <div className="h-screen">
            <SidebarNavigationDualTier
                items={navItemsDualTier}
                footerItems={[
                    {
                        label: "Support",
                        href: "/support",
                        icon: LifeBuoy01,
                    },
                    {
                        label: "Settings",
                        href: "/settings",
                        icon: Settings01,
                    },
                ]}
                featureCard={
                    <FeaturedCardProgressCircle
                        title="Used space"
                        description="Your team has used 80% of your available space. Need more?"
                        confirmLabel="Upgrade plan"
                        progress={80}
                        className="hidden lg:flex"
                        onDismiss={() => {}}
                        onConfirm={() => {}}
                    />
                }
            />
        </div>
    ),
};

// ============================================================================
// 3. SLIM
// ============================================================================

const navItemsSlim: (NavItemType & { icon: FC<{ className?: string }> })[] = [
    {
        label: "Home",
        href: "/",
        icon: HomeLine,
        items: [
            { label: "Overview", href: "/overview", icon: Grid03 },
            { label: "Products", href: "/products", icon: Package },
            { label: "Orders", href: "/orders", icon: CurrencyDollarCircle },
            { label: "Customers", href: "/customers", icon: Users01 },
            { label: "Inbox", href: "/inbox", icon: Inbox01, badge: 4 },
            { label: "What's new?", href: "/whats-new", icon: Stars01 },
        ],
    },
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: BarChartSquare02,
        items: [
            { label: "Overview", href: "/dashboard/overview", icon: Grid03 },
            { label: "Notifications", href: "/dashboard/notifications", icon: NotificationBox, badge: 10 },
            { label: "Analytics", href: "/dashboard/analytics", icon: LineChartUp03 },
            { label: "Saved reports", href: "/dashboard/saved-reports", icon: Star01 },
            { label: "Scheduled reports", href: "/dashboard/scheduled-reports", icon: ClockFastForward },
            { label: "User reports", href: "/dashboard/user-reports", icon: UserSquare },
            { label: "Manage notifications", href: "/dashboard/manage-notifications", icon: Settings03 },
        ],
    },
    {
        label: "Projects",
        href: "/projects",
        icon: Rows01,
        items: [
            { label: "View all", href: "/projects/all", icon: Rows01 },
            { label: "Personal", href: "/projects/personal", icon: User01 },
            { label: "Team", href: "/projects/team", icon: Users01 },
            { label: "Shared with me", href: "/projects/shared-with-me", icon: UsersPlus },
            { label: "Archive", href: "/projects/archive", icon: Archive },
        ],
    },
    {
        label: "Tasks",
        href: "/tasks",
        icon: CheckDone01,
        badge: 10,
    },
    {
        label: "Reporting",
        href: "/reporting",
        icon: PieChart03,
    },
    {
        label: "Users",
        href: "/users",
        icon: Users01,
    },
];

export const Slim: Story = {
    render: () => (
        <div className="h-screen">
            <SidebarNavigationSlim
                items={navItemsSlim}
                footerItems={[
                    {
                        label: "Support",
                        href: "/support",
                        icon: LifeBuoy01,
                    },
                    {
                        label: "Settings",
                        href: "/settings",
                        icon: Settings01,
                    },
                ]}
            />
        </div>
    ),
};

// ============================================================================
// 4. SECTIONS DIVIDERS
// ============================================================================
const navItemsWithDividers: (NavItemType | NavItemDividerType)[] = [
    {
        label: "Home",
        href: "/",
        icon: HomeLine,
    },
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: BarChartSquare02,
    },
    {
        label: "Projects",
        href: "/projects",
        icon: Rows01,
    },
    { divider: true },
    {
        label: "Folders",
        icon: Folder,
        href: "/folders",
        items: [
            { label: "View all", badge: 18, href: "/folders/view-all" },
            { label: "Recent", badge: 8, href: "/folders/recent" },
            { label: "Favorites", badge: 6, href: "/folders/favorites" },
            { label: "Shared", badge: 4, href: "/folders/shared" },
        ],
    },
    { divider: true },
    {
        label: "Reporting",
        href: "/reporting",
        icon: PieChart03,
    },
    {
        label: "Settings",
        href: "/settings",
        icon: Settings01,
    },
    {
        label: "Support",
        href: "/support",
        icon: MessageChatCircle,
        badge: (
            <BadgeWithDot color="success" type="modern" size="sm">
                Online
            </BadgeWithDot>
        ),
    },
    {
        label: "Open in browser",
        href: "https://www.untitledui.com/",
        icon: LayoutAlt01,
    },
];
export const SectionsDividers: Story = {
    render: () => (
        <div className="h-screen">
            <SidebarNavigationSectionDividers activeUrl="/" items={navItemsWithDividers} />;
        </div>
    ),
};

// ============================================================================
// 5. SECTIONS SUBHEADINGS
// ============================================================================
const navItemsWithSectionsSubheadings: Array<{ label: string; items: NavItemType[] }> = [
    {
        label: "General",
        items: [
            {
                label: "Dashboard",
                href: "/",
                icon: BarChartSquare02,
            },
            {
                label: "Projects",
                href: "/projects",
                icon: Rows01,
            },
            {
                label: "Documents",
                href: "/documents",
                icon: File05,
            },
            {
                label: "Calendar",
                href: "/calendar",
                icon: Calendar,
            },
        ],
    },
    {
        label: "Untitled UI",
        items: [
            {
                label: "Reporting",
                href: "#",
                icon: PieChart03,
            },
            {
                label: "Tasks",
                href: "#",
                icon: CheckDone01,
                badge: (
                    <Badge size="sm" type="modern">
                        8
                    </Badge>
                ),
            },
            {
                label: "Users",
                href: "#",
                icon: Users01,
            },
        ],
    },
    {
        label: "Your teams",
        items: [
            {
                label: "Catalog",
                href: "#",
                icon: () => <Avatar src="https://www.untitledui.com/logos/images/Catalog.jpg" className="mr-2 size-5" />,
                badge: (
                    <div className="flex items-center gap-3">
                        <Badge size="sm" type="modern">
                            ⌘1
                        </Badge>
                        <ChevronRight size={16} className="text-fg-quaternary" />
                    </div>
                ),
            },
            {
                label: "Warpspeed",
                href: "#",
                icon: () => <Avatar src="https://www.untitledui.com/logos/images/Warpspeed.jpg" className="mr-2 size-5" />,
                badge: (
                    <div className="flex items-center gap-3">
                        <Badge size="sm" type="modern">
                            ⌘2
                        </Badge>
                        <ChevronRight size={16} className="text-fg-quaternary" />
                    </div>
                ),
            },
            {
                label: "Boltshift",
                href: "#",
                icon: () => <Avatar src="https://www.untitledui.com/logos/images/Boltshift.jpg" className="mr-2 size-5" />,
                badge: (
                    <div className="flex items-center gap-3">
                        <Badge size="sm" type="modern">
                            ⌘3
                        </Badge>
                        <ChevronRight size={16} className="text-fg-quaternary" />
                    </div>
                ),
            },
            {
                label: "Sisyphus",
                href: "#",
                icon: () => <Avatar src="https://www.untitledui.com/logos/images/Sisyphus.jpg" className="mr-2 size-5" />,
                badge: (
                    <div className="flex items-center gap-3">
                        <Badge size="sm" type="modern">
                            ⌘4
                        </Badge>
                        <ChevronRight size={16} className="text-fg-quaternary" />
                    </div>
                ),
            },
        ],
    },
];

export const SectionsSubheadings: Story = {
    render: () => (
        <div className="h-screen">
            <SidebarNavigationSectionsSubheadings activeUrl="/" items={[
                    {
                        label: "General",
                        items: [
                            { label: "Home", href: "/", icon: Home03 },
                            { label: "Take action", href: "/take-action", icon: Zap },
                            { label: "Content studio", href: "/content-studio", icon: LayoutAlt01 },
                            { label: "Progress report", href: "/progress-report", icon: LineChartUp03 },
                        ],
                    },
                    {
                        label: "AI Search",
                        items: [
                            { label: "AI analytics", href: "/ai-analytics", icon: BarChartSquare02 },
                            { label: "Prompts", href: "/prompts", icon: MessageChatCircle },
                            { label: "Sources", href: "/sources", icon: File05 },
                        ],
                    },
                    {
                        label: "Research",
                        items: [
                            { label: "Search demand", href: "/search-demand", icon: BarChart01 },
                            { label: "Competitors", href: "/competitors", icon: Users01 },
                            { label: "Keywords", href: "/keywords", icon: Star01 },
                            { label: "Your data", href: "/your-data", icon: Archive },
                        ],
                    },
                ]} />;
        </div>
    ),
};

// ============================================================================
// 6. GROUPED SECTIONS
// ============================================================================

export const Default: Story = {
    render: () => (
        <div className="h-screen">
            <SidebarNavigationDefault
                activeUrl="/"
                sections={[
                    {
                        label: "General",
                        items: [
                            { label: "Home", href: "/", icon: Home03 },
                            { label: "Take action", href: "/take-action", icon: Zap },
                            { label: "Content studio", href: "/content-studio", icon: LayoutAlt01 },
                            { label: "Progress report", href: "/progress-report", icon: LineChartUp03 },
                        ],
                    },
                    {
                        label: "AI Search",
                        items: [
                            { label: "AI analytics", href: "/ai-analytics", icon: BarChartSquare02 },
                            { label: "Prompts", href: "/prompts", icon: MessageChatCircle },
                            { label: "Sources", href: "/sources", icon: File05 },
                        ],
                    },
                    {
                        label: "Research",
                        items: [
                            { label: "Search demand", href: "/search-demand", icon: BarChart01 },
                            { label: "Competitors", href: "/competitors", icon: Users01 },
                            { label: "Keywords", href: "/keywords", icon: Star01 },
                            { label: "Your data", href: "/your-data", icon: Archive },
                        ],
                    },
                ]}
                footerItems={[
                    { label: "Integrations", href: "/integrations", icon: Grid03 },
                    { label: "Settings", href: "/settings", icon: Settings01 },
                ]}
            />
        </div>
    ),
};

// ============================================================================
// 7. PROGRESS BAR
// ============================================================================

export const ProgressBar: Story = {
    render: () => (
        <div className="mx-auto h-screen max-w-sm">
            <FeaturedCardProgressBar
                title="Used space"
                description="Your team has used 80% of your available space. Need more?"
                confirmLabel="Upgrade plan"
                progress={80}
                onDismiss={() => console.log("Dismissed")}
                onConfirm={() => console.log("Confirmed")}
            />
        </div>
    ),
};

// ============================================================================
// 8. PROGRESS CIRCLE
// ============================================================================

export const ProgressCircle: Story = {
    render: () => (
        <div className="mx-auto h-screen max-w-sm">
            <FeaturedCardProgressCircle
                title="Profile completion"
                description="Complete your profile to unlock all features"
                confirmLabel="Complete now"
                progress={65}
                onDismiss={() => console.log("Dismissed")}
                onConfirm={() => console.log("Confirmed")}
            />
        </div>
    ),
};

// ============================================================================
// 9. IMAGE
// ============================================================================

export const Image: Story = {
    render: () => (
        <div className="mx-auto h-screen max-w-sm">
            <FeaturedCardImage
                title="New features"
                description="Check out our latest product updates"
                confirmLabel="Watch video"
                imageSrc="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=225&fit=crop"
                onDismiss={() => console.log("Dismissed")}
                onConfirm={() => console.log("Confirmed")}
            />
        </div>
    ),
};

// ============================================================================
// 10. COOKIE PREFERENCES
// ============================================================================

export const CookiePreferences: Story = {
    render: () => (
        <div className="mx-auto h-screen max-w-sm">
            <FeaturedCardCookiePreferences
                title="Cookie settings"
                description="We use cookies to improve your experience"
                confirmLabel="Accept all"
                onDismiss={() => console.log("Dismissed")}
                onConfirm={() => console.log("Confirmed")}
            />
        </div>
    ),
};

// ============================================================================
// 11. REFERRAL LINK
// ============================================================================

export const ReferralLink: Story = {
    render: () => (
        <div className="mx-auto h-screen max-w-sm">
            <FeaturedCardReferralLink title="Invite your team" description="Get 1 month free for every referral" onDismiss={() => console.log("Dismissed")} />
        </div>
    ),
};

// ============================================================================
// 12. ONBOARDING STEPS
// ============================================================================

export const OnboardingSteps: Story = {
    render: () => (
        <div className="mx-auto h-screen max-w-sm">
            <FeaturedCardOnboardingSteps
                title="Getting started"
                supportingText="3/5 complete"
                description={
                    <ul className="flex flex-col gap-2 text-sm text-tertiary">
                        <li>✓ Create your account</li>
                        <li>✓ Set up your profile</li>
                        <li>✓ Invite team members</li>
                        <li>• Create your first project</li>
                        <li>• Customize your workspace</li>
                    </ul>
                }
                progress={60}
                confirmLabel="Continue"
                onConfirm={() => console.log("Confirmed")}
                onDismiss={() => console.log("Dismissed")}
            />
        </div>
    ),
};

// ============================================================================
// 13. UPGRADE CTA
// ============================================================================

export const UpgradeCTA: Story = {
    render: () => (
        <div className="mx-auto h-screen max-w-sm">
            <FeaturedCardUpgradeCTA
                icon={Zap}
                title="Upgrade to Pro"
                badge="New"
                description="Unlock all features and get unlimited access"
                confirmLabel="Upgrade now"
                onConfirm={() => console.log("Confirmed")}
                onDismiss={() => console.log("Dismissed")}
            />
        </div>
    ),
};

// ============================================================================
// 14. SUPPORT CTA
// ============================================================================

export const SupportCTA: Story = {
    render: () => (
        <div className="mx-auto h-screen max-w-sm">
            <FeaturedCardSupportCTA
                badge="We're online"
                title="Need help?"
                description="Our support team is here to help you"
                confirmLabel="Chat with us"
                onConfirm={() => console.log("Confirmed")}
                onDismiss={() => console.log("Dismissed")}
            />
        </div>
    ),
};

// ============================================================================
// 15. EVENT CTA
// ============================================================================

export const EventCTA: Story = {
    render: () => (
        <div className="mx-auto h-screen max-w-sm">
            <FeaturedCardEventCTA
                title="Team meeting"
                badge="In 15 min"
                description="Weekly sync with the design team"
                confirmLabel="Join now"
                onConfirm={() => console.log("Confirmed")}
                onDismiss={() => console.log("Dismissed")}
            />
        </div>
    ),
};

// ============================================================================
// 16. MESSAGE
// ============================================================================

export const Message: Story = {
    render: () => (
        <div className="mx-auto h-screen max-w-sm">
            <FeaturedCardMessage
                title="Mathilde Lewis"
                supportingText="5 min ago"
                description="Hey! I reviewed your latest designs. Looks great! 👏"
                confirmLabel="Reply"
                onConfirm={() => console.log("Confirmed")}
                onDismiss={() => console.log("Dismissed")}
            />
        </div>
    ),
};

// ============================================================================
// 17. CURRENT PROJECTS
// ============================================================================

export const CurrentProjects: Story = {
    render: () => (
        <div className="mx-auto h-screen max-w-sm">
            <FeaturedCardCurrentProjectsDemo />
        </div>
    ),
};

// ============================================================================
// 18. FREE TRIAL CTA
// ============================================================================

export const FreeTrialCTA: Story = {
    render: () => (
        <div className="mx-auto h-screen max-w-sm">
            <FeaturedCardFreeTrialCTA
                title="Free trial"
                supportingText="7 days left"
                progress={70}
                confirmLabel="Upgrade now"
                onConfirm={() => console.log("Confirmed")}
                onDismiss={() => console.log("Dismissed")}
            />
        </div>
    ),
};

// ============================================================================
// 19. QR CODE
// ============================================================================

export const QRCode: Story = {
    render: () => (
        <div className="mx-auto h-screen max-w-sm">
            <FeaturedCardQRCode
                title="Download mobile app"
                description="Scan to download our app"
                confirmLabel="Learn more"
                onConfirm={() => console.log("Confirmed")}
                onDismiss={() => console.log("Dismissed")}
            />
        </div>
    ),
};