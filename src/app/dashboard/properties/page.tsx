"use client";

import { useState } from "react";
import {
    Building01,
    Users01,
    LogOut01,
    HomeLine,
    Plus,
    SearchLg,
    FilterLines,
    Edit01,
    Trash01,
    Eye,
    Building02,
    Settings01,
} from "@untitledui/icons";
import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/app/app-sidebar";
import { DashboardHeader } from "@/components/application/page-headers/dashboard-header";
import { ThemeToggle } from "@/components/application/app-navigation/base-components/theme-toggle";
import { Table, TableCard } from "@/components/application/table/table";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { useAuth } from "@/contexts/auth-context";
import {
    useProperties,
    useDeleteProperty,
    type PropertyQueryParams,
    type Property,
    type PropertyStatus,
} from "@/lib/api/properties";
import { toast } from "sonner";
import { IconNotification } from "@/components/application/notifications/notifications";
import type { NavItemType } from "@/components/application/app-navigation/config";

// React Aria Modal Components
import { ModalOverlay, Modal, Dialog } from "@/components/application/modals/modal";
import { CloseButton } from "@/components/base/buttons/close-button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { BackgroundPattern } from "@/components/shared-assets/background-patterns";
import { Heading as AriaHeading } from "react-aria-components";

// Pagination Component
import { PaginationPageDefault } from "@/components/application/pagination/pagination";

// ─── Nav Config (shared with dashboard) ──────────────────────────────────────

const mainNavSections: Array<{ label: string; items: NavItemType[] }> = [
    {
        label: "Main",
        items: [
            { label: "Dashboard", href: "/dashboard", icon: HomeLine },
            { label: "Properties", href: "/dashboard/properties", icon: Building01 },
            { label: "Leads", href: "/dashboard/leads", icon: Users01 },
            { label: "Settings", href: "/dashboard/settings", icon: Settings01 },
        ],
    },
];

// ─── Status Badge Map ─────────────────────────────────────────────────────────

const statusConfig: Record<PropertyStatus, { label: string; color: "success" | "warning" | "error" | "gray" | "blue" | "brand" }> = {
    published: { label: "Published", color: "success" },
    draft: { label: "Draft", color: "gray" },
    "pending-review": { label: "Pending Review", color: "warning" },
    "under-offer": { label: "Under Offer", color: "blue" },
    sold: { label: "Sold", color: "error" },
    archived: { label: "Archived", color: "gray" },
};

