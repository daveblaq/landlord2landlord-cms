import React, { useMemo, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Table, TableCard } from "./table";
import { TableRowActionsDropdown } from "./table";
import { Badge, type BadgeColor, BadgeWithDot } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { EmptyState } from "@/components/application/empty-state/empty-state";
import { SearchLg, UploadCloud02, AlertCircle, Check, ReverseLeft, X, FilterLines, Plus } from "@untitledui/icons";
import teamMembersData from "./team-members.json";
import type { SortDescriptor } from "react-aria-components";
import { Avatar } from "@/components/base/avatar/avatar";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Trash01, Edit01 } from "@untitledui/icons";
import { PaginationCardMinimal, PaginationPageMinimalCenter } from "@/components/application/pagination/pagination";
import type { BadgeTypes } from "@/components/base/badges/badge-types";
import { ProgressBar } from "@/components/base/progress-indicators/progress-indicators";
import customers from "@/components/application/table/customers.json";
import { BadgeWithIcon } from "@/components/base/badges/badges";
import invoicesData from "@/components/application/table/invoices.json";
import uploadedFiles from "@/components/application/table/uploaded-files.json";
import { FileIcon } from "@untitledui/file-icons";
import { ButtonGroupItem } from "@/components/base/button-group/button-group";
import { ButtonGroup } from "@/components/base/button-group/button-group";
import { Input } from "@/components/base/input/input";

interface Invoice {
    id: string;
    date: string;
    status: string;
    customer: {
        name: string;
        email: string;
        avatarUrl?: string;
    };
    purchase: string;
}

interface InvoicesData {
    items: Invoice[];
    total: number;
}

const invoices = invoicesData as InvoicesData;

interface TeamMember {
    name: string;
    username: string;
    status: string;
    role: string;
    email: string;
    teams: Array<{ name: string; color: string }>;
    avatarUrl: string;
}

interface TeamMembersData {
    items: TeamMember[];
    total: number;
}

// Type assertion for JSON import
const teamMembers = teamMembersData as TeamMembersData;

const meta = {
    title: "Application/Table",
    component: Table,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component: "A flexible table component with sorting, selection, and various styling options.",
            },
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data
const columns = [
    { id: "name", name: "Name", allowsSorting: true },
    { id: "status", name: "Status", allowsSorting: true },
    { id: "role", name: "Role", allowsSorting: true },
    { id: "email", name: "Email", allowsSorting: true },
    { id: "actions", name: "", allowsSorting: false },
];

const rows = [
    { id: 1, name: "Olivia Rhye", status: "Active", role: "Product Designer", email: "olivia@untitledui.com" },
    { id: 2, name: "Phoenix Baker", status: "Active", role: "Engineering Manager", email: "phoenix@untitledui.com" },
    { id: 3, name: "Lana Steiner", status: "Active", role: "Product Manager", email: "lana@untitledui.com" },
    { id: 4, name: "Demi Wilkinson", status: "Active", role: "Frontend Developer", email: "demi@untitledui.com" },
    { id: 5, name: "Candice Wu", status: "Active", role: "Backend Developer", email: "candice@untitledui.com" },
];

// Table Examples - Main docs content
export const TableExamples: Story = {
    render: () => {
        const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
            column: "status",
            direction: "ascending",
        });
     
        const sortedItems = useMemo(() => {
            return [...teamMembers.items].map((item, index) => ({ ...item, id: item.email })).sort((a, b) => {
                const first = a[sortDescriptor.column as keyof typeof a];
                const second = b[sortDescriptor.column as keyof typeof b];
     
                // Compare numbers or booleans
                if ((typeof first === "number" && typeof second === "number") || (typeof first === "boolean" && typeof second === "boolean")) {
                    return sortDescriptor.direction === "descending" ? Number(second) - Number(first) : Number(first) - Number(second);
                }
     
                // Compare strings
                if (typeof first === "string" && typeof second === "string") {
                    let cmp = first.localeCompare(second);
                    if (sortDescriptor.direction === "descending") {
                        cmp *= -1;
                    }
                    return cmp;
                }
     
                return 0;
            });
        }, [sortDescriptor]);
        return (
        <TableCard.Root>
            <TableCard.Header title="Team members" description="A list of all the members in your account including their name, title, email and role." />
            <Table 
                aria-label="Team members table" 
                selectionMode="multiple" 
                selectionBehavior="toggle"
                sortDescriptor={sortDescriptor}
                onSortChange={setSortDescriptor}
            >
                <Table.Header columns={columns}>
                    {(column) => <Table.Head key={column.id} label={column.name} allowsSorting={column.allowsSorting} />}
                </Table.Header>
                <Table.Body items={sortedItems}>
                    {(item) => (
                        <Table.Row columns={columns}>
                            {(column) => {
                                if (column.id === "actions") {
                                    return (
                                        <Table.Cell key={column.id}>
                                            <TableRowActionsDropdown />
                                        </Table.Cell>
                                    );
                                }
                                if (column.id === "status") {
                                    return (
                                        <Table.Cell key={column.id}>
                                            <Badge color="success" size="sm">
                                                {item.status}
                                            </Badge>
                                        </Table.Cell>
                                    );
                                }
                                const value = item[column.id as keyof typeof item];
                                if (Array.isArray(value)) {
                                    return <Table.Cell key={column.id}>-</Table.Cell>;
                                }
                                return <Table.Cell key={column.id}>{String(value)}</Table.Cell>;
                            }}
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </TableCard.Root>
    );
    },
};


