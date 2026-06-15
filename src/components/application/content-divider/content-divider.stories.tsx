import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowLeft, ArrowRight, Plus } from "@untitledui/icons";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { Button } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";
import { ContentDivider } from "./content-divider";

const meta = {
    title: "Application/Content Dividers",
    component: ContentDivider,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Content divider components for separating sections with different visual styles. Available in single-line, dual-line, and background-fill variants.",
            },
        },
    },
    tags: ["autodocs"],
    argTypes: {
        type: {
            control: "select",
            options: ["single-line", "dual-line", "background-fill"],
            description: "Divider style variant",
        },
        children: {
            control: "text",
            description: "Content to display between divider lines",
        },
    },
} satisfies Meta<typeof ContentDivider>;

export default meta;
type Story = StoryObj<typeof meta>;

// Content dividers examples - Main docs content
export const ContentDividersExamples: Story = {
    args: { type: "single-line", children: "Continue" },
    render: () => (
        <div className="mt-10 w-full space-y-8">
            <div className="w-full max-w-xl">
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Content dividers examples</h3>
                <ContentDivider type="single-line">
                    <span className="text-lg font-semibold text-primary">Notifications</span>
                </ContentDivider>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Content divider components for visually separating sections with various styles.",
            },
        },
        docsOnly: true,
    },
};

const PlaceholderContent = ({ reverse, bg = true }: { reverse?: boolean; bg?: boolean }) => (
    <div
        style={{
            backgroundImage: `repeating-linear-gradient(${reverse ? "-45deg" : "45deg"}, transparent, transparent 8px, var(--color-border-secondary) 8px, var(--color-border-secondary) 9px)`,
        }}
        className={cx("mx-auto h-24 w-full rounded-lg border border-secondary opacity-50", bg && "bg-secondary")}
    />
);

// Single line
export const SingleLine: Story = {
    args: { type: "single-line", children: "Continue" },
    render: () => (
        <div className="mt-10 w-full space-y-8">
            <div className="w-full max-w-xl">
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Single line</h3>
                <div className="flex w-full shrink-0 flex-col gap-8">
                    <PlaceholderContent />
                    <ContentDivider type="single-line">
                        <span className="text-lg font-semibold text-primary">Notifications</span>
                    </ContentDivider>
                    <PlaceholderContent reverse />
                    <ContentDivider type="single-line">
                        <span className="text-sm font-medium text-tertiary">Today</span>
                    </ContentDivider>
                    <PlaceholderContent />
                    <ContentDivider type="single-line">
                        <Button color="secondary" size="sm">
                            Add
                        </Button>
                    </ContentDivider>
                    <PlaceholderContent reverse />
                    <ContentDivider type="single-line">
                        <ButtonGroup selectedKeys={[]}>
                            <ButtonGroupItem id="arrow-left" iconLeading={ArrowLeft} aria-label="Previous" />
                            <ButtonGroupItem id="plus" iconLeading={Plus} aria-label="Add" />
                            <ButtonGroupItem id="arrow-right" iconLeading={ArrowRight} aria-label="Next" />
                        </ButtonGroup>
                    </ContentDivider>
                    <PlaceholderContent />
                    <ContentDivider type="single-line">
                        <ButtonGroup defaultSelectedKeys={["all"]}>
                            <ButtonGroupItem id="all">View all</ButtonGroupItem>
                            <ButtonGroupItem id="active">Active</ButtonGroupItem>
                            <ButtonGroupItem id="inactive">Inactive</ButtonGroupItem>
                        </ButtonGroup>
                    </ContentDivider>
                    <PlaceholderContent reverse />
                    <ContentDivider type="single-line">
                        <Button color="secondary" size="sm" iconLeading={Plus} aria-label="Add" />
                    </ContentDivider>
                    <PlaceholderContent />
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Content divider with lines on both sides of the content.",
            },
        },
    },
};

