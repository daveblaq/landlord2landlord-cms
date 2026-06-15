import React from "react";
import type { Placement } from "@react-types/overlays";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { HelpCircle } from "@untitledui/icons";
import { Tooltip, TooltipTrigger } from "./tooltip";


const meta = {
    title: "Components/Tooltip",
    component: Tooltip,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Free and open-source React tooltip components built for modern applications and websites. These tooltips are built using React Aria and styled with Tailwind CSS.",
            },
        },
    },
    tags: ["autodocs"],
    argTypes: {
        placement: {
            control: "select",
            options: ["top", "bottom", "left", "right", "top left", "top right", "bottom left", "bottom right"],
            description: "Tooltip placement",
        },
        arrow: {
            control: "boolean",
            description: "Show arrow on tooltip",
        },
    },
} satisfies Meta<typeof Tooltip>;

const PLACEMENTS: { label: string; value: Placement }[] = [
    {
        label: "Top left",
        value: "top left",
    },
    {
        label: "Top",
        value: "top",
    },
    {
        label: "Top right",
        value: "top right",
    },
    {
        label: "Bottom left",
        value: "bottom left",
    },
    {
        label: "Bottom",
        value: "bottom",
    },
    {
        label: "Bottom right",
        value: "bottom right",
    },

    {
        label: "Left",
        value: "left",
    },

    {
        label: "Right",
        value: "right",
    },
];

export default meta;
type Story = Omit<StoryObj<typeof meta>, "args"> & {
    args?: Partial<React.ComponentProps<typeof Tooltip>>;
};

// Tooltip Example - Main docs content (hidden from sidebar, only shows in Docs tab)
export const TooltipExample: Story = {
    render: () => (
        <div className="mt-10 space-y-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Tooltip Variants</h3>
                <div className="mb-7 max-w-lg space-y-2">
                    <p className="text-sm text-text-secondary">
                        Free and open-source React tooltip components built for modern applications and websites. These tooltips are built using React Aria and
                        styled with Tailwind CSS.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    <Tooltip title="This is a tooltip">
                        <TooltipTrigger className="group relative flex cursor-pointer flex-col items-center gap-2 text-fg-quaternary transition duration-100 ease-linear hover:text-fg-quaternary_hover focus:text-fg-quaternary_hover">
                            <HelpCircle className="size-4" />
                        </TooltipTrigger>
                    </Tooltip>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Comprehensive examples of tooltip variants, placements, and states.",
            },
        },
        // Hide from sidebar, only show in Docs tab
        docsOnly: true,
    },
};

export const Default: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Default</h3>
            <div className="mb-7 max-w-lg space-y-2">
                <p className="text-sm text-text-secondary">
                    Tooltips are used to display additional information when hovering over an element. This is how our tooltip component looks by default:
                </p>
            </div>
            <Tooltip title="This is a tooltip">
                <TooltipTrigger className="group relative flex cursor-pointer flex-col items-center gap-2 text-fg-quaternary transition duration-100 ease-linear hover:text-fg-quaternary_hover focus:text-fg-quaternary_hover">
                    <HelpCircle className="size-4" />
                </TooltipTrigger>
            </Tooltip>
        </div>
    ),
};

export const WithArrow: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">With Arrow</h3>
            <div className="mb-7 max-w-lg space-y-2">
                <p className="text-sm text-text-secondary">
                    You can add an arrow to the tooltip by passing the arrow boolean prop to the Tooltip component. This will add an arrow to the tooltip that
                    points to the element being hovered over.
                </p>
            </div>
            <Tooltip arrow title="This is a tooltip">
                <TooltipTrigger className="group relative flex cursor-pointer flex-col items-center gap-2 text-fg-quaternary transition duration-100 ease-linear hover:text-fg-quaternary_hover focus:text-fg-quaternary_hover">
                    <HelpCircle className="size-4" />
                </TooltipTrigger>
            </Tooltip>
        </div>
    ),
};

export const WithSupportingText: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">With Supporting Text</h3>
            <div className="mb-7 max-w-lg space-y-2">
                <p className="text-sm text-text-secondary">
                    In situations where you want to provide more context for the tooltip, you can pass a description to the Tooltip component. This will display
                    the description below the tooltip title.
                </p>
            </div>
            <Tooltip
                title="This is a tooltip"
                description="Tooltips are used to describe or identify an element. In most scenarios, tooltip help the user understand meaning, function or alt-text."
            >
                <TooltipTrigger className="group relative flex cursor-pointer flex-col items-center gap-2 text-fg-quaternary transition duration-100 ease-linear hover:text-fg-quaternary_hover focus:text-fg-quaternary_hover">
                    <HelpCircle className="size-4" />
                </TooltipTrigger>
            </Tooltip>
        </div>
    ),
};

export const Placements: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Placements</h3>
            <div className="mb-7 max-w-lg space-y-2">
                <p className="text-sm text-text-secondary">
                    Since our tooltip component is built with React Aria, it supports all the placements that React Aria supports. You can set the placement
                    using the placement prop on the Tooltip component. To see the full list of placements, check out the tooltip props in the React Aria
                    documentation.
                </p>
            </div>
            <div className="flex flex-col items-center gap-8 p-20">
                <div className="grid grid-cols-3 gap-12">
                    {PLACEMENTS.map((side, index) => (
                        <div key={index} className="flex flex-col items-center justify-center gap-1 text-center">
                            <Tooltip placement={side.value} title="This is a tooltip">
                                <TooltipTrigger className="cursor-pointer text-fg-quaternary transition duration-100 ease-linear hover:text-fg-quaternary_hover focus:text-fg-quaternary_hover">
                                    <HelpCircle className="size-4" />
                                </TooltipTrigger>
                            </Tooltip>
                            <span className="text-xs whitespace-nowrap text-secondary">{side.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    ),
};