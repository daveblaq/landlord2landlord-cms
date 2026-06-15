import type { Meta, StoryObj } from "@storybook/react-vite";
import { CardHeaderAvatarWithBadge } from "./card-header-with-avatar-and-badge";
import { CardHeaderWithBadge, CardHeaderWithBadge as CardHeaderWithBadgeExample } from "./card-header-with-badge";


const meta = {
    title: "Application/Card Headers",
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component: "Card header components for displaying card titles, badges, avatars, and actions.",
            },
        },
    },
    tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Card header examples
export const CardHeaderExamples: Story = {
    render: () => <CardHeaderWithBadgeExample />,
    parameters: {
        docs: {
            description: {
                story: "Various card header examples showing different layouts and configurations.",
            },
        },
        docsOnly: true,
    },
};

// Card header with badge
export const CardHeaderWithBadgeStory: Story = {
    render: () => <CardHeaderWithBadge />,
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                story: "Card header with title, badge, description, action buttons, and dropdown menu.",
            },
        },
    },
};

// Card header with avatar and badge
export const CardHeaderWithAvatarAndBadge: Story = {
    render: () => <CardHeaderAvatarWithBadge />,
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                story: "Card header with avatar, name, badge, email, action buttons, and dropdown menu.",
            },
        },
    },
};