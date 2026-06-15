import { toast } from "sonner";
import { ImageNotification } from "@/components/application/notifications/notifications";

export const ImageNotificationDemo = () => {
    const handleNotification = () => {
        toast.custom((t) => (
            <ImageNotification
                title="We've just released a new update!"
                description="Check out the all new dashboard view. Pages and exports now load faster. "
                confirmLabel="Changelog"
                imageMobile="https://www.untitledui.com/application/notification-image.png"
                imageDesktop="https://www.untitledui.com/application/notification-image.png"
                onClose={() => toast.dismiss(t)}
                onConfirm={() => toast.dismiss(t)}
            />
        ));
    };

    return (
        <div className="absolute inset-0 flex cursor-pointer items-center justify-center px-4" onClick={handleNotification}>
            <div className="w-full max-w-124 -translate-y-2">
                <ImageNotification
                    title="We've just released a new update!"
                    description="Check out the all new dashboard view. Pages and exports now load faster. "
                    confirmLabel="Changelog"
                    imageMobile="https://www.untitledui.com/application/notification-image.png"
                    imageDesktop="https://www.untitledui.com/application/notification-image.png"
                />
            </div>
        </div>
    );
};
