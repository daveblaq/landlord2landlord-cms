"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
    ArrowLeft,
    Save01,
    Trash01,
    Plus,
    Building02,
} from "@untitledui/icons";
import { useProperty, useUpdateProperty, useUploadPropertyImages, type Property, lookupEpcRating } from "@/lib/api/properties";
import { Input } from "@/components/base/input/input";
import { Label } from "@/components/base/input/label";
import { HintText } from "@/components/base/input/hint-text";
import { Select } from "@/components/base/select/select";
import { TextArea } from "@/components/base/textarea/textarea";
import { Toggle } from "@/components/base/toggle/toggle";
import { DatePicker } from "@/components/application/date-picker/date-picker";
import { parseDate } from "@internationalized/date";
import { Button } from "@/components/base/buttons/button";
import { IconNotification } from "@/components/application/notifications/notifications";
import { searchPlaces, getPlaceDetails, type PlaceSuggestion } from "@/lib/utils/google-places";

const EPC_COLORS = { A: "#008054", B: "#19b459", C: "#8dce46", D: "#ffd500", E: "#fcaa65", F: "#ef8023", G: "#e9153b" };

const COMPLIANCE_DOCS = [
    { key: "epc", label: "EPC Certificate", leaseholdOnly: false },
];

const complianceDocSchema = yup.object().shape({
    available: yup.boolean().default(false),
    url: yup.string().nullable().optional(),
}).optional();

const propertySchema = yup.object().shape({
    title: yup
        .string()
        .required("Title is required")
        .min(10, "Title must be at least 10 characters")
        .max(100, "Title must be at most 100 characters"),
    description: yup.string().required("Description is required"),
    propertyType: yup
        .string()
        .oneOf(["flat", "terraced", "semi-detached", "detached", "maisonette", "bungalow"], "Select a valid property type")
        .required("Property type is required"),
    bedrooms: yup.number().typeError("Bedrooms must be a number").min(0).required("Bedrooms is required"),
    bathrooms: yup.number().typeError("Bathrooms must be a number").min(0).required("Bathrooms is required"),
    address: yup.string().required("Full address is required"),
    location: yup.string().required("Location is required"),
    postcode: yup
        .string()
        .required("Postcode is required")
        .matches(/^[A-Z]{1,2}[0-9R][0-9A-Z]?$/i, "Please enter a valid UK postcode outcode (e.g., M5, LS1, SW1A)"),
    sqft: yup.number().typeError("Floor area must be a number").positive().required("Floor area is required"),
    tenure: yup.string().oneOf(["freehold", "leasehold", "share-of-freehold"]).required("Tenure is required"),
    heroImage: yup.string().optional(),
    askingPrice: yup.number().typeError("Asking price must be a number").positive().required("Asking price is required"),
    monthlyRent: yup.number().typeError("Monthly rent must be a number").positive().required("Monthly rent is required"),
    priceType: yup.string().oneOf(["guide-price", "fixed-price", "offers-over"]).nullable().optional(),
    leaseYearsRemaining: yup
        .number()
        .typeError("Must be a number")
        .min(0)
        .nullable()
        .transform((v, o) => o === "" ? null : v)
        .optional(),
    serviceCharge: yup
        .number()
        .typeError("Service charge must be a number")
        .min(0, "Service charge cannot be negative")
        .nullable()
        .transform((v, o) => o === "" ? null : v)
        .when("tenure", {
            is: (val: string) => val === "leasehold" || val === "share-of-freehold",
            then: (schema) => schema.required("Service charge is required for leasehold properties"),
            otherwise: (schema) => schema.optional(),
        }),
    groundRent: yup
        .number()
        .typeError("Must be a number")
        .min(0)
        .nullable()
        .transform((v, o) => o === "" ? null : v)
        .optional(),
    insuranceCostMonthly: yup
        .number()
        .typeError("Must be a number")
        .min(0)
        .nullable()
        .transform((v, o) => o === "" ? null : v)
        .optional(),
    councilTaxBand: yup
        .string()
        .oneOf(["A", "B", "C", "D", "E", "F", "G", "H"])
        .nullable()
        .transform((v, o) => o === "" ? null : v)
        .optional(),
    tenented: yup.boolean().default(true),
    tenancyStartDate: yup.string().nullable().transform((v, o) => o === "" ? null : v).optional(),
    tenancyType: yup
        .string()
        .oneOf(["ast", "non-ast", "company-let", "license"])
        .nullable()
        .transform((v, o) => o === "" ? null : v)
        .optional(),
    fixedTermEndDate: yup.string().nullable().transform((v, o) => o === "" ? null : v).optional(),
    rentPaymentStatus: yup
        .string()
        .oneOf(["up-to-date", "partially-paid", "overdue"])
        .nullable()
        .transform((v, o) => o === "" ? null : v)
        .optional(),
    rentCollectionStatus: yup
        .string()
        .oneOf(["agent-managed", "direct-to-landlord", "guaranteed"])
        .nullable()
        .transform((v, o) => o === "" ? null : v)
        .optional(),
    arrearsStatus: yup
        .string()
        .oneOf(["no-arrears", "historical-resolved", "active-arrears"])
        .default("no-arrears"),
    depositProtected: yup.boolean().nullable().optional(),
    noticeServed: yup.boolean().nullable().optional(),
    tenantWantsToStay: yup
        .string()
        .oneOf(["yes", "no", "unknown"])
        .nullable()
        .transform((v, o) => o === "" ? null : v)
        .optional(),
    viewingArrangements: yup
        .string()
        .oneOf(["vacant-access", "accompanied", "tenant-notify-24h", "tenant-notify-48h"])
        .nullable()
        .transform((v, o) => o === "" ? null : v)
        .optional(),
    rentReviewDate: yup.string().nullable().transform((v, o) => o === "" ? null : v).optional(),
    tenancyNotes: yup.string().nullable().transform((v, o) => o === "" ? null : v).optional(),
    epc: yup.string().nullable().transform((v, o) => o === "" ? null : v).optional(),
    potentialEpc: yup.string().nullable().transform((v, o) => o === "" ? null : v).optional(),
    compliance: yup.object().shape({
        epc: complianceDocSchema,
    }).optional(),
    displayOnHomepage: yup.boolean().default(false),
    isFeatured: yup.boolean().default(false),
    isHighYield: yup.boolean().default(false),
    status: yup.string().oneOf(["draft", "pending-review", "published", "under-offer", "sold", "archived"]).default("draft"),
    latitude: yup.number().nullable().optional(),
    longitude: yup.number().nullable().optional(),
});

