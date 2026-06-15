import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { BadgeGroup } from "./badge-groups";

const badgeGroupColors: Array<"gray" | "brand" | "error" | "warning" | "success"> = ["gray", "brand", "error", "warning", "success"];

// Badge Group Example Component
const BadgeGroupExampleComponent = () => (
    <div className="mt-10 space-y-8">
        <div>
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Badge Group Examples</h3>
            <div className="mb-7 max-w-lg space-y-2">
                <p className="text-sm text-text-secondary">
                    Badge groups combine a badge with an addon element that can be positioned leading or trailing. Available in light (pill-color) and modern
                    themes.
                </p>
            </div>
        </div>

        <div>
            <div className="flex flex-col gap-4">
                <BadgeGroup addonText="New feature" color="brand" theme="modern" align="leading" size="md">
                    We've just released a new feature
                </BadgeGroup>
                <BadgeGroup addonText="New feature" color="brand" theme="modern" align="leading" size="lg">
                    We've just released a new feature
                </BadgeGroup>
            </div>
        </div>
    </div>
);

const meta = {
    title: "Components/Badge Groups",
    component: BadgeGroup,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Badge groups combine a badge with an addon element (text or icon) that can be positioned leading or trailing. Available in light (pill-color) and modern themes.",
            },
        },
    },
    tags: ["autodocs"],
    argTypes: {
        theme: {
            control: "select",
            options: ["light", "modern"],
            description: "Badge theme variant",
        },
        align: {
            control: "select",
            options: ["leading", "trailing"],
            description: "Alignment of the badge addon element",
        },
        color: {
            control: "select",
            options: ["gray", "brand", "error", "warning", "success"],
            description: "Badge color variant",
        },
        size: {
            control: "select",
            options: ["md", "lg"],
            description: "Badge size",
        },
    },
} satisfies Meta<typeof BadgeGroup>;

export default meta;
type Story = Omit<StoryObj<typeof meta>, "args"> & {
    args?: Partial<React.ComponentProps<typeof BadgeGroup>>;
};

// Badge Group Example - Main docs content (hidden from sidebar, only shows in Docs tab)
export const BadgeGroupExample: Story = {
    render: () => <BadgeGroupExampleComponent />,
    parameters: {
        docs: {
            description: {
                story: "Comprehensive examples of badge group variants.",
            },
        },
        // Hide from sidebar, only show in Docs tab
        docsOnly: true,
    },
};

// Pill Color Leading Gray
export const PillColorLeadingGray: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Pill Color Leading Gray</h3>
            <div className="flex flex-col gap-4">
                <BadgeGroup addonText="New feature" color="gray" theme="light" align="leading" size="md">
                    We've just released a new feature
                </BadgeGroup>
                <BadgeGroup addonText="New feature" color="gray" theme="light" align="leading" size="lg">
                    We've just released a new feature
                </BadgeGroup>
            </div>
        </div>
    ),
};

// Pill Color Leading Brand
export const PillColorLeadingBrand: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Pill Color Leading Brand</h3>
            <div className="flex flex-col gap-4">
                <BadgeGroup addonText="New feature" color="brand" theme="light" align="leading" size="md">
                    We've just released a new feature
                </BadgeGroup>
                <BadgeGroup addonText="New feature" color="brand" theme="light" align="leading" size="lg">
                    We've just released a new feature
                </BadgeGroup>
            </div>
        </div>
    ),
};

// Pill Color Leading Error
export const PillColorLeadingError: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Pill Color Leading Error</h3>
            <div className="flex flex-col gap-4">
                <BadgeGroup addonText="Error" color="error" theme="light" align="leading" size="md">
                    There was a problem with that action
                </BadgeGroup>
                <BadgeGroup addonText="Error" color="error" theme="light" align="leading" size="lg">
                    There was a problem with that action
                </BadgeGroup>
            </div>
        </div>
    ),
};

