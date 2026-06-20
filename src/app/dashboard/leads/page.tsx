"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
    Building01,
    Users01,
    SearchLg,
    Eye,
    MessageSquare02,
    Phone,
    Mail01,
    Building02,
    File02,
    Plus,
    DownloadCloud02,
    UploadCloud02,
    AlertCircle,
} from "@untitledui/icons";
import { Table, TableCard } from "@/components/application/table/table";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import {
    useLeads,
    useUpdateLead,
    useCreateLead,
    useLeadStats,
    fetchAllLeads,
    useBulkCreateLeads,
    type Lead,
    type LeadStatus,
    type LeadType,
    type LeadQueryParams
} from "@/lib/api/leads";
import { toast } from "sonner";
import { IconNotification } from "@/components/application/notifications/notifications";
import { FileUpload } from "@/components/application/file-upload/file-upload-base";

// React Aria Modal Components
import { ModalOverlay, Modal, Dialog } from "@/components/application/modals/modal";
import { CloseButton } from "@/components/base/buttons/close-button";
import { Heading as AriaHeading } from "react-aria-components";

// Pagination Component
import { PaginationPageDefault } from "@/components/application/pagination/pagination";

const BUYER_TYPES: LeadType[] = ['Property Enquiry', 'Mortgage Lead'];
const SELLER_TYPES: LeadType[] = ['Valuation Lead', 'Insurance Lead', 'General Enquiry'];

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

interface AddLeadFormData {
    name: string;
    email: string;
    phone?: string;
    type: LeadType;
    status: LeadStatus;
    message?: string;
}

