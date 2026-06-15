import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { GradientScan, QRCode } from "./qr-code";


const meta = {
    title: "Components/QR Code",
    component: QRCode,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Free and open-source React QR code components built for modern applications and websites. This component is built using QR Code Styling library and styled with Tailwind CSS.",
            },
        },
    },
    tags: ["autodocs"],
    argTypes: {
        value: {
            control: "text",
            description: "The value to encode in the QR code",
        },
        size: {
            control: "select",
            options: ["md", "lg"],
            description: "QR code size variant",
        },
    },
} satisfies Meta<typeof QRCode>;

export default meta;
type Story = Omit<StoryObj<typeof meta>, "args"> & {
    args?: Partial<React.ComponentProps<typeof QRCode>>;
};

// QR Code Example - Main docs content (hidden from sidebar, only shows in Docs tab)
export const QRCodeExample: Story = {
    render: () => (
        <div className="mt-10 space-y-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">QR Code Variants</h3>
                <div className="mb-7 max-w-lg space-y-2">
                    <p className="text-sm text-text-secondary">
                        Free and open-source React QR code components built for modern applications and websites. This component is built using QR Code Styling
                        library and styled with Tailwind CSS.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    <QRCode value="https://www.untitledui.com/" size="lg" />
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Comprehensive examples of QR code variants.",
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
            <div className="mb-7 max-w-lg space-y-2">
                <p className="text-sm text-text-secondary">
                    In order to use the default QR code, you can simply import the component and pass the value you want to encode in the QR code via the value
                    prop.
                </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
                <QRCode value="https://www.untitledui.com/" size="md" />
            </div>
        </div>
    ),
};

export const Large: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Large</h3>
            <div className="mb-7 max-w-lg space-y-2">
                <p className="text-sm text-text-secondary">
                    You can change the size of the QR code by passing the size prop. For example, to use a large QR code, you can pass size="lg" to the
                    component.
                </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
                <QRCode value="https://www.untitledui.com/" size="lg" />
            </div>
        </div>
    ),
};

export const WithGradientScan: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">With Gradient Scan</h3>
            <div className="mb-7 max-w-lg space-y-2">
                <p className="text-sm text-text-secondary">
                    You can add a gradient scan effect to the QR code by passing using the GradientScan component together with the QRCode component.
                </p>
            </div>
            <div className="relative flex aspect-square w-full max-w-60 items-center justify-center">
                <QRCode value="https://www.untitledui.com/" size="md" />
                <GradientScan />
            </div>
        </div>
    ),
};

export const WithCustomOptions: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">With Custom Options</h3>
            <div className="mb-7 max-w-lg space-y-2">
                <p className="text-sm text-text-secondary">
                    The QR code component is built using QR Code Styling library, which provides a lot of customization options. For example, to add an image to
                    the QR code, you can pass your image URL to the options.image. To see the full list of options, please refer to the QR Code Styling
                    documentation.
                </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
                <QRCode
                    value="https://untitledui.com"
                    options={{
                        dotsOptions: {
                            color: "#53389e",
                            type: "rounded",
                        },
                        backgroundOptions: {
                            color: "#ffffff",
                        },
                        cornersSquareOptions: {
                            color: "#53389e",
                            type: "extra-rounded",
                        },
                        cornersDotOptions: {
                            color: "#53389e",
                            type: "dot",
                        },
                    }}
                />
            </div>
        </div>
    ),
};