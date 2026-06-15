import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowRight, ArrowUp, Plus } from "@untitledui/icons";
import type { BadgeColors } from "./badge-types";
import { Badge, BadgeIcon, BadgeWithButton, BadgeWithDot, BadgeWithFlag, BadgeWithIcon, BadgeWithImage } from "./badges";

const allColors: BadgeColors[] = ["gray", "brand", "error", "warning", "success", "gray-blue", "blue-light", "blue", "indigo", "purple", "pink", "orange"];

const meta = {
    title: "Components/Badge",
    component: Badge,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Free and open-source React badge components built for modern applications and websites. These badges are built using React Aria and styled with Tailwind CSS.",
            },
        },
    },
    tags: ["autodocs"],
    argTypes: {
        type: {
            control: "select",
            options: ["pill-color", "color", "modern"],
            description: "Badge type variant",
        },
        size: {
            control: "select",
            options: ["sm", "md", "lg"],
            description: "Badge size",
        },
        color: {
            control: "select",
            options: ["gray", "brand", "error", "warning", "success", "gray-blue", "blue-light", "blue", "indigo", "purple", "pink", "orange"],
            description: "Badge color variant",
        },
    },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = Omit<StoryObj<typeof meta>, "args"> & {
    args?: Partial<React.ComponentProps<typeof Badge>>;
};

// Badge Example - Main docs content (hidden from sidebar, only shows in Docs tab)
export const BadgeExample: Story = {
    render: () => (
        <div className="mt-10 space-y-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Badge Variants</h3>
                <div className="mb-7 max-w-lg space-y-2">
                    <p className="text-sm text-text-secondary">
                        Free and open-source React badge components built for modern applications and websites. These badges are built using React Aria and
                        styled with Tailwind CSS.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    <BadgeWithDot type="pill-color" color="brand">
                        Label
                    </BadgeWithDot>
                    <BadgeWithDot type="color" color="brand">
                        Label
                    </BadgeWithDot>
                    <BadgeWithDot type="modern" color="brand">
                        Label
                    </BadgeWithDot>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Comprehensive examples of badge variants, types, and states.",
            },
        },
        // Hide from sidebar, only show in Docs tab
        docsOnly: true,
    },
};

