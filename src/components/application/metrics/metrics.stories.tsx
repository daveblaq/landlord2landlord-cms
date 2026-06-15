import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Settings01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import {
    MetricsChart01,
    MetricsChart02,
    MetricsChart03,
    MetricsChart04,
    MetricsIcon01,
    MetricsIcon02,
    MetricsIcon03,
    MetricsIcon04,
    MetricsSimple,
} from "./metrics";

const meta = {
    title: "Application/Metrics",
    component: MetricsSimple,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Metrics components for displaying key performance indicators and statistics. Available in simple, icon, and chart variants with optional actions and footers.",
            },
        },
    },
    tags: ["autodocs"],
    argTypes: {
        title: {
            control: "text",
            description: "Main metric value",
        },
        subtitle: {
            control: "text",
            description: "Metric label or description",
        },
        trend: {
            control: "select",
            options: ["positive", "negative"],
            description: "Trend direction",
        },
        change: {
            control: "text",
            description: "Change percentage or value",
        },
    },
} satisfies Meta<typeof MetricsSimple>;

export default meta;
type Story = StoryObj<typeof meta>;

// Metrics Examples - Main docs content
export const MetricsExamples: Story = {
    args: { title: "", subtitle: "", type: "simple", trend: "positive", change: "" },
    render: () => (
        <div className="mt-10 w-full space-y-8">
            <div className="w-full">
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Metrics examples</h3>
                <MetricsChart04 title="2,000" subtitle="View 24 hours" change="100%" changeTrend="positive" changeDescription="vs last month" />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Comprehensive metrics components for displaying key performance indicators with various layouts and styles.",
            },
        },
        docsOnly: true,
    },
};

// Simple
export const Simple: Story = {
    args: { title: "", subtitle: "", type: "simple", trend: "positive", change: "" },
    render: () => (
        <div className="mt-10 w-full space-y-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Simple</h3>
                <MetricsSimple title="2,000" trend="positive" type="modern" footer={null} subtitle="Views 24 hours" change="100%" />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Simple metric card with basic information and change indicator.",
            },
        },
    },
};

// Simple actions
export const SimpleActions: Story = {
    args: { title: "", subtitle: "", type: "simple", trend: "positive", change: "" },
    render: () => (
        <div className="mt-10 w-full space-y-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Simple actions</h3>
                <MetricsSimple
                    title="2,000"
                    trend="positive"
                    type="modern"
                    subtitle="Views 24 hours"
                    change="100%"
                    footer={
                        <Button color="link-color" size="md" href="#">
                            View report
                        </Button>
                    }
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Simple metric card with footer actions.",
            },
        },
    },
};

// Icon 01
export const Icon01: Story = {
    args: { title: "", subtitle: "", type: "simple", trend: "positive", change: "" },
    render: () => (
        <div className="mt-10 w-full space-y-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Icon 01</h3>
                <MetricsIcon01 />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Metric card with featured icon at the top.",
            },
        },
    },
};

// Icon actions 01
export const IconActions01: Story = {
    args: { title: "", subtitle: "", type: "simple", trend: "positive", change: "" },
    render: () => (
        <div className="mt-10 w-full space-y-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Icon actions 01</h3>
                <MetricsIcon01
                    footer={
                        <Button color="link-color" size="md" href="#">
                            View report
                        </Button>
                    }
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Metric card with featured icon and footer actions.",
            },
        },
    },
};

// Icon 02
export const Icon02: Story = {
    args: { title: "", subtitle: "", type: "simple", trend: "positive", change: "" },
    render: () => (
        <div className="mt-10 w-full space-y-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Icon 02</h3>
                <MetricsIcon02 />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Metric card with icon and title on the same row.",
            },
        },
    },
};

// Icon actions 02
export const IconActions02: Story = {
    args: { title: "", subtitle: "", type: "simple", trend: "positive", change: "" },
    render: () => (
        <div className="mt-10 w-full space-y-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Icon actions 02</h3>
                <MetricsIcon02
                    footer={
                        <Button color="link-color" size="md" href="#">
                            View report
                        </Button>
                    }
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Metric card with icon, title on same row, and footer actions.",
            },
        },
    },
};

// Icon 03
export const Icon03: Story = {
    args: { title: "", subtitle: "", type: "simple", trend: "positive", change: "" },
    render: () => (
        <div className="mt-10 w-full space-y-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Icon 03</h3>
                <MetricsIcon03 />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Metric card with icon and trend indicator.",
            },
        },
    },
};

// Icon actions 03
export const IconActions03: Story = {
    args: { title: "", subtitle: "", type: "simple", trend: "positive", change: "" },
    render: () => (
        <div className="mt-10 w-full space-y-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Icon actions 03</h3>
                <MetricsIcon03
                    footer={
                        <>
                            <Button iconLeading={Settings01} color="tertiary" size="sm" />
                            <Button color="secondary" size="sm" href="#" className="ml-auto">
                                View report
                            </Button>
                        </>
                    }
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Metric card with icon, trend indicator, and footer actions.",
            },
        },
    },
};

