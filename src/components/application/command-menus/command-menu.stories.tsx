import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FilePlus03, Folder, FolderPlus, HelpCircle, LayersTwo02, Plus, User01, UserPlus01, Users01, X, ZapFast } from "@untitledui/icons";
import { Heading as AriaHeading } from "react-aria-components";
import { useHotkeys } from "react-hotkeys-hook";
import { EmptyState as EmptyStateComponent } from "@/components/application/empty-state/empty-state";
import { AvatarProfilePhoto } from "@/components/base/avatar/avatar-profile-photo";
import { Button } from "@/components/base/buttons/button";
import { Toggle } from "@/components/base/toggle/toggle";
import { Dribbble, LinkedIn } from "@/components/foundations/social-icons";
import { cx } from "@/utils/cx";
import { CommandDropdownMenuItemProps, CommandDropdownMenuItemType } from "./base-components/command-menu-item";
import { CommandMenu } from "./command-menu";

const meta = {
    title: "Application/Command Menus",
    component: CommandMenu,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Command menu components for quick navigation and actions. Supports various item types including users (avatars), actions (icons), and integrations with stacked and non-stacked layouts.",
            },
        },
    },
    // Removed 'autodocs' tag to prevent all variants from rendering at once in docs view
    // tags: ['autodocs'],
} satisfies Meta<typeof CommandMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const recentRoutes = [
    {
        id: "item-01",
        name: "Marketing site redesign",
        description: "Project by Olivia Rhye in Notion migration",
        icon: Folder,
    },
    {
        id: "item-02",
        name: "New document",
        description: "Create a new blank document",
        icon: FilePlus03,
        shortcutKeys: ["⌘n"],
    },
    {
        id: "item-03",
        name: "Invite colleagues",
        description: "Collaborate with your team on projects",
        icon: UserPlus01,
        shortcutKeys: ["⌘i"],
    },
];

const routes = [
    {
        id: "route-01",
        name: "My profile",
        description: "View and edit your personal profile",
        icon: User01,
        shortcutKeys: ["⌘k", "p"],
    },
    {
        id: "route-02",
        name: "Team profile",
        description: "View and edit your team profile",
        icon: Users01,
        shortcutKeys: ["⌘k", "t"],
    },
    {
        id: "route-03",
        name: "Invite colleagues",
        description: "Collaborate with your team on projects",
        icon: UserPlus01,
        shortcutKeys: ["⌘i"],
    },
    {
        id: "route-04",
        name: "Create new project",
        description: "Create a new blank project",
        icon: FolderPlus,
        shortcutKeys: ["⌘n"],
    },
    {
        id: "route-05",
        name: "Support",
        description: "Our team are here to help if you get stuck",
        icon: HelpCircle,
        shortcutKeys: ["⌘h"],
    },
    {
        id: "route-06",
        name: "Changelog",
        description: "Learn about our latest releases and updates",
        icon: LayersTwo02,
        shortcutKeys: ["⌘c"],
    },
    {
        id: "route-07",
        name: "Keyboard shortcuts",
        description: "Speed up your workflow with shortcuts",
        icon: ZapFast,
        shortcutKeys: ["⌘?"],
    },
];

// Command menu examples - Main docs content
// export const CommandMenuExamples: Story = {
//   args: { children: null },
//   render: () => {
//     const CommandMenuExamplesComponent = () => {
//       const [isOpen, setIsOpen] = useState(true);

//       const recentItems: CommandDropdownMenuItemProps[] = recentRoutes.map(
//         route => ({
//           id: route.id,
//           type: 'icon',
//           label: route.name,
//           icon: route.icon,
//           size: 'sm',
//           shortcutKeys: route.shortcutKeys,
//         })
//       );

//       const items: CommandDropdownMenuItemProps[] = routes.map(route => ({
//         id: route.id,
//         type: 'icon',
//         label: route.name,
//         icon: route.icon,
//         size: 'sm',
//         shortcutKeys: route.shortcutKeys,
//       }));

//       const groups = [
//         { id: 'recent', items: recentItems },
//         { id: 'default', items },
//       ];

//       useHotkeys('meta+k', () => setIsOpen(true));

//       return (
//         <div className="mt-10 w-full space-y-8">
//           <div className="w-full">
//             <h3 className="mb-4 text-lg font-semibold text-text-primary">
//               Command menu examples
//             </h3>
//             <>
//               <Button color="secondary" onClick={() => setIsOpen(true)}>
//                 Open Command Menu (⌘K)
//               </Button>

//               <CommandMenu
//                 isOpen={isOpen}
//                 items={groups}
//                 onOpenChange={setIsOpen}
//                 onSelectionChange={keys =>
//                   console.log('You clicked item: ', keys)
//                 }
//                 emptyState={
//                   <EmptyStateComponent
//                     size="sm"
//                     className="overflow-hidden p-6 pb-10"
//                   >
//                     <EmptyStateComponent.Header>
//                       <EmptyStateComponent.FeaturedIcon color="gray" />
//                     </EmptyStateComponent.Header>

//                     <EmptyStateComponent.Content className="mb-0">
//                       <EmptyStateComponent.Title>
//                         No actions found
//                       </EmptyStateComponent.Title>
//                       <EmptyStateComponent.Description>
//                         Your search did not match any actions. <br />
//                         Please try again.
//                       </EmptyStateComponent.Description>
//                     </EmptyStateComponent.Content>
//                   </EmptyStateComponent>
//                 }
//               >
//                 <AriaHeading slot="title" className="sr-only">
//                   Actions
//                 </AriaHeading>
//                 <CommandMenu.Group>
//                   <CommandMenu.List>
//                     {group => (
//                       <CommandMenu.Section {...group}>
//                         {item => <CommandMenu.Item key={item.id} {...item} />}
//                       </CommandMenu.Section>
//                     )}
//                   </CommandMenu.List>
//                 </CommandMenu.Group>
//               </CommandMenu>
//             </>
//           </div>
//         </div>
//       );
//     };
//     return <CommandMenuExamplesComponent />;
//   },
//   parameters: {
//     docs: {
//       description: {
//         story:
//           'Comprehensive command menu components with various item types and layouts.',
//       },
//     },
//     docsOnly: true,
//   },
// };