// Table Small Size Example
export const TableSmallSizeExample:  Story = {
    render: () => {
        const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
            column: "status",
            direction: "ascending",
        });
     
        const sortedItems = useMemo(() => {
            return teamMembers.items.sort((a, b) => {
                const first = a[sortDescriptor.column as keyof typeof a];
                const second = b[sortDescriptor.column as keyof typeof b];
     
                // Compare numbers or booleans
                if ((typeof first === "number" && typeof second === "number") || (typeof first === "boolean" && typeof second === "boolean")) {
                    return sortDescriptor.direction === "descending" ? second - first : first - second;
                }
     
                // Compare strings
                if (typeof first === "string" && typeof second === "string") {
                    let cmp = first.localeCompare(second);
                    if (sortDescriptor.direction === "descending") {
                        cmp *= -1;
                    }
                    return cmp;
                }
     
                return 0;
            });
        }, [sortDescriptor]);
     
        return (
        <TableCard.Root size="sm">
        <TableCard.Header
            title="Team members"
            badge="100 users"
            contentTrailing={
                <div className="absolute top-5 right-4 md:right-6">
                    <TableRowActionsDropdown />
                </div>
            }
        />
        <Table aria-label="Team members" selectionMode="multiple" sortDescriptor={sortDescriptor} onSortChange={setSortDescriptor}>
            <Table.Header>
                <Table.Head id="name" label="Name" isRowHeader allowsSorting className="w-full max-w-1/4" />
                <Table.Head id="status" label="Status" allowsSorting />
                <Table.Head id="role" label="Role" allowsSorting tooltip="This is a tooltip" />
                <Table.Head id="email" label="Email address" allowsSorting className="md:hidden xl:table-cell" />
                <Table.Head id="teams" label="Teams" />
                <Table.Head id="actions" />
            </Table.Header>

            <Table.Body items={sortedItems}>
                {(item) => (
                    <Table.Row id={item.username}>
                        <Table.Cell>
                            <div className="flex items-center gap-2">
                                <Avatar src={item.avatarUrl} alt={item.name} size="sm" />
                                <p className="text-sm font-medium whitespace-nowrap text-primary">{item.name}</p>
                            </div>
                        </Table.Cell>
                        <Table.Cell>
                            <BadgeWithDot size="sm" color={item.status === "active" ? "success" : "gray"} type="modern">
                                {item.status === "active" ? "Active" : "Inactive"}
                            </BadgeWithDot>
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap">{item.role}</Table.Cell>
                        <Table.Cell className="whitespace-nowrap md:hidden xl:table-cell">{item.email}</Table.Cell>
                        <Table.Cell>
                            <div className="flex gap-1">
                                {item.teams.slice(0, 3).map((team) => (
                                    <Badge key={team.name} color={team.color as BadgeColor<BadgeTypes>} size="sm">
                                        {team.name}
                                    </Badge>
                                ))}

                                {item.teams.length > 3 && (
                                    <Badge color="gray" size="sm">
                                        +{item.teams.length - 3}
                                    </Badge>
                                )}
                            </div>
                        </Table.Cell>
                        <Table.Cell className="px-3">
                            <div className="flex justify-end gap-0.5">
                                <ButtonUtility size="xs" color="tertiary" tooltip="Delete" icon={Trash01} />
                                <ButtonUtility size="xs" color="tertiary" tooltip="Edit" icon={Edit01} />
                            </div>
                        </Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table>

        <PaginationCardMinimal align="right" page={1} total={10} className="px-4 py-3 md:px-5 md:pt-3 md:pb-4" />
    </TableCard.Root>
    );
    },
};

