"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { API_EVENTS } from "@/lib/api/events";

export function AuthHandler() {
    const router = useRouter();

    useEffect(() => {
        const handleAuthExpired = () => {
            router.replace("/auth/login");
        };

        window.addEventListener(API_EVENTS.AUTH_EXPIRED, handleAuthExpired);
        return () => window.removeEventListener(API_EVENTS.AUTH_EXPIRED, handleAuthExpired);
    }, [router]);

    return null;
}
