import { LayersTwo02 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";

export const InlineCTAChangePlan = () => {
    return (
        <div className="w-full flex-1 rounded-xl bg-primary px-4 pt-5 pb-4 shadow-xs ring-1 ring-secondary ring-inset sm:p-6">
            <div className="flex flex-col">
                <h3 className="text-md font-semibold text-primary">Change your plan</h3>
                <p className="mt-0.5 text-sm text-tertiary">Flexible pricing that grows with you.</p>

                <div className="mt-5">
                    <div className="group block overflow-hidden rounded-lg bg-primary ring-1 ring-secondary ring-inset">
                        <div className="flex items-center gap-3 border-b border-secondary py-3 pr-5 pl-4">
                            <FeaturedIcon color="brand" theme="light" size="sm" icon={LayersTwo02} />

                            <span className="text-md font-semibold text-secondary">Basic plan</span>
                        </div>
                        <div className="flex flex-col p-4">
                            <div className="flex flex-col gap-1">
                                <p className="flex items-baseline gap-1">
                                    <span className="text-display-sm font-semibold text-secondary">$10</span>
                                    <span className="text-sm text-tertiary">per month</span>
                                </p>
                                <p className="text-sm text-tertiary">Includes up to 10 users, 20 GB individual data and access to all features.</p>
                            </div>
                            <div className="mt-6 flex flex-row gap-3">
                                <Button color="secondary" size="sm">
                                    Learn more
                                </Button>
                                <Button size="sm">Upgrade plan</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
