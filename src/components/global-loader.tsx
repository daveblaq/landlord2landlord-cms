"use client";

import React from "react";
import { UntitledLogoMinimal } from "@/components/foundations/logo/untitledui-logo-minimal";

export function GlobalLoader() {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl transition-opacity duration-300">
            <div className="relative flex flex-col items-center gap-6">
                {/* Loader Animation */}
                <div className="relative h-20 w-20">
                    {/* Outer spinning ring */}
                    <div className="absolute inset-0 rounded-full border-2 border-brand-100 dark:border-gray-800"></div>
                    <div className="absolute inset-0 rounded-full border-2 border-t-brand-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>

                    {/* Inner pulsing circle */}
                    <div className="absolute inset-4 rounded-full bg-linear-to-br from-brand-600 to-brand-400 opacity-80 animate-pulse flex items-center justify-center p-2">
                        <UntitledLogoMinimal className="size-8" />
                    </div>
                </div>

                {/* Text */}
                <div className="relative flex flex-col items-center gap-1">
                    <span className="text-sm font-bold tracking-wider text-gray-900 dark:text-white uppercase">
                        Landlord2Landlord
                    </span>
                    <div className="flex items-center gap-1">
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                            Securing session
                        </span>
                        <span className="flex gap-0.5">
                            <span className="h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400 animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400 animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400 animate-bounce"></span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
