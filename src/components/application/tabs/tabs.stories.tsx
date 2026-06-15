import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs } from "./tabs";
import { NativeSelect } from "@/components/base/select/select-native";
const meta = {
    title: "Application/Tabs",
    component: Tabs,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component: "A flexible tabs component with multiple variants for horizontal and vertical orientations.",
            },
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const tabItems = [
    { id: "overview", label: "Overview", children: "Overview content goes here" },
    { id: "analytics", label: "Analytics", badge: "12", children: "Analytics content goes here" },
    { id: "settings", label: "Settings", children: "Settings content goes here" },
    { id: "team", label: "Team", badge: "3", children: "Team content goes here" },
];

const tabs = [
    { id: "details", label: "My details" },
    { id: "profile", label: "Profile" },
    { id: "password", label: "Password" },
    { id: "team", label: "Team" },
    { id: "notifications", label: "Notifications", badge: 2 },
    { id: "integrations", label: "Integrations" },
    { id: "api", label: "API" },
];
 

// Tabs Examples - Main docs content
export const TabsExamples: Story = {
    render: () => {
        const [selectedTabIndex, setSelectedTabIndex] = useState<string>("details");
 
    return (
        <>
        <NativeSelect
                aria-label="Tabs"
                value={selectedTabIndex as string}
                onChange={(event) => setSelectedTabIndex(event.target.value)}
                options={tabs.map((tab) => ({ label: tab.label, value: tab.id }))}
                className="w-80 md:hidden"
            />
            <Tabs selectedKey={selectedTabIndex} onSelectionChange={(key) => setSelectedTabIndex(String(key))} className="w-max max-md:hidden">
                <Tabs.List type="button-minimal" items={tabs}>
                    {(tab) => <Tabs.Item {...tab} />}
                </Tabs.List>
            </Tabs>
            </>
        );
    },
};

// Button Brand Horizontal
export const ButtonBrandHorizontal: Story = {
    render: () =>  {
        const [selectedTabIndex, setSelectedTabIndex] = useState<string>("details");
 
    return (
        <>
        <NativeSelect
        aria-label="Tabs"
        value={selectedTabIndex as string}
        onChange={(event) => setSelectedTabIndex(event.target.value)}
        options={tabs.map((tab) => ({ label: tab.label, value: tab.id }))}
        className="w-80 md:hidden"
    />
    <Tabs selectedKey={selectedTabIndex}  onSelectionChange={(key) => setSelectedTabIndex(String(key))} className="w-max max-md:hidden">
        <Tabs.List type="button-brand" items={tabs}>
            {(tab) => <Tabs.Item {...tab} />}
        </Tabs.List>
    </Tabs>
    </>
        );
    },
};

// Button Gray Horizontal
export const ButtonGrayHorizontal: Story = {
    render: () =>  {
        const [selectedTabIndex, setSelectedTabIndex] = useState<string>("details");
 
    return (
        <>
        <NativeSelect
        aria-label="Tabs"
        value={selectedTabIndex as string}
        onChange={(event) => setSelectedTabIndex(event.target.value)}
        options={tabs.map((tab) => ({ label: tab.label, value: tab.id }))}
        className="w-80 md:hidden"
    />
    <Tabs selectedKey={selectedTabIndex}  onSelectionChange={(key) => setSelectedTabIndex(String(key))} className="w-max max-md:hidden">
        <Tabs.List type="button-gray" items={tabs}>
            {(tab) => <Tabs.Item {...tab} />}
        </Tabs.List>
    </Tabs>
    </>
        );
    },
};

// Button Border Horizontal
export const ButtonBorderHorizontal: Story = {
    render: () =>  {
        const [selectedTabIndex, setSelectedTabIndex] = useState<string>("details");
 
    return (
        <>
        <NativeSelect
        aria-label="Tabs"
        value={selectedTabIndex as string}
        onChange={(event) => setSelectedTabIndex(event.target.value)}
        options={tabs.map((tab) => ({ label: tab.label, value: tab.id }))}
        className="w-80 md:hidden"
    />
    <Tabs selectedKey={selectedTabIndex}  onSelectionChange={(key) => setSelectedTabIndex(String(key))} className="w-max max-md:hidden">
        <Tabs.List type="button-border" items={tabs}>
            {(tab) => <Tabs.Item {...tab} />}
        </Tabs.List>
    </Tabs>
    </>
        );
    },
};

// Button Minimal Horizontal
export const ButtonMinimalHorizontal: Story = {
    render: () =>  {
        const [selectedTabIndex, setSelectedTabIndex] = useState<string>("details");
 
    return (
        <>
        <NativeSelect
        aria-label="Tabs"
        value={selectedTabIndex as string}
        onChange={(event) => setSelectedTabIndex(event.target.value)}
        options={tabs.map((tab) => ({ label: tab.label, value: tab.id }))}
        className="w-80 md:hidden"
    />
    <Tabs selectedKey={selectedTabIndex}  onSelectionChange={(key) => setSelectedTabIndex(String(key))} className="w-max max-md:hidden">
        <Tabs.List type="button-minimal" items={tabs}>
            {(tab) => <Tabs.Item {...tab} />}
        </Tabs.List>
    </Tabs>
    </>
        );
    },
};

