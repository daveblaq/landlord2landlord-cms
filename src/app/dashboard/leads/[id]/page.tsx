"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    ArrowLeft,
    Mail01,
    Phone,
    MessageSquare02,
    File02,
    Building02,
    Users01,
    MarkerPin02,
    ChevronDown,
    ChevronRight,
} from "@untitledui/icons";

import { useLead, useUpdateLead, useCreateLeadNote, type LeadStatus, type Lead } from "@/lib/api/leads";
import { useProperty, useUpdateProperty, type PropertyStatus } from "@/lib/api/properties";
import { TextEditor } from "@/components/base/text-editor/text-editor";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { toast } from "sonner";
import { IconNotification } from "@/components/application/notifications/notifications";

const statusBadgeConfig: Record<LeadStatus, { label: string; color: "brand" | "blue" | "success" | "warning" | "orange" | "gray" }> = {
    New: { label: "New", color: "brand" },
    Contacted: { label: "Contacted", color: "blue" },
    Qualified: { label: "Qualified", color: "success" },
    "Viewing Scheduled": { label: "Viewing Scheduled", color: "warning" },
    Negotiating: { label: "Negotiating", color: "orange" },
    Closed: { label: "Closed", color: "gray" },
};

const propertyStatusConfig: Record<PropertyStatus, { label: string; color: "success" | "warning" | "error" | "gray" | "blue" | "brand" }> = {
    published: { label: "Published", color: "success" },
    draft: { label: "Draft", color: "gray" },
    "pending-review": { label: "Pending Review", color: "warning" },
    "under-offer": { label: "Under Offer", color: "blue" },
    sold: { label: "Sold", color: "error" },
    archived: { label: "Archived", color: "gray" },
};