// Icon 04
export const Icon04: Story = {
    args: { title: "", subtitle: "", type: "simple", trend: "positive", change: "" },
    render: () => (
        <div className="mt-10 w-full space-y-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Icon 04</h3>
                <MetricsIcon04 />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Metric card with horizontal layout, icon on the left.",
            },
        },
    },
};

// Icon actions 04
export const IconActions04: Story = {
    args: { title: "", subtitle: "", type: "simple", trend: "positive", change: "" },
    render: () => (
        <div className="mt-10 w-full space-y-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Icon actions 04</h3>
                <MetricsIcon04
                    footer={
                        <>
                            <Button iconLeading={Settings01} color="tertiary" size="sm" />
                            <Button color="secondary" size="sm" href="#" className="ml-auto">
                                View report
                            </Button>
                        </>
                    }
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Metric card with horizontal layout and footer actions.",
            },
        },
    },
};

// Chart 01
export const Chart01: Story = {
    args: { title: "", subtitle: "", type: "simple", trend: "positive", change: "" },
    render: () => (
        <div className="mt-10 w-full space-y-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Chart 01</h3>
                <MetricsChart01 />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Metric card with area chart visualization.",
            },
        },
    },
};

// Chart actions 01
export const ChartActions01: Story = {
    args: { title: "", subtitle: "", type: "simple", trend: "positive", change: "" },
    render: () => (
        <div className="mt-10 w-full space-y-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Chart actions 01</h3>
                <div className="flex flex-col gap-8">
                    <div className="w-full max-w-xl">
                        <MetricsChart01
                            footer={
                                <Button color="link-color" size="md" href="#">
                                    View report
                                </Button>
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Metric card with area chart and footer actions.",
            },
        },
    },
};

// Chart 02
export const Chart02: Story = {
    args: { title: "", subtitle: "", type: "simple", trend: "positive", change: "" },
    render: () => (
        <div className="mt-10 w-full space-y-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Chart 02</h3>
                <MetricsChart02 />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Metric card with icon, title, and area chart.",
            },
        },
    },
};

// Chart actions 02
export const ChartActions02: Story = {
    args: { title: "", subtitle: "", type: "simple", trend: "positive", change: "" },
    render: () => (
        <div className="mt-10 w-full space-y-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Chart actions 02</h3>
                <div className="flex flex-col gap-8">
                    <div className="w-full max-w-xl">
                        <MetricsChart02
                            footer={
                                <>
                                    <Button iconLeading={Settings01} color="tertiary" size="sm" />
                                    <Button color="secondary" size="sm" href="#" className="ml-auto">
                                        View report
                                    </Button>
                                </>
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Metric card with icon, title, area chart, and footer actions.",
            },
        },
    },
};

// Chart 03
export const Chart03: Story = {
    args: { title: "", subtitle: "", type: "simple", trend: "positive", change: "" },
    render: () => (
        <div className="mt-10 w-full space-y-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Chart 03</h3>
                <div className="flex flex-col gap-8">
                    <div className="w-full max-w-xl">
                        <MetricsChart03 title="2,000" subtitle="View 24 hours" change="100%" changeTrend="positive" changeDescription="vs last month" />
                    </div>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Metric card with full-width area chart.",
            },
        },
    },
};

// Chart actions 03
export const ChartActions03: Story = {
    args: { title: "", subtitle: "", type: "simple", trend: "positive", change: "" },
    render: () => (
        <div className="mt-10 w-full space-y-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Chart actions 03</h3>
                <div className="flex flex-col gap-8">
                    <div className="w-full max-w-xl">
                        <MetricsChart03
                            title="2,000"
                            subtitle="View 24 hours"
                            change="100%"
                            changeTrend="positive"
                            changeDescription="vs last month"
                            footer={
                                <>
                                    <Button iconLeading={Settings01} color="tertiary" size="sm" />
                                    <Button color="secondary" size="sm" href="#" className="ml-auto">
                                        View report
                                    </Button>
                                </>
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Metric card with full-width area chart and footer actions.",
            },
        },
    },
};

// Chart 04
export const Chart04: Story = {
    args: { title: "", subtitle: "", type: "simple", trend: "positive", change: "" },
    render: () => (
        <div className="mt-10 w-full space-y-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Chart 04</h3>
                <div className="flex flex-col gap-8">
                    <div className="w-full max-w-xl">
                        <MetricsChart04 title="2,000" subtitle="View 24 hours" change="100%" changeTrend="positive" changeDescription="vs last month" />
                    </div>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Metric card with layered design and area chart.",
            },
        },
    },
};

// Chart actions 04
export const ChartActions04: Story = {
    args: { title: "", subtitle: "", type: "simple", trend: "positive", change: "" },
    render: () => (
        <div className="mt-10 w-full space-y-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Chart actions 04</h3>
                <div className="flex flex-col gap-8">
                    <div className="w-full max-w-xl">
                        <MetricsChart04
                            title="2,000"
                            subtitle="View 24 hours"
                            change="100%"
                            changeTrend="positive"
                            changeDescription="vs last month"
                            footer={
                                <>
                                    <Button iconLeading={Settings01} color="tertiary" size="sm" />
                                    <Button color="secondary" size="sm" href="#" className="ml-auto">
                                        View report
                                    </Button>
                                </>
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Metric card with layered design, area chart, and footer actions.",
            },
        },
    },
};
