import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Plus } from "@untitledui/icons";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { Button } from "@/components/base/buttons/button";
import { SectionFooter } from "./section-footer";

const meta = {
    title: "Application/Section Footers",
    component: SectionFooter.Root,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Section footer components for displaying action buttons at the bottom of sections. Available in regular and card variants with button groups.",
            },
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof SectionFooter.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

// Section footer examples - Main docs content
export const SectionFooterExamples: Story = {
    args: { children: null },
    render: () => (
        <div className="mt-10 w-full space-y-8">
            <div className="w-full max-w-4xl">
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Section footer examples</h3>
                <SectionFooter.Root>
                    <ButtonGroup>
                        <ButtonGroupItem isSelected>
                            <span className="max-lg:hidden">12 months</span>
                            <span className="lg:hidden">12m</span>
                        </ButtonGroupItem>
                        <ButtonGroupItem>
                            <span className="max-lg:hidden">30 days</span>
                            <span className="lg:hidden">30d</span>
                        </ButtonGroupItem>
                        <ButtonGroupItem>
                            <span className="max-lg:hidden">7 days</span>
                            <span className="lg:hidden">7d</span>
                        </ButtonGroupItem>
                        <ButtonGroupItem iconLeading={Plus} className="px-3 lg:px-4">
                            <span className="max-lg:hidden">Custom</span>
                        </ButtonGroupItem>
                    </ButtonGroup>

                    <Button href="#" color="link-gray" size="sm">
                        Learn more
                    </Button>

                    <SectionFooter.Actions>
                        <Button color="tertiary" size="sm">
                            Tertiary
                        </Button>
                        <Button color="secondary" size="sm">
                            Secondary
                        </Button>
                        <Button color="primary" size="sm">
                            Primary
                        </Button>
                    </SectionFooter.Actions>
                </SectionFooter.Root>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Section footer components with various action configurations.",
            },
        },
        docsOnly: true,
    },
};

// Section footer button group
export const SectionFooterButtonGroup: Story = {
    args: { children: null },
    render: () => (
        <div className="mt-10 w-full space-y-8">
            <div className="w-full max-w-4xl">
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Section footer button group</h3>
                <SectionFooter.Root>
                    <ButtonGroup>
                        <ButtonGroupItem isSelected>
                            <span className="max-lg:hidden">12 months</span>
                            <span className="lg:hidden">12m</span>
                        </ButtonGroupItem>
                        <ButtonGroupItem>
                            <span className="max-lg:hidden">30 days</span>
                            <span className="lg:hidden">30d</span>
                        </ButtonGroupItem>
                        <ButtonGroupItem>
                            <span className="max-lg:hidden">7 days</span>
                            <span className="lg:hidden">7d</span>
                        </ButtonGroupItem>
                        <ButtonGroupItem iconLeading={Plus} className="px-3 lg:px-4">
                            <span className="max-lg:hidden">Custom</span>
                        </ButtonGroupItem>
                    </ButtonGroup>

                    <Button href="#" color="link-gray" size="sm">
                        Learn more
                    </Button>

                    <SectionFooter.Actions>
                        <Button color="tertiary" size="sm">
                            Tertiary
                        </Button>
                        <Button color="secondary" size="sm">
                            Secondary
                        </Button>
                        <Button color="primary" size="sm">
                            Primary
                        </Button>
                    </SectionFooter.Actions>
                </SectionFooter.Root>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Section footer with button group on the left and action buttons on the right.",
            },
        },
    },
};

// Section footer
export const SectionFooterBasic: Story = {
    args: { children: null },
    render: () => (
        <div className="mt-10 w-full space-y-8">
            <div className="w-full max-w-4xl">
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Section footer</h3>
                <SectionFooter.Root>
                    <Button href="#" color="link-gray" size="sm">
                        Learn more
                    </Button>

                    <SectionFooter.Actions>
                        <Button color="tertiary" size="sm">
                            Tertiary
                        </Button>
                        <Button color="secondary" size="sm">
                            Secondary
                        </Button>
                        <Button color="primary" size="sm">
                            Primary
                        </Button>
                    </SectionFooter.Actions>
                </SectionFooter.Root>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Basic section footer with action buttons.",
            },
        },
    },
};

// Section footer card button group
export const SectionFooterCardButtonGroup: Story = {
    args: { children: null },
    render: () => (
        <div className="mt-10 w-full space-y-8">
            <div className="w-full max-w-4xl">
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Section footer card button group</h3>
                <div className="rounded-xl border border-secondary bg-primary">
                    <div className="p-4 md:p-6">
                        <p className="text-sm text-tertiary">Card content goes here</p>
                    </div>
                    <SectionFooter.Root isCard>
                        <ButtonGroup>
                            <ButtonGroupItem isSelected>
                                <span className="max-lg:hidden">12 months</span>
                                <span className="lg:hidden">12m</span>
                            </ButtonGroupItem>
                            <ButtonGroupItem>
                                <span className="max-lg:hidden">30 days</span>
                                <span className="lg:hidden">30d</span>
                            </ButtonGroupItem>
                            <ButtonGroupItem>
                                <span className="max-lg:hidden">7 days</span>
                                <span className="lg:hidden">7d</span>
                            </ButtonGroupItem>
                            <ButtonGroupItem iconLeading={Plus} className="px-3 lg:px-4">
                                <span className="max-lg:hidden">Custom</span>
                            </ButtonGroupItem>
                        </ButtonGroup>

                        <Button href="#" color="link-gray" size="sm">
                            Learn more
                        </Button>

                        <SectionFooter.Actions>
                            <Button color="tertiary" size="sm">
                                Tertiary
                            </Button>
                            <Button color="secondary" size="sm">
                                Secondary
                            </Button>
                            <Button color="primary" size="sm">
                                Primary
                            </Button>
                        </SectionFooter.Actions>
                    </SectionFooter.Root>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Section footer inside a card with button group on the left and action buttons on the right.",
            },
        },
    },
};

// Section footer card
export const SectionFooterCard: Story = {
    args: { children: null },
    render: () => (
        <div className="mt-10 w-full space-y-8">
            <div className="w-full max-w-4xl">
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Section footer card</h3>
                <div className="rounded-xl border border-secondary bg-primary">
                    <div className="p-4 md:p-6">
                        <p className="text-sm text-tertiary">Card content goes here</p>
                    </div>
                    <SectionFooter.Root isCard>
                        <Button href="#" color="link-gray" size="sm">
                            Learn more
                        </Button>

                        <SectionFooter.Actions>
                            <Button color="tertiary" size="sm">
                                Tertiary
                            </Button>
                            <Button color="secondary" size="sm">
                                Secondary
                            </Button>
                            <Button color="primary" size="sm">
                                Primary
                            </Button>
                        </SectionFooter.Actions>
                    </SectionFooter.Root>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Section footer inside a card with action buttons.",
            },
        },
    },
};