// Users
export const Users: Story = {
    args: { children: null },
    render: () => {
        const UsersComponent = () => {
            const people = [
                {
                    id: "user-01",
                    name: "Phoenix Baker",
                    imageSrc: "https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80",
                    username: "@phoenix",
                },
                {
                    id: "user-02",
                    name: "Olivia Rhye",
                    imageSrc: "https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80",
                    username: "@olivia",
                },
                {
                    id: "user-03",
                    name: "Lana Steiner",
                    imageSrc: "https://www.untitledui.com/images/avatars/lana-steiner?fm=webp&q=80",
                    username: "@lana",
                },
                {
                    id: "user-04",
                    name: "Demi Wilkinson",
                    imageSrc: "https://www.untitledui.com/images/avatars/demi-wilkinson?fm=webp&q=80",
                    username: "@demi",
                },
                {
                    id: "user-05",
                    name: "Candice Wu",
                    imageSrc: "https://www.untitledui.com/images/avatars/candice-wu?fm=webp&q=80",
                    username: "@candice",
                },
                {
                    id: "user-06",
                    name: "Natali Craig",
                    imageSrc: "https://www.untitledui.com/images/avatars/natali-craig?fm=webp&q=80",
                    username: "@natali",
                },
                {
                    id: "user-07",
                    name: "Drew Cano",
                    imageSrc: "https://www.untitledui.com/images/avatars/drew-cano?fm=webp&q=80",
                    username: "@drew",
                },
                {
                    id: "user-08",
                    name: "Kari Rasmussen",
                    imageSrc: "https://www.untitledui.com/images/avatars/kari-rasmussen?fm=webp&q=80",
                    username: "@kari",
                },
            ];

            const [isOpen, setIsOpen] = useState(true);

            const items: CommandDropdownMenuItemProps[] = people.map((person) => ({
                id: person.id,
                type: "avatar",
                label: person.name,
                src: person.imageSrc,
                alt: person.name,
                description: person.username,
                anything: "else",
                size: "sm",
            }));

            const groups = [
                {
                    id: "recent",
                    title: "Recent",
                    items: items.slice(0, 2).map((item) => ({ ...item, id: item.id.concat("-recent") })),
                },
                { id: "all", title: "All users", items },
            ];

            useHotkeys("meta+k", () => setIsOpen(true));

            return (
                <div className="mt-10 w-full space-y-8">
                    <div className="w-full">
                        <h3 className="mb-4 text-lg font-semibold text-text-primary">Users</h3>
                        <>
                            <Button color="secondary" onClick={() => setIsOpen(true)}>
                                Open Command Menu (⌘K)
                            </Button>

                            <CommandMenu
                                items={groups}
                                isOpen={isOpen}
                                onOpenChange={setIsOpen}
                                onSelectionChange={(keys) => console.log("You clicked item: ", keys)}
                                emptyState={
                                    <EmptyStateComponent size="sm" className="overflow-hidden p-6 pb-10">
                                        <EmptyStateComponent.Header>
                                            <EmptyStateComponent.FeaturedIcon color="gray" />
                                        </EmptyStateComponent.Header>

                                        <EmptyStateComponent.Content className="mb-0">
                                            <EmptyStateComponent.Title>No users found</EmptyStateComponent.Title>
                                            <EmptyStateComponent.Description>
                                                Your search did not match any users. <br />
                                                Please try again.
                                            </EmptyStateComponent.Description>
                                        </EmptyStateComponent.Content>
                                    </EmptyStateComponent>
                                }
                            >
                                <AriaHeading slot="title" className="sr-only">
                                    Users
                                </AriaHeading>
                                <CommandMenu.Group>
                                    <CommandMenu.List className="min-h-49">
                                        {(group) => (
                                            <CommandMenu.Section {...group}>{(item) => <CommandMenu.Item key={item.id} {...item} />}</CommandMenu.Section>
                                        )}
                                    </CommandMenu.List>
                                </CommandMenu.Group>
                                <CommandMenu.Footer />
                            </CommandMenu>
                        </>
                    </div>
                </div>
            );
        };
        return <UsersComponent />;
    },
    parameters: {
        docs: {
            description: {
                story: "Command menu with user items displaying avatars.",
            },
        },
    },
};

