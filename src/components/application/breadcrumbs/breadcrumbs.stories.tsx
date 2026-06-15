import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Home01, HomeLine } from "@untitledui/icons";
import { Breadcrumbs } from "./breadcrumbs";

const meta = {
    title: "Application/Breadcrumbs",
    component: Breadcrumbs,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Breadcrumbs provide navigation context and help users understand their location within the application hierarchy. Built with React Aria for accessibility.",
            },
        },
    },
    tags: ["autodocs"],
    argTypes: {
        type: {
            control: "select",
            options: ["text", "text-line", "button"],
            description: "Breadcrumb style variant",
        },
        divider: {
            control: "select",
            options: ["chevron", "slash"],
            description: "Divider style between breadcrumb items",
        },
        maxVisibleItems: {
            control: "number",
            description: "Maximum number of visible items before collapsing",
        },
    },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

// Breadcrumbs Example - Main docs content (hidden from sidebar, only shows in Docs tab)
export const BreadcrumbsExample: Story = {
    args: { children: null },
    render: () => (
        <div className="mt-10 space-y-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Breadcrumb components</h3>

                <div className="flex flex-col gap-8">
                    <Breadcrumbs>
                        <Breadcrumbs.Item href="#" icon={HomeLine} />
                        <Breadcrumbs.Item href="#">Settings</Breadcrumbs.Item>
                        <Breadcrumbs.Item href="#">Profile</Breadcrumbs.Item>
                        <Breadcrumbs.Item href="#">Billing</Breadcrumbs.Item>
                        <Breadcrumbs.Item href="#">Team</Breadcrumbs.Item>
                    </Breadcrumbs>
                    <Breadcrumbs divider="slash">
                        <Breadcrumbs.Item href="#" icon={HomeLine} />
                        <Breadcrumbs.Item href="#">Settings</Breadcrumbs.Item>
                        <Breadcrumbs.Item href="#">Profile</Breadcrumbs.Item>
                        <Breadcrumbs.Item href="#">Billing</Breadcrumbs.Item>
                        <Breadcrumbs.Item href="#">Team</Breadcrumbs.Item>
                    </Breadcrumbs>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Comprehensive examples of breadcrumb variants and styles.",
            },
        },
        // Hide from sidebar, only show in Docs tab
        docsOnly: true,
    },
};

// Breadcrumbs Text
export const BreadcrumbsText: Story = {
    args: { children: null },
    render: () => (
        <div className="mt-10 space-y-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Breadcrumbs Text</h3>
                <div className="flex flex-col gap-8">
                    <Breadcrumbs>
                        <Breadcrumbs.Item href="#" icon={HomeLine} />
                        <Breadcrumbs.Item href="#">Settings</Breadcrumbs.Item>
                        <Breadcrumbs.Item href="#">Profile</Breadcrumbs.Item>
                        <Breadcrumbs.Item href="#">Billing</Breadcrumbs.Item>
                        <Breadcrumbs.Item href="#">Team</Breadcrumbs.Item>
                    </Breadcrumbs>
                    <Breadcrumbs divider="slash">
                        <Breadcrumbs.Item href="#" icon={HomeLine} />
                        <Breadcrumbs.Item href="#">Settings</Breadcrumbs.Item>
                        <Breadcrumbs.Item href="#">Profile</Breadcrumbs.Item>
                        <Breadcrumbs.Item href="#">Billing</Breadcrumbs.Item>
                        <Breadcrumbs.Item href="#">Team</Breadcrumbs.Item>
                    </Breadcrumbs>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Text-based breadcrumbs with various configurations including icons, dividers, and long paths.",
            },
        },
    },
};

// Breadcrumbs Text with Line
export const BreadcrumbsTextWithLine: Story = {
    args: { children: null },
    render: () => (
        <div className="mt-10 space-y-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Breadcrumbs Text with Line</h3>
                <div className="flex flex-col gap-8">
                    <Breadcrumbs type="text-line">
                        <Breadcrumbs.Item href="#" icon={HomeLine} />
                        <Breadcrumbs.Item href="#">Settings</Breadcrumbs.Item>
                        <Breadcrumbs.Item href="#">Profile</Breadcrumbs.Item>
                        <Breadcrumbs.Item href="#">Billing</Breadcrumbs.Item>
                        <Breadcrumbs.Item href="#">Team</Breadcrumbs.Item>
                    </Breadcrumbs>
                    <Breadcrumbs type="text-line" divider="slash">
                        <Breadcrumbs.Item href="#" icon={HomeLine} />
                        <Breadcrumbs.Item href="#">Settings</Breadcrumbs.Item>
                        <Breadcrumbs.Item href="#">Profile</Breadcrumbs.Item>
                        <Breadcrumbs.Item href="#">Billing</Breadcrumbs.Item>
                        <Breadcrumbs.Item href="#">Team</Breadcrumbs.Item>
                    </Breadcrumbs>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Text breadcrumbs with border lines, suitable for contexts where visual separation is needed.",
            },
        },
    },
};

// Breadcrumbs Button
export const BreadcrumbsButton: Story = {
    args: { children: null },
    render: () => (
        <div className="mt-10 space-y-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Breadcrumbs Button</h3>
                <div className="flex flex-col gap-8">
                    <Breadcrumbs type="button">
                        <Breadcrumbs.Item href="#" icon={HomeLine} />
                        <Breadcrumbs.Item href="#">Settings</Breadcrumbs.Item>
                        <Breadcrumbs.Item href="#">Profile</Breadcrumbs.Item>
                        <Breadcrumbs.Item href="#">Billing</Breadcrumbs.Item>
                        <Breadcrumbs.Item href="#">Team</Breadcrumbs.Item>
                    </Breadcrumbs>
                    <Breadcrumbs type="button" divider="slash">
                        <Breadcrumbs.Item href="#" icon={HomeLine} />
                        <Breadcrumbs.Item href="#">Settings</Breadcrumbs.Item>
                        <Breadcrumbs.Item href="#">Profile</Breadcrumbs.Item>
                        <Breadcrumbs.Item href="#">Billing</Breadcrumbs.Item>
                        <Breadcrumbs.Item href="#">Team</Breadcrumbs.Item>
                    </Breadcrumbs>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Button-style breadcrumbs with interactive hover states and button-like appearance for each item.",
            },
        },
    },
};
