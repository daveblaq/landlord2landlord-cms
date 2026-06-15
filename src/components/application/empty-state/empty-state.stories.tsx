import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { EmptyState } from "./empty-state";
import { Button } from "@/components/base/buttons/button";
import { SearchLg } from "@untitledui/icons";

const meta = {
    title: "Application/Empty States",
    component: EmptyState,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component: "Empty state components for displaying when there's no content to show.",
            },
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

// Empty States Examples - Main docs content
export const EmptyStatesExamples: Story = {
    render: () => (
        <div className="space-y-12 w-full max-w-4xl">
              <div className="space-y-12 w-full max-w-4xl">
            <div>
                <EmptyState>
                    <EmptyState.Header>
                        <EmptyState.FeaturedIcon icon={SearchLg} color="gray" theme="modern" />
                    </EmptyState.Header>
                    <EmptyState.Content>
                        <EmptyState.Title>No projects found</EmptyState.Title>
                        <EmptyState.Description>Your search “Landing page design” did not match any projects. Please try again.</EmptyState.Description>
                    </EmptyState.Content>
                    <EmptyState.Footer>
                        <div className="flex gap-2">
                        <Button color="secondary" size="sm"> 
                            Clear Search
                        </Button>
                        <Button color="primary" size="sm">
                   New Project
                </Button>
                </div>
                    </EmptyState.Footer>
                </EmptyState>
            </div>
           
        </div>
           
          
        </div>
    ),
};

// Featured Icon
export const FeaturedIcon: Story = {
    render: () => (
        <div>
      
        <EmptyState>
            <EmptyState.Header>
                <EmptyState.Illustration type="cloud" color="gray" />
            </EmptyState.Header>
            <EmptyState.Content>
                <EmptyState.Title>No projects found</EmptyState.Title>
                <EmptyState.Description>Your search “Landing page design” did not match any projects. Please try again.</EmptyState.Description>
            </EmptyState.Content>
            <EmptyState.Footer>
            <div className="flex gap-2">
                        <Button color="secondary" size="sm">
                            Clear Search
                        </Button>
                        <Button color="primary" size="sm">
                   New Project
                </Button>
                </div>
            </EmptyState.Footer>
        </EmptyState>
    </div>
    ),
};

// Illustration
export const Illustration: Story = {
    render: () => (
        <EmptyState>
            <EmptyState.Header>
                <EmptyState.Illustration type="cloud" color="gray" />
            </EmptyState.Header>
            <EmptyState.Content>
                <EmptyState.Title>No projects found</EmptyState.Title>
                <EmptyState.Description>Your search “Landing page design” did not match any projects. Please try again.</EmptyState.Description>
            </EmptyState.Content>
            <EmptyState.Footer>
            <div className="flex gap-2">
                        <Button color="secondary" size="sm">
                            Clear Search
                        </Button>
                        <Button color="primary" size="sm">
                   New Project
                </Button>
                </div>
            </EmptyState.Footer>
        </EmptyState>
    ),
};

// File Icon
export const FileIcon: Story = {
    render: () => (
        <div>

        <EmptyState>
            <EmptyState.Header>
                <EmptyState.FileTypeIcon type="folder" theme="solid" />
            </EmptyState.Header>
            <EmptyState.Content>
                <EmptyState.Title>No projects found</EmptyState.Title>
                <EmptyState.Description>Your search “Landing page design” did not match any projects. Please try again.</EmptyState.Description>
            </EmptyState.Content>
            <EmptyState.Footer>
            <div className="flex gap-2">
                        <Button color="secondary" size="sm">
                            Clear Search
                        </Button>
                        <Button color="primary" size="sm">
                   New Project
                </Button>
                </div>
            </EmptyState.Footer>
        </EmptyState>
    </div>
    ),
};

