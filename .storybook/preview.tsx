import React from "react";
import { withThemeByClassName } from "@storybook/addon-themes";
import type { Preview } from "@storybook/react-vite";
import "@/styles/globals.css";
import "./preview.css";

// Load Inter font for Storybook (since next/font/google doesn't work in Storybook)
if (typeof document !== "undefined") {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap";
    if (!document.head.querySelector('link[href*="fonts.googleapis.com/css2?family=Inter"]')) {
        document.head.appendChild(link);
    }
}

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },

        a11y: {
            // 'todo' - show a11y violations in the test UI only
            // 'error' - fail CI on a11y violations
            // 'off' - skip a11y checks entirely
            test: "todo",
        },

        themes: {
            default: "light",
            list: [
                { name: "light", class: "", color: "#ffffff" },
                { name: "dark", class: "dark-mode", color: "#0a0a0a" },
            ],
        },
    },

    decorators: [
        withThemeByClassName({
            themes: {
                light: "",
                dark: "dark-mode",
            },
            defaultTheme: "light",
            parentSelector: "html", // Apply theme to the entire page
        }),
        (Story) => (
            <div className="bg-primary" style={{ minHeight: "100vh", padding: "2rem" }}>
                <Story />
            </div>
        ),
    ],
};

export default preview;
