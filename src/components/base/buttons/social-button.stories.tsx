import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SocialButton } from "./social-button";


const meta = {
    title: "Components/Social Buttons",
    component: SocialButton,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Free and open-source React social button components built for modern applications and websites. These social buttons are built using React Aria and styled with Tailwind CSS.",
            },
        },
    },
    tags: ["autodocs"],
    argTypes: {
        social: {
            control: "select",
            options: ["google", "facebook", "apple", "twitter", "figma", "dribble"],
            description: "Social platform",
        },
        theme: {
            control: "select",
            options: ["brand", "color", "gray"],
            description: "Button theme variant",
        },
        size: {
            control: "select",
            options: ["sm", "md", "lg", "xl", "2xl"],
            description: "Button size",
        },
    },
} satisfies Meta<typeof SocialButton>;

export default meta;
type Story = Omit<StoryObj<typeof meta>, "args"> & {
    args?: Partial<React.ComponentProps<typeof SocialButton>>;
};

// Social Button Example - Main docs content (hidden from sidebar, only shows in Docs tab)
export const SocialButtonExample: Story = {
    render: () => (
        <div className="mt-10 space-y-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Social Button Variants</h3>
                <div className="mb-7 max-w-lg space-y-2">
                    <p className="text-sm text-text-secondary">
                        Free and open-source React social button components built for modern applications and websites. These social buttons are built using
                        React Aria and styled with Tailwind CSS.
                    </p>
                </div>
                <div className="flex w-90 flex-col gap-3">
                    <SocialButton social="google" theme="brand">
                        Sign in with Google
                    </SocialButton>
                    <SocialButton social="facebook" theme="brand">
                        Sign in with Facebook
                    </SocialButton>
                    <SocialButton social="apple" theme="brand">
                        Sign in with Apple
                    </SocialButton>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Comprehensive examples of social button variants, themes, and states.",
            },
        },
        // Hide from sidebar, only show in Docs tab
        docsOnly: true,
    },
};

export const GoogleSocialButtons: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Google Social Buttons</h3>
            <div className="flex flex-col gap-4">
                <div className="flex gap-8">
                    <SocialButton social="google" theme="brand">
                        Sign in with Google
                    </SocialButton>
                    <SocialButton social="google" theme="brand" />
                </div>
                <div className="flex gap-8">
                    <SocialButton social="google" theme="color">
                        Sign in with Google
                    </SocialButton>
                    <SocialButton social="google" theme="color" />
                </div>
                <div className="flex gap-8">
                    <SocialButton social="google" theme="gray">
                        Sign in with Google
                    </SocialButton>
                    <SocialButton social="google" theme="gray" />
                </div>
            </div>
        </div>
    ),
};

export const FacebookSocialButtons: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Facebook Social Buttons</h3>
            <div className="flex flex-col gap-4">
                <div className="flex gap-8">
                    <SocialButton social="facebook" theme="brand">
                        Sign in with Facebook
                    </SocialButton>
                    <SocialButton social="facebook" theme="brand" />
                </div>
                <div className="flex gap-8">
                    <SocialButton social="facebook" theme="color">
                        Sign in with Facebook
                    </SocialButton>
                    <SocialButton social="facebook" theme="color" />
                </div>
                <div className="flex gap-8">
                    <SocialButton social="facebook" theme="gray">
                        Sign in with Facebook
                    </SocialButton>
                    <SocialButton social="facebook" theme="gray" />
                </div>
            </div>
        </div>
    ),
};

export const AppleSocialButtons: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Apple Social Buttons</h3>
            <div className="flex flex-col gap-4">
                <div className="flex gap-8">
                    <SocialButton social="apple" theme="brand">
                        Sign in with Apple
                    </SocialButton>
                    <SocialButton social="apple" theme="brand" />
                </div>
                <div className="flex gap-8">
                    <SocialButton social="apple" theme="color">
                        Sign in with Apple
                    </SocialButton>
                    <SocialButton social="apple" theme="color" />
                </div>
                <div className="flex gap-8">
                    <SocialButton social="apple" theme="gray">
                        Sign in with Apple
                    </SocialButton>
                    <SocialButton social="apple" theme="gray" />
                </div>
            </div>
        </div>
    ),
};

