import type { ReactNode } from "react";
import { Button } from "@/components/base/buttons/button";
import { CloseButton } from "@/components/base/buttons/close-button";
import { GradientScan, QRCode } from "@/components/shared-assets/qr-code";

interface FeaturedCardCommonProps {
    title: string;
    description: ReactNode;
    confirmLabel: string;
    className?: string;
    onDismiss: () => void;
    onConfirm: () => void;
}

export const FeaturedCardQRCode = ({ title, description, confirmLabel, onConfirm, onDismiss }: FeaturedCardCommonProps) => {
    return (
        <div className="relative flex flex-col gap-4 rounded-xl bg-primary p-4 ring-1 ring-secondary ring-inset">
            <div className="absolute top-2 right-2">
                <CloseButton size="sm" onClick={onDismiss} />
            </div>

            <div className="flex flex-col gap-1">
                <p className="truncate pr-6 text-sm font-semibold text-primary">{title}</p>
                <p className="text-sm text-tertiary">{description}</p>
            </div>
            <div className="relative flex w-full items-center justify-center">
                <QRCode value="https://www.untitledui.com/" size="md" />
                <GradientScan />
            </div>
            <Button color="secondary" size="sm" onClick={onConfirm}>
                {confirmLabel}
            </Button>
        </div>
    );
};