import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ProgressBarCircle, ProgressBarHalfCircle } from "./progress-circles";
import { ProgressBar } from "./progress-indicators";


const meta = {
    title: "Components/Progress Indicators",
    component: ProgressBar,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Free and open-source React progress indicator components built for modern applications and websites. These progress indicators are built using React Aria and styled with Tailwind CSS.",
            },
        },
    },
    tags: ["autodocs"],
    argTypes: {
        labelPosition: {
            control: "select",
            options: ["right", "bottom", "top-floating", "bottom-floating", undefined],
            description: "Position of the value label",
        },
        value: {
            control: { type: "range", min: 0, max: 100, step: 1 },
            description: "Progress value",
        },
    },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = Omit<StoryObj<typeof meta>, "args"> & {
    args?: Partial<React.ComponentProps<typeof ProgressBar>>;
};

// Progress Indicator Example - Main docs content (hidden from sidebar, only shows in Docs tab)
export const ProgressIndicatorExample: Story = {
    render: () => (
        <div className="mt-10 space-y-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Progress Indicator Variants</h3>
                <div className="mb-7 max-w-lg space-y-2">
                    <p className="text-sm text-text-secondary">
                        Free and open-source React progress indicator components built for modern applications and websites. These progress indicators are built
                        using React Aria and styled with Tailwind CSS.
                    </p>
                </div>
                <div className="flex w-80 flex-wrap items-center gap-4">
                    <ProgressBar min={0} max={100} value={40} />
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Comprehensive examples of progress indicator variants, label positions, and states.",
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
            <div className="w-80">
                <ProgressBar min={0} max={100} value={40} />
            </div>
        </div>
    ),
};

export const TextRight: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Text Right</h3>
            <div className="w-80">
                <ProgressBar labelPosition="right" min={0} max={100} value={40} />
            </div>
        </div>
    ),
};

export const TextBottom: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Text Bottom</h3>
            <div className="w-80">
                <ProgressBar labelPosition="bottom" min={0} max={100} value={40} />
            </div>
        </div>
    ),
};

export const TextTopFloating: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Text Top Floating</h3>
            <div className="mt-14 w-80">
                <ProgressBar labelPosition="top-floating" min={0} max={100} value={40} />
            </div>
        </div>
    ),
};

export const TextBottomFloating: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Text Bottom Floating</h3>
            <div className="mb-14 w-80">
                <ProgressBar labelPosition="bottom-floating" min={0} max={100} value={40} />
            </div>
        </div>
    ),
};

export const CircleProgressBar: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Circle Progress Bar</h3>
            <div className="flex flex-col items-start gap-10 md:flex-row">
                <ProgressBarCircle size="xxs" min={0} max={100} value={40} />
                <ProgressBarCircle size="xs" min={0} max={100} value={40} />
                <ProgressBarCircle size="sm" min={0} max={100} value={40} />
                {/* <ProgressBarCircle size="md" min={0} max={100} value={40} /> */}
                {/* <ProgressBarCircle size="lg" min={0} max={100} value={40} /> */}
            </div>
        </div>
    ),
};

export const CircleProgressBarLabel: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Circle Progress Bar Label</h3>
            <div className="flex flex-col items-start gap-10 md:flex-row">
                <ProgressBarCircle size="xxs" label="Users" min={0} max={100} value={40} />
                <ProgressBarCircle size="xs" label="Active users" min={0} max={100} value={40} />
                <ProgressBarCircle size="sm" label="Active users" min={0} max={100} value={40} />
                {/* <ProgressBarCircle size="md" label="Active users" min={0} max={100} value={40} /> */}
                {/* <ProgressBarCircle size="lg" label="Active users" min={0} max={100} value={40} /> */}
            </div>
        </div>
    ),
};

export const HalfCircleProgressBar: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Half Circle Progress Bar</h3>
            <div className="flex flex-col items-start gap-10 md:flex-row">
                <ProgressBarHalfCircle size="xxs" min={0} max={100} value={40} />
                <ProgressBarHalfCircle size="xs" min={0} max={100} value={40} />
                <ProgressBarHalfCircle size="sm" min={0} max={100} value={40} />
                {/* <ProgressBarHalfCircle size="md" min={0} max={100} value={40} /> */}
                {/* <ProgressBarHalfCircle size="lg" min={0} max={100} value={40} /> */}
            </div>
        </div>
    ),
};

export const HalfCircleProgressBarLabel: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Half Circle Progress Bar Label</h3>
            <div className="flex flex-col items-start gap-10 md:flex-row">
                <ProgressBarHalfCircle size="xxs" label="Users" min={0} max={100} value={40} />
                <ProgressBarHalfCircle size="xs" label="Active users" min={0} max={100} value={40} />
                <ProgressBarHalfCircle size="sm" label="Active users" min={0} max={100} value={40} />
                {/* <ProgressBarHalfCircle size="md" label="Active users" min={0} max={100} value={40} /> */}
                {/* <ProgressBarHalfCircle size="lg" label="Active users" min={0} max={100} value={40} /> */}
            </div>
        </div>
    ),
};