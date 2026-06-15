import { FileIcon } from "@untitledui/file-icons";
import { Button } from "@/components/base/buttons/button";

export const InlineCTAReceipt = () => {
    return (
        <div className="w-full flex-1 rounded-xl bg-primary p-6 shadow-xs ring-1 ring-secondary ring-inset">
            <div className="flex flex-col">
                <h3 className="text-md font-semibold text-primary">Your latest receipt is available</h3>
                <p className="mt-0.5 text-sm text-tertiary">Download receipt for January 2025.</p>
                <div className="mt-5 flex flex-col gap-5 rounded-lg bg-primary sm:flex-row sm:gap-4 sm:border sm:border-secondary sm:p-4">
                    <div className="flex flex-1 items-start gap-3">
                        <FileIcon type="pdf" theme="light" className="size-10 dark:hidden" />
                        <FileIcon type="pdf" theme="dark" className="size-10 not-dark:hidden" />

                        <div>
                            <p className="text-sm font-medium text-secondary">Receipt_January_2025.pdf</p>
                            <p className="text-sm text-tertiary">200 KB</p>
                        </div>
                    </div>
                    <div className="flex flex-col-reverse gap-3 sm:flex-row">
                        <Button color="secondary" size="sm">
                            Download
                        </Button>
                        <Button size="sm">View</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
