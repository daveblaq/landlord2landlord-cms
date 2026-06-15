import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { CodeSnippet } from "./code-snippet";


const meta = {
    title: "Application/Code Snippet",
    component: CodeSnippet,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component: "Code snippet component with syntax highlighting and optional line numbers. Supports multiple programming languages.",
            },
        },
    },
    tags: ["autodocs"],
    argTypes: {
        code: {
            control: "text",
            description: "The code string to display",
        },
        language: {
            control: "select",
            options: ["tsx", "jsx", "js", "ts", "typescript", "javascript", "json", "html"],
            description: "Programming language for syntax highlighting",
        },
        showLineNumbers: {
            control: "boolean",
            description: "Whether to display line numbers",
        },
    },
} satisfies Meta<typeof CodeSnippet>;

export default meta;
type Story = StoryObj<typeof meta>;

const codeDefault = `// Imports
import mongoose, { Schema } from 'untitled'
 
// Collection name
export const collection = 'Design'
 
// Schema
const schema = new Schema({
  name: {
    type: String,
    required: true
  },
 
  description: {
    type: String
  }
}, {timestamps: true})
 
// Model
export default untitled.model(collection, schema, collection)`;

// Code snippet examples - Main docs content
export const CodeSnippetExamples: Story = {
    args: { code: "", language: "tsx", showLineNumbers: true },
    render: () => (
        <div className="mt-10 w-full space-y-8">
            <div className="w-full max-w-2xl">
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Code snippet examples</h3>
                <CodeSnippet code={codeDefault} language="ts" />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Code snippet components for displaying syntax-highlighted code with various configuration options.",
            },
        },
        docsOnly: true,
    },
};

// With line number
export const WithLineNumber: Story = {
    args: { code: "", language: "tsx", showLineNumbers: true },
    render: () => (
        <div className="mt-10 w-full space-y-8">
            <div className="w-full max-w-2xl">
                <h3 className="mb-4 text-lg font-semibold text-text-primary">With line number</h3>
                <CodeSnippet code={codeDefault} language="ts" showLineNumbers={true} />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Code snippet with line numbers displayed on the left side.",
            },
        },
    },
};

// Without line number
export const WithoutLineNumber: Story = {
    args: { code: "", language: "tsx", showLineNumbers: false },
    render: () => (
        <div className="mt-10 w-full space-y-8">
            <div className="w-full max-w-2xl">
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Without line number</h3>
                <CodeSnippet code={codeDefault} language="ts" showLineNumbers={false} />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Code snippet without line numbers, with padding instead.",
            },
        },
    },
};

// JSX example
export const JSXExample: Story = {
    args: { code: "", language: "jsx", showLineNumbers: true },
    render: () => {
        const jsxCode = `import { CheckCircle, DownloadCloud01, Mail01 } from "@untitledui/icons";
import { HTMLAttributes } from "react";
 
import { cx } from "@/components/utils";
import { Input } from "@/components/base/input/input";
import { Button } from "@/components/button";
 
export const InlineCTAImage = () => {
    return (
        <div className="flex w-full max-w-3xl flex-col overflow-hidden rounded-xl bg-white shadow-sm sm:flex-row">
            <div className="relative h-50 w-full sm:h-auto sm:w-60">
                <img src="https://www.untitledui.com/images/portraits/person-06" className="absolute inset-0 size-full object-cover" />
            </div>
            <div className="flex-1 rounded-r-xl border border-t-0 border-gray-200 px-4 py-5 sm:border-l-0 sm:border-t sm:p-6">
                <div className="flex flex-col">
                    <h3 className="text-lg font-semibold text-primary">We've just released a new update!</h3>
                    <p className="text-sm mt-1 text-gray-600">Check out the all new dashboard view. Pages and now load faster.</p>
                    <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                        <Button color="secondary" size="md">
                            Dismiss
                        </Button>
                        <Button size="md">Changelog</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};`;
        return (
            <div className="mt-10 w-full space-y-8">
                <div className="w-full max-w-2xl">
                    <h3 className="mb-4 text-lg font-semibold text-text-primary">JSX example</h3>
                    <CodeSnippet code={jsxCode} language="jsx" showLineNumbers={true} />
                </div>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Code snippet with JSX syntax highlighting.",
            },
        },
    },
};