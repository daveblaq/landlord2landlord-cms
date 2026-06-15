import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextEditor } from "./text-editor";

const meta = {
    title: "Components/Text Editor",
    component: TextEditor.Root,
    parameters: {
        layout: "padded",
        docs: {
            description: {
                component:
                    "A rich text editor component built with Tiptap. Supports formatting, links, images, lists, text alignment, and more. Includes a toolbar with simple and advanced modes, character counting, and full keyboard shortcuts support.",
            },
        },
    },
    tags: ["autodocs"],
    argTypes: {
        placeholder: {
            control: "text",
            description: "Placeholder text shown when editor is empty",
        },
        isDisabled: {
            control: "boolean",
            description: "Disables the editor",
        },
        isInvalid: {
            control: "boolean",
            description: "Shows invalid state styling",
        },
        limit: {
            control: "number",
            description: "Character limit (shows countdown)",
        },
        className: {
            control: "text",
            description: "Additional CSS classes for the root container",
        },
        inputClassName: {
            control: "text",
            description: "Additional CSS classes for the editor input area",
        },
    },
} satisfies Meta<typeof TextEditor.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

// Text Editor Example - Main docs content
export const TextEditorExample: Story = {
    render: () => (
        <div className="mt-10 space-y-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Text Editor Variants</h3>
                <div className="mb-7 max-w-lg space-y-2">
                    <p className="text-sm text-text-secondary">
                        A comprehensive rich text editor with formatting toolbar, character counting, and full keyboard shortcuts support.
                        Built with Tiptap and styled with Tailwind CSS.
                    </p>
                </div>
                <div className="space-y-6">
                    <div>
                        <h4 className="mb-2 text-sm font-semibold text-text-secondary">Simple Toolbar</h4>
                        <TextEditor.Root>
                            <TextEditor.Label>Description</TextEditor.Label>
                            <TextEditor.Toolbar type="simple" />
                            <TextEditor.Content />
                            <TextEditor.HintText />
                        </TextEditor.Root>
                    </div>
                    <div>
                        <h4 className="mb-2 text-sm font-semibold text-text-secondary">Advanced Toolbar</h4>
                        <TextEditor.Root>
                            <TextEditor.Label>Content</TextEditor.Label>
                            <TextEditor.Toolbar type="advanced" />
                            <TextEditor.Content />
                            <TextEditor.HintText />
                        </TextEditor.Root>
                    </div>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Comprehensive examples of text editor with simple and advanced toolbars.",
            },
        },
        docsOnly: true,
    },
};

// Basic Examples
export const Simple: Story = {
    render: () => (
        <div className="max-w-2xl">
            <TextEditor.Root>
                <TextEditor.Label>Description</TextEditor.Label>
                <TextEditor.Toolbar type="simple" />
                <TextEditor.Content />
                <TextEditor.HintText />
            </TextEditor.Root>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Basic text editor with simple toolbar containing essential formatting options (bold, italic, underline, lists, links).",
            },
        },
    },
};

export const Advanced: Story = {
    render: () => (
        <div className="max-w-2xl">
            <TextEditor.Root>
                <TextEditor.Label>Content</TextEditor.Label>
                <TextEditor.Toolbar type="advanced" />
                <TextEditor.Content />
                <TextEditor.HintText />
            </TextEditor.Root>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Text editor with advanced toolbar including font family, font size, text color, alignment, and more formatting options.",
            },
        },
    },
};

// With Placeholder
export const WithPlaceholder: Story = {
    render: () => (
        <div className="max-w-2xl">
            <TextEditor.Root placeholder="Start typing your content here...">
                <TextEditor.Label>Article Content</TextEditor.Label>
                <TextEditor.Toolbar type="simple" />
                <TextEditor.Content />
                <TextEditor.HintText />
            </TextEditor.Root>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Text editor with custom placeholder text.",
            },
        },
    },
};

// With Character Limit
export const WithCharacterLimit: Story = {
    render: () => (
        <div className="max-w-2xl">
            <TextEditor.Root limit={500}>
                <TextEditor.Label>Bio (500 characters max)</TextEditor.Label>
                <TextEditor.Toolbar type="simple" />
                <TextEditor.Content />
                <TextEditor.HintText />
            </TextEditor.Root>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Text editor with character limit. The hint text shows remaining characters and turns red when the limit is exceeded.",
            },
        },
    },
};

// Disabled State
export const Disabled: Story = {
    render: () => (
        <div className="max-w-2xl">
            <TextEditor.Root isDisabled>
                <TextEditor.Label>Read-only Content</TextEditor.Label>
                <TextEditor.Toolbar type="simple" />
                <TextEditor.Content />
                <TextEditor.HintText />
            </TextEditor.Root>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Disabled text editor that cannot be edited. The toolbar is also disabled.",
            },
        },
    },
};