// Divider Line 01
export const DividerLine01: Story = {
    render: () => {
        const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
            column: "status",
            direction: "ascending",
        });
     
        const sortedItems = useMemo(() => {
            return teamMembers.items.sort((a, b) => {
                const first = a[sortDescriptor.column as keyof typeof a];
                const second = b[sortDescriptor.column as keyof typeof b];
     
                // Compare numbers or booleans
                if ((typeof first === "number" && typeof second === "number") || (typeof first === "boolean" && typeof second === "boolean")) {
                    return sortDescriptor.direction === "descending" ? second - first : first - second;
                }
     
                // Compare strings
                if (typeof first === "string" && typeof second === "string") {
                    let cmp = first.localeCompare(second);
                    if (sortDescriptor.direction === "descending") {
                        cmp *= -1;
                    }
                    return cmp;
                }
     
                return 0;
            });
        }, [sortDescriptor]);
     
        return (
            <TableCard.Root>
                <TableCard.Header
                    title="Team members"
                    badge="100 users"
                    contentTrailing={
                        <div className="absolute top-5 right-4 md:right-6">
                            <TableRowActionsDropdown />
                        </div>
                    }
                />
                <Table aria-label="Team members" selectionMode="multiple" sortDescriptor={sortDescriptor} onSortChange={setSortDescriptor}>
                    <Table.Header>
                        <Table.Head id="name" label="Name" isRowHeader allowsSorting className="w-full max-w-1/4" />
                        <Table.Head id="status" label="Status" allowsSorting />
                        <Table.Head id="role" label="Role" allowsSorting tooltip="This is a tooltip" />
                        <Table.Head id="email" label="Email address" allowsSorting className="md:hidden xl:table-cell" />
                        <Table.Head id="teams" label="Teams" />
                        <Table.Head id="actions" />
                    </Table.Header>
     
                    <Table.Body items={sortedItems}>
                        {(item) => (
                            <Table.Row id={item.username}>
                                <Table.Cell>
                                    <div className="flex items-center gap-3">
                                        <Avatar src={item.avatarUrl} alt={item.name} size="md" />
                                        <div className="whitespace-nowrap">
                                            <p className="text-sm font-medium text-primary">{item.name}</p>
                                            <p className="text-sm text-tertiary">{item.username}</p>
                                        </div>
                                    </div>
                                </Table.Cell>
                                <Table.Cell>
                                    <BadgeWithDot size="sm" color={item.status === "active" ? "success" : "gray"} type="modern">
                                        {item.status === "active" ? "Active" : "Inactive"}
                                    </BadgeWithDot>
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap">{item.role}</Table.Cell>
                                <Table.Cell className="whitespace-nowrap md:hidden xl:table-cell">{item.email}</Table.Cell>
                                <Table.Cell>
                                    <div className="flex gap-1">
                                        {item.teams.slice(0, 3).map((team) => (
                                            <Badge key={team.name} color={team.color as BadgeColor<BadgeTypes>} size="sm">
                                                {team.name}
                                            </Badge>
                                        ))}
     
                                        {item.teams.length > 3 && (
                                            <Badge color="gray" size="sm">
                                                +{item.teams.length - 3}
                                            </Badge>
                                        )}
                                    </div>
                                </Table.Cell>
                                <Table.Cell className="px-4">
                                    <div className="flex justify-end gap-0.5">
                                        <ButtonUtility size="xs" color="tertiary" tooltip="Delete" icon={Trash01} />
                                        <ButtonUtility size="xs" color="tertiary" tooltip="Edit" icon={Edit01} />
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
     
                <PaginationPageMinimalCenter page={1} total={10} className="px-4 py-3 md:px-6 md:pt-3 md:pb-4" />
            </TableCard.Root>       
    );
    },
};

// Alternating Fills 01
export const AlternatingFills01: Story = {
    render: () => {
        const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
            column: "status",
            direction: "ascending",
        });
     
        const sortedItems = useMemo(() => {
            return teamMembers.items.sort((a, b) => {
                const first = a[sortDescriptor.column as keyof typeof a];
                const second = b[sortDescriptor.column as keyof typeof b];
     
                // Compare numbers or booleans
                if ((typeof first === "number" && typeof second === "number") || (typeof first === "boolean" && typeof second === "boolean")) {
                    return sortDescriptor.direction === "descending" ? second - first : first - second;
                }
     
                // Compare strings
                if (typeof first === "string" && typeof second === "string") {
                    let cmp = first.localeCompare(second);
                    if (sortDescriptor.direction === "descending") {
                        cmp *= -1;
                    }
                    return cmp;
                }
     
                return 0;
            });
        }, [sortDescriptor]);
     
        return (
            <TableCard.Root>
                <TableCard.Header
                    title="Team members"
                    badge="100 users"
                    contentTrailing={
                        <div className="absolute top-5 right-4 md:right-6">
                            <TableRowActionsDropdown />
                        </div>
                    }
                />
                <Table aria-label="Team members" selectionMode="multiple" sortDescriptor={sortDescriptor} onSortChange={setSortDescriptor}>
                    <Table.Header className="bg-primary">
                        <Table.Head id="name" label="Name" isRowHeader allowsSorting className="w-full max-w-1/4" />
                        <Table.Head id="status" label="Status" allowsSorting />
                        <Table.Head id="role" label="Role" allowsSorting tooltip="This is a tooltip" />
                        <Table.Head id="email" label="Email address" allowsSorting className="md:hidden xl:table-cell" />
                        <Table.Head id="teams" label="Teams" />
                        <Table.Head id="actions" />
                    </Table.Header>
                    <Table.Body items={sortedItems}>
                        {(item) => (
                            <Table.Row id={item.username} className="odd:bg-secondary_subtle">
                                <Table.Cell>
                                    <div className="flex items-center gap-3">
                                        <Avatar src={item.avatarUrl} alt={item.name} size="md" />
                                        <div className="whitespace-nowrap">
                                            <p className="text-sm font-medium text-primary">{item.name}</p>
                                            <p className="text-sm text-tertiary">{item.username}</p>
                                        </div>
                                    </div>
                                </Table.Cell>
                                <Table.Cell>
                                    <BadgeWithDot size="sm" color={item.status === "active" ? "success" : "gray"} type="modern">
                                        {item.status === "active" ? "Active" : "Inactive"}
                                    </BadgeWithDot>
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap">{item.role}</Table.Cell>
                                <Table.Cell className="whitespace-nowrap md:hidden xl:table-cell">{item.email}</Table.Cell>
                                <Table.Cell>
                                    <div className="flex gap-1">
                                        {item.teams.slice(0, 3).map((team) => (
                                            <Badge key={team.name} color={team.color as BadgeColor<BadgeTypes>} size="sm">
                                                {team.name}
                                            </Badge>
                                        ))}
     
                                        {item.teams.length > 3 && (
                                            <Badge color="gray" size="sm">
                                                +{item.teams.length - 3}
                                            </Badge>
                                        )}
                                    </div>
                                </Table.Cell>
                                <Table.Cell className="px-4">
                                    <div className="flex justify-end gap-0.5">
                                        <ButtonUtility size="xs" color="tertiary" tooltip="Delete" icon={Trash01} />
                                        <ButtonUtility size="xs" color="tertiary" tooltip="Edit" icon={Edit01} />
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
     
                <PaginationPageMinimalCenter page={1} total={10} className="px-4 py-3 md:px-6 md:pt-3 md:pb-4" />
            </TableCard.Root>
    );
    },
};

