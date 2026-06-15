import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Check, Copy01, Mail01, SearchLg } from "@untitledui/icons";
import { useClipboard } from "@/hooks/use-clipboard";
import { Button } from "../buttons/button";
import { NativeSelect } from "../select/select-native";
import { Input } from "./input";
import { InputBase } from "./input";
import { InputGroup } from "./input-group";
import { PaymentInput } from "./input-payment";

const meta = {
    title: "Components/Input",
    component: Input,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component: "Below are examples and variations of this input component:",
            },
        },
    },
    tags: ["autodocs"],
    argTypes: {
        size: {
            control: "select",
            options: ["sm", "md"],
            description: "Input size variant",
        },
        isDisabled: {
            control: "boolean",
            description: "Disable the input",
        },
        isRequired: {
            control: "boolean",
            description: "Make the input required",
        },
    },
} satisfies Meta<typeof Input>;

export default meta;
type Story = Omit<StoryObj<typeof meta>, "args"> & {
    args?: Partial<React.ComponentProps<typeof Input>>;
};

// Component wrapper for TrailingButton with state management
const TrailingButtonComponent = () => {
    const { copy, copied } = useClipboard();
    const [value, setValue] = useState<string>("");

    return (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Trailing Button</h3>
            <InputGroup
                isRequired
                label="Website"
                hint="This is a hint text to help user."
                trailingAddon={
                    <Button color="secondary" iconLeading={copied ? Check : Copy01} onClick={() => copy(value || "www.untitledui.com")}>
                        Copy
                    </Button>
                }
            >
                <InputBase value={value} onChange={setValue} placeholder="www.untitledui.com" tooltip="This is a tooltip" />
            </InputGroup>
        </div>
    );
};

// Input Example - Main docs content (hidden from sidebar, only shows in Docs tab)
export const InputExample: Story = {
    render: () => (
        <div className="mt-10 space-y-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Input Variants</h3>
                <div className="mb-7 max-w-lg space-y-2">
                    <p className="text-sm text-text-secondary">
                        Free and open-source React input field components built for modern applications and websites. These input fields are built using React
                        Aria and styled with Tailwind CSS.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    <Input isRequired label="Email" hint="This is a hint text to help user." placeholder="olivia@untitledui.com" tooltip="This is a tooltip" />
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Free and open-source React input field components built for modern applications and websites. These input fields are built using React Aria and styled with Tailwind CSS.",
            },
        },
        // Hide from sidebar, only show in Docs tab
        docsOnly: true,
    },
};

export const Default: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Default</h3>
            <Input isRequired label="Email" hint="This is a hint text to help user." placeholder="olivia@untitledui.com" tooltip="This is a tooltip" />
        </div>
    ),
};

export const Disabled: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Disabled</h3>
            <Input
                isRequired
                isDisabled
                label="Email"
                hint="This is a hint text to help user."
                placeholder="olivia@untitledui.com"
                tooltip="This is a tooltip"
            />
        </div>
    ),
};

export const Invalid: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Invalid</h3>
            <Input isRequired isInvalid label="Email" hint="This is an error message." placeholder="olivia@untitledui.com" tooltip="This is a tooltip" />
        </div>
    ),
};

export const Sizes: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Sizes</h3>
            <div className="flex flex-col gap-8">
                {/* Small */}
                <Input isRequired label="Email" hint="This is a hint text to help user." placeholder="olivia@untitledui.com" tooltip="This is a tooltip" />

                {/* Medium */}
                <Input
                    isRequired
                    size="md"
                    label="Email"
                    hint="This is a hint text to help user."
                    placeholder="olivia@untitledui.com"
                    tooltip="This is a tooltip"
                />
            </div>
        </div>
    ),
};

export const LeadingIcon: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Leading Icon</h3>
            <Input
                isRequired
                icon={Mail01}
                label="Email"
                hint="This is a hint text to help user."
                placeholder="olivia@untitledui.com"
                tooltip="This is a tooltip"
            />
        </div>
    ),
};

export const LeadingDropdown: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Leading Dropdown</h3>
            <InputGroup
                isRequired
                label="Phone number"
                hint="This is a hint text to help user."
                leadingAddon={
                    <NativeSelect
                        aria-label="Country"
                        options={[
                            { value: "US", label: "US" },
                            { value: "CA", label: "CA" },
                            { value: "EU", label: "EU" },
                        ]}
                    />
                }
            >
                <InputBase type="tel" placeholder="+1 (555) 000-0000" tooltip="This is a tooltip" />
            </InputGroup>
        </div>
    ),
};

export const TrailingDropdown: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Trailing Dropdown</h3>
            <InputGroup
                isRequired
                prefix="$"
                label="Phone number"
                hint="This is a hint text to help user."
                trailingAddon={
                    <NativeSelect
                        aria-label="Country"
                        options={[
                            { value: "US", label: "US" },
                            { value: "CA", label: "CA" },
                            { value: "EU", label: "EU" },
                        ]}
                    />
                }
            >
                <InputBase type="tel" placeholder="1,000.00" tooltip="This is a tooltip" />
            </InputGroup>
        </div>
    ),
};

export const LeadingText: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Leading Text</h3>
            <InputGroup isRequired label="Website" hint="This is a hint text to help user." leadingAddon={<InputGroup.Prefix>https://</InputGroup.Prefix>}>
                <InputBase placeholder="www.untitledui.com" tooltip="This is a tooltip" />
            </InputGroup>
        </div>
    ),
};

export const PaymentInputStory: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Payment Input</h3>
            <PaymentInput
                isRequired
                label="Card number"
                placeholder="1234 1234 1234 1234"
                hint="This is a hint text to help user."
                size="sm"
                tooltip="This is a tooltip"
            />
        </div>
    ),
};

export const TrailingButton: Story = {
    render: () => <TrailingButtonComponent />,
};
