import { toast } from "sonner";
import { IconNotification } from "@/components/application/notifications/notifications";

export const BrandNotificationDemo = () => {
    const handleNotification = () => {
        toast.custom((t) => (
            <IconNotification
                title="We've just released a new feature"
                description="Check out the all new dashboard view. Pages and exports now load faster."
                confirmLabel="Changelog"
                color="brand"
                onClose={() => toast.dismiss(t)}
                onConfirm={() => toast.dismiss(t)}
            />
        ));
    };

    return (
        <div className="absolute inset-0 flex cursor-pointer items-center justify-center px-4" onClick={handleNotification}>
            {/* THIS IS FOR PREVIEW ONLY. */}
            <div className="w-full max-w-sm -translate-y-2">
                <IconNotification
                    title="We've just released a new feature"
                    description="Check out the all new dashboard view. Pages and exports now load faster."
                    confirmLabel="Changelog"
                    color="brand"
                />
            </div>
        </div>
    );
};
