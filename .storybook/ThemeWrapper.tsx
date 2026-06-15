"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

export const ThemeWrapper = ({ 
    children, 
    storybookTheme 
}: { 
    children: React.ReactNode;
    storybookTheme?: string;
}) => {
    const { setTheme, theme } = useTheme();

    useEffect(() => {
        if (storybookTheme && storybookTheme !== theme) {
            setTheme(storybookTheme);
        }
    }, [storybookTheme, setTheme, theme]);

    return <>{children}</>;
};

