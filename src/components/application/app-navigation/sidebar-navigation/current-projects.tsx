"use client";

import type { ReactNode } from "react";
import { ChevronRight } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { CloseButton } from "@/components/base/buttons/close-button";
import { cx } from "@/utils/cx";

interface FeaturedCardCurrentProjectsProps {
    title: string;
    description: ReactNode;
    confirmLabel: string;
    className?: string;
    onDismiss: () => void;
    onConfirm: () => void;
}

const FeaturedCardCurrentProjects = ({ title, description, confirmLabel, className, onDismiss, onConfirm }: FeaturedCardCurrentProjectsProps) => {
    return (
        <div className={cx("relative flex flex-col rounded-xl bg-secondary p-4", className)}>
            <p className="text-sm font-semibold text-primary">{title}</p>
            <div className="absolute top-2 right-2">
                <CloseButton onClick={onDismiss} size="sm" />
            </div>
            <div className="mt-3">{description}</div>
            <div className="mt-4 flex gap-3">
                <Button onClick={onDismiss} color="link-gray" size="sm">
                    Dismiss
                </Button>
                <Button onClick={onConfirm} color="link-color" size="sm">
                    {confirmLabel}
                </Button>
            </div>
        </div>
    );
};

export const FeaturedCardCurrentProjectsDemo = () => (
    <FeaturedCardCurrentProjects
        title="Current projects"
        description={
            <ul className="flex flex-col gap-2">
                <li className="flex">
                    <a
                        href="#"
                        className="group flex w-full items-center gap-2 rounded-xs text-tertiary outline-focus-ring transition duration-100 hover:text-tertiary_hover focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                        <span className="flex size-2.5 items-center justify-center">
                            <span className="size-2 rounded-full bg-utility-blue-500"></span>
                        </span>
                        <span className="flex-1 text-sm font-medium">Dashboard design 2.0</span>
                        <ChevronRight size={16} className="text-fg-quaternary transition-inherit-all group-hover:text-fg-quaternary_hover" />
                    </a>
                </li>
                <li className="flex">
                    <a
                        href="#"
                        className="group flex w-full items-center gap-2 rounded-xs text-tertiary outline-focus-ring transition duration-100 hover:text-tertiary_hover focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                        <span className="flex size-2.5 items-center justify-center">
                            <span className="size-2 rounded-full bg-utility-purple-500"></span>
                        </span>
                        <span className="flex-1 text-sm font-medium">Marketing site CMS</span>
                        <ChevronRight size={16} className="text-fg-quaternary transition-inherit-all group-hover:text-fg-quaternary_hover" />
                    </a>
                </li>
                <li className="flex">
                    <a
                        href="#"
                        className="group flex w-full items-center gap-2 rounded-xs text-tertiary outline-focus-ring transition duration-100 hover:text-tertiary_hover focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                        <span className="flex size-2.5 items-center justify-center">
                            <span className="size-2 rounded-full bg-utility-pink-500"></span>
                        </span>
                        <span className="flex-1 text-sm font-medium">iOS app prototypes</span>
                        <ChevronRight size={16} className="text-fg-quaternary transition-inherit-all group-hover:text-fg-quaternary_hover" />
                    </a>
                </li>
            </ul>
        }
        confirmLabel="All projects"
        onConfirm={() => {}}
        onDismiss={() => {}}
    />
);
