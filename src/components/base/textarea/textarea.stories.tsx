import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextArea } from "./textarea";


const meta = {
    title: "Components/Textarea",
    component: TextArea,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Free and open-source React textarea input field components built for modern applications and websites. These textarea input fields are built using React Aria and styled with Tailwind CSS.",
            },
        },
    },
    tags: ["autodocs"],
    argTypes: {
        isDisabled: {
            control: "boolean",
            description: "Disable the textarea",
        },
        isRequired: {
            control: "boolean",
            description: "Make the textarea required",
        },
        rows: {
            control: "number",
            description: "Number of visible rows",
        },
    },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = Omit<StoryObj<typeof meta>, "args"> & {
    args?: Partial<React.ComponentProps<typeof TextArea>>;
};

// Textarea Example - Main docs content (hidden from sidebar, only shows in Docs tab)
export const TextareaExample: Story = {
    render: () => (
        <div className="mt-10 space-y-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Textarea Variants</h3>
                <div className="mb-7 max-w-lg space-y-2">
                    <p className="text-sm text-text-secondary">
                        Free and open-source React textarea input field components built for modern applications and websites. These textarea input fields are
                        built using React Aria and styled with Tailwind CSS.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    <TextArea isRequired placeholder="This is a placeholder." label="Description" hint="This is a hint text to help user." rows={5} />
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Free and open-source React textarea input field components built for modern applications and websites. These textarea input fields are built using React Aria and styled with Tailwind CSS.",
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
            <TextArea isRequired placeholder="This is a placeholder." label="Description" hint="This is a hint text to help user." rows={5} />
        </div>
    ),
};

export const Disabled: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Disabled</h3>
            <TextArea isRequired isDisabled placeholder="This is a placeholder." label="Description" hint="This is a hint text to help user." rows={5} />
        </div>
    ),
};

export const Invalid: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Invalid</h3>
            <TextArea isRequired isInvalid placeholder="This is a placeholder." label="Description" hint="This is an error message." rows={5} />
        </div>
    ),
};