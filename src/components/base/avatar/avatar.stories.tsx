import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { AvatarAddButton } from "@/components/base/avatar/base-components";
import { Avatar } from "./avatar";
import { AvatarLabelGroup } from "./avatar-label-group";
import { AvatarProfilePhoto } from "./avatar-profile-photo";
import { AvatarCompanyIcon } from "./base-components/avatar-company-icon";


const meta = {
    title: "Components/Avatar",
    component: Avatar,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Free and open-source React avatar components built for modern applications and websites. These avatars are built using React Aria and styled with Tailwind CSS.",
            },
        },
    },
    tags: ["autodocs"],
    argTypes: {
        size: {
            control: "select",
            options: ["xxs", "xs", "sm", "md", "lg", "xl", "2xl"],
            description: "Avatar size variant",
        },
        status: {
            control: "select",
            options: ["online", "offline", undefined],
            description: "Status indicator",
        },
        verified: {
            control: "boolean",
            description: "Show verified badge",
        },
        contrastBorder: {
            control: "boolean",
            description: "Show contrast border",
        },
    },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = Omit<StoryObj<typeof meta>, "args"> & {
    args?: Partial<React.ComponentProps<typeof Avatar>>;
};

// Avatar Example - Main docs content (hidden from sidebar, only shows in Docs tab)
export const AvatarExample: Story = {
    render: () => (
        <div className="mt-10 space-y-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Avatar Variants</h3>
                <div className="mb-7 max-w-lg space-y-2">
                    <p className="text-sm text-text-secondary">
                        Free and open-source React avatar components built for modern applications and websites. These avatars are built using React Aria and
                        styled with Tailwind CSS.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    <AvatarLabelGroup
                        size="md"
                        src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80"
                        alt="Olivia Rhye"
                        title="Olivia Rhye"
                        subtitle="olivia@untitledui.com"
                    />
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Comprehensive examples of avatar variants, sizes, and states.",
            },
        },
        // Hide from sidebar, only show in Docs tab
        docsOnly: true,
    },
};

export const AvatarStory: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Avatar</h3>
            <div className="flex items-center gap-4">
            <Avatar size="xs" alt="Olivia Rhye" src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80" />
            <Avatar size="sm" alt="Olivia Rhye" src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80" />
            <Avatar size="md" alt="Olivia Rhye" src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80" />
            <Avatar size="lg" alt="Olivia Rhye" src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80" />
            <Avatar size="xl" alt="Olivia Rhye" src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80" />
            <Avatar size="2xl" alt="Olivia Rhye" src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80" />
            </div>
        </div>
    ),
};

export const StatusIndicator: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Status Indicator</h3>
            <div className="mb-7 max-w-lg space-y-2">
                <p className="text-sm text-text-secondary">
                    Status indicators are a common way to show the online or offline status of a user or connection. They can be used to indicate whether a user
                    is online or offline.{" "}
                </p>
                <p className="text-sm text-text-secondary">
                    Our avatar component provides a status prop that allows you to easily add status indicators to your avatars. The status prop accepts the
                    following values: online and offline.
                </p>
            </div>
            <div className="flex items-center gap-4">
                <Avatar status="online" size="md" alt="Olivia Rhye" src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80" />
                <Avatar status="offline" size="md" alt="Olivia Rhye" src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80" />
            </div>
        </div>
    ),
};

export const CompanyLogo: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Company Logo</h3>
            <div className="mb-7 max-w-lg space-y-2">
                <p className="text-sm text-text-secondary">
                    Company logos or avatar badges are another way to add additional information to your avatars. They can be used to display the company logo,
                    the user's role, or any other information you want to display.
                </p>
                <p className="text-sm text-text-secondary">
                    Our avatar component provides a badge prop that allows you to easily add company logos to your avatars. The badge prop accepts a React node
                    and will be displayed in the top-right corner of the avatar. We recommend using the AvatarCompanyIcon component to easily add a company logo
                    with predefined styles and sizes to your avatars.
                </p>
            </div>
            <Avatar
                size="md"
                alt="Olivia Rhye"
                src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80"
                badge={<AvatarCompanyIcon src="https://www.untitledui.com/logos/images/Layers.jpg" alt="Layers Inc." size="md" />}
            />
        </div>
    ),
};

export const VerifiedBadge: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Verified Badge</h3>
            <div className="mb-7 max-w-lg space-y-2">
                <p className="text-sm text-text-secondary">
                    Verified badges are quite common in any modern application. They indicate whether a user is verified and trustworthy.
                </p>
                <p className="text-sm text-text-secondary">
                    Our avatar component provides a verified boolean prop that allows you to easily add styled verified badges to your avatars.
                </p>
            </div>
            <Avatar verified size="md" alt="Olivia Rhye" src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80" />
        </div>
    ),
};

export const Placeholder: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Placeholder</h3>
            <div className="mb-7 max-w-lg space-y-2">
                <p className="text-sm text-text-secondary">
                    Avatar components should be built with common edge cases in mind. For example, what should happen if a user has no avatar, or if the
                    provided image has failed to load?
                </p>
                <p className="text-sm text-text-secondary">
                    Our avatar components are designed to be robust and handle common edge cases. For example, if no image is provided, or if the image fails to
                    load, the component will automatically display a placeholder icon.
                </p>
                <p className="text-sm text-text-secondary">
                    To change the placeholder, you can use the placeholder and placeholderIcon props. You can pass an icon (e.g., any icon from
                    @untitledui/icons) to the placeholderIcon prop, and it will be displayed in the center of the avatar with matching styles. If you would like
                    something more custom, you can also pass a React node to the placeholder prop.
                </p>
            </div>
            <Avatar size="md" alt="Olivia Rhye" />
        </div>
    ),
};

