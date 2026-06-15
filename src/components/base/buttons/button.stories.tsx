import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Placeholder } from "@untitledui/icons";
import { Button } from "./button";

const meta = {
    title: "Components/Button",
    component: Button,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Free and open-source React button components built for modern applications and websites. These buttons are built using React Aria and styled with Tailwind CSS.",
            },
        },
    },
    tags: ["autodocs"],
    argTypes: {
        size: {
            control: "select",
            options: ["iconOnly", "xs", "sm", "md", "lg", "xl"],
            description: "Button size variant",
        },
        color: {
            control: "select",
            options: [
                "primary",
                "secondary",
                "tertiary",
                "link-gray",
                "link-color",
                "primary-destructive",
                "secondary-destructive",
                "tertiary-destructive",
                "link-destructive",
            ],
            description: "Button color variant",
        },
        isDisabled: {
            control: "boolean",
            description: "Disables the button",
        },
        isLoading: {
            control: "boolean",
            description: 'Shows loading spinner and "Submitting..." text',
        },
        children: {
            control: "text",
            description: "Button text content",
        },
    },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Buttons Example - Main docs content (hidden from sidebar, only shows in Docs tab)
export const ButtonsExample: Story = {
    render: () => (
        <div className="mt-10 space-y-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Button Variants</h3>
                <div className="mb-7 max-w-lg space-y-2">
                    <p className="text-sm text-text-secondary">
                        A comprehensive button component with multiple variants, sizes, and states. Supports icons, loading states, and can be used as both
                        button and link elements.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    <Button color="primary">Primary</Button>
                    <Button color="secondary">Secondary</Button>
                    <Button color="tertiary">Tertiary</Button>
                    <Button color="link-gray">Link Gray</Button>
                    <Button color="link-color">Link Color</Button>
                    <Button color="primary-destructive">Destructive</Button>
                    <Button color="secondary-destructive">Destructive</Button>
                    <Button color="tertiary-destructive">Destructive</Button>
                    <Button color="link-destructive">Destructive</Button>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Comprehensive examples of button variants, sizes, and states.",
            },
        },
        // Hide from sidebar, only show in Docs tab
        docsOnly: true,
    },
};

// Basic Examples
export const Primary: Story = {
    render: () => (
        <div className="mt-10 space-y-8">
            {/* Sizes */}
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Primary</h3>
                <div className="flex flex-wrap items-center gap-4">
                    <Button color="primary" size="sm">
                        Button sm
                    </Button>
                    <Button color="primary" size="md">
                        Button md
                    </Button>
                    <Button color="primary" size="lg">
                        Button lg
                    </Button>
                    <Button color="primary" size="xl">
                        Button xl
                    </Button>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Primary button variant showcasing all sizes.",
            },
        },
    },
};

export const Secondary: Story = {
    render: () => (
        <div className="mt-10 space-y-8">
            {/* Sizes */}
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Secondary</h3>
                <div className="flex flex-wrap items-center gap-4">
                    <Button color="secondary" size="sm">
                        Button sm
                    </Button>
                    <Button color="secondary" size="md">
                        Button md
                    </Button>
                    <Button color="secondary" size="lg">
                        Button lg
                    </Button>
                    <Button color="secondary" size="xl">
                        Button xl
                    </Button>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Secondary button variant showcasing all sizes",
            },
        },
    },
};

export const Tertiary: Story = {
    render: () => (
        <div className="mt-10 space-y-8">
            {/* Sizes */}
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Tertiary</h3>
                <div className="flex flex-wrap items-center gap-4">
                    <Button color="tertiary" size="sm">
                        Button sm
                    </Button>
                    <Button color="tertiary" size="md">
                        Button md
                    </Button>
                    <Button color="tertiary" size="lg">
                        Button lg
                    </Button>
                    <Button color="tertiary" size="xl">
                        Button xl
                    </Button>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Tertiary button variant showcasing all sizes.",
            },
        },
    },
};

