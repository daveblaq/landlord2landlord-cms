import React, { useState, useMemo } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { getLocalTimeZone, today, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "@internationalized/date";
import type { DateValue } from "react-aria-components";
import { DatePicker } from "./date-picker";
import { DateRangePicker } from "./date-range-picker";
import { Calendar } from "./calendar";
import { RangeCalendar } from "./range-calendar";
import { Button } from "@/components/base/buttons/button";
import { DatePicker as AriaDatePicker, Dialog as AriaDialog, DateRangePicker as AriaDateRangePicker, useLocale } from "react-aria-components";
import { RangePresetButton } from "./range-preset";
import { DateInput } from "./date-input";

const meta = {
    title: "Application/Date Picker",
    component: DatePicker,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component: "Date picker components for selecting dates and date ranges with various visual styles.",
            },
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

const now = today(getLocalTimeZone());
// Date Picker Examples - Main docs content
export const DatePickerExamples: Story = {
    render: () =>  {
        const [value, setValue] = useState<DateValue | null>(now);
     
        return <DatePicker aria-label="Date picker" value={value} onChange={setValue} />;
    }
};

// Date Picker
export const DatePickerStory: Story = {
    render: () => {
        const [value, setValue] = useState<DateValue | null>(null);
        return <DatePicker aria-label="Date picker" value={value} onChange={setValue} />;
    },
};

// Date Range Picker with Presets
export const DateRangePickerWithPresets: Story = {
    render: () => {
        const [value, setValue] = useState<{ start: DateValue; end: DateValue } | null>({
            start: now.subtract({ days: 7 }),
            end: now,
        });
     
        return <DateRangePicker aria-label="Date range picker" shouldCloseOnSelect={false} value={value} onChange={setValue} />;
    },
};

// Calendar
export const CalendarStory: Story = {
    render: () => {
        const highlightedDates = [today(getLocalTimeZone())];
        return <Calendar highlightedDates={highlightedDates} />;
    },
};

// Calendar Card
export const CalendarCard: Story = {
    render: () => {
        const highlightedDates = [today(getLocalTimeZone())];
        return (
            <AriaDatePicker aria-label="Calendar card" defaultValue={now}>
            <AriaDialog className="rounded-2xl bg-primary shadow-xl ring ring-secondary_alt">
                <div className="flex px-6 py-5">
                    <Calendar />
                </div>
                <div className="grid grid-cols-2 gap-3 border-t border-secondary p-4">
                    <Button size="sm" color="secondary">
                        Cancel
                    </Button>
                    <Button size="sm" color="primary">
                        Apply
                    </Button>
                </div>
            </AriaDialog>
        </AriaDatePicker>
        );
    },
};

// Range Calendar
export const RangeCalendarStory: Story = {
    render: () => {
        const highlightedDates = [today(getLocalTimeZone())];
        return <RangeCalendar aria-label="Range calendar" highlightedDates={highlightedDates} />;
    },
};

// Range Calendar Card
export const RangeCalendarCard: Story = {
    render: () =>{
        const { locale } = useLocale();
        const [focusedValue, setFocusedValue] = useState<DateValue | null>(null);
        const [value, setValue] = useState<{ start: DateValue; end: DateValue } | null>({
            start: now.subtract({ days: 7 }),
            end: now,
        });
     
        const presets = useMemo(
            () => ({
                today: { label: "Today", value: { start: now, end: now } },
                yesterday: { label: "Yesterday", value: { start: now.subtract({ days: 1 }), end: now.subtract({ days: 1 }) } },
                thisWeek: { label: "This week", value: { start: startOfWeek(now, locale), end: endOfWeek(now, locale) } },
                lastWeek: {
                    label: "Last week",
                    value: {
                        start: startOfWeek(now, locale).subtract({ weeks: 1 }),
                        end: endOfWeek(now, locale).subtract({ weeks: 1 }),
                    },
                },
                thisMonth: { label: "This month", value: { start: startOfMonth(now), end: endOfMonth(now) } },
                lastMonth: {
                    label: "Last month",
                    value: {
                        start: startOfMonth(now).subtract({ months: 1 }),
                        end: endOfMonth(now).subtract({ months: 1 }),
                    },
                },
                thisYear: { label: "This year", value: { start: startOfMonth(now.set({ month: 1 })), end: endOfMonth(now.set({ month: 12 })) } },
                lastYear: {
                    label: "Last year",
                    value: {
                        start: startOfMonth(now.set({ month: 1 }).subtract({ years: 1 })),
                        end: endOfMonth(now.set({ month: 12 }).subtract({ years: 1 })),
                    },
                },
                allTime: {
                    label: "All time",
                    value: {
                        start: now.set({ year: 2000, month: 1, day: 1 }),
                        end: now,
                    },
                },
            }),
            [locale]
        );
     
        return (
            <AriaDateRangePicker aria-label="Range calendar" value={value} onChange={setValue}>
                <AriaDialog className="flex rounded-2xl bg-primary shadow-xl ring ring-secondary_alt focus:outline-hidden">
                    <div className="hidden w-38 flex-col gap-0.5 border-r border-solid border-secondary p-3 lg:flex">
                        {Object.values(presets).map((preset) => (
                            <RangePresetButton
                                key={preset.label}
                                value={preset.value}
                                onClick={() => {
                                    setFocusedValue(preset.value.start);
                                    setValue(preset.value);
                                }}
                            >
                                {preset.label}
                            </RangePresetButton>
                        ))}
                    </div>
                    <div className="flex flex-col">
                        <RangeCalendar
                            focusedValue={focusedValue}
                            onFocusChange={setFocusedValue}
                            presets={{
                                lastWeek: presets.lastWeek,
                                lastMonth: presets.lastMonth,
                                lastYear: presets.lastYear,
                            }}
                        />
                        <div className="flex justify-between gap-3 border-t border-secondary p-4">
                            <div className="hidden items-center gap-3 md:flex">
                                <DateInput slot="start" className="w-36" />
                                <div className="text-md text-quaternary">–</div>
                                <DateInput slot="end" className="w-36" />
                            </div>
                            <div className="grid w-full grid-cols-2 gap-3 md:flex md:w-auto">
                                <Button size="sm" color="secondary">
                                    Cancel
                                </Button>
                                <Button size="sm" color="primary">
                                    Apply
                                </Button>
                            </div>
                        </div>
                    </div>
                </AriaDialog>
            </AriaDateRangePicker>
        );
    },
};

