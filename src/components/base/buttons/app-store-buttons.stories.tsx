import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { AppGalleryButton, AppStoreButton, GalaxyStoreButton, GooglePlayButton } from "./app-store-buttons";
import { AppGalleryButton as AppGalleryButtonOutline, AppStoreButton as AppStoreButtonOutline, GalaxyStoreButton as GalaxyStoreButtonOutline, GooglePlayButton as GooglePlayButtonOutline } from "./app-store-buttons-outline";


const meta = {
    title: "Components/App Store Buttons",
    component: GooglePlayButton,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Free and open-source React mobile app store button components built for modern applications and websites. These mobile app store buttons are built using React Aria and styled with Tailwind CSS.",
            },
        },
    },
    tags: ["autodocs"],
    argTypes: {
        size: {
            control: "select",
            options: ["md", "lg"],
            description: "Button size",
        },
    },
} satisfies Meta<typeof GooglePlayButton>;

export default meta;
type Story = Omit<StoryObj<typeof meta>, "args"> & {
    args?: Partial<React.ComponentProps<typeof GooglePlayButton>>;
};

// App Store Button Example - Main docs content (hidden from sidebar, only shows in Docs tab)
export const AppStoreButtonExample: Story = {
    render: () => (
        <div className="mt-10 space-y-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">App Store Button Variants</h3>
                <div className="mb-7 max-w-lg space-y-2">
                    <p className="text-sm text-text-secondary">
                        Free and open-source React mobile app store button components built for modern applications and websites. These mobile app store buttons
                        are built using React Aria and styled with Tailwind CSS.
                    </p>
                </div>
                <div className="flex flex-col items-start gap-3 md:flex-row">
                    <GooglePlayButton size="md" />
                    <AppStoreButton size="md" />
                    <GalaxyStoreButton size="md" />
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Comprehensive examples of app store button variants.",
            },
        },
        // Hide from sidebar, only show in Docs tab
        docsOnly: true,
    },
};

export const GooglePlayButtons: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Google Play Buttons</h3>
            <div className="flex flex-col items-start gap-3 md:flex-row">
                <GooglePlayButton size="md" />
                <GooglePlayButton size="lg" />
            </div>
        </div>
    ),
};

export const AppStoreButtons: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">App Store Buttons</h3>
            <div className="flex flex-col items-start gap-3 md:flex-row">
                <AppStoreButton size="md" />
                <AppStoreButton size="lg" />
            </div>
        </div>
    ),
};

export const GalaxyStoreButtons: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Galaxy Store Buttons</h3>
            <div className="flex flex-col items-start gap-3 md:flex-row">
                <GalaxyStoreButton size="md" />
                <GalaxyStoreButton size="lg" />
            </div>
        </div>
    ),
};

export const AppGalleryButtons: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">App Gallery Buttons</h3>
            <div className="flex flex-col items-start gap-3 md:flex-row">
                <AppGalleryButton size="md" />
                <AppGalleryButton size="lg" />
            </div>
        </div>
    ),
};

export const GooglePlayOutlineButtons: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Google Play Outline Buttons</h3>
            <div className="flex flex-col items-start gap-3 md:flex-row">
                <GooglePlayButtonOutline size="md" />
                <GooglePlayButtonOutline size="lg" />
            </div>
        </div>
    ),
};

export const AppStoreOutlineButtons: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">App Store Outline Buttons</h3>
            <div className="flex flex-col items-start gap-3 md:flex-row">
                <AppStoreButtonOutline size="md" />
                <AppStoreButtonOutline size="lg" />
            </div>
        </div>
    ),
};

export const GalaxyStoreOutlineButtons: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Galaxy Store Outline Buttons</h3>
            <div className="flex flex-col items-start gap-3 md:flex-row">
                <GalaxyStoreButtonOutline size="md" />
                <GalaxyStoreButtonOutline size="lg" />
            </div>
        </div>
    ),
};

export const AppGalleryOutlineButtons: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">App Gallery Outline Buttons</h3>
            <div className="flex flex-col items-start gap-3 md:flex-row">
                <AppGalleryButtonOutline size="md" />
                <AppGalleryButtonOutline size="lg" />
            </div>
        </div>
    ),
};