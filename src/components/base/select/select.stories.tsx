import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { LayersTwo01, Settings01, User01 } from "@untitledui/icons";
import { useListData } from "react-stately";
import { Dot } from "@/components/foundations/dot-icon";
import { MultiSelect } from "./multi-select";
import { Select, type SelectItemType } from "./select";


const meta = {
    title: "Components/Select",
    component: Select,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Free and open-source React select components built for modern applications and websites. These select components are built using React Aria and styled with Tailwind CSS.",
            },
        },
    },
    tags: ["autodocs"],
    argTypes: {
        size: {
            control: "select",
            options: ["sm", "md"],
            description: "Select size variant",
        },
        isDisabled: {
            control: "boolean",
            description: "Disable the select",
        },
        isRequired: {
            control: "boolean",
            description: "Make the select required",
        },
    },
} satisfies Meta<typeof Select>;

export default meta;
type Story = Omit<StoryObj<typeof meta>, "args"> & {
    args?: Partial<React.ComponentProps<typeof Select>>;
};

const defaultItems = [
    { id: "1", label: "Option 1" },
    { id: "2", label: "Option 2" },
    { id: "3", label: "Option 3" },
    { id: "4", label: "Option 4", isDisabled: true },
];

const iconItems = [
    { id: "1", label: "Option 1", icon: User01 },
    { id: "2", label: "Option 2", icon: Settings01 },
    { id: "3", label: "Option 3", icon: LayersTwo01 },
];

const avatarItems = [
    { id: "1", label: "Olivia Rhye", avatarUrl: "https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80" },
    { id: "2", label: "Phoenix Baker", avatarUrl: "https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80" },
    { id: "3", label: "Lana Steiner", avatarUrl: "https://www.untitledui.com/images/avatars/lana-steiner?fm=webp&q=80" },
];

