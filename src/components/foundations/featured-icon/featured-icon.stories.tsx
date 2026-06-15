import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { CheckCircle, LayersTwo01 } from "@untitledui/icons";
import { FeaturedIcon } from "./featured-icon";


const meta = {
    title: "Components/Featured Icon",
    component: FeaturedIcon,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Free and open-source React featured icon components built for modern applications and websites. These featured icons are built using React Aria and styled with Tailwind CSS.",
            },
        },
    },
    tags: ["autodocs"],
    argTypes: {
        theme: {
            control: "select",
            options: ["light", "gradient", "dark", "outline", "modern", "modern-neue"],
            description: "Icon theme variant",
        },
        size: {
            control: "select",
            options: ["sm", "md", "lg", "xl"],
            description: "Icon size variant",
        },
        color: {
            control: "select",
            options: ["brand", "gray", "success", "warning", "error"],
            description: "Icon color variant",
        },
    },
} satisfies Meta<typeof FeaturedIcon>;

export default meta;
type Story = Omit<StoryObj<typeof meta>, "args"> & {
    args?: Partial<React.ComponentProps<typeof FeaturedIcon>>;
};

// Featured Icon Example - Main docs content (hidden from sidebar, only shows in Docs tab)
export const FeaturedIconExample: Story = {
    render: () => (
        <div className="mt-10 space-y-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Featured Icon Variants</h3>
                <div className="mb-7 max-w-lg space-y-2">
                    <p className="text-sm text-text-secondary">
                        Free and open-source React featured icon components built for modern applications and websites. These featured icons are built using
                        React Aria and styled with Tailwind CSS.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    <FeaturedIcon color="brand" icon={CheckCircle} theme="light" size="lg" />
                    <FeaturedIcon color="brand" icon={CheckCircle} theme="gradient" size="lg" />
                    <FeaturedIcon color="brand" icon={CheckCircle} theme="dark" size="lg" />
                    <FeaturedIcon color="gray" icon={CheckCircle} theme="modern" size="lg" />
                    <FeaturedIcon color="gray" icon={CheckCircle} theme="modern-neue" size="lg" />
                    <FeaturedIcon color="brand" icon={CheckCircle} theme="outline" size="lg" />
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Comprehensive examples of featured icon variants.",
            },
        },
        // Hide from sidebar, only show in Docs tab
        docsOnly: true,
    },
};

export const Light: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Light</h3>
            <div className="flex flex-wrap items-center gap-4">
                <FeaturedIcon color="brand" icon={CheckCircle} theme="light" size="md" />
            </div>
        </div>
    ),
};

export const Gradient: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Gradient</h3>
            <div className="flex flex-wrap items-center gap-4">
                <FeaturedIcon color="brand" icon={CheckCircle} theme="gradient" size="md" />
            </div>
        </div>
    ),
};

export const Dark: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Dark</h3>
            <div className="flex flex-wrap items-center gap-4">
                <FeaturedIcon color="brand" icon={CheckCircle} theme="dark" size="md" />
            </div>
        </div>
    ),
};

export const Outline: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Outline</h3>
            <div className="flex flex-wrap items-center gap-4">
                <FeaturedIcon color="brand" icon={CheckCircle} theme="outline" size="md" />
            </div>
        </div>
    ),
};

export const Modern: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Modern</h3>
            <div className="mb-7 max-w-lg space-y-2">
                <p className="text-sm text-text-secondary">The modern theme only supports the gray color variant.</p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
                <FeaturedIcon color="gray" icon={CheckCircle} theme="modern" size="md" />
            </div>
        </div>
    ),
};

export const ModernNeue: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Modern Neue</h3>
            <div className="mb-7 max-w-lg space-y-2">
                <p className="text-sm text-text-secondary">The modern neue theme only supports the gray color variant.</p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
                <FeaturedIcon color="gray" icon={CheckCircle} theme="modern-neue" size="md" />
            </div>
        </div>
    ),
};