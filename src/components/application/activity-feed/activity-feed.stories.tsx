import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FeedItem, type FeedItemType } from "./activity-feed";

const meta = {
    title: "Application/Activity Feed",
    component: FeedItem,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component: "Activity feed components for displaying user activity timelines with various layout styles (divided, connected, spaced).",
            },
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof FeedItem>;

export default meta;
type Story = StoryObj<typeof meta>;



const feed: FeedItemType[] = [
    {
        id: "activity-001",
        unseen: true,
        date: "Just now",
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80",
            name: "Phoenix Baker",
            href: "#",
            status: "online",
        },
        attachment: {
            type: "pdf",
            name: "Tech requirements.pdf",
            size: "720 KB",
        },
        action: {
            content: "Added a file to",
            target: "Marketing site redesign",
            href: "#",
        },
    },
    {
        id: "activity-002",
        unseen: true,
        date: "2 mins ago",
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/lana-steiner?fm=webp&q=80",
            name: "Lana Steiner",
            href: "#",
            status: "offline",
        },
        action: {
            content: "Was invited to the team by",
            target: "Alina Hester",
            href: "#",
        },
    },
    {
        id: "activity-003",
        unseen: true,
        date: "2 mins ago",
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/demi-wilkinson?fm=webp&q=80",
            name: "Demi Wilkinson",
            href: "#",
            status: "online",
        },
        action: {
            content: "Was invited to the team by",
            target: "Alina Hester",
            href: "#",
        },
    },
    {
        id: "activity-004",
        unseen: true,
        date: "3 hours ago",
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/candice-wu?fm=webp&q=80",
            name: "Candice Wu",
            href: "#",
            status: "offline",
        },
        action: {
            content: "Commented in",
            target: "Marketing site redesign",
            href: "#",
        },
    },
    {
        id: "activity-005",
        date: "3 hours ago",
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/candice-wu?fm=webp&q=80",
            name: "Candice Wu",
            href: "#",
            status: "offline",
        },
        action: {
            content: "Was added to",
            target: "Marketing site redesign",
            href: "#",
        },
    },
    {
        id: "activity-006",
        date: "6 hours ago",
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/natali-craig?fm=webp&q=80",
            name: "Natali Craig",
            href: "#",
            status: "online",
        },
        action: {
            content: "Added 3 labels to the project",
            target: "Marketing site redesign",
            href: "#",
        },
        labels: [
            {
                name: "Design",
                color: "brand",
            },
            {
                name: "Product",
                color: "blue",
            },
            {
                name: "Marketing",
                color: "indigo",
            },
        ],
    },
    {
        id: "activity-007",
        date: "6 hours ago",
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/natali-craig?fm=webp&q=80",
            name: "Natali Craig",
            href: "#",
            status: "online",
        },
        action: {
            content: "Invited to the team",
            target: "Lana Steiner",
            href: "#",
        },
    },
    {
        id: "activity-008",
        date: "11 hours ago",
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/orlando-diggs?fm=webp&q=80",
            name: "Orlando Diggs",
            href: "#",
            status: "online",
        },
        action: {
            content: "Created 7 tasks in",
            target: "Marketing site redesign",
            href: "#",
        },
    },
    {
        id: "activity-009",
        date: "12 hours ago",
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/drew-cano?fm=webp&q=80",
            name: "Drew Cano",
            href: "#",
            status: "online",
        },
        attachment: {
            type: "txt",
            name: "Design brief and ideas.txt",
            size: "2.2 MB",
        },
        action: {
            content: "Added a file to",
            target: "Marketing site redesign",
            href: "#",
        },
    },
    {
        id: "activity-010",
        date: "12 hours ago",
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/drew-cano?fm=webp&q=80",
            name: "Drew Cano",
            href: "#",
            status: "online",
        },
        action: {
            content: "Created the project",
            target: "Marketing site redesign",
            href: "#",
        },
    },
    {
        id: "activity-011",
        date: "5:20pm 20 Jan 2025",
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/kate-morrison?fm=webp&q=80",
            name: "Kate Morrison",
            href: "#",
            status: "online",
        },
        action: {
            content: "Sent you a message",
        },
        message: '"We should ask Oli about this today."',
    },
    {
        id: "activity-012",
        date: "4:16pm 20 Jan 2025",
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/koray-okumus?fm=webp&q=80",
            name: "Koray Okumus",
            href: "#",
            status: "online",
        },
        attachment: {
            type: "mp4",
            name: "Prototype draft 03.mp4",
            size: "6.6 MB",
        },
        action: {
            content: "Sent you a file",
        },
    },
    {
        id: "activity-013",
        date: "4:16pm 20 Jan 2025",
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/koray-okumus?fm=webp&q=80",
            name: "Koray Okumus",
            href: "#",
            status: "online",
        },
        action: {
            content: "Sent you a message",
        },
        message: "@olivia This is starting to look really good! I'll polish it up a bit and send it.",
    },
    {
        id: "activity-014",
        date: "2 mins ago",
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/ava-wright?fm=webp&q=80",
            name: "Ava Wright",
            href: "#",
            status: "online",
        },
        action: {
            content: "Invited to the team",
            target: "Alisa Hester",
            href: "#",
        },
    },
    {
        id: "activity-015",
        unseen: true,
        date: "2 mins ago",
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/eve-leroy?fm=webp&q=80",
            name: "Eve Leroy",
            href: "#",
            status: "online",
        },
        action: {
            content: "Invited to the team",
            target: "Ava Wright",
            href: "#",
        },
    },
];
// Activity feed examples
export const ActivityFeedExamples: Story = {
    args: {
        id: "example",
        user: {
            name: "Example",
            avatarUrl: "",
            href: "#",
        },
    },
    render: () => (
        <div className="mt-10 w-full space-y-8">
            <div className="w-full max-w-2xl">
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Activity feed examples</h3>
                <ul className="flex flex-col gap-4 divide-y divide-border-secondary">
                    {feed.map((item) => (
                        <li key={item.id} className="pb-4 last-of-type:pb-0">
                            <FeedItem {...item} connector={false} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Various activity feed examples showing different activity types with actions, comments, and attachments.",
            },
        },
        docsOnly: true,
    },
};

// Activity feed divided
export const ActivityFeedDivided: Story = {
    args: {
        id: "example",
        user: {
            name: "Example",
            avatarUrl: "",
            href: "#",
        },
    },
    render: () => (
        <div className="mt-10 w-full space-y-8">
            <div className="w-full max-w-2xl">
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Activity feed divided</h3>
                <ul className="flex flex-col gap-4 divide-y divide-border-secondary">
                    {feed.map((item) => (
                        <li key={item.id} className="pb-4 last-of-type:pb-0">
                            <FeedItem {...item} connector={false} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Activity feed with dividers separating each item.",
            },
        },
    },
};

// Activity feed connected
export const ActivityFeedConnected: Story = {
    args: {
        id: "example",
        user: {
            name: "Example",
            avatarUrl: "",
            href: "#",
        },
    },
    render: () => (
        <div className="mt-10 w-full space-y-8">
            <div className="w-full max-w-2xl">
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Activity feed connected</h3>
                <ul>
                    {feed.map((item, index) => (
                        <li key={item.id}>
                            <FeedItem {...item} connector={index !== feed.length - 1} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Activity feed with connecting lines between items showing timeline continuity.",
            },
        },
    },
};

// Activity feed spaced
export const ActivityFeedSpaced: Story = {
    args: {
        id: "example",
        user: {
            name: "Example",
            avatarUrl: "",
            href: "#",
        },
    },
    render: () => (
        <div className="mt-10 w-full space-y-8">
            <div className="w-full max-w-2xl">
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Activity feed spaced</h3>
                <ul className="flex flex-col gap-8">
                    {feed.map((item) => (
                        <li key={item.id}>
                            <FeedItem {...item} connector={false} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Activity feed with increased spacing between items.",
            },
        },
    },
};

const messages: FeedItemType[] = [
    {
        id: "message-001",
        unseen: true,
        date: "Just now",
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80",
            name: "Phoenix Baker",
            href: "#",
            status: "online",
            username: "@phoenix",
        },
        message: "Looks good!",
    },
    {
        id: "message-002",
        unseen: true,
        date: "2 mins ago",
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/lana-steiner?fm=webp&q=80",
            name: "Lana Steiner",
            href: "#",
            status: "offline",
            username: "@lana",
        },
        message: "Thanks so much, happy with that.",
    },
    {
        id: "message-003",
        unseen: true,
        date: "2 mins ago",
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/demi-wilkinson?fm=webp&q=80",
            name: "Demi Wilkinson",
            href: "#",
            status: "online",
            username: "@demi",
        },
        message: "Got you a coffee",
    },
    {
        id: "message-004",
        date: "3 hours ago",
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/candice-wu?fm=webp&q=80",
            name: "Candice Wu",
            href: "#",
            status: "offline",
            username: "@candice",
        },
        message: "Great to see you again!",
    },
    {
        id: "message-005",
        date: "6 hours ago",
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/natali-craig?fm=webp&q=80",
            name: "Natali Craig",
            href: "#",
            status: "online",
            username: "@natali",
        },

        message: "We should ask Oli about this...",
    },
    {
        id: "message-006",
        date: "12 hours ago",
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/drew-cano?fm=webp&q=80",
            name: "Drew Cano",
            href: "#",
            status: "online",
            username: "@drew",
        },

        message: "Okay, see you then.",
    },
    {
        id: "message-007",
        date: "3:42pm 20 Jan 2025",
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/orlando-diggs?fm=webp&q=80",
            name: "Orlando Diggs",
            href: "#",
            status: "online",
            username: "@orlando",
        },
        attachment: {
            type: "pdf",
            name: "Datasheet_draft_02.pdf",
            size: "720 KB",
        },
    },
    {
        id: "message-008",
        date: "3:42pm 20 Jan 2025",
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/andi-lane?fm=webp&q=80",
            name: "Andi Lane",
            href: "#",
            status: "online",
            username: "@andi",
        },
        message: "We should ask Oli about this...",
    },
    {
        id: "message-009",
        date: "2:12pm 20 Jan 2025",
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/kate-morrison?fm=webp&q=80",
            name: "Kate Morrison",
            href: "#",
            status: "online",
            username: "@kate",
        },
        message: "That sounds like a good plan!",
    },
    {
        id: "message-010",
        date: "12:10pm 20 Jan 2025",
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/koray-okumus?fm=webp&q=80",
            name: "Koray Okumus",
            href: "#",
            status: "online",
            username: "@koray",
        },
        message: "Yep! That checks out.",
    },
    {
        id: "message-011",
        date: "11:38am 20 Jan 2025",
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/ava-wright?fm=webp&q=80",
            name: "Ava Wright",
            href: "#",
            status: "online",
            username: "@ava",
        },
        message: "We should ask Oli about this today.",
    },
    {
        id: "message-012",
        date: "11:30am 20 Jan 2025",
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/eve-leroy?fm=webp&q=80",
            name: "Eve Leroy",
            href: "#",
            status: "online",
            username: "@eve",
        },
        attachment: {
            type: "jpg",
            name: "Design screenshot.jpg",
            size: "720 KB",
        },
    },
    {
        id: "message-013",
        date: "10:02am 20 Jan 2025",
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/zahir-mays?fm=webp&q=80",
            name: "Zahir Mays",
            href: "#",
            status: "online",
            username: "@zahir",
        },
        message: "Thanks for helping out with that!",
    },
    {
        id: "message-014",
        date: "9:40am 20 Jan 2025",
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/joshua-wilson?fm=webp&q=80",
            name: "Joshua Wilson",
            href: "#",
            status: "online",
            username: "@joshua",
        },
        message: "Hey I've sent everything off now. All done.",
    },
    {
        id: "message-015",
        date: "9:24am 20 Jan 2025",
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/rene-wells?fm=webp&q=80",
            name: "Rene Wells",
            href: "#",
            status: "online",
            username: "@rene",
        },
        message: "Hey @olivia—just wanted to say thanks for your help on this. Really buried under!",
    },
];