const dotItems = [
    {
        label: "Phoenix Baker",
        id: "@phoenix",
        supportingText: "@phoenix",
        icon: <Dot className="size-2.5 text-fg-success-secondary in-disabled:text-fg-disabled_subtle" />,
    },
    {
        label: "Olivia Rhye",
        id: "@olivia",
        supportingText: "@olivia",
        icon: <Dot className="size-2.5 text-fg-success-secondary in-disabled:text-fg-disabled_subtle" />,
    },
    {
        label: "Lana Steiner",
        id: "@lana",
        supportingText: "@lana",
        icon: <Dot className="size-2.5 text-fg-success-secondary in-disabled:text-fg-disabled_subtle" />,
    },
    {
        label: "Demi Wilkinson",
        id: "@demi",
        supportingText: "@demi",
        icon: <Dot className="size-2.5 text-fg-success-secondary in-disabled:text-fg-disabled_subtle" />,
    },
    {
        label: "Candice Wu",
        id: "@candice",
        supportingText: "@candice",
        icon: <Dot className="size-2.5 text-fg-success-secondary in-disabled:text-fg-disabled_subtle" />,
    },
    {
        label: "Natali Craig",
        id: "@natali",
        supportingText: "@natali",
        icon: <Dot className="size-2.5 text-fg-success-secondary in-disabled:text-fg-disabled_subtle" />,
    },
    {
        label: "Abraham Baker",
        id: "@abraham",
        supportingText: "@abraham",
        icon: <Dot className="size-2.5 text-fg-success-secondary in-disabled:text-fg-disabled_subtle" />,
    },
    {
        label: "Adem Lane",
        id: "@adem",
        supportingText: "@adem",
        icon: <Dot className="size-2.5 text-fg-success-secondary in-disabled:text-fg-disabled_subtle" />,
    },
    {
        label: "Jackson Reed",
        id: "@jackson",
        supportingText: "@jackson",
        icon: <Dot className="size-2.5 text-fg-success-secondary in-disabled:text-fg-disabled_subtle" />,
    },
    {
        label: "Jessie Meyton",
        id: "@jessie",
        supportingText: "@jessie",
        icon: <Dot className="size-2.5 text-fg-success-secondary in-disabled:text-fg-disabled_subtle" />,
    },
];

  const items = [
      {
          label: "Phoenix Baker",
          id: "@phoenix",
          supportingText: "@phoenix",
          icon: User01,
          avatarUrl: "https://www.untitledui.com/images/avatars/natali-craig?fm=webp&q=80",
      },
      {
          label: "Olivia Rhye",
          id: "@olivia",
          supportingText: "@olivia",
          icon: User01,
          avatarUrl: "https://www.untitledui.com/images/avatars/natali-craig?fm=webp&q=80",
      },
      {
          label: "Lana Steiner",
          id: "@lana",
          supportingText: "@lana",
          icon: User01,
          avatarUrl: "https://www.untitledui.com/images/avatars/natali-craig?fm=webp&q=80",
          disabled: true,
      },
      {
          label: "Demi Wilkinson",
          id: "@demi",
          supportingText: "@demi",
          icon: User01,
          avatarUrl: "https://www.untitledui.com/images/avatars/natali-craig?fm=webp&q=80",
      },
      { label: "Candice Wu", id: "@candice", supportingText: "@candice", icon: User01,
          avatarUrl: "https://www.untitledui.com/images/avatars/natali-craig?fm=webp&q=80",
      },
      {
          label: "Natali Craig",
          id: "@natali",
          supportingText: "@natali",
          icon: User01,
          avatarUrl: "https://www.untitledui.com/images/avatars/natali-craig?fm=webp&q=80",
      },
      {
          label: "Abraham Baker",
          id: "@abraham",
          supportingText: "@abraham",
          icon: User01,
          avatarUrl: "https://www.untitledui.com/images/avatars/natali-craig?fm=webp&q=80",
      },
      {
          label: "Adem Lane",
          id: "@adem",
          supportingText: "@adem",
          icon: User01,
          avatarUrl: "https://www.untitledui.com/images/avatars/natali-craig?fm=webp&q=80",
      },
      { label: "Jackson Reed", id: "@jackson", supportingText: "@jackson", icon: User01,
          avatarUrl: "https://www.untitledui.com/images/avatars/natali-craig?fm=webp&q=80",
      },
      { label: "Jessie Meyton", id: "@jessie", supportingText: "@jessie", icon: User01,
          avatarUrl: "https://www.untitledui.com/images/avatars/natali-craig?fm=webp&q=80",
      },
  ];
  
    const searchItems = [
        { label: "Phoenix Baker", id: "@phoenix", supportingText: "@phoenix" },
        { label: "Olivia Rhye", id: "@olivia", supportingText: "@olivia" },
        { label: "Lana Steiner", id: "@lana", supportingText: "@lana", disabled: true },
        { label: "Demi Wilkinson", id: "@demi", supportingText: "@demi" },
        { label: "Candice Wu", id: "@candice", supportingText: "@candice" },
        { label: "Natali Craig", id: "@natali", supportingText: "@natali" },
        { label: "Abraham Baker", id: "@abraham", supportingText: "@abraham" },
        { label: "Adem Lane", id: "@adem", supportingText: "@adem" },
        { label: "Jackson Reed", id: "@jackson", supportingText: "@jackson" },
        { label: "Jessie Meyton", id: "@jessie", supportingText: "@jessie" },
    ];