// Users stacked
export const UsersStacked: Story = {
    args: { children: null },
    render: () => {
        const UsersStackedComponent = () => {
            const people = [
                {
                    id: "user-01",
                    name: "Phoenix Baker",
                    imageSrc: "https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80",
                    username: "@phoenix",
                },
                {
                    id: "user-02",
                    name: "Olivia Rhye",
                    imageSrc: "https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80",
                    username: "@olivia",
                },
                {
                    id: "user-03",
                    name: "Lana Steiner",
                    imageSrc: "https://www.untitledui.com/images/avatars/lana-steiner?fm=webp&q=80",
                    username: "@lana",
                },
                {
                    id: "user-04",
                    name: "Demi Wilkinson",
                    imageSrc: "https://www.untitledui.com/images/avatars/demi-wilkinson?fm=webp&q=80",
                    username: "@demi",
                },
                {
                    id: "user-05",
                    name: "Candice Wu",
                    imageSrc: "https://www.untitledui.com/images/avatars/candice-wu?fm=webp&q=80",
                    username: "@candice",
                },
                {
                    id: "user-06",
                    name: "Natali Craig",
                    imageSrc: "https://www.untitledui.com/images/avatars/natali-craig?fm=webp&q=80",
                    username: "@natali",
                },
                {
                    id: "user-07",
                    name: "Drew Cano",
                    imageSrc: "https://www.untitledui.com/images/avatars/drew-cano?fm=webp&q=80",
                    username: "@drew",
                },
                {
                    id: "user-08",
                    name: "Kari Rasmussen",
                    imageSrc: "https://www.untitledui.com/images/avatars/kari-rasmussen?fm=webp&q=80",
                    username: "@kari",
                },
            ];

            const [isOpen, setIsOpen] = useState(true);

            const items: CommandDropdownMenuItemProps[] = people.map((person) => ({
                id: person.id,
                type: "avatar",
                label: person.name,
                src: person.imageSrc,
                alt: person.name,
                description: person.username,
                size: "sm",
                stacked: true,
            }));

            const groups = [
                {
                    id: "recent",
                    title: "Recent",
                    items: items.slice(0, 3).map((item) => ({ ...item, id: item.id.concat("-recent") })),
                },
                { id: "all", title: "All users", items },
            ];

            useHotkeys("meta+k", () => setIsOpen(true));

            return (
                <div className="mt-10 w-full space-y-8">
                    <div className="w-full">
                        <h3 className="mb-4 text-lg font-semibold text-text-primary">Users stacked</h3>
                        <>
                            <Button color="secondary" onClick={() => setIsOpen(true)}>
                                Open Command Menu (⌘K)
                            </Button>

                            <CommandMenu
                                items={groups}
                                isOpen={isOpen}
                                onOpenChange={setIsOpen}
                                onSelectionChange={(keys) => console.log("You clicked item: ", keys)}
                                emptyState={
                                    <EmptyStateComponent size="sm" className="overflow-hidden p-6 pb-10">
                                        <EmptyStateComponent.Header>
                                            <EmptyStateComponent.FeaturedIcon color="gray" />
                                        </EmptyStateComponent.Header>

                                        <EmptyStateComponent.Content className="mb-0">
                                            <EmptyStateComponent.Title>No users found</EmptyStateComponent.Title>
                                            <EmptyStateComponent.Description>
                                                Your search did not match any users. <br />
                                                Please try again.
                                            </EmptyStateComponent.Description>
                                        </EmptyStateComponent.Content>
                                    </EmptyStateComponent>
                                }
                            >
                                <AriaHeading slot="title" className="sr-only">
                                    Users
                                </AriaHeading>
                                <CommandMenu.Group>
                                    <CommandMenu.List className="max-h-125.5 min-h-49">
                                        {(group) => (
                                            <CommandMenu.Section {...group}>{(item) => <CommandMenu.Item key={item.id} {...item} />}</CommandMenu.Section>
                                        )}
                                    </CommandMenu.List>
                                </CommandMenu.Group>
                                <CommandMenu.Footer />
                            </CommandMenu>
                        </>
                    </div>
                </div>
            );
        };
        return <UsersStackedComponent />;
    },
    parameters: {
        docs: {
            description: {
                story: "Command menu with user items in stacked layout (description below label).",
            },
        },
    },
};

// Actions
export const Actions: Story = {
    args: { children: null },
    render: () => {
        const ActionsComponent = () => {
            const [isOpen, setIsOpen] = useState(true);

            const recentItems: CommandDropdownMenuItemProps[] = recentRoutes.map((route) => ({
                id: route.id,
                type: "icon",
                label: route.name,
                icon: route.icon,
                size: "sm",
                shortcutKeys: route.shortcutKeys,
            }));

            const items: CommandDropdownMenuItemProps[] = routes.map((route) => ({
                id: route.id,
                type: "icon",
                label: route.name,
                icon: route.icon,
                size: "sm",
                shortcutKeys: route.shortcutKeys,
            }));

            const groups = [
                { id: "recent", items: recentItems },
                { id: "default", items },
            ];

            useHotkeys("meta+k", () => setIsOpen(true));

            return (
                <div className="mt-10 w-full space-y-8">
                    <div className="w-full">
                        <h3 className="mb-4 text-lg font-semibold text-text-primary">Actions</h3>
                        <>
                            <Button color="secondary" onClick={() => setIsOpen(true)}>
                                Open Command Menu (⌘K)
                            </Button>

                            <CommandMenu
                                isOpen={isOpen}
                                items={groups}
                                onOpenChange={setIsOpen}
                                onSelectionChange={(keys) => console.log("You clicked item: ", keys)}
                                emptyState={
                                    <EmptyStateComponent size="sm" className="overflow-hidden p-6 pb-10">
                                        <EmptyStateComponent.Header>
                                            <EmptyStateComponent.FeaturedIcon color="gray" />
                                        </EmptyStateComponent.Header>

                                        <EmptyStateComponent.Content className="mb-0">
                                            <EmptyStateComponent.Title>No actions found</EmptyStateComponent.Title>
                                            <EmptyStateComponent.Description>
                                                Your search did not match any actions. <br />
                                                Please try again.
                                            </EmptyStateComponent.Description>
                                        </EmptyStateComponent.Content>
                                    </EmptyStateComponent>
                                }
                            >
                                <AriaHeading slot="title" className="sr-only">
                                    Actions
                                </AriaHeading>
                                <CommandMenu.Group>
                                    <CommandMenu.List>
                                        {(group) => (
                                            <CommandMenu.Section {...group}>{(item) => <CommandMenu.Item key={item.id} {...item} />}</CommandMenu.Section>
                                        )}
                                    </CommandMenu.List>
                                </CommandMenu.Group>
                            </CommandMenu>
                        </>
                    </div>
                </div>
            );
        };
        return <ActionsComponent />;
    },
    parameters: {
        docs: {
            description: {
                story: "Command menu with action items displaying icons.",
            },
        },
    },
};

