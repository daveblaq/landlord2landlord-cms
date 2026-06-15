import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronDown, ChevronSelectorVertical, Container, Edit01, HelpCircle, LayersTwo01, LogOut01, Settings01, Trash01, User01 } from "@untitledui/icons";
import { Button as AriaButton } from "react-aria-components";
import { cx } from "@/utils/cx";
import { Avatar } from "../avatar/avatar";
import { AvatarLabelGroup } from "../avatar/avatar-label-group";
import { Button } from "../buttons/button";
import { Dropdown } from "./dropdown";


const meta = {
    title: "Components/Dropdown",
    component: Dropdown.Root,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Free and open-source React dropdown components built for modern applications and websites. These dropdowns are built using React Aria and styled with Tailwind CSS.",
            },
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof Dropdown.Root>;

export default meta;
type Story = Omit<StoryObj<typeof meta>, "args"> & {
    args?: Partial<React.ComponentProps<typeof Dropdown.Root>>;
};

// Dropdown Example - Main docs content (hidden from sidebar, only shows in Docs tab)
export const DropdownExample: Story = {
    render: () => (
        <div className="mt-10 space-y-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Dropdown Variants</h3>
                <div className="mb-7 max-w-lg space-y-2">
                    <p className="text-sm text-text-secondary">
                        Free and open-source React dropdown components built for modern applications and websites. These dropdowns are built using React Aria
                        and styled with Tailwind CSS.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    <Dropdown.Root>
                        <Button className="group" color="secondary" iconTrailing={ChevronSelectorVertical}>
                            Account
                        </Button>

                        <Dropdown.Popover>
                            <div className="flex gap-3 border-b border-secondary p-3">
                                <AvatarLabelGroup
                                    size="md"
                                    src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80"
                                    status="online"
                                    title="Olivia Rhye"
                                    subtitle="olivia@untitledui.com"
                                />
                            </div>
                            <Dropdown.Menu>
                                <Dropdown.Section>
                                    <Dropdown.Item addon="⌘K->P" icon={User01}>
                                        View profile
                                    </Dropdown.Item>
                                    <Dropdown.Item addon="⌘S" icon={Settings01}>
                                        Settings
                                    </Dropdown.Item>
                                </Dropdown.Section>
                                <Dropdown.Separator />
                                <Dropdown.Section>
                                    <Dropdown.Item icon={LayersTwo01}>Changelog</Dropdown.Item>
                                    <Dropdown.Item icon={HelpCircle}>Support</Dropdown.Item>
                                    <Dropdown.Item icon={Container}>API</Dropdown.Item>
                                </Dropdown.Section>
                                <Dropdown.Separator />
                                <Dropdown.Section>
                                    <Dropdown.Item addon="⌥⇧Q" icon={LogOut01}>
                                        Log out
                                    </Dropdown.Item>
                                </Dropdown.Section>
                            </Dropdown.Menu>
                        </Dropdown.Popover>
                    </Dropdown.Root>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Comprehensive examples of dropdown variants and triggers.",
            },
        },
        // Hide from sidebar, only show in Docs tab
        docsOnly: true,
    },
};

export const DropdownButton: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Dropdown Button</h3>
            <Dropdown.Root>
                <Button className="group" color="secondary" iconTrailing={ChevronDown}>
                    Account
                </Button>

                <Dropdown.Popover>
                    <div className="flex gap-3 border-b border-secondary p-3">
                        <AvatarLabelGroup
                            size="md"
                            src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80"
                            status="online"
                            title="Olivia Rhye"
                            subtitle="olivia@untitledui.com"
                        />
                    </div>
                    <Dropdown.Menu>
                        <Dropdown.Section>
                            <Dropdown.Item addon="⌘K->P" icon={User01}>
                                View profile
                            </Dropdown.Item>
                            <Dropdown.Item addon="⌘S" icon={Settings01}>
                                Settings
                            </Dropdown.Item>
                        </Dropdown.Section>
                        <Dropdown.Separator />
                        <Dropdown.Section>
                            <Dropdown.Item icon={LayersTwo01}>Changelog</Dropdown.Item>
                            <Dropdown.Item icon={HelpCircle}>Support</Dropdown.Item>
                            <Dropdown.Item icon={Container}>API</Dropdown.Item>
                        </Dropdown.Section>
                        <Dropdown.Separator />
                        <Dropdown.Section>
                            <Dropdown.Item addon="⌥⇧Q" icon={LogOut01}>
                                Log out
                            </Dropdown.Item>
                        </Dropdown.Section>
                    </Dropdown.Menu>
                </Dropdown.Popover>
            </Dropdown.Root>
        </div>
    ),
};

