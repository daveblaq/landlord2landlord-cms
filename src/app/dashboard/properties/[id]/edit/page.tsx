"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams, useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
    ArrowLeft,
    Save01,
    Building01,
    Users01,
    LogOut01,
    HomeLine,
    Trash01,
    Plus,
    Building02,
    Settings01,
} from "@untitledui/icons";

import { useProperty, useUpdateProperty, useUploadPropertyImages, type Property } from "@/lib/api/properties";
import { useAuth } from "@/contexts/auth-context";
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
import { SidebarNavigationDefault } from "@/components/application/app-navigation/sidebar-navigation/sidebar-default";
import { DashboardHeader } from "@/components/application/page-headers/dashboard-header";
import { ThemeToggle } from "@/components/application/app-navigation/base-components/theme-toggle";

const propertySchema = yup.object().shape({
    title: yup
        .string()
        .required("Title is required")
        .min(10, "Title must be at least 10 characters")
        .max(100, "Title must be at most 100 characters"),
    description: yup
        .string()
        .required("Description is required"),
    propertyType: yup
        .string()
        .oneOf(["flat", "terraced", "semi-detached", "detached", "maisonette", "bungalow"], "Select a valid property type")
        .required("Property type is required"),
    bedrooms: yup
        .number()
        .typeError("Bedrooms must be a number")
        .min(0, "Bedrooms cannot be negative")
        .required("Bedrooms is required"),
    bathrooms: yup
        .number()
        .typeError("Bathrooms must be a number")
        .min(0, "Bathrooms cannot be negative")
        .required("Bathrooms is required"),
    location: yup
        .string()
        .required("Location is required"),
    postcode: yup
        .string()
        .required("Postcode is required")
        .matches(/^[A-Z]{1,2}[0-9R][0-9A-Z]?$/i, "Please enter a valid UK postcode outcode (e.g., M5, LS1, SW1A)"),
    tenure: yup
        .string()
        .oneOf(["freehold", "leasehold", "share-of-freehold"], "Select a valid tenure")
        .required("Tenure is required"),
    heroImage: yup
        .string()
        .optional(),
    askingPrice: yup
        .number()
        .typeError("Asking price must be a number")
        .positive("Asking price must be positive")
        .required("Asking price is required"),
    monthlyRent: yup
        .number()
        .typeError("Monthly rent must be a number")
        .positive("Monthly rent must be positive")
        .required("Monthly rent is required"),
    leaseYearsRemaining: yup
        .number()
        .typeError("Lease years remaining must be a number")
        .min(0, "Lease years remaining cannot be negative")
        .nullable()
        .transform((value, originalValue) => originalValue === "" ? null : value)
        .optional(),
    serviceCharge: yup
        .number()
        .typeError("Service charge must be a number")
        .min(0, "Service charge cannot be negative")
        .nullable()
        .transform((value, originalValue) => originalValue === "" ? null : value)
        .optional(),
    groundRent: yup
        .number()
        .typeError("Ground rent must be a number")
        .min(0, "Ground rent cannot be negative")
        .nullable()
        .transform((value, originalValue) => originalValue === "" ? null : value)
        .optional(),
    councilTaxBand: yup
        .string()
        .oneOf(["A", "B", "C", "D", "E", "F", "G", "H"], "Select a valid tax band")
        .nullable()
        .transform((value, originalValue) => originalValue === "" ? null : value)
        .optional(),
    tenented: yup
        .boolean()
        .default(true),
    tenancyStatus: yup
        .string()
        .nullable()
        .transform((value, originalValue) => originalValue === "" ? null : value)
        .optional(),
    tenantMoveInDate: yup
        .string()
        .nullable()
        .transform((value, originalValue) => originalValue === "" ? null : value)
        .optional(),
    contractType: yup
        .string()
        .oneOf(["ast", "non-ast", "company-let", "license"], "Select a valid contract type")
        .nullable()
        .transform((value, originalValue) => originalValue === "" ? null : value)
        .optional(),
    rentCollectionStatus: yup
        .string()
        .oneOf(["agent-managed", "direct-to-landlord", "guaranteed"], "Select a valid collection status")
        .nullable()
        .transform((value, originalValue) => originalValue === "" ? null : value)
        .optional(),
    arrearsStatus: yup
        .string()
        .oneOf(["no-arrears", "historical-resolved", "active-arrears"], "Select a valid arrears status")
        .default("no-arrears"),
    tenancyNotes: yup
        .string()
        .nullable()
        .transform((value, originalValue) => originalValue === "" ? null : value)
        .optional(),
    epc: yup
        .string()
        .nullable()
        .transform((value, originalValue) => originalValue === "" ? null : value)
        .optional(),
    displayOnHomepage: yup
        .boolean()
        .default(false),
    status: yup
        .string()
        .oneOf(["draft", "pending-review", "published", "under-offer", "sold", "archived"])
        .default("draft")
});

