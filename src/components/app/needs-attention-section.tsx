"use client";

import { AlertCircle, Building01, Users01 } from "@untitledui/icons";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import Link from "next/link";
import { Button } from "@/components/base/buttons/button";
import { IconNotification } from "@/components/application/notifications/notifications";
import { type Lead, leadKeys, useUpdateLead } from "@/lib/api/leads";
import type { Property } from "@/lib/api/properties";

const formatRelativeTime = (dateInput: string | Date): string => {
    const date = new Date(dateInput);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (60 * 1000));
    const diffHours = Math.floor(diffMs / (60 * 60 * 1000));
    const diffDays = Math.floor(diffMs / (24 * 60 * 60 * 1000));

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
};

const NeedsAttentionLeadRow = ({ lead }: { lead: Lead }) => {
    const queryClient = useQueryClient();
    const updateLead = useUpdateLead();

    const handleMarkContacted = () => {
        updateLead.mutate(
            { id: lead._id, data: { status: "Contacted" } },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: leadKeys.lists() });
                },
                onError: () => {
                    toast.custom((t) => (
                        <IconNotification
                            title="Update failed"
                            description="Could not mark lead as contacted. Please try again."
                            color="error"
                            onClose={() => toast.dismiss(t)}
                        />
                    ));
                },
            },
        );
    };

    return (
        <div className="flex items-center justify-between gap-3 py-2.5">
            <div className="flex min-w-0 items-center gap-2.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-warning-100">
                    <Users01 className="h-3.5 w-3.5 text-warning-600" />
                </div>
                <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-primary">{lead.name}</p>
                    <p className="truncate text-xs text-tertiary">
                        {lead.type} · {formatRelativeTime(lead.createdAt)}
                    </p>
                </div>
            </div>
            <Button
                size="sm"
                color="secondary"
                onClick={handleMarkContacted}
                isLoading={updateLead.isPending}
                isDisabled={updateLead.isPending}
                className="shrink-0"
            >
                Mark contacted
            </Button>
        </div>
    );
};

const NeedsAttentionPropertyRow = ({ property }: { property: Property }) => {
    return (
        <div className="flex items-center justify-between gap-3 py-2.5">
            <div className="flex min-w-0 items-center gap-2.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-warning-100">
                    <Building01 className="h-3.5 w-3.5 text-warning-600" />
                </div>
                <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-primary">{property.title}</p>
                    <p className="truncate text-xs text-tertiary">
                        {property.location} · pending review
                    </p>
                </div>
            </div>
            <Link
                href={`/dashboard/properties/${property._id}`}
                className="shrink-0 text-sm font-medium text-warning-700 hover:underline"
            >
                View →
            </Link>
        </div>
    );
};

interface NeedsAttentionSectionProps {
    newLeads: Lead[] | undefined;
    pendingProperties: Property[] | undefined;
}

export const NeedsAttentionSection = ({ newLeads, pendingProperties }: NeedsAttentionSectionProps) => {
    const hasLeads = (newLeads?.length ?? 0) > 0;
    const hasProperties = (pendingProperties?.length ?? 0) > 0;

    if (!hasLeads && !hasProperties) return null;

    return (
        <section>
            <div className="overflow-hidden rounded-xl border border-warning-200 bg-warning-50">
                <div className="flex items-center gap-2 border-b border-warning-200 px-5 py-3.5">
                    <AlertCircle className="h-4 w-4 shrink-0 text-warning-600" />
                    <h2 className="text-sm font-semibold text-warning-700">Needs Attention</h2>
                </div>

                <div className="divide-y divide-warning-200/60 px-5">
                    {hasLeads && (
                        <div className="py-3">
                            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-warning-600">
                                {newLeads!.length} lead{newLeads!.length !== 1 ? "s" : ""} need follow-up
                            </p>
                            <div className="divide-y divide-warning-100">
                                {newLeads!.map((lead) => (
                                    <NeedsAttentionLeadRow key={lead._id} lead={lead} />
                                ))}
                            </div>
                        </div>
                    )}

                    {hasProperties && (
                        <div className="py-3">
                            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-warning-600">
                                {pendingProperties!.length} propert{pendingProperties!.length !== 1 ? "ies" : "y"} awaiting review
                            </p>
                            <div className="divide-y divide-warning-100">
                                {pendingProperties!.map((property) => (
                                    <NeedsAttentionPropertyRow key={property._id} property={property} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