// Select Example - Main docs content (hidden from sidebar, only shows in Docs tab)
export const SelectExample: Story = {
    render: () => (
        <div className="mt-10 space-y-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Select Variants</h3>
                <div className="mb-7 max-w-lg space-y-2">
                    <p className="text-sm text-text-secondary">
                        Free and open-source React select components built for modern applications and websites. These select components are built using React
                        Aria and styled with Tailwind CSS.
                    </p>
                </div>
                <div className="">
                    <Select
                        isRequired
                        label="Team member"
                        tooltip="This is a tooltip"
                        hint="This is a hint text to help user."
                        placeholder="Select team member"
                        items={items}
                    >
                        {(item) => (
                            <Select.Item
                                id={item.id}
                                supportingText={item.supportingText}
                                isDisabled={item.isDisabled}
                                icon={item.icon}
                                avatarUrl={item.avatarUrl}
                            >
                                {item.label}
                            </Select.Item>
                        )}
                    </Select>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Comprehensive examples of select variants, sizes, and states.",
            },
        },
        // Hide from sidebar, only show in Docs tab
        docsOnly: true,
    },
};

export const Default: Story = {
    render: () => (
        <div className="mt-10 space-y-4 w-full">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Default</h3>
            <Select
                isRequired
                label="Team member"
                tooltip="This is a tooltip"
                hint="This is a hint text to help user."
                placeholder="Select team member"
                items={items}
            >
                {(item) => (
                    <Select.Item id={item.id} supportingText={item.supportingText} isDisabled={item.isDisabled} icon={item.icon} avatarUrl={item.avatarUrl}>
                        {item.label}
                    </Select.Item>
                )}
            </Select>
        </div>
    ),
};

export const Disabled: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Disabled</h3>
            <Select
                isRequired
                isDisabled
                label="Team member"
                tooltip="This is a tooltip"
                hint="This is a hint text to help user."
                placeholder="Select team member"
                items={items}
            >
                {(item) => (
                    <Select.Item id={item.id} supportingText={item.supportingText} isDisabled={item.isDisabled} icon={item.icon} avatarUrl={item.avatarUrl}>
                        {item.label}
                    </Select.Item>
                )}
            </Select>
        </div>
    ),
};

export const Sizes: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Sizes</h3>
            <div className="flex flex-col gap-8">
                {/* Small */}
                <Select
                    isRequired
                    size="sm"
                    label="Team member"
                    tooltip="This is a tooltip"
                    hint="This is a hint text to help user."
                    placeholder="Select team member"
                    items={items}
                >
                    {(item) => (
                        <Select.Item id={item.id} supportingText={item.supportingText} isDisabled={item.isDisabled} icon={item.icon} avatarUrl={item.avatarUrl}>
                            {item.label}
                        </Select.Item>
                    )}
                </Select>

                {/* Medium */}
                <Select
                    isRequired
                    size="md"
                    label="Team member"
                    tooltip="This is a tooltip"
                    hint="This is a hint text to help user."
                    placeholder="Select team member"
                    items={items}
                >
                    {(item) => (
                        <Select.Item id={item.id} supportingText={item.supportingText} isDisabled={item.isDisabled} icon={item.icon} avatarUrl={item.avatarUrl}>
                            {item.label}
                        </Select.Item>
                    )}
                </Select>
            </div>
        </div>
    ),
};

export const IconLeading: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Icon Leading</h3>
            <Select
                isRequired
                label="Team member"
                tooltip="This is a tooltip"
                hint="This is a hint text to help user."
                placeholder="Select team member"
                placeholderIcon={User01}
                items={items}
            >
                {(item) => (
                    <Select.Item id={item.id} supportingText={item.supportingText} isDisabled={item.isDisabled} icon={item.icon} avatarUrl={item.avatarUrl}>
                        {item.label}
                    </Select.Item>
                )}
            </Select>
        </div>
    ),
};

export const AvatarLeading: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Avatar Leading</h3>
            <Select
                isRequired
                label="Team member"
                tooltip="This is a tooltip"
                hint="This is a hint text to help user."
                placeholder="Select team member"
                placeholderIcon={User01}
                items={items}
            >
                {(item) => (
                    <Select.Item id={item.id} supportingText={item.supportingText} isDisabled={item.isDisabled} icon={item.icon} avatarUrl={item.avatarUrl}>
                        {item.label}
                    </Select.Item>
                )}
            </Select>
        </div>
    ),
};

