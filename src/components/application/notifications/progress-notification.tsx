import { UploadCloud02 } from "@untitledui/icons";
import { toast } from "sonner";
import { IconNotification } from "@/components/application/notifications/notifications";

export const ProgressNotificationDemo = () => {
    const handleUpload = () => {
        let progress = 0;

        const progressToast = toast.custom((t) => (
            <IconNotification
                title="Uploading 'website-FINAL06.fig'"
                description="Please wait while we upload your file."
                confirmLabel="Upload another"
                dismissLabel="Cancel"
                icon={UploadCloud02}
                progress={progress}
                onClose={() => toast.dismiss(t)}
                onConfirm={() => toast.dismiss(t)}
            />
        ));

        // Replace with your own upload and progress update logic
        const progressInterval = setInterval(() => {
            progress += 2;

            if (progress >= 100) {
                clearInterval(progressInterval);
            }

            toast.custom(
                (t) => (
                    <IconNotification
                        title="Uploading 'website-FINAL06.fig'"
                        description="Please wait while we upload your file."
                        confirmLabel="Upload another"
                        dismissLabel="Cancel"
                        icon={UploadCloud02}
                        progress={progress}
                        onClose={() => toast.dismiss(t)}
                        onConfirm={() => toast.dismiss(t)}
                    />
                ),
                {
                    id: progressToast,
                },
            );
        }, 100);
    };

    return (
        <div className="absolute inset-0 flex cursor-pointer items-center justify-center px-4" onClick={handleUpload}>
            <div className="w-full max-w-sm -translate-y-2">
                <IconNotification
                    title="Uploading 'website-FINAL06.fig'"
                    description="Please wait while we upload your file."
                    confirmLabel="Upload another"
                    dismissLabel="Cancel"
                    icon={UploadCloud02}
                    progress={75}
                />
            </div>
        </div>
    );
};