// Messages divided
export const MessagesDivided: Story = {
    args: {
        id: "example",
        user: {
            name: "Example",
            avatarUrl: "",
            href: "#",
        },
    },
    render: () => (
        <div className="mt-10 w-full space-y-8">
            <div className="w-full max-w-md">
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Messages divided</h3>
                <ul className="flex flex-col gap-4 divide-y divide-border-secondary">
                    {messages.map((item) => (
                        <li key={item.id} className="pb-4 last-of-type:pb-0">
                            <FeedItem {...item} connector={false} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Messages with dividers separating each message.",
            },
        },
    },
};

// Messages connected
export const MessagesConnected: Story = {
    args: {
        id: "example",
        user: {
            name: "Example",
            avatarUrl: "",
            href: "#",
        },
    },
    render: () => (
        <div className="mt-10 w-full space-y-8">
            <div className="w-full max-w-md">
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Messages connected</h3>
                <ul>
                    {messages.map((item, index) => (
                        <li key={item.id}>
                            <FeedItem {...item} connector={index !== messages.length - 1} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Messages displayed in a connected conversation flow without dividers.",
            },
        },
    },
};

// Messages spaced
export const MessagesSpaced: Story = {
    args: {
        id: "example",
        user: {
            name: "Example",
            avatarUrl: "",
            href: "#",
        },
    },
    render: () => (
        <div className="mt-10 w-full space-y-8">
            <div className="w-full max-w-md">
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Messages spaced</h3>
                <ul className="flex flex-col gap-8">
                    {messages.map((item) => (
                        <li key={item.id}>
                            <FeedItem {...item} connector={false} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Messages with increased spacing between each message.",
            },
        },
    },
};
