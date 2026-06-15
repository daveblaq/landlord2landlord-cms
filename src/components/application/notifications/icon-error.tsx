import { toast } from "sonner";
import { IconNotification } from "@/components/application/notifications/notifications";

export const ErrorNotificationDemo = () => {
    const handleNotification = () => {
        toast.custom((t) => (
            <IconNotification
                title="This project has been unpublished"
                description="Removing all users has unpublished this project. Add users to republish."
                confirmLabel="Undo action"
                color="error"
                hideDismissLabel={true}
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
                    title="This project has been unpublished"
                    description="Removing all users has unpublished this project. Add users to republish."
                    confirmLabel="Undo action"
                    color="error"
                    hideDismissLabel={true}
                />
            </div>
        </div>
    );
};
