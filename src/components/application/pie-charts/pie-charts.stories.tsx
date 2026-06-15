import type { Meta, StoryObj } from "@storybook/react-vite";
import { PieChartLg as PieChartLgComponent } from "./pie-chartlg";
import { PieChartMd as PieChartMdComponent } from "./pie-chartmd";
import { PieChartSm as PieChartSmComponent } from "./pie-chartsm";
import { PieChartXs as PieChartXsComponent } from "./pie-chartxs";
import { PieChartXxs as PieChartXxsComponent } from "./pie-chartxxl";

const meta = {
    title: "Application/Pie Charts",
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component: "Pie chart components for displaying data in a circular chart format with different sizes.",
            },
        },
    },
    tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Pie chart examples
export const PieChartExamples: Story = {
    render: () => (
        <div className="flex flex-col gap-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Pie chart examples</h3>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Various pie chart examples showing different sizes and configurations.",
            },
        },
        docsOnly: true,
    },
};

// Pie chart xxl
export const PieChartXxl: Story = {
    render: () => (
        <div style={{ width: "210px" }}>
            <PieChartXxsComponent />
        </div>
    ),
    parameters: {
        layout: "centered",
        docs: {
            description: {
                story: "Extra extra large pie chart with compact dimensions.",
            },
        },
    },
};

// Pie chart xs
export const PieChartXs: Story = {
    render: () => (
        <div style={{ width: "250px" }}>
            <PieChartXsComponent />
        </div>
    ),
    parameters: {
        layout: "centered",
        docs: {
            description: {
                story: "Extra small pie chart component.",
            },
        },
    },
};

// Pie chart sm
export const PieChartSm: Story = {
    render: () => (
        <div style={{ width: "290px" }}>
            <PieChartSmComponent />
        </div>
    ),
    parameters: {
        layout: "centered",
        docs: {
            description: {
                story: "Small pie chart component.",
            },
        },
    },
};

// Pie chart md
export const PieChartMd: Story = {
    render: () => (
        <div style={{ width: "384px" }}>
            <PieChartMdComponent />
        </div>
    ),
    parameters: {
        layout: "centered",
        docs: {
            description: {
                story: "Medium pie chart component.",
            },
        },
    },
};

// Pie chart lg
export const PieChartLg: Story = {
    render: () => (
        <div style={{ width: "384px" }}>
            <PieChartLgComponent />
        </div>
    ),
    parameters: {
        layout: "centered",
        docs: {
            description: {
                story: "Large pie chart component.",
            },
        },
    },
};