// Pill Color
export const PillColor: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Pill Color</h3>
            <div className="flex items-center gap-4">
                <Badge type="pill-color" size="sm" color="gray">
                    Label
                </Badge>
                <Badge type="pill-color" size="md" color="gray">
                    Label
                </Badge>
                <Badge type="pill-color" size="lg" color="gray">
                    Label
                </Badge>
            </div>
            <div className="flex items-center gap-4">
                <Badge type="pill-color" size="sm" color="brand">
                    Label
                </Badge>
                <Badge type="pill-color" size="md" color="brand">
                    Label
                </Badge>
                <Badge type="pill-color" size="lg" color="brand">
                    Label
                </Badge>
            </div>
            <div className="flex items-center gap-4">
                <Badge type="pill-color" size="sm" color="error">
                    Label
                </Badge>
                <Badge type="pill-color" size="md" color="error">
                    Label
                </Badge>
                <Badge type="pill-color" size="lg" color="error">
                    Label
                </Badge>
            </div>
            <div className="flex items-center gap-4">
                <Badge type="pill-color" size="sm" color="warning">
                    Label
                </Badge>
                <Badge type="pill-color" size="md" color="warning">
                    Label
                </Badge>
                <Badge type="pill-color" size="lg" color="warning">
                    Label
                </Badge>
            </div>
            <div className="flex items-center gap-4">
                <Badge type="pill-color" size="sm" color="success">
                    Label
                </Badge>
                <Badge type="pill-color" size="md" color="success">
                    Label
                </Badge>
                <Badge type="pill-color" size="lg" color="success">
                    Label
                </Badge>
            </div>
            <div className="flex items-center gap-4">
                <Badge type="pill-color" size="sm" color="gray-blue">
                    Label
                </Badge>
                <Badge type="pill-color" size="md" color="gray-blue">
                    Label
                </Badge>
                <Badge type="pill-color" size="lg" color="gray-blue">
                    Label
                </Badge>
            </div>
            <div className="flex items-center gap-4">
                <Badge type="pill-color" size="sm" color="blue-light">
                    Label
                </Badge>
                <Badge type="pill-color" size="md" color="blue-light">
                    Label
                </Badge>
                <Badge type="pill-color" size="lg" color="blue-light">
                    Label
                </Badge>
            </div>
            <div className="flex items-center gap-4">
                <Badge type="pill-color" size="sm" color="blue">
                    Label
                </Badge>
                <Badge type="pill-color" size="md" color="blue">
                    Label
                </Badge>
                <Badge type="pill-color" size="lg" color="blue">
                    Label
                </Badge>
            </div>
            <div className="flex items-center gap-4">
                <Badge type="pill-color" size="sm" color="indigo">
                    Label
                </Badge>
                <Badge type="pill-color" size="md" color="indigo">
                    Label
                </Badge>
                <Badge type="pill-color" size="lg" color="indigo">
                    Label
                </Badge>
            </div>
            <div className="flex items-center gap-4">
                <Badge type="pill-color" size="sm" color="purple">
                    Label
                </Badge>
                <Badge type="pill-color" size="md" color="purple">
                    Label
                </Badge>
                <Badge type="pill-color" size="lg" color="purple">
                    Label
                </Badge>
            </div>
            <div className="flex items-center gap-4">
                <Badge type="pill-color" size="sm" color="pink">
                    Label
                </Badge>
                <Badge type="pill-color" size="md" color="pink">
                    Label
                </Badge>
                <Badge type="pill-color" size="lg" color="pink">
                    Label
                </Badge>
            </div>
            <div className="flex items-center gap-4">
                <Badge type="pill-color" size="sm" color="orange">
                    Label
                </Badge>
                <Badge type="pill-color" size="md" color="orange">
                    Label
                </Badge>
                <Badge type="pill-color" size="lg" color="orange">
                    Label
                </Badge>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Pill color badges with rounded-full shape and colored backgrounds. Each row shows all sizes (sm, md, lg) for each color.",
            },
        },
    },
};

// Color (Badge Color)
export const Color: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Color (Badge Color)</h3>
            <div className="flex items-center gap-4">
                <Badge type="color" size="sm" color="gray">
                    Label
                </Badge>
                <Badge type="color" size="md" color="gray">
                    Label
                </Badge>
                <Badge type="color" size="lg" color="gray">
                    Label
                </Badge>
            </div>
            <div className="flex items-center gap-4">
                <Badge type="color" size="sm" color="brand">
                    Label
                </Badge>
                <Badge type="color" size="md" color="brand">
                    Label
                </Badge>
                <Badge type="color" size="lg" color="brand">
                    Label
                </Badge>
            </div>
            <div className="flex items-center gap-4">
                <Badge type="color" size="sm" color="error">
                    Label
                </Badge>
                <Badge type="color" size="md" color="error">
                    Label
                </Badge>
                <Badge type="color" size="lg" color="error">
                    Label
                </Badge>
            </div>
            <div className="flex items-center gap-4">
                <Badge type="color" size="sm" color="warning">
                    Label
                </Badge>
                <Badge type="color" size="md" color="warning">
                    Label
                </Badge>
                <Badge type="color" size="lg" color="warning">
                    Label
                </Badge>
            </div>
            <div className="flex items-center gap-4">
                <Badge type="color" size="sm" color="success">
                    Label
                </Badge>
                <Badge type="color" size="md" color="success">
                    Label
                </Badge>
                <Badge type="color" size="lg" color="success">
                    Label
                </Badge>
            </div>
            <div className="flex items-center gap-4">
                <Badge type="color" size="sm" color="gray-blue">
                    Label
                </Badge>
                <Badge type="color" size="md" color="gray-blue">
                    Label
                </Badge>
                <Badge type="color" size="lg" color="gray-blue">
                    Label
                </Badge>
            </div>
            <div className="flex items-center gap-4">
                <Badge type="color" size="sm" color="blue-light">
                    Label
                </Badge>
                <Badge type="color" size="md" color="blue-light">
                    Label
                </Badge>
                <Badge type="color" size="lg" color="blue-light">
                    Label
                </Badge>
            </div>
            <div className="flex items-center gap-4">
                <Badge type="color" size="sm" color="blue">
                    Label
                </Badge>
                <Badge type="color" size="md" color="blue">
                    Label
                </Badge>
                <Badge type="color" size="lg" color="blue">
                    Label
                </Badge>
            </div>
            <div className="flex items-center gap-4">
                <Badge type="color" size="sm" color="indigo">
                    Label
                </Badge>
                <Badge type="color" size="md" color="indigo">
                    Label
                </Badge>
                <Badge type="color" size="lg" color="indigo">
                    Label
                </Badge>
            </div>
            <div className="flex items-center gap-4">
                <Badge type="color" size="sm" color="purple">
                    Label
                </Badge>
                <Badge type="color" size="md" color="purple">
                    Label
                </Badge>
                <Badge type="color" size="lg" color="purple">
                    Label
                </Badge>
            </div>
            <div className="flex items-center gap-4">
                <Badge type="color" size="sm" color="pink">
                    Label
                </Badge>
                <Badge type="color" size="md" color="pink">
                    Label
                </Badge>
                <Badge type="color" size="lg" color="pink">
                    Label
                </Badge>
            </div>
            <div className="flex items-center gap-4">
                <Badge type="color" size="sm" color="orange">
                    Label
                </Badge>
                <Badge type="color" size="md" color="orange">
                    Label
                </Badge>
                <Badge type="color" size="lg" color="orange">
                    Label
                </Badge>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Color badges with rounded-md shape and colored backgrounds. Each row shows all sizes (sm, md, lg) for each color.",
            },
        },
    },
};

