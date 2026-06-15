import type { Meta, StoryObj } from "@storybook/react-vite";
import { BarChart as BarChart01Component } from "./bar-chart-01";
import { BarChart02 as BarChart02Component } from "./bar-chart-02";
import { BarChart03 as BarChart03Component } from "./bar-chart-03";

const meta = {
    title: "Application/Bar Charts",
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component: "Bar chart components for displaying data in bar format with different configurations.",
            },
        },
    },
    tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Bar chart 01
export const BarChart01: Story = {
    render: () => (
        <div style={{ width: "800px", height: "400px" }}>
            <BarChart01Component />
        </div>
    ),
    parameters: {
        layout: "centered",
        docs: {
            description: {
                story: "Bar chart variant 01 with multiple data series and responsive design.",
            },
        },
    },
};

// Bar chart 02
export const BarChart02: Story = {
    render: () => (
        <div style={{ width: "800px", height: "400px" }}>
            <BarChart02Component />
        </div>
    ),
    parameters: {
        layout: "centered",
        docs: {
            description: {
                story: "Bar chart variant 02 with different styling and configuration.",
            },
        },
    },
};

// Bar chart 03
export const BarChart03: Story = {
    render: () => (
        <div style={{ width: "800px", height: "400px" }}>
            <BarChart03Component />
        </div>
    ),
    parameters: {
        layout: "centered",
        docs: {
            description: {
                story: "Bar chart variant 03 with alternative layout and features.",
            },
        },
    },
};