function PropertyDetailsSection({ propertyId }: { propertyId: string }) {
    const router = useRouter();
    const { data: property, isLoading, isError } = useProperty(propertyId);
    const updatePropertyMutation = useUpdateProperty();

    const handlePropertyStatusChange = (newStatus: PropertyStatus) => {
        updatePropertyMutation.mutate(
            { id: propertyId, data: { status: newStatus } },
            {
                onSuccess: () => {
                    toast.custom((t) => (
                        <IconNotification
                            title="Property Status Updated"
                            description={`Property status updated to ${newStatus}.`}
                            color="success"
                            onClose={() => toast.dismiss(t)}
                        />
                    ));
                },
                onError: (err: any) => {
                    toast.custom((t) => (
                        <IconNotification
                            title="Update Failed"
                            description={err.response?.data?.message || err.message || "Failed to update property status."}
                            color="error"
                            onClose={() => toast.dismiss(t)}
                        />
                    ));
                }
            }
        );
    };

    if (isLoading) {
        return (
            <div className="rounded-xl border border-secondary bg-primary p-5 shadow-xs space-y-4 animate-pulse">
                <div className="h-5 w-48 bg-secondary rounded" />
                <div className="flex gap-4">
                    <div className="w-28 h-20 bg-secondary rounded-lg" />
                    <div className="space-y-2 flex-1">
                        <div className="h-4 w-[70%] bg-secondary rounded" />
                        <div className="h-3 w-[40%] bg-secondary rounded" />
                    </div>
                </div>
            </div>
        );
    }

    if (isError || !property) {
        return (
            <div className="rounded-xl border border-secondary bg-primary p-5 shadow-xs space-y-4">
                <h2 className="text-sm font-semibold text-primary uppercase tracking-wider flex items-center gap-1.5">
                    <Building02 className="h-4 w-4 text-fg-quaternary" />
                    Enquired Property Details
                </h2>
                <div className="text-sm text-tertiary bg-secondary p-4 rounded-lg border border-secondary text-center">
                    Property listing details could not be loaded or the property was deleted.
                </div>
            </div>
        );
    }

    const statusInfo = propertyStatusConfig[property.status] ?? { label: property.status, color: "gray" };

    return (
        <div className="rounded-xl border border-secondary bg-primary p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-primary uppercase tracking-wider flex items-center gap-1.5">
                    <Building02 className="h-4 w-4 text-fg-quaternary" />
                    Enquired Property Details
                </h2>
                <Badge color={statusInfo.color} size="md" type="pill-color">
                    {statusInfo.label}
                </Badge>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 bg-secondary_subtle p-4 rounded-lg border border-secondary">
                {property.heroImage && (
                    <img
                        src={property.heroImage}
                        alt={property.title}
                        className="w-full sm:w-28 h-20 object-cover rounded-lg border border-secondary shrink-0"
                    />
                )}
                <div className="flex-1 space-y-1">
                    <h3 className="text-sm font-semibold text-primary">
                        {property.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-tertiary">
                        <MarkerPin02 className="h-3.5 w-3.5 text-fg-quaternary" />
                        <span>{property.location}, {property.postcode}</span>
                    </div>
                    <div className="flex gap-4 pt-1.5 text-xs font-medium text-secondary flex-wrap">
                        <div>
                            Asking Price: <span className="font-semibold text-primary">£{property.investmentMetrics?.askingPrice?.toLocaleString() ?? 0}</span>
                        </div>
                        <div>
                            Monthly Rent: <span className="font-semibold text-primary">£{property.investmentMetrics?.monthlyRent?.toLocaleString() ?? 0}</span>
                        </div>
                        <div>
                            Gross Yield: <span className="font-semibold text-primary">{property.investmentMetrics?.grossYield ?? 0}%</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
                <Button
                    color="secondary"
                    size="sm"
                    onClick={() => router.push(`/dashboard/properties/${property._id}`)}
                >
                    View Complete Details
                </Button>

                <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-tertiary whitespace-nowrap">Property Status:</span>
                    <select
                        value={property.status}
                        onChange={(e) => handlePropertyStatusChange(e.target.value as PropertyStatus)}
                        disabled={updatePropertyMutation.isPending}
                        className="bg-primary border border-secondary text-primary rounded-lg px-2.5 py-1.5 text-xs font-semibold cursor-pointer outline-none focus:border-brand-500"
                    >
                        <option value="draft">Draft</option>
                        <option value="pending-review">Pending Review</option>
                        <option value="published">Published</option>
                        <option value="under-offer">Under Offer</option>
                        <option value="sold">Sold</option>
                        <option value="archived">Archived</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

function LeadNotesSection({ lead }: { lead: Lead }) {
    const [noteContent, setNoteContent] = useState("");
    const [editorKey, setEditorKey] = useState(0);
    const [expandedNotes, setExpandedNotes] = useState<Record<string, boolean>>({});
    const createNoteMutation = useCreateLeadNote();

    const isNoteEmpty = !noteContent || noteContent.trim() === "" || noteContent.trim() === "<p></p>";

    const handleAddNote = (e: React.FormEvent) => {
        e.preventDefault();
        if (isNoteEmpty) return;

        createNoteMutation.mutate(
            { leadId: lead._id, content: noteContent },
            {
                onSuccess: () => {
                    setNoteContent("");
                    setEditorKey((k) => k + 1);
                    toast.custom((t) => (
                        <IconNotification
                            title="Note Added"
                            description="Successfully added a new note to this lead."
                            color="success"
                            onClose={() => toast.dismiss(t)}
                        />
                    ));
                },
                onError: (err: any) => {
                    toast.custom((t) => (
                        <IconNotification
                            title="Submission Failed"
                            description={err.response?.data?.message || err.message || "Failed to add note."}
                            color="error"
                            onClose={() => toast.dismiss(t)}
                        />
                    ));
                }
            }
        );
    };

    const toggleNote = (noteId: string) => {
        setExpandedNotes((prev) => ({
            ...prev,
            [noteId]: !prev[noteId],
        }));
    };

    const notes = [...(lead.notes || [])].reverse();

    return (
        <div className="rounded-xl border border-secondary bg-primary p-5 shadow-xs space-y-6">
            <h2 className="text-sm font-semibold text-primary uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare02 className="h-4 w-4 text-fg-quaternary" />
                Notes & Staff Activity ({notes.length})
            </h2>

            {/* Note Creation Form */}
            <form onSubmit={handleAddNote} className="space-y-3">
                <TextEditor.Root
                    key={editorKey}
                    placeholder="Type a new staff note/activity update here..."
                    onUpdate={({ editor }) => {
                        setNoteContent(editor.getHTML());
                    }}
                >
                    <TextEditor.Toolbar type="simple" />
                    <TextEditor.Content className="min-h-[120px] bg-primary" />
                    <TextEditor.HintText />
                </TextEditor.Root>
                <div className="flex justify-end">
                    <Button
                        type="submit"
                        color="primary"
                        size="sm"
                        disabled={createNoteMutation.isPending || isNoteEmpty}
                    >
                        {createNoteMutation.isPending ? "Adding Note..." : "Add Note"}
                    </Button>
                </div>
            </form>

            {/* Accordion Notes List */}
            {notes.length === 0 ? (
                <div className="text-sm text-tertiary bg-secondary p-4 rounded-lg border border-secondary text-center">
                    No notes recorded yet. Add one above to start tracking activity.
                </div>
            ) : (
                <div className="space-y-3">
                    {notes.map((note) => {
                        const noteId = note._id || String(Math.random());
                        const isExpanded = !!expandedNotes[noteId];
                        return (
                            <div key={noteId} className="rounded-lg border border-secondary bg-primary overflow-hidden shadow-xs">
                                {/* Accordion Header */}
                                <button
                                    type="button"
                                    onClick={() => toggleNote(noteId)}
                                    className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary_hover transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        {isExpanded ? (
                                            <ChevronDown className="h-4 w-4 text-tertiary shrink-0" />
                                        ) : (
                                            <ChevronRight className="h-4 w-4 text-tertiary shrink-0" />
                                        )}
                                        <span className="font-semibold text-primary text-sm">
                                            {note.submittedBy?.name || "System"}
                                        </span>
                                        <span className="text-xs text-tertiary">
                                            {new Date(note.createdAt).toLocaleString("en-GB", {
                                                day: "2-digit",
                                                month: "2-digit",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit"
                                            })}
                                        </span>
                                    </div>
                                    <Badge color={note.submittedBy?.role === "admin" ? "brand" : "blue"} size="sm" type="pill-color" className="capitalize">
                                        {note.submittedBy?.role || "Staff"}
                                    </Badge>
                                </button>

                                {/* Accordion Content */}
                                {isExpanded && (
                                    <div className="border-t border-secondary">
                                        {/* Note body rendering rich HTML text */}
                                        <div
                                            className="p-4 text-sm text-secondary bg-primary leading-relaxed whitespace-normal rich-text-content [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6 [&_strong]:font-bold [&_em]:italic [&_u]:underline [&_a]:text-brand-600 [&_a]:underline hover:[&_a]:text-brand-700 [&_blockquote]:border-l-4 [&_blockquote]:border-secondary [&_blockquote]:pl-4 [&_blockquote]:my-3.5 [&_blockquote]:italic [&_blockquote]:text-tertiary [&_code]:bg-secondary_subtle [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:font-mono [&_code]:text-xs [&_pre]:bg-secondary_subtle [&_pre]:p-3 [&_pre]:rounded [&_pre]:font-mono [&_pre]:text-xs [&_pre]:my-2 [&_pre]:overflow-x-auto [&_p]:mb-2 last:[&_p]:mb-0"
                                            dangerouslySetInnerHTML={{ __html: note.content }}
                                        />

                                        {/* Status Snapshot Footer */}
                                        <div className="px-4 py-2.5 bg-secondary_subtle border-t border-secondary flex flex-wrap gap-x-6 gap-y-1.5 text-xs text-tertiary font-medium">
                                            <div>
                                                Lead Status Snapshot: <span className="font-semibold text-primary capitalize">{note.capturedStatus?.leadStatus}</span>
                                            </div>
                                            {note.capturedStatus?.propertyStatus && (
                                                <div>
                                                    Property Status Snapshot: <span className="font-semibold text-primary capitalize">{note.capturedStatus.propertyStatus}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default function ViewLeadPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const { data: lead, isLoading, isError } = useLead(id);
    const updateLeadMutation = useUpdateLead();

    const handleStatusChange = (newStatus: LeadStatus) => {
        if (!lead) return;
        updateLeadMutation.mutate(
            { id: lead._id, data: { status: newStatus } },
            {
                onSuccess: () => {
                    toast.custom((t) => (
                        <IconNotification
                            title="Status Updated"
                            description={`Lead status updated to ${newStatus}.`}
                            color="success"
                            onClose={() => toast.dismiss(t)}
                        />
                    ));
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

    if (isLoading) {
        return (
            <div className="flex-1 px-4 py-6 md:px-8 md:py-8 space-y-6">
                {/* Top Action Bar Skeleton */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-secondary pb-5">
                    <div className="flex flex-col gap-1 w-full max-w-md">
                        {/* Back button skeleton */}
                        <div className="h-6 w-28 bg-secondary animate-pulse rounded" />
                        {/* Name + Badge row skeleton */}
                        <div className="flex items-center gap-3 mt-3">
                            <div className="h-9 w-48 bg-secondary animate-pulse rounded" />
                            <div className="h-6 w-20 bg-secondary animate-pulse rounded-full" />
                        </div>
                        {/* Lead ID skeleton */}
                        <div className="h-4 w-36 bg-secondary animate-pulse rounded mt-2" />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Left Columns Skeleton */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Contact Info Card Skeleton */}
                        <div className="rounded-xl border border-secondary bg-primary p-5 shadow-xs space-y-6">
                            <div className="h-4 w-40 bg-secondary animate-pulse rounded" />
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="space-y-2 bg-secondary_subtle p-4 rounded-lg border border-secondary">
                                    <div className="h-3 w-24 bg-secondary animate-pulse rounded" />
                                    <div className="h-4 w-36 bg-secondary animate-pulse rounded" />
                                </div>
                                <div className="space-y-2 bg-secondary_subtle p-4 rounded-lg border border-secondary">
                                    <div className="h-3 w-24 bg-secondary animate-pulse rounded" />
                                    <div className="h-4.5 w-32 bg-secondary animate-pulse rounded" />
                                </div>
                            </div>
                        </div>

                        {/* Enquiry Message Card Skeleton */}
                        <div className="rounded-xl border border-secondary bg-primary p-5 shadow-xs space-y-4">
                            <div className="h-4 w-32 bg-secondary animate-pulse rounded" />
                            <div className="space-y-3 bg-secondary p-5 rounded-lg border border-secondary">
                                <div className="h-4 w-full bg-secondary animate-pulse rounded" />
                                <div className="h-4 w-[90%] bg-secondary animate-pulse rounded" />
                                <div className="h-4 w-[75%] bg-secondary animate-pulse rounded" />
                            </div>
                        </div>

                        {/* Metadata Card Skeleton */}
                        <div className="rounded-xl border border-secondary bg-primary p-5 shadow-xs space-y-4">
                            <div className="h-4 w-48 bg-secondary animate-pulse rounded" />
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 bg-secondary_subtle p-5 rounded-lg border border-secondary">
                                <div className="space-y-2">
                                    <div className="h-3 w-20 bg-secondary animate-pulse rounded" />
                                    <div className="h-4 w-28 bg-secondary animate-pulse rounded" />
                                </div>
                                <div className="space-y-2">
                                    <div className="h-3 w-24 bg-secondary animate-pulse rounded" />
                                    <div className="h-4 w-32 bg-secondary animate-pulse rounded" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column Skeleton */}
                    <div className="space-y-6">
                        {/* Submission Details Skeleton */}
                        <div className="rounded-xl border border-secondary bg-primary p-5 shadow-xs space-y-4">
                            <div className="h-4 w-36 bg-secondary animate-pulse rounded" />
                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between py-2 border-b border-secondary">
                                    <div className="h-4 w-16 bg-secondary animate-pulse rounded" />
                                    <div className="h-5 w-24 bg-secondary animate-pulse rounded" />
                                </div>
                                <div className="flex justify-between py-2 border-b border-secondary">
                                    <div className="h-4 w-24 bg-secondary animate-pulse rounded" />
                                    <div className="h-4 w-20 bg-secondary animate-pulse rounded" />
                                </div>
                                <div className="flex justify-between py-2 border-b border-secondary">
                                    <div className="h-4 w-24 bg-secondary animate-pulse rounded" />
                                    <div className="h-4 w-16 bg-secondary animate-pulse rounded" />
                                </div>
                            </div>
                        </div>

                        {/* Triage Control Skeleton */}
                        <div className="rounded-xl border border-secondary bg-primary p-5 shadow-xs space-y-4">
                            <div className="h-4 w-40 bg-secondary animate-pulse rounded" />
                            <div className="h-3 w-full bg-secondary animate-pulse rounded" />
                            <div className="flex flex-col gap-2">
                                {Array.from({ length: 6 }).map((_, idx) => (
                                    <div key={idx} className="h-10 w-full bg-secondary animate-pulse rounded-lg" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (isError || !lead) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-error-50 text-error-600">
                    <Users01 className="h-6 w-6" />
                </div>
                <h3 className="text-md font-semibold text-primary">Failed to load lead</h3>
                <p className="mt-1 text-sm text-tertiary">The lead could not be found or there was an error loading it.</p>
                <Button className="mt-5" color="secondary" size="md" onClick={() => router.push("/dashboard/leads")}>
                    Back to Leads
                </Button>
            </div>
        );
    }

    const badgeColor = statusBadgeConfig[lead.status]?.color || "gray";

    return (
        <div className="flex-1 px-4 py-6 md:px-8 md:py-8 space-y-6">
            {/* Top Action Bar */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-secondary pb-5">
                <div className="flex flex-col gap-1">
                    <Button
                        color="link-gray"
                        size="sm"
                        iconLeading={ArrowLeft}
                        onClick={() => router.push("/dashboard/leads")}
                        className="w-max"
                    >
                        Back to Leads
                    </Button>
                    <div className="flex items-center gap-3 flex-wrap mt-2">
                        <h1 className="text-xl font-semibold text-primary lg:text-display-xs">
                            {lead.name}
                        </h1>
                        <Badge color={badgeColor} size="md" type="pill-color">
                            {lead.status}
                        </Badge>
                    </div>
                    <p className="text-xs text-tertiary">
                        Lead ID: {lead._id}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Left & Center Columns: Detailed Information */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Primary Information Card */}
                    <div className="rounded-xl border border-secondary bg-primary p-5 shadow-xs space-y-6">
                        <h2 className="text-sm font-semibold text-primary uppercase tracking-wider">
                            Contact Information
                        </h2>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-1 bg-secondary_subtle p-4 rounded-lg border border-secondary">
                                <span className="text-xs font-semibold text-tertiary uppercase tracking-wider flex items-center gap-1.5">
                                    <Mail01 className="h-4 w-4 text-fg-quaternary" />
                                    Email Address
                                </span>
                                <a href={`mailto:${lead.email}`} className="text-sm font-semibold text-brand-700 hover:underline block truncate">
                                    {lead.email}
                                </a>
                            </div>

                            <div className="space-y-1 bg-secondary_subtle p-4 rounded-lg border border-secondary">
                                <span className="text-xs font-semibold text-tertiary uppercase tracking-wider flex items-center gap-1.5">
                                    <Phone className="h-4 w-4 text-fg-quaternary" />
                                    Phone Number
                                </span>
                                <span className="text-sm font-semibold text-primary block truncate">
                                    {lead.phone || "N/A"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Enquiry Message Card */}
                    <div className="rounded-xl border border-secondary bg-primary p-5 shadow-xs space-y-4">
                        <h2 className="text-sm font-semibold text-primary uppercase tracking-wider flex items-center gap-1.5">
                            <MessageSquare02 className="h-4 w-4 text-fg-quaternary" />
                            Enquiry Message
                        </h2>
                        <div className="text-sm text-secondary bg-secondary p-5 rounded-lg border border-secondary whitespace-pre-wrap leading-relaxed">
                            {lead.message || <span className="italic text-fg-disabled">No inquiry message provided.</span>}
                        </div>
                    </div>

                    {/* Metadata Card */}
                    {lead.type !== "Property Enquiry" && lead.metadata && Object.keys(lead.metadata).length > 0 && (
                        <div className="rounded-xl border border-secondary bg-primary p-5 shadow-xs space-y-4">
                            <h2 className="text-sm font-semibold text-primary uppercase tracking-wider flex items-center gap-1.5">
                                <File02 className="h-4 w-4 text-fg-quaternary" />
                                Form Submission Metadata
                            </h2>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 bg-secondary_subtle p-5 rounded-lg border border-secondary">
                                {Object.entries(lead.metadata).map(([key, val]) => {
                                    let displayVal = String(val);
                                    if (key === "propertyId") {
                                        return (
                                            <div key={key} className="sm:col-span-2 space-y-1 border-b border-secondary pb-3 mb-2 last:border-0 last:pb-0 last:mb-0">
                                                <span className="block text-xs text-tertiary capitalize">{key}</span>
                                                <a
                                                    href={`/dashboard/properties/${val}`}
                                                    className="text-sm font-semibold text-brand-700 hover:underline flex items-center gap-1.5"
                                                >
                                                    <Building02 className="h-4 w-4 shrink-0 text-fg-quaternary" />
                                                    View Property Details ({val})
                                                </a>
                                            </div>
                                        );
                                    }
                                    return (
                                        <div key={key} className="space-y-1">
                                            <span className="block text-xs text-tertiary capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                                            <span className="text-sm font-semibold text-primary capitalize">{displayVal}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Enquired Property Details Card */}
                    {lead.type === "Property Enquiry" && lead.metadata?.propertyId && (
                        <PropertyDetailsSection propertyId={lead.metadata.propertyId} />
                    )}

                    {/* Lead Notes and Activity Section */}
                    <LeadNotesSection lead={lead} />
                </div>

                {/* Right Column: Triage Actions */}
                <div className="space-y-6">
                    {/* Details Panel */}
                    <div className="rounded-xl border border-secondary bg-primary p-5 shadow-xs space-y-4">
                        <h2 className="text-sm font-semibold text-primary uppercase tracking-wider">
                            Submission Details
                        </h2>
                        <div className="space-y-4 text-sm">
                            <div className="flex justify-between py-2 border-b border-secondary">
                                <span className="text-tertiary">Lead Type</span>
                                <Badge color={
                                    lead.type === "Property Enquiry" ? "indigo" :
                                    lead.type === "Mortgage Lead" ? "orange" :
                                    lead.type === "Insurance Lead" ? "pink" :
                                    lead.type === "Valuation Lead" ? "purple" : "gray"
                                } size="sm" type="color">
                                    {lead.type}
                                </Badge>
                            </div>
                            <div className="flex justify-between py-2 border-b border-secondary">
                                <span className="text-tertiary">Submitted Date</span>
                                <span className="font-semibold text-primary">
                                    {new Date(lead.createdAt).toLocaleDateString("en-GB", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric"
                                    })}
                                </span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-secondary">
                                <span className="text-tertiary">Submitted Time</span>
                                <span className="font-semibold text-primary">
                                    {new Date(lead.createdAt).toLocaleTimeString("en-GB", {
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Triage Status Control */}
                    <div className="rounded-xl border border-secondary bg-primary p-5 shadow-xs space-y-4">
                        <h2 className="text-sm font-semibold text-primary uppercase tracking-wider">
                            Triage & Status Control
                        </h2>
                        <p className="text-xs text-tertiary">
                            Select a new state for this lead below to update the pipeline metrics.
                        </p>
                        <select
                            value={lead.status}
                            onChange={(e) => handleStatusChange(e.target.value as LeadStatus)}
                            disabled={updateLeadMutation.isPending}
                            className="w-full bg-primary border border-secondary text-primary rounded-lg px-3 py-2.5 text-sm font-semibold cursor-pointer outline-none focus:border-brand-500"
                        >
                            {Object.keys(statusBadgeConfig).map((st) => (
                                <option key={st} value={st}>
                                    {st}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}
