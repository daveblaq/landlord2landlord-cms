import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
    PaginationPageDefault,
    PaginationCardMinimal,
    PaginationButtonGroup,
} from "./pagination";
import { PaginationDot } from "./pagination-dot";
import { PaginationLine } from "./pagination-line";
import * as Paginations from "@/components/application/pagination/pagination";

const meta = {
    title: "Application/Pagination",
    component: PaginationPageDefault,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component: "A flexible pagination component with multiple variants for different use cases.",
            },
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof PaginationPageDefault>;

export default meta;
type Story = StoryObj<typeof meta>;

// Pagination Examples - Main docs content
export const PaginationExamples: Story = {
    render: () => {
      
        const [currentPage, setCurrentPage] = useState(1);
 
        return <Paginations.PaginationPageDefault page={currentPage} onPageChange={setCurrentPage} />;
    },
};

// Page Default
export const PageDefault: Story = {
    render: () => {
        const [currentPage, setCurrentPage] = useState(1);
 
        return <Paginations.PaginationCardDefault page={currentPage} onPageChange={setCurrentPage} />;

    },
};

// Page Minimal Center
export const PageMinimalCenter: Story = {
    render: () => {
        const [currentPage, setCurrentPage] = useState(1);
 
        return <Paginations.PaginationPageMinimalCenter page={currentPage} onPageChange={setCurrentPage} />;
    },
};

// Card Default
export const CardDefault: Story = {
    render: () => {
        const [currentPage, setCurrentPage] = useState(1);
 
        return <Paginations.PaginationCardDefault page={currentPage} onPageChange={setCurrentPage} />;
    },
};

// Card Minimal Right Aligned
export const CardMinimalRightAligned: Story = {
    render: () => {
        const [page, setPage] = useState(1);
        return <PaginationCardMinimal page={page} total={10} align="right" onPageChange={setPage} />;
    },
};

// Card Minimal Center Aligned
export const CardMinimalCenterAligned: Story = {
    render: () => {
        const [page, setPage] = useState(1);
        return <PaginationCardMinimal page={page} total={10} align="center" onPageChange={setPage} />;
    },
};

// Card Minimal Left Aligned
export const CardMinimalLeftAligned: Story = {
    render: () => {
        const [page, setPage] = useState(1);
        return <PaginationCardMinimal page={page} total={10} align="left" onPageChange={setPage} />;
    },
};

// Button Group Right Aligned
export const ButtonGroupRightAligned: Story = {
    render: () => {
        const [page, setPage] = useState(1);
        return <PaginationButtonGroup page={page} total={10} align="right" onPageChange={setPage} />;
    },
};

// Button Group Center Aligned
export const ButtonGroupCenterAligned: Story = {
    render: () => {
        const [page, setPage] = useState(1);
        return <PaginationButtonGroup page={page} total={10} align="center" onPageChange={setPage} />;
    },
};

// Button Group Left Aligned
export const ButtonGroupLeftAligned: Story = {
    render: () => {
        const [page, setPage] = useState(1);
        return <PaginationButtonGroup page={page} total={10} align="left" onPageChange={setPage} />;
    },
};

// Pagination Dot
export const PaginationDotStory: Story = {
    render: () => {
        const [page, setPage] = useState(1);
        return (
            <div className="flex flex-col gap-8">
              
                    <PaginationDot page={page} total={5} size="md" onPageChange={setPage} />
               
                    <PaginationDot page={page} total={5} size="lg" framed onPageChange={setPage} />
            </div>
               
        );
    },
};

// Pagination Line
export const PaginationLineStory: Story = {
    render: () => {
        const [currentPage, setCurrentPage] = useState(1);
        return (
            <div className="flex flex-col gap-8">
              
                    <PaginationLine className="w-36" total={3} size="md" page={currentPage} onPageChange={setCurrentPage} />
                    <PaginationLine className="w-38" total={3} size="lg" page={currentPage} onPageChange={setCurrentPage} />
            </div>
     );
    },
};

