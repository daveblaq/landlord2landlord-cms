import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "./checkbox";


const meta = {
    title: "Components/Checkbox",
    component: Checkbox,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Free and open-source React checkbox components built for modern applications and websites. These checkboxes are built using React Aria and styled with Tailwind CSS.",
            },
        },
    },
    tags: ["autodocs"],
    argTypes: {
        size: {
            control: "select",
            options: ["sm", "md"],
            description: "Checkbox size variant",
        },
        isDisabled: {
            control: "boolean",
            description: "Disable the checkbox",
        },
        isSelected: {
            control: "boolean",
            description: "Whether the checkbox is selected",
        },
        isIndeterminate: {
            control: "boolean",
            description: "Whether the checkbox is in indeterminate state",
        },
    },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = Omit<StoryObj<typeof meta>, "args"> & {
    args?: Partial<React.ComponentProps<typeof Checkbox>>;
};

// Checkbox Example - Main docs content (hidden from sidebar, only shows in Docs tab)
export const CheckboxExample: Story = {
    render: () => (
        <div className="mt-10 space-y-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Checkbox Variants</h3>
                <div className="mb-7 max-w-lg space-y-2">
                    <p className="text-sm text-text-secondary">
                        Free and open-source React checkbox components built for modern applications and websites. These checkboxes are built using React Aria
                        and styled with Tailwind CSS.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    <Checkbox label="Remember me" hint="Save my login details for next time." size="sm" />
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Comprehensive examples of checkbox variants, sizes, and states.",
            },
        },
        // Hide from sidebar, only show in Docs tab
        docsOnly: true,
    },
};

export const Base: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Base</h3>
            <Checkbox size="sm" />
        </div>
    ),
};

export const WithLabel: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">With Label</h3>
            <Checkbox label="Remember me" size="sm" />
        </div>
    ),
};

export const WithLabelAndHint: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">With Label and Hint</h3>
            <Checkbox label="Remember me" hint="Save my login details for next time." size="sm" />
        </div>
    ),
};

export const Disabled: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Disabled</h3>
            <Checkbox isDisabled label="Remember me" hint="Save my login details for next time." size="sm" />
        </div>
    ),
};

export const Sizes: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Sizes</h3>
            <div className="flex flex-col gap-8">
                <Checkbox label="Remember me" hint="Save my login details for next time." size="sm" />
                <Checkbox label="Remember me" hint="Save my login details for next time." size="md" />
            </div>
        </div>
    ),
};