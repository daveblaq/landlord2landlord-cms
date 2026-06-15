import type { ReactNode } from "react";
import { MessageChatCircle } from "@untitledui/icons";
import { BadgeWithDot } from "@/components/base/badges/badges";
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

export const FeaturedCardSupportCTA = ({ badge, title, description, confirmLabel, onConfirm, onDismiss }: FeaturedCardCommonProps & { badge?: string }) => {
    return (
        <div className="relative flex flex-col gap-4 rounded-xl bg-primary p-4 ring-1 ring-secondary ring-inset">
            <div className="absolute top-2 right-2">
                <CloseButton size="sm" onClick={onDismiss} />
            </div>

            <div className="flex flex-col gap-3">
                {badge && (
                    <BadgeWithDot color="success" type="modern" size="sm">
                        {badge}
                    </BadgeWithDot>
                )}
                <div className="flex flex-col gap-1">
                    <p className="flex items-center gap-1.5 text-sm font-semibold text-primary">{title}</p>
                    <p className="text-sm text-tertiary">{description}</p>
                </div>
            </div>
            <Button iconLeading={MessageChatCircle} size="sm" color="secondary" onClick={onConfirm}>
                {confirmLabel}
            </Button>
        </div>
    );
};