// Actions stacked
export const ActionsStacked: Story = {
    args: { children: null },
    render: () => {
        const ActionsStackedComponent = () => {
            const [isOpen, setIsOpen] = useState(true);

            const recentItems: CommandDropdownMenuItemProps[] = recentRoutes.map((route) => ({
                id: route.id,
                type: "icon",
                label: route.name,
                icon: route.icon,
                size: "sm",
                shortcutKeys: route.shortcutKeys,
                description: route.description,
                stacked: true,
            }));

            const items: CommandDropdownMenuItemProps[] = routes.map((route) => ({
                id: route.id,
                type: "icon",
                label: route.name,
                icon: route.icon,
                size: "sm",
                shortcutKeys: route.shortcutKeys,
                description: route.description,
                stacked: true,
            }));

            const groups = [
                { id: "recent", title: "Recent", items: recentItems },
                { id: "default", items },
            ];

            useHotkeys("meta+k", () => setIsOpen(true));

            return (
                <div className="mt-10 w-full space-y-8">
                    <div className="w-full">
                        <h3 className="mb-4 text-lg font-semibold text-text-primary">Actions stacked</h3>
                        <>
                            <Button color="secondary" onClick={() => setIsOpen(true)}>
                                Open Command Menu (⌘K)
                            </Button>

                            <CommandMenu
                                isOpen={isOpen}
                                items={groups}
                                onOpenChange={setIsOpen}
                                onSelectionChange={(key) => console.log("You clicked item: ", key.toString())}
                                emptyState={
                                    <EmptyStateComponent size="sm" className="overflow-hidden p-6 pb-10">
                                        <EmptyStateComponent.Header>
                                            <EmptyStateComponent.FeaturedIcon color="gray" />
                                        </EmptyStateComponent.Header>

                                        <EmptyStateComponent.Content className="mb-0">
                                            <EmptyStateComponent.Title>No actions found</EmptyStateComponent.Title>
                                            <EmptyStateComponent.Description>
                                                Your search did not match any actions. <br />
                                                Please try again.
                                            </EmptyStateComponent.Description>
                                        </EmptyStateComponent.Content>
                                    </EmptyStateComponent>
                                }
                            >
                                <AriaHeading slot="title" className="sr-only">
                                    Actions
                                </AriaHeading>
                                <CommandMenu.Group>
                                    <CommandMenu.List className="min-h-49">
                                        {(group) => (
                                            <CommandMenu.Section {...group}>{(item) => <CommandMenu.Item key={item.id} {...item} />}</CommandMenu.Section>
                                        )}
                                    </CommandMenu.List>
                                </CommandMenu.Group>
                            </CommandMenu>
                        </>
                    </div>
                </div>
            );
        };
        return <ActionsStackedComponent />;
    },
    parameters: {
        docs: {
            description: {
                story: "Command menu with action items in stacked layout.",
            },
        },
    },
};

// Empty state
export const EmptyState: Story = {
    args: { children: null },
    render: () => {
        const EmptyStateStoryComponent = () => {
            const [isOpen, setIsOpen] = useState(true);
            const [inputValue, setInputValue] = useState("Landing page design");

            useHotkeys("meta+k", () => setIsOpen(true));

            return (
                <div className="mt-10 w-full space-y-8">
                    <div className="w-full">
                        <h3 className="mb-4 text-lg font-semibold text-text-primary">Empty state</h3>
                        <>
                            <Button color="secondary" onClick={() => setIsOpen(true)}>
                                Open Command Menu (⌘K)
                            </Button>

                            <CommandMenu
                                isOpen={isOpen}
                                items={[]}
                                onInputChange={setInputValue}
                                onOpenChange={setIsOpen}
                                inputValue={inputValue}
                                onSelectionChange={(keys) => console.log("You clicked item: ", keys)}
                                emptyState={
                                    <EmptyStateComponent size="sm" className="overflow-hidden p-6 pb-10">
                                        <EmptyStateComponent.Header>
                                            <EmptyStateComponent.FeaturedIcon color="gray" />
                                        </EmptyStateComponent.Header>

                                        <EmptyStateComponent.Content>
                                            <EmptyStateComponent.Title>No projects found</EmptyStateComponent.Title>
                                            <EmptyStateComponent.Description>
                                                Your search &quot;{inputValue}&quot; did not match any projects. Please try again.
                                            </EmptyStateComponent.Description>
                                        </EmptyStateComponent.Content>

                                        <EmptyStateComponent.Footer>
                                            <Button size="md" color="secondary">
                                                Clear search
                                            </Button>
                                            <Button size="md" iconLeading={Plus}>
                                                New project
                                            </Button>
                                        </EmptyStateComponent.Footer>
                                    </EmptyStateComponent>
                                }
                            >
                                <AriaHeading slot="title" className="sr-only">
                                    Projects
                                </AriaHeading>
                                <CommandMenu.List className="max-h-131.5 min-h-49" />
                            </CommandMenu>
                        </>
                    </div>
                </div>
            );
        };
        return <EmptyStateStoryComponent />;
    },
    parameters: {
        docs: {
            description: {
                story: "Command menu with empty state when no results are found.",
            },
        },
    },
};