// Helper function to create variant stories
const createVariantStory = (
    color: "link-gray" | "link-color" | "primary-destructive" | "secondary-destructive" | "tertiary-destructive" | "link-destructive",
    description: string,
    variantName: string,
): Story => ({
    render: () => (
        <div className="mt-10 space-y-8">
            {/* Sizes */}
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">{variantName}</h3>
                <div className="max-w-lg space-y-2">
                    <p className="text-sm text-text-secondary">{description}</p>
                </div>
                <div className="mt-7 flex flex-wrap items-center gap-4">
                    <Button color={color} size="sm">
                        Button sm
                    </Button>
                    <Button color={color} size="md">
                        Button md
                    </Button>
                    <Button color={color} size="lg">
                        Button lg
                    </Button>
                    <Button color={color} size="xl">
                        Button xl
                    </Button>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: `${variantName} button variant showcasing all sizes.`,
            },
        },
    },
});

export const LinkGray: Story = createVariantStory(
    "link-gray",
    "We've designed our button components to be 'hybrid,' meaning they can function as either a link or a standard button with ease. This offers several benefits, for example, there are many situations where you might want a link that behaves like a button, or a button that acts as a link. These two essential components work interchangeably, so it was important for us to make them easy to use. You can turn the button component into an anchor by simply passing the href prop. When the href prop is present, the button component uses the Link component from React Aria under the hood instead of Button. This means you can pass any props or attributes that an anchor tag would accept when href is provided.",
    "Link Gray",
);
export const LinkColor: Story = createVariantStory("link-color", "", "Link Color");
export const LinkDestructive: Story = createVariantStory("link-destructive", "", "Link Destructive");

// Color Variants
export const ColorVariants: Story = {
    render: () => (
        <div className="mt-10 flex flex-wrap gap-4">
            <Button color="primary">Primary</Button>
            <Button color="secondary">Secondary</Button>
            <Button color="tertiary">Tertiary</Button>
            <Button color="primary-destructive">Destructive</Button>
            <Button color="secondary-destructive">Secondary Destructive</Button>
            <Button color="tertiary-destructive">Tertiary Destructive</Button>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "All available color variants for buttons.",
            },
        },
    },
};

// Link Variants
export const LinkVariants: Story = {
    render: () => (
        <div className="mt-10 flex flex-wrap gap-4">
            <Button color="link-gray" href="#demo">
                Link Gray
            </Button>
            <Button color="link-color" href="#demo">
                Link Color
            </Button>
            <Button color="link-destructive" href="#demo">
                Link Destructive
            </Button>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Link variants that render as anchor tags. Pass an `href` prop to use as a link.",
            },
        },
    },
};

// Icons - Leading
export const WithLeadingIcon: Story = {
    render: () => (
        <div className="mt-10 space-y-8">
            {/* Primary */}
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Icon leading buttons</h3>
                <div className="mb-7 max-w-lg space-y-2">
                    <p className="text-sm text-text-secondary">
                        We've designed our button components to be "hybrid," meaning they can function as either a link or a standard button with ease. This
                        offers several benefits, for example, there are many situations where you might want a link that behaves like a button, or a button that
                        acts as a link. These two essential components work interchangeably, so it was important for us to make them easy to use.
                    </p>
                    <p className="text-sm text-text-secondary">
                        You can turn the button component into an anchor by simply passing the href prop. When the href prop is present, the button component
                        uses the Link component from React Aria under the hood instead of Button. This means you can pass any props or attributes that an anchor
                        tag would accept when href is provided.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    <Button color="primary" size="sm" iconLeading={Placeholder}>
                        Small
                    </Button>
                    <Button color="primary" size="md" iconLeading={Placeholder}>
                        Medium
                    </Button>
                    <Button color="primary" size="lg" iconLeading={Placeholder}>
                        Large
                    </Button>
                    <Button color="primary" size="xl" iconLeading={Placeholder}>
                        Extra Large
                    </Button>
                </div>
            </div>

            {/* Secondary */}
            <div>
                <div className="flex flex-wrap items-center gap-4">
                    <Button color="secondary" size="sm" iconLeading={Placeholder}>
                        Small
                    </Button>
                    <Button color="secondary" size="md" iconLeading={Placeholder}>
                        Medium
                    </Button>
                    <Button color="secondary" size="lg" iconLeading={Placeholder}>
                        Large
                    </Button>
                    <Button color="secondary" size="xl" iconLeading={Placeholder}>
                        Extra Large
                    </Button>
                </div>
            </div>

            {/* Tertiary */}
            <div>
                <div className="flex flex-wrap items-center gap-4">
                    <Button color="tertiary" size="sm" iconLeading={Placeholder}>
                        Small
                    </Button>
                    <Button color="tertiary" size="md" iconLeading={Placeholder}>
                        Medium
                    </Button>
                    <Button color="tertiary" size="lg" iconLeading={Placeholder}>
                        Large
                    </Button>
                    <Button color="tertiary" size="xl" iconLeading={Placeholder}>
                        Extra Large
                    </Button>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Buttons with icons displayed before the text, showing all sizes for each color variant.",
            },
        },
    },
};