// Invalid State
export const Invalid: Story = {
    render: () => (
        <div className="max-w-2xl">
            <TextEditor.Root isInvalid limit={100}>
                <TextEditor.Label>Required Field</TextEditor.Label>
                <TextEditor.Toolbar type="simple" />
                <TextEditor.Content />
                <TextEditor.HintText>This field is required and must be less than 100 characters.</TextEditor.HintText>
            </TextEditor.Root>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Text editor in invalid state with error styling and custom hint text.",
            },
        },
    },
};

// Without Toolbar
export const WithoutToolbar: Story = {
    render: () => (
        <div className="max-w-2xl">
            <TextEditor.Root>
                <TextEditor.Label>Notes</TextEditor.Label>
                <TextEditor.Content />
                <TextEditor.HintText />
            </TextEditor.Root>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Text editor without toolbar. Users can still use keyboard shortcuts for formatting (⌘B for bold, ⌘I for italic, etc.).",
            },
        },
    },
};

// Without Label
export const WithoutLabel: Story = {
    render: () => (
        <div className="max-w-2xl">
            <TextEditor.Root>
                <TextEditor.Toolbar type="simple" />
                <TextEditor.Content />
                <TextEditor.HintText />
            </TextEditor.Root>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Text editor without a label. Useful for inline editing or when the label is provided elsewhere.",
            },
        },
    },
};

// Custom Hint Text
export const CustomHintText: Story = {
    render: () => (
        <div className="max-w-2xl">
            <TextEditor.Root limit={200}>
                <TextEditor.Label>Message</TextEditor.Label>
                <TextEditor.Toolbar type="simple" />
                <TextEditor.Content />
                <TextEditor.HintText>Keep your message concise and clear.</TextEditor.HintText>
            </TextEditor.Root>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Text editor with custom hint text. When a limit is set, it will show both the custom text and character count.",
            },
        },
    },
};

// Floating Toolbar
export const FloatingToolbar: Story = {
    render: () => (
        <div className="max-w-2xl">
            <TextEditor.Root>
                <TextEditor.Label>Document</TextEditor.Label>
                <TextEditor.Toolbar type="simple" floating />
                <TextEditor.Content />
                <TextEditor.HintText />
            </TextEditor.Root>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Text editor with floating toolbar that has a shadow and background for better visibility.",
            },
        },
    },
};

// Pre-filled Content
export const PreFilledContent: Story = {
    render: () => {
        const [editorContent, setEditorContent] = React.useState(
            '<p>This is a <strong>pre-filled</strong> text editor with some <em>formatted</em> content.</p><ul><li>List item 1</li><li>List item 2</li></ul>',
        );

        return (
            <div className="max-w-2xl">
                <TextEditor.Root
                    content={editorContent}
                    onUpdate={({ editor }) => {
                        setEditorContent(editor.getHTML());
                    }}
                >
                    <TextEditor.Label>Content</TextEditor.Label>
                    <TextEditor.Toolbar type="advanced" />
                    <TextEditor.Content />
                    <TextEditor.HintText />
                </TextEditor.Root>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Text editor with pre-filled content. The content prop allows you to set initial HTML content.",
            },
        },
    },
};

// Keyboard Shortcuts Info
export const KeyboardShortcuts: Story = {
    render: () => (
        <div className="mt-10 space-y-6">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Keyboard Shortcuts</h3>
                <div className="mb-7 max-w-lg space-y-2">
                    <p className="text-sm text-text-secondary">
                        The text editor supports various keyboard shortcuts for formatting and navigation:
                    </p>
                </div>
                <div className="max-w-2xl">
                    <TextEditor.Root>
                        <TextEditor.Label>Try the shortcuts below</TextEditor.Label>
                        <TextEditor.Toolbar type="simple" />
                        <TextEditor.Content />
                        <TextEditor.HintText />
                    </TextEditor.Root>
                </div>
                <div className="mt-6 space-y-2 text-sm text-text-secondary">
                    <p>
                        <strong className="text-text-primary">⌘B / Ctrl+B:</strong> Bold
                    </p>
                    <p>
                        <strong className="text-text-primary">⌘I / Ctrl+I:</strong> Italic
                    </p>
                    <p>
                        <strong className="text-text-primary">⌘U / Ctrl+U:</strong> Underline
                    </p>
                    <p>
                        <strong className="text-text-primary">⌘K / Ctrl+K:</strong> Add/Edit link
                    </p>
                    <p>
                        <strong className="text-text-primary">⌘Z / Ctrl+Z:</strong> Undo
                    </p>
                    <p>
                        <strong className="text-text-primary">⌘Shift+Z / Ctrl+Shift+Z:</strong> Redo
                    </p>
                    <p>
                        <strong className="text-text-primary">⌘Shift+8 / Ctrl+Shift+8:</strong> Bullet list
                    </p>
                    <p>
                        <strong className="text-text-primary">⌘Shift+7 / Ctrl+Shift+7:</strong> Ordered list
                    </p>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Interactive text editor demonstrating keyboard shortcuts. Try the shortcuts listed below while editing.",
            },
        },
        docsOnly: true,
    },
};