// Divider Line 02
export const DividerLine02: Story = {
    render: () => {
        const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
            column: "status",
            direction: "ascending",
        });
     
        const sortedItems = useMemo(() => {
            return customers.items.sort((a, b) => {
                const first = a[sortDescriptor.column as keyof typeof a];
                const second = b[sortDescriptor.column as keyof typeof b];
     
                // Compare numbers or booleans
                if ((typeof first === "number" && typeof second === "number") || (typeof first === "boolean" && typeof second === "boolean")) {
                    return sortDescriptor.direction === "descending" ? second - first : first - second;
                }
     
                // Compare strings
                if (typeof first === "string" && typeof second === "string") {
                    let cmp = first.localeCompare(second);
                    if (sortDescriptor.direction === "descending") {
                        cmp *= -1;
                    }
                    return cmp;
                }
     
                return 0;
            });
        }, [sortDescriptor]);
     
        return (
            <TableCard.Root>
                <TableCard.Header
                    title="Customers"
                    description="These companies have purchased in the last 12 months."
                    contentTrailing={
                        <div className="absolute top-5 right-4 md:right-6">
                            <TableRowActionsDropdown />
                        </div>
                    }
                />
     
                <Table aria-label="Team members" selectionMode="none" sortDescriptor={sortDescriptor} onSortChange={setSortDescriptor}>
                    <Table.Header>
                        <Table.Head id="name" label="Company" isRowHeader allowsSorting />
                        <Table.Head id="status" label="Status" allowsSorting />
                        <Table.Head id="aboutTitle" label="About" allowsSorting />
                        <Table.Head id="users" label="Users" className="md:hidden xl:table-cell" />
                        <Table.Head id="licenseUse" label="License use" allowsSorting className="min-w-55" />
                        <Table.Head id="actions" />
                    </Table.Header>
                    <Table.Body items={sortedItems}>
                        {(item) => (
                            <Table.Row id={item.name}>
                                <Table.Cell>
                                    <div className="flex items-center gap-3">
                                        <Avatar src={item.logoUrl} alt={item.name} size="md" />
                                        <div className="whitespace-nowrap">
                                            <p className="text-sm font-medium text-primary">{item.name}</p>
                                            <p className="text-sm text-tertiary">{item.website}</p>
                                        </div>
                                    </div>
                                </Table.Cell>
                                <Table.Cell>
                                    <BadgeWithDot size="sm" color={item.status === "Customer" ? "success" : "gray"}>
                                        {item.status}
                                    </BadgeWithDot>
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap">
                                    <p className="text-sm font-medium text-primary">{item.aboutTitle}</p>
                                    <p className="text-sm text-tertiary">{item.aboutDescription}</p>
                                </Table.Cell>
                                <Table.Cell className="pr-0 md:hidden xl:table-cell">
                                    <div className="flex -space-x-1">
                                        <Avatar
                                            className="ring-[1.5px] ring-bg-primary"
                                            size="xs"
                                            src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80"
                                            alt="Olivia Rhye"
                                        />
                                        <Avatar
                                            className="ring-[1.5px] ring-bg-primary"
                                            size="xs"
                                            src="https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80"
                                            alt="Phoenix Baker"
                                        />
                                        <Avatar
                                            className="ring-[1.5px] ring-bg-primary"
                                            size="xs"
                                            src="https://www.untitledui.com/images/avatars/lana-steiner?fm=webp&q=80"
                                            alt="Lana Steiner"
                                        />
                                        <Avatar
                                            className="ring-[1.5px] ring-bg-primary"
                                            size="xs"
                                            src="https://www.untitledui.com/images/avatars/demi-wilkinson?fm=webp&q=80"
                                            alt="Demi Wilkinson"
                                        />
                                        <Avatar
                                            className="ring-[1.5px] ring-bg-primary"
                                            size="xs"
                                            src="https://www.untitledui.com/images/avatars/candice-wu?fm=webp&q=80"
                                            alt="Candice Wu"
                                        />
                                        <Avatar
                                            size="xs"
                                            className="ring-[1.5px] ring-bg-primary"
                                            placeholder={<span className="text-xs font-semibold text-quaternary">+5</span>}
                                        />
                                    </div>
                                </Table.Cell>
                                <Table.Cell>
                                    <ProgressBar labelPosition="right" value={item.licenseUse} />
                                </Table.Cell>
                                <Table.Cell className="px-4">
                                    <div className="flex items-center justify-end">
                                        <TableRowActionsDropdown />
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            </TableCard.Root>
    );
    },
};

