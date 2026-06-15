import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SearchLg } from "@untitledui/icons";
import { TabList, Tabs } from "@/components/application/tabs/tabs";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { NativeSelect } from "@/components/base/select/select-native";
import { TableRowActionsDropdown } from "../table/table";
import { SectionHeader } from "./section-headers";

const meta = {
    title: "Application/Section Headers",
    component: SectionHeader.Root,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component: "Section header components for displaying page or section titles with optional actions, search inputs, button groups, and tabs.",
            },
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof SectionHeader.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

const TabsButtonBorder = (props: { size?: "sm" | "md"; orientation?: "horizontal" | "vertical"; tabListClassName?: string }) => {
    const [selectedTabIndex, setSelectedTabIndex] = useState<string>("details");

    return (
        <div>
            <NativeSelect
                aria-label="Tabs"
                className="sm:hidden"
                value={selectedTabIndex}
                onChange={(event) => setSelectedTabIndex(event.target.value)}
                options={tabs.map((tab) => ({ label: tab.label, value: tab.id }))}
            />
            <Tabs
                orientation={props.orientation}
                selectedKey={selectedTabIndex}
                onSelectionChange={(key) => setSelectedTabIndex(String(key))}
                className="hidden sm:block"
            >
                <TabList {...props} className={props.tabListClassName} type="button-border" items={tabs} />
            </Tabs>
        </div>
    );
};

const tabs = [
    { id: "details", label: "My details" },
    { id: "profile", label: "Profile" },
    { id: "password", label: "Password" },
    { id: "team", label: "Team" },
    { id: "plan", label: "Plan" },
    { id: "billing", label: "Billing" },
    { id: "email", label: "Email" },
    { id: "notifications", label: "Notifications", badge: 2 },
    { id: "integrations", label: "Integrations" },
    { id: "api", label: "API" },
];

// Section header examples - Main docs content
export const SectionHeaderExamples: Story = {
    args: { children: null },
    render: () => (
        <div className="mt-10 w-full space-y-8">
            <div className="w-full max-w-4xl">
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Section header examples</h3>
                <SectionHeader.Root>
                    <SectionHeader.Group>
                        <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5 self-stretch">
                            <SectionHeader.Heading>Team members</SectionHeader.Heading>
                            <SectionHeader.Subheading>Manage your team members and their account permissions here.</SectionHeader.Subheading>
                        </div>
                        <div className="w-full md:w-80">
                            <Input shortcut size="sm" aria-label="Search" placeholder="Search" icon={SearchLg} />
                        </div>
                    </SectionHeader.Group>
                    <TabsButtonBorder tabListClassName="w-full gap-2" />
                </SectionHeader.Root>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Section header components with various action configurations.",
            },
        },
        docsOnly: true,
    },
};

// Section header buttons
export const SectionHeaderButtons: Story = {
    args: { children: null },
    render: () => (
        <div className="mt-10 w-full space-y-8">
            <div className="w-full max-w-4xl">
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Section header buttons</h3>
                <SectionHeader.Root>
                    <SectionHeader.Group>
                        <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5 self-stretch">
                            <SectionHeader.Heading>Team members</SectionHeader.Heading>
                            <SectionHeader.Subheading>Manage your team members and their account permissions here.</SectionHeader.Subheading>
                        </div>
                        <SectionHeader.Actions>
                            <Button color="tertiary" size="sm" className="max-md:hidden">
                                Tertiary
                            </Button>
                            <Button color="secondary" size="sm">
                                Secondary
                            </Button>
                            <Button color="primary" size="sm">
                                Primary
                            </Button>
                        </SectionHeader.Actions>
                        <div className="absolute top-0 right-0 md:static">
                            <TableRowActionsDropdown />
                        </div>
                    </SectionHeader.Group>
                </SectionHeader.Root>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Section header with action buttons.",
            },
        },
    },
};

// Section header search input
export const SectionHeaderSearchInput: Story = {
    args: { children: null },
    render: () => (
        <div className="mt-10 w-full space-y-8">
            <div className="w-full max-w-4xl">
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Section header search input</h3>
                <SectionHeader.Root>
                    <SectionHeader.Group>
                        <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5">
                            <SectionHeader.Heading>Team members</SectionHeader.Heading>
                            <SectionHeader.Subheading>Manage your team members and their account permissions here.</SectionHeader.Subheading>
                        </div>
                        <div className="w-full md:w-80">
                            <Input shortcut size="sm" aria-label="Search" placeholder="Search" icon={SearchLg} />
                        </div>
                    </SectionHeader.Group>
                </SectionHeader.Root>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Section header with search input field.",
            },
        },
    },
};

