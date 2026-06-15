import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Slider } from "./slider";


const meta = {
    title: "Components/Slider",
    component: Slider,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Free and open-source React slider components built for modern applications and websites. These sliders are built using React Aria and styled with Tailwind CSS.",
            },
        },
    },
    tags: ["autodocs"],
    argTypes: {
        labelPosition: {
            control: "select",
            options: ["default", "bottom", "top-floating"],
            description: "Position of the value label",
        },
    },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = Omit<StoryObj<typeof meta>, "args"> & {
    args?: Partial<React.ComponentProps<typeof Slider>>;
};

// Slider Example - Main docs content (hidden from sidebar, only shows in Docs tab)
export const SliderExample: Story = {
    render: () => (
        <div className="mt-10 space-y-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Slider Variants</h3>
                <div className="mb-7 max-w-lg space-y-2">
                    <p className="text-sm text-text-secondary">
                        Free and open-source React slider components built for modern applications and websites. These sliders are built using React Aria and
                        styled with Tailwind CSS.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    <Slider defaultValue={[0, 25]} />
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Comprehensive examples of slider variants, label positions, and states.",
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
            <div className="w-80">
                <Slider defaultValue={[0, 25]} />
            </div>
        </div>
    ),
};

export const BottomLabel: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Bottom Label</h3>
            <div className="w-80">
                <Slider defaultValue={[0, 25]} labelPosition="bottom" />
            </div>
        </div>
    ),
};

export const TopFloating: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Top Floating</h3>
            <div className="w-80 mt-14">
                <Slider defaultValue={[0, 25]} labelPosition="top-floating" />
            </div>
        </div>
    ),
};

export const SingleThumb: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Single Thumb</h3>
            <div className="w-80">
                <Slider defaultValue={50} labelPosition="top-floating" />
            </div>
        </div>
    ),
};