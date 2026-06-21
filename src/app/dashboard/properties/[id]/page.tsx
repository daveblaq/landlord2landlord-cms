"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    ArrowLeft,
    Edit01,
    MarkerPin02,
    Building02,
    ChevronLeft,
    ChevronRight,
} from "@untitledui/icons";

import { useProperty, type PropertyStatus } from "@/lib/api/properties";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { Carousel } from "@/components/application/carousel/carousel-base";
import { cx } from "@/utils/cx";

const statusConfig: Record<PropertyStatus, { label: string; color: "success" | "warning" | "error" | "gray" | "blue" | "brand" }> = {
    published: { label: "Published", color: "success" },
    draft: { label: "Draft", color: "gray" },
    "pending-review": { label: "Pending Review", color: "warning" },
    "under-offer": { label: "Under Offer", color: "blue" },
    sold: { label: "Sold", color: "error" },
    archived: { label: "Archived", color: "gray" },
};

const formatCurrency = (n: number) =>
    new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(n);

export default function ViewPropertyPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const { data: property, isLoading, isError } = useProperty(id);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    if (isLoading) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-500 border-t-transparent" />
                    <p className="text-sm text-tertiary">Loading property listing...</p>
                </div>
            </div>
        );
    }

    if (isError || !property) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-error-50 text-error-600">
                    <Building02 className="h-6 w-6" />
                </div>
                <h3 className="text-md font-semibold text-primary">Failed to load property</h3>
                <p className="mt-1 text-sm text-tertiary">The property listing could not be found or there was an error loading it.</p>
                <Button className="mt-5" color="secondary" size="md" onClick={() => router.push("/dashboard/properties")}>
                    Back to Properties
                </Button>
            </div>
        );
    }

    const activeImage = selectedImage || property.heroImage;
    const status = statusConfig[property.status] ?? { label: property.status, color: "gray" as const };

    return (
        <div className="flex-1 px-4 py-6 md:px-8 md:py-8 space-y-6">
                    {/* Top Action Bar */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-secondary pb-5">
                        <div className="flex flex-col gap-1">
                            <Button
                                color="link-gray"
                                size="sm"
                                iconLeading={ArrowLeft}
                                onClick={() => router.push("/dashboard/properties")}
                                className="w-max"
                            >
                                Back to Properties
                            </Button>
                            <div className="flex items-center gap-3 flex-wrap mt-2">
                                <h1 className="text-xl font-semibold text-primary lg:text-display-xs">
                                    {property.title}
                                </h1>
                                <Badge color={status.color} size="md" type="pill-color">
                                    {status.label}
                                </Badge>
                                {property.isFeatured && (
                                    <Badge color="brand" size="md" type="pill-color">
                                        Featured
                                    </Badge>
                                )}
                                {property.isHighYield && (
                                    <Badge color="warning" size="md" type="pill-color">
                                        Expert High Yield
                                    </Badge>
                                )}
                                {new Date().getTime() - new Date(property.createdAt).getTime() < 7 * 24 * 60 * 60 * 1000 && (
                                    <Badge color="success" size="md" type="pill-color">
                                        New Listing
                                    </Badge>
                                )}
                            </div>
                            <div className="flex items-center gap-1.5 text-sm text-tertiary">
                                <MarkerPin02 className="h-4 w-4 shrink-0 text-fg-quaternary" />
                                <span>{property.location}, {property.postcode}</span>
                            </div>
                        </div>

                        <Button
                            color="primary"
                            size="md"
                            iconLeading={Edit01}
                            onClick={() => router.push(`/dashboard/properties/${property._id}/edit`)}
                        >
                            Edit Listing
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        {/* Main Info Columns (Left & Center) */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Media Gallery Card */}
                            <div className="rounded-xl border border-secondary bg-primary p-5 shadow-xs space-y-4">
                                <h2 className="text-sm font-semibold text-primary uppercase tracking-wider">
                                    Listing Photos
                                </h2>

                                {property.gallery && property.gallery.length > 0 ? (
                                    <Carousel.Root className="w-full">
                                        <div className="relative aspect-video w-full">
                                            <Carousel.PrevTrigger className="absolute top-1/2 left-4 z-10 flex size-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-alpha-white/90 p-2 text-fg-secondary outline-focus-ring backdrop-blur-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:bg-disabled_subtle disabled:text-fg-disabled border border-secondary">
                                                <ChevronLeft className="size-5" />
                                            </Carousel.PrevTrigger>
                                            <Carousel.NextTrigger className="absolute top-1/2 right-4 z-10 flex size-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-alpha-white/90 p-2 text-fg-secondary outline-focus-ring backdrop-blur-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:bg-disabled_subtle disabled:text-fg-disabled border border-secondary">
                                                <ChevronRight className="size-5" />
                                            </Carousel.NextTrigger>

                                            <Carousel.Content className="h-full">
                                                {property.gallery.map((img: any, idx: number) => (
                                                    <Carousel.Item key={idx} className="overflow-hidden rounded-lg border border-secondary bg-secondary">
                                                        <img
                                                            src={img.url}
                                                            alt={img.alt || `Gallery ${idx + 1}`}
                                                            className="size-full object-cover"
                                                        />
                                                    </Carousel.Item>
                                                ))}
                                            </Carousel.Content>
                                        </div>

                                        {/* Horizontal Thumbnail Indicators */}
                                        <Carousel.IndicatorGroup className="grid grid-cols-3 gap-3 sm:grid-cols-6 mt-4">
                                            {({ index }) => {
                                                const img = property.gallery?.[index];
                                                if (!img) return null;
                                                return (
                                                    <Carousel.Indicator
                                                        key={index}
                                                        index={index}
                                                        className={({ isSelected }) =>
                                                            cx(
                                                                "relative aspect-video rounded-md overflow-hidden bg-secondary border transition-all duration-150 cursor-pointer",
                                                                isSelected
                                                                    ? "border-brand-500 ring-2 ring-brand-500/20"
                                                                    : "border-secondary hover:border-fg-quaternary"
                                                            )
                                                        }
                                                    >
                                                        <img
                                                            src={img.url}
                                                            alt={img.alt || `Thumbnail ${index + 1}`}
                                                            className="size-full object-cover pointer-events-none"
                                                        />
                                                    </Carousel.Indicator>
                                                );
                                            }}
                                        </Carousel.IndicatorGroup>
                                    </Carousel.Root>
                                ) : (
                                    <div className="aspect-video w-full overflow-hidden rounded-lg bg-secondary border border-secondary flex items-center justify-center">
                                        {property.heroImage ? (
                                            <img
                                                src={property.heroImage}
                                                alt={property.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <Building02 className="h-12 w-12 text-fg-quaternary" />
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Property Details Card */}
                            <div className="rounded-xl border border-secondary bg-primary p-5 shadow-xs space-y-5">
                                <h2 className="text-md font-semibold text-primary border-b border-secondary pb-3">
                                    Property Details
                                </h2>

                                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                                    <div className="flex flex-col gap-1 rounded-lg bg-secondary p-3">
                                        <span className="text-xs text-tertiary uppercase tracking-wider">Property Type</span>
                                        <span className="text-sm font-semibold text-primary capitalize">{property.propertyType}</span>
                                    </div>
                                    <div className="flex flex-col gap-1 rounded-lg bg-secondary p-3">
                                        <span className="text-xs text-tertiary uppercase tracking-wider">Bedrooms</span>
                                        <span className="text-sm font-semibold text-primary flex items-center gap-1.5">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-fg-quaternary"><path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8"/><path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"/><path d="M12 4v6"/><path d="M4 18h16"/><path d="M6 10h4a1 1 0 0 1 1 1v3H5v-3a1 1 0 0 1 1-1Z"/><path d="M14 10h4a1 1 0 0 1 1 1v3h-6v-3a1 1 0 0 1 1-1Z"/></svg>
                                            {property.bedrooms} Bed
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-1 rounded-lg bg-secondary p-3">
                                        <span className="text-xs text-tertiary uppercase tracking-wider">Bathrooms</span>
                                        <span className="text-sm font-semibold text-primary flex items-center gap-1.5">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-fg-quaternary"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.6 3 4 3.6 4 4.5V14a8 8 0 0 0 8 8h4a8 8 0 0 0 8-8v-2a1 1 0 0 0-1-1H4"/><path d="M14 12v.01"/><path d="M17 12v.01"/><path d="M14 16v.01"/><path d="M17 16v.01"/></svg>
                                            {property.bathrooms} Bath
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-1 rounded-lg bg-secondary p-3">
                                        <span className="text-xs text-tertiary uppercase tracking-wider">Tenure</span>
                                        <span className="text-sm font-semibold text-primary capitalize">{property.tenure.replace(/-/g, " ")}</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-sm font-semibold text-primary">Description</h3>
                                    <p className="text-sm text-tertiary whitespace-pre-wrap leading-relaxed">
                                        {property.description}
                                    </p>
                                </div>
                            </div>

                            {/* Tenancy Information Card */}
                            <div className="rounded-xl border border-secondary bg-primary p-5 shadow-xs space-y-5">
                                <h2 className="text-md font-semibold text-primary border-b border-secondary pb-3">
                                    Tenancy Status
                                </h2>

                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-tertiary">Current occupancy:</span>
                                    <Badge color={property.tenented ? "success" : "gray"} size="md" type="pill-color">
                                        {property.tenented ? "Tenanted" : "Vacant"}
                                    </Badge>
                                </div>

                                {property.tenented && (
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div className="space-y-1">
                                            <span className="block text-xs font-semibold text-tertiary uppercase tracking-wider">Tenancy Status Details</span>
                                            <span className="text-sm text-primary">{property.tenancyStatus || "N/A"}</span>
                                        </div>

                                        <div className="space-y-1">
                                            <span className="block text-xs font-semibold text-tertiary uppercase tracking-wider">Tenant Move-in Date</span>
                                            <span className="text-sm text-primary">
                                                {property.tenantMoveInDate ? new Date(property.tenantMoveInDate).toLocaleDateString("en-GB", {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric"
                                                }) : "N/A"}
                                            </span>
                                        </div>

                                        <div className="space-y-1">
                                            <span className="block text-xs font-semibold text-tertiary uppercase tracking-wider">Contract Type</span>
                                            <span className="text-sm text-primary capitalize">{property.contractType || "N/A"}</span>
                                        </div>

                                        <div className="space-y-1">
                                            <span className="block text-xs font-semibold text-tertiary uppercase tracking-wider">Rent Collection</span>
                                            <span className="text-sm text-primary capitalize">{property.rentCollectionStatus?.replace(/-/g, " ") || "N/A"}</span>
                                        </div>

                                        <div className="space-y-1">
                                            <span className="block text-xs font-semibold text-tertiary uppercase tracking-wider">Arrears Status</span>
                                            <span className="text-sm text-primary capitalize">{property.arrearsStatus?.replace(/-/g, " ") || "N/A"}</span>
                                        </div>

                                        {property.tenancyNotes && (
                                            <div className="sm:col-span-2 space-y-1">
                                                <span className="block text-xs font-semibold text-tertiary uppercase tracking-wider">Tenancy Notes</span>
                                                <p className="text-sm text-tertiary bg-secondary p-3 rounded-lg border border-secondary leading-relaxed">
                                                    {property.tenancyNotes}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Financial Info & Side Info (Right Column) */}
                        <div className="space-y-6">
                            {/* Financial Summary Card */}
                            <div className="rounded-xl border border-secondary bg-primary p-5 shadow-xs space-y-5">
                                <h3 className="text-sm font-semibold text-primary uppercase tracking-wider border-b border-secondary pb-3">
                                    Financials
                                </h3>

                                <div className="space-y-4">
                                    <div>
                                        <span className="text-xs text-tertiary uppercase tracking-wider block">Asking Price</span>
                                        <span className="text-xl font-bold text-primary">
                                            {formatCurrency(property.investmentMetrics?.askingPrice ?? 0)}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <span className="text-xs text-tertiary uppercase tracking-wider block">Monthly Rent</span>
                                            <span className="text-md font-semibold text-primary">
                                                {formatCurrency(property.investmentMetrics?.monthlyRent ?? 0)}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-xs text-tertiary uppercase tracking-wider block">Annual Rent</span>
                                            <span className="text-md font-semibold text-primary">
                                                {formatCurrency(property.investmentMetrics?.annualRent || (property.investmentMetrics?.monthlyRent ? property.investmentMetrics.monthlyRent * 12 : 0))}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="rounded-lg bg-brand-500/10 border border-brand-500/20 p-3 flex justify-between items-center">
                                        <span className="text-xs font-semibold text-brand-700 uppercase tracking-wider">Gross Yield</span>
                                        <span className="text-lg font-bold text-brand-700">
                                            {(property.investmentMetrics?.grossYield ?? 0).toFixed(2)}%
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Listing Metadata */}
                            <div className="rounded-xl border border-secondary bg-primary p-5 shadow-xs space-y-5">
                                <h3 className="text-sm font-semibold text-primary uppercase tracking-wider border-b border-secondary pb-3">
                                    Listing Settings & Specs
                                </h3>

                                <div className="space-y-3">
                                    <div className="flex justify-between items-center py-1 border-b border-secondary">
                                        <span className="text-sm text-tertiary">EPC Rating</span>
                                        <span className="text-sm font-semibold text-primary uppercase">{property.epc || "N/A"}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-1 border-b border-secondary">
                                        <span className="text-sm text-tertiary">Council Tax Band</span>
                                        <span className="text-sm font-semibold text-primary uppercase">{property.councilTaxBand || "N/A"}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-1 border-b border-secondary">
                                        <span className="text-sm text-tertiary">Annual Service Charge</span>
                                        <span className="text-sm font-semibold text-primary">{property.serviceCharge ? formatCurrency(property.serviceCharge) : "£0"}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-1 border-b border-secondary">
                                        <span className="text-sm text-tertiary">Annual Ground Rent</span>
                                        <span className="text-sm font-semibold text-primary">{property.groundRent ? formatCurrency(property.groundRent) : "£0"}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-1 border-b border-secondary">
                                        <span className="text-sm text-tertiary">Lease Years Remaining</span>
                                        <span className="text-sm font-semibold text-primary">{property.investmentMetrics?.leaseYearsRemaining ?? "N/A"} yrs</span>
                                    </div>
                                    <div className="flex justify-between items-center py-1 border-b border-secondary">
                                        <span className="text-sm text-tertiary">Feature on Homepage</span>
                                        <span className="text-sm font-semibold text-primary">{property.displayOnHomepage ? "Yes" : "No"}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-1">
                                        <span className="text-sm text-tertiary">Created At</span>
                                        <span className="text-sm text-tertiary">{new Date(property.createdAt).toLocaleDateString("en-GB")}</span>
                                    </div>
                                 </div>
                            </div>
                        </div>
                    </div>
            </div>
    );
}