interface ImageStateItem {
    type: "existing" | "new";
    url?: string;
    alt?: string;
    file?: File;
    preview?: string;
}

const defaultComplianceDoc = { available: false, url: "" };

export default function EditPropertyPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const { data: property, isError } = useProperty(id, { staleTime: Infinity });
    const formInitialized = React.useRef(false);
    const updatePropertyMutation = useUpdateProperty();
    const uploadImagesMutation = useUploadPropertyImages();

    // Photos
    const [images, setImages] = useState<ImageStateItem[]>([]);
    // Floorplans
    const [floorplans, setFloorplans] = useState<ImageStateItem[]>([]);
    // Marketing docs
    const [docFiles, setDocFiles] = useState<ImageStateItem[]>([]);
    // Compliance doc files (one per doc type)
    const [complianceFiles, setComplianceFiles] = useState<Record<string, File | null>>({});

    const [isUploading, setIsUploading] = useState(false);

    // Google Places autocomplete
    const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
    const searchTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) setSuggestions([]);
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const fetchSuggestions = async (query: any) => {
        const queryString = typeof query === "string" ? query : (query?.target?.value ?? "");
        if (!queryString || queryString.trim().length < 3) { setSuggestions([]); return; }
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
        if (!apiKey) return;
        try {
            const results = await searchPlaces(queryString, apiKey);
            setSuggestions(results);
        } catch {
            setSuggestions([]);
        }
    };

    const handleSuggestionSelect = async (item: PlaceSuggestion) => {
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
        setSuggestions([]);
        if (!apiKey) return;
        const resolved = await getPlaceDetails(item.placeId, apiKey);
        if (!resolved) return;
        setValue("address", resolved.address || resolved.displayName, { shouldDirty: true, shouldValidate: true });
        if (resolved.city) setValue("location", resolved.city, { shouldDirty: true, shouldValidate: true });
        if (resolved.postcode) {
            const outcode = resolved.postcode.trim().split(/\s+/)[0];
            setValue("postcode", outcode, { shouldDirty: true, shouldValidate: true });
            lookupEpcRating(resolved.postcode, resolved.displayName).then((res) => {
                if (res && (res.rating || res.potentialRating)) {
                    if (res.rating) setValue("epc", res.rating, { shouldDirty: true, shouldValidate: true });
                    if (res.potentialRating) setValue("potentialEpc", res.potentialRating, { shouldDirty: true, shouldValidate: true });
                } else {
                    toast.custom((t) => (
                        <IconNotification
                            title="No EPC Data Found"
                            description="No energy performance certificate was found for this address. You can enter the EPC rating manually if available."
                            color="warning"
                            onClose={() => toast.dismiss(t)}
                        />
                    ));
                }
            });
        }
        if (resolved.latitude != null) setValue("latitude", resolved.latitude, { shouldDirty: true });
        if (resolved.longitude != null) setValue("longitude", resolved.longitude, { shouldDirty: true });
    };

    const {
        control,
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: { isSubmitting },
    } = useForm({
        resolver: yupResolver(propertySchema),
        defaultValues: {
            title: "",
            description: "",
            propertyType: "flat",
            bedrooms: 1,
            bathrooms: 1,
            address: "",
            location: "",
            postcode: "",
            sqft: 0,
            tenure: "freehold",
            heroImage: "",
            askingPrice: 0,
            monthlyRent: 0,
            priceType: null,
            leaseYearsRemaining: null,
            serviceCharge: null,
            groundRent: null,
            insuranceCostMonthly: null,
            councilTaxBand: null,
            tenented: true,
            tenancyStartDate: "",
            tenancyType: null,
            fixedTermEndDate: "",
            rentPaymentStatus: null,
            rentCollectionStatus: null,
            arrearsStatus: "no-arrears",
            depositProtected: null,
            noticeServed: null,
            tenantWantsToStay: null,
            viewingArrangements: null,
            rentReviewDate: "",
            tenancyNotes: "",
            epc: "none",
            potentialEpc: "none",
            compliance: {
                epc: defaultComplianceDoc,
            },
            displayOnHomepage: false,
            isFeatured: false,
            isHighYield: false,
            status: "draft",
            latitude: null,
            longitude: null,
        },
    });

    const isTenented = watch("tenented");
    const tenure = watch("tenure");
    const isLeasehold = tenure === "leasehold" || tenure === "share-of-freehold";
    const askingPrice = watch("askingPrice") as number;
    const monthlyRent = watch("monthlyRent") as number;
    const annualRent = monthlyRent > 0 ? monthlyRent * 12 : null;
    const grossYield = annualRent && askingPrice > 0 ? ((annualRent / askingPrice) * 100) : null;

    const annualInsuranceCost = watch("insuranceCostMonthly") as number | null;
    const netYield = (() => {
        if (!annualRent || !askingPrice || annualInsuranceCost === null) return null;
        return ((annualRent - (annualInsuranceCost ?? 0)) / askingPrice) * 100;
    })();

    const complianceValues = watch("compliance") as any;
    const docsRecorded = complianceValues
        ? COMPLIANCE_DOCS.filter(d => complianceValues[d.key]?.available).length
        : 0;

    useEffect(() => {
        if (property && !formInitialized.current) {
            formInitialized.current = true;
            reset({
                title: property.title || "",
                description: property.description || "",
                propertyType: (property.propertyType as any) || "flat",
                bedrooms: property.bedrooms || 1,
                bathrooms: property.bathrooms || 1,
                address: property.address || "",
                location: property.location || "",
                postcode: property.postcode || "",
                sqft: property.sqft || 0,
                tenure: (property.tenure as any) || "freehold",
                heroImage: property.heroImage || "",
                askingPrice: property.investmentMetrics?.askingPrice || 0,
                monthlyRent: property.investmentMetrics?.monthlyRent || 0,
                priceType: (property as any).priceType ?? null,
                leaseYearsRemaining: property.investmentMetrics?.leaseYearsRemaining ?? null,
                serviceCharge: property.serviceCharge || 0,
                groundRent: property.groundRent || 0,
                insuranceCostMonthly: (property as any).insuranceCostMonthly ?? null,
                councilTaxBand: (property.councilTaxBand as any) ?? null,
                tenented: property.tenented ?? true,
                tenancyStartDate: property.tenancyStartDate ? property.tenancyStartDate.split("T")[0] : "",
                tenancyType: (property.tenancyType as any) ?? null,
                fixedTermEndDate: (property as any).fixedTermEndDate ? (property as any).fixedTermEndDate.split("T")[0] : "",
                rentPaymentStatus: (property as any).rentPaymentStatus ?? null,
                rentCollectionStatus: (property.rentCollectionStatus as any) ?? null,
                arrearsStatus: (property.arrearsStatus as any) || "no-arrears",
                depositProtected: (property as any).depositProtected ?? null,
                noticeServed: (property as any).noticeServed ?? null,
                tenantWantsToStay: (property as any).tenantWantsToStay ?? null,
                viewingArrangements: (property as any).viewingArrangements ?? null,
                rentReviewDate: (property as any).rentReviewDate ? (property as any).rentReviewDate.split("T")[0] : "",
                tenancyNotes: property.tenancyNotes || "",
                epc: property.epc || "none",
                potentialEpc: property.potentialEpc || "none",
                compliance: (property as any).compliance ?? {
                    epc: defaultComplianceDoc,
                },
                displayOnHomepage: property.displayOnHomepage ?? false,
                isFeatured: property.isFeatured ?? false,
                isHighYield: (property as any).isHighYield ?? false,
                status: (property.status as any) || "draft",
                latitude: property.latitude ?? null,
                longitude: property.longitude ?? null,
            });

            if (property.gallery && property.gallery.length > 0) {
                setImages(property.gallery.map((img: any) => ({
                    type: "existing",
                    url: typeof img === "string" ? img : img.url || "",
                    alt: typeof img === "string" ? "" : img.alt || ""
                })));
            } else if (property.heroImage) {
                setImages([{ type: "existing", url: property.heroImage, alt: "Cover" }]);
            }

            if ((property as any).floorplans?.length > 0) {
                setFloorplans((property as any).floorplans.map((img: any) => ({
                    type: "existing",
                    url: typeof img === "string" ? img : img.url || "",
                    alt: typeof img === "string" ? "" : img.alt || ""
                })));
            }

            if ((property as any).mediaFiles?.length > 0) {
                setDocFiles((property as any).mediaFiles.map((img: any) => ({
                    type: "existing",
                    url: typeof img === "string" ? img : img.url || "",
                    alt: typeof img === "string" ? "" : img.alt || ""
                })));
            }
        }
    }, [property, reset]);

    const fileToBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newItems = Array.from(e.target.files).slice(0, 8 - images.length).map((file) => ({
                type: "new" as const, file, preview: URL.createObjectURL(file),
            }));
            setImages((prev) => [...prev, ...newItems].slice(0, 8));
        }
    };
    const removeImage = (index: number) => setImages((prev) => prev.filter((_, i) => i !== index));

    const handleFloorplanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newItems = Array.from(e.target.files).slice(0, 3 - floorplans.length).map((file) => ({
                type: "new" as const, file, preview: URL.createObjectURL(file),
            }));
            setFloorplans((prev) => [...prev, ...newItems].slice(0, 3));
        }
    };
    const removeFloorplan = (index: number) => setFloorplans((prev) => prev.filter((_, i) => i !== index));

    const handleDocFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newItems = Array.from(e.target.files).slice(0, 5 - docFiles.length).map((file) => ({
                type: "new" as const, file, preview: URL.createObjectURL(file),
            }));
            setDocFiles((prev) => [...prev, ...newItems].slice(0, 5));
        }
    };
    const removeDocFile = (index: number) => setDocFiles((prev) => prev.filter((_, i) => i !== index));

    const uploadNewItems = async (items: ImageStateItem[]): Promise<string[]> => {
        const newItems = items.filter((img) => img.type === "new" && img.file);
        if (newItems.length === 0) return [];
        const base64s = await Promise.all(newItems.map((img) => fileToBase64(img.file!)));
        return uploadImagesMutation.mutateAsync(base64s);
    };

    const buildFinalUrls = (items: ImageStateItem[], newUrls: string[]): string[] => {
        let idx = 0;
        return items.map((item) => {
            if (item.type === "existing") return item.url!;
            return newUrls[idx++];
        }).filter(Boolean);
    };
    const handleComplianceFileChange = (docKey: string, file: File | null) => {
        setComplianceFiles(prev => ({ ...prev, [docKey]: file }));
        if (file) setValue(`compliance.${docKey}.url` as any, "", { shouldDirty: true });
    };

    const onSubmit = async (formData: any) => {
        if (images.length === 0) {
            toast.custom((t) => (
                <IconNotification title="Images Required" description="Please keep or add at least 1 photo for the property listing." color="error" onClose={() => toast.dismiss(t)} />
            ));
            return;
        }

        setIsUploading(true);

        try {
            const [newPhotoUrls, newFloorplanUrls, newDocFileUrls] = await Promise.all([
                uploadNewItems(images),
                uploadNewItems(floorplans),
                uploadNewItems(docFiles),
            ]);

            const finalPhotoUrls = buildFinalUrls(images, newPhotoUrls);
            const finalFloorplanUrls = buildFinalUrls(floorplans, newFloorplanUrls);
            const finalDocFileUrls = buildFinalUrls(docFiles, newDocFileUrls);

            // Upload compliance doc files
            const complianceFileUrls: Record<string, string> = {};
            for (const [docKey, file] of Object.entries(complianceFiles)) {
                if (file) {
                    const base64 = await fileToBase64(file);
                    const [url] = await uploadImagesMutation.mutateAsync([base64]);
                    complianceFileUrls[docKey] = url;
                }
            }

            const propertyData = {
                title: formData.title,
                description: formData.description,
                propertyType: formData.propertyType,
                bedrooms: Number(formData.bedrooms),
                bathrooms: Number(formData.bathrooms),
                sqft: Number(formData.sqft),
                address: formData.address,
                location: formData.location,
                postcode: formData.postcode,
                tenure: formData.tenure,
                heroImage: finalPhotoUrls[0] || "",
                gallery: finalPhotoUrls.map((url, i) => ({ url, alt: `Property View ${i + 1}` })),
                floorplans: finalFloorplanUrls.map((url, i) => ({ url, alt: `Floorplan ${i + 1}` })),
                mediaFiles: finalDocFileUrls.map((url, i) => ({ url, alt: `Document ${i + 1}` })),
                investmentMetrics: {
                    askingPrice: Number(formData.askingPrice),
                    monthlyRent: Number(formData.monthlyRent),
                    annualRent: Number(formData.monthlyRent) * 12,
                    grossYield: Number(formData.askingPrice) > 0
                        ? parseFloat(((Number(formData.monthlyRent) * 12 / Number(formData.askingPrice)) * 100).toFixed(2))
                        : 0,
                    leaseYearsRemaining: formData.leaseYearsRemaining ? Number(formData.leaseYearsRemaining) : undefined,
                },
                priceType: formData.priceType || undefined,
                serviceCharge: isLeasehold ? (formData.serviceCharge ? Number(formData.serviceCharge) : 0) : undefined,
                groundRent: isLeasehold ? (formData.groundRent ? Number(formData.groundRent) : 0) : undefined,
                insuranceCostMonthly: formData.insuranceCostMonthly !== null && formData.insuranceCostMonthly !== undefined ? Number(formData.insuranceCostMonthly) : undefined,
                councilTaxBand: formData.councilTaxBand || undefined,
                tenented: formData.tenented,
                tenancyStartDate: formData.tenented && formData.tenancyStartDate ? formData.tenancyStartDate : undefined,
                tenancyType: formData.tenented ? (formData.tenancyType || undefined) : undefined,
                fixedTermEndDate: formData.tenented && formData.fixedTermEndDate ? formData.fixedTermEndDate : undefined,
                rentPaymentStatus: formData.tenented ? (formData.rentPaymentStatus || undefined) : undefined,
                rentCollectionStatus: formData.tenented ? (formData.rentCollectionStatus || undefined) : undefined,
                arrearsStatus: formData.tenented ? (formData.arrearsStatus || "no-arrears") : "no-arrears",
                depositProtected: formData.tenented ? (formData.depositProtected ?? undefined) : undefined,
                noticeServed: formData.tenented ? (formData.noticeServed ?? undefined) : undefined,
                tenantWantsToStay: formData.tenented ? (formData.tenantWantsToStay || undefined) : undefined,
                viewingArrangements: formData.tenented ? (formData.viewingArrangements || undefined) : undefined,
                rentReviewDate: formData.tenented && formData.rentReviewDate ? formData.rentReviewDate : undefined,
                tenancyNotes: formData.tenented ? (formData.tenancyNotes || undefined) : undefined,
                epc: formData.epc && formData.epc !== "none" ? formData.epc : undefined,
                potentialEpc: formData.potentialEpc && formData.potentialEpc !== "none" ? formData.potentialEpc : undefined,
                compliance: formData.compliance
                    ? Object.fromEntries(
                        Object.entries(formData.compliance).map(([key, val]: [string, any]) => [
                            key,
                            { ...val, url: complianceFileUrls[key] || val?.url || undefined },
                        ])
                    )
                    : undefined,
                displayOnHomepage: formData.displayOnHomepage,
                isFeatured: formData.isFeatured,
                isHighYield: formData.isHighYield,
                status: formData.status,
                latitude: formData.latitude ? Number(formData.latitude) : undefined,
                longitude: formData.longitude ? Number(formData.longitude) : undefined,
            };

            updatePropertyMutation.mutate({ id, data: propertyData as any }, {
                onSuccess: () => {
                    setIsUploading(false);
                    toast.custom((t) => (
                        <IconNotification title="Listing Updated" description="The property listing has been updated successfully." color="success" onClose={() => toast.dismiss(t)} />
                    ));
                    router.push("/dashboard/properties");
                },
                onError: (error: any) => {
                    setIsUploading(false);
                    const errorMessage = error.response?.data?.message || error.message || "Failed to update property listing.";
                    toast.custom((t) => (
                        <IconNotification title="Error Updating Listing" description={errorMessage} color="error" onClose={() => toast.dismiss(t)} />
                    ));
                },
            });
        } catch (error: any) {
            setIsUploading(false);
            const errorMessage = error.response?.data?.message || error.message || "Failed to upload files. Please try again.";
            toast.custom((t) => (
                <IconNotification title="Upload Failed" description={errorMessage} color="error" onClose={() => toast.dismiss(t)} />
            ));
        }
    };

    if (!property && !isError) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-500 border-t-transparent" />
                    <p className="text-sm text-tertiary">Loading property details...</p>
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
                <Button className="mt-5" color="secondary" size="md" onClick={() => router.push("/dashboard/properties")}>Back to Properties</Button>
            </div>
        );
    }

    const isPending = isSubmitting || isUploading;

    return (
        <div className="px-4 py-6 md:px-8 md:py-8 space-y-6">
            {/* Page Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-secondary pb-5">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Button color="link-gray" size="sm" iconLeading={ArrowLeft} onClick={() => router.push(`/dashboard/properties/${id}`)}>
                            Back to View
                        </Button>
                    </div>
                    <h1 className="text-xl font-semibold text-primary lg:text-display-xs">Edit Property Listing</h1>
                    <p className="mt-1 text-sm text-tertiary">Modify details for {property.title}</p>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Card 1: Property Details */}
                    <div className="rounded-xl border border-secondary bg-primary p-5 shadow-xs space-y-5">
                        <h2 className="text-md font-semibold text-primary border-b border-secondary pb-3">Property Details</h2>

                        <Controller
                            name="title"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <Input {...field} label="Property Title" placeholder="e.g. Tenanted 2-bed flat generating 6.8% yield in Manchester" isInvalid={!!error} hint={error?.message} />
                            )}
                        />

                        <Controller
                            name="description"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <div className="overflow-hidden rounded-lg">
                                    <TextArea {...field} label="Description" placeholder="Describe the investment opportunity, area, tenancy, and why this property stands out for investors..." rows={5} isInvalid={!!error} hint={error?.message} />
                                </div>
                            )}
                        />

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <Controller
                                name="propertyType"
                                control={control}
                                render={({ field: { value, onChange }, fieldState: { error } }) => (
                                    <Select label="Property Type" placeholder="Select type..." selectedKey={value} onSelectionChange={onChange} isInvalid={!!error} hint={error?.message} items={[
                                        { id: "flat", label: "Flat" },
                                        { id: "terraced", label: "Terraced" },
                                        { id: "semi-detached", label: "Semi-Detached" },
                                        { id: "detached", label: "Detached" },
                                        { id: "maisonette", label: "Maisonette" },
                                        { id: "bungalow", label: "Bungalow" },
                                    ]}>
                                        {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                    </Select>
                                )}
                            />
                            <Controller
                                name="bedrooms"
                                control={control}
                                render={({ field: { value, onChange, ...rest }, fieldState: { error } }) => (
                                    <Input {...rest} value={String(value)} onChange={(val) => { const n = parseFloat(val); onChange(isNaN(n) ? 0 : n); }} label="Bedrooms" placeholder="1" isInvalid={!!error} hint={error?.message} />
                                )}
                            />
                            <Controller
                                name="bathrooms"
                                control={control}
                                render={({ field: { value, onChange, ...rest }, fieldState: { error } }) => (
                                    <Input {...rest} value={String(value)} onChange={(val) => { const n = parseFloat(val); onChange(isNaN(n) ? 0 : n); }} label="Bathrooms" placeholder="1" isInvalid={!!error} hint={error?.message} />
                                )}
                            />
                        </div>

                        <Controller
                            name="address"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <div ref={containerRef} className="relative w-full">
                                    <Input
                                        {...field}
                                        label="Full Address"
                                        placeholder="e.g. 14 Oakfield Road, Manchester"
                                        isInvalid={!!error}
                                        hint={error?.message}
                                        onChange={(val) => {
                                            field.onChange(val);
                                            if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
                                            searchTimeoutRef.current = setTimeout(() => fetchSuggestions(val), 500);
                                        }}
                                    />
                                    {suggestions.length > 0 && (
                                        <div className="absolute left-0 right-0 mt-1 bg-primary border border-secondary shadow-lg z-50 w-full rounded-xl max-h-60 overflow-y-auto divide-y divide-secondary">
                                            {suggestions.map((item, idx) => (
                                                <button key={`${item.placeId || idx}-${idx}`} type="button" className="w-full text-left px-4 py-3 text-sm text-primary hover:bg-secondary transition-colors duration-150 focus:outline-hidden focus:bg-secondary" onClick={() => handleSuggestionSelect(item)}>
                                                    {item.displayName}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        />

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <div className="sm:col-span-2">
                                <Controller
                                    name="location"
                                    control={control}
                                    render={({ field, fieldState: { error } }) => (
                                        <Input {...field} label="Location (City / Area)" placeholder="e.g. Manchester, Liverpool" isInvalid={!!error} hint={error?.message} />
                                    )}
                                />
                            </div>
                            <Controller
                                name="postcode"
                                control={control}
                                render={({ field, fieldState: { error } }) => (
                                    <Input {...field} label="UK Postcode Outcode" placeholder="e.g. SW1A, M5" isInvalid={!!error} hint={error?.message} />
                                )}
                            />
                        </div>

                        <Controller
                            name="sqft"
                            control={control}
                            render={({ field: { value, onChange, ...rest }, fieldState: { error } }) => (
                                <Input {...rest} value={value === 0 ? "" : String(value)} onChange={(val) => onChange(val === "" ? 0 : Number(val))} type="number" label="Floor Area (sqft)" placeholder="e.g. 850" isInvalid={!!error} hint={error?.message} />
                            )}
                        />
                    </div>

                    {/* Card 2: Deal Summary */}
                    <div className="rounded-xl border border-secondary bg-primary p-5 shadow-xs space-y-5">
                        <h2 className="text-md font-semibold text-primary border-b border-secondary pb-3">Deal Summary</h2>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <Controller
                                name="askingPrice"
                                control={control}
                                render={({ field: { value, onChange, ...rest }, fieldState: { error } }) => (
                                    <Input {...rest} value={value === 0 ? "" : String(value)} onChange={(val) => onChange(val === "" ? 0 : Number(val))} type="number" label="Asking Price (£)" placeholder="350000" isInvalid={!!error} hint={error?.message} />
                                )}
                            />
                            <Controller
                                name="monthlyRent"
                                control={control}
                                render={({ field: { value, onChange, ...rest }, fieldState: { error } }) => (
                                    <Input {...rest} value={value === 0 ? "" : String(value)} onChange={(val) => onChange(val === "" ? 0 : Number(val))} type="number" label="Monthly Rent (£)" placeholder="1800" isInvalid={!!error} hint={error?.message} />
                                )}
                            />
                            <Controller
                                name="priceType"
                                control={control}
                                render={({ field: { value, onChange }, fieldState: { error } }) => (
                                    <Select label="Price Type" placeholder="Guide / Fixed..." selectedKey={value ?? ""} onSelectionChange={(key) => onChange(key === "" ? null : key)} isInvalid={!!error} hint={error?.message} items={[
                                        { id: "guide-price", label: "Guide Price" },
                                        { id: "fixed-price", label: "Fixed Price" },
                                        { id: "offers-over", label: "Offers Over" },
                                    ]}>
                                        {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                    </Select>
                                )}
                            />
                        </div>

                        {(annualRent || grossYield) && (
                            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 px-3 py-2.5 rounded-lg bg-brand-25 border border-brand-100">
                                <span className="text-xs text-tertiary italic flex-shrink-0">Auto-calculated</span>
                                {annualRent && (
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-xs text-tertiary">Annual Rent:</span>
                                        <span className="text-xs font-semibold text-primary">£{annualRent.toLocaleString()}</span>
                                    </div>
                                )}
                                {grossYield && (
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-xs text-tertiary">Gross Yield:</span>
                                        <span className="text-xs font-semibold text-brand-700">{grossYield.toFixed(2)}%</span>
                                    </div>
                                )}
                                {netYield !== null && (
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-xs text-tertiary">Net Yield:</span>
                                        <span className={`text-xs font-semibold ${netYield >= 0 ? "text-success-700" : "text-danger-700"}`}>{netYield.toFixed(2)}%</span>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <Controller
                                name="tenure"
                                control={control}
                                render={({ field: { value, onChange }, fieldState: { error } }) => (
                                    <Select label="Tenure" placeholder="Select tenure..." selectedKey={value} onSelectionChange={onChange} isInvalid={!!error} hint={error?.message} items={[
                                        { id: "freehold", label: "Freehold" },
                                        { id: "leasehold", label: "Leasehold" },
                                        { id: "share-of-freehold", label: "Share of Freehold" },
                                    ]}>
                                        {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                    </Select>
                                )}
                            />
                            <Controller
                                name="councilTaxBand"
                                control={control}
                                render={({ field: { value, onChange }, fieldState: { error } }) => (
                                    <Select label="Council Tax Band" placeholder="Band..." selectedKey={value ?? ""} onSelectionChange={(key) => onChange(key === "" ? null : key)} isInvalid={!!error} hint={error?.message} items={[
                                        { id: "A", label: "Band A" }, { id: "B", label: "Band B" }, { id: "C", label: "Band C" },
                                        { id: "D", label: "Band D" }, { id: "E", label: "Band E" }, { id: "F", label: "Band F" },
                                        { id: "G", label: "Band G" }, { id: "H", label: "Band H" },
                                    ]}>
                                        {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                    </Select>
                                )}
                            />
                        </div>

                        {isLeasehold && (
                            <div className="space-y-4 pt-2 animate-in fade-in duration-200">
                                <p className="text-xs font-medium text-tertiary uppercase tracking-wider">Leasehold Details</p>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                    <Controller
                                        name="leaseYearsRemaining"
                                        control={control}
                                        render={({ field: { value, onChange, ...rest }, fieldState: { error } }) => (
                                            <Input {...rest} value={value === null || value === undefined ? "" : String(value)} onChange={(val) => onChange(val === "" ? null : Number(val))} type="number" label="Lease Years Remaining" placeholder="e.g. 125" isInvalid={!!error} hint={error?.message} />
                                        )}
                                    />
                                    <Controller
                                        name="serviceCharge"
                                        control={control}
                                        render={({ field: { value, onChange, ...rest }, fieldState: { error } }) => (
                                            <Input {...rest} value={value === null || value === undefined || value === 0 ? "" : String(value)} onChange={(val) => onChange(val === "" ? null : Number(val))} type="number" label="Annual Service Charge (£)" placeholder="e.g. 1,200" isInvalid={!!error} hint={error?.message} />
                                        )}
                                    />
                                    <Controller
                                        name="groundRent"
                                        control={control}
                                        render={({ field: { value, onChange, ...rest }, fieldState: { error } }) => (
                                            <Input {...rest} value={value === null || value === undefined || value === 0 ? "" : String(value)} onChange={(val) => onChange(val === "" ? null : Number(val))} type="number" label="Annual Ground Rent (£)" placeholder="e.g. 500" isInvalid={!!error} hint={error?.message} />
                                        )}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Running Costs */}
                        <div className="space-y-4 pt-2">
                            <p className="text-xs font-medium text-tertiary uppercase tracking-wider">Running Costs</p>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <Controller
                                    name="insuranceCostMonthly"
                                    control={control}
                                    render={({ field: { value, onChange, ...rest }, fieldState: { error } }) => (
                                        <Input {...rest} value={value === null || value === undefined ? "" : String(value)} onChange={(val) => onChange(val === "" ? null : Number(val))} type="number" label="Insurance (per year)" placeholder="e.g. 300" isInvalid={!!error} hint={error?.message} />
                                    )}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Card 3: Tenancy & Income */}
                    <div className="rounded-xl border border-secondary bg-primary p-5 shadow-xs space-y-5">
                        <div className="flex items-center justify-between border-b border-secondary pb-3">
                            <div>
                                <h2 className="text-md font-semibold text-primary">Tenancy & Income</h2>
                                <p className="text-xs text-tertiary mt-0.5">Income quality signals for investors</p>
                            </div>
                            <Controller
                                name="tenented"
                                control={control}
                                render={({ field }) => (
                                    <Toggle isSelected={field.value} onChange={field.onChange} label="Tenanted" />
                                )}
                            />
                        </div>

                        <div className={isTenented ? "space-y-5 animate-in fade-in duration-200" : "hidden"}>
                                {/* Tenancy Timeline */}
                                <div>
                                    <p className="text-xs font-medium text-tertiary uppercase tracking-wider mb-3">Tenancy Timeline</p>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                        <Controller
                                            name="tenancyType"
                                            control={control}
                                            render={({ field: { value, onChange }, fieldState: { error } }) => (
                                                <Select label="Tenancy Type" placeholder="Select type..." selectedKey={value ?? ""} onSelectionChange={(key) => onChange(key === "" ? null : key)} isInvalid={!!error} hint={error?.message} items={[
                                                    { id: "ast", label: "AST" },
                                                    { id: "non-ast", label: "Non-AST" },
                                                    { id: "company-let", label: "Company Let" },
                                                    { id: "license", label: "Licence" },
                                                ]}>
                                                    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                                </Select>
                                            )}
                                        />
                                        <Controller
                                            name="tenancyStartDate"
                                            control={control}
                                            render={({ field, fieldState: { error } }) => (
                                                <div className="flex flex-col gap-1.5">
                                                    <Label>Tenancy Start Date</Label>
                                                    <DatePicker aria-label="Tenancy Start Date" value={field.value ? parseDate(field.value) : null} onChange={(val) => field.onChange(val ? val.toString() : "")} />
                                                    {error?.message && <HintText isInvalid={true}>{error.message}</HintText>}
                                                </div>
                                            )}
                                        />
                                        <Controller
                                            name="fixedTermEndDate"
                                            control={control}
                                            render={({ field, fieldState: { error } }) => (
                                                <div className="flex flex-col gap-1.5">
                                                    <Label>Fixed Term End Date</Label>
                                                    <DatePicker aria-label="Fixed Term End Date" value={field.value ? parseDate(field.value) : null} onChange={(val) => field.onChange(val ? val.toString() : "")} />
                                                    {error?.message && <HintText isInvalid={true}>{error.message}</HintText>}
                                                </div>
                                            )}
                                        />
                                    </div>

                                </div>

                                {/* Income Quality */}
                                <div>
                                    <p className="text-xs font-medium text-tertiary uppercase tracking-wider mb-3">Income Quality</p>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                        <Controller
                                            name="rentPaymentStatus"
                                            control={control}
                                            render={({ field: { value, onChange }, fieldState: { error } }) => (
                                                <Select label="Rent Payment Status" placeholder="Select status..." selectedKey={value ?? ""} onSelectionChange={(key) => onChange(key === "" ? null : key)} isInvalid={!!error} hint={error?.message} items={[
                                                    { id: "up-to-date", label: "Up to Date" },
                                                    { id: "partially-paid", label: "Partially Paid" },
                                                    { id: "overdue", label: "Overdue" },
                                                ]}>
                                                    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                                </Select>
                                            )}
                                        />
                                        <Controller
                                            name="rentCollectionStatus"
                                            control={control}
                                            render={({ field: { value, onChange }, fieldState: { error } }) => (
                                                <Select label="Rent Collection" placeholder="Select style..." selectedKey={value ?? ""} onSelectionChange={(key) => onChange(key === "" ? null : key)} isInvalid={!!error} hint={error?.message} items={[
                                                    { id: "agent-managed", label: "Agent Managed" },
                                                    { id: "direct-to-landlord", label: "Direct to Landlord" },
                                                    { id: "guaranteed", label: "Guaranteed" },
                                                ]}>
                                                    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                                </Select>
                                            )}
                                        />
                                        <Controller
                                            name="rentReviewDate"
                                            control={control}
                                            render={({ field, fieldState: { error } }) => (
                                                <div className="flex flex-col gap-1.5">
                                                    <Label>Rent Review Date</Label>
                                                    <DatePicker aria-label="Rent Review Date" value={field.value ? parseDate(field.value) : null} onChange={(val) => field.onChange(val ? val.toString() : "")} />
                                                    {error?.message && <HintText isInvalid={true}>{error.message}</HintText>}
                                                </div>
                                            )}
                                        />
                                    </div>
                                </div>

                                {/* Notes */}
                                <Controller
                                    name="tenancyNotes"
                                    control={control}
                                    render={({ field, fieldState: { error } }) => (
                                        <TextArea {...field} label="Tenancy Notes" placeholder="Additional context about the tenancy, occupants, or payment history..." rows={3} value={field.value ?? ""} isInvalid={!!error} hint={error?.message} />
                                    )}
                                />
                        </div>
                    </div>

                    {/* Compliance & Legal — only relevant when tenanted */}
                    <div className={isTenented ? "rounded-xl border border-secondary bg-primary p-5 shadow-xs space-y-5" : "hidden"}>
                        <h2 className="text-md font-semibold text-primary border-b border-secondary pb-3">Compliance & Legal</h2>
                            <div className="flex flex-col gap-4">
                                <Controller
                                    name="arrearsStatus"
                                    control={control}
                                    render={({ field: { value, onChange } }) => (
                                        <Toggle
                                            isSelected={value === "active-arrears"}
                                            onChange={(v) => onChange(v ? "active-arrears" : "no-arrears")}
                                            label="In Arrears"
                                            hint="Tenant has active rent arrears."
                                        />
                                    )}
                                />
                                <Controller
                                    name="depositProtected"
                                    control={control}
                                    render={({ field }) => (
                                        <Toggle isSelected={!!field.value} onChange={field.onChange} label="Deposit Protected" hint="Deposit held in a government-approved scheme." />
                                    )}
                                />
                                <Controller
                                    name="noticeServed"
                                    control={control}
                                    render={({ field }) => (
                                        <Toggle isSelected={!!field.value} onChange={field.onChange} label="Notice Served" hint="Notice to vacate has been served to the tenant." />
                                    )}
                                />
                            </div>
                    </div>

                    {/* Card 4: Due Diligence Pack */}
                    <div className="rounded-xl border border-secondary bg-primary p-5 shadow-xs space-y-5">
                        <div className="flex items-center justify-between border-b border-secondary pb-3">
                            <div>
                                <h2 className="text-md font-semibold text-primary">Due Diligence Pack</h2>
                                <p className="text-xs text-tertiary mt-0.5">Record which compliance documents are held</p>
                            </div>
                            {docsRecorded > 0 && (
                                <span className="text-xs font-semibold text-brand-700 bg-brand-50 border border-brand-200 rounded-full px-2.5 py-0.5">
                                    {docsRecorded} / {COMPLIANCE_DOCS.filter(d => !d.leaseholdOnly || isLeasehold).length} recorded
                                </span>
                            )}
                        </div>

                        <div className="space-y-3">
                            {COMPLIANCE_DOCS.map((doc) => {
                                if (doc.leaseholdOnly && !isLeasehold) return null;
                                const availableField = `compliance.${doc.key}.available` as any;
                                const urlField = `compliance.${doc.key}.url` as any;
                                const isAvailable = complianceValues?.[doc.key]?.available;
                                const existingUrl = complianceValues?.[doc.key]?.url;
                                return (
                                    <div key={doc.key} className="rounded-lg border border-secondary p-3 space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-primary">{doc.label}</span>
                                            <Controller
                                                name={availableField}
                                                control={control}
                                                render={({ field }) => (
                                                    <Toggle isSelected={!!field.value} onChange={field.onChange} label="Confirmed" />
                                                )}
                                            />
                                        </div>
                                        {isAvailable && (
                                            <div className="space-y-2 animate-in fade-in slide-in-from-top-1 duration-150">
                                                {complianceFiles[doc.key] ? (
                                                    <div className="flex items-center justify-between rounded-lg border border-secondary bg-secondary_hover px-3 py-2">
                                                        <span className="text-xs text-primary truncate">{complianceFiles[doc.key]!.name}</span>
                                                        <button type="button" onClick={() => handleComplianceFileChange(doc.key, null)} className="ml-2 text-tertiary hover:text-error-600 transition-colors">
                                                            <Trash01 className="size-4" />
                                                        </button>
                                                    </div>
                                                ) : existingUrl ? (
                                                    <div className="flex items-center justify-between rounded-lg border border-secondary bg-secondary_hover px-3 py-2">
                                                        <a href={existingUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-brand-700 underline truncate">View document</a>
                                                        <button type="button" onClick={() => setValue(urlField, "", { shouldDirty: true })} className="ml-2 text-tertiary hover:text-error-600 transition-colors">
                                                            <Trash01 className="size-4" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <label className="flex items-center gap-2 border border-dashed border-secondary hover:border-brand-500 rounded-lg px-3 py-2 cursor-pointer bg-primary transition-colors duration-150">
                                                            <Plus className="size-4 text-fg-quaternary" />
                                                            <span className="text-xs text-tertiary"><span className="font-medium text-brand-600">Upload file</span> — PDF or image</span>
                                                            <input type="file" accept="image/*,application/pdf" className="hidden" onChange={(e) => e.target.files?.[0] && handleComplianceFileChange(doc.key, e.target.files[0])} />
                                                        </label>
                                                        <Controller
                                                            name={urlField}
                                                            control={control}
                                                            render={({ field, fieldState: { error } }) => (
                                                                <Input {...field} value={field.value ?? ""} label="" placeholder="Or paste a link (Google Drive, gov.uk...)" isInvalid={!!error} hint={error?.message} />
                                                            )}
                                                        />
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Floorplans */}
                        <div className="border-t border-secondary pt-4">
                            <div className="flex items-center justify-between mb-3">
                                <div>
                                    <p className="text-sm font-medium text-primary">Floorplans</p>
                                    <p className="text-xs text-tertiary">Optional</p>
                                </div>
                                <span className="text-xs text-tertiary">{floorplans.length} / 3</span>
                            </div>
                            {floorplans.length < 3 && (
                                <label className="flex items-center gap-2 border border-dashed border-secondary hover:border-brand-500 rounded-lg px-3 py-2 cursor-pointer bg-primary transition-colors duration-150 mb-2">
                                    <Plus className="size-4 text-fg-quaternary" />
                                    <span className="text-xs text-tertiary"><span className="font-medium text-brand-600">Upload floorplan</span> — PNG or JPG</span>
                                    <input type="file" multiple accept="image/*" className="hidden" onChange={handleFloorplanChange} disabled={isPending} />
                                </label>
                            )}
                            {floorplans.length > 0 && (
                                <div className="grid grid-cols-2 gap-3">
                                    {floorplans.map((item, index) => (
                                        <div key={index} className="group relative rounded-lg overflow-hidden border border-secondary aspect-video bg-secondary">
                                            <img src={item.type === "existing" ? item.url : item.preview} alt={`Floorplan ${index + 1}`} className="object-cover w-full h-full" />
                                            <button type="button" onClick={() => removeFloorplan(index)} disabled={isPending} className="absolute top-2 right-2 flex size-7 items-center justify-center rounded-full bg-overlay/60 text-white hover:bg-error-solid transition-colors duration-150 opacity-0 group-hover:opacity-100">
                                                <Trash01 className="size-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                </div>

                {/* Right Column / Sidebar */}
                <div className="space-y-6 lg:sticky lg:top-4">
                    {/* Actions — kept first so Save is always at top of sticky sidebar */}
                    <div className="rounded-xl border border-secondary bg-primary p-5 shadow-xs space-y-3">
                        <Button type="submit" color="primary" size="lg" className="w-full" iconLeading={Save01} isDisabled={isPending}>
                            {isPending ? "Saving..." : "Save Updates"}
                        </Button>
                        <Button type="button" color="secondary" size="lg" className="w-full" onClick={() => router.push(`/dashboard/properties/${id}`)} isDisabled={isPending}>
                            Cancel
                        </Button>
                    </div>

                    {/* Listing Settings */}
                    <div className="rounded-xl border border-secondary bg-primary p-5 shadow-xs space-y-5">
                        <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">Listing Settings</h3>

                        <Controller
                            name="status"
                            control={control}
                            render={({ field: { value, onChange }, fieldState: { error } }) => (
                                <Select label="Listing Status" placeholder="Status..." selectedKey={value} onSelectionChange={onChange} isInvalid={!!error} hint={error?.message} items={[
                                    { id: "draft", label: "Draft" },
                                    { id: "pending-review", label: "Pending Review" },
                                    { id: "published", label: "Published" },
                                    { id: "under-offer", label: "Under Offer" },
                                    { id: "sold", label: "Sold" },
                                    { id: "archived", label: "Archived" },
                                ]}>
                                    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                </Select>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <Controller
                                name="epc"
                                control={control}
                                render={({ field: { value } }) => (
                                    <div className="flex flex-col gap-1.5">
                                        <Label>Current EPC Rating</Label>
                                        <div className="flex items-center gap-2 rounded-lg border border-secondary bg-secondary_hover px-3 py-2 min-h-[40px]">
                                            {value && value !== "none" ? (
                                                <span className="inline-flex items-center justify-center size-7 rounded-md text-sm font-bold text-white" style={{ backgroundColor: EPC_COLORS[value as keyof typeof EPC_COLORS] ?? "#6b7280" }}>
                                                    {value}
                                                </span>
                                            ) : (
                                                <span className="text-sm text-tertiary">Auto-filled</span>
                                            )}
                                        </div>
                                    </div>
                                )}
                            />

                            <Controller
                                name="potentialEpc"
                                control={control}
                                render={({ field: { value } }) => (
                                    <div className="flex flex-col gap-1.5">
                                        <Label>Potential EPC Rating</Label>
                                        <div className="flex items-center gap-2 rounded-lg border border-secondary bg-secondary_hover px-3 py-2 min-h-[40px]">
                                            {value && value !== "none" ? (
                                                <span className="inline-flex items-center justify-center size-7 rounded-md text-sm font-bold text-white" style={{ backgroundColor: EPC_COLORS[value as keyof typeof EPC_COLORS] ?? "#6b7280" }}>
                                                    {value}
                                                </span>
                                            ) : (
                                                <span className="text-sm text-tertiary">Auto-filled</span>
                                            )}
                                        </div>
                                    </div>
                                )}
                            />
                        </div>

                        <Controller
                            name="isFeatured"
                            control={control}
                            render={({ field }) => (
                                <Toggle isSelected={field.value} onChange={field.onChange} label="Featured Investment" hint="Highlight this property across the site." />
                            )}
                        />

                        <Controller
                            name="isHighYield"
                            control={control}
                            render={({ field }) => (
                                <Toggle isSelected={field.value} onChange={field.onChange} label="High Yield" hint={'Show the "High Yield" badge on this listing.'} />
                            )}
                        />
                    </div>

                    {/* Photos */}
                    <div className="rounded-xl border border-secondary bg-primary p-5 shadow-xs space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">Photos</h3>
                            <span className="text-xs text-tertiary">{images.length} / 8</span>
                        </div>
                        {images.length < 8 && (
                            <label className="flex flex-col items-center justify-center border-2 border-dashed border-secondary hover:border-brand-500 rounded-lg p-5 cursor-pointer bg-primary transition-colors duration-150 group">
                                <div className="flex size-10 items-center justify-center rounded-lg border border-secondary bg-primary shadow-xs group-hover:bg-secondary mb-2">
                                    <Plus className="size-5 text-fg-quaternary animate-pulse" />
                                </div>
                                <span className="text-sm text-primary"><span className="font-semibold text-brand-700">Click to upload</span> or drag and drop</span>
                                <p className="text-xs text-tertiary mt-1">PNG, JPG or GIF (max. 5MB)</p>
                                <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageChange} disabled={isPending} />
                            </label>
                        )}
                        {images.length > 0 && (
                            <div className="grid grid-cols-2 gap-3">
                                {images.map((item, index) => (
                                    <div key={index} className="group relative rounded-lg overflow-hidden border border-secondary aspect-video bg-secondary">
                                        <img src={item.type === "existing" ? item.url : item.preview} alt={`Preview ${index + 1}`} className="object-cover w-full h-full" />
                                        {index === 0 && <span className="absolute top-2 left-2 bg-brand-600 text-white text-xs font-semibold px-2 py-0.5 rounded shadow-sm">Cover</span>}
                                        <button type="button" onClick={() => removeImage(index)} disabled={isPending} className="absolute top-2 right-2 flex size-7 items-center justify-center rounded-full bg-overlay/60 text-white hover:bg-error-solid transition-colors duration-150 opacity-0 group-hover:opacity-100">
                                            <Trash01 className="size-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>


                </div>
            </form>
        </div>
    );
}
