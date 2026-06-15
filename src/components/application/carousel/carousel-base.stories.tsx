import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronLeft, ChevronRight } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import { Carousel } from "./carousel-base";

const meta = {
    title: "Application/Carousel",
    component: Carousel.Root,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "A flexible carousel component built with Embla Carousel. Supports horizontal and vertical orientations, navigation controls, and indicators.",
            },
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof Carousel.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

// Carousel Examples - Main docs content
export const CarouselExamples: Story = {
    render: () => (
        <Carousel.Root className="relative aspect-[1.6] max-w-160">
            <Carousel.PrevTrigger className="absolute top-1/2 left-4 z-10 flex size-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-alpha-white/90 p-2 text-fg-secondary outline-focus-ring backdrop-blur-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:bg-disabled_subtle disabled:text-fg-disabled">
                <ChevronLeft className="size-5" />
            </Carousel.PrevTrigger>
            <Carousel.NextTrigger className="absolute top-1/2 right-4 z-10 flex size-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-alpha-white/90 p-2 text-fg-secondary outline-focus-ring backdrop-blur-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:bg-disabled_subtle disabled:text-fg-disabled">
                <ChevronRight className="size-5" />
            </Carousel.NextTrigger>

            <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 overflow-visible">
                <Carousel.IndicatorGroup className="flex gap-2 rounded-full bg-alpha-white/90 px-3 py-2 backdrop-blur-xs">
                    {({ index }) => (
                        <Carousel.Indicator
                            index={index}
                            className={({ isSelected }) =>
                                cx("size-2 rounded-full transition-colors", isSelected ? "bg-brand-solid" : "bg-quaternary hover:bg-tertiary")
                            }
                        />
                    )}
                </Carousel.IndicatorGroup>
            </div>

            <Carousel.Content className="gap-2">
                <Carousel.Item className="overflow-hidden rounded-xl">
                    <img alt="Image by Unsplash" src="https://www.untitledui.com/application/plants.webp" className="size-full object-cover" />
                </Carousel.Item>
                <Carousel.Item className="overflow-hidden rounded-xl">
                    <img
                        alt="Image by Unsplash"
                        src="https://images.unsplash.com/photo-1484506097116-1bcba4fa7568?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        className="size-full object-cover"
                    />
                </Carousel.Item>
                <Carousel.Item className="overflow-hidden rounded-xl">
                    <img
                        alt="Image by Unsplash"
                        src="https://images.unsplash.com/photo-1471899236350-e3016bf1e69e?q=80&w=2971&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        className="size-full object-cover"
                    />
                </Carousel.Item>
            </Carousel.Content>
        </Carousel.Root>
    ),
    parameters: {
        docs: {
            description: {
                story: "Comprehensive examples of carousel variants with different sizes and configurations.",
            },
        },
        docsOnly: true,
    },
};

// Carousel md - Medium size variant
export const CarouselMd: Story = {
    render: () => (
        <Carousel.Root className="relative aspect-[1.6] max-w-160">
            <Carousel.PrevTrigger className="absolute top-1/2 left-4 z-10 flex size-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-alpha-white/90 p-2 text-fg-secondary outline-focus-ring backdrop-blur-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:bg-disabled_subtle disabled:text-fg-disabled">
                <ChevronLeft className="size-5" />
            </Carousel.PrevTrigger>
            <Carousel.NextTrigger className="absolute top-1/2 right-4 z-10 flex size-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-alpha-white/90 p-2 text-fg-secondary outline-focus-ring backdrop-blur-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:bg-disabled_subtle disabled:text-fg-disabled">
                <ChevronRight className="size-5" />
            </Carousel.NextTrigger>

            <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 overflow-visible">
                <Carousel.IndicatorGroup className="flex gap-2 rounded-full bg-alpha-white/90 px-3 py-2 backdrop-blur-xs">
                    {({ index }) => (
                        <Carousel.Indicator
                            index={index}
                            className={({ isSelected }) =>
                                cx("size-2 rounded-full transition-colors", isSelected ? "bg-brand-solid" : "bg-quaternary hover:bg-tertiary")
                            }
                        />
                    )}
                </Carousel.IndicatorGroup>
            </div>

            <Carousel.Content className="gap-2">
                <Carousel.Item className="overflow-hidden rounded-xl">
                    <img alt="Image by Unsplash" src="https://www.untitledui.com/application/plants.webp" className="size-full object-cover" />
                </Carousel.Item>
                <Carousel.Item className="overflow-hidden rounded-xl">
                    <img
                        alt="Image by Unsplash"
                        src="https://images.unsplash.com/photo-1484506097116-1bcba4fa7568?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        className="size-full object-cover"
                    />
                </Carousel.Item>
                <Carousel.Item className="overflow-hidden rounded-xl">
                    <img
                        alt="Image by Unsplash"
                        src="https://images.unsplash.com/photo-1471899236350-e3016bf1e69e?q=80&w=2971&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        className="size-full object-cover"
                    />
                </Carousel.Item>
            </Carousel.Content>
        </Carousel.Root>
    ),
    parameters: {
        docs: {
            description: {
                story: "Medium-sized carousel with navigation buttons and indicators.",
            },
        },
    },
};

// Carousel lg - Large size variant
export const CarouselLg: Story = {
    render: () => (
        <Carousel.Root className="relative aspect-[1.6] max-w-160">
            <Carousel.PrevTrigger className="absolute top-1/2 left-5 z-10 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-alpha-white/90 p-2 text-fg-secondary outline-focus-ring backdrop-blur-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:bg-disabled_subtle disabled:text-fg-disabled">
                <ChevronLeft className="size-6" />
            </Carousel.PrevTrigger>
            <Carousel.NextTrigger className="absolute top-1/2 right-5 z-10 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-alpha-white/90 p-2 text-fg-secondary outline-focus-ring backdrop-blur-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:bg-disabled_subtle disabled:text-fg-disabled">
                <ChevronRight className="size-6" />
            </Carousel.NextTrigger>

            <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 overflow-visible">
                <Carousel.IndicatorGroup className="flex gap-2.5 rounded-full bg-alpha-white/90 px-4 py-2.5 backdrop-blur-xs">
                    {({ index }) => (
                        <Carousel.Indicator
                            index={index}
                            className={({ isSelected }) =>
                                cx("size-2.5 rounded-full transition-colors", isSelected ? "bg-brand-solid" : "bg-quaternary hover:bg-tertiary")
                            }
                        />
                    )}
                </Carousel.IndicatorGroup>
            </div>

            <Carousel.Content className="gap-2">
                <Carousel.Item className="overflow-hidden rounded-xl">
                    <img alt="Image by Unsplash" src="https://www.untitledui.com/application/plants.webp" className="size-full object-cover" />
                </Carousel.Item>
                <Carousel.Item className="overflow-hidden rounded-xl">
                    <img
                        alt="Image by Unsplash"
                        src="https://images.unsplash.com/photo-1484506097116-1bcba4fa7568?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        className="size-full object-cover"
                    />
                </Carousel.Item>
                <Carousel.Item className="overflow-hidden rounded-xl">
                    <img
                        alt="Image by Unsplash"
                        src="https://images.unsplash.com/photo-1471899236350-e3016bf1e69e?q=80&w=2971&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        className="size-full object-cover"
                    />
                </Carousel.Item>
            </Carousel.Content>
        </Carousel.Root>
    ),
    parameters: {
        docs: {
            description: {
                story: "Large-sized carousel with navigation buttons and indicators.",
            },
        },
    },
};
