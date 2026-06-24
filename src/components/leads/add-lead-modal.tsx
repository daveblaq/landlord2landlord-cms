"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { CheckCircle } from "@untitledui/icons";
import { ModalOverlay, Modal, Dialog } from "@/components/application/modals/modal";
import { CloseButton } from "@/components/base/buttons/close-button";
import { Heading as AriaHeading } from "react-aria-components";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { useCreateLead, type LeadType } from "@/lib/api/leads";
import { toast } from "sonner";
import { IconNotification } from "@/components/application/notifications/notifications";

interface FormData {
    name: string;
    email: string;
    phone?: string;
    type: LeadType;
    message?: string;
    marketingConsent: boolean;
}

interface AddLeadModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    propertyId?: string;
    propertyTitle?: string;
}

const LEAD_TYPES: Array<{ id: LeadType; label: string }> = [
    { id: "Property Enquiry", label: "Property Enquiry" },
    { id: "Mortgage Lead", label: "Mortgage Lead" },
    { id: "Valuation Lead", label: "Valuation Lead" },
    { id: "Insurance Lead", label: "Insurance Lead" },
    { id: "General Enquiry", label: "General Enquiry" },
];

export function AddLeadModal({ isOpen, onOpenChange, propertyId, propertyTitle }: AddLeadModalProps) {
    const [submitted, setSubmitted] = useState(false);
    const createLead = useCreateLead();
    const isPrefillMode = !!propertyId;

    const form = useForm<FormData>({
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            type: isPrefillMode ? "Property Enquiry" : undefined,
            message: "",
            marketingConsent: false,
        },
    });

    const handleClose = () => {
        onOpenChange(false);
        setSubmitted(false);
        form.reset();
    };

    const onSubmit = (data: FormData) => {
        createLead.mutate(
            {
                name: data.name,
                email: data.email,
                phone: data.phone || undefined,
                type: data.type,
                status: "New",
                message: data.message || undefined,
                metadata: {
                    marketingConsent: data.marketingConsent,
                    ...(propertyId && { propertyId, propertyTitle, source: "manual" }),
                },
            },
            {
                onSuccess: () => setSubmitted(true),
                onError: (err: any) => {
                    toast.custom((t) => (
                        <IconNotification
                            title="Failed to Create Lead"
                            description={err.response?.data?.message || err.message || "Something went wrong, please try again."}
                            color="error"
                            onClose={() => toast.dismiss(t)}
                        />
                    ));
                },
            }
        );
    };

    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={(open) => { if (!open) handleClose(); }} isDismissable>
            <Modal>
                <Dialog>
                    <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-primary shadow-xl border border-secondary text-left">
                        <CloseButton onClick={handleClose} theme="light" size="lg" className="absolute top-4 right-4" />

                        {submitted ? (
                            <SuccessView onClose={handleClose} />
                        ) : (
                            <>
                                <div className="px-6 pt-6 pb-4 border-b border-secondary">
                                    <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                        {isPrefillMode ? "Enquire About This Property" : "Add New Lead"}
                                    </AriaHeading>
                                    {isPrefillMode && propertyTitle ? (
                                        <p className="text-sm text-tertiary mt-0.5">
                                            Enquiry for <span className="text-secondary font-medium">{propertyTitle}</span>
                                        </p>
                                    ) : (
                                        <p className="text-sm text-tertiary mt-0.5">
                                            Manually create a lead record in the system.
                                        </p>
                                    )}
                                </div>

                                <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <Controller
                                            name="name"
                                            control={form.control}
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
                                            control={form.control}
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
                                        control={form.control}
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

                                    {!isPrefillMode && (
                                        <Controller
                                            name="type"
                                            control={form.control}
                                            rules={{ required: "Lead type is required" }}
                                            render={({ field: { value, onChange }, fieldState: { error } }) => (
                                                <Select
                                                    label="Lead Type"
                                                    placeholder="Select type…"
                                                    selectedKey={value}
                                                    onSelectionChange={(k) => onChange(k as LeadType)}
                                                    isInvalid={!!error}
                                                    hint={error?.message}
                                                    items={LEAD_TYPES}
                                                >
                                                    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                                </Select>
                                            )}
                                        />
                                    )}

                                    <Controller
                                        name="message"
                                        control={form.control}
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
                                                {error && <p className="text-xs text-error-primary">{error.message}</p>}
                                            </div>
                                        )}
                                    />

                                    <Controller
                                        name="marketingConsent"
                                        control={form.control}
                                        render={({ field: { value, onChange } }) => (
                                            <Checkbox
                                                isSelected={value}
                                                onChange={onChange}
                                                label="I agree to receive marketing communications from Landlord to Landlord"
                                                hint="You can unsubscribe at any time. We'll never share your data."
                                            />
                                        )}
                                    />

                                    <div className="flex justify-end gap-3 pt-2 border-t border-secondary">
                                        <Button color="secondary" size="md" type="button" onClick={handleClose}>
                                            Cancel
                                        </Button>
                                        <Button color="primary" size="md" type="submit" isLoading={createLead.isPending}>
                                            {isPrefillMode ? "Submit Enquiry" : "Create Lead"}
                                        </Button>
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
                </Dialog>
            </Modal>
        </ModalOverlay>
    );
}

function SuccessView({ onClose }: { onClose: () => void }) {
    return (
        <div className="p-8 flex flex-col items-center text-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-full bg-success-50">
                <CheckCircle className="size-6 text-success-600" />
            </div>
            <div className="space-y-1">
                <h3 className="text-md font-semibold text-primary">Enquiry Submitted</h3>
                <p className="text-sm text-tertiary">
                    Thank you! A member of our team will be in touch within 24 hours.
                </p>
            </div>
            <a
                href="#"
                className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#20bd5a] transition-colors"
                onClick={(e) => e.preventDefault()}
                aria-label="Message us on WhatsApp (link coming soon)"
            >
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.52 5.845L0 24l6.335-1.496A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.017-1.378l-.36-.214-3.732.881.935-3.626-.234-.373A9.818 9.818 0 1112 21.818z"/>
                </svg>
                Message us on WhatsApp
            </a>
            <button onClick={onClose} className="text-sm text-tertiary hover:text-secondary transition-colors">
                Close
            </button>
        </div>
    );
}
