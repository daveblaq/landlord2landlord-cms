import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Toggle } from "./toggle";


const meta = {
    title: "Components/Toggle",
    component: Toggle,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component: "Below are examples and variations of this toggle component:",
            },
        },
    },
    tags: ["autodocs"],
    argTypes: {
        size: {
            control: "select",
            options: ["sm", "md"],
            description: "Toggle size variant",
        },
        slim: {
            control: "boolean",
            description: "Use slim variant",
        },
        isDisabled: {
            control: "boolean",
            description: "Disable the toggle",
        },
        isSelected: {
            control: "boolean",
            description: "Toggle selected state",
        },
        label: {
            control: "text",
            description: "Toggle label text",
        },
        hint: {
            control: "text",
            description: "Toggle hint text",
        },
    },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = Omit<StoryObj<typeof meta>, "args"> & {
    args?: Partial<React.ComponentProps<typeof Toggle>>;
};

// Toggle Example - Main docs content (hidden from sidebar, only shows in Docs tab)
export const ToggleExample: Story = {
    render: () => (
        <div className="mt-10 space-y-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Toggle Variants</h3>
                <div className="mb-7 max-w-lg space-y-2">
                    <p className="text-sm text-text-secondary">
                        Free and open-source React toggle field components built for modern applications and websites. These toggle fields are built using React
                        Aria and styled with Tailwind CSS.
                    </p>
                </div>
                <div className="flex flex-col gap-4">
                    <Toggle label="Remember me" hint="Save my login details for next time." size="sm" />
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Comprehensive examples of toggle variants, sizes, and states.",
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
            <div className="flex flex-col gap-4">
                <Toggle size="sm" />
            </div>
        </div>
    ),
};

export const WithLabel: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">With Label</h3>
            <div className="flex flex-col gap-4">
                <Toggle label="Remember me" size="sm" />
            </div>
        </div>
    ),
};

export const WithLabelAndHint: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">With Label and Hint</h3>
            <div className="flex flex-col gap-4">
                <Toggle label="Remember me" hint="Save my login details for next time." size="sm" />
            </div>
        </div>
    ),
};

export const Disabled: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Disabled</h3>
            <div className="flex flex-col gap-4">
                <Toggle isDisabled label="Remember me" hint="Save my login details for next time." size="sm" />
            </div>
        </div>
    ),
};

export const Sizes: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Sizes</h3>
            <div className="flex flex-col gap-4">
                <Toggle label="Remember me" hint="Save my login details for next time." size="sm" />
                <Toggle label="Remember me" hint="Save my login details for next time." size="md" />
            </div>
        </div>
    ),
};

export const Slim: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Slim</h3>
            <div className="flex flex-col gap-4">
                <Toggle slim size="sm" />
            </div>
        </div>
    ),
};

export const SlimWithLabelAndHint: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Slim with Label and Hint</h3>
            <div className="flex flex-col gap-4">
                <Toggle slim label="Remember me" hint="Save my login details for next time." size="sm" />
            </div>
        </div>
    ),
};