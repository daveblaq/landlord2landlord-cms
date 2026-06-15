"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "@untitledui/icons";
import { motion } from "motion/react";
import { Avatar } from "@/components/base/avatar/avatar";
import { AvatarCompanyIcon } from "@/components/base/avatar/base-components/avatar-company-icon";
import { Button } from "@/components/base/buttons/button";
import { ReachLogo } from "@/components/foundations/logo/reach-logo";
import { ReachLogoIcon } from "@/components/foundations/logo/reach-logo";
import { cx } from "@/utils/cx";
import { MobileNavigationHeader } from "../base-components/mobile-header";
import { NavAccountCard } from "../base-components/nav-account-card";
import { NavItemBase } from "../base-components/nav-item";
import { NavItemButton } from "../base-components/nav-item-button";
import type { NavItemType } from "../config";

interface SidebarNavigationDefaultProps {
    /** URL of the currently active item. */
    activeUrl?: string;
    /** List of grouped sections to display. */
    sections: Array<{ label: string; items: NavItemType[] }>;
    /** List of footer items to display. */
    footerItems?: NavItemType[];
    /** Custom content rendered above the footer items — receives isCollapsed so it can adapt layout. */
    footerContent?: (isCollapsed: boolean) => React.ReactNode;
    /** Whether to show the account card at the top. */
    showAccountCard?: boolean;
    /** Whether to hide the right side border. */
    hideBorder?: boolean;
    /** Additional CSS classes to apply to the sidebar. */
    className?: string;
}

export const SidebarNavigationDefault = ({
    activeUrl,
    sections,
    footerItems = [],
    footerContent,
    showAccountCard = true,
    hideBorder = false,
    className,
}: SidebarNavigationDefaultProps) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const EXPANDED_WIDTH = 296;
    const COLLAPSED_WIDTH = 72;
    const currentWidth = isCollapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH;

    const content = (
        <motion.aside
            initial={false}
            animate={{ width: currentWidth }}
            transition={{ type: "spring", damping: 26, stiffness: 220, bounce: 0 }}
            style={
                {
                    "--width": `${currentWidth}px`,
                } as React.CSSProperties
            }
            className={cx(
                "flex h-full w-full max-w-full flex-col overflow-auto bg-primary pt-4 lg:w-(--width) lg:pt-6",
                !hideBorder && "border-secondary md:border-r",
                className,
            )}
        >
            {/* Logo and Collapse/Expand Button */}
            <div className={cx("flex items-center", isCollapsed ? "justify-center" : "justify-between px-5 lg:px-5")}>
                {isCollapsed ? (
                    <div className="group relative flex items-center justify-center">
                        {/* Logo - hidden on hover */}
                        <ReachLogoIcon className="h-8 w-8 transition-opacity duration-200 group-hover:opacity-0" />

                        {/* Expand button - shown on hover */}
                        <Button
                            onClick={() => setIsCollapsed(false)}
                            iconLeading={ChevronRight}
                            color="tertiary"
                            size="sm"
                            aria-label="Expand sidebar"
                            className="absolute opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                        />
                    </div>
                ) : (
                    <>
                        <ReachLogo className="h-8" />
                        <Button
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            iconLeading={ChevronLeft}
                            color="tertiary"
                            size="sm"
                            aria-label="Collapse sidebar"
                        />
                    </>
                )}
            </div>

            {/* Account Card / Avatar */}
            {showAccountCard && (
                <div className={cx("mt-4", isCollapsed ? "flex justify-center px-3" : "px-4 lg:px-4")}>
                    {isCollapsed ? (
                        <div className="flex items-center justify-center">
                            <Avatar
                                src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80"
                                size="md"
                                alt="Olivia Rhye"
                                badge={<AvatarCompanyIcon src="https://www.untitledui.com/logos/images/Layers.jpg" alt="Layers Inc." size="md" />}
                            />
                        </div>
                    ) : (
                        <NavAccountCard badge={<AvatarCompanyIcon src="https://www.untitledui.com/logos/images/Layers.jpg" alt="Layers Inc." size="md" />} />
                    )}
                </div>
            )}

            {/* Navigation Sections */}
            <nav className="mt-6 flex-1 overflow-y-auto">
                {sections.map((section, sectionIndex) => (
                    <div key={section.label} className={cx(sectionIndex > 0 && "mt-6")}>
                        {/* Section Header - Only show when expanded */}
                        {!isCollapsed && (
                            <div className="px-4 pb-2 lg:px-5">
                                <h3 className="text-xs font-semibold tracking-wide text-quaternary uppercase">{section.label}</h3>
                            </div>
                        )}

                        {/* Section Items */}
                        <ul className={cx("flex flex-col", isCollapsed ? "items-center gap-0.5" : "px-2 lg:px-4")}>
                            {section.items.map((item) => (
                                <li key={item.label} className={cx(!isCollapsed && "py-0.5", isCollapsed && "flex justify-center")}>
                                    {isCollapsed && item.icon ? (
                                        <NavItemButton size="md" current={activeUrl === item.href} href={item.href} label={item.label || ""} icon={item.icon} />
                                    ) : (
                                        <NavItemBase type="link" badge={item.badge} icon={item.icon} href={item.href} current={activeUrl === item.href}>
                                            {item.label}
                                        </NavItemBase>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </nav>

            {/* Footer Content Slot (e.g. theme toggle) */}
            {footerContent && (
                <div className={cx("mt-auto border-t border-secondary pt-4 lg:pt-5", isCollapsed ? "flex justify-center px-3" : "px-2 lg:px-4")}>
                    {footerContent(isCollapsed)}
                </div>
            )}

            {/* Footer Items */}
            {footerItems.length > 0 && (
                <div className={cx(footerContent ? "py-2 lg:py-3" : "mt-auto py-4 lg:py-6", isCollapsed ? "" : "px-2 lg:px-4")}>
                    <ul className={cx("flex flex-col", isCollapsed ? "items-center gap-0.5" : "")}>
                        {footerItems.map((item) => (
                            <li key={item.label} className={cx(!isCollapsed && "py-0.5", isCollapsed && "flex justify-center")}>
                                {isCollapsed && item.icon ? (
                                    <NavItemButton size="md" current={activeUrl === item.href} href={item.href} label={item.label || ""} icon={item.icon} onClick={item.onClick as any} />
                                ) : (
                                    <NavItemBase badge={item.badge} icon={item.icon} href={item.href} type="link" current={item.href === activeUrl} onClick={item.onClick as any}>
                                        {item.label}
                                    </NavItemBase>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </motion.aside>
    );

    return (
        <>
            {/* Mobile header navigation */}
            <MobileNavigationHeader>{content}</MobileNavigationHeader>

            {/* Desktop sidebar navigation */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex">{content}</div>

            {/* Placeholder to take up physical space because the real sidebar has `fixed` position. */}
            <motion.div
                initial={false}
                animate={{ paddingLeft: currentWidth }}
                transition={{ type: "spring", damping: 26, stiffness: 220, bounce: 0 }}
                className="invisible hidden lg:sticky lg:top-0 lg:bottom-0 lg:left-0 lg:block"
            />
        </>
    );
};
