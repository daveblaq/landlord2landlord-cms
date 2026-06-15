import type { Meta, StoryObj } from "@storybook/react-vite";
import { DefaultNotificationDemo } from "./icon-default";
import { GrayNotificationDemo } from "./icon-gray";
import { BrandNotificationDemo } from "./icon-brand";
import { ErrorNotificationDemo } from "./icon-error";
import { WarningNotificationDemo } from "./icon-warning";
import { SuccessNotificationDemo } from "./icon-success";
import { ProgressNotificationDemo } from "./progress-notification";
import { ImageNotificationDemo } from "./image-notification";
import { AvatarNotificationDemo } from "./avatar-notification";

const meta = {
    title: "Application/Notifications",
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component: "Notification components for displaying toast-style notifications with different styles and content types.",
            },
        },
    },
    tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Icon notifications
export const IconDefault: Story = {
    render: () => <DefaultNotificationDemo />,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                story: "Icon notification with default color styling.",
            },
        },
    },
};

export const IconGray: Story = {
    render: () => <GrayNotificationDemo />,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                story: "Icon notification with gray color styling.",
            },
        },
    },
};

export const IconBrand: Story = {
    render: () => <BrandNotificationDemo />,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                story: "Icon notification with brand color styling.",
            },
        },
    },
};

export const IconError: Story = {
    render: () => <ErrorNotificationDemo />,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                story: "Icon notification with error color styling.",
            },
        },
    },
};

export const IconWarning: Story = {
    render: () => <WarningNotificationDemo />,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                story: "Icon notification with warning color styling.",
            },
        },
    },
};

export const IconSuccess: Story = {
    render: () => <SuccessNotificationDemo />,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                story: "Icon notification with success color styling.",
            },
        },
    },
};

// Special notification types
export const ProgressNotification: Story = {
    render: () => <ProgressNotificationDemo />,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                story: "Notification with progress indicator for showing upload or task progress.",
            },
        },
    },
};

export const ImageNotification: Story = {
    render: () => <ImageNotificationDemo />,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                story: "Notification with an image preview.",
            },
        },
    },
};

export const AvatarNotification: Story = {
    render: () => <AvatarNotificationDemo />,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                story: "Notification with avatar for user-related messages.",
            },
        },
    },
};

