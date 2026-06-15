import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Copy01, DownloadCloud02, Edit01, Trash01, X } from "@untitledui/icons";
import { ButtonUtility } from "./button-utility";
import { CloseButton } from "./close-button";


const meta = {
    title: "Components/Utility Buttons",
    component: ButtonUtility,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Free and open-source React utility button components built for modern applications and websites. These utility buttons are built using React Aria and styled with Tailwind CSS.",
            },
        },
    },
    tags: ["autodocs"],
    argTypes: {
        color: {
            control: "select",
            options: ["secondary", "tertiary"],
            description: "Button color variant",
        },
        size: {
            control: "select",
            options: ["xs", "sm"],
            description: "Button size variant",
        },
        isDisabled: {
            control: "boolean",
            description: "Disable the button",
        },
    },
} satisfies Meta<typeof ButtonUtility>;

export default meta;
type Story = Omit<StoryObj<typeof meta>, "args"> & {
    args?: Partial<React.ComponentProps<typeof ButtonUtility>>;
};

// Utility Button Example - Main docs content (hidden from sidebar, only shows in Docs tab)
export const UtilityButtonExample: Story = {
    render: () => (
        <div className="mt-10 space-y-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Utility Button Variants</h3>
                <div className="mb-7 max-w-lg space-y-2">
                    <p className="text-sm text-text-secondary">
                        Free and open-source React utility button components built for modern applications and websites. These utility buttons are built using
                        React Aria and styled with Tailwind CSS.
                    </p>
                </div>
                <div className="flex items-start gap-1">
                    <ButtonUtility size="sm" color="tertiary" tooltip="Copy" icon={Copy01} />
                    <ButtonUtility size="sm" color="tertiary" tooltip="Download" icon={DownloadCloud02} />
                    <ButtonUtility size="sm" color="tertiary" tooltip="Delete" icon={Trash01} />
                    <ButtonUtility size="sm" color="tertiary" tooltip="Edit" icon={Edit01} />
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Comprehensive examples of utility button variants.",
            },
        },
        // Hide from sidebar, only show in Docs tab
        docsOnly: true,
    },
};

export const Secondary: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Secondary</h3>
            <div className="flex items-start gap-3">
                <ButtonUtility size="sm" color="secondary" tooltip="Copy" icon={Copy01} />
                <ButtonUtility size="sm" color="secondary" tooltip="Download" icon={DownloadCloud02} />
                <ButtonUtility size="sm" color="secondary" tooltip="Delete" icon={Trash01} />
                <ButtonUtility size="sm" color="secondary" tooltip="Edit" icon={Edit01} />
            </div>
        </div>
    ),
};

export const Tertiary: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Tertiary</h3>
            <div className="flex items-start gap-1">
                <ButtonUtility size="sm" color="tertiary" tooltip="Copy" icon={Copy01} />
                <ButtonUtility size="sm" color="tertiary" tooltip="Download" icon={DownloadCloud02} />
                <ButtonUtility size="sm" color="tertiary" tooltip="Delete" icon={Trash01} />
                <ButtonUtility size="sm" color="tertiary" tooltip="Edit" icon={Edit01} />
            </div>
        </div>
    ),
};

export const Sizes: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Sizes</h3>
            <div className="flex flex-col gap-8">
                <div className="flex items-start gap-3">
                    <ButtonUtility size="xs" color="secondary" tooltip="Copy" icon={Copy01} />
                    <ButtonUtility size="xs" color="secondary" tooltip="Download" icon={DownloadCloud02} />
                    <ButtonUtility size="xs" color="secondary" tooltip="Delete" icon={Trash01} />
                    <ButtonUtility size="xs" color="secondary" tooltip="Edit" icon={Edit01} />
                </div>
                <div className="flex items-start gap-3">
                    <ButtonUtility size="sm" color="secondary" tooltip="Copy" icon={Copy01} />
                    <ButtonUtility size="sm" color="secondary" tooltip="Download" icon={DownloadCloud02} />
                    <ButtonUtility size="sm" color="secondary" tooltip="Delete" icon={Trash01} />
                    <ButtonUtility size="sm" color="secondary" tooltip="Edit" icon={Edit01} />
                </div>
            </div>
        </div>
    ),
};

export const Disabled: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Disabled</h3>
            <div className="flex items-start gap-3">
                <ButtonUtility isDisabled size="sm" color="secondary" tooltip="Copy" icon={Copy01} />
                <ButtonUtility isDisabled size="sm" color="secondary" tooltip="Download" icon={DownloadCloud02} />
                <ButtonUtility isDisabled size="sm" color="secondary" tooltip="Delete" icon={Trash01} />
                <ButtonUtility isDisabled size="sm" color="secondary" tooltip="Edit" icon={Edit01} />
            </div>
        </div>
    ),
};

export const CloseX: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Close X</h3>
            <div className="flex items-start gap-3">
                <CloseButton size="sm" theme="light" />
                <CloseButton size="md" theme="light" />
                <CloseButton size="lg" theme="light" />
            </div>
        </div>
    ),
};

export const CloseXDark: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Close X Dark</h3>
            <div className="mb-7 max-w-lg space-y-2">
                <p className="text-sm text-text-secondary">
                    The dark variant uses the tertiary color which provides a lighter appearance suitable for dark backgrounds.
                </p>
            </div>
            <div className="flex items-start gap-3">
                <CloseButton size="sm" theme="dark" />
                <CloseButton size="md" theme="dark" />
                <CloseButton size="lg" theme="dark" />
            </div>
        </div>
    ),
};