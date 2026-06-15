import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Zap } from "@untitledui/icons";
import { HeaderNavigationBase } from "./header-navigation";
import { Button } from "@/components/base/buttons/button";

const meta = {
    title: "Application/Header Navigation",
    component: HeaderNavigationBase,
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component: "Header navigation components for application layouts with simple and dual-tier variants.",
            },
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof HeaderNavigationBase>;

export default meta;
type Story = StoryObj<typeof HeaderNavigationBase>;



// Header Navigation Examples - Main docs content
export const HeaderNavigationExamples: Story = {
    render: () => (
        <HeaderNavigationBase
            items={[
                { label: "Home", href: "/" },
                {
                    label: "Dashboard",
                    href: "/dashboard",
                    current: true,
                    items: [
                        { label: "Overview", href: "#", current: true },
                        { label: "Notifications", href: "#" },
                        { label: "Analytics", href: "#" },
                        { label: "Saved reports", href: "#" },
                        { label: "Scheduled reports", href: "#" },
                        { label: "User reports", href: "#" },
                    ],
                },
                { label: "Projects", href: "/projects" },
                { label: "Tasks", href: "/tasks" },
                { label: "Reporting", href: "/reporting" },
                { label: "Users", href: "/users" },
            ]}
            trailingContent={
                <Button iconLeading={Zap} color="secondary" size="sm">
                    Upgrade now
                </Button>
            }
        />
    ),
};

// Simple variant
export const Simple: Story = {
    render: () => (
        <HeaderNavigationBase
        items={[
            { label: "Home", href: "/" },
            {
                label: "Dashboard",
                href: "/dashboard",
                items: [
                    { label: "Overview", href: "#", current: true },
                    { label: "Notifications", href: "#" },
                    { label: "Analytics", href: "#" },
                    { label: "Saved reports", href: "#" },
                    { label: "Scheduled reports", href: "#" },
                    { label: "User reports", href: "#" },
                ],
            },
            { label: "Projects", href: "/projects" },
            { label: "Tasks", href: "/tasks" },
            { label: "Reporting", href: "/reporting" },
            { label: "Users", href: "/users" },
        ]}
    />
    ),
};

// Dual-tier variant
export const DualTier: Story = {
    render: () => (
        <HeaderNavigationBase
            items={[
                { label: "Home", href: "/" },
                {
                    label: "Dashboard",
                    href: "/dashboard",
                    current: true,
                    items: [
                        { label: "Overview", href: "#", current: true },
                        { label: "Notifications", href: "#" },
                        { label: "Analytics", href: "#" },
                        { label: "Saved reports", href: "#" },
                        { label: "Scheduled reports", href: "#" },
                        { label: "User reports", href: "#" },
                    ],
                },
                { label: "Projects", href: "/projects" },
                { label: "Tasks", href: "/tasks" },
                { label: "Reporting", href: "/reporting" },
                { label: "Users", href: "/users" },
            ]}
            trailingContent={
                <Button iconLeading={Zap} color="secondary" size="sm">
                    Upgrade now
                </Button>
            }
        />
    ),
};

