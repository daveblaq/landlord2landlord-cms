import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { RouteProvider } from "@/providers/router-provider";
import { Theme } from "@/providers/theme";
import "@/styles/globals.css";
import { cx } from "@/utils/cx";
import { QueryProvider } from "@/providers/query-provider";
import { AuthProvider } from "@/contexts/auth-context";
import { Toaster } from "@/components/application/notifications/toaster";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: "Landlord2Landlord CMS",
    description: "Landlord2Landlord CMS Dashboard",
};

export const viewport: Viewport = {
    themeColor: "#3185FC",
    colorScheme: "dark",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={cx(inter.variable, "bg-primary antialiased")}>
                <QueryProvider>
                    <Theme>
                        <AuthProvider>
                            <RouteProvider>
                                {children}
                                <Toaster />
                            </RouteProvider>
                        </AuthProvider>
                    </Theme>
                </QueryProvider>
            </body>
        </html>
    );
}