// Section header button group
export const SectionHeaderButtonGroup: Story = {
    args: { children: null },
    render: () => (
        <div className="mt-10 w-full space-y-8">
            <div className="w-full max-w-4xl">
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Section header button group</h3>
                <SectionHeader.Root>
                    <SectionHeader.Group>
                        <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5 self-stretch">
                            <SectionHeader.Heading>Team members</SectionHeader.Heading>
                            <SectionHeader.Subheading>Manage your team members and their account permissions here.</SectionHeader.Subheading>
                        </div>
                        <ButtonGroup>
                            <ButtonGroupItem>Text</ButtonGroupItem>
                            <ButtonGroupItem>Text</ButtonGroupItem>
                            <ButtonGroupItem>Text</ButtonGroupItem>
                        </ButtonGroup>
                        <div className="absolute top-0 right-0 md:static">
                            <TableRowActionsDropdown />
                        </div>
                    </SectionHeader.Group>
                </SectionHeader.Root>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Section header with button group and additional actions.",
            },
        },
    },
};

// Section header buttons with tabs
export const SectionHeaderButtonsWithTabs: Story = {
    args: { children: null },
    render: () => (
        <div className="mt-10 w-full space-y-8">
            <div className="w-full max-w-4xl">
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Section header buttons with tabs</h3>
                <SectionHeader.Root>
                    <SectionHeader.Group>
                        <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5 self-stretch">
                            <SectionHeader.Heading>Team members</SectionHeader.Heading>
                            <SectionHeader.Subheading>Manage your team members and their account permissions here.</SectionHeader.Subheading>
                        </div>
                        <SectionHeader.Actions>
                            <Button color="tertiary" size="sm" className="max-md:hidden">
                                Tertiary
                            </Button>
                            <Button color="secondary" size="sm">
                                Secondary
                            </Button>
                            <Button color="primary" size="sm">
                                Primary
                            </Button>
                        </SectionHeader.Actions>
                        <div className="absolute top-0 right-0 md:static">
                            <TableRowActionsDropdown />
                        </div>
                    </SectionHeader.Group>

                    <TabsButtonBorder tabListClassName="w-full gap-2" />
                </SectionHeader.Root>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Section header with action buttons and tabs for filtering.",
            },
        },
    },
};

// Section header search input with tabs
export const SectionHeaderSearchInputWithTabs: Story = {
    args: { children: null },
    render: () => (
        <div className="mt-10 w-full space-y-8">
            <div className="w-full max-w-4xl">
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Section header search input with tabs</h3>
                <SectionHeader.Root>
                    <SectionHeader.Group>
                        <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5 self-stretch">
                            <SectionHeader.Heading>Team members</SectionHeader.Heading>
                            <SectionHeader.Subheading>Manage your team members and their account permissions here.</SectionHeader.Subheading>
                        </div>
                        <div className="w-full md:w-80">
                            <Input shortcut size="sm" aria-label="Search" placeholder="Search" icon={SearchLg} />
                        </div>
                    </SectionHeader.Group>
                    <TabsButtonBorder tabListClassName="w-full gap-2" />
                </SectionHeader.Root>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Section header with search input and tabs for filtering.",
            },
        },
    },
};

// Section header button groups with tabs
export const SectionHeaderButtonGroupsWithTabs: Story = {
    args: { children: null },
    render: () => (
        <div className="mt-10 w-full space-y-8">
            <div className="w-full max-w-4xl">
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Section header button groups with tabs</h3>
                <SectionHeader.Root>
                    <SectionHeader.Group>
                        <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5 self-stretch">
                            <SectionHeader.Heading>Team members</SectionHeader.Heading>
                            <SectionHeader.Subheading>Manage your team members and their account permissions here.</SectionHeader.Subheading>
                        </div>
                        <ButtonGroup>
                            <ButtonGroupItem>Text</ButtonGroupItem>
                            <ButtonGroupItem>Text</ButtonGroupItem>
                            <ButtonGroupItem>Text</ButtonGroupItem>
                        </ButtonGroup>
                        <div className="absolute top-0 right-0 md:static">
                            <TableRowActionsDropdown />
                        </div>
                    </SectionHeader.Group>
                    <TabsButtonBorder tabListClassName="w-full gap-2" />
                </SectionHeader.Root>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Section header with button groups, additional actions, and tabs for filtering.",
            },
        },
    },
};
