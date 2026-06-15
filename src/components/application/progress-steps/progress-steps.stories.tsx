import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {  Flag05, Stars02, User01, UsersPlus } from "@untitledui/icons";
import { Progress } from "./progress-steps";
import type { ProgressFeaturedIconType, ProgressIconType } from "./progress-types";

const meta = {
    title: "Application/Progress Steps",
    component: Progress.IconsWithText,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Progress steps component for displaying multi-step processes and workflows. Supports various layouts including icons, numbers, featured icons, and minimal variants.",
            },
        },
    },
    tags: ["autodocs"],
    argTypes: {
        type: {
            control: "select",
            options: ["icon", "number", "featured-icon"],
            description: "Type of step indicator",
        },
        orientation: {
            control: "select",
            options: ["horizontal", "vertical"],
            description: "Orientation of the progress steps",
        },
        size: {
            control: "select",
            options: ["sm", "md"],
            description: "Size variant",
        },
    },
} satisfies Meta<typeof Progress.IconsWithText>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample step items
const sampleSteps: ProgressIconType[] = [
    {
        title: "Account",
        description: "Create an account",
        status: "complete",
    },
    {
        title: "Profile",
        description: "Add personal details",
        status: "current",
    },
    {
        title: "Team",
        description: "Invite team members",
        status: "incomplete",
    },
    {
        title: "Billing",
        description: "Select plan",
        status: "incomplete",
    },
];

const steps: ProgressFeaturedIconType[] = [
    { title: "Your details", description: "Name and email", status: "complete", icon: User01 },
    { title: "Company details", description: "Website and location", status: "current", connector: false, icon: Flag05 },
    { title: "Invite your team", description: "Start collaborating", status: "incomplete", icon: UsersPlus },
    { title: "Add your socials", description: "Automatic sharing", status: "incomplete", icon: Stars02 },
];

const stepsWithLongerDescription: ProgressFeaturedIconType[] = [
    { title: "Your details", description: "Please provide your name and email", status: "complete", icon: User01 },
    { title: "Company details", description: "A few details about your company", status: "current", connector: false, icon: Flag05 },
    { title: "Invite your team", description: "Start collaborating with your team", status: "incomplete", icon: UsersPlus },
    { title: "Add your socials", description: "Share posts to your social accounts", status: "incomplete", icon: Stars02 },
];
// Progress Steps Example - Main docs content (hidden from sidebar, only shows in Docs tab)
export const ProgressStepsExample: Story = {
    args: { items: [] },
    render: () => (
        <div className="mt-10 space-y-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Progress steps components</h3>
                <>
                    <Progress.IconsWithText type="number" items={steps} size="sm" orientation="horizontal" className="max-md:hidden" />
                    <Progress.IconsWithText type="number" items={stepsWithLongerDescription} size="sm" orientation="vertical" className="md:hidden" />
                </>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Comprehensive progress steps component with multiple variants for displaying step-by-step processes.",
            },
        },
        docsOnly: true,
    },
};

// Icon Centered
export const IconCentered: Story = {
    args: { items: [] },
    render: () => (
        <div className="mt-10 space-y-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Icon Centered</h3>

                <>
                    <Progress.IconsWithText items={steps} size="sm" orientation="horizontal" className="max-md:hidden" />
                    <Progress.IconsWithText items={stepsWithLongerDescription} size="sm" orientation="vertical" className="md:hidden" />
                </>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Icon-only progress steps displayed horizontally in a centered layout without connectors or text labels.",
            },
        },
    },
};

// Icon Centered with Number
export const IconCenteredWithNumber: Story = {
    args: { items: [] },
    render: () => (
        <div className="mt-10 space-y-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Icon Centered with Number</h3>
                <>
                    <Progress.IconsWithText type="number" items={steps} size="sm" orientation="horizontal" className="max-md:hidden" />
                    <Progress.IconsWithText type="number" items={stepsWithLongerDescription} size="sm" orientation="vertical" className="md:hidden" />
                </>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Number-based progress steps displayed horizontally in a centered layout without connectors or text labels.",
            },
        },
    },
};

// Featured Icon Centered
export const FeaturedIconCentered: Story = {
    args: { items: [] },
    render: () => (
        <div className="mt-10 space-y-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Featured Icon Centered</h3>

                <>
                    <Progress.IconsWithText type="featured-icon" items={steps} size="sm" orientation="horizontal" className="max-md:hidden" />
                    <Progress.IconsWithText type="featured-icon" items={stepsWithLongerDescription} size="sm" orientation="vertical" className="md:hidden" />
                </>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Featured icon progress steps displayed horizontally in a centered layout without connectors or text labels.",
            },
        },
    },
};

// Icon with Text
export const IconWithText: Story = {
    args: { items: [] },
    render: () => (
        <div className="mt-10 space-y-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Icon with Text</h3>

                <div className="flex flex-col gap-8">
                    <Progress.IconsWithText items={stepsWithLongerDescription} size="sm" orientation="vertical" />
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Icon-based progress steps with text labels and descriptions, displayed vertically with connecting lines.",
            },
        },
    },
};

// Icon with Number
export const IconWithNumber: Story = {
    args: { items: [] },
    render: () => (
        <div className="mt-10 space-y-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Icon with Number</h3>

                <div className="flex flex-col gap-8">
                    <Progress.IconsWithText type="number" items={stepsWithLongerDescription} size="sm" orientation="vertical" />
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Number-based progress steps with text labels and descriptions, displayed vertically with connecting lines.",
            },
        },
    },
};

// Featured Icon with Text
export const FeaturedIconWithText: Story = {
    args: { items: [] },
    render: () => (
        <div className="mt-10 space-y-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Featured Icon with Text</h3>

                <div className="flex flex-col gap-8">
                    <Progress.IconsWithText type="featured-icon" items={stepsWithLongerDescription} size="sm" orientation="vertical" />
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Featured icon progress steps with text labels and descriptions, displayed vertically with connecting lines.",
            },
        },
    },
};

// Minimal Icons
export const MinimalIcons: Story = {
    args: { items: [] },
    render: () => (
        <div className="mt-10 space-y-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Minimal Icons</h3>

                <div className="flex flex-col gap-8">
                    <Progress.MinimalIcons text items={steps} size="sm" orientation="horizontal" />
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Minimal icon-only progress steps without connectors. Can optionally display a step counter.",
            },
        },
    },
};

// Minimal Icons Connected
export const MinimalIconsConnected: Story = {
    args: { items: [] },
    render: () => (
        <div className="mt-10 space-y-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Minimal Icons Connected</h3>
                <Progress.MinimalIconsConnected items={steps} size="sm" orientation="horizontal" />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Minimal icon progress steps with connecting lines between indicators, available in horizontal and vertical orientations.",
            },
        },
    },
};

// Text with Line
export const TextWithLine: Story = {
    args: { items: [] },
    render: () => (
        <div className="mt-10 space-y-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Text with Line</h3>

                <>
                    <Progress.TextWithLine items={steps} size="sm" orientation="horizontal" className="max-md:hidden" />
                    <Progress.TextWithLine items={stepsWithLongerDescription} size="sm" orientation="vertical" className="md:hidden" />
                </>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Text-based progress steps with colored line indicators at the top, available in horizontal and vertical orientations.",
            },
        },
    },
};