export const TwitterSocialButtons: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Twitter Social Buttons</h3>
            <div className="flex flex-col gap-4">
                <div className="flex gap-8">
                    <SocialButton social="twitter" theme="brand">
                        Sign in with X
                    </SocialButton>
                    <SocialButton social="twitter" theme="brand" />
                </div>
                <div className="flex gap-8">
                    <SocialButton social="twitter" theme="color">
                        Sign in with X
                    </SocialButton>
                    <SocialButton social="twitter" theme="color" />
                </div>
                <div className="flex gap-8">
                    <SocialButton social="twitter" theme="gray">
                        Sign in with X
                    </SocialButton>
                    <SocialButton social="twitter" theme="gray" />
                </div>
            </div>
        </div>
    ),
};

export const FigmaSocialButtons: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Figma Social Buttons</h3>
            <div className="flex flex-col gap-4">
                <div className="flex gap-8">
                    <SocialButton social="figma" theme="brand">
                        Sign in with Figma
                    </SocialButton>
                    <SocialButton social="figma" theme="brand" />
                </div>
                <div className="flex gap-8">
                    <SocialButton social="figma" theme="color">
                        Sign in with Figma
                    </SocialButton>
                    <SocialButton social="figma" theme="color" />
                </div>
                <div className="flex gap-8">
                    <SocialButton social="figma" theme="gray">
                        Sign in with Figma
                    </SocialButton>
                    <SocialButton social="figma" theme="gray" />
                </div>
            </div>
        </div>
    ),
};

export const DribbleSocialButtons: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Dribble Social Buttons</h3>
            <div className="flex flex-col gap-4">
                <div className="flex gap-8">
                    <SocialButton social="dribble" theme="brand">
                        Sign in with Dribble
                    </SocialButton>
                    <SocialButton social="dribble" theme="brand" />
                </div>
                <div className="flex gap-8">
                    <SocialButton social="dribble" theme="color">
                        Sign in with Dribble
                    </SocialButton>
                    <SocialButton social="dribble" theme="color" />
                </div>
                <div className="flex gap-8">
                    <SocialButton social="dribble" theme="gray">
                        Sign in with Dribble
                    </SocialButton>
                    <SocialButton social="dribble" theme="gray" />
                </div>
            </div>
        </div>
    ),
};

export const BrandSocialButtonsGroup: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Brand Social Buttons Group</h3>
            <div className="flex w-90 flex-col gap-3">
                <SocialButton social="google" theme="brand">
                    Sign in with Google
                </SocialButton>
                <SocialButton social="facebook" theme="brand">
                    Sign in with Facebook
                </SocialButton>
                <SocialButton social="apple" theme="brand">
                    Sign in with Apple
                </SocialButton>
            </div>
        </div>
    ),
};

export const IconsBrandSocialButtonsGroup: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Icons Brand Social Buttons Group</h3>
            <div className="grid w-90 grid-cols-3 gap-3">
                <SocialButton social="google" theme="brand" />
                <SocialButton social="facebook" theme="brand" />
                <SocialButton social="apple" theme="brand" />
            </div>
        </div>
    ),
};

export const ColorSocialButtonsGroup: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Color Social Buttons Group</h3>
            <div className="flex w-90 flex-col gap-3">
                <SocialButton social="google" theme="color">
                    Sign in with Google
                </SocialButton>
                <SocialButton social="facebook" theme="color">
                    Sign in with Facebook
                </SocialButton>
                <SocialButton social="apple" theme="color">
                    Sign in with Apple
                </SocialButton>
            </div>
        </div>
    ),
};

export const IconsColorSocialButtonsGroup: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Icons Color Social Buttons Group</h3>
            <div className="grid w-90 grid-cols-3 gap-3">
                <SocialButton social="google" theme="color" />
                <SocialButton social="facebook" theme="color" />
                <SocialButton social="apple" theme="color" />
            </div>
        </div>
    ),
};

export const GraySocialButtonsGroup: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Gray Social Buttons Group</h3>
            <div className="flex w-90 flex-col gap-3">
                <SocialButton social="google" theme="gray">
                    Sign in with Google
                </SocialButton>
                <SocialButton social="facebook" theme="gray">
                    Sign in with Facebook
                </SocialButton>
                <SocialButton social="apple" theme="gray">
                    Sign in with Apple
                </SocialButton>
            </div>
        </div>
    ),
};