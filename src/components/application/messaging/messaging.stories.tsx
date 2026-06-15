import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
    Attachment01,
    ChevronDown,
    FaceSmile,
    ItalicSquare,
    Microphone02,
    Recording02,
    Send01,
} from "@untitledui/icons";
import { Avatar } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { InputBase } from "@/components/base/input/input";
import { TextAreaBase } from "@/components/base/textarea/textarea";
import { cx } from "@/utils/cx";
import { type Message, MessageItem, MessageStatus } from "./messaging";

const meta = {
    title: "Application/Messaging",
    component: MessageItem,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component: "Messaging components for displaying chat messages with various content types, statuses, reactions, and actions.",
            },
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof MessageItem>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample messages for different variants
const simpleMessage: Message = {
    id: "1",
    text: "Hey, how are you doing today?",
    sentAt: "10:30 AM",
    status: "read",
    readAt: "10:31 AM",
    user: {
        name: "Sarah Chen",
        avatarUrl: "https://i.pravatar.cc/150?img=1",
        status: "online",
        me: false,
    },
};

const messageWithReactions: Message = {
    id: "2",
    text: "Great work on the project! 🎉",
    sentAt: "10:32 AM",
    status: "read",
    user: {
        name: "Sarah Chen",
        avatarUrl: "https://i.pravatar.cc/150?img=1",
        status: "online",
        me: false,
    },
    reactions: [
        { content: "👍", count: 3 },
        { content: "❤️", count: 2 },
        { content: "🎉", count: 1 },
    ],
};

const messageWithReply: Message = {
    id: "3",
    text: "Thanks! Really appreciate your feedback.",
    sentAt: "10:35 AM",
    status: "read",
    user: {
        name: "You",
        me: true,
    },
    reply: {
        text: "Great work on the project! 🎉",
    },
};

const messageWithAttachment: Message = {
    id: "4",
    sentAt: "10:40 AM",
    status: "sent",
    user: {
        name: "Sarah Chen",
        avatarUrl: "https://i.pravatar.cc/150?img=1",
        status: "online",
        me: false,
    },
    attachment: {
        name: "project-proposal.pdf",
        size: "2.4 MB",
        type: "pdf",
    },
};

const messageWithAudio: Message = {
    id: "5",
    sentAt: "10:42 AM",
    status: "read",
    user: {
        name: "Sarah Chen",
        avatarUrl: "https://i.pravatar.cc/150?img=1",
        status: "online",
        me: false,
    },
    audio: {
        duration: "0:12",
    },
};

const messageWithImage: Message = {
    id: "6",
    sentAt: "10:45 AM",
    status: "read",
    user: {
        name: "Sarah Chen",
        avatarUrl: "https://i.pravatar.cc/150?img=1",
        status: "online",
        me: false,
    },
    image: {
        src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
        alt: "Mountain landscape",
        name: "landscape.jpg",
        size: "1.2 MB",
    },
};

const messageWithLinkPreview: Message = {
    id: "7",
    text: "Check out this article:",
    sentAt: "10:50 AM",
    status: "read",
    user: {
        name: "Sarah Chen",
        avatarUrl: "https://i.pravatar.cc/150?img=1",
        status: "online",
        me: false,
    },
    urlPreview: {
        title: "Understanding React Server Components",
        description: "A comprehensive guide to building modern React applications with server components.",
    },
};

const messageWithLinkMinimal: Message = {
    id: "8",
    text: "Check out this article: https://example.com/article",
    sentAt: "10:52 AM",
    status: "read",
    user: {
        name: "Sarah Chen",
        avatarUrl: "https://i.pravatar.cc/150?img=1",
        status: "online",
        me: false,
    },
};

// Message status
export const MessageStatusStory: Story = {
    args: { msg: simpleMessage, children: null },
    render: () => (
        <div className="mt-10 w-full space-y-8">
            <div className="w-full max-w-md">
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Message status</h3>
                <div className="flex items-start gap-4">
                    <MessageStatus status="sent" />
                    <MessageStatus status="read" readAt={new Date().toLocaleString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })} />
                    <MessageStatus status="failed" />
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Message status indicators showing sent, read, and failed states.",
            },
        },
    },
};