// Icons - Trailing
export const WithTrailingIcon: Story = {
    render: () => (
        <div className="mt-10 space-y-8">
            {/* Primary */}
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Icon trailing buttons</h3>
                <div className="mb-7 max-w-lg space-y-2">
                    <p className="text-sm text-text-secondary">
                        Similar to the iconLeading prop, you can display a trailing icon by passing a function component or a JSX element with a data-icon
                        attribute to the iconTrailing prop.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    <Button color="primary" size="sm" iconTrailing={Placeholder}>
                        Small
                    </Button>
                    <Button color="primary" size="md" iconTrailing={Placeholder}>
                        Medium
                    </Button>
                    <Button color="primary" size="lg" iconTrailing={Placeholder}>
                        Large
                    </Button>
                    <Button color="primary" size="xl" iconTrailing={Placeholder}>
                        Extra Large
                    </Button>
                </div>
            </div>

            {/* Secondary */}
            <div>
                <div className="flex flex-wrap items-center gap-4">
                    <Button color="secondary" size="sm" iconTrailing={Placeholder}>
                        Small
                    </Button>
                    <Button color="secondary" size="md" iconTrailing={Placeholder}>
                        Medium
                    </Button>
                    <Button color="secondary" size="lg" iconTrailing={Placeholder}>
                        Large
                    </Button>
                    <Button color="secondary" size="xl" iconTrailing={Placeholder}>
                        Extra Large
                    </Button>
                </div>
            </div>

            {/* Tertiary */}
            <div>
                <div className="flex flex-wrap items-center gap-4">
                    <Button color="tertiary" size="sm" iconTrailing={Placeholder}>
                        Small
                    </Button>
                    <Button color="tertiary" size="md" iconTrailing={Placeholder}>
                        Medium
                    </Button>
                    <Button color="tertiary" size="lg" iconTrailing={Placeholder}>
                        Large
                    </Button>
                    <Button color="tertiary" size="xl" iconTrailing={Placeholder}>
                        Extra Large
                    </Button>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Buttons with icons displayed after the text, showing all sizes for each color variant.",
            },
        },
    },
};