// Modern
export const Modern: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Modern</h3>
            <div className="flex items-center gap-4">
                <Badge type="modern" size="sm" color="gray">
                    Label
                </Badge>
                <Badge type="modern" size="md" color="gray">
                    Label
                </Badge>
                <Badge type="modern" size="lg" color="gray">
                    Label
                </Badge>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Modern badges with a subtle shadow and neutral background. Only supports gray color. Each row shows all sizes (sm, md, lg).",
            },
        },
    },
};

// With Dot
export const WithDot: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">With Dot</h3>
            {allColors.map((color) => (
                <div key={color} className="flex items-center gap-4">
                    <BadgeWithDot type="pill-color" size="sm" color={color}>
                        Label
                    </BadgeWithDot>
                    <BadgeWithDot type="pill-color" size="md" color={color}>
                        Label
                    </BadgeWithDot>
                    <BadgeWithDot type="pill-color" size="lg" color={color}>
                        Label
                    </BadgeWithDot>
                </div>
            ))}
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Pill color badges with a dot indicator on the left. Each row shows all sizes (sm, md, lg) for each color.",
            },
        },
    },
};

// With Dot Badge Color
export const WithDotBadgeColor: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">With Dot Badge Color</h3>
            {allColors.map((color) => (
                <div key={color} className="flex items-center gap-4">
                    <BadgeWithDot type="color" size="sm" color={color}>
                        Label
                    </BadgeWithDot>
                    <BadgeWithDot type="color" size="md" color={color}>
                        Label
                    </BadgeWithDot>
                    <BadgeWithDot type="color" size="lg" color={color}>
                        Label
                    </BadgeWithDot>
                </div>
            ))}
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Color badges with a dot indicator on the left. Each row shows all sizes (sm, md, lg) for each color.",
            },
        },
    },
};

