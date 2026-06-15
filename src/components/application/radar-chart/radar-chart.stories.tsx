import type { Meta, StoryObj } from "@storybook/react-vite";
import { RadarChart } from "./radar-chart";

const meta = {
    title: "Application/Radar Chart",
    component: RadarChart,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component: "Radar chart component for displaying multi-dimensional data in a circular/spider chart format.",
            },
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof RadarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

// Radar chart
export const RadarChartStory: Story = {
    render: () => (
        <div style={{ width: "600px", height: "500px" }}>
            <RadarChart />
        </div>
    ),
    parameters: {
        layout: "centered",
        docs: {
            description: {
                story: "Radar chart displaying multiple data series in a circular/spider chart format with customizable colors and tooltips.",
            },
        },
    },
};

