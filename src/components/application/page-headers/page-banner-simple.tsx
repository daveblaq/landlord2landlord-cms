import { ArrowLeft, HomeLine, SearchLg } from "@untitledui/icons";
import { Breadcrumbs } from "@/components/application/breadcrumbs/breadcrumbs";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";

export const PageHeaderBannerSimple = () => {
    return (
        <div className="relative flex flex-col bg-primary px-1 pt-1">
            <div className="h-40 w-full rounded-xl bg-linear-to-t from-[#FBC5EC] to-[#A5C0EE] lg:h-60" />

            <div className="m-auto flex w-full max-w-(--breakpoint-xl) flex-col gap-4 px-4 pt-5 lg:px-8 lg:pt-6">
                <div className="max-lg:hidden">
                    <Breadcrumbs type="button" maxVisibleItems={3}>
                        <Breadcrumbs.Item href="#" icon={HomeLine} />
                        <Breadcrumbs.Item href="#">Settings</Breadcrumbs.Item>
                        <Breadcrumbs.Item href="#">Company</Breadcrumbs.Item>
                        <Breadcrumbs.Item href="#">Team</Breadcrumbs.Item>
                    </Breadcrumbs>
                </div>
                <Button href="#" color="link-gray" size="sm" className="lg:hidden" iconLeading={ArrowLeft}>
                    Back
                </Button>
                <div className="flex flex-col flex-wrap gap-x-4 gap-y-5 border-b border-secondary pb-4 lg:flex-row lg:justify-between lg:pb-6">
                    <div className="flex w-full min-w-60 flex-1 flex-col gap-0.5 lg:gap-1">
                        <h1 className="text-xl font-semibold text-primary lg:text-display-xs">Team members</h1>
                        <p className="text-md text-tertiary">Manage your team members and their account permissions here.</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <Button color="tertiary" size="sm" className="max-lg:hidden">
                            Tertiary
                        </Button>
                        <Button color="secondary" size="sm">
                            Secondary
                        </Button>
                        <Button size="sm">Primary</Button>
                    </div>
                    <Input shortcut className="max-w-80 min-w-50 flex-1" size="sm" placeholder="Search" icon={SearchLg} />
                </div>
            </div>
        </div>
    );
};