const STATUS_FILTERS: { label: string; value: string }[] = [
    { label: "All", value: "all" },
    { label: "Published", value: "published" },
    { label: "Draft", value: "draft" },
    { label: "Pending Review", value: "pending-review" },
    { label: "Under Offer", value: "under-offer" },
    { label: "Sold", value: "sold" },
    { label: "Archived", value: "archived" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatCurrency = (n: number) =>
    new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(n);

// ─── Row Actions ──────────────────────────────────────────────────────────────

const PropertyRowActions = ({
    property,
    onDelete,
}: {
    property: Property;
    onDelete: (property: Property) => void;
}) => (
    <Dropdown.Root>
        <Dropdown.DotsButton />
        <Dropdown.Popover className="w-44">
            <Dropdown.Menu>
                <Dropdown.Item icon={Eye}>
                    <a href={`/dashboard/properties/${property._id}`} className="block w-full">
                        View
                    </a>
                </Dropdown.Item>
                <Dropdown.Item icon={Edit01}>
                    <a href={`/dashboard/properties/${property._id}/edit`} className="block w-full">
                        Edit
                    </a>
                </Dropdown.Item>
                <Dropdown.Item icon={Trash01} onAction={() => onDelete(property)}>
                    <span className="text-error-primary">Delete</span>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown.Popover>
    </Dropdown.Root>
);

// ─── Empty State ──────────────────────────────────────────────────────────────

const EmptyState = ({ onAdd }: { onAdd: () => void }) => (
    <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-500/10">
            <Building02 className="h-7 w-7 text-brand-500" />
        </div>
        <h3 className="text-md font-semibold text-primary">No properties found</h3>
        <p className="mt-1 text-sm text-tertiary">Try adjusting your filters or add a new listing.</p>
        <Button className="mt-5" color="primary" size="md" iconLeading={Plus} onClick={onAdd}>
            Add Property
        </Button>
    </div>
);

// ─── Skeleton Loader ──────────────────────────────────────────────────────────

const SkeletonRow = ({ id }: { id: string }) => (
    <Table.Row id={id}>
        {/* Property (Image + Title + Postcode) */}
        <Table.Cell>
            <div className="flex items-center gap-3">
                <div className="h-10 w-14 shrink-0 rounded-md bg-secondary animate-pulse" />
                <div className="space-y-1.5 w-28">
                    <div className="h-3.5 w-full bg-secondary animate-pulse rounded" />
                    <div className="h-2.5 w-12 bg-secondary animate-pulse rounded" />
                </div>
            </div>
        </Table.Cell>

        {/* Location */}
        <Table.Cell>
            <div className="h-3.5 w-24 bg-secondary animate-pulse rounded" />
        </Table.Cell>

        {/* Type */}
        <Table.Cell>
            <div className="h-3.5 w-16 bg-secondary animate-pulse rounded" />
        </Table.Cell>

        {/* Beds */}
        <Table.Cell>
            <div className="h-3.5 w-10 bg-secondary animate-pulse rounded" />
        </Table.Cell>

        {/* Asking Price */}
        <Table.Cell>
            <div className="h-3.5 w-20 bg-secondary animate-pulse rounded" />
        </Table.Cell>

        {/* Monthly Rent */}
        <Table.Cell>
            <div className="h-3.5 w-16 bg-secondary animate-pulse rounded" />
        </Table.Cell>

        {/* Yield */}
        <Table.Cell>
            <div className="h-3.5 w-12 bg-secondary animate-pulse rounded" />
        </Table.Cell>

        {/* Status */}
        <Table.Cell>
            <div className="h-6 w-20 bg-secondary animate-pulse rounded-full" />
        </Table.Cell>

        {/* Actions button */}
        <Table.Cell>
            <div className="h-8 w-8 bg-secondary animate-pulse rounded-md" />
        </Table.Cell>
    </Table.Row>
);

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function PropertiesPage() {
    const pathname = usePathname();
    const { logout } = useAuth();

    const [params, setParams] = useState<PropertyQueryParams>({
        status: "all",
        page: 1,
        limit: 20,
    });
    const [search, setSearch] = useState("");
    const [propertyToDelete, setPropertyToDelete] = useState<Property | null>(null);

    const { data, isLoading, isError } = useProperties({
        ...params,
        location: search || undefined,
    });

    const deleteProperty = useDeleteProperty();

    const confirmDelete = () => {
        if (!propertyToDelete) return;
        deleteProperty.mutate(propertyToDelete._id, {
            onSuccess: () => {
                toast.custom((t) => (
                    <IconNotification
                        title="Deleted"
                        description="Property deleted successfully."
                        color="success"
                        onClose={() => toast.dismiss(t)}
                    />
                ));
                setPropertyToDelete(null);
            },
            onError: () =>
                toast.custom((t) => (
                    <IconNotification
                        title="Error"
                        description="Failed to delete property."
                        color="error"
                        onClose={() => toast.dismiss(t)}
                    />
                )),
        });
    };

    const totalResults = data?.totalResults ?? 0;
    const totalPages = data?.totalPages ?? 1;
    const properties = data?.results ?? [];

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

            {/* Main */}
            <main className="flex flex-1 flex-col min-w-0">
                {/* Header */}
                <div className="px-4 pt-6 pb-0 md:px-8 lg:pt-8">
                    <DashboardHeader />
                </div>

                <div className="flex-1 px-4 py-6 md:px-8 md:py-8 space-y-6">
                    {/* Page Title + Add Button */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-xl font-semibold text-primary lg:text-display-xs">
                                Property Listings
                            </h1>
                            <p className="mt-1 text-sm text-tertiary">
                                {totalResults} {totalResults === 1 ? "listing" : "listings"} total
                            </p>
                        </div>
                        <Button
                            color="primary"
                            size="md"
                            iconLeading={Plus}
                            href="/dashboard/properties/new"
                        >
                            Add Property
                        </Button>
                    </div>

                    {/* Filters Row */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        {/* Search */}
                        <div className="relative flex-1 max-w-sm">
                            <SearchLg className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-quaternary" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by location…"
                                className="h-10 w-full rounded-lg border border-secondary bg-primary pl-9 pr-4 text-sm text-primary placeholder:text-placeholder focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                            />
                        </div>

                        {/* Status Filter */}
                        <div className="flex items-center gap-2 flex-wrap">
                            <FilterLines className="h-4 w-4 shrink-0 text-fg-quaternary" />
                            {STATUS_FILTERS.map((f) => (
                                <button
                                    key={f.value}
                                    onClick={() => setParams((p) => ({ ...p, status: f.value, page: 1 }))}
                                    className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors duration-150 ${
                                        params.status === f.value
                                            ? "bg-brand-500 text-white"
                                            : "bg-secondary text-secondary hover:bg-secondary_hover"
                                    }`}
                                >
                                    {f.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Table */}
                    <TableCard.Root>
                        <TableCard.Header
                            title="Properties"
                            badge={String(totalResults)}
                            description="All property listings managed through the CMS"
                        />

                        {isError ? (
                            <div className="flex items-center justify-center py-20">
                                <p className="text-sm text-error-primary">Failed to load properties. Please try again.</p>
                            </div>
                        ) : (
                            <Table aria-label="Properties table" selectionMode="none">
                                <Table.Header>
                                    <Table.Head label="Property" isRowHeader />
                                    <Table.Head label="Location" />
                                    <Table.Head label="Type" />
                                    <Table.Head label="Beds" />
                                    <Table.Head label="Asking Price" />
                                    <Table.Head label="Monthly Rent" />
                                    <Table.Head label="Yield" />
                                    <Table.Head label="Status" />
                                    <Table.Head label="" />
                                </Table.Header>

                                <Table.Body>
                                    {isLoading ? (
                                        Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} id={`skeleton-${i}`} />)
                                    ) : properties.length === 0 ? (
                                        <Table.Row>
                                            <Table.Cell colSpan={9}>
                                                <EmptyState onAdd={() => window.location.href = "/dashboard/properties/new"} />
                                            </Table.Cell>
                                        </Table.Row>
                                    ) : (
                                        properties.map((property) => {
                                            const status = statusConfig[property.status] ?? { label: property.status, color: "gray" as const };
                                            return (
                                                <Table.Row key={property._id} id={property._id}>
                                                    {/* Title + Image */}
                                                    <Table.Cell>
                                                        <div className="flex items-center gap-3">
                                                            {property.heroImage ? (
                                                                <img
                                                                    src={property.heroImage}
                                                                    alt={property.title}
                                                                    className="h-10 w-14 shrink-0 rounded-md object-cover"
                                                                    onError={(e) => {
                                                                        (e.target as HTMLImageElement).style.display = "none";
                                                                    }}
                                                                />
                                                            ) : (
                                                                <div className="flex h-10 w-14 shrink-0 items-center justify-center rounded-md bg-secondary">
                                                                    <Building02 className="h-5 w-5 text-fg-quaternary" />
                                                                </div>
                                                            )}
                                                            <div className="min-w-0">
                                                                <p className="truncate text-sm font-semibold text-primary max-w-[200px]">
                                                                    {property.title}
                                                                </p>
                                                                <p className="text-xs text-quaternary">{property.postcode}</p>
                                                            </div>
                                                        </div>
                                                    </Table.Cell>

                                                    <Table.Cell>{property.location}</Table.Cell>

                                                    <Table.Cell className="capitalize">{property.propertyType}</Table.Cell>

                                                    <Table.Cell>{property.bedrooms} bed</Table.Cell>

                                                    <Table.Cell>
                                                        <span className="font-medium text-primary">
                                                            {formatCurrency(property.investmentMetrics?.askingPrice ?? 0)}
                                                        </span>
                                                    </Table.Cell>

                                                    <Table.Cell>
                                                        {formatCurrency(property.investmentMetrics?.monthlyRent ?? 0)}/mo
                                                    </Table.Cell>

                                                    <Table.Cell>
                                                        <span className={`font-semibold ${(property.investmentMetrics?.grossYield ?? 0) >= 5 ? "text-success-primary" : "text-tertiary"}`}>
                                                            {(property.investmentMetrics?.grossYield ?? 0).toFixed(2)}%
                                                        </span>
                                                    </Table.Cell>

                                                    <Table.Cell>
                                                        <Badge color={status.color} size="sm" type="pill-color">
                                                            {status.label}
                                                        </Badge>
                                                    </Table.Cell>

                                                    <Table.Cell>
                                                        <PropertyRowActions
                                                            property={property}
                                                            onDelete={(p) => setPropertyToDelete(p)}
                                                        />
                                                    </Table.Cell>
                                                </Table.Row>
                                            );
                                        })
                                    )}
                                </Table.Body>
                            </Table>
                        )}

                        {/* Pagination Footer */}
                        {!isLoading && totalPages > 1 && (
                            <div className="px-5 py-4 border-t border-secondary">
                                <PaginationPageDefault
                                    page={params.page ?? 1}
                                    total={totalPages}
                                    onPageChange={(page) => setParams((p) => ({ ...p, page }))}
                                />
                            </div>
                        )}
                    </TableCard.Root>
                </div>
            </main>

            {/* Delete Confirmation Modal */}
            {propertyToDelete && (
                <ModalOverlay
                    isOpen={!!propertyToDelete}
                    onOpenChange={(open) => {
                        if (!open) setPropertyToDelete(null);
                    }}
                    isDismissable
                >
                    <Modal>
                        <Dialog>
                            <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-100 border border-secondary text-left">
                                <CloseButton
                                    onClick={() => setPropertyToDelete(null)}
                                    theme="light"
                                    size="lg"
                                    className="absolute top-3 right-3"
                                />
                                <div className="flex flex-col gap-4 px-4 pt-5 sm:px-6 sm:pt-6">
                                    <div className="relative w-max">
                                        <FeaturedIcon color="error" size="lg" theme="light" icon={Trash01} />
                                        <BackgroundPattern
                                            pattern="circle"
                                            size="sm"
                                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                        />
                                    </div>
                                    <div className="z-10 flex flex-col gap-0.5">
                                        <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                            Delete property listing
                                        </AriaHeading>
                                        <p className="text-sm text-tertiary">
                                            Are you sure you want to delete <span className="font-semibold text-primary">{propertyToDelete.title}</span>? This action cannot be undone.
                                        </p>
                                    </div>
                                </div>
                                <div className="z-10 flex flex-1 flex-col-reverse gap-3 p-4 pt-6 *:grow sm:grid sm:grid-cols-2 sm:px-6 sm:pt-8 sm:pb-6">
                                    <Button
                                        color="secondary"
                                        size="md"
                                        onClick={() => setPropertyToDelete(null)}
                                        isDisabled={deleteProperty.isPending}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        color="primary-destructive"
                                        size="md"
                                        onClick={confirmDelete}
                                        isDisabled={deleteProperty.isPending}
                                    >
                                        {deleteProperty.isPending ? "Deleting..." : "Delete"}
                                    </Button>
                                </div>
                            </div>
                        </Dialog>
                    </Modal>
                </ModalOverlay>
            )}
        </div>
    );
}