// Icons - Both
export const WithBothIcons: Story = {
    render: () => (
        <div className="mt-10 space-y-8">
            {/* Primary */}
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Buttons With Both Icons</h3>

                <div className="flex flex-wrap items-center gap-4">
                    <Button color="primary" size="sm" iconLeading={Placeholder} iconTrailing={Placeholder}>
                        Small
                    </Button>
                    <Button color="primary" size="md" iconLeading={Placeholder} iconTrailing={Placeholder}>
                        Medium
                    </Button>
                    <Button color="primary" size="lg" iconLeading={Placeholder} iconTrailing={Placeholder}>
                        Large
                    </Button>
                    <Button color="primary" size="xl" iconLeading={Placeholder} iconTrailing={Placeholder}>
                        Extra Large
                    </Button>
                </div>
            </div>

            {/* Secondary */}
            <div>
                <div className="flex flex-wrap items-center gap-4">
                    <Button color="secondary" size="sm" iconLeading={Placeholder} iconTrailing={Placeholder}>
                        Small
                    </Button>
                    <Button color="secondary" size="md" iconLeading={Placeholder} iconTrailing={Placeholder}>
                        Medium
                    </Button>
                    <Button color="secondary" size="lg" iconLeading={Placeholder} iconTrailing={Placeholder}>
                        Large
                    </Button>
                    <Button color="secondary" size="xl" iconLeading={Placeholder} iconTrailing={Placeholder}>
                        Extra Large
                    </Button>
                </div>
            </div>

            {/* Tertiary */}
            <div>
                <div className="flex flex-wrap items-center gap-4">
                    <Button color="tertiary" size="sm" iconLeading={Placeholder} iconTrailing={Placeholder}>
                        Small
                    </Button>
                    <Button color="tertiary" size="md" iconLeading={Placeholder} iconTrailing={Placeholder}>
                        Medium
                    </Button>
                    <Button color="tertiary" size="lg" iconLeading={Placeholder} iconTrailing={Placeholder}>
                        Large
                    </Button>
                    <Button color="tertiary" size="xl" iconLeading={Placeholder} iconTrailing={Placeholder}>
                        Extra Large
                    </Button>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Buttons with both leading and trailing icons, showing all sizes for each color variant.",
            },
        },
    },
};

// Icon Only Buttons
export const IconOnly: Story = {
    render: () => (
        <div className="mt-10 space-y-8">
            {/* Primary */}
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Icon only buttons</h3>
                <div className="mb-7 max-w-lg space-y-2">
                    <p className="text-sm text-text-secondary">
                        You can also display an icon only button by omitting the button children and passing an icon to the iconLeading or iconTrailing prop.
                    </p>
                    <p className="text-sm text-text-secondary">
                        Please note that, it's recommended to pass an aria-label to the button when using an icon only button in order to provide a better
                        experience for screen readers as the icons themselves do not provide any context.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    <Button color="primary" size="sm" iconLeading={Placeholder} />
                    <Button color="primary" size="md" iconLeading={Placeholder} />
                    <Button color="primary" size="lg" iconLeading={Placeholder} />
                    <Button color="primary" size="xl" iconLeading={Placeholder} />
                </div>
            </div>

            {/* Secondary */}
            <div>
                <div className="flex flex-wrap items-center gap-4">
                    <Button color="secondary" size="sm" iconLeading={Placeholder} />
                    <Button color="secondary" size="md" iconLeading={Placeholder} />
                    <Button color="secondary" size="lg" iconLeading={Placeholder} />
                    <Button color="secondary" size="xl" iconLeading={Placeholder} />
                </div>
            </div>

            {/* Tertiary */}
            <div>
                <div className="flex flex-wrap items-center gap-4">
                    <Button color="tertiary" size="sm" iconLeading={Placeholder} />
                    <Button color="tertiary" size="md" iconLeading={Placeholder} />
                    <Button color="tertiary" size="lg" iconLeading={Placeholder} />
                    <Button color="tertiary" size="xl" iconLeading={Placeholder} />
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Icon-only buttons automatically detected when no children are provided, showing all sizes for each color variant.",
            },
        },
    },
};