export const DropdownIcon: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Dropdown Icon</h3>
            <Dropdown.Root>
                <Dropdown.DotsButton />

                <Dropdown.Popover>
                    <div className="flex gap-3 border-b border-secondary p-3">
                        <AvatarLabelGroup
                            size="md"
                            src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80"
                            status="online"
                            title="Olivia Rhye"
                            subtitle="olivia@untitledui.com"
                        />
                    </div>
                    <Dropdown.Menu>
                        <Dropdown.Section>
                            <Dropdown.Item addon="⌘K->P" icon={User01}>
                                View profile
                            </Dropdown.Item>
                            <Dropdown.Item addon="⌘S" icon={Settings01}>
                                Settings
                            </Dropdown.Item>
                        </Dropdown.Section>
                        <Dropdown.Separator />
                        <Dropdown.Section>
                            <Dropdown.Item icon={LayersTwo01}>Changelog</Dropdown.Item>
                            <Dropdown.Item icon={HelpCircle}>Support</Dropdown.Item>
                            <Dropdown.Item icon={Container}>API</Dropdown.Item>
                        </Dropdown.Section>
                        <Dropdown.Separator />
                        <Dropdown.Section>
                            <Dropdown.Item addon="⌥⇧Q" icon={LogOut01}>
                                Log out
                            </Dropdown.Item>
                        </Dropdown.Section>
                    </Dropdown.Menu>
                </Dropdown.Popover>
            </Dropdown.Root>
        </div>
    ),
};

export const DropdownAvatar: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Dropdown Avatar</h3>
            <Dropdown.Root>
                <AriaButton
                    className={({ isPressed, isFocusVisible }) =>
                        cx(
                            "group relative inline-flex cursor-pointer rounded-full outline-focus-ring",
                            (isPressed || isFocusVisible) && "outline-2 outline-offset-2",
                        )
                    }
                >
                    <Avatar alt="Olivia Rhye" src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80" size="md" />
                </AriaButton>

                <Dropdown.Popover>
                    <div className="flex gap-3 border-b border-secondary p-3">
                        <AvatarLabelGroup
                            size="md"
                            src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80"
                            status="online"
                            title="Olivia Rhye"
                            subtitle="olivia@untitledui.com"
                        />
                    </div>
                    <Dropdown.Menu>
                        <Dropdown.Section>
                            <Dropdown.Item addon="⌘K->P" icon={User01}>
                                View profile
                            </Dropdown.Item>
                            <Dropdown.Item addon="⌘S" icon={Settings01}>
                                Settings
                            </Dropdown.Item>
                        </Dropdown.Section>
                        <Dropdown.Separator />
                        <Dropdown.Section>
                            <Dropdown.Item icon={LayersTwo01}>Changelog</Dropdown.Item>
                            <Dropdown.Item icon={HelpCircle}>Support</Dropdown.Item>
                            <Dropdown.Item icon={Container}>API</Dropdown.Item>
                        </Dropdown.Section>
                        <Dropdown.Separator />
                        <Dropdown.Section>
                            <Dropdown.Item addon="⌥⇧Q" icon={LogOut01}>
                                Log out
                            </Dropdown.Item>
                        </Dropdown.Section>
                    </Dropdown.Menu>
                </Dropdown.Popover>
            </Dropdown.Root>
        </div>
    ),
};