export default function LeadsPage() {
    const [activeTab, setActiveTab] = useState<'buyer' | 'seller'>('buyer');
    const [searchEmail, setSearchEmail] = useState("");
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [params, setParams] = useState<LeadQueryParams>({
        page: 1,
        limit: 20,
        status: "",
        type: BUYER_TYPES,
    });

    const [isBulkOpen, setIsBulkOpen] = useState(false);
    const [parsedLeads, setParsedLeads] = useState<any[] | null>(null);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
    const [selectedFileSize, setSelectedFileSize] = useState<number>(0);

    const bulkCreateMutation = useBulkCreateLeads();

    const handleExportCSV = async () => {
        setIsExporting(true);
        try {
            // Fetch unpaginated leads using the current filters
            const allLeads = await fetchAllLeads({
                status: params.status || undefined,
                type: params.type,
                email: searchEmail ? searchEmail : undefined,
            });

            if (allLeads.length === 0) {
                toast.custom((t) => (
                    <IconNotification
                        title="No Leads to Export"
                        description="There are no leads matching the current filters to export."
                        color="warning"
                        onClose={() => toast.dismiss(t)}
                    />
                ));
                return;
            }

            // Headers for CSV
            const headers = [
                "Lead ID",
                "Name",
                "Email",
                "Phone",
                "Type",
                "Status",
                "Message",
                "Property Form",
                "Created At",
            ];

            // Helper to escape values for CSV
            const escapeCSV = (val: any) => {
                if (val === null || val === undefined) return "";
                const str = String(val);
                if (str.includes(",") || str.includes('"') || str.includes("\n")) {
                    return `"${str.replace(/"/g, '""')}"`;
                }
                return str;
            };

            // Map rows
            const rows = allLeads.map((lead) => {
                let propertyFormStr = "";
                if (lead.metadata && typeof lead.metadata === "object") {
                    propertyFormStr = Object.entries(lead.metadata)
                        .map(([key, val]) => {
                            const displayKey = key
                                .replace(/([A-Z])/g, " $1")
                                .replace(/^./, (str) => str.toUpperCase());
                            return `${displayKey}: ${val}`;
                        })
                        .join(" | ");
                }

                return [
                    lead._id || lead.id,
                    lead.name,
                    lead.email,
                    lead.phone || "",
                    lead.type,
                    lead.status,
                    lead.message || "",
                    propertyFormStr,
                    lead.createdAt,
                ];
            });

            // Combine headers and rows
            const csvContent = [
                headers.join(","),
                ...rows.map((row) => row.map(escapeCSV).join(",")),
            ].join("\n");

            // Trigger browser download
            const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.setAttribute("href", url);
            
            const fileStatus = params.status ? String(params.status).replace(/\s+/g, "_").toLowerCase() : "all";
            link.setAttribute(
                "download",
                `l2l_leads_${activeTab}_${fileStatus}_export_${new Date().toISOString().split('T')[0]}.csv`
            );
            link.style.visibility = "hidden";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            toast.custom((t) => (
                <IconNotification
                    title="Export Successful"
                    description={`Successfully exported ${allLeads.length} leads to CSV.`}
                    color="success"
                    onClose={() => toast.dismiss(t)}
                />
            ));
        } catch (err: any) {
            toast.custom((t) => (
                <IconNotification
                    title="Export Failed"
                    description={err.message || "An error occurred during CSV generation."}
                    color="error"
                    onClose={() => toast.dismiss(t)}
                />
            ));
        } finally {
            setIsExporting(false);
        }
    };

    const handleDownloadTemplate = () => {
        const headers = [
            "Name",
            "Email",
            "Phone"
        ];
        const rows = [
            [
                "John Doe",
                "john.doe@example.com",
                "+447700900077"
            ],
            [
                "Jane Smith",
                "jane.smith@example.com",
                "+447700900088"
            ]
        ];

        const csvContent = [
            headers.join(","),
            ...rows.map(row => row.map(val => {
                const str = String(val);
                if (str.includes(",") || str.includes('"') || str.includes("\n")) {
                    return `"${str.replace(/"/g, '""')}"`;
                }
                return str;
            }).join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "l2l_bulk_leads_template.csv");
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const parseCSV = (text: string): string[][] => {
        const lines: string[][] = [];
        let row: string[] = [];
        let inQuotes = false;
        let currentValue = '';

        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const nextChar = text[i + 1];

            if (char === '"') {
                if (inQuotes && nextChar === '"') {
                    currentValue += '"';
                    i++;
                } else {
                    inQuotes = !inQuotes;
                }
            } else if (char === ',' && !inQuotes) {
                row.push(currentValue.trim());
                currentValue = '';
            } else if ((char === '\r' || char === '\n') && !inQuotes) {
                if (char === '\r' && nextChar === '\n') {
                    i++;
                }
                row.push(currentValue.trim());
                if (row.length > 1 || row[0] !== '') {
                    lines.push(row);
                }
                row = [];
                currentValue = '';
            } else {
                currentValue += char;
            }
        }
        if (currentValue !== '' || row.length > 0) {
            row.push(currentValue.trim());
            lines.push(row);
        }
        return lines;
    };

    const handleFileDrop = (files: FileList) => {
        const file = files[0];
        if (!file) return;

        setSelectedFileName(file.name);
        setSelectedFileSize(file.size);

        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target?.result as string;
            if (!text) return;

            const csvData = parseCSV(text);
            if (csvData.length < 2) {
                setValidationErrors(["CSV file must contain a header row and at least one lead row."]);
                setParsedLeads(null);
                return;
            }

            const headers = csvData[0].map(h => h.trim().toLowerCase());
            const rows = csvData.slice(1);

            const nameIndex = headers.indexOf("name");
            const emailIndex = headers.indexOf("email");
            const phoneIndex = headers.indexOf("phone");

            if (nameIndex === -1 || emailIndex === -1) {
                setValidationErrors(["CSV headers must include 'Name' and 'Email'."]);
                setParsedLeads(null);
                return;
            }

            const leadsToValidate: any[] = [];
            const errors: string[] = [];

            rows.forEach((row, idx) => {
                if (row.length === 0 || (row.length === 1 && row[0] === "")) return; // Skip empty rows

                const name = row[nameIndex] || "";
                const email = row[emailIndex] || "";
                const phone = phoneIndex !== -1 ? row[phoneIndex] : "";

                const lead = {
                    name,
                    email,
                    phone: phone || undefined,
                    type: "General Enquiry",
                    status: "New",
                    metadata: {}
                };

                const rowErrors = validateLeadRow(lead, idx + 1);
                if (rowErrors.length > 0) {
                    errors.push(`Row ${idx + 2}: ${rowErrors.join(', ')}`);
                }

                leadsToValidate.push(lead);
            });

            setValidationErrors(errors);
            setParsedLeads(leadsToValidate);
        };
        reader.readAsText(file);
    };

    const validateLeadRow = (lead: any, rowNum: number): string[] => {
        const rowErrors: string[] = [];
        if (!lead.name || lead.name.trim() === "") {
            rowErrors.push("Name is required");
        }
        if (!lead.email || lead.email.trim() === "") {
            rowErrors.push("Email is required");
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(lead.email)) {
                rowErrors.push("Invalid email address");
            }
        }
        return rowErrors;
    };




    const handleBulkSubmit = () => {
        if (!parsedLeads || validationErrors.length > 0) return;

        bulkCreateMutation.mutate(parsedLeads, {
            onSuccess: () => {
                toast.custom((t) => (
                    <IconNotification
                        title="Bulk Upload Successful"
                        description={`Successfully uploaded ${parsedLeads.length} leads.`}
                        color="success"
                        onClose={() => toast.dismiss(t)}
                    />
                ));
                setIsBulkOpen(false);
                setParsedLeads(null);
                setValidationErrors([]);
                setSelectedFileName(null);
                refetch();
            },
            onError: (err: any) => {
                const apiErrors = err.response?.data?.data?.errors;
                if (Array.isArray(apiErrors)) {
                    setValidationErrors(apiErrors);
                } else {
                    toast.custom((t) => (
                        <IconNotification
                            title="Upload Failed"
                            description={err.response?.data?.message || err.message || "Something went wrong."}
                            color="error"
                            onClose={() => toast.dismiss(t)}
                        />
                    ));
                }
            }
        });
    };

    const handleTabChange = (tab: 'buyer' | 'seller') => {
        setActiveTab(tab);
        setParams(p => ({
            ...p,
            type: tab === 'buyer' ? BUYER_TYPES : SELLER_TYPES,
            page: 1,
        }));
    };

    const { data, isLoading, isError, refetch } = useLeads({
        ...params,
        email: searchEmail ? searchEmail : undefined
    });

    const { data: statsData, isLoading: statsLoading } = useLeadStats({
        type: params.type,
        email: searchEmail ? searchEmail : undefined
    });

    const handleCardClick = (status: LeadStatus) => {
        setParams(p => ({
            ...p,
            status: p.status === status ? "" : status,
            page: 1
        }));
    };
    
    const updateLeadMutation = useUpdateLead();
    const createLeadMutation = useCreateLead();

    const addLeadForm = useForm<AddLeadFormData>({
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            type: "Property Enquiry",
            status: "New",
            message: "",
        },
    });

    const handleAddLead = (data: AddLeadFormData) => {
        createLeadMutation.mutate(
            {
                name: data.name,
                email: data.email,
                phone: data.phone || undefined,
                type: data.type,
                status: data.status,
                message: data.message || undefined,
            },
            {
                onSuccess: () => {
                    toast.custom((t) => (
                        <IconNotification
                            title="Lead Created"
                            description="New lead has been added successfully."
                            color="success"
                            onClose={() => toast.dismiss(t)}
                        />
                    ));
                    setIsAddOpen(false);
                    addLeadForm.reset();
                    refetch();
                },
                onError: (err: any) => {
                    toast.custom((t) => (
                        <IconNotification
                            title="Failed to Create Lead"
                            description={err.response?.data?.message || err.message || "Something went wrong."}
                            color="error"
                            onClose={() => toast.dismiss(t)}
                        />
                    ));
                },
            }
        );
    };

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
        <div className="flex-1 px-4 py-6 md:px-8 md:py-8 space-y-6">
                    {/* Page Title */}
                    <div className="flex items-center justify-between gap-4 border-b border-secondary pb-5">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-xl font-semibold text-primary lg:text-display-xs">
                                Leads Management
                            </h1>
                            <p className="text-sm text-tertiary">
                                {totalResults} {totalResults === 1 ? "lead" : "leads"} total
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button
                                color="secondary"
                                size="md"
                                iconLeading={UploadCloud02}
                                onClick={() => setIsBulkOpen(true)}
                            >
                                Bulk Upload
                            </Button>
                            <Button
                                color="primary"
                                size="md"
                                iconLeading={Plus}
                                onClick={() => setIsAddOpen(true)}
                            >
                                Add Lead
                            </Button>
                        </div>
                    </div>

                    {/* Metrics Cards Grid */}
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                        {[
                            { status: "New" as const, label: "New", dotClass: "bg-brand-500" },
                            { status: "Contacted" as const, label: "Contacted", dotClass: "bg-blue-500" },
                            { status: "Qualified" as const, label: "Qualified", dotClass: "bg-success-500" },
                            { status: "Viewing Scheduled" as const, label: "Viewing Scheduled", dotClass: "bg-warning-500" },
                            { status: "Negotiating" as const, label: "Negotiating", dotClass: "bg-orange-500" },
                            { status: "Closed" as const, label: "Closed", dotClass: "bg-utility-gray-500" },
                        ].map((item) => {
                            const count = statsData?.[item.status] ?? 0;
                            const isSelected = params.status === item.status;
                            return (
                                <button
                                    key={item.status}
                                    onClick={() => handleCardClick(item.status)}
                                    className={`text-left rounded-xl p-4 shadow-xs ring-1 ring-secondary ring-inset flex flex-col gap-1 transition-all duration-200 hover:shadow-md hover:ring-brand-500 bg-primary group cursor-pointer ${
                                        isSelected ? "ring-2 ring-brand-500 bg-secondary_subtle" : ""
                                    }`}
                                >
                                    <div className="flex items-center justify-between w-full">
                                        <span className="text-xs font-semibold text-tertiary uppercase tracking-wider truncate mr-2">{item.label}</span>
                                        <span className={`h-2.5 w-2.5 rounded-full shrink-0 ${item.dotClass}`} />
                                    </div>
                                    <div className="flex items-baseline gap-2 mt-1">
                                        <span className="text-2xl font-bold text-primary">
                                            {statsLoading ? (
                                                <span className="block h-8 w-12 rounded bg-secondary_hover animate-pulse mt-1" />
                                            ) : (
                                                count
                                            )}
                                        </span>
                                    </div>
                                </button>
                            );
                        })}
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
                        {/* Status Filter Buttons */}
                        <div className="flex items-center gap-2 flex-wrap">
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
                            contentTrailing={
                                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                                    {/* Search */}
                                    <div className="relative w-full sm:w-64">
                                        <SearchLg className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-quaternary" />
                                        <input
                                            type="text"
                                            value={searchEmail}
                                            onChange={(e) => handleSearchChange(e.target.value)}
                                            placeholder="Search by email…"
                                            className="h-10 w-full rounded-lg border border-secondary bg-primary pl-9 pr-4 text-sm text-primary placeholder:text-placeholder focus:border-brand-500/20"
                                        />
                                    </div>
                                    <Button
                                        color="secondary"
                                        size="md"
                                        iconLeading={DownloadCloud02}
                                        onClick={handleExportCSV}
                                        isLoading={isExporting}
                                        isDisabled={isExporting}
                                    >
                                        Export CSV
                                    </Button>
                                </div>
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
                                                                href={`/dashboard/leads/${lead._id}`}
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

            {/* Add Lead Modal */}
            <ModalOverlay
                isOpen={isAddOpen}
                onOpenChange={(open) => {
                    if (!open) {
                        setIsAddOpen(false);
                        addLeadForm.reset();
                    }
                }}
                isDismissable
            >
                <Modal>
                    <Dialog>
                        <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-primary shadow-xl border border-secondary text-left">
                            <CloseButton
                                onClick={() => {
                                    setIsAddOpen(false);
                                    addLeadForm.reset();
                                }}
                                theme="light"
                                size="lg"
                                className="absolute top-4 right-4"
                            />

                            <div className="px-6 pt-6 pb-4 border-b border-secondary">
                                <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                    Add New Lead
                                </AriaHeading>
                                <p className="text-sm text-tertiary mt-0.5">
                                    Manually create a lead record in the system.
                                </p>
                            </div>

                            <form
                                onSubmit={addLeadForm.handleSubmit(handleAddLead)}
                                className="p-6 space-y-4"
                            >
                                <div className="grid grid-cols-2 gap-4">
                                    <Controller
                                        name="name"
                                        control={addLeadForm.control}
                                        rules={{ required: "Name is required" }}
                                        render={({ field, fieldState: { error } }) => (
                                            <Input
                                                {...field}
                                                label="Full Name"
                                                placeholder="Jane Doe"
                                                isInvalid={!!error}
                                                hint={error?.message}
                                            />
                                        )}
                                    />
                                    <Controller
                                        name="phone"
                                        control={addLeadForm.control}
                                        render={({ field, fieldState: { error } }) => (
                                            <Input
                                                {...field}
                                                label="Phone (optional)"
                                                placeholder="+44 7700 900000"
                                                isInvalid={!!error}
                                                hint={error?.message}
                                            />
                                        )}
                                    />
                                </div>

                                <Controller
                                    name="email"
                                    control={addLeadForm.control}
                                    rules={{
                                        required: "Email is required",
                                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" },
                                    }}
                                    render={({ field, fieldState: { error } }) => (
                                        <Input
                                            {...field}
                                            label="Email Address"
                                            placeholder="jane@example.com"
                                            isInvalid={!!error}
                                            hint={error?.message}
                                        />
                                    )}
                                />

                                <div className="grid grid-cols-2 gap-4">
                                    <Controller
                                        name="type"
                                        control={addLeadForm.control}
                                        rules={{ required: "Type is required" }}
                                        render={({ field: { value, onChange }, fieldState: { error } }) => (
                                            <Select
                                                label="Lead Type"
                                                placeholder="Select type…"
                                                selectedKey={value}
                                                onSelectionChange={(k) => onChange(k as LeadType)}
                                                isInvalid={!!error}
                                                hint={error?.message}
                                                items={[
                                                    { id: "Property Enquiry", label: "Property Enquiry" },
                                                    { id: "Mortgage Lead", label: "Mortgage Lead" },
                                                    { id: "Valuation Lead", label: "Valuation Lead" },
                                                    { id: "Insurance Lead", label: "Insurance Lead" },
                                                    { id: "General Enquiry", label: "General Enquiry" },
                                                ]}
                                            >
                                                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                            </Select>
                                        )}
                                    />
                                    <Controller
                                        name="status"
                                        control={addLeadForm.control}
                                        rules={{ required: "Status is required" }}
                                        render={({ field: { value, onChange }, fieldState: { error } }) => (
                                            <Select
                                                label="Initial Status"
                                                placeholder="Select status…"
                                                selectedKey={value}
                                                onSelectionChange={(k) => onChange(k as LeadStatus)}
                                                isInvalid={!!error}
                                                hint={error?.message}
                                                items={STATUS_FILTERS.filter((f) => f.value !== "").map((f) => ({ id: f.value, label: f.label }))}
                                            >
                                                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                            </Select>
                                        )}
                                    />
                                </div>

                                <Controller
                                    name="message"
                                    control={addLeadForm.control}
                                    render={({ field, fieldState: { error } }) => (
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-sm font-medium text-secondary">
                                                Message <span className="text-tertiary font-normal">(optional)</span>
                                            </label>
                                            <textarea
                                                {...field}
                                                rows={3}
                                                placeholder="Add a note or message from the lead…"
                                                className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-primary placeholder:text-placeholder bg-primary resize-none focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-colors ${
                                                    error ? "border-error-300 focus:border-error-500" : "border-secondary focus:border-brand-500"
                                                }`}
                                            />
                                            {error && (
                                                <p className="text-xs text-error-primary">{error.message}</p>
                                            )}
                                        </div>
                                    )}
                                />

                                <div className="flex justify-end gap-3 pt-2 border-t border-secondary">
                                    <Button
                                        color="secondary"
                                        size="md"
                                        type="button"
                                        onClick={() => {
                                            setIsAddOpen(false);
                                            addLeadForm.reset();
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        color="primary"
                                        size="md"
                                        type="submit"
                                        isLoading={createLeadMutation.isPending}
                                    >
                                        Create Lead
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </Dialog>
                </Modal>
            </ModalOverlay>

            {/* Bulk Upload Modal */}
            <ModalOverlay
                isOpen={isBulkOpen}
                onOpenChange={(open) => {
                    if (!open) {
                        setIsBulkOpen(false);
                        setParsedLeads(null);
                        setValidationErrors([]);
                        setSelectedFileName(null);
                    }
                }}
                isDismissable
            >
                <Modal>
                    <Dialog>
                        <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-primary shadow-xl border border-secondary text-left">
                            <CloseButton
                                onClick={() => {
                                    setIsBulkOpen(false);
                                    setParsedLeads(null);
                                    setValidationErrors([]);
                                    setSelectedFileName(null);
                                }}
                                theme="light"
                                size="lg"
                                className="absolute top-4 right-4"
                            />

                            <div className="px-6 pt-6 pb-4 border-b border-secondary">
                                <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                    Bulk Upload Leads
                                </AriaHeading>
                                <p className="text-sm text-tertiary mt-0.5">
                                    Import multiple leads using a CSV file.
                                </p>
                            </div>

                            <div className="p-6 space-y-6">
                                {/* Instructions & Download Template */}
                                <div className="rounded-xl bg-secondary_subtle border border-secondary p-4 space-y-3">
                                    <div className="text-sm text-secondary leading-relaxed">
                                        Please download our CSV template to ensure your lead data matches our required formats, including conditional fields like Property ID, Budget, and Address.
                                    </div>
                                    <Button
                                        color="secondary"
                                        size="sm"
                                        iconLeading={DownloadCloud02}
                                        onClick={handleDownloadTemplate}
                                    >
                                        Download CSV Template
                                    </Button>
                                </div>

                                {/* File Dropzone / Uploader */}
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-secondary">
                                        CSV File
                                    </label>
                                    {!selectedFileName ? (
                                        <FileUpload.DropZone
                                            accept=".csv"
                                            allowsMultiple={false}
                                            onDropFiles={handleFileDrop}
                                            hint="CSV files only (up to 10MB)"
                                            maxSize={10 * 1024 * 1024}
                                        />
                                    ) : (
                                        <div className="rounded-xl border border-secondary bg-primary p-4 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <File02 className="size-8 text-fg-quaternary" />
                                                <div className="flex flex-col min-w-0">
                                                    <span className="text-sm font-medium text-secondary truncate max-w-xs">{selectedFileName}</span>
                                                    <span className="text-xs text-tertiary">{(selectedFileSize / 1024).toFixed(1)} KB</span>
                                                </div>
                                            </div>
                                            <Button
                                                color="secondary"
                                                size="sm"
                                                onClick={() => {
                                                    setSelectedFileName(null);
                                                    setParsedLeads(null);
                                                    setValidationErrors([]);
                                                }}
                                            >
                                                Change File
                                            </Button>
                                        </div>
                                    )}
                                </div>

                                {/* Validation Feedback */}
                                {validationErrors.length > 0 && (
                                    <div className="rounded-xl border border-error-300 bg-error-50 dark:bg-error-950/20 dark:border-error-800 p-4 space-y-2">
                                        <div className="flex items-center gap-2 text-error-primary text-sm font-semibold">
                                            <AlertCircle className="size-4 shrink-0" />
                                            <span>Validation errors detected ({validationErrors.length})</span>
                                        </div>
                                        <ul className="text-xs text-error-primary pl-5 list-disc max-h-40 overflow-y-auto space-y-1">
                                            {validationErrors.map((err, i) => (
                                                <li key={i}>{err}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {parsedLeads && validationErrors.length === 0 && (
                                    <div className="rounded-xl border border-success-300 bg-success-50 dark:bg-success-950/20 dark:border-success-800 p-4 flex items-center gap-2 text-success-primary text-sm font-medium">
                                        <span className="font-semibold">✓ Parsed {parsedLeads.length} leads successfully.</span>
                                        <span>Ready for submission.</span>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="flex justify-end gap-3 pt-2 border-t border-secondary">
                                    <Button
                                        color="secondary"
                                        size="md"
                                        type="button"
                                        onClick={() => {
                                            setIsBulkOpen(false);
                                            setParsedLeads(null);
                                            setValidationErrors([]);
                                            setSelectedFileName(null);
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        color="primary"
                                        size="md"
                                        onClick={handleBulkSubmit}
                                        isLoading={bulkCreateMutation.isPending}
                                        isDisabled={!parsedLeads || validationErrors.length > 0 || bulkCreateMutation.isPending}
                                    >
                                        Submit Upload
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Dialog>
                </Modal>
            </ModalOverlay>
        </div>
    );
}