// Pill Color Leading Warning
export const PillColorLeadingWarning: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Pill Color Leading Warning</h3>
            <div className="flex flex-col gap-4">
                <BadgeGroup addonText="Warning" color="warning" theme="light" align="leading" size="md">
                    Just to let you know this might be a problem
                </BadgeGroup>
                <BadgeGroup addonText="Warning" color="warning" theme="light" align="leading" size="lg">
                    Just to let you know this might be a problem
                </BadgeGroup>
            </div>
        </div>
    ),
};

// Pill Color Leading Success
export const PillColorLeadingSuccess: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Pill Color Leading Success</h3>
            <div className="flex flex-col gap-4">
                <BadgeGroup addonText="Success" color="success" theme="light" align="leading" size="md">
                    You've updated your profile and details
                </BadgeGroup>
                <BadgeGroup addonText="Success" color="success" theme="light" align="leading" size="lg">
                    You've updated your profile and details
                </BadgeGroup>
            </div>
        </div>
    ),
};

// Pill Color Trailing Gray
export const PillColorTrailingGray: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Pill Color Trailing Gray</h3>
            <div className="flex flex-col gap-4">
                <BadgeGroup addonText="New feature" color="gray" theme="light" align="trailing" size="md">
                    We've just released a new feature
                </BadgeGroup>
                <BadgeGroup addonText="New feature" color="gray" theme="light" align="trailing" size="lg">
                    We've just released a new feature
                </BadgeGroup>
            </div>
        </div>
    ),
};

// Pill Color Trailing Brand
export const PillColorTrailingBrand: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Pill Color Trailing Brand</h3>
            <div className="flex flex-col gap-4">
                <BadgeGroup addonText="New feature" color="brand" theme="light" align="trailing" size="md">
                    We've just released a new feature
                </BadgeGroup>
                <BadgeGroup addonText="New feature" color="brand" theme="light" align="trailing" size="lg">
                    We've just released a new feature
                </BadgeGroup>
            </div>
        </div>
    ),
};

// Pill Color Trailing Error
export const PillColorTrailingError: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Pill Color Trailing Error</h3>
            <div className="flex flex-col gap-4">
                <BadgeGroup addonText="Error" color="error" theme="light" align="trailing" size="md">
                    There was a problem with that action
                </BadgeGroup>
                <BadgeGroup addonText="Error" color="error" theme="light" align="trailing" size="lg">
                    There was a problem with that action
                </BadgeGroup>
            </div>
        </div>
    ),
};

// Pill Color Trailing Warning
export const PillColorTrailingWarning: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Pill Color Trailing Warning</h3>
            <div className="flex flex-col gap-4">
                <BadgeGroup addonText="Warning" color="warning" theme="light" align="trailing" size="md">
                    Just to let you know this might be a problem
                </BadgeGroup>
                <BadgeGroup addonText="Warning" color="warning" theme="light" align="trailing" size="lg">
                    Just to let you know this might be a problem
                </BadgeGroup>
            </div>
        </div>
    ),
};

// Pill Color Trailing Success
export const PillColorTrailingSuccess: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Pill Color Trailing Success</h3>
            <div className="flex flex-col gap-4">
                <BadgeGroup addonText="Success" color="success" theme="light" align="trailing" size="md">
                    You've updated your profile and details
                </BadgeGroup>
                <BadgeGroup addonText="Success" color="success" theme="light" align="trailing" size="lg">
                    You've updated your profile and details
                </BadgeGroup>
            </div>
        </div>
    ),
};

// Modern Leading Gray
export const ModernLeadingGray: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Modern Leading Gray</h3>
            <div className="flex flex-col gap-4">
                <BadgeGroup addonText="New feature" color="gray" theme="modern" align="leading" size="md">
                    We've just released a new feature
                </BadgeGroup>
                <BadgeGroup addonText="New feature" color="gray" theme="modern" align="leading" size="lg">
                    We've just released a new feature
                </BadgeGroup>
            </div>
        </div>
    ),
};

// Modern Leading Brand
export const ModernLeadingBrand: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Modern Leading Brand</h3>
            <div className="flex flex-col gap-4">
                <BadgeGroup addonText="New feature" color="brand" theme="modern" align="leading" size="md">
                    We've just released a new feature
                </BadgeGroup>
                <BadgeGroup addonText="New feature" color="brand" theme="modern" align="leading" size="lg">
                    We've just released a new feature
                </BadgeGroup>
            </div>
        </div>
    ),
};

