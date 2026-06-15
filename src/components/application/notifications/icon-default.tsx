import { Codepen } from "@untitledui/icons";
import { toast } from "sonner";
import { IconNotification } from "@/components/application/notifications/notifications";

export const DefaultNotificationDemo = () => {
    const handleNotification = () => {
        toast.custom((t) => (
            <IconNotification
                title="Version 1.4.1 is now available"
                description="Includes the all new dashboard view. Pages and exports will now load faster. "
                confirmLabel="Install now"
                dismissLabel="Later"
                color="default"
                icon={Codepen}
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
                    title="Version 1.4.1 is now available"
                    description="Includes the all new dashboard view. Pages and exports will now load faster. "
                    confirmLabel="Install now"
                    dismissLabel="Later"
                    color="default"
                    icon={Codepen}
                />
            </div>
        </div>
    );
};
