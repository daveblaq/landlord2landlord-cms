import type { Meta, StoryObj } from "@storybook/react";
import { FileTrigger } from "./file-upload-trigger";
import { Button } from "../buttons/button";

const meta: Meta<typeof FileTrigger> = {
    title: "Base/FileUploadTrigger",
    component: FileTrigger,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        allowsMultiple: {
            control: "boolean",
        },
        acceptDirectory: {
            control: "boolean",
        },
    },
};

export default meta;
type Story = StoryObj<typeof FileTrigger>;

export const Default: Story = {
    args: {
        onSelect: (files) => {
            console.log("Selected files:", files);
            alert(`Selected ${files?.length || 0} file(s)`);
        },
    },
    render: (args) => (
        <FileTrigger {...args}>
            <Button>Upload File</Button>
        </FileTrigger>
    ),
};

export const MultipleFiles: Story = {
    args: {
        allowsMultiple: true,
        onSelect: (files) => {
            console.log("Selected files:", files);
            alert(`Selected ${files?.length || 0} file(s)`);
        },
    },
    render: (args) => (
        <FileTrigger {...args}>
            <Button>Upload Files</Button>
        </FileTrigger>
    ),
};

export const ImageOnly: Story = {
    args: {
        acceptedFileTypes: ["image/*"],
        onSelect: (files) => {
            console.log("Selected images:", files);
            alert(`Selected ${files?.length || 0} image(s)`);
        },
    },
    render: (args) => (
        <FileTrigger {...args}>
            <Button>Upload Image</Button>
        </FileTrigger>
    ),
};

export const PDFOnly: Story = {
    args: {
        acceptedFileTypes: [".pdf"],
        onSelect: (files) => {
            console.log("Selected PDFs:", files);
            alert(`Selected ${files?.length || 0} PDF(s)`);
        },
    },
    render: (args) => (
        <FileTrigger {...args}>
            <Button>Upload PDF</Button>
        </FileTrigger>
    ),
};

export const Directory: Story = {
    args: {
        acceptDirectory: true,
        onSelect: (files) => {
            console.log("Selected directory:", files);
            alert(`Selected directory with ${files?.length || 0} file(s)`);
        },
    },
    render: (args) => (
        <FileTrigger {...args}>
            <Button>Select Directory</Button>
        </FileTrigger>
    ),
};

