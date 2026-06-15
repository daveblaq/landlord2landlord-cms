import { Mail01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { VisaIcon } from "@/components/foundations/payment-icons";

export const InlineCTAPaymentMethod = () => {
    return (
        <div className="w-full flex-1 rounded-xl bg-primary p-4 pt-5 shadow-xs ring-1 ring-secondary ring-inset sm:p-6">
            <div className="flex flex-col">
                <h3 className="text-md font-semibold text-primary">Payment method</h3>
                <p className="mt-0.5 text-sm text-tertiary">Change how you pay for your plan.</p>
                <div className="mt-5 flex gap-2 rounded-lg bg-primary p-4 ring-1 ring-secondary ring-inset md:gap-4">
                    <VisaIcon className="h-6 w-8.5 md:h-10 md:w-14.5" />
                    <div className="flex flex-1 flex-col gap-2">
                        <div className="flex justify-between gap-2">
                            <div>
                                <p className="text-sm font-medium text-secondary">Visa ending in 1234</p>
                                <p className="text-sm text-tertiary">Expiry 06/2025</p>
                            </div>
                            <Button color="secondary" size="sm">
                                Edit
                            </Button>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Mail01 aria-hidden="true" className="size-4 text-fg-quaternary" />{" "}
                            <span className="text-sm text-tertiary">billing@untitledui.com</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