// Alternating Fills 02
export const AlternatingFills02: Story = {
    render: () => {
        const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
            column: "status",
            direction: "ascending",
        });
     
        const sortedItems = useMemo(() => {
            return customers.items.sort((a, b) => {
                const first = a[sortDescriptor.column as keyof typeof a];
                const second = b[sortDescriptor.column as keyof typeof b];
     
                // Compare numbers or booleans
                if ((typeof first === "number" && typeof second === "number") || (typeof first === "boolean" && typeof second === "boolean")) {
                    return sortDescriptor.direction === "descending" ? second - first : first - second;
                }
     
                // Compare strings
                if (typeof first === "string" && typeof second === "string") {
                    let cmp = first.localeCompare(second);
                    if (sortDescriptor.direction === "descending") {
                        cmp *= -1;
                    }
                    return cmp;
                }
     
                return 0;
            });
        }, [sortDescriptor]);
     
        return (
            <TableCard.Root>
                <TableCard.Header
                    title="Customers"
                    description="These companies have purchased in the last 12 months."
                    contentTrailing={
                        <div className="absolute top-5 right-4 md:right-6">
                            <TableRowActionsDropdown />
                        </div>
                    }
                />
                <Table aria-label="Team members" selectionMode="none" sortDescriptor={sortDescriptor} onSortChange={setSortDescriptor}>
                    <Table.Header className="bg-primary">
                        <Table.Head id="name" label="Company" isRowHeader allowsSorting />
                        <Table.Head id="status" label="Status" allowsSorting />
                        <Table.Head id="aboutTitle" label="About" allowsSorting />
                        <Table.Head id="users" label="Users" className="md:hidden xl:table-cell" />
                        <Table.Head id="licenseUse" label="License use" allowsSorting className="min-w-55" />
                        <Table.Head id="actions" />
                    </Table.Header>
                    <Table.Body items={sortedItems}>
                        {(item) => (
                            <Table.Row id={item.name} className="odd:bg-secondary_subtle">
                                <Table.Cell>
                                    <div className="flex items-center gap-3">
                                        <Avatar src={item.logoUrl} alt={item.name} size="md" />
                                        <div className="whitespace-nowrap">
                                            <p className="text-sm font-medium text-primary">{item.name}</p>
                                            <p className="text-sm text-tertiary">{item.website}</p>
                                        </div>
                                    </div>
                                </Table.Cell>
                                <Table.Cell>
                                    <BadgeWithDot size="sm" color={item.status === "Customer" ? "success" : "gray"} type="modern">
                                        {item.status}
                                    </BadgeWithDot>
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap">
                                    <p className="text-sm font-medium text-primary">{item.aboutTitle}</p>
                                    <p className="text-sm text-tertiary">{item.aboutDescription}</p>
                                </Table.Cell>
                                <Table.Cell className="pr-0 md:hidden xl:table-cell">
                                    <div className="flex -space-x-1">
                                        <Avatar
                                            className="ring-[1.5px] ring-bg-primary"
                                            size="xs"
                                            src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80&w=100"
                                            alt="Olivia Rhye"
                                        />
                                        <Avatar
                                            className="ring-[1.5px] ring-bg-primary"
                                            size="xs"
                                            src="https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80&w=100"
                                            alt="Phoenix Baker"
                                        />
                                        <Avatar
                                            className="ring-[1.5px] ring-bg-primary"
                                            size="xs"
                                            src="https://www.untitledui.com/images/avatars/lana-steiner?fm=webp&q=80&w=100"
                                            alt="Lana Steiner"
                                        />
                                        <Avatar
                                            className="ring-[1.5px] ring-bg-primary"
                                            size="xs"
                                            src="https://www.untitledui.com/images/avatars/demi-wilkinson?fm=webp&q=80&w=100"
                                            alt="Demi Wilkinson"
                                        />
                                        <Avatar
                                            className="ring-[1.5px] ring-bg-primary"
                                            size="xs"
                                            src="https://www.untitledui.com/images/avatars/candice-wu?fm=webp&q=80&w=100"
                                            alt="Candice Wu"
                                        />
                                        <Avatar
                                            size="xs"
                                            className="ring-[1.5px] ring-bg-primary"
                                            placeholder={<span className="text-xs font-semibold text-quaternary">+5</span>}
                                        />
                                    </div>
                                </Table.Cell>
                                <Table.Cell>
                                    <ProgressBar labelPosition="right" value={item.licenseUse} />
                                </Table.Cell>
                                <Table.Cell className="px-4">
                                    <div className="flex items-center justify-end">
                                        <TableRowActionsDropdown />
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            </TableCard.Root>
    );
    },
};

