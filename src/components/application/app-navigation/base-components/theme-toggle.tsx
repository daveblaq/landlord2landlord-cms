"use client";

import { Moon01, Sun } from "@untitledui/icons";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Toggle } from "@/components/base/toggle/toggle";

interface ThemeToggleProps {
    /** When true the sidebar is collapsed — show only the icon, no label. */
    collapsed?: boolean;
}

export const ThemeToggle = ({ collapsed = false }: ThemeToggleProps) => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Avoid SSR mismatch — only render after mount
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    const isDark = theme === "dark";

    if (collapsed) {
        return (
            <button
                onClick={() => setTheme(isDark ? "light" : "dark")}
                aria-label="Toggle theme"
                className="flex h-9 w-9 items-center justify-center rounded-md text-fg-quaternary transition-colors duration-100 hover:bg-primary_hover hover:text-secondary"
            >
                {isDark ? (
                    <Sun className="size-4" />
                ) : (
                    <Moon01 className="size-4" />
                )}
            </button>
        );
    }

    return (
        <div className="flex items-center gap-3 rounded-md px-3 py-2">
            {isDark ? (
                <Moon01 className="size-4 shrink-0 text-fg-quaternary" />
            ) : (
                <Sun className="size-4 shrink-0 text-fg-quaternary" />
            )}
            <span className="flex-1 text-sm font-semibold text-secondary select-none">
                {isDark ? "Dark mode" : "Light mode"}
            </span>
            <Toggle
                size="sm"
                isSelected={isDark}
                onChange={(selected) => setTheme(selected ? "dark" : "light")}
                aria-label="Toggle dark mode"
            />
        </div>
    );
};
