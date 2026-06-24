"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
    SearchLg,
    Plus,
    Edit01,
    Trash01,
    Users03,
    User01,
    Mail01,
} from "@untitledui/icons";

import { useAuth } from "@/contexts/auth-context";
import { Table, TableCard } from "@/components/application/table/table";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { Toggle } from "@/components/base/toggle/toggle";
import { countriesOptions } from "@/utils/countries";
import {
    useConcierges,
    useCreateConcierge,
    useUpdateConcierge,
    useDeleteConcierge,
} from "@/lib/api/concierges";
import { toast } from "sonner";
import { IconNotification } from "@/components/application/notifications/notifications";
import type { User } from "@/lib/api/user";

// React Aria Modal Components
import { ModalOverlay, Modal, Dialog } from "@/components/application/modals/modal";
import { CloseButton } from "@/components/base/buttons/close-button";
import { Heading as AriaHeading } from "react-aria-components";

// Validation Schemas
const createSchema = yup.object().shape({
    fullname: yup.string().required("Full name is required").trim(),
    email: yup.string().required("Email is required").email("Invalid email address").trim(),
    country: yup.string().required("Country is required"),
});

const editSchema = yup.object().shape({
    fullname: yup.string().required("Full name is required").trim(),
    email: yup.string().required("Email is required").email("Invalid email address").trim(),
    country: yup.string().required("Country is required"),
    status: yup.boolean().required(),
});

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
            <div className="h-6 w-16 rounded-full bg-secondary_hover" />
        </Table.Cell>
        <Table.Cell>
            <div className="h-8 w-8 rounded bg-secondary_hover ml-auto" />
        </Table.Cell>
    </Table.Row>
);