// Loading State - Loader Only (No Text)
export const Loading: Story = {
    render: () => (
        <div className="mt-10 space-y-8">
            {/* Primary */}
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Loading buttons</h3>
                <div className="mb-7 max-w-lg space-y-2">
                    <p className="text-sm text-text-secondary">
                        Our button component makes it easy to implement loading states with the isLoading prop. When enabled, the button automatically displays
                        a spinner and becomes non-interactive to prevent multiple submissions. You can control whether to show the button text alongside the
                        spinner using the showTextWhileLoading prop—this is particularly useful for providing context about what's happening. The loading
                        spinner is automatically sized and styled to match your button's size and color variant.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    <Button color="primary" size="sm" isLoading showTextWhileLoading={true}>
                        Button sm
                    </Button>
                    <Button color="primary" size="md" isLoading showTextWhileLoading={true}>
                        Button md
                    </Button>
                    <Button color="primary" size="lg" isLoading showTextWhileLoading={true}>
                        Button lg
                    </Button>
                    <Button color="primary" size="xl" isLoading showTextWhileLoading={true}>
                        Button xl
                    </Button>
                </div>
            </div>

            {/* Secondary */}
            <div>
                <div className="flex flex-wrap items-center gap-4">
                    <Button color="secondary" size="sm" isLoading showTextWhileLoading={true}>
                        Button sm
                    </Button>
                    <Button color="secondary" size="md" isLoading showTextWhileLoading={true}>
                        Button md
                    </Button>
                    <Button color="secondary" size="lg" isLoading showTextWhileLoading={true}>
                        Button lg
                    </Button>
                    <Button color="secondary" size="xl" isLoading showTextWhileLoading={true}>
                        Button xl
                    </Button>
                </div>
            </div>

            {/* Tertiary */}
            <div>
                <div className="flex flex-wrap items-center gap-4">
                    <Button color="tertiary" size="sm" isLoading showTextWhileLoading={true}>
                        Button sm
                    </Button>
                    <Button color="tertiary" size="md" isLoading showTextWhileLoading={true}>
                        Button md
                    </Button>
                    <Button color="tertiary" size="lg" isLoading showTextWhileLoading={true}>
                        Button lg
                    </Button>
                    <Button color="tertiary" size="xl" isLoading showTextWhileLoading={true}>
                        Button xl
                    </Button>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Loading state with only the loader spinner, no text. Use `showTextWhileLoading={false}` to hide the 'Submitting...' text during loading.",
            },
        },
    },
};

// Disabled State
export const Disabled: Story = {
    render: () => (
        <div className="mt-10 space-y-8">
            {/* Primary */}
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Disabled buttons</h3>
                <div className="mb-7 max-w-lg space-y-2">
                    <p className="text-sm text-text-secondary">
                        Our button component handles disabled states through the isDisabled prop, which applies appropriate styling and removes all interactive
                        functionality. When disabled, buttons automatically change their appearance to indicate that they are not clickable, change their cursor
                        to a not-allowed cursor, and any associated actions or navigation are prevented. The disabled styling is consistent across all button
                        variants and sizes, ensuring a cohesive user experience throughout your application while maintaining accessibility standards.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    <Button color="primary" size="sm" isDisabled>
                        Button sm
                    </Button>
                    <Button color="primary" size="md" isDisabled>
                        Button md
                    </Button>
                    <Button color="primary" size="lg" isDisabled>
                        Button lg
                    </Button>
                    <Button color="primary" size="xl" isDisabled>
                        Button xl
                    </Button>
                </div>
            </div>

            {/* Secondary */}
            <div>
                <div className="flex flex-wrap items-center gap-4">
                    <Button color="secondary" size="sm" isDisabled>
                        Button sm
                    </Button>
                    <Button color="secondary" size="md" isDisabled>
                        Button md
                    </Button>
                    <Button color="secondary" size="lg" isDisabled>
                        Button lg
                    </Button>
                    <Button color="secondary" size="xl" isDisabled>
                        Button xl
                    </Button>
                </div>
            </div>

            {/* Tertiary */}
            <div>
                <div className="flex flex-wrap items-center gap-4">
                    <Button color="tertiary" size="sm" isDisabled>
                        Button sm
                    </Button>
                    <Button color="tertiary" size="md" isDisabled>
                        Button md
                    </Button>
                    <Button color="tertiary" size="lg" isDisabled>
                        Button lg
                    </Button>
                    <Button color="tertiary" size="xl" isDisabled>
                        Button xl
                    </Button>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Loading state with only the loader spinner, no text. Use `showTextWhileLoading={false}` to hide the 'Submitting...' text during loading.",
            },
        },
    },
};
export const PrimaryDestructive: Story = createVariantStory(
    "primary-destructive",
    "Our button component provides three destructive variants: primary-destructive, secondary-destructive, and tertiary-destructive. Each variant maintains the same interaction patterns as their non-destructive counterparts while applying appropriate warning colors and styling. You can use these variants just like regular buttons, and they support all the same features including icons, loading states, and disabled states, ensuring consistency across your application's destructive actions.",
    "Primary Destructive",
);
export const SecondaryDestructive: Story = createVariantStory("secondary-destructive", "", "Secondary Destructive");
export const TertiaryDestructive: Story = createVariantStory("tertiary-destructive", "", "Tertiary Destructive");