// Divider Line 03
export const DividerLine03: Story = {
    render: () => {
        const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
            column: "invoice",
            direction: "ascending",
        });
     
        const sortedItems = useMemo(() => {
            return invoices.items.sort((a, b) => {
                const first = a[sortDescriptor.column as keyof typeof a];
                const second = b[sortDescriptor.column as keyof typeof b];
     
                // Compare numbers or booleans
                if ((typeof first === "number" && typeof second === "number") || (typeof first === "boolean" && typeof second === "boolean")) {
                    return sortDescriptor.direction === "descending" ? second - first : first - second;
                }
     
                // Compare strings
                if (typeof first === "string" && typeof second === "string") {
                    let cmp = first.localeCompare(second);
                    if (sortDescriptor.direction === "descending") {
                        cmp *= -1;
                    }
                    return cmp;
                }
     
                return 0;
            });
        }, [sortDescriptor]);
     
        const getInitials = (name: string) => {
            return name
                .split(" ")
                .map((n) => n[0])
                .join("");
        };
     
        return (
            <TableCard.Root>
                <Table aria-label="Team members" selectionMode="multiple" sortDescriptor={sortDescriptor} onSortChange={setSortDescriptor}>
                    <Table.Header>
                        <Table.Head id="id" label="Invoice" isRowHeader allowsSorting />
                        <Table.Head id="date" label="Date" allowsSorting />
                        <Table.Head id="status" label="Status" allowsSorting />
                        <Table.Head id="customer" label="Customer" />
                        <Table.Head id="purchase" label="Purchase" className="md:hidden xl:table-cell" />
                        <Table.Head id="actions" />
                    </Table.Header>
                    <Table.Body items={sortedItems}>
                        {(item) => (
                            <Table.Row id={item.id}>
                                <Table.Cell className="font-medium text-primary">#{item.id}</Table.Cell>
                                <Table.Cell className="whitespace-nowrap">
                                    {new Date(item.date).toLocaleString(undefined, { year: "numeric", month: "short", day: "numeric" })}
                                </Table.Cell>
                                <Table.Cell>
                                    {item.status === "paid" ? (
                                        <BadgeWithIcon size="sm" color="success" iconLeading={Check} className="capitalize">
                                            {item.status}
                                        </BadgeWithIcon>
                                    ) : item.status === "refunded" ? (
                                        <BadgeWithIcon size="sm" color="gray" iconLeading={ReverseLeft} className="capitalize">
                                            {item.status}
                                        </BadgeWithIcon>
                                    ) : (
                                        <BadgeWithIcon size="sm" color="error" iconLeading={X} className="capitalize">
                                            {item.status}
                                        </BadgeWithIcon>
                                    )}
                                </Table.Cell>
                                <Table.Cell>
                                    <div className="flex items-center gap-3">
                                        <Avatar initials={getInitials(item.customer.name)} src={item.customer.avatarUrl} alt={item.customer.name} size="md" />
                                        <div className="whitespace-nowrap">
                                            <p className="text-sm font-medium text-primary">{item.customer.name}</p>
                                            <p className="text-sm text-tertiary">{item.customer.email}</p>
                                        </div>
                                    </div>
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap md:hidden xl:table-cell">{item.purchase}</Table.Cell>
                                <Table.Cell>
                                    <div className="flex items-center justify-end gap-3">
                                        <Button size="sm" color="link-gray">
                                            Delete
                                        </Button>
                                        <Button size="sm" color="link-color">
                                            Edit
                                        </Button>
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
                <PaginationPageMinimalCenter page={1} total={10} className="px-4 py-3 md:px-6 md:pt-3 md:pb-4" />
            </TableCard.Root>
    );
    },
};

// Alternating Fills 03
export const AlternatingFills03: Story = {
    render: () =>{
        const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
            column: "invoice",
            direction: "ascending",
        });
     
        const sortedItems = useMemo(() => {
            return invoices.items.sort((a, b) => {
                const first = a[sortDescriptor.column as keyof typeof a];
                const second = b[sortDescriptor.column as keyof typeof b];
     
                // Compare numbers or booleans
                if ((typeof first === "number" && typeof second === "number") || (typeof first === "boolean" && typeof second === "boolean")) {
                    return sortDescriptor.direction === "descending" ? second - first : first - second;
                }
     
                // Compare strings
                if (typeof first === "string" && typeof second === "string") {
                    let cmp = first.localeCompare(second);
                    if (sortDescriptor.direction === "descending") {
                        cmp *= -1;
                    }
                    return cmp;
                }
     
                return 0;
            });
        }, [sortDescriptor]);
     
        const getInitials = (name: string) => {
            return name
                .split(" ")
                .map((n) => n[0])
                .join("");
        };
     
        return (
            <TableCard.Root>
                <Table aria-label="Team members" selectionMode="multiple" sortDescriptor={sortDescriptor} onSortChange={setSortDescriptor}>
                    <Table.Header className="bg-primary">
                        <Table.Head id="id" label="Invoice" isRowHeader allowsSorting />
                        <Table.Head id="date" label="Date" allowsSorting />
                        <Table.Head id="status" label="Status" allowsSorting />
                        <Table.Head id="customer" label="Customer" />
                        <Table.Head id="purchase" label="Purchase" className="md:hidden xl:table-cell" />
                        <Table.Head id="actions" />
                    </Table.Header>
                    <Table.Body items={sortedItems}>
                        {(item) => (
                            <Table.Row id={item.id} className="odd:bg-secondary_subtle">
                                <Table.Cell className="font-medium text-primary">#{item.id}</Table.Cell>
                                <Table.Cell className="whitespace-nowrap">{item.date}</Table.Cell>
                                <Table.Cell>
                                    {item.status === "paid" ? (
                                        <BadgeWithIcon size="sm" color="success" iconLeading={Check} className="capitalize">
                                            {item.status}
                                        </BadgeWithIcon>
                                    ) : item.status === "refunded" ? (
                                        <BadgeWithIcon size="sm" color="gray" iconLeading={ReverseLeft} className="capitalize">
                                            {item.status}
                                        </BadgeWithIcon>
                                    ) : (
                                        <BadgeWithIcon size="sm" color="error" iconLeading={X} className="capitalize">
                                            {item.status}
                                        </BadgeWithIcon>
                                    )}
                                </Table.Cell>
                                <Table.Cell>
                                    <div className="flex items-center gap-3">
                                        <Avatar initials={getInitials(item.customer.name)} src={item.customer.avatarUrl} alt={item.customer.name} size="md" />
                                        <div className="whitespace-nowrap">
                                            <p className="text-sm font-medium text-primary">{item.customer.name}</p>
                                            <p className="text-sm text-tertiary">{item.customer.email}</p>
                                        </div>
                                    </div>
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap md:hidden xl:table-cell">{item.purchase}</Table.Cell>
                                <Table.Cell>
                                    <div className="flex items-center justify-end gap-3">
                                        <Button size="sm" color="link-gray">
                                            Delete
                                        </Button>
                                        <Button size="sm" color="link-color">
                                            Edit
                                        </Button>
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
                <PaginationPageMinimalCenter page={1} total={10} className="px-4 py-3 md:px-6 md:pt-3 md:pb-4" />
            </TableCard.Root>
    );
    },
};

