import React, { useEffect, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@/components/base/buttons/button";
import { AIAssistantIntroMenu as AIAssistantIntroMenuComponent } from "./ai-assistant-intro-menu";
import { AIAssistantMessageMenu as AIAssistantMessageMenuComponent } from "./ai-assistant-message-menu";
import { CalendarEventMenu as CalendarEventMenuComponent } from "./calendar-event-menu";
import { FileUploadMenu as FileUploadMenuComponent } from "./file-upload-menu";
import { FiltersMenu as FiltersMenuComponent } from "./filters-menu";
import { LabelsMenu as LabelsMenuComponent } from "./labels-menu";
import { MessageChatMenu as MessageChatMenuComponent } from "./message-chat-menu";
import { MessagesMenu as MessagesMenuComponent } from "./messages-menu";
import { NotificationSettingsButtonMenu as NotificationSettingsButtonMenuComponent } from "./notification-settings-button-menu";
import { NotificationSettingsCheckboxMenu as NotificationSettingsCheckboxMenuComponent } from "./notification-settings-checkbox-menu";
import { NotificationsMenu as NotificationsMenuComponent } from "./notifications-menu";
import { OrderSummaryMenu as OrderSummaryMenuComponent } from "./order-summary-menu";
import { PaymentDetailsMenu as PaymentDetailsMenuComponent } from "./payment-details-menu";
import { PaymentMethodMenu as PaymentMethodMenuComponent } from "./payment-method-menu";
import { PlaceholderMenu as PlaceholderMenuComponent } from "./placeholder-menu";
import { PlanMenu as PlanMenuComponent } from "./plan-menu";
import { ProjectDetailsMenu as ProjectDetailsMenuComponent } from "./project-details-menu";
import { SlideoutMenu } from "./slideout-menu";
import { TeamMembersMenu as TeamMembersMenuComponent } from "./team-members-menu";
import { UserProfileMenu as UserProfileMenuComponent } from "./user-profile-menu";
import { UserSettingsMenu as UserSettingsMenuComponent } from "./user-settings-menu";


/**
 * This is a utility hook that automatically reopens the modal after
 * it's closed. It's used only for demo purposes and can be safely
 * removed and replaced with a regular `useState` hook.
 */
const useModalState = (defaultValue: boolean = true) => {
    const [isOpen, setIsOpen] = useState(defaultValue);

    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setIsOpen(true);
            }, 700);
        }
    }, [isOpen]);

    return [isOpen, setIsOpen] as const;
};

const meta = {
    title: "Application/Slideout Menus",
    component: SlideoutMenu,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component: "Slideout menu components for displaying contextual menus and panels that slide in from the right side of the screen.",
            },
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof SlideoutMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

// Slideout menus examples
export const SlideoutMenusExamples: Story = {
    args: { children: null },
    render: () => <UserSettingsMenuComponent />,
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                story: "Various slideout menu examples showing different content types and layouts.",
            },
        },
    },
};




// Placeholder menu
export const PlaceholderMenu: Story = {
    args: { children: null },
    render: () => <PlaceholderMenuComponent />,
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                story: "Basic placeholder slideout menu with minimal content.",
            },
        },
    },
};

// User profile menu
export const UserProfileMenu: Story = {
    args: { children: null },
    render: () => <UserProfileMenuComponent />,
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                story: "User profile slideout menu with avatar, name, email, and action buttons.",
            },
        },
    },
};

// Messages menu
export const MessagesMenu: Story = {
    args: { children: null },
    render: () => <MessagesMenuComponent />,
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                story: "Messages slideout menu displaying a list of conversations with avatars and unread indicators.",
            },
        },
    },
};

// Message chat menu
export const MessageChatMenu: Story = {
    args: { children: null },
    render: () => <MessageChatMenuComponent />,
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                story: "Message chat slideout menu with conversation history and message input.",
            },
        },
    },
};

