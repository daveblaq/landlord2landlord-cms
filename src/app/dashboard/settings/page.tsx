"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "@/contexts/auth-context";
import { SidebarNavigationDefault } from "@/components/application/app-navigation/sidebar-navigation/sidebar-default";
import { ThemeToggle } from "@/components/application/app-navigation/base-components/theme-toggle";
import { DashboardHeader } from "@/components/application/page-headers/dashboard-header";
import { LogOut01, HomeLine, Building01, Users01, Settings01, Save01, Key01, Mail01, User01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { countriesOptions } from "@/utils/countries";
import { useUpdateProfile, useChangePassword } from "@/lib/api/profile";
import { toast } from "sonner";
import { IconNotification } from "@/components/application/notifications/notifications";
import type { NavItemType } from "@/components/application/app-navigation/config";

// Sidebar navigation config including Settings
const mainNavSections: Array<{ label: string; items: NavItemType[] }> = [
    {
        label: "Main",
        items: [
            {
                label: "Dashboard",
                href: "/dashboard",
                icon: HomeLine,
            },
            {
                label: "Properties",
                href: "/dashboard/properties",
                icon: Building01,
            },
            {
                label: "Leads",
                href: "/dashboard/leads",
                icon: Users01,
            },
            {
                label: "Settings",
                href: "/dashboard/settings",
                icon: Settings01,
            },
        ],
    },
];

// Validation schemas matching backend requirements
const profileSchema = yup.object().shape({
    fullname: yup.string().required("Full name is required").trim(),
    username: yup.string().required("Username must be at least 3 characters").min(3, "Username must be at least 3 characters").trim(),
    email: yup.string().required("Email is required").email("Invalid email address").trim(),
    country: yup.string().required("Country is required"),
});

const passwordSchema = yup.object().shape({
    currentPassword: yup.string().required("Current password is required"),
    newPassword: yup.string().required("New password is required").min(6, "New password must be at least 6 characters"),
    confirmPassword: yup
        .string()
        .required("Please confirm your new password")
        .oneOf([yup.ref("newPassword")], "New passwords do not match"),
});

export default function SettingsPage() {
    const pathname = usePathname();
    const { user, logout, refetchUser } = useAuth();
    
    // Mutations
    const updateProfileMutation = useUpdateProfile();
    const changePasswordMutation = useChangePassword();

    // Profile details form hook
    const {
        control: profileControl,
        handleSubmit: handleProfileSubmit,
        reset: resetProfile,
    } = useForm({
        resolver: yupResolver(profileSchema),
        defaultValues: {
            fullname: "",
            username: "",
            email: "",
            country: "US",
        },
    });

    // Password change form hook
    const {
        control: passwordControl,
        handleSubmit: handlePasswordSubmit,
        reset: resetPassword,
    } = useForm({
        resolver: yupResolver(passwordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    // Populate forms when user data is available
    useEffect(() => {
        if (user) {
            const foundCountry = countriesOptions.find(
                (c) => c.label?.toLowerCase() === user.country?.toLowerCase() || c.id === user.country
            );
            const countryCode = foundCountry ? foundCountry.id : (user.country || "US");

            resetProfile({
                fullname: user.fullname || "",
                username: user.username || "",
                email: user.email || "",
                country: countryCode,
            });
        }
    }, [user, resetProfile]);

    const onProfileSubmit = (data: yup.InferType<typeof profileSchema>) => {
        const countryLabel = countriesOptions.find((c) => c.id === data.country)?.label || data.country;

        updateProfileMutation.mutate(
            {
                fullname: data.fullname,
                username: data.username,
                email: data.email,
                country: countryLabel,
            },
            {
                onSuccess: () => {
                    refetchUser();
                    toast.custom((t) => (
                        <IconNotification
                            title="Profile Updated"
                            description="Your profile details have been successfully saved."
                            color="success"
                            onClose={() => toast.dismiss(t)}
                        />
                    ));
                },
                onError: (error) => {
                    toast.custom((t) => (
                        <IconNotification
                            title="Profile Update Failed"
                            description={error.message || "Something went wrong."}
                            color="error"
                            onClose={() => toast.dismiss(t)}
                        />
                    ));
                },
            }
        );
    };

    const onPasswordSubmit = (data: yup.InferType<typeof passwordSchema>) => {
        changePasswordMutation.mutate(
            {
                currentPassword: data.currentPassword,
                newPassword: data.newPassword,
            },
            {
                onSuccess: () => {
                    resetPassword();
                    toast.custom((t) => (
                        <IconNotification
                            title="Password Changed"
                            description="Your password has been successfully updated."
                            color="success"
                            onClose={() => toast.dismiss(t)}
                        />
                    ));
                },
                onError: (error) => {
                    toast.custom((t) => (
                        <IconNotification
                            title="Password Change Failed"
                            description={error.message || "Something went wrong."}
                            color="error"
                            onClose={() => toast.dismiss(t)}
                        />
                    ));
                },
            }
        );
    };

    return (
        <div className="flex flex-col lg:flex-row min-h-dvh bg-primary">
            {/* Sidebar */}
            <SidebarNavigationDefault
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

                <div className="flex-1 px-4 py-6 md:px-8 md:py-8 space-y-8 max-w-4xl">
                    {/* Page Title */}
                    <div>
                        <h1 className="text-xl font-semibold text-primary lg:text-display-xs">
                            Settings
                        </h1>
                        <p className="mt-1 text-sm text-tertiary">
                            Manage your profile details and security settings.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8">
                        {/* Profile details section */}
                        <section className="rounded-xl bg-primary shadow-xs ring-1 ring-secondary ring-inset overflow-hidden">
                            <div className="px-5 py-4 border-b border-secondary">
                                <h2 className="text-md font-semibold text-primary">Profile Details</h2>
                                <p className="text-xs text-tertiary mt-0.5">Update your personal information.</p>
                            </div>
                            <form onSubmit={handleProfileSubmit(onProfileSubmit)} className="p-5 space-y-4">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <Controller
                                        name="fullname"
                                        control={profileControl}
                                        render={({ field, fieldState: { error } }) => (
                                            <Input
                                                {...field}
                                                id="fullname"
                                                label="Full Name"
                                                placeholder="Olivia Rhye"
                                                icon={User01}
                                                isInvalid={!!error}
                                                hint={error?.message}
                                            />
                                        )}
                                    />
                                    <Controller
                                        name="username"
                                        control={profileControl}
                                        render={({ field, fieldState: { error } }) => (
                                            <Input
                                                {...field}
                                                id="username"
                                                label="Username"
                                                placeholder="oliviarhye"
                                                isInvalid={!!error}
                                                hint={error?.message}
                                            />
                                        )}
                                    />
                                </div>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <Controller
                                        name="email"
                                        control={profileControl}
                                        render={({ field, fieldState: { error } }) => (
                                            <Input
                                                {...field}
                                                id="email"
                                                type="email"
                                                label="Email Address"
                                                placeholder="olivia@example.com"
                                                icon={Mail01}
                                                isInvalid={!!error}
                                                hint={error?.message}
                                                isDisabled
                                            />
                                        )}
                                    />
                                    <Controller
                                        name="country"
                                        control={profileControl}
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
                                <div className="flex justify-end pt-2">
                                    <Button
                                        type="submit"
                                        color="primary"
                                        size="md"
                                        iconLeading={Save01}
                                        isDisabled={updateProfileMutation.isPending}
                                    >
                                        {updateProfileMutation.isPending ? "Saving..." : "Save Changes"}
                                    </Button>
                                </div>
                            </form>
                        </section>

                        {/* Security settings section */}
                        <section className="rounded-xl bg-primary shadow-xs ring-1 ring-secondary ring-inset overflow-hidden">
                            <div className="px-5 py-4 border-b border-secondary">
                                <h2 className="text-md font-semibold text-primary">Change Password</h2>
                                <p className="text-xs text-tertiary mt-0.5">Ensure your account is using a secure, unique password.</p>
                            </div>
                            <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="p-5 space-y-4">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                    <Controller
                                        name="currentPassword"
                                        control={passwordControl}
                                        render={({ field, fieldState: { error } }) => (
                                            <Input
                                                {...field}
                                                id="currentPassword"
                                                type="password"
                                                label="Current Password"
                                                placeholder="••••••••"
                                                icon={Key01}
                                                isInvalid={!!error}
                                                hint={error?.message}
                                            />
                                        )}
                                    />
                                    <Controller
                                        name="newPassword"
                                        control={passwordControl}
                                        render={({ field, fieldState: { error } }) => (
                                            <Input
                                                {...field}
                                                id="newPassword"
                                                type="password"
                                                label="New Password"
                                                placeholder="••••••••"
                                                icon={Key01}
                                                isInvalid={!!error}
                                                hint={error?.message}
                                            />
                                        )}
                                    />
                                    <Controller
                                        name="confirmPassword"
                                        control={passwordControl}
                                        render={({ field, fieldState: { error } }) => (
                                            <Input
                                                {...field}
                                                id="confirmPassword"
                                                type="password"
                                                label="Confirm New Password"
                                                placeholder="••••••••"
                                                icon={Key01}
                                                isInvalid={!!error}
                                                hint={error?.message}
                                            />
                                        )}
                                    />
                                </div>
                                <div className="flex justify-end pt-2">
                                    <Button
                                        type="submit"
                                        color="primary"
                                        size="md"
                                        iconLeading={Key01}
                                        isDisabled={changePasswordMutation.isPending}
                                    >
                                        {changePasswordMutation.isPending ? "Updating..." : "Update Password"}
                                    </Button>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}