// Modern Leading Error
export const ModernLeadingError: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Modern Leading Error</h3>
            <div className="flex flex-col gap-4">
                <BadgeGroup addonText="Error" color="error" theme="modern" align="leading" size="md">
                    There was a problem with that action
                </BadgeGroup>
                <BadgeGroup addonText="Error" color="error" theme="modern" align="leading" size="lg">
                    There was a problem with that action
                </BadgeGroup>
            </div>
        </div>
    ),
};

// Modern Leading Warning
export const ModernLeadingWarning: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Modern Leading Warning</h3>
            <div className="flex flex-col gap-4">
                <BadgeGroup addonText="Warning" color="warning" theme="modern" align="leading" size="md">
                    Just to let you know this might be a problem
                </BadgeGroup>
                <BadgeGroup addonText="Warning" color="warning" theme="modern" align="leading" size="lg">
                    Just to let you know this might be a problem
                </BadgeGroup>
            </div>
        </div>
    ),
};

// Modern Leading Success
export const ModernLeadingSuccess: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Modern Leading Success</h3>
            <div className="flex flex-col gap-4">
                <BadgeGroup addonText="Success" color="success" theme="modern" align="leading" size="md">
                    You've updated your profile and details
                </BadgeGroup>
                <BadgeGroup addonText="Success" color="success" theme="modern" align="leading" size="lg">
                    You've updated your profile and details
                </BadgeGroup>
            </div>
        </div>
    ),
};

// Modern Trailing Gray
export const ModernTrailingGray: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Modern Trailing Gray</h3>
            <div className="flex flex-col gap-4">
                <BadgeGroup addonText="New feature" color="gray" theme="modern" align="trailing" size="md">
                    We've just released a new feature
                </BadgeGroup>
                <BadgeGroup addonText="New feature" color="gray" theme="modern" align="trailing" size="lg">
                    We've just released a new feature
                </BadgeGroup>
            </div>
        </div>
    ),
};

// Modern Trailing Brand
export const ModernTrailingBrand: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Modern Trailing Brand</h3>
            <div className="flex flex-col gap-4">
                <BadgeGroup addonText="New feature" color="brand" theme="modern" align="trailing" size="md">
                    We've just released a new feature
                </BadgeGroup>
                <BadgeGroup addonText="New feature" color="brand" theme="modern" align="trailing" size="lg">
                    We've just released a new feature
                </BadgeGroup>
            </div>
        </div>
    ),
};

// Modern Trailing Error
export const ModernTrailingError: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Modern Trailing Error</h3>
            <div className="flex flex-col gap-4">
                <BadgeGroup addonText="Error" color="error" theme="modern" align="trailing" size="md">
                    There was a problem with that action
                </BadgeGroup>
                <BadgeGroup addonText="Error" color="error" theme="modern" align="trailing" size="lg">
                    There was a problem with that action
                </BadgeGroup>
            </div>
        </div>
    ),
};

// Modern Trailing Warning
export const ModernTrailingWarning: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Modern Trailing Warning</h3>
            <div className="flex flex-col gap-4">
                <BadgeGroup addonText="Warning" color="warning" theme="modern" align="trailing" size="md">
                    Just to let you know this might be a problem
                </BadgeGroup>
                <BadgeGroup addonText="Warning" color="warning" theme="modern" align="trailing" size="lg">
                    Just to let you know this might be a problem
                </BadgeGroup>
            </div>
        </div>
    ),
};

// Modern Trailing Success
export const ModernTrailingSuccess: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Modern Trailing Success</h3>
            <div className="flex flex-col gap-4">
                <BadgeGroup addonText="Success" color="success" theme="modern" align="trailing" size="md">
                    You've updated your profile and details
                </BadgeGroup>
                <BadgeGroup addonText="Success" color="success" theme="modern" align="trailing" size="lg">
                    You've updated your profile and details
                </BadgeGroup>
            </div>
        </div>
    ),
};