// With Dot Badge Modern
export const WithDotBadgeModern: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">With Dot Badge Modern</h3>
            <div className="flex items-center gap-4">
                <BadgeWithDot type="modern" size="sm" color="gray">
                    Label
                </BadgeWithDot>
                <BadgeWithDot type="modern" size="md" color="gray">
                    Label
                </BadgeWithDot>
                <BadgeWithDot type="modern" size="lg" color="gray">
                    Label
                </BadgeWithDot>
            </div>
            <div className="flex items-center gap-4">
                <BadgeWithDot type="modern" size="sm" color="brand">
                    Label
                </BadgeWithDot>
                <BadgeWithDot type="modern" size="md" color="brand">
                    Label
                </BadgeWithDot>
                <BadgeWithDot type="modern" size="lg" color="brand">
                    Label
                </BadgeWithDot>
            </div>
            <div className="flex items-center gap-4">
                <BadgeWithDot type="modern" size="sm" color="error">
                    Label
                </BadgeWithDot>
                <BadgeWithDot type="modern" size="md" color="error">
                    Label
                </BadgeWithDot>
                <BadgeWithDot type="modern" size="lg" color="error">
                    Label
                </BadgeWithDot>
            </div>
            <div className="flex items-center gap-4">
                <BadgeWithDot type="modern" size="sm" color="warning">
                    Label
                </BadgeWithDot>
                <BadgeWithDot type="modern" size="md" color="warning">
                    Label
                </BadgeWithDot>
                <BadgeWithDot type="modern" size="lg" color="warning">
                    Label
                </BadgeWithDot>
            </div>
            <div className="flex items-center gap-4">
                <BadgeWithDot type="modern" size="sm" color="success">
                    Label
                </BadgeWithDot>
                <BadgeWithDot type="modern" size="md" color="success">
                    Label
                </BadgeWithDot>
                <BadgeWithDot type="modern" size="lg" color="success">
                    Label
                </BadgeWithDot>
            </div>
            <div className="flex items-center gap-4">
                <BadgeWithDot type="modern" size="sm" color="gray-blue">
                    Label
                </BadgeWithDot>
                <BadgeWithDot type="modern" size="md" color="gray-blue">
                    Label
                </BadgeWithDot>
                <BadgeWithDot type="modern" size="lg" color="gray-blue">
                    Label
                </BadgeWithDot>
            </div>
            <div className="flex items-center gap-4">
                <BadgeWithDot type="modern" size="sm" color="blue-light">
                    Label
                </BadgeWithDot>
                <BadgeWithDot type="modern" size="md" color="blue-light">
                    Label
                </BadgeWithDot>
                <BadgeWithDot type="modern" size="lg" color="blue-light">
                    Label
                </BadgeWithDot>
            </div>
            <div className="flex items-center gap-4">
                <BadgeWithDot type="modern" size="sm" color="blue">
                    Label
                </BadgeWithDot>
                <BadgeWithDot type="modern" size="md" color="blue">
                    Label
                </BadgeWithDot>
                <BadgeWithDot type="modern" size="lg" color="blue">
                    Label
                </BadgeWithDot>
            </div>
            <div className="flex items-center gap-4">
                <BadgeWithDot type="modern" size="sm" color="indigo">
                    Label
                </BadgeWithDot>
                <BadgeWithDot type="modern" size="md" color="indigo">
                    Label
                </BadgeWithDot>
                <BadgeWithDot type="modern" size="lg" color="indigo">
                    Label
                </BadgeWithDot>
            </div>
            <div className="flex items-center gap-4">
                <BadgeWithDot type="modern" size="sm" color="purple">
                    Label
                </BadgeWithDot>
                <BadgeWithDot type="modern" size="md" color="purple">
                    Label
                </BadgeWithDot>
                <BadgeWithDot type="modern" size="lg" color="purple">
                    Label
                </BadgeWithDot>
            </div>
            <div className="flex items-center gap-4">
                <BadgeWithDot type="modern" size="sm" color="pink">
                    Label
                </BadgeWithDot>
                <BadgeWithDot type="modern" size="md" color="pink">
                    Label
                </BadgeWithDot>
                <BadgeWithDot type="modern" size="lg" color="pink">
                    Label
                </BadgeWithDot>
            </div>
            <div className="flex items-center gap-4">
                <BadgeWithDot type="modern" size="sm" color="orange">
                    Label
                </BadgeWithDot>
                <BadgeWithDot type="modern" size="md" color="orange">
                    Label
                </BadgeWithDot>
                <BadgeWithDot type="modern" size="lg" color="orange">
                    Label
                </BadgeWithDot>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Modern badges with a dot indicator on the left. Each row shows all sizes (sm, md, lg) for each color.",
            },
        },
    },
};

