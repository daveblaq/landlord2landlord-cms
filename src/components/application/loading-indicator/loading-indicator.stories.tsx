import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { LoadingIndicator } from "./loading-indicator";

const meta = {
    title: "Application/Loading Indicator",
    component: LoadingIndicator,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component: "Loading indicator components for displaying loading states with various visual styles.",
            },
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof LoadingIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

// Loading Indicator Examples - Main docs content
export const LoadingIndicatorExamples: Story = {
    render: () => (
        <div className="flex flex-col items-start gap-8 md:flex-row md:gap-16">
        <LoadingIndicator type="line-simple" size="md" label="Loading..." />
        <LoadingIndicator type="line-spinner" size="md" label="Loading..." />
        <LoadingIndicator type="dot-circle" size="md" label="Loading..." />
    </div>
    ),
};

// Line Simple
export const LineSimple: Story = {
    render: () => <LoadingIndicator type="line-simple" />,
};

// Line Simple with Label
export const LineSimpleWithLabel: Story = {
    render: () => <LoadingIndicator type="line-simple" label="Loading..." />,
};

// Line Spinner
export const LineSpinner: Story = {
    render: () => <LoadingIndicator type="line-spinner" />,
};

// Line Spinner with Label
export const LineSpinnerWithLabel: Story = {
    render: () => <LoadingIndicator type="line-spinner" label="Loading..." />,
};

// Dot Circle
export const DotCircle: Story = {
    render: () => <LoadingIndicator type="dot-circle" />,
};

// Dot Circle with Label
export const DotCircleWithLabel: Story = {
    render: () => <LoadingIndicator type="dot-circle" label="Loading..." />,
};

// Sizes
export const Sizes: Story = {
    render: () => (
        <div className="flex flex-col items-start gap-8 md:flex-row">
        <LoadingIndicator type="line-simple" size="sm" label="Loading..." />
        <LoadingIndicator type="line-simple" size="md" label="Loading..." />
        <LoadingIndicator type="line-simple" size="lg" label="Loading..." />
        <LoadingIndicator type="line-simple" size="xl" label="Loading..." />
    </div>
    ),
};