// Message action examples
export const MessageActionExamples: Story = {
    args: { msg: simpleMessage, children: null },
    render: () => (
        <form className={cx("flex h-max w-90 items-center gap-3")} onSubmit={() => {}}>
            <InputBase aria-label="Message" size="sm" placeholder="Message" name="message" />

            <Button type="submit" size="sm" color="secondary" iconLeading={Send01} />
        </form>
    ),
    parameters: {
        docs: {
            description: {
                story: "Message action buttons that appear on hover with options for AI generation, edit, reply, and copy.",
            },
        },
        docsOnly: true,
    },
};

// Message action minimal
export const MessageActionMinimal: Story = {
    args: { msg: simpleMessage, children: null },
    render: () => (
        <div className="mt-10 w-full space-y-8">
            <div className="w-full max-w-md">
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Message action minimal</h3>
                <form className={cx("flex h-max w-90 items-center gap-3")} onSubmit={() => {}}>
                    <InputBase aria-label="Message" size="sm" placeholder="Message" name="message" />

                    <Button type="submit" size="sm" color="secondary" iconLeading={Send01} />
                </form>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Minimal message actions with only reply and copy options.",
            },
        },
    },
};

// Message action textarea
export const MessageActionTextarea: Story = {
    args: { msg: simpleMessage, children: null },
    render: () => (
        <div className="mt-10 w-full space-y-8">
            <div className="w-full max-w-md">
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Message action textarea</h3>
                <form className={cx("relative flex h-max items-center gap-3")} onSubmit={() => {}}>
                    <TextAreaBase aria-label="Message" placeholder="Message" name="message" className={cx("h-32 w-full resize-none")} />

                    <ButtonUtility icon={Recording02} size="xs" color="tertiary" className="absolute top-2 right-2" />

                    <div className="absolute right-3.5 bottom-2 flex items-center gap-2">
                        <div className="flex items-center gap-0.5">
                            <ButtonUtility icon={Attachment01} size="xs" color="tertiary" />
                            <ButtonUtility icon={FaceSmile} size="xs" color="tertiary" />
                        </div>

                        <Button size="sm" color="link-color">
                            Send
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Message input with textarea and action buttons for emoji and attachments.",
            },
        },
    },
};

// Message action advanced
export const MessageActionAdvanced: Story = {
    args: { msg: simpleMessage, children: null },
    render: () => (
        <div className="mt-10 w-full space-y-8">
            <div className="w-full max-w-md">
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Message action advanced</h3>
                <form className={cx("relative flex h-max flex-col rounded-xl bg-secondary ring-1 ring-secondary ring-inset")} onSubmit={() => {}}>
                    <div className="relative flex">
                        <TextAreaBase aria-label="Message" placeholder="Ask me anything..." name="message" className={cx("h-32 w-full resize-y rounded-xl")} />
                        <ButtonUtility icon={Microphone02} size="xs" color="tertiary" className="absolute top-2 right-2" />
                    </div>

                    <div className="flex w-full items-center justify-between gap-3 px-3 py-2">
                        <div className="flex cursor-pointer items-center gap-1">
                            <Avatar size="xs" alt="Olivia Rhye" src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80" className="size-4" />
                            <div className="flex items-center gap-0.5">
                                <p className="truncate text-xs font-semibold text-tertiary">Olivia </p>
                                <ChevronDown className="size-3 stroke-3 text-fg-quaternary" />
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Button size="sm" color="link-gray" iconLeading={<ItalicSquare data-icon className="size-4!" />} className="text-xs font-semibold">
                                Shortcuts
                            </Button>
                            <Button size="sm" color="link-gray" iconLeading={<Attachment01 data-icon className="size-4!" />} className="text-xs font-semibold">
                                Attach
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Advanced message input with textarea, multiple action buttons, and send/cancel controls.",
            },
        },
    },
};