// With Flag
export const WithFlag: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">With Flag</h3>
            {allColors.map((color) => (
                <div key={color} className="flex items-center gap-4">
                    <BadgeWithFlag type="pill-color" size="sm" color={color} flag="AU">
                        Label
                    </BadgeWithFlag>
                    <BadgeWithFlag type="pill-color" size="md" color={color} flag="AU">
                        Label
                    </BadgeWithFlag>
                    <BadgeWithFlag type="pill-color" size="lg" color={color} flag="AU">
                        Label
                    </BadgeWithFlag>
                </div>
            ))}
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Pill color badges with a country flag on the left. Each row shows all sizes (sm, md, lg) for each color.",
            },
        },
    },
};

// With Flag Badge Color
export const WithFlagBadgeColor: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">With Flag Badge Color</h3>
            {allColors.map((color) => (
                <div key={color} className="flex items-center gap-4">
                    <BadgeWithFlag type="color" size="sm" color={color} flag="AU">
                        Label
                    </BadgeWithFlag>
                    <BadgeWithFlag type="color" size="md" color={color} flag="AU">
                        Label
                    </BadgeWithFlag>
                    <BadgeWithFlag type="color" size="lg" color={color} flag="AU">
                        Label
                    </BadgeWithFlag>
                </div>
            ))}
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Color badges with a country flag on the left. Each row shows all sizes (sm, md, lg) for each color.",
            },
        },
    },
};

// With Flag Badge Modern
export const WithFlagBadgeModern: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">With Flag Badge Modern</h3>
            <div className="flex items-center gap-4">
                <BadgeWithFlag type="modern" size="sm" color="gray" flag="AU">
                    Label
                </BadgeWithFlag>
                <BadgeWithFlag type="modern" size="md" color="gray" flag="AU">
                    Label
                </BadgeWithFlag>
                <BadgeWithFlag type="modern" size="lg" color="gray" flag="AU">
                    Label
                </BadgeWithFlag>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Modern badges with a country flag on the left. Each row shows all sizes (sm, md, lg).",
            },
        },
    },
};

// With Avatar (BadgeWithImage)
export const WithAvatar: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">With Avatar</h3>
            {allColors.map((color) => (
                <div key={color} className="flex items-center gap-4">
                    <BadgeWithImage type="pill-color" size="sm" color={color} imgSrc="https://i.pravatar.cc/150?img=1">
                        Label
                    </BadgeWithImage>
                    <BadgeWithImage type="pill-color" size="md" color={color} imgSrc="https://i.pravatar.cc/150?img=1">
                        Label
                    </BadgeWithImage>
                    <BadgeWithImage type="pill-color" size="lg" color={color} imgSrc="https://i.pravatar.cc/150?img=1">
                        Label
                    </BadgeWithImage>
                </div>
            ))}
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Pill color badges with an avatar image on the left. Each row shows all sizes (sm, md, lg) for each color.",
            },
        },
    },
};

// With Avatar Badge Color
export const WithAvatarBadgeColor: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">With Avatar Badge Color</h3>
            {allColors.map((color) => (
                <div key={color} className="flex items-center gap-4">
                    <BadgeWithImage type="color" size="sm" color={color} imgSrc="https://i.pravatar.cc/150?img=1">
                        Label
                    </BadgeWithImage>
                    <BadgeWithImage type="color" size="md" color={color} imgSrc="https://i.pravatar.cc/150?img=1">
                        Label
                    </BadgeWithImage>
                    <BadgeWithImage type="color" size="lg" color={color} imgSrc="https://i.pravatar.cc/150?img=1">
                        Label
                    </BadgeWithImage>
                </div>
            ))}
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Color badges with an avatar image on the left. Each row shows all sizes (sm, md, lg) for each color.",
            },
        },
    },
};

// With Avatar Badge Modern
export const WithAvatarBadgeModern: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">With Avatar Badge Modern</h3>
            <div className="flex items-center gap-4">
                <BadgeWithImage type="modern" size="sm" color="gray" imgSrc="https://i.pravatar.cc/150?img=1">
                    Label
                </BadgeWithImage>
                <BadgeWithImage type="modern" size="md" color="gray" imgSrc="https://i.pravatar.cc/150?img=1">
                    Label
                </BadgeWithImage>
                <BadgeWithImage type="modern" size="lg" color="gray" imgSrc="https://i.pravatar.cc/150?img=1">
                    Label
                </BadgeWithImage>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Modern badges with an avatar image on the left. Each row shows all sizes (sm, md, lg).",
            },
        },
    },
};

