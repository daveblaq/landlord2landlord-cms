import { toast } from "sonner";
import { AvatarNotification } from "@/components/application/notifications/notifications";

export const AvatarNotificationDemo = () => {
    const handleNotification = () => {
        toast.custom(
            (t) => (
                <AvatarNotification
                    name="Katherine Moss"
                    content="I've finished adding my notes. Happy for us to review whenever you're ready!"
                    confirmLabel="Changelog"
                    avatar="https://www.untitledui.com/images/avatars/katherine-moss?fm=webp&q=80"
                    date="2 mins ago"
                    onClose={() => toast.dismiss(t)}
                    onConfirm={() => toast.dismiss(t)}
                />
            ),
            {
                duration: 100000,
            },
        );
    };

    return (
        <div className="absolute inset-0 flex cursor-pointer items-center justify-center px-4" onClick={handleNotification}>
            <div className="w-full max-w-sm -translate-y-2">
                <AvatarNotification
                    name="Katherine Moss"
                    content="I've finished adding my notes. Happy for us to review whenever you're ready!"
                    confirmLabel="Changelog"
                    avatar="https://www.untitledui.com/images/avatars/katherine-moss?fm=webp&q=80"
                    date="2 mins ago"
                />
            </div>
        </div>
    );
};
