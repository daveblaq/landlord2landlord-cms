import type { Meta, StoryObj } from "@storybook/react-vite";
import { ActivityGaugeLg as ActivityGaugeLgComponent } from "./activity-guage-lg";
import { ActivityGaugeMd as ActivityGaugeMdComponent } from "./activity-guage-md";
import { ActivityGaugeSm as ActivityGaugeSmComponent } from "./activity-guage-sm";
import { ActivityGaugeXs as ActivityGaugeXsComponent } from "./activity-guage-xs";

const meta = {
    title: "Application/Activity Gauges",
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component: "Activity gauge components for displaying radial/ring progress indicators with different sizes.",
            },
        },
    },
    tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Activity gauge xs
export const ActivityGaugeXs: Story = {
    render: () => (
        <div style={{ width: "300px", height: "220px" }}>
            <ActivityGaugeXsComponent />
        </div>
    ),
    parameters: {
        layout: "centered",
        docs: {
            description: {
                story: "Extra small activity gauge with compact dimensions.",
            },
        },
    },
};

// Activity gauge sm
export const ActivityGaugeSm: Story = {
    render: () => (
        <div style={{ width: "300px", height: "268px" }}>
            <ActivityGaugeSmComponent />
        </div>
    ),
    parameters: {
        layout: "centered",
        docs: {
            description: {
                story: "Small activity gauge component.",
            },
        },
    },
};

// Activity gauge md
export const ActivityGaugeMd: Story = {
    render: () => (
        <div style={{ width: "300px", height: "312px" }}>
            <ActivityGaugeMdComponent />
        </div>
    ),
    parameters: {
        layout: "centered",
        docs: {
            description: {
                story: "Medium activity gauge component.",
            },
        },
    },
};

// Activity gauge lg
export const ActivityGaugeLg: Story = {
    render: () => (
        <div style={{ width: "300px", height: "356px" }}>
            <ActivityGaugeLgComponent />
        </div>
    ),
    parameters: {
        layout: "centered",
        docs: {
            description: {
                story: "Large activity gauge component.",
            },
        },
    },
};