// Dual line
export const DualLine: Story = {
    args: { type: "dual-line", children: "Continue" },
    render: () => (
        <div className="mt-10 w-full space-y-8">
            <div className="w-full max-w-xl">
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Dual line</h3>
                <div className="flex w-full shrink-0 flex-col gap-8">
                    <PlaceholderContent />
                    <ContentDivider type="dual-line">
                        <span className="text-lg font-semibold text-primary">Notifications</span>
                    </ContentDivider>
                    <PlaceholderContent reverse />
                    <ContentDivider type="dual-line">
                        <span className="text-sm font-medium text-tertiary">Today</span>
                    </ContentDivider>
                    <PlaceholderContent />
                    <ContentDivider type="dual-line">
                        <Button color="secondary" size="sm">
                            Add
                        </Button>
                    </ContentDivider>
                    <PlaceholderContent reverse />
                    <ContentDivider type="dual-line">
                        <ButtonGroup selectedKeys={[]}>
                            <ButtonGroupItem id="arrow-left" iconLeading={ArrowLeft} aria-label="Previous" />
                            <ButtonGroupItem id="plus" iconLeading={Plus} aria-label="Add" />
                            <ButtonGroupItem id="arrow-right" iconLeading={ArrowRight} aria-label="Next" />
                        </ButtonGroup>
                    </ContentDivider>
                    <PlaceholderContent />
                    <ContentDivider type="dual-line">
                        <ButtonGroup defaultSelectedKeys={["all"]}>
                            <ButtonGroupItem id="all">View all</ButtonGroupItem>
                            <ButtonGroupItem id="active">Active</ButtonGroupItem>
                            <ButtonGroupItem id="inactive">Inactive</ButtonGroupItem>
                        </ButtonGroup>
                    </ContentDivider>
                    <PlaceholderContent reverse />
                    <ContentDivider type="dual-line">
                        <Button color="secondary" size="sm" iconLeading={Plus} aria-label="Add" />
                    </ContentDivider>
                    <PlaceholderContent />
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Content divider with border lines above and below the content.",
            },
        },
    },
};

// Background fill
export const BackgroundFill: Story = {
    args: { type: "background-fill", children: "Continue" },
    render: () => (
        <div className="mt-10 w-full space-y-8">
            <div className="w-full max-w-xl">
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Background fill</h3>
                <div className="flex w-full shrink-0 flex-col gap-8">
                    <PlaceholderContent bg={false} />
                    <ContentDivider type="background-fill">
                        <span className="text-lg font-semibold text-primary">Notifications</span>
                    </ContentDivider>
                    <PlaceholderContent bg={false} reverse />
                    <ContentDivider type="background-fill">
                        <span className="text-sm font-medium text-tertiary">Today</span>
                    </ContentDivider>
                    <PlaceholderContent bg={false} />
                    <ContentDivider type="background-fill">
                        <Button color="secondary" size="sm">
                            Add
                        </Button>
                    </ContentDivider>
                    <PlaceholderContent bg={false} reverse />
                    <ContentDivider type="background-fill">
                        <ButtonGroup selectedKeys={[]}>
                            <ButtonGroupItem id="arrow-left" iconLeading={ArrowLeft} aria-label="Previous" />
                            <ButtonGroupItem id="plus" iconLeading={Plus} aria-label="Add" />
                            <ButtonGroupItem id="arrow-right" iconLeading={ArrowRight} aria-label="Next" />
                        </ButtonGroup>
                    </ContentDivider>
                    <PlaceholderContent bg={false} />
                    <ContentDivider type="background-fill">
                        <ButtonGroup defaultSelectedKeys={["all"]}>
                            <ButtonGroupItem id="all">View all</ButtonGroupItem>
                            <ButtonGroupItem id="active">Active</ButtonGroupItem>
                            <ButtonGroupItem id="inactive">Inactive</ButtonGroupItem>
                        </ButtonGroup>
                    </ContentDivider>
                    <PlaceholderContent bg={false} reverse />
                    <ContentDivider type="background-fill">
                        <Button color="secondary" size="sm" iconLeading={Plus} aria-label="Add" />
                    </ContentDivider>
                    <PlaceholderContent bg={false} />
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Content divider with a filled background and rounded corners.",
            },
        },
    },
};