// Buttons with Tooltips
// export const WithTooltips: Story = {
//     render: () => (
//         <div className="mt-10 space-y-8">
//             {/* Primary */}
//             <div>
//                 <h3 className="mb-4 text-lg font-semibold text-text-primary">Primary</h3>
//                 <div className="flex flex-wrap items-center gap-4">
//                     <Tooltip title="Primary Small Button">
//                         <Button color="primary" size="sm">
//                             Small
//                         </Button>
//                     </Tooltip>
//                     <Tooltip title="Primary Medium Button">
//                         <Button color="primary" size="md">
//                             Medium
//                         </Button>
//                     </Tooltip>
//                     <Tooltip title="Primary Large Button" description="This is a large primary button">
//                         <Button color="primary" size="lg">
//                             Large
//                         </Button>
//                     </Tooltip>
//                     <Tooltip title="Primary Extra Large Button" arrow>
//                         <Button color="primary" size="xl">
//                             Extra Large
//                         </Button>
//                     </Tooltip>
//                 </div>
//             </div>

//             {/* Secondary */}
//             <div>
//                 <h3 className="mb-4 text-lg font-semibold text-text-primary">Secondary</h3>
//                 <div className="flex flex-wrap items-center gap-4">
//                     <Tooltip title="Secondary Small Button">
//                         <Button color="secondary" size="sm">
//                             Small
//                         </Button>
//                     </Tooltip>
//                     <Tooltip title="Secondary Medium Button">
//                         <Button color="secondary" size="md">
//                             Medium
//                         </Button>
//                     </Tooltip>
//                     <Tooltip title="Secondary Large Button" description="This is a large secondary button">
//                         <Button color="secondary" size="lg">
//                             Large
//                         </Button>
//                     </Tooltip>
//                     <Tooltip title="Secondary Extra Large Button" arrow>
//                         <Button color="secondary" size="xl">
//                             Extra Large
//                         </Button>
//                     </Tooltip>
//                 </div>
//             </div>

//             {/* Tertiary */}
//             <div>
//                 <h3 className="mb-4 text-lg font-semibold text-text-primary">Tertiary</h3>
//                 <div className="flex flex-wrap items-center gap-4">
//                     <Tooltip title="Tertiary Small Button">
//                         <Button color="tertiary" size="sm">
//                             Small
//                         </Button>
//                     </Tooltip>
//                     <Tooltip title="Tertiary Medium Button">
//                         <Button color="tertiary" size="md">
//                             Medium
//                         </Button>
//                     </Tooltip>
//                     <Tooltip title="Tertiary Large Button" description="This is a large tertiary button">
//                         <Button color="tertiary" size="lg">
//                             Large
//                         </Button>
//                     </Tooltip>
//                     <Tooltip title="Tertiary Extra Large Button" arrow>
//                         <Button color="tertiary" size="xl">
//                             Extra Large
//                         </Button>
//                     </Tooltip>
//                 </div>
//             </div>
//         </div>
//     ),
//     parameters: {
//         docs: {
//             description: {
//                 story: "Buttons with tooltips showing all variants. Hover over the buttons to see the tooltips. Some tooltips include descriptions and arrows.",
//             },
//         },
//     },
// };
