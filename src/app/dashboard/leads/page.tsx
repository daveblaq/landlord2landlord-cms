"use client";

import { useState } from "react";
import {
    Building01,
    Users01,
    LogOut01,
    HomeLine,
    SearchLg,
    Eye,
    MessageSquare02,
    Phone,
    Mail01,
    Building02,
    File02,
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
    useLeads,
    useUpdateLead,
    type Lead,
    type LeadStatus,
    type LeadType,
    type LeadQueryParams
} from "@/lib/api/leads";
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

const BUYER_TYPES: LeadType[] = ['Property Enquiry', 'Mortgage Lead'];
const SELLER_TYPES: LeadType[] = ['Valuation Lead', 'Insurance Lead', 'General Enquiry'];

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

const STATUS_FILTERS: Array<{ label: string; value: LeadStatus | "" }> = [
    { label: "All Statuses", value: "" },
    { label: "New", value: "New" },
    { label: "Contacted", value: "Contacted" },
    { label: "Qualified", value: "Qualified" },
    { label: "Viewing Scheduled", value: "Viewing Scheduled" },
    { label: "Negotiating", value: "Negotiating" },
    { label: "Closed", value: "Closed" },
];

const statusBadgeConfig: Record<LeadStatus, { label: string; color: "brand" | "blue" | "success" | "warning" | "orange" | "gray" }> = {
    New: { label: "New", color: "brand" },
    Contacted: { label: "Contacted", color: "blue" },
    Qualified: { label: "Qualified", color: "success" },
    "Viewing Scheduled": { label: "Viewing Scheduled", color: "warning" },
    Negotiating: { label: "Negotiating", color: "orange" },
    Closed: { label: "Closed", color: "gray" },
};

const SkeletonRow = ({ id }: { id: string }) => (
    <Table.Row id={id} className="animate-pulse">
        <Table.Cell>
            <div className="flex flex-col gap-1.5 py-1">
                <div className="h-4 w-28 rounded bg-secondary_hover" />
                <div className="h-3.5 w-36 rounded bg-secondary_hover" />
            </div>
        </Table.Cell>
        <Table.Cell>
            <div className="h-4 w-24 rounded bg-secondary_hover" />
        </Table.Cell>
        <Table.Cell>
            <div className="h-6 w-24 rounded-full bg-secondary_hover" />
        </Table.Cell>
        <Table.Cell>
            <div className="h-4 w-40 rounded bg-secondary_hover" />
        </Table.Cell>
        <Table.Cell>
            <div className="h-6 w-16 rounded-full bg-secondary_hover" />
        </Table.Cell>
        <Table.Cell>
            <div className="h-8 w-8 rounded bg-secondary_hover ml-auto" />
        </Table.Cell>
    </Table.Row>
);