// Message examples
export const MessageExamples: Story = {
    args: { msg: simpleMessage, children: null },
    render: () => (
        <div className="mt-10 w-full space-y-8">
            <div className="w-full max-w-2xl">
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Message examples</h3>
                <ul className="space-y-4">
                    <MessageItem msg={simpleMessage} />
                    <MessageItem
                        msg={{
                            ...simpleMessage,
                            id: "9",
                            text: "Sure, let's schedule a meeting for next week.",
                            user: { name: "You", me: true },
                        }}
                    />
                </ul>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Various message examples showing different message types and layouts.",
            },
        },
        docsOnly: true,
    },
};

// Message simple
export const MessageSimple: Story = {
    args: { msg: simpleMessage, children: null },
    render: () => (
        <div className="mt-10 w-full space-y-8">
            <div className="w-full max-w-md">
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Message simple</h3>
                <ol aria-label="Conversation" className="flex max-w-90 flex-col gap-4">
                    <MessageItem
                        msg={{
                            id: "message-001",
                            sentAt: "Friday 2:20pm",
                            text: "Hey Olivia, can you please review the latest design when you can?",
                            user: {
                                name: "Phonenix Baker",
                                avatarUrl: "https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80",
                                status: "online",
                            },
                        }}
                    />
                </ol>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Simple text message with user avatar, name, timestamp, and status.",
            },
        },
    },
};

// Message reactions
export const MessageReactions: Story = {
    args: { msg: messageWithReactions, children: null },
    render: () => (
        <div className="mt-10 w-full space-y-8">
            <div className="w-full max-w-md">
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Message reactions</h3>
                <ol aria-label="Conversation" className="flex max-w-90 flex-col gap-4">
                    <MessageItem
                        msg={{
                            id: "message-003",
                            sentAt: "Friday 2:20pm",
                            text: "Hey Olivia, can you please review the latest design when you can?",
                            user: {
                                name: "Phonenix Baker",
                                avatarUrl: "https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80",
                                status: "online",
                            },
                            reactions: [
                                {
                                    content: "❤️",
                                    count: 1,
                                },
                                {
                                    content: "👌",
                                    count: 2,
                                },
                            ],
                        }}
                    />
                </ol>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Message with reaction emojis displayed below the message bubble.",
            },
        },
    },
};

// Message reply
export const MessageReply: Story = {
    args: { msg: messageWithReply, children: null },
    render: () => (
        <div className="mt-10 w-full space-y-8">
            <div className="w-full max-w-md">
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Message reply</h3>
                <ol aria-label="Conversation" className="flex max-w-90 flex-col gap-4">
                    <MessageItem
                        msg={{
                            id: "message-002",
                            sentAt: "Friday 2:20pm",
                            text: "Awesome, thanks!",
                            user: {
                                name: "Phonenix Baker",
                                avatarUrl: "https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80",
                                status: "online",
                            },
                            reply: {
                                text: "Sure thing, I'll have a look today.",
                            },
                        }}
                    />
                </ol>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Message with a reply preview showing the original message being replied to.",
            },
        },
    },
};

// Message attachment
export const MessageAttachment: Story = {
    args: { msg: messageWithAttachment, children: null },
    render: () => (
        <div className="mt-10 w-full space-y-8">
            <div className="w-full max-w-md">
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Message attachment</h3>
                <ol aria-label="Conversation" className="flex max-w-90 flex-col gap-4">
                    <MessageItem
                        msg={{
                            id: "message-004",
                            sentAt: "Friday 2:20pm",
                            user: {
                                name: "Phonenix Baker",
                                avatarUrl: "https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80",
                                status: "online",
                            },
                            attachment: {
                                type: "jpg",
                                name: "Latest design screenshot.jpg",
                                size: "1.2 MB",
                            },
                        }}
                    />
                </ol>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Message with file attachment showing file icon, name, and size.",
            },
        },
    },
};

// Message audio
export const MessageAudio: Story = {
    args: { msg: messageWithAudio, children: null },
    render: () => (
        <div className="mt-10 w-full space-y-8">
            <div className="w-full max-w-md">
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Message audio</h3>
                <ol aria-label="Conversation" className="flex max-w-90 flex-col gap-4">
                    <MessageItem
                        msg={{
                            id: "message-008",
                            sentAt: "Friday 2:20pm",
                            user: {
                                name: "Phonenix Baker",
                                avatarUrl: "https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80",
                                status: "online",
                            },
                            audio: {
                                duration: "00:28",
                            },
                        }}
                    />
                </ol>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Audio message with waveform visualization and play button.",
            },
        },
    },
};