// Payment method menu
export const PaymentMethodMenu: Story = {
    args: { children: null },
    render: () => <PaymentMethodMenuComponent />,
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                story: "Payment method slideout menu with card selection and add new card option.",
            },
        },
    },
};

// Payment details menu
export const PaymentDetailsMenu: Story = {
    args: { children: null },
    render: () => <PaymentDetailsMenuComponent />,
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                story: "Payment details slideout menu with form fields for card information.",
            },
        },
    },
};

// Plan menu
export const PlanMenu: Story = {
    args: { children: null },
    render: () => <PlanMenuComponent />,
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                story: "Plan selection slideout menu with pricing options and features.",
            },
        },
    },
};

// Team members menu
export const TeamMembersMenu: Story = {
    args: { children: null },
    render: () => <TeamMembersMenuComponent />,
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                story: "Team members slideout menu displaying team list with avatars, roles, and status.",
            },
        },
    },
};

// Filters menu
export const FiltersMenu: Story = {
    args: { children: null },
    render: () => <FiltersMenuComponent />,
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                story: "Filters slideout menu with checkboxes and select dropdowns for filtering options.",
            },
        },
    },
};

// File upload menu
export const FileUploadMenu: Story = {
    args: { children: null },
    render: () => <FileUploadMenuComponent />,
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                story: "File upload slideout menu with drag and drop file upload area.",
            },
        },
    },
};

// Labels menu
export const LabelsMenu: Story = {
    args: { children: null },
    render: () => <LabelsMenuComponent />,
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                story: "Labels slideout menu with checkboxes for selecting labels with colored badges.",
            },
        },
    },
};

// Project details menu
export const ProjectDetailsMenu: Story = {
    args: { children: null },
    render: () => <ProjectDetailsMenuComponent />,
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                story: "Project details slideout menu with form fields for editing project information.",
            },
        },
    },
};

// Notification settings checkbox menu
export const NotificationSettingsCheckboxMenu: Story = {
    args: { children: null },
    render: () => <NotificationSettingsCheckboxMenuComponent />,
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                story: "Notification settings slideout menu with checkboxes for different notification types.",
            },
        },
    },
};

// Notification settings button menu
export const NotificationSettingsButtonMenu: Story = {
    args: { children: null },
    render: () => <NotificationSettingsButtonMenuComponent />,
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                story: "Notification settings slideout menu with toggle switches for different notification types.",
            },
        },
    },
};

// Notifications menu
export const NotificationsMenu: Story = {
    args: { children: null },
    render: () => <NotificationsMenuComponent />,
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                story: "Notifications slideout menu displaying a list of notifications with unread indicators.",
            },
        },
    },
};

// Order summary menu
export const OrderSummaryMenu: Story = {
    args: { children: null },
    render: () => <OrderSummaryMenuComponent />,
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                story: "Order summary slideout menu with itemized list, subtotal, tax, and total.",
            },
        },
    },
};

// Calendar event menu
export const CalendarEventMenu: Story = {
    args: { children: null },
    render: () => <CalendarEventMenuComponent />,
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                story: "Calendar event slideout menu with form fields for creating new events.",
            },
        },
    },
};

// User settings menu
export const UserSettingsMenu: Story = {
    args: { children: null },
    render: () => <UserSettingsMenuComponent />,
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                story: "User settings slideout menu with profile information and preferences.",
            },
        },
    },
};

// AI assistant menu
export const AIAssistantMenu: Story = {
    args: { children: null },
    render: () => <AIAssistantIntroMenuComponent />,
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                story: "AI assistant slideout menu with chat interface for interacting with AI.",
            },
        },
    },
};

// AI assistant message menu
export const AIAssistantMessageMenu: Story = {
    args: { children: null },
    render: () => <AIAssistantMessageMenuComponent />,
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                story: "AI assistant message slideout menu with empty state and message input.",
            },
        },
    },
};