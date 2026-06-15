import type { Meta, StoryObj } from "@storybook/react-vite";
import { InlineCTAActions } from "./actions";
import { InlineCTAEmailField } from "./email-field";
import { InlineCTAChangePlan } from "./change-plan";
import { InlineCTAUpgradePlan } from "./upgrade-plan";
import { InlineCTAPaymentMethod } from "./payment-method";
import { InlineCTAReceipt } from "./receipt";

const meta = {
    title: "Application/Inline CTAs",
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component: "Inline call-to-action components for displaying contextual actions and information within content areas.",
            },
        },
    },
    tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Actions: Story = {
    render: () => (
        <div className="w-full max-w-2xl">
            <InlineCTAActions />
        </div>
    ),
    parameters: {
        layout: "centered",
        docs: {
            description: {
                story: "Simple inline CTA with action buttons.",
            },
        },
    },
};

export const EmailField: Story = {
    render: () => (
        <div className="w-full max-w-2xl">
            <InlineCTAEmailField />
        </div>
    ),
    parameters: {
        layout: "centered",
        docs: {
            description: {
                story: "Inline CTA with email subscription form field.",
            },
        },
    },
};

export const ChangePlan: Story = {
    render: () => (
        <div className="w-full max-w-2xl">
            <InlineCTAChangePlan />
        </div>
    ),
    parameters: {
        layout: "centered",
        docs: {
            description: {
                story: "Inline CTA for changing subscription plan with plan details.",
            },
        },
    },
};

export const UpgradePlan: Story = {
    render: () => (
        <div className="w-full max-w-2xl">
            <InlineCTAUpgradePlan />
        </div>
    ),
    parameters: {
        layout: "centered",
        docs: {
            description: {
                story: "Inline CTA for upgrading plan with feature list.",
            },
        },
    },
};

export const PaymentMethod: Story = {
    render: () => (
        <div className="w-full max-w-2xl">
            <InlineCTAPaymentMethod />
        </div>
    ),
    parameters: {
        layout: "centered",
        docs: {
            description: {
                story: "Inline CTA for managing payment method with card details.",
            },
        },
    },
};

export const Receipt: Story = {
    render: () => (
        <div className="w-full max-w-2xl">
            <InlineCTAReceipt />
        </div>
    ),
    parameters: {
        layout: "centered",
        docs: {
            description: {
                story: "Inline CTA for downloading or viewing receipts.",
            },
        },
    },
};