// Message image
export const MessageImage: Story = {
    args: { msg: messageWithImage, children: null },
    render: () => (
        <div className="mt-10 w-full space-y-8">
            <div className="w-full max-w-md">
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Message image</h3>
                <ol aria-label="Conversation" className="flex max-w-90 flex-col gap-4">
                    <MessageItem
                        msg={{
                            id: "message-006",
                            sentAt: "Friday 2:20pm",
                            user: {
                                name: "Phonenix Baker",
                                avatarUrl: "https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80",
                                status: "online",
                            },
                            image: {
                                src: "https://www.untitledui.com/application/sythesize.webp",
                                alt: "Latest design screenshot",
                                name: "Latest design screenshot.jpg",
                                size: "128 KB",
                            },
                        }}
                    />
                </ol>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Message with image attachment displaying the image with caption.",
            },
        },
    },
};

// Message link preview
export const MessageLinkPreview: Story = {
    args: { msg: messageWithLinkPreview, children: null },
    render: () => (
        <div className="mt-10 w-full space-y-8">
            <div className="w-full max-w-md">
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Message link preview</h3>
                <ol aria-label="Conversation" className="flex max-w-90 flex-col gap-4">
                    <MessageItem
                        msg={{
                            id: "message-005",
                            sentAt: "Friday 2:20pm",
                            text: (
                                <a href="https://www.untitledui.com" target="_blank" rel="noopener noreferrer">
                                    https://www.untitledui.com
                                </a>
                            ),
                            user: {
                                name: "Phonenix Baker",
                                avatarUrl: "https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80",
                                status: "online",
                            },
                            image: {
                                src: "https://www.untitledui.com/application/sythesize.webp",
                                alt: "Untitled UI link preview",
                                name: "Untitled UI link preview",
                                size: "1.2 MB",
                            },
                        }}
                    />
                </ol>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Message with URL preview card showing title and description.",
            },
        },
    },
};

// Message link minimal
export const MessageLinkMinimal: Story = {
    args: { msg: messageWithLinkMinimal, children: null },
    render: () => (
        <div className="mt-10 w-full space-y-8">
            <div className="w-full max-w-md">
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Message link minimal</h3>
                <ol aria-label="Conversation" className="flex max-w-90 flex-col gap-4">
                    <MessageItem
                        msg={{
                            id: "message-007",
                            sentAt: "Friday 2:20pm",
                            text: (
                                <a href="https://www.untitledui.com" target="_blank" rel="noopener noreferrer">
                                    https://www.untitledui.com
                                </a>
                            ),
                            user: {
                                name: "Phonenix Baker",
                                avatarUrl: "https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80",
                                status: "online",
                            },
                            urlPreview: {
                                title: "Untitled UI — Figma UI Kit and Design System",
                                description:
                                    "Untitled UI is the largest UI kit and design system for Figma in the world. Kickstart any project, save thousands of hours, and level up as a designer.",
                            },
                        }}
                    />
                </ol>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Message with a minimal URL link without preview card.",
            },
        },
    },
};

// Message writing
export const MessageWriting: Story = {
    args: { msg: simpleMessage, children: null },
    render: () => {
        const [message, setMessage] = useState("");

        return (
            <div className="mt-10 w-full space-y-8">
                <div className="w-full max-w-md">
                    <h3 className="mb-4 text-lg font-semibold text-text-primary">Message writing</h3>
                    <ol aria-label="Conversation" className="flex max-w-90 flex-col gap-4">
                        <MessageItem
                            msg={{
                                id: "message-010",
                                typing: true,
                                user: {
                                    name: "Phonenix Baker",
                                    avatarUrl: "https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80",
                                    status: "online",
                                },
                            }}
                        />
                    </ol>
                </div>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Message writing interface with textarea, emoji and attachment buttons, and send button.",
            },
        },
    },
};