// With Close X
export const WithCloseX: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">With Close X</h3>
            {allColors.map((color) => (
                <div key={color} className="flex items-center gap-4">
                    <BadgeWithButton type="pill-color" size="sm" color={color} buttonLabel="Remove">
                        Label
                    </BadgeWithButton>
                    <BadgeWithButton type="pill-color" size="md" color={color} buttonLabel="Remove">
                        Label
                    </BadgeWithButton>
                    <BadgeWithButton type="pill-color" size="lg" color={color} buttonLabel="Remove">
                        Label
                    </BadgeWithButton>
                </div>
            ))}
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Pill color badges with a close button (X) on the right. Each row shows all sizes (sm, md, lg) for each color.",
            },
        },
    },
};

// With Close X Badge Color
export const WithCloseXBadgeColor: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">With Close X Badge Color</h3>
            {allColors.map((color) => (
                <div key={color} className="flex items-center gap-4">
                    <BadgeWithButton type="color" size="sm" color={color} buttonLabel="Remove">
                        Label
                    </BadgeWithButton>
                    <BadgeWithButton type="color" size="md" color={color} buttonLabel="Remove">
                        Label
                    </BadgeWithButton>
                    <BadgeWithButton type="color" size="lg" color={color} buttonLabel="Remove">
                        Label
                    </BadgeWithButton>
                </div>
            ))}
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Color badges with a close button (X) on the right. Each row shows all sizes (sm, md, lg) for each color.",
            },
        },
    },
};

// With Close X Badge Modern
export const WithCloseXBadgeModern: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">With Close X Badge Modern</h3>
            <div className="flex items-center gap-4">
                <BadgeWithButton type="modern" size="sm" color="gray" buttonLabel="Remove">
                    Label
                </BadgeWithButton>
                <BadgeWithButton type="modern" size="md" color="gray" buttonLabel="Remove">
                    Label
                </BadgeWithButton>
                <BadgeWithButton type="modern" size="lg" color="gray" buttonLabel="Remove">
                    Label
                </BadgeWithButton>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Modern badges with a close button (X) on the right. Each row shows all sizes (sm, md, lg).",
            },
        },
    },
};

// With Icon Leading
export const WithIconLeading: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">With Icon Leading</h3>
            {allColors.map((color) => (
                <div key={color} className="flex items-center gap-4">
                    <BadgeWithIcon type="pill-color" size="sm" color={color} iconLeading={ArrowUp}>
                        Label
                    </BadgeWithIcon>
                    <BadgeWithIcon type="pill-color" size="md" color={color} iconLeading={ArrowUp}>
                        Label
                    </BadgeWithIcon>
                    <BadgeWithIcon type="pill-color" size="lg" color={color} iconLeading={ArrowUp}>
                        Label
                    </BadgeWithIcon>
                </div>
            ))}
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Pill color badges with a leading icon on the left. Each row shows all sizes (sm, md, lg) for each color.",
            },
        },
    },
};

// Color With Icon Leading
export const ColorWithIconLeading: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Color With Icon Leading</h3>
            {allColors.map((color) => (
                <div key={color} className="flex items-center gap-4">
                    <BadgeWithIcon type="color" size="sm" color={color} iconLeading={ArrowUp}>
                        Label
                    </BadgeWithIcon>
                    <BadgeWithIcon type="color" size="md" color={color} iconLeading={ArrowUp}>
                        Label
                    </BadgeWithIcon>
                    <BadgeWithIcon type="color" size="lg" color={color} iconLeading={ArrowUp}>
                        Label
                    </BadgeWithIcon>
                </div>
            ))}
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Color badges with a leading icon on the left. Each row shows all sizes (sm, md, lg) for each color.",
            },
        },
    },
};

// Modern With Icon Leading
export const ModernWithIconLeading: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Modern With Icon Leading</h3>
            {allColors.map((color) => (
                <div className="flex items-center gap-4">
                    <BadgeWithIcon type="modern" size="sm" color={color} iconLeading={Plus}>
                        Label
                    </BadgeWithIcon>
                    <BadgeWithIcon type="modern" size="md" color={color} iconLeading={Plus}>
                        Label
                    </BadgeWithIcon>
                    <BadgeWithIcon type="modern" size="lg" color="gray" iconLeading={Plus}>
                        Label
                    </BadgeWithIcon>
                </div>
            ))}
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Modern badges with a leading icon on the left. Each row shows all sizes (sm, md, lg) for each color.",
            },
        },
    },
};

