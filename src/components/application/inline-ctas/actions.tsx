import { Button } from "@/components/base/buttons/button";

export const InlineCTAActions = () => {
    return (
        <div className="w-full flex-1 rounded-xl bg-primary p-4 shadow-xs ring-1 ring-secondary ring-inset sm:p-6">
            <div className="flex flex-col">
                <h3 className="text-md font-semibold text-primary">We've just released a new update!</h3>
                <p className="mt-0.5 text-sm text-tertiary">Check out the all new dashboard view. Pages and now load faster.</p>
                <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row">
                    <Button color="secondary" size="sm">
                        Dismiss
                    </Button>
                    <Button size="sm">Changelog</Button>
                </div>
            </div>
        </div>
    );
};