export default function LeadsPage() {
    const pathname = usePathname();
    const { logout } = useAuth();

    const [activeTab, setActiveTab] = useState<'buyer' | 'seller'>('buyer');
    const [searchEmail, setSearchEmail] = useState("");
    const [params, setParams] = useState<LeadQueryParams>({
        page: 1,
        limit: 20,
        status: "",
        type: BUYER_TYPES,
    });

    const handleTabChange = (tab: 'buyer' | 'seller') => {
        setActiveTab(tab);
        setParams(p => ({
            ...p,
            type: tab === 'buyer' ? BUYER_TYPES : SELLER_TYPES,
            page: 1,
        }));
    };

    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

    const { data, isLoading, isError, refetch } = useLeads({
        ...params,
        email: searchEmail ? searchEmail : undefined
    });
    
    const updateLeadMutation = useUpdateLead();

    const handleSearchChange = (val: string) => {
        setSearchEmail(val);
        setParams((prev) => ({ ...prev, page: 1 }));
    };

    const handleStatusChange = (leadId: string, newStatus: LeadStatus) => {
        updateLeadMutation.mutate(
            { id: leadId, data: { status: newStatus } },
            {
                onSuccess: (updated) => {
                    toast.custom((t) => (
                        <IconNotification
                            title="Status Updated"
                            description={`Lead status successfully updated to ${newStatus}.`}
                            color="success"
                            onClose={() => toast.dismiss(t)}
                        />
                    ));
                    // Update locally selected lead if it matches
                    if (selectedLead && selectedLead._id === leadId) {
                        setSelectedLead(updated);
                    }
                    refetch();
                },
                onError: (err: any) => {
                    toast.custom((t) => (
                        <IconNotification
                            title="Update Failed"
                            description={err.response?.data?.message || err.message || "Failed to update status."}
                            color="error"
                            onClose={() => toast.dismiss(t)}
                        />
                    ));
                }
            }
        );
    };

    const totalResults = data?.totalResults ?? 0;
    const totalPages = data?.totalPages ?? 1;
    const leads = data?.results ?? [];

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
                    {/* Page Title */}
                    <div className="flex flex-col gap-1 border-b border-secondary pb-5">
                        <h1 className="text-xl font-semibold text-primary lg:text-display-xs">
                            Leads Management
                        </h1>
                        <p className="text-sm text-tertiary">
                            {totalResults} {totalResults === 1 ? "lead" : "leads"} total
                        </p>
                    </div>

                    {/* Lead Category Tabs */}
                    <div className="flex gap-0.5 rounded-xl bg-secondary_alt p-1 ring-1 ring-inset ring-secondary w-fit">
                        <button
                            onClick={() => handleTabChange('buyer')}
                            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-150 ${
                                activeTab === 'buyer'
                                    ? "bg-primary text-secondary shadow-xs ring-1 ring-inset ring-primary"
                                    : "text-tertiary hover:text-secondary"
                            }`}
                        >
                            Buyer Leads
                        </button>
                        <button
                            onClick={() => handleTabChange('seller')}
                            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-150 ${
                                activeTab === 'seller'
                                    ? "bg-primary text-secondary shadow-xs ring-1 ring-inset ring-primary"
                                    : "text-tertiary hover:text-secondary"
                            }`}
                        >
                            Sellers &amp; Agents
                        </button>
                    </div>

                    {/* Filters Row */}
                    <div className="flex flex-col gap-4 bg-secondary_subtle p-4 rounded-xl border border-secondary">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                            {/* Search */}
                            <div className="relative flex-1 max-w-sm">
                                <SearchLg className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-quaternary" />
                                <input
                                    type="text"
                                    value={searchEmail}
                                    onChange={(e) => handleSearchChange(e.target.value)}
                                    placeholder="Search by email address…"
                                    className="h-10 w-full rounded-lg border border-secondary bg-primary pl-9 pr-4 text-sm text-primary placeholder:text-placeholder focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                                />
                            </div>
                        </div>

                        {/* Status Filter Buttons */}
                        <div className="flex items-center gap-2 flex-wrap border-t border-secondary pt-3">
                            <span className="text-xs font-semibold text-tertiary uppercase tracking-wider mr-1">Status:</span>
                            {STATUS_FILTERS.map((f) => (
                                <button
                                    key={f.value}
                                    onClick={() => setParams((p) => ({ ...p, status: f.value, page: 1 }))}
                                    className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors duration-150 ${
                                        (params.status ?? "") === f.value
                                            ? "bg-brand-500 text-white"
                                            : "bg-primary border border-secondary text-secondary hover:bg-secondary_hover"
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
                            title={activeTab === 'buyer' ? "Buyer Leads" : "Seller & Agent Leads"}
                            badge={String(totalResults)}
                            description={
                                activeTab === 'buyer'
                                    ? "Property enquiry and mortgage lead submissions"
                                    : "Valuation, insurance, and general enquiry submissions"
                            }
                        />

                        {isError ? (
                            <div className="flex items-center justify-center py-20">
                                <p className="text-sm text-error-primary">Failed to load leads. Please try again.</p>
                            </div>
                        ) : (
                            <Table aria-label="Leads table" selectionMode="none">
                                <Table.Header>
                                    <Table.Head label="Lead / Contact" isRowHeader />
                                    <Table.Head label="Phone" />
                                    <Table.Head label="Type" />
                                    <Table.Head label="Message Preview" />
                                    <Table.Head label="Status" />
                                    <Table.Head label="" />
                                </Table.Header>

                                <Table.Body>
                                    {isLoading ? (
                                        Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} id={`skeleton-${i}`} />)
                                    ) : leads.length === 0 ? (
                                        <Table.Row>
                                            <Table.Cell colSpan={6}>
                                                <div className="flex flex-col items-center justify-center py-16 text-center">
                                                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-secondary">
                                                        <Users01 className="h-6 w-6" />
                                                    </div>
                                                    <h3 className="text-md font-semibold text-primary">No leads found</h3>
                                                    <p className="mt-1 text-sm text-tertiary">Try adjusting your filters or search terms.</p>
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    ) : (
                                        leads.map((lead) => {
                                            const status = statusBadgeConfig[lead.status] ?? { label: lead.status, color: "gray" as const };
                                            return (
                                                <Table.Row key={lead._id}>
                                                    <Table.Cell>
                                                        <div className="flex flex-col py-1">
                                                            <span className="text-sm font-semibold text-primary">{lead.name}</span>
                                                            <span className="text-xs text-tertiary flex items-center gap-1 mt-0.5">
                                                                <Mail01 className="h-3 w-3 text-fg-quaternary" />
                                                                {lead.email}
                                                            </span>
                                                        </div>
                                                    </Table.Cell>

                                                    <Table.Cell>
                                                        <span className="text-sm text-secondary font-medium">
                                                            {lead.phone || "N/A"}
                                                        </span>
                                                    </Table.Cell>

                                                    <Table.Cell>
                                                        <Badge color={
                                                            lead.type === "Property Enquiry" ? "indigo" :
                                                            lead.type === "Mortgage Lead" ? "orange" :
                                                            lead.type === "Insurance Lead" ? "pink" :
                                                            lead.type === "Valuation Lead" ? "purple" : "gray"
                                                        } size="sm" type="color">
                                                            {lead.type}
                                                        </Badge>
                                                    </Table.Cell>

                                                    <Table.Cell>
                                                        <p className="text-sm text-tertiary max-w-xs truncate">
                                                            {lead.message || <span className="italic text-fg-disabled">No query message</span>}
                                                        </p>
                                                    </Table.Cell>

                                                    <Table.Cell>
                                                        <Badge color={status.color} size="sm" type="pill-color">
                                                            {status.label}
                                                        </Badge>
                                                    </Table.Cell>

                                                    <Table.Cell>
                                                        <div className="flex items-center justify-end gap-2">
                                                            <Button
                                                                color="secondary"
                                                                size="sm"
                                                                iconLeading={Eye}
                                                                onClick={() => setSelectedLead(lead)}
                                                            >
                                                                View
                                                            </Button>

                                                            <Dropdown.Root>
                                                                <Dropdown.DotsButton />
                                                                <Dropdown.Popover>
                                                                    <Dropdown.Menu onAction={(key) => handleStatusChange(lead._id, key as LeadStatus)}>
                                                                        <Dropdown.Section>
                                                                            <Dropdown.SectionHeader className="px-3 py-1.5 text-xs font-semibold text-tertiary uppercase tracking-wider">
                                                                                Triage Status
                                                                            </Dropdown.SectionHeader>
                                                                            {Object.keys(statusBadgeConfig).map((st) => (
                                                                                <Dropdown.Item
                                                                                    key={st}
                                                                                    id={st}
                                                                                    label={`Mark as ${st}`}
                                                                                    className={lead.status === st ? "bg-brand-50" : ""}
                                                                                />
                                                                            ))}
                                                                        </Dropdown.Section>
                                                                    </Dropdown.Menu>
                                                                </Dropdown.Popover>
                                                            </Dropdown.Root>
                                                        </div>
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

            {/* View Details Drawer/Modal */}
            {selectedLead && (
                <ModalOverlay
                    isOpen={!!selectedLead}
                    onOpenChange={(open) => {
                        if (!open) setSelectedLead(null);
                    }}
                    isDismissable
                >
                    <Modal>
                        <Dialog>
                            <div className="relative w-full max-w-xl overflow-hidden rounded-2xl bg-primary shadow-xl border border-secondary text-left">
                                <CloseButton
                                    onClick={() => setSelectedLead(null)}
                                    theme="light"
                                    size="lg"
                                    className="absolute top-4 right-4"
                                />

                                <div className="px-6 pt-6 pb-4 border-b border-secondary">
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <FeaturedIcon color="brand" size="lg" theme="light" icon={Users01} />
                                            <BackgroundPattern
                                                pattern="circle"
                                                size="sm"
                                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                            />
                                        </div>
                                        <div>
                                            <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                                {selectedLead.name}
                                            </AriaHeading>
                                            <p className="text-xs text-tertiary">
                                                Lead ID: {selectedLead._id}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 space-y-6 max-h-120 overflow-y-auto">
                                    {/* Primary Info */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1 bg-secondary_subtle p-3 rounded-lg border border-secondary">
                                            <span className="text-xs font-semibold text-tertiary uppercase tracking-wider flex items-center gap-1">
                                                <Mail01 className="h-3.5 w-3.5 text-fg-quaternary" />
                                                Email Address
                                            </span>
                                            <a href={`mailto:${selectedLead.email}`} className="text-sm font-semibold text-brand-700 hover:underline block truncate">
                                                {selectedLead.email}
                                            </a>
                                        </div>
                                        <div className="space-y-1 bg-secondary_subtle p-3 rounded-lg border border-secondary">
                                            <span className="text-xs font-semibold text-tertiary uppercase tracking-wider flex items-center gap-1">
                                                <Phone className="h-3.5 w-3.5 text-fg-quaternary" />
                                                Phone Number
                                            </span>
                                            <span className="text-sm font-semibold text-primary block truncate">
                                                {selectedLead.phone || "N/A"}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Enquiry Details */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-0.5">
                                            <span className="block text-xs font-semibold text-tertiary uppercase tracking-wider">Lead Type</span>
                                            <Badge color={
                                                selectedLead.type === "Property Enquiry" ? "indigo" :
                                                selectedLead.type === "Mortgage Lead" ? "orange" :
                                                selectedLead.type === "Insurance Lead" ? "pink" :
                                                selectedLead.type === "Valuation Lead" ? "purple" : "gray"
                                            } size="sm" type="color">
                                                {selectedLead.type}
                                            </Badge>
                                        </div>
                                        <div className="space-y-0.5">
                                            <span className="block text-xs font-semibold text-tertiary uppercase tracking-wider">Date Submitted</span>
                                            <span className="text-sm font-semibold text-primary">
                                                {new Date(selectedLead.createdAt).toLocaleDateString("en-GB", {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit"
                                                })}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Enquiry Message */}
                                    <div className="space-y-1.5">
                                        <span className="block text-xs font-semibold text-tertiary uppercase tracking-wider flex items-center gap-1">
                                            <MessageSquare02 className="h-3.5 w-3.5 text-fg-quaternary" />
                                            Enquiry Message
                                        </span>
                                        <div className="text-sm text-secondary bg-secondary p-4 rounded-lg border border-secondary whitespace-pre-wrap leading-relaxed">
                                            {selectedLead.message || <span className="italic text-fg-disabled">No inquiry message provided.</span>}
                                        </div>
                                    </div>

                                    {/* Metadata */}
                                    {selectedLead.metadata && Object.keys(selectedLead.metadata).length > 0 && (
                                        <div className="space-y-2">
                                            <span className="block text-xs font-semibold text-tertiary uppercase tracking-wider flex items-center gap-1">
                                                <File02 className="h-3.5 w-3.5 text-fg-quaternary" />
                                                Form Metadata
                                            </span>
                                            <div className="grid grid-cols-2 gap-3 bg-secondary_subtle p-4 rounded-lg border border-secondary">
                                                {Object.entries(selectedLead.metadata).map(([key, val]) => {
                                                    let displayVal = String(val);
                                                    if (key === "propertyId") {
                                                        return (
                                                            <div key={key} className="col-span-2 space-y-0.5 border-b border-secondary pb-2 mb-2 last:border-0 last:pb-0 last:mb-0">
                                                                <span className="block text-xs text-tertiary capitalize">{key}</span>
                                                                <a
                                                                    href={`/dashboard/properties/${val}`}
                                                                    className="text-sm font-semibold text-brand-700 hover:underline flex items-center gap-1.5"
                                                                >
                                                                    <Building02 className="h-4 w-4 shrink-0 text-fg-quaternary" />
                                                                    View Property ({val})
                                                                </a>
                                                            </div>
                                                        );
                                                    }
                                                    return (
                                                        <div key={key} className="space-y-0.5">
                                                            <span className="block text-xs text-tertiary capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                                                            <span className="text-sm font-semibold text-primary capitalize">{displayVal}</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    {/* Triage Selector */}
                                    <div className="border-t border-secondary pt-5 flex flex-col gap-2">
                                        <label className="text-xs font-semibold text-tertiary uppercase tracking-wider">
                                            Update Triage Status
                                        </label>
                                        <div className="flex gap-2">
                                            {Object.keys(statusBadgeConfig).map((st) => (
                                                <button
                                                    key={st}
                                                    onClick={() => handleStatusChange(selectedLead._id, st as LeadStatus)}
                                                    className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-all duration-150 grow text-center ${
                                                        selectedLead.status === st
                                                            ? "bg-brand-500 border-brand-500 text-white shadow-xs"
                                                            : "bg-primary border-secondary text-secondary hover:bg-secondary_hover"
                                                    }`}
                                                >
                                                    {st}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3 p-4 px-6 border-t border-secondary bg-secondary_subtle">
                                    <Button
                                        color="secondary"
                                        size="md"
                                        onClick={() => setSelectedLead(null)}
                                    >
                                        Close
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