const UsersMenuPreview = ({
    title,
    description,
    size = "sm",
    imageSrc,
    className,
}: {
    title: string;
    description: string;
    imageSrc: string;
    className?: string;
    size?: "sm" | "md";
}) => {
    return (
        <div className={cx("relative flex w-90 flex-col items-center border-l border-secondary bg-primary", className)}>
            <div className="w-full px-1 pt-1">
                <div className={cx("w-full rounded-xl bg-linear-to-t from-[#FBC5EC] to-[#A5C0EE]", size === "sm" ? "h-22" : "h-28")} />
            </div>

            <div className="relative -mt-8 w-full max-w-(--breakpoint-xl) px-4">
                <div className="relative flex flex-col items-center gap-4">
                    <AvatarProfilePhoto size="sm" src={imageSrc} alt={title} verified />
                    <div className="flex w-full flex-col items-center gap-4">
                        <div className="flex flex-col items-center gap-0.5 text-center">
                            <p className="text-md font-semibold text-primary">{title}</p>
                            <p className="text-sm text-tertiary">{description}</p>
                        </div>
                        <ul className="flex gap-4">
                            {[
                                {
                                    title: "X (formerly Twitter)",
                                    href: "https://x.com/",
                                    icon: X,
                                },
                                {
                                    title: "LinkedIn",
                                    href: "https://linkedin.com/",
                                    icon: LinkedIn,
                                },
                                {
                                    title: "Dribbble",
                                    href: "https://dribbble.com/",
                                    icon: Dribbble,
                                },
                            ].map(({ title, href, icon: Icon }) => (
                                <li key={title}>
                                    <a
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex rounded-xs text-fg-quaternary outline-focus-ring transition duration-100 ease-linear hover:text-fg-quaternary_hover focus-visible:outline-2 focus-visible:outline-offset-2"
                                    >
                                        <Icon size={20} aria-label={title} />
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <div className="flex w-full justify-center gap-3 pt-2">
                            <Button color="secondary" size="sm" className="flex-1 sm:flex-none">
                                View portfolio
                            </Button>
                            <Button iconLeading={Plus} size="sm" className="flex-1 sm:flex-none">
                                Follow
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Users menu
export const UsersMenu: Story = {
    args: { children: null },
    render: () => {
        const UsersMenuComponent = () => {
            const [isOpen, setIsOpen] = useState(true);

            const people = [
                {
                    id: "user-01",
                    name: "Phoenix Baker",
                    imageSrc: "https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80",
                    username: "@phoenix",
                },
                {
                    id: "user-02",
                    name: "Olivia Rhye",
                    imageSrc: "https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80",
                    username: "@olivia",
                },
                {
                    id: "user-03",
                    name: "Lana Steiner",
                    imageSrc: "https://www.untitledui.com/images/avatars/lana-steiner?fm=webp&q=80",
                    username: "@lana",
                },
                {
                    id: "user-04",
                    name: "Demi Wilkinson",
                    imageSrc: "https://www.untitledui.com/images/avatars/demi-wilkinson?fm=webp&q=80",
                    username: "@demi",
                },
                {
                    id: "user-05",
                    name: "Candice Wu",
                    imageSrc: "https://www.untitledui.com/images/avatars/candice-wu?fm=webp&q=80",
                    username: "@candice",
                },
                {
                    id: "user-06",
                    name: "Natali Craig",
                    imageSrc: "https://www.untitledui.com/images/avatars/natali-craig?fm=webp&q=80",
                    username: "@natali",
                },
                {
                    id: "user-07",
                    name: "Drew Cano",
                    imageSrc: "https://www.untitledui.com/images/avatars/drew-cano?fm=webp&q=80",
                    username: "@drew",
                },
                {
                    id: "user-08",
                    name: "Kari Rasmussen",
                    imageSrc: "https://www.untitledui.com/images/avatars/kari-rasmussen?fm=webp&q=80",
                    username: "@kari",
                },
            ];
            const items: CommandDropdownMenuItemType[] = people.map((person) => ({
                id: person.id,
                type: "avatar",
                label: person.name,
                src: person.imageSrc,
                alt: person.name,
                description: person.username,
                size: "sm",
                anything: "else",
            }));

            const groups = [{ id: "designers", title: "Designers", items: items }];

            useHotkeys("meta+k", () => setIsOpen(true));

            return (
                <div className="mt-10 w-full space-y-8">
                    <div className="w-full">
                        <h3 className="mb-4 text-lg font-semibold text-text-primary">Users menu</h3>
                        <>
                            <Button color="secondary" onClick={() => setIsOpen(true)}>
                                Open Command Menu (⌘K)
                            </Button>

                            <CommandMenu
                                isOpen={isOpen}
                                items={groups}
                                defaultSelectedKeys={groups[0]?.items[1]?.id ? [groups[0].items[1].id] : []}
                                onOpenChange={setIsOpen}
                                onSelectionChange={(keys) => console.log("You clicked item: ", keys)}
                                emptyState={
                                    <EmptyStateComponent size="sm" className="overflow-hidden p-6 pb-10">
                                        <EmptyStateComponent.Header>
                                            <EmptyStateComponent.FeaturedIcon color="gray" />
                                        </EmptyStateComponent.Header>

                                        <EmptyStateComponent.Content className="mb-0">
                                            <EmptyStateComponent.Title>No users found</EmptyStateComponent.Title>
                                            <EmptyStateComponent.Description>
                                                Your search did not match any users. Please try again.
                                            </EmptyStateComponent.Description>
                                        </EmptyStateComponent.Content>
                                    </EmptyStateComponent>
                                }
                            >
                                <AriaHeading slot="title" className="sr-only">
                                    Users
                                </AriaHeading>
                                <CommandMenu.Group className="flex max-h-88.5">
                                    <CommandMenu.List>
                                        {(group) => (
                                            <CommandMenu.Section {...group}>{(item) => <CommandMenu.Item key={item.id} {...item} />}</CommandMenu.Section>
                                        )}
                                    </CommandMenu.List>
                                    <CommandMenu.Preview asChild>
                                        {({ selectedId }) => {
                                            const person = people.find((person) => person.id === selectedId) as (typeof people)[number];

                                            return (
                                                <UsersMenuPreview
                                                    title={person?.name}
                                                    description="I'm a Product Designer and Webflow Developer based in Melbourne, Australia."
                                                    imageSrc={person?.imageSrc}
                                                />
                                            );
                                        }}
                                    </CommandMenu.Preview>
                                </CommandMenu.Group>
                            </CommandMenu>
                        </>
                    </div>
                </div>
            );
        };
        return <UsersMenuComponent />;
    },
    parameters: {
        docs: {
            description: {
                story: "Full command menu with users section and footer.",
            },
        },
    },
};

// Users menu stacked
export const UsersMenuStacked: Story = {
    args: { children: null },
    render: () => {
        const UsersMenuStackedComponent = () => {
            const [isOpen, setIsOpen] = useState(true);

            const people = [
                {
                    id: "user-01",
                    name: "Phoenix Baker",
                    imageSrc: "https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80",
                    username: "@phoenix",
                },
                {
                    id: "user-02",
                    name: "Olivia Rhye",
                    imageSrc: "https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80",
                    username: "@olivia",
                },
                {
                    id: "user-03",
                    name: "Lana Steiner",
                    imageSrc: "https://www.untitledui.com/images/avatars/lana-steiner?fm=webp&q=80",
                    username: "@lana",
                },
                {
                    id: "user-04",
                    name: "Demi Wilkinson",
                    imageSrc: "https://www.untitledui.com/images/avatars/demi-wilkinson?fm=webp&q=80",
                    username: "@demi",
                },
                {
                    id: "user-05",
                    name: "Candice Wu",
                    imageSrc: "https://www.untitledui.com/images/avatars/candice-wu?fm=webp&q=80",
                    username: "@candice",
                },
                {
                    id: "user-06",
                    name: "Natali Craig",
                    imageSrc: "https://www.untitledui.com/images/avatars/natali-craig?fm=webp&q=80",
                    username: "@natali",
                },
                {
                    id: "user-07",
                    name: "Drew Cano",
                    imageSrc: "https://www.untitledui.com/images/avatars/drew-cano?fm=webp&q=80",
                    username: "@drew",
                },
                {
                    id: "user-08",
                    name: "Kari Rasmussen",
                    imageSrc: "https://www.untitledui.com/images/avatars/kari-rasmussen?fm=webp&q=80",
                    username: "@kari",
                },
            ];

            const items: CommandDropdownMenuItemProps[] = people.map((person) => ({
                type: "avatar",
                id: person.id,
                label: person.name,
                src: person.imageSrc,
                alt: person.name,
                description: person.username,
            }));

            const groups = [{ id: "default", items }];

            useHotkeys("meta+k", () => setIsOpen(true));

            return (
                <div className="mt-10 w-full space-y-8">
                    <div className="w-full">
                        <h3 className="mb-4 text-lg font-semibold text-text-primary">Users menu stacked</h3>
                        <CommandMenu.Trigger onOpenChange={setIsOpen} isOpen={isOpen}>
                            <Button color="secondary" onClick={() => setIsOpen(true)}>
                                Open Command Menu (⌘K)
                            </Button>

                            <CommandMenu
                                isOpen={isOpen}
                                items={groups}
                                defaultSelectedKeys={groups[0]?.items[1]?.id ? [groups[0].items[1].id] : []}
                                onOpenChange={setIsOpen}
                                onSelectionChange={(keys) => console.log("You clicked item: ", keys)}
                                emptyState={
                                    <EmptyStateComponent size="sm" className="overflow-hidden p-6 pb-10">
                                        <EmptyStateComponent.Header>
                                            <EmptyStateComponent.FeaturedIcon color="gray" />
                                        </EmptyStateComponent.Header>

                                        <EmptyStateComponent.Content className="mb-0">
                                            <EmptyStateComponent.Title>No users found</EmptyStateComponent.Title>
                                            <EmptyStateComponent.Description>
                                                Your search did not match any users. <br />
                                                Please try again.
                                            </EmptyStateComponent.Description>
                                        </EmptyStateComponent.Content>
                                    </EmptyStateComponent>
                                }
                            >
                                <AriaHeading slot="title" className="sr-only">
                                    Users
                                </AriaHeading>
                                <CommandMenu.Group className="flex max-h-92 min-h-49 overflow-y-auto">
                                    <CommandMenu.List>
                                        {(group) => (
                                            <CommandMenu.Section {...group}>
                                                {(item) => <CommandMenu.Item key={item.id} stacked size="sm" {...item} />}
                                            </CommandMenu.Section>
                                        )}
                                    </CommandMenu.List>
                                    <CommandMenu.Preview asChild>
                                        {({ selectedId }) => {
                                            const person = people.find((person) => person.id === selectedId) as (typeof people)[number];

                                            return (
                                                <UsersMenuPreview
                                                    size="md"
                                                    title={person?.name}
                                                    description="I'm a Product Designer based in Melbourne, Australia."
                                                    imageSrc={person?.imageSrc}
                                                    className="w-full md:w-100"
                                                />
                                            );
                                        }}
                                    </CommandMenu.Preview>
                                </CommandMenu.Group>
                            </CommandMenu>
                        </CommandMenu.Trigger>
                    </div>
                </div>
            );
        };
        return <UsersMenuStackedComponent />;
    },
    parameters: {
        docs: {
            description: {
                story: "Full command menu with users section in stacked layout and footer.",
            },
        },
    },
};

const IntegrationPreview = ({ title, imageSrc, description, className }: { title: string; imageSrc: string; description: string; className?: string }) => (
    <div className={cx("relative flex w-90 flex-col border-l border-secondary bg-primary px-5 py-6", className)}>
        <div className="mb-3 flex justify-between">
            <img src={imageSrc} alt={title} className="size-16" />
            <Toggle defaultSelected size="sm" className="mt-0.5" />
        </div>
        <div className="flex w-full flex-col gap-6">
            <div className="flex flex-col gap-0.5">
                <p className="text-md font-semibold text-primary">{title}</p>
                <p className="text-sm text-tertiary">{description}</p>
            </div>
            <div className="flex w-full flex-col justify-center gap-3">
                <Button size="sm">View integration</Button>
                <Button size="sm" color="secondary">
                    Learn more
                </Button>
            </div>
        </div>
    </div>
);

// Integrations menu
export const IntegrationsMenu: Story = {
    args: { children: null },
    render: () => {
        const IntegrationsMenuComponent = () => {
            const [isOpen, setIsOpen] = useState(true);

            const integrations = [
                {
                    id: "integration-01",
                    name: "GitHub",
                    website: "github.com",
                    description: "Connect your GitHub account to access your repositories",
                    imageSrc: "https://www.untitledui.com/logos/integrations/github.svg",
                },
                {
                    id: "integration-02",
                    name: "Linear",
                    website: "linear.app",
                    description: "Linear helps streamline software projects, sprints, tasks, and bug tracking.",
                    imageSrc: "https://www.untitledui.com/logos/integrations/linear.svg",
                },
                {
                    id: "integration-03",
                    name: "Figma",
                    website: "figma.com",
                    description: "Figma is a collaborative interface design tool",
                    imageSrc: "https://www.untitledui.com/logos/integrations/figma.svg",
                },
                {
                    id: "integration-04",
                    name: "Zapier",
                    website: "zapier.com",
                    description: "Connect your apps and automate workflows",
                    imageSrc: "https://www.untitledui.com/logos/integrations/zapier.svg",
                },
                {
                    id: "integration-05",
                    name: "Notion",
                    website: "notion.so",
                    description: "All-in-one workspace for notes, tasks, wikis, and databases",
                    imageSrc: "https://www.untitledui.com/logos/integrations/notion.svg",
                },
                {
                    id: "integration-06",
                    name: "Slack",
                    website: "slack.com",
                    description: "Slack is a new way to communicate with your team",
                    imageSrc: "https://www.untitledui.com/logos/integrations/slack.svg",
                },
                {
                    id: "integration-07",
                    name: "Dropbox",
                    website: "dropbox.com",
                    description: "Dropbox is a file hosting service",
                    imageSrc: "https://www.untitledui.com/logos/integrations/dropbox.svg",
                },
            ];

            const items: CommandDropdownMenuItemProps[] = integrations.map((integration) => ({
                id: integration.id,
                type: "icon",
                label: integration.name,
                icon: () => <img src={integration.imageSrc} alt={integration.name} className="mr-2 size-6" />,
                description: integration.website,
                size: "sm",
                src: integration.imageSrc,
                info: integration.description,
            }));

            const groups = [{ id: "integrations", title: "Integrations", items }];

            useHotkeys("meta+k", () => setIsOpen(true));

            return (
                <div className="mt-10 w-full space-y-8">
                    <div className="w-full">
                        <h3 className="mb-4 text-lg font-semibold text-text-primary">Integrations menu</h3>
                        <>
                            <Button color="secondary" onClick={() => setIsOpen(true)}>
                                Open Command Menu (⌘K)
                            </Button>

                            <CommandMenu
                                isOpen={isOpen}
                                items={groups}
                                defaultSelectedKeys={groups[0]?.items[1]?.id ? [groups[0].items[1].id] : []}
                                onOpenChange={setIsOpen}
                                onSelectionChange={(keys) => console.log("You clicked item: ", keys)}
                                emptyState={
                                    <EmptyStateComponent size="sm" className="overflow-hidden p-6 pb-10">
                                        <EmptyStateComponent.Header>
                                            <EmptyStateComponent.FeaturedIcon color="gray" />
                                        </EmptyStateComponent.Header>

                                        <EmptyStateComponent.Content className="mb-0">
                                            <EmptyStateComponent.Title>No integrations found</EmptyStateComponent.Title>
                                            <EmptyStateComponent.Description>
                                                Your search did not match any integrations. Please try again.
                                            </EmptyStateComponent.Description>
                                        </EmptyStateComponent.Content>
                                    </EmptyStateComponent>
                                }
                            >
                                <AriaHeading slot="title" className="sr-only">
                                    Integrations
                                </AriaHeading>
                                <CommandMenu.Group className="flex max-h-88.5">
                                    <CommandMenu.List>
                                        {(group) => (
                                            <CommandMenu.Section {...group}>{(item) => <CommandMenu.Item key={item.id} {...item} />}</CommandMenu.Section>
                                        )}
                                    </CommandMenu.List>
                                    <CommandMenu.Preview asChild>
                                        {({ selectedId }) => {
                                            const integration = integrations.find(
                                                (integration) => integration.id === selectedId,
                                            ) as (typeof integrations)[number];

                                            return (
                                                <IntegrationPreview
                                                    title={integration?.name}
                                                    description={integration?.description}
                                                    imageSrc={integration?.imageSrc}
                                                />
                                            );
                                        }}
                                    </CommandMenu.Preview>
                                </CommandMenu.Group>
                            </CommandMenu>
                        </>
                    </div>
                </div>
            );
        };
        return <IntegrationsMenuComponent />;
    },
    parameters: {
        docs: {
            description: {
                story: "Full command menu with integrations section and footer.",
            },
        },
    },
};

// Integrations menu stacked
export const IntegrationsMenuStacked: Story = {
    args: { children: null },
    render: () => {
        const IntegrationsMenuStackedComponent = () => {
            const [isOpen, setIsOpen] = useState(true);
            const integrations = [
                {
                    id: "integration-01",
                    name: "GitHub",
                    website: "github.com",
                    description: "Connect your GitHub account to access your repositories",
                    imageSrc: "https://www.untitledui.com/logos/integrations/github.svg",
                },
                {
                    id: "integration-02",
                    name: "Linear",
                    website: "linear.app",
                    description: "Linear helps streamline software projects, sprints, tasks, and bug tracking.",
                    imageSrc: "https://www.untitledui.com/logos/integrations/linear.svg",
                },
                {
                    id: "integration-03",
                    name: "Figma",
                    website: "figma.com",
                    description: "Figma is a collaborative interface design tool",
                    imageSrc: "https://www.untitledui.com/logos/integrations/figma.svg",
                },
                {
                    id: "integration-04",
                    name: "Zapier",
                    website: "zapier.com",
                    description: "Connect your apps and automate workflows",
                    imageSrc: "https://www.untitledui.com/logos/integrations/zapier.svg",
                },
                {
                    id: "integration-05",
                    name: "Notion",
                    website: "notion.so",
                    description: "All-in-one workspace for notes, tasks, wikis, and databases",
                    imageSrc: "https://www.untitledui.com/logos/integrations/notion.svg",
                },
                {
                    id: "integration-06",
                    name: "Slack",
                    website: "slack.com",
                    description: "Slack is a new way to communicate with your team",
                    imageSrc: "https://www.untitledui.com/logos/integrations/slack.svg",
                },
                {
                    id: "integration-07",
                    name: "Dropbox",
                    website: "dropbox.com",
                    description: "Dropbox is a file hosting service",
                    imageSrc: "https://www.untitledui.com/logos/integrations/dropbox.svg",
                },
            ];

            const items: CommandDropdownMenuItemProps[] = integrations.map((integration) => ({
                type: "avatar",
                id: integration.id,
                label: integration.name,
                description: integration.website,
                src: integration.imageSrc,
                info: integration.description,
                alt: integration.name,
            }));

            const groups = [{ id: "integrations", title: "Integrations", items }];

            useHotkeys("meta+k", () => setIsOpen(true));

            return (
                <div className="mt-10 w-full space-y-8">
                    <div className="w-full">
                        <h3 className="mb-4 text-lg font-semibold text-text-primary">Integrations menu stacked</h3>
                        <>
                            <Button color="secondary" onClick={() => setIsOpen(true)}>
                                Open Command Menu (⌘K)
                            </Button>

                            <CommandMenu
                                isOpen={isOpen}
                                items={groups}
                                defaultSelectedKeys={groups[0]?.items[1]?.id ? [groups[0].items[1].id] : []}
                                onOpenChange={setIsOpen}
                                onSelectionChange={(keys) => console.log("You clicked item: ", keys)}
                                emptyState={
                                    <EmptyStateComponent size="sm" className="overflow-hidden p-6 pb-10">
                                        <EmptyStateComponent.Header>
                                            <EmptyStateComponent.FeaturedIcon color="gray" />
                                        </EmptyStateComponent.Header>

                                        <EmptyStateComponent.Content className="mb-0">
                                            <EmptyStateComponent.Title>No integrations found</EmptyStateComponent.Title>
                                            <EmptyStateComponent.Description>
                                                Your search did not match any integrations. <br />
                                                Please try again.
                                            </EmptyStateComponent.Description>
                                        </EmptyStateComponent.Content>
                                    </EmptyStateComponent>
                                }
                            >
                                <AriaHeading slot="title" className="sr-only">
                                    Integrations
                                </AriaHeading>
                                <CommandMenu.Group className="flex max-h-96">
                                    <CommandMenu.List>
                                        {(group) => (
                                            <CommandMenu.Section {...group}>
                                                {(item) => (
                                                    <CommandMenu.Item
                                                        key={item.id}
                                                        stacked
                                                        size="sm"
                                                        className="**:data-avatar:rounded-none **:data-avatar:bg-transparent **:data-avatar:outline-none **:data-avatar-img:rounded-none"
                                                        {...item}
                                                    />
                                                )}
                                            </CommandMenu.Section>
                                        )}
                                    </CommandMenu.List>
                                    <CommandMenu.Preview asChild>
                                        {({ selectedId }) => {
                                            const integration = integrations.find(
                                                (integration) => integration.id === selectedId,
                                            ) as (typeof integrations)[number];

                                            return (
                                                <IntegrationPreview
                                                    title={integration?.name}
                                                    description={integration?.description}
                                                    imageSrc={integration?.imageSrc}
                                                />
                                            );
                                        }}
                                    </CommandMenu.Preview>
                                </CommandMenu.Group>
                            </CommandMenu>
                        </>
                    </div>
                </div>
            );
        };
        return <IntegrationsMenuStackedComponent />;
    },
    parameters: {
        docs: {
            description: {
                story: "Full command menu with integrations section in stacked layout and footer.",
            },
        },
    },
};
