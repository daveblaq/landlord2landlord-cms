import { Mail01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Form } from "@/components/base/form/form";
import { Input } from "@/components/base/input/input";

export const InlineCTAEmailField = () => {
    return (
        <div className="w-full flex-1 rounded-xl bg-primary px-4 py-5 shadow-xs ring-1 ring-secondary ring-inset sm:p-6">
            <div className="flex flex-col">
                <h3 className="text-md font-semibold text-primary">We've just released a new update!</h3>
                <p className="mt-0.5 text-sm text-tertiary">Check out the all new dashboard view. Pages and now load faster.</p>
                <Form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const data = Object.fromEntries(new FormData(e.currentTarget));
                        console.log("Form data:", data);
                    }}
                    className="mt-5 flex flex-col gap-3 sm:w-full sm:max-w-100 sm:flex-row sm:items-end sm:gap-3"
                >
                    <div className="flex-1">
                        <Input
                            isRequired
                            hideRequiredIndicator
                            size="sm"
                            name="email"
                            label="Subscribe to updates"
                            placeholder="you@untitledui.com"
                            icon={Mail01}
                        />
                    </div>
                    <Button size="sm" type="submit">
                        Subscribe
                    </Button>
                </Form>
            </div>
        </div>
    );
};