export const Initials: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Initials</h3>
            <div className="mb-7 max-w-lg space-y-2">
                <p className="text-sm text-text-secondary">
                    Similar to the placeholder, you can also use the initials prop to display the user's initials when no image is available.
                </p>
            </div>
            <Avatar size="md" alt="Olivia Rhye" initials="OR" />
        </div>
    ),
};

export const LabelGroup: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Label Group</h3>
            <div className="mb-7 max-w-lg space-y-2">
                <p className="text-sm text-text-secondary">
                    Avatar label groups are a great way to display additional information about a user. They can be used to display the user's name, email, and
                    any other information you want to display.
                </p>
            </div>
            <AvatarLabelGroup
                size="md"
                src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80"
                alt="Olivia Rhye"
                title="Olivia Rhye"
                subtitle="olivia@untitledui.com"
            />
        </div>
    ),
};

export const Group: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Group</h3>
            <div className="mb-7 max-w-lg space-y-2">
                <p className="text-sm text-text-secondary">
                    Group avatars are also quite common in modern applications. They can be used to display a group of users or entities that belong to the same
                    group.
                </p>
                <p className="text-sm text-text-secondary">
                    To build a group of avatars, you can easily use our Avatar and AvatarAddButton components. Just place them in a flex container with
                    appropriate spacing and you're good to go.
                </p>
            </div>
            <div className="flex gap-2">
                <div className="flex -space-x-2">
                    <Avatar
                        size="sm"
                        alt="Olivia Rhye"
                        className="ring-[1.5px] ring-bg-primary"
                        src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80"
                    />
                    <Avatar
                        size="sm"
                        alt="Phoenix Baker"
                        className="ring-[1.5px] ring-bg-primary"
                        src="https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80"
                    />
                    <Avatar
                        size="sm"
                        alt="Lana Steiner"
                        className="ring-[1.5px] ring-bg-primary"
                        src="https://www.untitledui.com/images/avatars/lana-steiner?fm=webp&q=80"
                    />
                    <Avatar
                        size="sm"
                        alt="Demi Wilkinson"
                        className="ring-[1.5px] ring-bg-primary"
                        src="https://www.untitledui.com/images/avatars/demi-wilkinson?fm=webp&q=80"
                    />
                    <Avatar
                        size="sm"
                        alt="Candice Wu"
                        className="ring-[1.5px] ring-bg-primary"
                        src="https://www.untitledui.com/images/avatars/candice-wu?fm=webp&q=80"
                    />
                    <Avatar
                        size="sm"
                        alt="Natali Craig"
                        className="ring-[1.5px] ring-bg-primary"
                        src="https://www.untitledui.com/images/avatars/natali-craig?fm=webp&q=80"
                    />
                    <Avatar
                        size="sm"
                        alt="Drew Cano"
                        className="ring-[1.5px] ring-bg-primary"
                        src="https://www.untitledui.com/images/avatars/drew-cano?fm=webp&q=80"
                    />
                    <Avatar
                        size="sm"
                        alt="Orlando Diggs"
                        className="ring-[1.5px] ring-bg-primary"
                        src="https://www.untitledui.com/images/avatars/orlando-diggs?fm=webp&q=80"
                    />
                    <Avatar
                        size="sm"
                        alt="Andi Lane"
                        className="ring-[1.5px] ring-bg-primary"
                        src="https://www.untitledui.com/images/avatars/andi-lane?fm=webp&q=80"
                    />
                    <Avatar
                        size="sm"
                        alt="Kate Morrison"
                        className="ring-[1.5px] ring-bg-primary"
                        src="https://www.untitledui.com/images/avatars/kate-morrison?fm=webp&q=80"
                    />
                    <Avatar
                        size="sm"
                        className="ring-[1.5px] ring-bg-primary"
                        placeholder={<span className="flex items-center justify-center text-sm font-semibold text-quaternary">+5</span>}
                    />
                </div>
                <AvatarAddButton size="sm" />
            </div>
        </div>
    ),
};

export const ProfilePhoto: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Profile Photo</h3>
            <AvatarProfilePhoto verified size="md" alt="Olivia Rhye" src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80" />
        </div>
    ),
};

export const ProfilePhotoPlaceholder: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Profile Photo Placeholder</h3>
            <div className="mb-7 max-w-lg space-y-2">
                <p className="text-sm text-text-secondary">
                    Profile photo placeholders function the same way as the regular placeholder in our Avatar component. They will be displayed if no image is
                    provided, or if the image fails to load.
                </p>
            </div>
            <AvatarProfilePhoto verified size="md" alt="Olivia Rhye" />
        </div>
    ),
};

export const ProfilePhotoInitials: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Profile Photo Initials</h3>
            <div className="mb-7 max-w-lg space-y-2">
                <p className="text-sm text-text-secondary">
                    Profile photo initials function the same way as the regular initials in our Avatar component. They will be displayed if no image is
                    provided, or if the image fails to load.
                </p>
            </div>
            <AvatarProfilePhoto verified size="md" alt="Olivia Rhye" initials="OR" />
        </div>
    ),
};