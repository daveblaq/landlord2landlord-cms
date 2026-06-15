import type { Meta, StoryObj } from "@storybook/react-vite";
import { DisabledAll as DisabledAllComponent } from "./disabled";
import { DisabledIndividualButton as DisabledIndividualButtonComponent } from "./disabled-individual-item";
import { LeadingIcon as LeadingIconComponent } from "./leading-icon";
import { MultipleSelectedItems as MultipleSelectedItemsComponent } from "./multiple-selection";
import { SelectedItem as SelectedItemComponent } from "./selection";
import { ButtonGroupDot as ButtonGroupDotComponent } from "./with-dot";

const meta = {
    title: "Components/Button Group",
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component: "Button group components for displaying related actions together with various states and configurations.",
            },
        },
    },
    tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const LeadingIcon: Story = {
    render: () => <LeadingIconComponent />,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                story: "Button group with leading icons on each item.",
            },
        },
    },
};

export const WithDot: Story = {
    render: () => <ButtonGroupDotComponent />,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                story: "Button group with dot indicators on each item.",
            },
        },
    },
};

export const Disabled: Story = {
    render: () => <DisabledAllComponent />,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                story: "Button group with all items disabled.",
            },
        },
    },
};

export const DisabledIndividualItem: Story = {
    render: () => <DisabledIndividualButtonComponent />,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                story: "Button group with individual items disabled.",
            },
        },
    },
};

export const Selection: Story = {
    render: () => <SelectedItemComponent />,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                story: "Button group with single selection mode (highlighted in the image).",
            },
        },
    },
};

export const MultipleSelection: Story = {
    render: () => <MultipleSelectedItemsComponent />,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                story: "Button group with multiple selection mode.",
            },
        },
    },
};