export const DotLeading: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Dot Leading</h3>
            <Select
                isRequired
                label="Team member"
                tooltip="This is a tooltip"
                hint="This is a hint text to help user."
                placeholder="Select team member"
                placeholderIcon={<Dot className="size-2.5 text-fg-success-secondary in-disabled:text-fg-disabled_subtle" />}
                items={dotItems}
            >
                {(item) => (
                    <Select.Item id={item.id} supportingText={item.supportingText} isDisabled={item.isDisabled} icon={item.icon} avatarUrl={item.avatarUrl}>
                        {item.label}
                    </Select.Item>
                )}
            </Select>
        </div>
    ),
};

export const Search: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Search</h3>
            <Select.ComboBox isRequired label="Search" tooltip="This is a tooltip" hint="This is a hint text to help user." placeholder="Search" items={searchItems}>
                {(item) => (
                    <Select.Item id={item.id} supportingText={item.supportingText} isDisabled={item.isDisabled} icon={item.icon} avatarUrl={item.avatarUrl}>
                        {item.label}
                    </Select.Item>
                )}
            </Select.ComboBox>
        </div>
    ),
};

// Component wrapper for tags with state management
const TagsComponent = () => {
    const tagItems = [
        {
            label: "Phoenix Baker",
            id: "@phoenix",
            supportingText: "@phoenix",
            avatarUrl: "https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80",
        },
        { label: "Olivia Rhye", id: "@olivia", supportingText: "@olivia", avatarUrl: "https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80" },
        {
            label: "Lana Steiner",
            id: "@lana",
            supportingText: "@lana",
            disabled: true,
            avatarUrl: "https://www.untitledui.com/images/avatars/lana-steiner?fm=webp&q=80",
        },
        { label: "Demi Wilkinson", id: "@demi", supportingText: "@demi", avatarUrl: "https://www.untitledui.com/images/avatars/demi-wilkinson?fm=webp&q=80" },
        { label: "Candice Wu", id: "@candice", supportingText: "@candice", avatarUrl: "https://www.untitledui.com/images/avatars/candice-wu?fm=webp&q=80" },
        { label: "Natali Craig", id: "@natali", supportingText: "@natali", avatarUrl: "https://www.untitledui.com/images/avatars/natali-craig?fm=webp&q=80" },
        {
            label: "Abraham Baker",
            id: "@abraham",
            supportingText: "@abraham",
            avatarUrl: "https://www.untitledui.com/images/avatars/abraham-baker?fm=webp&q=80",
        },
        { label: "Adem Lane", id: "@adem", supportingText: "@adem", avatarUrl: "https://www.untitledui.com/images/avatars/adem-lane?fm=webp&q=80" },
        { label: "Jackson Reed", id: "@jackson", supportingText: "@jackson", avatarUrl: "https://www.untitledui.com/images/avatars/jackson-reed?fm=webp&q=80" },
        { label: "Jessie Meyton", id: "@jessie", supportingText: "@jessie", avatarUrl: "https://www.untitledui.com/images/avatars/jessie-meyton?fm=webp&q=80" },
    ];

   const selectedItems = useListData<SelectItemType>({
       initialItems: [],
   });

    return (
         <MultiSelect
            isRequired
            selectedItems={selectedItems}
            label="Search"
            tooltip="This is a tooltip"
            hint="This is a hint text to help user."
            placeholder="Search"
            items={items}
        >
            {(item) => (
                <MultiSelect.Item id={item.id} supportingText={item.supportingText} isDisabled={item.isDisabled} icon={item.icon} avatarUrl={item.avatarUrl}>
                    {item.label}
                </MultiSelect.Item>
            )}
        </MultiSelect>
    );
};

export const Tags: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Tags</h3>
            <TagsComponent />
        </div>
    ),
};