const mainNavSections = [
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

interface ImageStateItem {
    type: "existing" | "new";
    url?: string;
    alt?: string;
    file?: File;
    preview?: string;
}

export default function EditPropertyPage() {
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();
    const { logout } = useAuth();
    const id = params.id as string;

    const { data: property, isLoading: isFetching, isError } = useProperty(id);
    const updatePropertyMutation = useUpdateProperty();
    const uploadImagesMutation = useUploadPropertyImages();

    // Combined Image State
    const [images, setImages] = useState<ImageStateItem[]>([]);
    const [isUploading, setIsUploading] = useState(false);

    const {
        control,
        handleSubmit,
        watch,
        reset,
        formState: { isSubmitting }
    } = useForm({
        resolver: yupResolver(propertySchema),
        defaultValues: {
            title: "",
            description: "",
            propertyType: "flat",
            bedrooms: 1,
            bathrooms: 1,
            location: "",
            postcode: "",
            tenure: "freehold",
            heroImage: "",
            askingPrice: 0,
            monthlyRent: 0,
            leaseYearsRemaining: null,
            serviceCharge: 0,
            groundRent: 0,
            councilTaxBand: null,
            tenented: true,
            tenancyStatus: "",
            tenantMoveInDate: "",
            contractType: null,
            rentCollectionStatus: null,
            arrearsStatus: "no-arrears",
            tenancyNotes: "",
            epc: "",
            displayOnHomepage: false,
            status: "draft"
        }
    });

    const isTenented = watch("tenented");

    // Populate data once fetched
    useEffect(() => {
        if (property) {
            reset({
                title: property.title || "",
                description: property.description || "",
                propertyType: (property.propertyType as any) || "flat",
                bedrooms: property.bedrooms || 1,
                bathrooms: property.bathrooms || 1,
                location: property.location || "",
                postcode: property.postcode || "",
                tenure: (property.tenure as any) || "freehold",
                heroImage: property.heroImage || "",
                askingPrice: property.investmentMetrics?.askingPrice || 0,
                monthlyRent: property.investmentMetrics?.monthlyRent || 0,
                leaseYearsRemaining: property.investmentMetrics?.leaseYearsRemaining ?? null,
                serviceCharge: property.serviceCharge || 0,
                groundRent: property.groundRent || 0,
                councilTaxBand: (property.councilTaxBand as any) ?? null,
                tenented: property.tenented ?? true,
                tenancyStatus: property.tenancyStatus || "",
                tenantMoveInDate: property.tenantMoveInDate ? property.tenantMoveInDate.split("T")[0] : "",
                contractType: (property.contractType as any) ?? null,
                rentCollectionStatus: (property.rentCollectionStatus as any) ?? null,
                arrearsStatus: (property.arrearsStatus as any) || "no-arrears",
                tenancyNotes: property.tenancyNotes || "",
                epc: property.epc || "",
                displayOnHomepage: property.displayOnHomepage ?? false,
                status: (property.status as any) || "draft"
            });

            if (property.gallery && property.gallery.length > 0) {
                setImages(property.gallery.map((img: any) => ({
                    type: "existing",
                    url: img.url,
                    alt: img.alt || ""
                })));
            } else if (property.heroImage) {
                setImages([{
                    type: "existing",
                    url: property.heroImage,
                    alt: "Cover"
                }]);
            }
        }
    }, [property, reset]);

    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            const availableSlots = 6 - images.length;
            const newFiles = filesArray.slice(0, availableSlots).map((file) => ({
                type: "new" as const,
                file,
                preview: URL.createObjectURL(file)
            }));
            setImages((prev) => [...prev, ...newFiles].slice(0, 6));
        }
    };

    const removeImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const onSubmit = async (formData: any) => {
        if (images.length === 0) {
            toast.custom((t) => (
                <IconNotification
                    title="Images Required"
                    description="Please keep or add at least 1 image for the property listing."
                    color="error"
                    onClose={() => toast.dismiss(t)}
                />
            ));
            return;
        }

        setIsUploading(true);
        let uploadedUrls: string[] = [];

        try {
            // Find all new files to upload
            const newImagesToUpload = images.filter((img) => img.type === "new" && img.file);

            if (newImagesToUpload.length > 0) {
                const base64Promises = newImagesToUpload.map((img) => fileToBase64(img.file!));
                const base64Images = await Promise.all(base64Promises);
                uploadedUrls = await uploadImagesMutation.mutateAsync(base64Images);
            }
        } catch (error: any) {
            setIsUploading(false);
            const errorMessage = error.response?.data?.message || error.message || "Failed to upload new images. Please try again.";
            toast.custom((t) => (
                <IconNotification
                    title="Upload Failed"
                    description={errorMessage}
                    color="error"
                    onClose={() => toast.dismiss(t)}
                />
            ));
            return;
        }

        // Reconstruct the final list of URLs matching the state order
        let newUploadIdx = 0;
        const finalUrls = images.map((img) => {
            if (img.type === "existing") {
                return img.url!;
            } else {
                const url = uploadedUrls[newUploadIdx];
                newUploadIdx++;
                return url;
            }
        }).filter(Boolean);

        const propertyData = {
            title: formData.title,
            description: formData.description,
            propertyType: formData.propertyType,
            bedrooms: Number(formData.bedrooms),
            bathrooms: Number(formData.bathrooms),
            location: formData.location,
            postcode: formData.postcode,
            tenure: formData.tenure,
            heroImage: finalUrls[0] || "",
            gallery: finalUrls.map((url, i) => ({
                url,
                alt: `Property View ${i + 1}`
            })),
            investmentMetrics: {
                askingPrice: Number(formData.askingPrice),
                monthlyRent: Number(formData.monthlyRent),
                leaseYearsRemaining: formData.leaseYearsRemaining ? Number(formData.leaseYearsRemaining) : undefined,
            },
            serviceCharge: formData.serviceCharge ? Number(formData.serviceCharge) : 0,
            groundRent: formData.groundRent ? Number(formData.groundRent) : 0,
            councilTaxBand: formData.councilTaxBand || undefined,
            tenented: formData.tenented,
            tenancyStatus: formData.tenented ? (formData.tenancyStatus || undefined) : undefined,
            tenantMoveInDate: (formData.tenented && formData.tenantMoveInDate) ? formData.tenantMoveInDate : undefined,
            contractType: formData.tenented ? (formData.contractType || undefined) : undefined,
            rentCollectionStatus: formData.tenented ? (formData.rentCollectionStatus || undefined) : undefined,
            arrearsStatus: formData.tenented ? (formData.arrearsStatus || 'no-arrears') : 'no-arrears',
            tenancyNotes: formData.tenented ? (formData.tenancyNotes || undefined) : undefined,
            epc: formData.epc || undefined,
            displayOnHomepage: formData.displayOnHomepage,
            status: formData.status,
        };

        updatePropertyMutation.mutate({ id, data: propertyData as any }, {
            onSuccess: () => {
                setIsUploading(false);
                toast.custom((t) => (
                    <IconNotification
                        title="Listing Updated"
                        description="The property listing has been updated successfully."
                        color="success"
                        onClose={() => toast.dismiss(t)}
                    />
                ));
                router.push("/dashboard/properties");
            },
            onError: (error: any) => {
                setIsUploading(false);
                const errorMessage = error.response?.data?.message || error.message || "Failed to update property listing. Please try again.";
                toast.custom((t) => (
                    <IconNotification
                        title="Error Updating Listing"
                        description={errorMessage}
                        color="error"
                        onClose={() => toast.dismiss(t)}
                    />
                ));
            }
        });
    };

    if (isFetching) {
        return (
            <div className="flex flex-col lg:flex-row min-h-dvh bg-primary">
                <SidebarNavigationDefault
                    activeUrl="/dashboard/properties"
                    sections={mainNavSections}
                    footerContent={(collapsed) => <ThemeToggle collapsed={collapsed} />}
                    footerItems={[{ label: "Logout", icon: LogOut01, onClick: () => logout() }]}
                    showAccountCard={false}
                />
                <main className="flex flex-1 flex-col min-w-0">
                    <div className="px-4 pt-6 pb-0 md:px-8 lg:pt-8">
                        <DashboardHeader />
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                        <div className="flex flex-col items-center gap-2">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-500 border-t-transparent" />
                            <p className="text-sm text-tertiary">Loading property data...</p>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    if (isError || !property) {
        return (
            <div className="flex flex-col lg:flex-row min-h-dvh bg-primary">
                <SidebarNavigationDefault
                    activeUrl="/dashboard/properties"
                    sections={mainNavSections}
                    footerContent={(collapsed) => <ThemeToggle collapsed={collapsed} />}
                    footerItems={[{ label: "Logout", icon: LogOut01, onClick: () => logout() }]}
                    showAccountCard={false}
                />
                <main className="flex flex-1 flex-col min-w-0">
                    <div className="px-4 pt-6 pb-0 md:px-8 lg:pt-8">
                        <DashboardHeader />
                    </div>
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
                </main>
            </div>
        );
    }

    const isPending = isSubmitting || isUploading;

    return (
        <div className="flex flex-col lg:flex-row min-h-dvh bg-primary">
            {/* Sidebar */}
            <SidebarNavigationDefault
                activeUrl="/dashboard/properties"
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
                    {/* Page Title + Actions */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-secondary pb-5">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <Button
                                    color="link-gray"
                                    size="sm"
                                    iconLeading={ArrowLeft}
                                    onClick={() => router.push(`/dashboard/properties/${id}`)}
                                >
                                    Back to View
                                </Button>
                            </div>
                            <h1 className="text-xl font-semibold text-primary lg:text-display-xs">
                                Edit Property Listing
                            </h1>
                            <p className="mt-1 text-sm text-tertiary">
                                Modify details for {property.title}
                            </p>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        {/* Main Fields (Left Column) */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Card 1: Basic Information */}
                            <div className="rounded-xl border border-secondary bg-primary p-5 shadow-xs space-y-5">
                                <h2 className="text-md font-semibold text-primary border-b border-secondary pb-3">
                                    Basic Information
                                </h2>

                                <Controller
                                    name="title"
                                    control={control}
                                    render={({ field, fieldState: { error } }) => (
                                        <Input
                                            {...field}
                                            label="Property Title"
                                            placeholder="e.g. 3-bedroom Luxury Apartment in Lekki"
                                            isInvalid={!!error}
                                            hint={error?.message}
                                        />
                                    )}
                                />

                                <Controller
                                    name="description"
                                    control={control}
                                    render={({ field, fieldState: { error } }) => (
                                        <TextArea
                                            {...field}
                                            label="Description"
                                            placeholder="Provide detailed information about the property..."
                                            rows={5}
                                            isInvalid={!!error}
                                            hint={error?.message}
                                        />
                                    )}
                                />

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                    <Controller
                                        name="propertyType"
                                        control={control}
                                        render={({ field: { value, onChange }, fieldState: { error } }) => (
                                            <Select
                                                label="Property Type"
                                                placeholder="Select type..."
                                                selectedKey={value}
                                                onSelectionChange={onChange}
                                                isInvalid={!!error}
                                                hint={error?.message}
                                                items={[
                                                    { id: "flat", label: "Flat" },
                                                    { id: "terraced", label: "Terraced" },
                                                    { id: "semi-detached", label: "Semi-Detached" },
                                                    { id: "detached", label: "Detached" },
                                                    { id: "maisonette", label: "Maisonette" },
                                                    { id: "bungalow", label: "Bungalow" },
                                                ]}
                                            >
                                                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                            </Select>
                                        )}
                                    />

                                    <Controller
                                        name="bedrooms"
                                        control={control}
                                        render={({ field: { value, onChange, ...rest }, fieldState: { error } }) => (
                                            <Input
                                                {...rest}
                                                value={String(value)}
                                                onChange={(val) => onChange(Number(val))}
                                                type="number"
                                                label="Bedrooms"
                                                placeholder="1"
                                                isInvalid={!!error}
                                                hint={error?.message}
                                            />
                                        )}
                                    />

                                    <Controller
                                        name="bathrooms"
                                        control={control}
                                        render={({ field: { value, onChange, ...rest }, fieldState: { error } }) => (
                                            <Input
                                                {...rest}
                                                value={String(value)}
                                                onChange={(val) => onChange(Number(val))}
                                                type="number"
                                                label="Bathrooms"
                                                placeholder="1"
                                                isInvalid={!!error}
                                                hint={error?.message}
                                            />
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                    <div className="sm:col-span-2">
                                        <Controller
                                            name="location"
                                            control={control}
                                            render={({ field, fieldState: { error } }) => (
                                                <Input
                                                    {...field}
                                                    label="Location (City / Area)"
                                                    placeholder="e.g. Lekki, Lagos"
                                                    isInvalid={!!error}
                                                    hint={error?.message}
                                                />
                                            )}
                                        />
                                    </div>
                                    <Controller
                                        name="postcode"
                                        control={control}
                                        render={({ field, fieldState: { error } }) => (
                                            <Input
                                                {...field}
                                                label="UK Postcode Outcode"
                                                placeholder="e.g. SW1A, M5"
                                                isInvalid={!!error}
                                                hint={error?.message}
                                            />
                                        )}
                                    />
                                </div>
                            </div>

                            {/* Card 2: Financials & Investment Metrics */}
                            <div className="rounded-xl border border-secondary bg-primary p-5 shadow-xs space-y-5">
                                <h2 className="text-md font-semibold text-primary border-b border-secondary pb-3">
                                    Financials & Investment Metrics
                                </h2>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <Controller
                                        name="askingPrice"
                                        control={control}
                                        render={({ field: { value, onChange, ...rest }, fieldState: { error } }) => (
                                            <Input
                                                {...rest}
                                                value={String(value)}
                                                onChange={(val) => onChange(Number(val))}
                                                type="number"
                                                label="Asking Price (£)"
                                                placeholder="350000"
                                                isInvalid={!!error}
                                                hint={error?.message}
                                            />
                                        )}
                                    />

                                    <Controller
                                        name="monthlyRent"
                                        control={control}
                                        render={({ field: { value, onChange, ...rest }, fieldState: { error } }) => (
                                            <Input
                                                {...rest}
                                                value={String(value)}
                                                onChange={(val) => onChange(Number(val))}
                                                type="number"
                                                label="Monthly Rent (£)"
                                                placeholder="1800"
                                                isInvalid={!!error}
                                                hint={error?.message}
                                            />
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                    <Controller
                                        name="tenure"
                                        control={control}
                                        render={({ field: { value, onChange }, fieldState: { error } }) => (
                                            <Select
                                                label="Tenure"
                                                placeholder="Select tenure..."
                                                selectedKey={value}
                                                onSelectionChange={onChange}
                                                isInvalid={!!error}
                                                hint={error?.message}
                                                items={[
                                                    { id: "freehold", label: "Freehold" },
                                                    { id: "leasehold", label: "Leasehold" },
                                                    { id: "share-of-freehold", label: "Share of Freehold" },
                                                ]}
                                            >
                                                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                            </Select>
                                        )}
                                    />

                                    <Controller
                                        name="leaseYearsRemaining"
                                        control={control}
                                        render={({ field: { value, onChange, ...rest }, fieldState: { error } }) => (
                                            <Input
                                                {...rest}
                                                value={value === null || value === undefined ? "" : String(value)}
                                                onChange={(val) => onChange(val === "" ? null : Number(val))}
                                                type="number"
                                                label="Lease Years Remaining"
                                                placeholder="999"
                                                isInvalid={!!error}
                                                hint={error?.message}
                                            />
                                        )}
                                    />

                                    <Controller
                                        name="councilTaxBand"
                                        control={control}
                                        render={({ field: { value, onChange }, fieldState: { error } }) => (
                                            <Select
                                                label="Council Tax Band"
                                                placeholder="Band..."
                                                selectedKey={value ?? ""}
                                                onSelectionChange={(key) => onChange(key === "" ? null : key)}
                                                isInvalid={!!error}
                                                hint={error?.message}
                                                items={[
                                                    { id: "A", label: "Band A" },
                                                    { id: "B", label: "Band B" },
                                                    { id: "C", label: "Band C" },
                                                    { id: "D", label: "Band D" },
                                                    { id: "E", label: "Band E" },
                                                    { id: "F", label: "Band F" },
                                                    { id: "G", label: "Band G" },
                                                    { id: "H", label: "Band H" },
                                                ]}
                                            >
                                                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                            </Select>
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <Controller
                                        name="serviceCharge"
                                        control={control}
                                        render={({ field: { value, onChange, ...rest }, fieldState: { error } }) => (
                                            <Input
                                                {...rest}
                                                value={value === null || value === undefined ? "" : String(value)}
                                                onChange={(val) => onChange(val === "" ? null : Number(val))}
                                                type="number"
                                                label="Annual Service Charge (£)"
                                                placeholder="0"
                                                isInvalid={!!error}
                                                hint={error?.message}
                                            />
                                        )}
                                    />

                                    <Controller
                                        name="groundRent"
                                        control={control}
                                        render={({ field: { value, onChange, ...rest }, fieldState: { error } }) => (
                                            <Input
                                                {...rest}
                                                value={value === null || value === undefined ? "" : String(value)}
                                                onChange={(val) => onChange(val === "" ? null : Number(val))}
                                                type="number"
                                                label="Annual Ground Rent (£)"
                                                placeholder="0"
                                                isInvalid={!!error}
                                                hint={error?.message}
                                            />
                                        )}
                                    />
                                </div>
                            </div>

                            {/* Card 3: Tenancy Details (Conditional) */}
                            <div className="rounded-xl border border-secondary bg-primary p-5 shadow-xs space-y-5">
                                <div className="flex items-center justify-between border-b border-secondary pb-3">
                                    <h2 className="text-md font-semibold text-primary">
                                        Tenancy Information
                                    </h2>
                                    <Controller
                                        name="tenented"
                                        control={control}
                                        render={({ field }) => (
                                            <Toggle
                                                isSelected={field.value}
                                                onChange={field.onChange}
                                                label="Tenanted"
                                            />
                                        )}
                                    />
                                </div>

                                {isTenented && (
                                    <div className="space-y-4 animate-in fade-in duration-200">
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            <Controller
                                                name="tenancyStatus"
                                                control={control}
                                                render={({ field, fieldState: { error } }) => (
                                                    <Input
                                                        {...field}
                                                        label="Tenancy Status"
                                                        placeholder="e.g. Let on AST"
                                                        value={field.value ?? ""}
                                                        isInvalid={!!error}
                                                        hint={error?.message}
                                                    />
                                                )}
                                            />

                                            <Controller
                                                name="tenantMoveInDate"
                                                control={control}
                                                render={({ field, fieldState: { error } }) => (
                                                    <div className="flex flex-col gap-1.5">
                                                        <Label>Tenant Move-in Date</Label>
                                                        <DatePicker
                                                            aria-label="Tenant Move-in Date"
                                                            value={field.value ? parseDate(field.value) : null}
                                                            onChange={(val) => field.onChange(val ? val.toString() : "")}
                                                        />
                                                        {error?.message && <HintText isInvalid={true}>{error.message}</HintText>}
                                                    </div>
                                                )}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                            <Controller
                                                name="contractType"
                                                control={control}
                                                render={({ field: { value, onChange }, fieldState: { error } }) => (
                                                    <Select
                                                        label="Contract Type"
                                                        placeholder="Select contract..."
                                                        selectedKey={value ?? ""}
                                                        onSelectionChange={(key) => onChange(key === "" ? null : key)}
                                                        isInvalid={!!error}
                                                        hint={error?.message}
                                                        items={[
                                                            { id: "ast", label: "AST" },
                                                            { id: "non-ast", label: "Non-AST" },
                                                            { id: "company-let", label: "Company Let" },
                                                            { id: "license", label: "License" },
                                                        ]}
                                                    >
                                                        {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                                    </Select>
                                                )}
                                            />

                                            <Controller
                                                name="rentCollectionStatus"
                                                control={control}
                                                render={({ field: { value, onChange }, fieldState: { error } }) => (
                                                    <Select
                                                        label="Rent Collection"
                                                        placeholder="Select style..."
                                                        selectedKey={value ?? ""}
                                                        onSelectionChange={(key) => onChange(key === "" ? null : key)}
                                                        isInvalid={!!error}
                                                        hint={error?.message}
                                                        items={[
                                                            { id: "agent-managed", label: "Agent Managed" },
                                                            { id: "direct-to-landlord", label: "Direct to Landlord" },
                                                            { id: "guaranteed", label: "Guaranteed" },
                                                        ]}
                                                    >
                                                        {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                                    </Select>
                                                )}
                                            />

                                            <Controller
                                                name="arrearsStatus"
                                                control={control}
                                                render={({ field: { value, onChange }, fieldState: { error } }) => (
                                                    <Select
                                                        label="Arrears Status"
                                                        placeholder="Select arrears..."
                                                        selectedKey={value}
                                                        onSelectionChange={onChange}
                                                        isInvalid={!!error}
                                                        hint={error?.message}
                                                        items={[
                                                            { id: "no-arrears", label: "No Arrears" },
                                                            { id: "historical-resolved", label: "Historical Resolved" },
                                                            { id: "active-arrears", label: "Active Arrears" },
                                                        ]}
                                                    >
                                                        {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                                    </Select>
                                                )}
                                            />
                                        </div>

                                        <Controller
                                            name="tenancyNotes"
                                            control={control}
                                            render={({ field, fieldState: { error } }) => (
                                                <TextArea
                                                    {...field}
                                                    label="Tenancy Notes"
                                                    placeholder="Enter additional details..."
                                                    rows={3}
                                                    value={field.value ?? ""}
                                                    isInvalid={!!error}
                                                    hint={error?.message}
                                                />
                                            )}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Sidebar Column */}
                        <div className="space-y-6">
                            {/* Card 4: Listing Control */}
                            <div className="rounded-xl border border-secondary bg-primary p-5 shadow-xs space-y-5">
                                <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">
                                    Listing Settings
                                </h3>

                                <Controller
                                    name="status"
                                    control={control}
                                    render={({ field: { value, onChange }, fieldState: { error } }) => (
                                        <Select
                                            label="Listing Status"
                                            placeholder="Status..."
                                            selectedKey={value}
                                            onSelectionChange={onChange}
                                            isInvalid={!!error}
                                            hint={error?.message}
                                            items={[
                                                { id: "draft", label: "Draft" },
                                                { id: "pending-review", label: "Pending Review" },
                                                { id: "published", label: "Published" },
                                                { id: "under-offer", label: "Under Offer" },
                                                { id: "sold", label: "Sold" },
                                                { id: "archived", label: "Archived" },
                                            ]}
                                        >
                                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                        </Select>
                                    )}
                                />

                                <Controller
                                    name="epc"
                                    control={control}
                                    render={({ field, fieldState: { error } }) => (
                                        <Input
                                            {...field}
                                            label="EPC Rating"
                                            placeholder="e.g. C or D"
                                            value={field.value ?? ""}
                                            isInvalid={!!error}
                                            hint={error?.message}
                                        />
                                    )}
                                />

                                <Controller
                                    name="displayOnHomepage"
                                    control={control}
                                    render={({ field }) => (
                                        <Toggle
                                            isSelected={field.value}
                                            onChange={field.onChange}
                                            label="Feature on Homepage"
                                            hint="Show this listing on the public marketplace frontpage."
                                        />
                                    )}
                                />
                            </div>

                            {/* Card 5: Media & Upload Area */}
                            <div className="rounded-xl border border-secondary bg-primary p-5 shadow-xs space-y-5">
                                <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">
                                    Media (Max 6 Images)
                                </h3>

                                <div className="space-y-4">
                                    {/* Upload Trigger Area */}
                                    {images.length < 6 && (
                                        <label className="flex flex-col items-center justify-center border-2 border-dashed border-secondary hover:border-brand-500 rounded-lg p-6 cursor-pointer bg-primary transition-colors duration-150 group">
                                            <div className="flex flex-col items-center justify-center space-y-2 text-center">
                                                <div className="flex size-10 items-center justify-center rounded-lg border border-secondary bg-primary shadow-xs group-hover:bg-secondary">
                                                    <Plus className="size-5 text-fg-quaternary animate-pulse" />
                                                </div>
                                                <div className="text-sm text-primary">
                                                    <span className="font-semibold text-brand-700">Click to upload</span> or drag and drop
                                                </div>
                                                <p className="text-xs text-tertiary">
                                                    PNG, JPG or GIF (max. 5MB per image)
                                                </p>
                                            </div>
                                            <input
                                                type="file"
                                                multiple
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleImageChange}
                                                disabled={isPending}
                                            />
                                        </label>
                                    )}

                                    {/* Preview Grid */}
                                    {images.length > 0 && (
                                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2">
                                            {images.map((item, index) => (
                                                <div key={index} className="group relative rounded-lg overflow-hidden border border-secondary aspect-video bg-secondary">
                                                    <img
                                                        src={item.type === "existing" ? item.url : item.preview}
                                                        alt={`Preview ${index + 1}`}
                                                        className="object-cover w-full h-full"
                                                    />
                                                    {index === 0 && (
                                                        <span className="absolute top-2 left-2 bg-brand-600 text-white text-xs font-semibold px-2 py-0.5 rounded shadow-sm">
                                                            Cover
                                                        </span>
                                                    )}
                                                    <button
                                                        type="button"
                                                        onClick={() => removeImage(index)}
                                                        disabled={isPending}
                                                        className="absolute top-2 right-2 flex size-7 items-center justify-center rounded-full bg-overlay/60 text-white hover:bg-error-solid transition-colors duration-150 opacity-0 group-hover:opacity-100"
                                                    >
                                                        <Trash01 className="size-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Actions Footer */}
                            <div className="rounded-xl border border-secondary bg-primary p-5 shadow-xs space-y-3">
                                <Button
                                    type="submit"
                                    color="primary"
                                    size="lg"
                                    className="w-full"
                                    iconLeading={Save01}
                                    isDisabled={isPending}
                                >
                                    {isPending ? "Saving..." : "Save Updates"}
                                </Button>
                                <Button
                                    type="button"
                                    color="secondary"
                                    size="lg"
                                    className="w-full"
                                    onClick={() => router.push(`/dashboard/properties/${id}`)}
                                    isDisabled={isPending}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
