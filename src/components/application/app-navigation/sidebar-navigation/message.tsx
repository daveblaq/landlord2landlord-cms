import type { ReactNode } from "react";
import { Avatar } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";
import { CloseButton } from "@/components/base/buttons/close-button";

interface FeaturedCardCommonProps {
    title: string;
    description: ReactNode;
    confirmLabel: string;
    className?: string;
    onDismiss: () => void;
    onConfirm: () => void;
}

export const FeaturedCardMessage = ({
    title,
    supportingText,
    description,
    confirmLabel,
    onConfirm,
    onDismiss,
}: FeaturedCardCommonProps & { supportingText: string }) => {
    return (
        <div className="relative flex flex-col gap-4 rounded-xl bg-primary p-4 ring-1 ring-secondary ring-inset">
            <div className="absolute top-2 right-2">
                <CloseButton size="sm" onClick={onDismiss} />
            </div>

            <div className="flex flex-col gap-3">
                <Avatar size="md" src="https://www.untitledui.com/images/avatars/mathilde-lewis?fm=webp&q=80" alt="Mathilde Lewis" status="online" />

                <div className="flex flex-col gap-1">
                    <p className="flex items-center gap-2 text-sm font-semibold text-primary">
                        {title}
                        <span className="text-sm font-normal text-quaternary">{supportingText}</span>
                    </p>

                    <p className="text-sm text-tertiary">{description}</p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <Button color="link-gray" size="sm" onClick={onDismiss}>
                    Dismiss
                </Button>
                <Button color="link-color" size="sm" onClick={onConfirm}>
                    {confirmLabel}
                </Button>
            </div>
        </div>
    );
};
