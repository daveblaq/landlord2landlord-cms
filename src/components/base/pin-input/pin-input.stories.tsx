import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { PinInput } from "./pin-input";


const meta = {
    title: "Components/Verification Code Input",
    component: PinInput,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Free and open-source React verification code input components built for modern applications and websites. These verification code inputs are built using Input OTP and styled with Tailwind CSS.",
            },
        },
    },
    tags: ["autodocs"],
    argTypes: {
        size: {
            control: "select",
            options: ["sm", "md", "lg"],
            description: "Verification code input size variant",
        },
        disabled: {
            control: "boolean",
            description: "Disable the verification code input",
        },
    },
} satisfies Meta<typeof PinInput>;

export default meta;
type Story = Omit<StoryObj<typeof meta>, "args"> & {
    args?: Partial<React.ComponentProps<typeof PinInput>>;
};

// Verification Code Input Example - Main docs content (hidden from sidebar, only shows in Docs tab)
export const VerificationCodeInputExample: Story = {
    render: () => (
        <div className="mt-10 space-y-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Verification Code Input Examples</h3>
                <div className="mb-7 max-w-lg space-y-2">
                    <p className="text-sm text-text-secondary">
                        Free and open-source React verification code input components built for modern applications and websites. These verification code inputs
                        are built using Input OTP and styled with Tailwind CSS.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    <PinInput size="md">
                        <PinInput.Label>Secure code</PinInput.Label>
                        <PinInput.Group maxLength={6}>
                            <PinInput.Slot index={0} />
                            <PinInput.Slot index={1} />
                            <PinInput.Slot index={2} />
                            <PinInput.Separator />
                            <PinInput.Slot index={3} />
                            <PinInput.Slot index={4} />
                            <PinInput.Slot index={5} />
                        </PinInput.Group>
                        <PinInput.Description>This is a hint text to help user.</PinInput.Description>
                    </PinInput>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Comprehensive examples of verification code input variants.",
            },
        },
        // Hide from sidebar, only show in Docs tab
        docsOnly: true,
    },
};

export const FourDigits: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Four Digits</h3>
            <div className="mb-7 max-w-lg space-y-2">
                <p className="text-sm text-text-secondary">A standard verification code input with four digits. Users can enter a 4-digit verification code.</p>
            </div>
            <PinInput>
                <PinInput.Label>Secure code</PinInput.Label>
                <PinInput.Group maxLength={4}>
                    <PinInput.Slot index={0} />
                    <PinInput.Slot index={1} />
                    <PinInput.Slot index={2} />
                    <PinInput.Slot index={3} />
                </PinInput.Group>
                <PinInput.Description>This is a hint text to help user.</PinInput.Description>
            </PinInput>
        </div>
    ),
};

export const WithSeparator: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">With Separator</h3>
            <div className="mb-7 max-w-lg space-y-2">
                <p className="text-sm text-text-secondary">
                    A verification code input with separators between digits for better visual separation and readability.
                </p>
            </div>
            <PinInput size="md">
                <PinInput.Label>Secure code</PinInput.Label>
                <PinInput.Group maxLength={6}>
                    <PinInput.Slot index={0} />
                    <PinInput.Slot index={1} />
                    <PinInput.Slot index={2} />
                    <PinInput.Separator />
                    <PinInput.Slot index={3} />
                    <PinInput.Slot index={4} />
                    <PinInput.Slot index={5} />
                </PinInput.Group>
                <PinInput.Description>This is a hint text to help user.</PinInput.Description>
            </PinInput>
        </div>
    ),
};

export const Disabled: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Disabled</h3>
            <div className="mb-7 max-w-lg space-y-2">
                <p className="text-sm text-text-secondary">
                    A disabled verification code input that cannot be interacted with. This is useful when the input should be temporarily unavailable.
                </p>
            </div>
            <PinInput disabled>
                <PinInput.Label>Secure code</PinInput.Label>
                <PinInput.Group maxLength={4}>
                    <PinInput.Slot index={0} />
                    <PinInput.Slot index={1} />
                    <PinInput.Slot index={2} />
                    <PinInput.Slot index={3} />
                </PinInput.Group>
                <PinInput.Description>This is a hint text to help user.</PinInput.Description>
            </PinInput>
        </div>
    ),
};

export const Sizes: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Sizes</h3>
            <div className="mb-7 max-w-lg space-y-2">
                <p className="text-sm text-text-secondary">
                    Verification code inputs are available in three sizes: small, medium, and large. Choose the size that best fits your design.
                </p>
            </div>
            <div className="flex flex-col gap-8">
                <PinInput size="sm">
                    <PinInput.Label>Secure code</PinInput.Label>
                    <PinInput.Group maxLength={4}>
                        <PinInput.Slot index={0} />
                        <PinInput.Slot index={1} />
                        <PinInput.Slot index={2} />
                        <PinInput.Slot index={3} />
                    </PinInput.Group>
                    <PinInput.Description>This is a hint text to help user.</PinInput.Description>
                </PinInput>

                <PinInput size="md">
                    <PinInput.Label>Secure code</PinInput.Label>
                    <PinInput.Group maxLength={4}>
                        <PinInput.Slot index={0} />
                        <PinInput.Slot index={1} />
                        <PinInput.Slot index={2} />
                        <PinInput.Slot index={3} />
                    </PinInput.Group>
                    <PinInput.Description>This is a hint text to help user.</PinInput.Description>
                </PinInput>

                <PinInput size="lg">
                    <PinInput.Label>Secure code</PinInput.Label>
                    <PinInput.Group maxLength={4}>
                        <PinInput.Slot index={0} />
                        <PinInput.Slot index={1} />
                        <PinInput.Slot index={2} />
                        <PinInput.Slot index={3} />
                    </PinInput.Group>
                    <PinInput.Description>This is a hint text to help user.</PinInput.Description>
                </PinInput>
            </div>
        </div>
    ),
};