export default function ConciergePage() {
    const router = useRouter();
    const { user, isLoading: authLoading } = useAuth();

    // Client-side role enforcement
    useEffect(() => {
        if (!authLoading && (!user || user.role !== "admin")) {
            router.replace("/dashboard");
        }
    }, [user, authLoading, router]);

    const [search, setSearch] = useState("");
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editingConcierge, setEditingConcierge] = useState<User | null>(null);
    const [conciergeToDelete, setConciergeToDelete] = useState<User | null>(null);

    // React Query Hooks
    const { data: concierges = [], isLoading, isError, refetch } = useConcierges({
        enabled: !!user && user.role === "admin",
    });

    const createMutation = useCreateConcierge();
    const updateMutation = useUpdateConcierge();
    const deleteMutation = useDeleteConcierge();

    // Form Hooks
    const {
        control: createControl,
        handleSubmit: handleCreateSubmit,
        reset: resetCreate,
    } = useForm({
        resolver: yupResolver(createSchema),
        defaultValues: {
            fullname: "",
            email: "",
            country: "GB",
        },
    });

    const {
        control: editControl,
        handleSubmit: handleEditSubmit,
        reset: resetEdit,
    } = useForm({
        resolver: yupResolver(editSchema),
        defaultValues: {
            fullname: "",
            email: "",
            country: "GB",
            status: true,
        },
    });

    // Populate Edit Form
    useEffect(() => {
        if (editingConcierge) {
            const foundCountry = countriesOptions.find(
                (c) => c.label?.toLowerCase() === editingConcierge.country?.toLowerCase() || c.id === editingConcierge.country
            );
            const countryCode = foundCountry ? foundCountry.id : (editingConcierge.country || "GB");

            resetEdit({
                fullname: editingConcierge.fullname || "",
                email: editingConcierge.email || "",
                country: countryCode,
                status: editingConcierge.status,
            });
        }
    }, [editingConcierge, resetEdit]);

    const onCreateSubmit = (data: yup.InferType<typeof createSchema>) => {
        const countryLabel = countriesOptions.find((c) => c.id === data.country)?.label || data.country;
        
        createMutation.mutate(
            {
                fullname: data.fullname,
                email: data.email,
                country: countryLabel,
            },
            {
                onSuccess: () => {
                    toast.custom((t) => (
                        <IconNotification
                            title="Concierge Created"
                            description="Account has been successfully created."
                            color="success"
                            onClose={() => toast.dismiss(t)}
                        />
                    ));
                    setIsCreateOpen(false);
                    resetCreate();
                    refetch();
                },
                onError: (err: any) => {
                    toast.custom((t) => (
                        <IconNotification
                            title="Creation Failed"
                            description={err.response?.data?.message || err.message || "Failed to create account."}
                            color="error"
                            onClose={() => toast.dismiss(t)}
                        />
                    ));
                },
            }
        );
    };

    const onEditSubmit = (data: yup.InferType<typeof editSchema>) => {
        if (!editingConcierge) return;
        const countryLabel = countriesOptions.find((c) => c.id === data.country)?.label || data.country;

        updateMutation.mutate(
            {
                id: editingConcierge._id || editingConcierge.id,
                data: {
                    fullname: data.fullname,
                    email: data.email,
                    country: countryLabel,
                    status: data.status,
                },
            },
            {
                onSuccess: () => {
                    toast.custom((t) => (
                        <IconNotification
                            title="Concierge Updated"
                            description="Account details updated successfully."
                            color="success"
                            onClose={() => toast.dismiss(t)}
                        />
                    ));
                    setEditingConcierge(null);
                    refetch();
                },
                onError: (err: any) => {
                    toast.custom((t) => (
                        <IconNotification
                            title="Update Failed"
                            description={err.response?.data?.message || err.message || "Failed to update account."}
                            color="error"
                            onClose={() => toast.dismiss(t)}
                        />
                    ));
                },
            }
        );
    };

    const toggleStatus = (concierge: User) => {
        updateMutation.mutate(
            {
                id: concierge._id || concierge.id,
                data: { status: !concierge.status },
            },
            {
                onSuccess: () => {
                    toast.custom((t) => (
                        <IconNotification
                            title="Status Toggled"
                            description={`Account status updated to ${!concierge.status ? 'Active' : 'Inactive'}.`}
                            color="success"
                            onClose={() => toast.dismiss(t)}
                        />
                    ));
                    refetch();
                },
                onError: (err: any) => {
                    toast.custom((t) => (
                        <IconNotification
                            title="Toggle Failed"
                            description={err.message || "Failed to toggle status."}
                            color="error"
                            onClose={() => toast.dismiss(t)}
                        />
                    ));
                },
            }
        );
    };

    const confirmDelete = () => {
        if (!conciergeToDelete) return;
        deleteMutation.mutate(conciergeToDelete._id || conciergeToDelete.id, {
            onSuccess: () => {
                toast.custom((t) => (
                    <IconNotification
                        title="Deleted"
                        description="Concierge account deleted successfully."
                        color="success"
                        onClose={() => toast.dismiss(t)}
                    />
                ));
                setConciergeToDelete(null);
                refetch();
            },
            onError: (err: any) => {
                toast.custom((t) => (
                    <IconNotification
                        title="Delete Failed"
                        description={err.message || "Failed to delete account."}
                        color="error"
                        onClose={() => toast.dismiss(t)}
                    />
                ));
            },
        });
    };

    // Client-side search filter
    const filteredConcierges = concierges.filter((c) => {
        const query = search.toLowerCase();
        return (
            c.fullname.toLowerCase().includes(query) ||
            c.email.toLowerCase().includes(query)
        );
    });

    if (authLoading || !user || user.role !== "admin") {
        return null; // Don't render anything while redirecting
    }

    return (
        <div className="flex-1 px-4 py-6 md:px-8 md:py-8 space-y-6">
                    {/* Page Title & CTA */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-secondary pb-5">
                        <div>
                            <h1 className="text-xl font-semibold text-primary lg:text-display-xs">
                                Concierge Management
                            </h1>
                            <p className="mt-1 text-sm text-tertiary">
                                {concierges.length} staff {concierges.length === 1 ? "account" : "accounts"} registered
                            </p>
                        </div>
                        <Button
                            color="primary"
                            size="md"
                            iconLeading={Plus}
                            onClick={() => setIsCreateOpen(true)}
                        >
                            Add Concierge
                        </Button>
                    </div>

                    {/* Filter bar */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center bg-secondary_subtle p-4 rounded-xl border border-secondary">
                        <div className="flex-1 max-w-sm">
                            <Input
                                icon={SearchLg}
                                type="text"
                                value={search}
                                onChange={setSearch}
                                placeholder="Search by name or email…"
                                size="md"
                            />
                        </div>
                    </div>

                    {/* Table View */}
                    <TableCard.Root>
                        <TableCard.Header
                            title="Concierge Accounts"
                            badge={String(filteredConcierges.length)}
                            description="Platform staff accounts responsible for leads management and listings triage"
                        />

                        {isError ? (
                            <div className="flex items-center justify-center py-20">
                                <p className="text-sm text-error-primary">Failed to load concierge accounts. Please try again.</p>
                            </div>
                        ) : (
                            <Table aria-label="Concierges table" selectionMode="none">
                                <Table.Header>
                                    <Table.Head label="Name / Contact" isRowHeader />
                                    <Table.Head label="Country" />
                                    <Table.Head label="Status" />
                                    <Table.Head label="" />
                                </Table.Header>

                                <Table.Body>
                                    {isLoading ? (
                                        Array.from({ length: 3 }).map((_, i) => <SkeletonRow key={i} id={`skeleton-${i}`} />)
                                    ) : filteredConcierges.length === 0 ? (
                                        <Table.Row>
                                            <Table.Cell colSpan={4}>
                                                <div className="flex flex-col items-center justify-center py-16 text-center">
                                                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-secondary">
                                                        <Users03 className="h-6 w-6" />
                                                    </div>
                                                    <h3 className="text-md font-semibold text-primary">No accounts found</h3>
                                                    <p className="mt-1 text-sm text-tertiary">Try adding a new concierge to the system.</p>
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    ) : (
                                        filteredConcierges.map((concierge) => (
                                            <Table.Row key={concierge.id || concierge._id}>
                                                <Table.Cell>
                                                    <div className="flex flex-col py-1">
                                                        <span className="text-sm font-semibold text-primary">{concierge.fullname}</span>
                                                        <span className="text-xs text-tertiary flex items-center gap-1 mt-0.5">
                                                            <Mail01 className="h-3 w-3 text-fg-quaternary" />
                                                            {concierge.email}
                                                        </span>
                                                    </div>
                                                </Table.Cell>


                                                <Table.Cell>
                                                    <span className="text-sm text-secondary font-medium">
                                                        {concierge.country || "N/A"}
                                                    </span>
                                                </Table.Cell>

                                                <Table.Cell>
                                                    <button onClick={() => toggleStatus(concierge)}>
                                                        <Badge color={concierge.status ? "success" : "gray"} size="sm" type="pill-color">
                                                            {concierge.status ? "Active" : "Inactive"}
                                                        </Badge>
                                                    </button>
                                                </Table.Cell>

                                                <Table.Cell>
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Button
                                                            color="secondary"
                                                            size="sm"
                                                            iconLeading={Edit01}
                                                            onClick={() => setEditingConcierge(concierge)}
                                                        >
                                                            Edit
                                                        </Button>

                                                        <Button
                                                            color="secondary-destructive"
                                                            size="sm"
                                                            iconLeading={Trash01}
                                                            onClick={() => setConciergeToDelete(concierge)}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </Table.Cell>
                                            </Table.Row>
                                        ))
                                    )}
                                </Table.Body>
                            </Table>
                        )}
                    </TableCard.Root>
            {/* Create Modal */}
            {isCreateOpen && (
                <ModalOverlay
                    isOpen={isCreateOpen}
                    onOpenChange={(open) => {
                        if (!open && !createMutation.isPending) setIsCreateOpen(false);
                    }}
                    isDismissable={!createMutation.isPending}
                >
                    <Modal>
                        <Dialog>
                            <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-primary shadow-xl border border-secondary text-left">
                                <CloseButton
                                    onClick={() => !createMutation.isPending && setIsCreateOpen(false)}
                                    theme="light"
                                    size="lg"
                                    className="absolute top-4 right-4"
                                />

                                <div className="px-6 pt-6 pb-4 border-b border-secondary">
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                                Add Concierge Account
                                            </AriaHeading>
                                            <p className="text-xs text-tertiary">
                                                Create credentials for new platform staff.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <form onSubmit={handleCreateSubmit(onCreateSubmit)}>
                                    <div className="p-6 space-y-4">
                                        <Controller
                                            name="fullname"
                                            control={createControl}
                                            render={({ field, fieldState: { error } }) => (
                                                <Input
                                                    {...field}
                                                    id="create-fullname"
                                                    label="Full Name"
                                                    placeholder="E.g. Jane Doe"
                                                    icon={User01}
                                                    isInvalid={!!error}
                                                    hint={error?.message}
                                                />
                                            )}
                                        />


                                        <Controller
                                            name="email"
                                            control={createControl}
                                            render={({ field, fieldState: { error } }) => (
                                                <Input
                                                    {...field}
                                                    id="create-email"
                                                    type="email"
                                                    label="Email Address"
                                                    placeholder="E.g. jane@l2landlords.com"
                                                    icon={Mail01}
                                                    isInvalid={!!error}
                                                    hint={error?.message}
                                                />
                                            )}
                                        />

                                        <Controller
                                            name="country"
                                            control={createControl}
                                            render={({ field: { value, onChange }, fieldState: { error } }) => (
                                                <Select
                                                    name="country"
                                                    label="Country"
                                                    selectedKey={value}
                                                    onSelectionChange={onChange}
                                                    isInvalid={!!error}
                                                    hint={error?.message}
                                                    items={countriesOptions}
                                                >
                                                    {(item) => (
                                                        <Select.Item id={item.id} icon={item.icon}>
                                                            {item.label}
                                                        </Select.Item>
                                                    )}
                                                </Select>
                                            )}
                                        />
                                    </div>

                                    <div className="flex justify-end gap-3 p-4 px-6 border-t border-secondary bg-secondary_subtle">
                                        <Button
                                            type="button"
                                            color="secondary"
                                            size="md"
                                            onClick={() => setIsCreateOpen(false)}
                                            isDisabled={createMutation.isPending}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            color="primary"
                                            size="md"
                                            isDisabled={createMutation.isPending}
                                        >
                                            {createMutation.isPending ? "Creating..." : "Create Account"}
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </Dialog>
                    </Modal>
                </ModalOverlay>
            )}

            {/* Edit Modal */}
            {editingConcierge && (
                <ModalOverlay
                    isOpen={!!editingConcierge}
                    onOpenChange={(open) => {
                        if (!open && !updateMutation.isPending) setEditingConcierge(null);
                    }}
                    isDismissable={!updateMutation.isPending}
                >
                    <Modal>
                        <Dialog>
                            <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-primary shadow-xl border border-secondary text-left">
                                <CloseButton
                                    onClick={() => !updateMutation.isPending && setEditingConcierge(null)}
                                    theme="light"
                                    size="lg"
                                    className="absolute top-4 right-4"
                                />

                                <div className="px-6 pt-6 pb-4 border-b border-secondary">
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                                Edit Concierge Account
                                            </AriaHeading>
                                            <p className="text-xs text-tertiary">
                                                Update details or status for staff account.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <form onSubmit={handleEditSubmit(onEditSubmit)}>
                                    <div className="p-6 space-y-4">
                                        <Controller
                                            name="fullname"
                                            control={editControl}
                                            render={({ field, fieldState: { error } }) => (
                                                <Input
                                                    {...field}
                                                    id="edit-fullname"
                                                    label="Full Name"
                                                    placeholder="E.g. Jane Doe"
                                                    icon={User01}
                                                    isInvalid={!!error}
                                                    hint={error?.message}
                                                />
                                            )}
                                        />


                                        <Controller
                                            name="email"
                                            control={editControl}
                                            render={({ field, fieldState: { error } }) => (
                                                <Input
                                                    {...field}
                                                    id="edit-email"
                                                    type="email"
                                                    label="Email Address"
                                                    placeholder="E.g. jane@l2landlords.com"
                                                    icon={Mail01}
                                                    isInvalid={!!error}
                                                    hint={error?.message}
                                                />
                                            )}
                                        />

                                        <Controller
                                            name="country"
                                            control={editControl}
                                            render={({ field: { value, onChange }, fieldState: { error } }) => (
                                                <Select
                                                    name="country"
                                                    label="Country"
                                                    selectedKey={value}
                                                    onSelectionChange={onChange}
                                                    isInvalid={!!error}
                                                    hint={error?.message}
                                                    items={countriesOptions}
                                                >
                                                    {(item) => (
                                                        <Select.Item id={item.id} icon={item.icon}>
                                                            {item.label}
                                                        </Select.Item>
                                                    )}
                                                </Select>
                                            )}
                                        />

                                        <Controller
                                            name="status"
                                            control={editControl}
                                            render={({ field: { value, onChange } }) => (
                                                <div className="flex items-center justify-between py-2 border-t border-secondary mt-4 pt-4">
                                                    <div className="flex flex-col gap-0.5">
                                                        <span className="text-sm font-semibold text-primary">Account Status</span>
                                                        <span className="text-xs text-tertiary">Allow staff access to the CMS dashboard</span>
                                                    </div>
                                                    <Toggle
                                                        isSelected={value}
                                                        onChange={onChange}
                                                    />
                                                </div>
                                            )}
                                        />
                                    </div>

                                    <div className="flex justify-end gap-3 p-4 px-6 border-t border-secondary bg-secondary_subtle">
                                        <Button
                                            type="button"
                                            color="secondary"
                                            size="md"
                                            onClick={() => setEditingConcierge(null)}
                                            isDisabled={updateMutation.isPending}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            color="primary"
                                            size="md"
                                            isDisabled={updateMutation.isPending}
                                        >
                                            {updateMutation.isPending ? "Saving..." : "Save Changes"}
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </Dialog>
                    </Modal>
                </ModalOverlay>
            )}

            {/* Delete Confirmation Modal */}
            {conciergeToDelete && (
                <ModalOverlay
                    isOpen={!!conciergeToDelete}
                    onOpenChange={(open) => {
                        if (!open) setConciergeToDelete(null);
                    }}
                    isDismissable={!deleteMutation.isPending}
                >
                    <Modal>
                        <Dialog>
                            <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-100 border border-secondary text-left">
                                <CloseButton
                                    onClick={() => !deleteMutation.isPending && setConciergeToDelete(null)}
                                    theme="light"
                                    size="lg"
                                    className="absolute top-3 right-3"
                                />
                                <div className="flex flex-col gap-4 px-4 pt-5 sm:px-6 sm:pt-6">
                                    <div className="z-10 flex flex-col gap-0.5">
                                        <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                            Delete concierge account
                                        </AriaHeading>
                                        <p className="text-sm text-tertiary">
                                            Are you sure you want to delete <span className="font-semibold text-primary">{conciergeToDelete.fullname}</span>? Standard dashboard access for this account will be revoked permanently.
                                        </p>
                                    </div>
                                </div>
                                <div className="z-10 flex flex-1 flex-col-reverse gap-3 p-4 pt-6 *:grow sm:grid sm:grid-cols-2 sm:px-6 sm:pt-8 sm:pb-6">
                                    <Button
                                        color="secondary"
                                        size="md"
                                        onClick={() => setConciergeToDelete(null)}
                                        isDisabled={deleteMutation.isPending}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        color="primary-destructive"
                                        size="md"
                                        onClick={confirmDelete}
                                        isDisabled={deleteMutation.isPending}
                                    >
                                        {deleteMutation.isPending ? "Deleting..." : "Delete"}
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
