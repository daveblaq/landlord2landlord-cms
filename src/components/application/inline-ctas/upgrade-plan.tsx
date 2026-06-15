import { CheckCircle } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";

export const InlineCTAUpgradePlan = () => {
    return (
        <div className="w-full flex-1 rounded-xl bg-primary px-4 py-5 shadow-xs ring-1 ring-secondary ring-inset sm:p-6">
            <div className="flex flex-col">
                <h3 className="text-md font-semibold text-primary">Upgrade your plan</h3>
                <p className="mt-0.5 text-sm text-tertiary">Need more space? Upgrade your plan today.</p>
                <ul className="mt-5 flex flex-col gap-4">
                    {[
                        { title: "10 users", subtitle: "Add up to 10 team members." },
                        { title: "20 GB data", subtitle: "Up to 20 GB individual data." },
                        { title: "All features", subtitle: "Access to advanced features and analytics." },
                    ].map((item) => (
                        <li key={item.title} className="flex gap-3">
                            <CheckCircle aria-hidden="true" className="size-6 shrink-0 text-fg-success-primary" />
                            <div className="flex flex-col gap-0.5">
                                <p className="text-md font-medium text-secondary">{item.title}</p>
                                <p className="text-md text-tertiary">{item.subtitle}</p>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row">
                    <Button color="secondary" size="sm">
                        All plans
                    </Button>
                    <Button size="sm">Upgrade plan</Button>
                </div>
            </div>
        </div>
    );
};
