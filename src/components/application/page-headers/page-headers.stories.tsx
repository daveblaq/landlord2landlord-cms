import type { Meta, StoryObj } from "@storybook/react-vite";
import { PageHeaderBannerAvatarCentered } from "./banner-avatar-centered";
import { PageHeaderBannerSimpleCentered } from "./banner-simple-centered";
import { PageHeaderBannerAvatar, PageHeaderBannerAvatar as PageHeaderExample } from "./page-banner-avatar";
import { PageHeaderBannerSimple } from "./page-banner-simple";
import { PageHeaderAvatar } from "./page-header-avatar";
import { PageHeaderSimple } from "./page-header-simple";

const meta = {
    title: "Application/Page Headers",
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component: "Page header components for displaying page titles, navigation, and actions.",
            },
        },
    },
    tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Page header examples
export const PageHeaderExamples: Story = {
    render: () => <PageHeaderExample />,
    parameters: {
        docs: {
            description: {
                story: "Various page header examples showing different layouts and configurations.",
            },
        },
        docsOnly: true,
    },
};

// Simple
export const Simple: Story = {
    render: () => <PageHeaderSimple />,
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                story: "Simple page header with breadcrumbs, title, description, and action buttons.",
            },
        },
    },
};

// Avatar
export const Avatar: Story = {
    render: () => <PageHeaderAvatar />,
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                story: "Page header with avatar, name, email, and action buttons.",
            },
        },
    },
};

// Banner simple
export const BannerSimple: Story = {
    render: () => <PageHeaderBannerSimple />,
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                story: "Page header with banner background, breadcrumbs, title, description, and action buttons.",
            },
        },
    },
};

// Banner avatar
export const BannerAvatar: Story = {
    render: () => <PageHeaderBannerAvatar />,
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                story: "Page header with banner background, avatar, name, email, and action buttons.",
            },
        },
    },
};

// Banner simple centered
export const BannerSimpleCentered: Story = {
    render: () => <PageHeaderBannerSimpleCentered />,
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                story: "Centered page header with banner background, title, description, and action buttons.",
            },
        },
    },
};

// Banner avatar centered
export const BannerAvatarCentered: Story = {
    render: () => <PageHeaderBannerAvatarCentered />,
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                story: "Centered page header with banner background, avatar, name, email, and action buttons.",
            },
        },
    },
};
