import type { Meta, StoryObj } from "@storybook/react-vite";
import { AlertFloatingBrandDemo } from "./floating-brand";
import { AlertFloatingDefaultDemo } from "./floating-default";
import { AlertFloatingErrorDemo } from "./floating-error";
import { AlertFloatingGrayDemo } from "./floating-gray";
import { AlertFloatingSuccessDemo } from "./floating-success";
import { AlertFloatingWarningDemo } from "./floating-warning";
import { AlertFullWidthBrandDemo } from "./full-width-brand";
import { AlertFullWidthDefaultDemo } from "./full-width-default";
import { AlertFullWidthErrorDemo } from "./full-width-error";
import { AlertFullWidthGrayDemo } from "./full-width-gray";
import { AlertFullWidthSuccessDemo } from "./full-width-sucess";
import { AlertFullWidthWarningDemo } from "./full-width-warning";

const meta = {
    title: "Application/Alerts",
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component: "Alert components for displaying notifications and messages with different styles and colors.",
            },
        },
    },
    tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Floating alerts
export const FloatingDefault: Story = {
    render: () => (
        <div className="w-full">
            <AlertFloatingDefaultDemo />
        </div>
    ),
    parameters: {
        layout: "centered",
        docs: {
            description: {
                story: "Floating alert with default color styling.",
            },
        },
    },
};

export const FloatingBrand: Story = {
    render: () => (
        <div className="w-full">
            <AlertFloatingBrandDemo />
        </div>
    ),
    parameters: {
        layout: "centered",
        docs: {
            description: {
                story: "Floating alert with brand color styling.",
            },
        },
    },
};

export const FloatingGray: Story = {
    render: () => (
        <div className="w-full">
            <AlertFloatingGrayDemo />
        </div>
    ),
    parameters: {
        layout: "centered",
        docs: {
            description: {
                story: "Floating alert with gray color styling.",
            },
        },
    },
};

export const FloatingError: Story = {
    render: () => (
        <div className="w-full">
            <AlertFloatingErrorDemo />
        </div>
    ),
    parameters: {
        layout: "centered",
        docs: {
            description: {
                story: "Floating alert with error color styling.",
            },
        },
    },
};

export const FloatingWarning: Story = {
    render: () => (
        <div className="w-full">
            <AlertFloatingWarningDemo />
        </div>
    ),
    parameters: {
        layout: "centered",
        docs: {
            description: {
                story: "Floating alert with warning color styling.",
            },
        },
    },
};

export const FloatingSuccess: Story = {
    render: () => (
        		<div className="w-full">
            <AlertFloatingSuccessDemo />
        </div>
    ),
    parameters: {
        layout: "centered",
        docs: {
            description: {
                story: "Floating alert with success color styling.",
            },
        },
    },
};

// Full-width alerts
export const FullWidthDefault: Story = {
    render: () => (
        <div className="w-full">
            <AlertFullWidthDefaultDemo />
        </div>
    ),
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                story: "Full-width alert with default color styling.",
            },
        },
    },
};

export const FullWidthBrand: Story = {
    render: () => (
        <div className="w-full">
            <AlertFullWidthBrandDemo />
        </div>
    ),
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                story: "Full-width alert with brand color styling.",
            },
        },
    },
};

export const FullWidthGray: Story = {
    render: () => (
        <div className="w-full">
            <AlertFullWidthGrayDemo />
        </div>
    ),
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                story: "Full-width alert with gray color styling.",
            },
        },
    },
};

export const FullWidthError: Story = {
    render: () => (
        <div className="w-full">
            <AlertFullWidthErrorDemo />
        </div>
    ),
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                story: "Full-width alert with error color styling.",
            },
        },
    },
};

export const FullWidthWarning: Story = {
    render: () => (
        <div className="w-full">
            <AlertFullWidthWarningDemo />
        </div>
    ),
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                story: "Full-width alert with warning color styling.",
            },
        },
    },
};

export const FullWidthSuccess: Story = {
    render: () => (
        <div className="w-full">
            <AlertFullWidthSuccessDemo />
        </div>
    ),
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                story: "Full-width alert with success color styling.",
            },
        },
    },
};
