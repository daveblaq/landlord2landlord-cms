import type { Meta, StoryObj } from "@storybook/react-vite";
import { LineChart01 as LineChart01Component } from "./line-chart-01";
import { LineChart02 as LineChart02Component } from "./line-chart-02";
import { LineChart03 as LineChart03Component } from "./line-chart-03";
import { LineChart04 as LineChart04Component } from "./line-chart-04";

const meta = {
    title: "Application/Line Charts",
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component: "Line chart components for displaying data trends over time with different configurations.",
            },
        },
    },
    tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Line chart 01
export const LineChart01: Story = {
    render: () => (
        <div style={{ width: "800px", height: "400px" }}>
            <LineChart01Component />
        </div>
    ),
    parameters: {
        layout: "centered",
        docs: {
            description: {
                story: "Line chart variant 01 with area fill and multiple data series.",
            },
        },
    },
};

// Line chart 02
export const LineChart02: Story = {
    render: () => (
        <div style={{ width: "800px", height: "400px" }}>
            <LineChart02Component />
        </div>
    ),
    parameters: {
        layout: "centered",
        docs: {
            description: {
                story: "Line chart variant 02 with different styling and configuration.",
            },
        },
    },
};

// Line chart 03
export const LineChart03: Story = {
    render: () => (
        <div style={{ width: "800px", height: "400px" }}>
            <LineChart03Component />
        </div>
    ),
    parameters: {
        layout: "centered",
        docs: {
            description: {
                story: "Line chart variant 03 with alternative layout and features.",
            },
        },
    },
};

// Line chart 04
export const LineChart04: Story = {
    render: () => (
        <div style={{ width: "800px", height: "400px" }}>
            <LineChart04Component />
        </div>
    ),
    parameters: {
        layout: "centered",
        docs: {
            description: {
                story: "Line chart variant 04 with enhanced features and styling.",
            },
        },
    },
};
