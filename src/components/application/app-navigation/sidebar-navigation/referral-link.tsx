import type { ReactNode } from "react";
import { useState } from "react";
import { Check, Copy01, Link03 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { CloseButton } from "@/components/base/buttons/close-button";
import { Input } from "@/components/base/input/input";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { useClipboard } from "@/hooks/use-clipboard";
import { cx } from "@/utils/cx";

interface FeaturedCardCommonProps {
    title: string;
    description: ReactNode;
    confirmLabel: string;
    className?: string;
    onDismiss: () => void;
    onConfirm: () => void;
}

export const FeaturedCardReferralLink = ({
    title,
    description,
    onDismiss,
    className,
}: Pick<FeaturedCardCommonProps, "title" | "description" | "onDismiss" | "className">) => {
    const { copy, copied } = useClipboard();
    const [value, setValue] = useState("uui.com/4060020");

    return (
        <div className={cx("relative flex flex-col rounded-xl bg-primary p-4 ring-1 ring-secondary ring-inset", className)}>
            <FeaturedIcon color="gray" icon={Link03} theme="modern" size="md" />
            <div className="absolute top-2 right-2">
                <CloseButton onClick={onDismiss} size="sm" />
            </div>
            <div className="mt-3">
                <p className="text-sm font-semibold text-primary">{title}</p>
                <p className="mt-1 text-sm text-tertiary">{description}</p>
            </div>
            <div className="mt-4 flex gap-1">
                <Input aria-label="Referral link" value={value} onChange={setValue} isReadOnly size="sm" />
                <Button iconLeading={copied ? Check : Copy01} onClick={() => copy(value)} size="md" color="tertiary" />
            </div>
        </div>
    );
};
