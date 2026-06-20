"use client";

import { LogOut01, SearchLg, HomeLine } from "@untitledui/icons";
import { Breadcrumbs } from "@/components/application/breadcrumbs/breadcrumbs";
import { Avatar } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";
import { useAuth } from "@/contexts/auth-context";
import { usePathname } from "next/navigation";
import { useProperty } from "@/lib/api/properties";

export const DashboardHeader = () => {
    const { user, logout } = useAuth();
    const pathname = usePathname();
    const segments = pathname.split("/").filter(Boolean);
    const isDashboardHome = pathname === "/dashboard" || pathname === "/dashboard/";

    // Extract property ID from URL segments if it exists (24-char hex string)
    const propertyId = segments.find(seg => /^[0-9a-fA-F]{24}$/.test(seg));
    const { data: property } = useProperty(propertyId || "", {
        enabled: !!propertyId
    });

    const handleLogout = () => {
        logout();
    };

    const getBreadcrumbs = () => {
        const items = [{ href: "/dashboard", label: "Dashboard", isHome: true }];
        
        if (segments.length <= 1) {
            return items;
        }

        let currentPath = "/dashboard";
        
        for (let i = 1; i < segments.length; i++) {
            const segment = segments[i];
            currentPath += `/${segment}`;
            
            let label = segment.charAt(0).toUpperCase() + segment.slice(1);
            
            if (segment === "properties") {
                label = "Properties";
            } else if (segment === "leads") {
                label = "Leads";
            } else if (segment === "new") {
                const parent = segments[i - 1];
                label = parent === "leads" ? "Add Lead" : "New Listing";
            } else if (segment === "edit") {
                label = "Edit";
            } else if (/^[0-9a-fA-F]{24}$/.test(segment)) {
                const parent = segments[i - 1];
                label = parent === "leads" ? "Lead Details" : (property?.title || "Property Details");
            }

            items.push({ href: currentPath, label, isHome: false });
        }
        
        return items;
    };

    return (
        <div className="relative flex flex-col gap-4 bg-primary">
            {/* Breadcrumbs for desktop */}
            <div className="max-lg:hidden">
                <Breadcrumbs type="button" maxVisibleItems={3}>
                    {getBreadcrumbs().map((item, idx) => (
                        <Breadcrumbs.Item
                            key={idx}
                            href={item.href}
                            icon={item.isHome ? HomeLine : undefined}
                        >
                            {item.isHome ? undefined : item.label}
                        </Breadcrumbs.Item>
                    ))}
                </Breadcrumbs>
            </div>
            
            {/* Header Title with Avatar & Actions */}
            {isDashboardHome && (
                <div className="flex flex-col gap-4 border-b border-secondary pb-5 lg:flex-row lg:items-center">
                    <div className="flex flex-1 items-center gap-3 lg:gap-4">
                        <Avatar 
                            size="xl" 
                            src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user?.fullname || "L2L")}`} 
                            alt={user?.fullname || "User"} 
                        />
                        <div>
                            <h1 className="text-xl font-semibold text-primary lg:text-display-xs">
                                Welcome back, {user?.fullname || "Admin"}
                            </h1>
                            <p className="text-md text-tertiary">
                                Manage properties, view leads, and oversee the Landlord2Landlord system.
                            </p>
                        </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center gap-3 self-start lg:self-center">
                        <div className="rounded-full bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-solid uppercase tracking-wider">
                            {user?.role || "Concierge"}
                        </div>
                        <Button 
                            color="secondary" 
                            size="md" 
                            iconLeading={LogOut01}
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};