// Underline
export const Underline: Story = {
    render: () =>  {
        const [selectedTabIndex, setSelectedTabIndex] = useState<string>("details");
 
    return (
        <>
        <NativeSelect
        aria-label="Tabs"
        value={selectedTabIndex as string}
        onChange={(event) => setSelectedTabIndex(event.target.value)}
        options={tabs.map((tab) => ({ label: tab.label, value: tab.id }))}
        className="w-80 md:hidden"
    />
    <Tabs selectedKey={selectedTabIndex}  onSelectionChange={(key) => setSelectedTabIndex(String(key))} className="w-max max-md:hidden">
        <Tabs.List type="underline" items={tabs}>
            {(tab) => <Tabs.Item {...tab} />}
        </Tabs.List>
    </Tabs>
    </>
        );
    },
};

// Button Brand Vertical
export const ButtonBrandVertical: Story = {
    render: () =>  {
        const [selectedTabIndex, setSelectedTabIndex] = useState<string>("details");
 
    return (
        <>
        <NativeSelect
        aria-label="Tabs"
        value={selectedTabIndex as string}
        onChange={(event) => setSelectedTabIndex(event.target.value)}
        options={tabs.map((tab) => ({ label: tab.label, value: tab.id }))}
        className="w-80 md:hidden"
    />
    <Tabs selectedKey={selectedTabIndex} orientation="vertical" onSelectionChange={(key) => setSelectedTabIndex(String(key))} className="w-max max-md:hidden">
        <Tabs.List type="button-brand" items={tabs}>
            {(tab) => <Tabs.Item {...tab} />}
        </Tabs.List>
    </Tabs>
    </>
        );
    },
};

// Button Gray Vertical
export const ButtonGrayVertical: Story = {
    render: () =>  {
        const [selectedTabIndex, setSelectedTabIndex] = useState<string>("details");
 
    return (
        <>
        <NativeSelect
        aria-label="Tabs"
        value={selectedTabIndex as string}
        onChange={(event) => setSelectedTabIndex(event.target.value)}
        options={tabs.map((tab) => ({ label: tab.label, value: tab.id }))}
        className="w-80 md:hidden"
    />
    <Tabs selectedKey={selectedTabIndex} orientation="vertical" onSelectionChange={(key) => setSelectedTabIndex(String(key))} className="w-max max-md:hidden">
        <Tabs.List type="button-gray" items={tabs}>
            {(tab) => <Tabs.Item {...tab} />}
        </Tabs.List>
    </Tabs>
    </>
        );
    },
};

// Button Border Vertical
export const ButtonBorderVertical: Story = {
    render: () =>  {
        const [selectedTabIndex, setSelectedTabIndex] = useState<string>("details");
 
    return (
        <>
        <NativeSelect
        aria-label="Tabs"
        value={selectedTabIndex as string}
        onChange={(event) => setSelectedTabIndex(event.target.value)}
        options={tabs.map((tab) => ({ label: tab.label, value: tab.id }))}
        className="w-80 md:hidden"
    />
    <Tabs selectedKey={selectedTabIndex} orientation="vertical" onSelectionChange={(key) => setSelectedTabIndex(String(key))} className="w-max max-md:hidden">
        <Tabs.List type="button-border" items={tabs}>
            {(tab) => <Tabs.Item {...tab} />}
        </Tabs.List>
    </Tabs>
    </>
        );
    },
};

// Button Minimal Vertical
export const ButtonMinimalVertical: Story = {
    render: () =>  {
        const [selectedTabIndex, setSelectedTabIndex] = useState<string>("details");
 
    return (
        <>
        <NativeSelect
        aria-label="Tabs"
        value={selectedTabIndex as string}
        onChange={(event) => setSelectedTabIndex(event.target.value)}
        options={tabs.map((tab) => ({ label: tab.label, value: tab.id }))}
        className="w-80 md:hidden"
    />
    <Tabs selectedKey={selectedTabIndex} orientation="vertical" onSelectionChange={(key) => setSelectedTabIndex(String(key))} className="w-max max-md:hidden">
        <Tabs.List type="button-minimal" items={tabs}>
            {(tab) => <Tabs.Item {...tab} />}
        </Tabs.List>
    </Tabs>
    </>
        );
    },
};

// Line
export const Line: Story = {
    render: () =>  {
        const [selectedTabIndex, setSelectedTabIndex] = useState<string>("details");
 
    return (
        <>
        <NativeSelect
        aria-label="Tabs"
        value={selectedTabIndex as string}
        onChange={(event) => setSelectedTabIndex(event.target.value)}
        options={tabs.map((tab) => ({ label: tab.label, value: tab.id }))}
        className="w-80 md:hidden"
    />
    <Tabs selectedKey={selectedTabIndex} orientation="vertical" onSelectionChange={(key) => setSelectedTabIndex(String(key))} className="w-max max-md:hidden">
        <Tabs.List type="line" items={tabs}>
            {(tab) => <Tabs.Item {...tab} />}
        </Tabs.List>
    </Tabs>
    </>
        );
    },
};
