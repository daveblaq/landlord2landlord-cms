import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { RatingBadge } from "./rating-badge";
import { RatingStars } from "./rating-stars";


const meta = {
    title: "Components/Rating Badge and Stars",
    component: RatingBadge,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Free and open-source React rating badge and star components built for modern applications and websites. These rating badge and stars are built using React Aria and styled with Tailwind CSS.",
            },
        },
    },
    tags: ["autodocs"],
    argTypes: {
        rating: {
            control: { type: "range", min: 0, max: 5, step: 0.5 },
            description: "The rating value to display",
        },
        theme: {
            control: "select",
            options: ["light", "dark"],
            description: "The theme variant of the rating badge",
        },
        title: {
            control: "text",
            description: "The title text for the rating badge",
        },
        subtitle: {
            control: "text",
            description: "The subtitle text for the rating badge",
        },
    },
} satisfies Meta<typeof RatingBadge>;

export default meta;
type Story = Omit<StoryObj<typeof meta>, "args"> & {
    args?: Partial<React.ComponentProps<typeof RatingBadge>>;
};

// Rating Badge and Stars Example - Main docs content (hidden from sidebar, only shows in Docs tab)
export const RatingBadgeAndStarsExample: Story = {
    render: () => (
        <div className="mt-10 space-y-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Rating Badge and Stars Examples</h3>
                <div className="mb-7 max-w-lg space-y-2">
                    <p className="text-sm text-text-secondary">
                        Free and open-source React rating badge and star components built for modern applications and websites. These rating badge and stars are
                        built using React Aria and styled with Tailwind CSS.
                    </p>
                </div>
                <div className="flex flex-col gap-8">
                    <RatingBadge rating={5} title="Best Design Tool" subtitle="2,000+ reviews" />
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Comprehensive examples of rating badge and stars variants.",
            },
        },
        // Hide from sidebar, only show in Docs tab
        docsOnly: true,
    },
};

export const RatingStarsStory: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Rating Stars</h3>
            <div className="mb-7 max-w-lg space-y-2">
                <p className="text-sm text-text-secondary">
                    Rating stars are used to display the rating of a product, service, or anything else. You can change the rating (between 0 and 5) of the
                    rating stars component by passing the rating prop.
                </p>
            </div>
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <RatingStars rating={3.5} />
                </div>
             
            </div>
        </div>
    ),
};

export const RatingBadgeStory: Story = {
    render: () => (
        <div className="mt-10 space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Rating Badge</h3>
            <div className="mb-7 max-w-lg space-y-2">
                <p className="text-sm text-text-secondary">
                    You can customize the rating badge by passing the rating prop. In addition, you can also change the title and subtitle of the rating badge
                    by passing the title and subtitle props.
                </p>
            </div>
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                    <RatingBadge rating={4.7} title="Best Design Tool" subtitle="2,000+ reviews" />
                </div>
            </div>
        </div>
    ),
};