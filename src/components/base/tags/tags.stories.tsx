import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tag, TagGroup, TagItem, TagList } from "./tags";

const meta = {
    title: "Components/Tags",
    component: TagGroup,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component: "Below are examples and variations of this tags component:",
            },
        },
    },
    tags: ["autodocs"],
    argTypes: {
        size: {
            control: "select",
            options: ["sm", "md", "lg"],
            description: "Tag size variant",
        },
        selectionMode: {
            control: "select",
            options: ["none", "single", "multiple"],
            description: "Selection mode for tags",
        },
    },
} satisfies Meta<typeof TagGroup>;

export default meta;
type Story = Omit<StoryObj<typeof meta>, "args"> & {
    args?: Partial<React.ComponentProps<typeof TagGroup>>;
};

// Component wrapper for tags with close functionality
const TagsWithCloseComponent = () => {
    const [tags, setTags] = useState<TagItem[]>([
        { id: "tag-01", label: "Label" },
        { id: "tag-02", label: "Label", avatarSrc: "https://www.untitledui.com/images/flags/AU.svg", avatarContrastBorder: false },
        { id: "tag-03", label: "Label", avatarSrc: "https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80" },
        { id: "tag-04", label: "Label", dot: true },
    ]);

    return (
        <TagGroup
            label="Tags"
            size="md"
            onRemove={(keys) => {
                setTags(tags.filter((tag) => !keys.has(tag.id)));
            }}
        >
            <TagList className="flex flex-col items-start gap-4 md:flex-row" items={tags}>
                {(item) => <Tag {...item}>{item.label}</Tag>}
            </TagList>
        </TagGroup>
    );
};

// Tags Example - Main docs content (hidden from sidebar, only shows in Docs tab)
export const TagsExample: Story = {
    render: () => (
        <div className="mt-10 space-y-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Tag Variants</h3>
                <div className="mb-7 max-w-lg space-y-2">
                    <p className="text-sm text-text-secondary">Below are examples and variations of this tags component:</p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    <TagGroup label="Tags" size="md">
                        <TagList className="flex gap-4">
                            <Tag>Label</Tag>
                            <Tag avatarSrc="https://www.untitledui.com/images/flags/AU.svg">Label</Tag>
                            <Tag avatarSrc="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80">Label</Tag>
                            <Tag dot={true}>Label</Tag>
                        </TagList>
                    </TagGroup>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Comprehensive examples of tag variants, sizes, and states.",
            },
        },
        // Hide from sidebar, only show in Docs tab
        docsOnly: true,
    },
};

export const Sizes: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Sizes</h3>
            <div className="flex flex-col gap-4">
                {/* Small */}
                <TagGroup label="Tags" size="sm">
                    <TagList className="flex gap-4">
                        <Tag>Label</Tag>
                        <Tag avatarSrc="https://www.untitledui.com/images/flags/AU.svg">Label</Tag>
                        <Tag avatarSrc="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80">Label</Tag>
                        <Tag dot={true}>Label</Tag>
                    </TagList>
                </TagGroup>

                {/* Medium */}
                <TagGroup label="Tags" size="md">
                    <TagList className="flex gap-4">
                        <Tag>Label</Tag>
                        <Tag avatarSrc="https://www.untitledui.com/images/flags/AU.svg">Label</Tag>
                        <Tag avatarSrc="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80">Label</Tag>
                        <Tag dot={true}>Label</Tag>
                    </TagList>
                </TagGroup>

                {/* Large */}
                <TagGroup label="Tags" size="lg">
                    <TagList className="flex gap-4">
                        <Tag>Label</Tag>
                        <Tag avatarSrc="https://www.untitledui.com/images/flags/AU.svg">Label</Tag>
                        <Tag avatarSrc="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80">Label</Tag>
                        <Tag dot={true}>Label</Tag>
                    </TagList>
                </TagGroup>
            </div>
        </div>
    ),
};

export const WithClose: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Close X</h3>
            <TagsWithCloseComponent />
        </div>
    ),
};

export const WithCount: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">With Count</h3>
            <div className="mb-7 max-w-lg space-y-2">
                <p className="text-sm text-text-secondary">
                    Tags can display a count next to the tag by passing a number to the count prop on the Tag component. This is useful when you want to display
                    the number of items associated with the tag.
                </p>
            </div>
            <TagGroup label="Tags" size="md">
                <TagList className="flex flex-col items-start gap-4 md:flex-row">
                    <Tag count={5}>Label</Tag>
                    <Tag avatarSrc="https://www.untitledui.com/images/flags/AU.svg" count={5}>
                        Label
                    </Tag>
                    <Tag avatarSrc="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80" count={5}>
                        Label
                    </Tag>
                    <Tag dot={true} count={5}>
                        Label
                    </Tag>
                </TagList>
            </TagGroup>
        </div>
    ),
};


// Component wrapper for tags with checkbox and close functionality
const TagsWithCheckboxCloseComponent = () => {
    const [tags, setTags] = useState<TagItem[]>([
        { id: "tag-01", label: "Label" },
        { id: "tag-02", label: "Label", avatarSrc: "https://www.untitledui.com/images/flags/AU.svg", avatarContrastBorder: false },
        { id: "tag-03", label: "Label", avatarSrc: "https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80" },
        { id: "tag-04", label: "Label", dot: true },
    ]);

    return (
        <TagGroup
            label="Tags"
            size="md"
            selectionMode="multiple"
            onRemove={(keys) => {
                setTags(tags.filter((tag) => !keys.has(tag.id)));
            }}
        >
            <TagList className="flex flex-col items-start gap-4 md:flex-row" items={tags}>
                {(item) => <Tag {...item}>{item.label}</Tag>}
            </TagList>
        </TagGroup>
    );
};

export const Checkbox: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Checkbox</h3>
            <TagGroup label="Tags" size="md" selectionMode="multiple">
                <TagList className="flex flex-col items-start gap-4 md:flex-row">
                    <Tag id="tag-01">Label</Tag>
                    <Tag id="tag-02" avatarSrc="https://www.untitledui.com/images/flags/AU.svg">
                        Label
                    </Tag>
                    <Tag id="tag-03" avatarSrc="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80">
                        Label
                    </Tag>
                    <Tag id="tag-04" dot={true}>
                        Label
                    </Tag>
                </TagList>
            </TagGroup>
        </div>
    ),
};

export const CheckboxCloseX: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Checkbox Close X</h3>
            <TagsWithCheckboxCloseComponent />
        </div>
    ),
};

export const CheckboxCount: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Checkbox Count</h3>
            <TagGroup label="Tags" size="md" selectionMode="multiple">
                <TagList className="flex flex-col items-start gap-4 md:flex-row">
                    <Tag id="tag-01" count={5}>
                        Label
                    </Tag>
                    <Tag id="tag-02" avatarSrc="https://www.untitledui.com/images/flags/AU.svg" count={5}>
                        Label
                    </Tag>
                    <Tag id="tag-03" avatarSrc="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80" count={5}>
                        Label
                    </Tag>
                    <Tag id="tag-04" dot={true} count={5}>
                        Label
                    </Tag>
                </TagList>
            </TagGroup>
        </div>
    ),
};