// With Icon Trailing
export const WithIconTrailing: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">With Icon Trailing</h3>
            {allColors.map((color) => (
                <div key={color} className="flex items-center gap-4">
                    <BadgeWithIcon type="pill-color" size="sm" color={color} iconTrailing={ArrowRight}>
                        Label
                    </BadgeWithIcon>
                    <BadgeWithIcon type="pill-color" size="md" color={color} iconTrailing={ArrowRight}>
                        Label
                    </BadgeWithIcon>
                    <BadgeWithIcon type="pill-color" size="lg" color={color} iconTrailing={ArrowRight}>
                        Label
                    </BadgeWithIcon>
                </div>
            ))}
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Pill color badges with a trailing icon on the right. Each row shows all sizes (sm, md, lg) for each color.",
            },
        },
    },
};

// Color With Icon Trailing
export const ColorWithIconTrailing: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Color With Icon Trailing</h3>
            {allColors.map((color) => (
                <div key={color} className="flex items-center gap-4">
                    <BadgeWithIcon type="color" size="sm" color={color} iconTrailing={ArrowRight}>
                        Label
                    </BadgeWithIcon>
                    <BadgeWithIcon type="color" size="md" color={color} iconTrailing={ArrowRight}>
                        Label
                    </BadgeWithIcon>
                    <BadgeWithIcon type="color" size="lg" color={color} iconTrailing={ArrowRight}>
                        Label
                    </BadgeWithIcon>
                </div>
            ))}
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Color badges with a trailing icon on the right. Each row shows all sizes (sm, md, lg) for each color.",
            },
        },
    },
};

// Modern With Icon Trailing
export const ModernWithIconTrailing: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Modern With Icon Trailing</h3>
            <div className="flex items-center gap-4">
                <BadgeWithIcon type="modern" size="sm" color="gray" iconTrailing={ArrowRight}>
                    Label
                </BadgeWithIcon>
                <BadgeWithIcon type="modern" size="md" color="gray" iconTrailing={ArrowRight}>
                    Label
                </BadgeWithIcon>
                <BadgeWithIcon type="modern" size="lg" color="gray" iconTrailing={ArrowRight}>
                    Label
                </BadgeWithIcon>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Modern badges with a trailing icon on the right. Each row shows all sizes (sm, md, lg).",
            },
        },
    },
};

// With Icon Only
export const WithIconOnly: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">With Icon Only</h3>
            {allColors.map((color) => (
                <div key={color} className="flex items-center gap-4">
                    <BadgeIcon type="pill-color" size="sm" color={color} icon={Plus} />
                    <BadgeIcon type="pill-color" size="md" color={color} icon={Plus} />
                    <BadgeIcon type="pill-color" size="lg" color={color} icon={Plus} />
                </div>
            ))}
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Pill color badges with icon only (no text). Each row shows all sizes (sm, md, lg) for each color.",
            },
        },
    },
};

// Color With Icon Only
export const ColorWithIconOnly: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Color With Icon Only</h3>
            {allColors.map((color) => (
                <div key={color} className="flex items-center gap-4">
                    <BadgeIcon type="color" size="sm" color={color} icon={Plus} />
                    <BadgeIcon type="color" size="md" color={color} icon={Plus} />
                    <BadgeIcon type="color" size="lg" color={color} icon={Plus} />
                </div>
            ))}
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Color badges with icon only (no text). Each row shows all sizes (sm, md, lg) for each color.",
            },
        },
    },
};

// Modern With Icon Only
export const ModernWithIconOnly: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Modern With Icon Only</h3>
            <div className="flex items-center gap-4">
                <BadgeIcon type="modern" size="sm" color="gray" icon={Plus} />
                <BadgeIcon type="modern" size="md" color="gray" icon={Plus} />
                <BadgeIcon type="modern" size="lg" color="gray" icon={Plus} />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Modern badges with icon only (no text). Each row shows all sizes (sm, md, lg).",
            },
        },
    },
};
