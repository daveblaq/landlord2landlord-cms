import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { RadioButton, RadioGroup } from "./radio-buttons";


const meta = {
    title: "Components/Radio Buttons",
    component: RadioGroup,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Free and open-source React radio button components built for modern applications and websites. These radio buttons are built using React Aria and styled with Tailwind CSS.",
            },
        },
    },
    tags: ["autodocs"],
    argTypes: {
        size: {
            control: "select",
            options: ["sm", "md"],
            description: "Radio button size variant",
        },
        isDisabled: {
            control: "boolean",
            description: "Disable the entire radio group",
        },
    },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = Omit<StoryObj<typeof meta>, "args"> & {
    args?: Partial<React.ComponentProps<typeof RadioGroup>>;
};

// Radio Button Example - Main docs content (hidden from sidebar, only shows in Docs tab)
export const RadioButtonExample: Story = {
    render: () => (
        <div className="mt-10 space-y-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Radio Button Variants</h3>
                <div className="mb-7 max-w-lg space-y-2">
                    <p className="text-sm text-text-secondary">
                        Free and open-source React radio button components built for modern applications and websites. These radio buttons are built using React
                        Aria and styled with Tailwind CSS.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    <RadioGroup aria-label="Pricing plans" defaultValue="basic">
                        <RadioButton label="Basic plan" hint="Up to 10 users and 20 GB data." value="basic" />
                        <RadioButton label="Business plan" hint="Up to 20 users and 40 GB data." value="business" />
                        <RadioButton label="Enterprise plan" hint="Unlimited users and unlimited data." value="enterprise" />
                    </RadioGroup>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Comprehensive examples of radio button variants, sizes, and states.",
            },
        },
        // Hide from sidebar, only show in Docs tab
        docsOnly: true,
    },
};

export const WithLabel: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">With Label</h3>
            <RadioGroup aria-label="Pricing plans" defaultValue="basic">
                <RadioButton label="Basic plan" value="basic" />
                <RadioButton label="Business plan" value="business" />
                <RadioButton label="Enterprise plan" value="enterprise" />
            </RadioGroup>
        </div>
    ),
};

export const WithLabelAndHint: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">With Label and Hint</h3>
            <RadioGroup aria-label="Pricing plans" defaultValue="basic">
                <RadioButton label="Basic plan" hint="Up to 10 users and 20 GB data." value="basic" />
                <RadioButton label="Business plan" hint="Up to 20 users and 40 GB data." value="business" />
                <RadioButton label="Enterprise plan" hint="Unlimited users and unlimited data." value="enterprise" />
            </RadioGroup>
        </div>
    ),
};

export const Disabled: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Disabled</h3>
            <RadioGroup aria-label="Pricing plans" isDisabled defaultValue="basic">
                <RadioButton label="Basic plan" hint="Up to 10 users and 20 GB data." value="basic" />
                <RadioButton label="Business plan" hint="Up to 20 users and 40 GB data." value="business" />
                <RadioButton label="Enterprise plan" hint="Unlimited users and unlimited data." value="enterprise" />
            </RadioGroup>
        </div>
    ),
};

export const DisabledIndividualOption: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Disabled Individual Option</h3>
            <RadioGroup aria-label="Pricing plans" defaultValue="basic">
                <RadioButton label="Basic plan" hint="Up to 10 users and 20 GB data." value="basic" />
                <RadioButton label="Business plan" hint="Up to 20 users and 40 GB data." value="business" />
                <RadioButton isDisabled label="Enterprise plan" hint="Unlimited users and unlimited data." value="enterprise" />
            </RadioGroup>
        </div>
    ),
};

export const Sizes: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Sizes</h3>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <RadioGroup aria-label="Pricing plans" defaultValue="basic">
                    <RadioButton label="Basic plan" hint="Up to 10 users and 20 GB data." value="basic" />
                    <RadioButton label="Business plan" hint="Up to 20 users and 40 GB data." value="business" />
                    <RadioButton label="Enterprise plan" hint="Unlimited users and unlimited data." value="enterprise" />
                </RadioGroup>
                <RadioGroup aria-label="Pricing plans" defaultValue="basic" size="md">
                    <RadioButton label="Basic plan" hint="Up to 10 users and 20 GB data." value="basic" />
                    <RadioButton label="Business plan" hint="Up to 20 users and 40 GB data." value="business" />
                    <RadioButton label="Enterprise plan" hint="Unlimited users and unlimited data." value="enterprise" />
                </RadioGroup>
            </div>
        </div>
    ),
};