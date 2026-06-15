import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { events } from "@/components/application/calendar/config";
import { Calendar } from "./calendar";

const meta = {
    title: "Application/Calendar",
    component: Calendar,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "A comprehensive calendar component with month, week, and day views. Supports events with colors, multi-day events, and interactive navigation. Built with React Aria for accessibility.",
            },
        },
    },
    tags: ["autodocs"],
    argTypes: {
        view: {
            control: "select",
            options: ["month", "week", "day"],
            description: "Calendar view variant",
        },
        events: {
            control: "object",
            description: "Array of calendar events",
        },
    },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;



// Calendar Example - Main docs content (hidden from sidebar, only shows in Docs tab)
export const CalendarExample: Story = {
    args: { events: [] },
    render: () => (
        <div className="mt-10 space-y-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Calendar components</h3>
                <div className="flex flex-col gap-8">
                    <div className="w-full max-w-5xl">
                        <Calendar events={events} view="month" />
                    </div>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Comprehensive calendar component with multiple view options for displaying events and scheduling.",
            },
        },
        // Hide from sidebar, only show in Docs tab
        docsOnly: true,
    },
};

// Calendar Month View
export const CalendarMonthView: Story = {
    args: { events: [] },
    render: () => (
        <div className="mt-10 space-y-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Calendar Month View</h3>
                <div className="mb-7 max-w-lg space-y-2">
                    <p className="text-sm text-text-secondary">
                        Month view displays a full calendar grid showing all days of the month with events visible in each day cell.
                    </p>
                </div>
                <div className="flex flex-col gap-8">
                    <div className="w-full max-w-5xl">
                        <Calendar events={events} view="month" />
                    </div>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Month view provides an overview of the entire month with events displayed in their respective day cells. Multi-day events span across multiple cells.",
            },
        },
    },
};

// Calendar Week View
export const CalendarWeekView: Story = {
    args: { events: [] },
    render: () => (
        <div className="mt-10 space-y-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Calendar Week View</h3>
                <div className="mb-7 max-w-lg space-y-2">
                    <p className="text-sm text-text-secondary">
                        Week view shows a detailed seven-day timeline with hourly slots, perfect for seeing the schedule of an entire week at a glance.
                    </p>
                </div>
                <div className="flex flex-col gap-8">
                    <div className="w-full max-w-5xl">
                        <Calendar events={events} view="week" />
                    </div>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Week view displays a horizontal timeline with all seven days of the week. Events are positioned according to their start time and duration.",
            },
        },
    },
};

// Calendar Day View
export const CalendarDayView: Story = {
    args: { events: [] },
    render: () => (
        <div className="mt-10 space-y-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Calendar Day View</h3>
                <div className="mb-7 max-w-lg space-y-2">
                    <p className="text-sm text-text-secondary">
                        Day view provides the most detailed view, showing a single day with hourly slots and a side panel for event details.
                    </p>
                </div>
                <div className="flex flex-col gap-8">
                    <div className="w-full max-w-5xl">
                        <Calendar events={events} view="day" />
                    </div>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Day view focuses on a single day with a detailed hourly timeline. Includes a side panel showing event details and a mini calendar for navigation.",
            },
        },
    },
};
