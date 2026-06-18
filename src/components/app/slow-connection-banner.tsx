"use client";

import { useEffect, useState } from "react";
import { XClose } from "@untitledui/icons";
import { API_EVENTS } from "@/lib/api/events";

const DELAY_MS = 8000;

export function SlowConnectionBanner() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), DELAY_MS);

        const handleOnline = () => {
            clearTimeout(timer);
            setVisible(false);
        };

        window.addEventListener(API_EVENTS.ONLINE, handleOnline);

        return () => {
            clearTimeout(timer);
            window.removeEventListener(API_EVENTS.ONLINE, handleOnline);
        };
    }, []);

    if (!visible) return null;

    return (
        <div
            role="status"
            className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 flex items-center gap-3 rounded-xl bg-primary shadow-lg ring-1 ring-secondary px-4 py-3 text-sm text-secondary max-w-sm w-[calc(100vw-2rem)]"
        >
            <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-warning-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-warning-500" />
            </span>
            <p className="flex-1">
                Server is waking up — this may take 30–60 seconds on first visit.
                If loading persists beyond 2 minutes, please refresh.
            </p>
            <button
                onClick={() => setVisible(false)}
                aria-label="Dismiss"
                className="shrink-0 rounded-md p-0.5 text-quaternary transition-colors hover:bg-secondary hover:text-secondary"
            >
                <XClose className="h-4 w-4" />
            </button>
        </div>
    );
}