// Divider Line 04
export const DividerLine04: Story = {
    render: () => (
        <TableCard.Root>
            <TableCard.Header
                title="Files uploaded"
                className="pb-5"
                contentTrailing={
                    <div className="flex items-center gap-3">
                        <Button size="md" color="secondary">
                            Download all
                        </Button>
                        <Button size="md" iconLeading={UploadCloud02}>
                            Upload
                        </Button>
                    </div>
                }
            />
            <Table aria-label="Team members" selectionMode="multiple">
                <Table.Header>
                    <Table.Head id="name" label="File name" isRowHeader />
                    <Table.Head id="size" label="File size" />
                    <Table.Head id="uploadedAt" label="Date uploaded" />
                    <Table.Head id="updatedAt" label="Last updated" className="md:hidden xl:table-cell" />
                    <Table.Head id="uploadedBy" label="Uploaded by" />
                    <Table.Head id="actions" />
                </Table.Header>
                <Table.Body items={uploadedFiles.items}>
                    {(item) => (
                        <Table.Row id={item.name}>
                            <Table.Cell>
                                <div className="flex items-center gap-3">
                                    <FileIcon type={item.name.split(".")[1]} theme="light" className="size-10 dark:hidden" />
                                    <FileIcon type={item.name.split(".")[1]} theme="dark" className="size-10 not-dark:hidden" />
 
                                    <div className="whitespace-nowrap">
                                        <p className="text-sm font-medium text-primary">{item.name}</p>
                                        <p className="text-sm text-tertiary">{item.size}</p>
                                    </div>
                                </div>
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap">{item.size}</Table.Cell>
                            <Table.Cell className="whitespace-nowrap">{item.uploadedAt}</Table.Cell>
                            <Table.Cell className="whitespace-nowrap md:hidden xl:table-cell">{item.updatedAt}</Table.Cell>
                            <Table.Cell className="whitespace-nowrap">{item.uploadedBy}</Table.Cell>
                            <Table.Cell className="px-4">
                                <div className="flex items-center justify-end">
                                    <TableRowActionsDropdown />
                                </div>
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </TableCard.Root>
    ),
};

// Alternating Fills 04
export const AlternatingFills04: Story = {
    render: () => (
        <TableCard.Root>
        <TableCard.Header
            title="Files uploaded"
            badge="10/20 seats"
            contentTrailing={
                <div className="flex items-center gap-3">
                    <Button size="md" color="secondary">
                        Download all
                    </Button>
                    <Button size="md" iconLeading={UploadCloud02}>
                        Upload
                    </Button>
                </div>
            }
        />
        <Table aria-label="Team members" selectionMode="multiple">
            <Table.Header className="bg-primary">
                <Table.Head id="name" label="File name" isRowHeader />
                <Table.Head id="size" label="File size" />
                <Table.Head id="uploadedAt" label="Date uploaded" />
                <Table.Head id="updatedAt" label="Last updated" className="md:hidden xl:table-cell" />
                <Table.Head id="uploadedBy" label="Uploaded by" />
                <Table.Head id="actions" />
            </Table.Header>
            <Table.Body items={uploadedFiles.items}>
                {(item) => (
                    <Table.Row id={item.name} className="odd:bg-secondary_subtle">
                        <Table.Cell>
                            <div className="flex items-center gap-3">
                                <FileIcon type={item.name.split(".")[1]} theme="light" className="size-10 dark:hidden" />
                                <FileIcon type={item.name.split(".")[1]} theme="dark" className="size-10 not-dark:hidden" />

                                <div className="whitespace-nowrap">
                                    <p className="text-sm font-medium text-primary">{item.name}</p>
                                    <p className="text-sm text-tertiary">{item.size}</p>
                                </div>
                            </div>
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap">{item.size}</Table.Cell>
                        <Table.Cell className="whitespace-nowrap">{item.uploadedAt}</Table.Cell>
                        <Table.Cell className="whitespace-nowrap md:hidden xl:table-cell">{item.updatedAt}</Table.Cell>
                        <Table.Cell className="whitespace-nowrap">{item.uploadedBy}</Table.Cell>
                        <Table.Cell className="px-4">
                            <div className="flex items-center justify-end">
                                <TableRowActionsDropdown />
                            </div>
                        </Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    </TableCard.Root>
    ),
};

// No Vendors Found
export const NoVendorsFound: Story = {
    render: () => (
        <TableCard.Root>
            <TableCard.Header
                title="Vendor movements"
                badge="240 vendors"
                description="Keep track of vendor and their security ratings."
                contentTrailing={
                    <>
                        <div className="flex gap-3 md:pr-9">
                            <Button color="secondary" size="sm" iconLeading={UploadCloud02}>
                                Import
                            </Button>
                            <Button size="sm" iconLeading={Plus}>
                                Add vendor
                            </Button>
                        </div>
                        <div className="absolute top-5 right-4 md:right-6">
                            <TableRowActionsDropdown />
                        </div>
                    </>
                }
            />
 
            <div className="flex justify-between gap-4 border-b border-secondary px-4 py-3 md:px-6">
                <ButtonGroup defaultSelectedKeys={["all"]}>
                    <ButtonGroupItem id="all">View all</ButtonGroupItem>
                    <ButtonGroupItem id="monitored">Monitored</ButtonGroupItem>
                    <ButtonGroupItem id="unmonitored">Unmonitored</ButtonGroupItem>
                </ButtonGroup>
 
                <div className="hidden gap-3 md:flex">
                    <Input icon={SearchLg} aria-label="Search" placeholder="Search" className="w-70" />
                    <Button size="sm" color="secondary" iconLeading={FilterLines}>
                        Filters
                    </Button>
                </div>
            </div>
 
            <div className="flex items-center justify-center overflow-hidden px-8 pt-10 pb-12">
                <EmptyState size="sm">
                    <EmptyState.Header pattern="circle">
                        <EmptyState.FeaturedIcon color="gray" theme="modern-neue" />
                    </EmptyState.Header>
 
                    <EmptyState.Content>
                        <EmptyState.Title>No vendors found</EmptyState.Title>
                        <EmptyState.Description>
                            Your search “Stripe” did not match any vendors. Please try again or create add a new vendor.
                        </EmptyState.Description>
                    </EmptyState.Content>
 
                    <EmptyState.Footer>
                        <Button size="md" color="secondary">
                            Clear search
                        </Button>
                        <Button size="md" iconLeading={Plus}>
                            New project
                        </Button>
                    </EmptyState.Footer>
                </EmptyState>
            </div>
 
            <div className="flex items-center justify-between border-t border-secondary px-6 pt-3 pb-4">
                <span className="text-sm">Page 1 of 10</span>
                <div className="flex gap-3">
                    <Button color="secondary">Previous</Button>
                    <Button color="secondary">Next</Button>
                </div>
            </div>
        </TableCard.Root>
    ),
};

// Start by Uploading File
export const StartByUploadingFile: Story = {
    render: () => (
        <TableCard.Root>
        <TableCard.Header
            title="Files uploaded"
            contentTrailing={
                <div className="flex items-center">
                    <Button size="sm" iconLeading={UploadCloud02}>
                        Upload
                    </Button>
                </div>
            }
        />

        <div className="flex items-center justify-center overflow-hidden px-8 pt-10 pb-12">
            <EmptyState size="sm">
                <EmptyState.Header pattern="grid">
                    <EmptyState.Illustration type="cloud">
                        <UploadCloud02 />
                    </EmptyState.Illustration>
                </EmptyState.Header>

                <EmptyState.Content>
                    <EmptyState.Title>Start by uploading a file</EmptyState.Title>
                    <EmptyState.Description>
                        Any assets used in projects will live here. <br />
                        Start creating by uploading your files.
                    </EmptyState.Description>
                </EmptyState.Content>

                <EmptyState.Footer>
                    <Button size="sm" iconLeading={Plus}>
                        New project
                    </Button>
                </EmptyState.Footer>
            </EmptyState>
        </div>
    </TableCard.Root>
    ),
};

// Something Went Wrong
export const SomethingWentWrong: Story = {
    render: () => (
        <TableCard.Root>
        <TableCard.Header
            title="Team members"
            badge="100 users"
            contentTrailing={
                <div className="absolute top-5 right-4 md:right-6">
                    <TableRowActionsDropdown />
                </div>
            }
        />

        <div className="flex items-center justify-center overflow-hidden px-8 pt-10 pb-12">
            <EmptyState size="sm">
                <EmptyState.Header pattern="circle">
                    <EmptyState.FeaturedIcon color="error" theme="light" icon={AlertCircle} />
                </EmptyState.Header>

                <EmptyState.Content>
                    <EmptyState.Title>Something went wrong...</EmptyState.Title>
                    <EmptyState.Description>
                        We had some trouble loading this page. Please refresh the page or{" "}
                        <a
                            href="#"
                            className="rounded-xs underline underline-offset-2 outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2"
                        >
                            get in touch
                        </a>{" "}
                        for support.
                    </EmptyState.Description>
                </EmptyState.Content>

                <EmptyState.Footer>
                    <Button size="md" color="secondary">
                        Clear search
                    </Button>
                    <Button size="md" iconLeading={Plus}>
                        New project
                    </Button>
                </EmptyState.Footer>
            </EmptyState>
        </div>
    </TableCard.Root>
    ),
};

