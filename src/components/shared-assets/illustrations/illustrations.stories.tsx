import { Illustration } from ".";
import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { BoxIllustration } from "./box";
import { CloudIllustration } from "./cloud";
import { CreditCardIllustration } from "./credit-card";
import { DocumentsIllustration } from "./documents";


const meta = {
    title: "Components/Illustrations",
    component: BoxIllustration,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "FFree and open-source React illustration components built for modern applications and websites. These illustrations are built using React Aria and styled with Tailwind CSS.",
            },
        },
    },
    tags: ["autodocs"],
    argTypes: {
        size: {
            control: "select",
            options: ["sm", "md", "lg"],
            description: "Illustration size variant",
        },
    },
} satisfies Meta<typeof BoxIllustration>;

export default meta;
type Story = Omit<StoryObj<typeof meta>, "args"> & {
    args?: Partial<React.ComponentProps<typeof BoxIllustration>>;
};

// Illustration Example - Main docs content (hidden from sidebar, only shows in Docs tab)
export const IllustrationExample: Story = {
    render: () => (
        <div className="mt-10 space-y-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Illustration Variants</h3>
                <div className="mb-7 max-w-lg space-y-2">
                    <p className="text-sm text-text-secondary">
                        Free and open-source React illustration components built for modern applications and websites. These illustrations are built using React
                        Aria and styled with Tailwind CSS.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    <Illustration type="box" size="lg" />
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Comprehensive examples of illustration variants.",
            },
        },
        // Hide from sidebar, only show in Docs tab
        docsOnly: true,
    },
};

export const BoxSm: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Box sm</h3>
            <div className="flex flex-wrap items-center gap-4">
                <Illustration type="box" size="sm" />
            </div>
        </div>
    ),
};

export const BoxMd: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Box md</h3>
            <div className="flex flex-wrap items-center gap-4">
                <Illustration type="box" size="md" />
            </div>
        </div>
    ),
};

export const BoxLg: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Box lg</h3>
            <div className="flex flex-wrap items-center gap-4">
                <Illustration type="box" size="lg" />
            </div>
        </div>
    ),
};

export const CloudSm: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Cloud sm</h3>
            <div className="flex flex-wrap items-center gap-4">
                <Illustration type="cloud" size="sm" />
            </div>
        </div>
    ),
};

export const CloudMd: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Cloud md</h3>
            <div className="flex flex-wrap items-center gap-4">
                <Illustration type="cloud" size="md" />
            </div>
        </div>
    ),
};

export const CloudLg: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Cloud lg</h3>
            <div className="flex flex-wrap items-center gap-4">
                <Illustration type="cloud" size="lg" />
            </div>
        </div>
    ),
};

export const CreditCardSm: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Credit card sm</h3>
            <div className="flex flex-wrap items-center gap-4">
                <Illustration type="credit-card" size="sm" />
            </div>
        </div>
    ),
};

export const CreditCardMd: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Credit card md</h3>
            <div className="flex flex-wrap items-center gap-4">
                <Illustration type="credit-card" size="md" />
            </div>
        </div>
    ),
};

export const CreditCardLg: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Credit card lg</h3>
            <div className="flex flex-wrap items-center gap-4">
                <Illustration type="credit-card" size="lg" />
            </div>
        </div>
    ),
};

export const DocumentsSm: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Documents sm</h3>
            <div className="flex flex-wrap items-center gap-4">
                <Illustration type="documents" size="sm" />
            </div>
        </div>
    ),
};

export const DocumentsMd: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Documents md</h3>
            <div className="flex flex-wrap items-center gap-4">
                <Illustration type="documents" size="md" />
            </div>
        </div>
    ),
};

export const DocumentsLg: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Documents lg</h3>
            <div className="flex flex-wrap items-center gap-4">
                <Illustration type="documents" size="lg" />
            </div>
        </div>
    ),
};