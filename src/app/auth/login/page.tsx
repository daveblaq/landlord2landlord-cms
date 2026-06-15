"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Mail01, Lock01 } from "@untitledui/icons";

import { login as loginApi, LoginData } from "@/lib/api/auth";
import { useAuth } from "@/contexts/auth-context";
import { Input } from "@/components/base/input/input";
import { Button } from "@/components/base/buttons/button";
import { IconNotification } from "@/components/application/notifications/notifications";
import { UntitledLogoMinimal } from "@/components/foundations/logo/untitledui-logo-minimal";

// Define Yup validation schema
const loginSchema = yup.object().shape({
    email: yup
        .string()
        .required("Email address is required")
        .email("Please enter a valid email address"),
    password: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
});

export default function LoginPage() {
    const router = useRouter();
    const { login: saveSession } = useAuth();

    // Setup react-hook-form with Yup resolver
    const {
        control,
        handleSubmit
    } = useForm<LoginData>({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    // Setup react-query login mutation
    const loginMutation = useMutation({
        mutationFn: loginApi,
        onSuccess: async (response) => {
            const { token, user } = response.data;

            // Trigger Sonner success toast
            toast.custom((t) => (
                <IconNotification
                    title="Welcome Back!"
                    description="Authentication was successful. Redirecting you..."
                    color="success"
                    onClose={() => toast.dismiss(t)}
                />
            ));

            // Save session (token & user data) and get dashboard redirect path
            const redirectPath = await saveSession(token, user);
            router.push(redirectPath);
        },
        onError: (error: any) => {
            const errorMessage = error.response?.data?.message || error.message || "Invalid credentials. Please try again.";
            
            // Trigger Sonner error toast
            toast.custom((t) => (
                <IconNotification
                    title="Login Failed"
                    description={errorMessage}
                    color="error"
                    onClose={() => toast.dismiss(t)}
                />
            ));
        }
    });

    // Form submit handler
    const onSubmit = (data: LoginData) => {
        loginMutation.mutate(data);
    };

    return (
        <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-primary px-4 py-12 sm:px-6 lg:px-8">
            {/* Background Aesthetic Glows */}
            <div className="absolute top-1/4 left-1/4 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/10 blur-3xl" />
            <div className="absolute right-1/4 bottom-1/4 h-[250px] w-[250px] translate-x-1/2 translate-y-1/2 rounded-full bg-brand-300/10 blur-3xl" />

            <div className="relative z-10 w-full max-w-md">
                {/* Branding Logo */}
                <div className="flex flex-col items-center gap-4 text-center">
                    <div className="flex size-14 items-center justify-center rounded-xl border border-secondary bg-primary shadow-xs">
                        <UntitledLogoMinimal className="size-6 text-brand-solid" />
                    </div>
                    <div>
                        <h2 className="text-display-xs font-semibold text-primary">
                            Sign in to Landlord2Landlord
                        </h2>
                        <p className="mt-1.5 text-sm text-tertiary">
                            Enter your credentials to access the concierge dashboard
                        </p>
                    </div>
                </div>

                {/* Login Form Card */}
                <div className="mt-8 rounded-2xl border border-secondary bg-primary_alt p-6 shadow-lg backdrop-blur-md xs:p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                        {/* Email Input via Controller */}
                        <Controller
                            control={control}
                            name="email"
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <Input
                                    size="lg"
                                    label="Email Address"
                                    type="email"
                                    placeholder="you@example.com"
                                    icon={Mail01}
                                    value={value}
                                    onChange={onChange}
                                    isInvalid={!!error}
                                    hint={error?.message}
                                />
                            )}
                        />

                        {/* Password Input via Controller */}
                        <Controller
                            control={control}
                            name="password"
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <Input
                                    size="lg"
                                    label="Password"
                                    type="password"
                                    placeholder="••••••••"
                                    icon={Lock01}
                                    value={value}
                                    onChange={onChange}
                                    isInvalid={!!error}
                                    hint={error?.message}
                                />
                            )}
                        />

                        {/* Submit Button */}
                        <div className="mt-2">
                            <Button
                                type="submit"
                                size="lg"
                                className="w-full"
                                isLoading={loginMutation.isPending}
                                isDisabled={loginMutation.isPending}
                            >
                                Sign in
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Footer Notes */}
                <p className="mt-6 text-center text-xs text-quaternary">
                    Authorized personnel only. Sessions are audited and logged.
                </p>
            </div>
        </div>
    );
}
