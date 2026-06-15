import { ArrowLeft, HomeLine, SearchLg } from "@untitledui/icons";
import { Breadcrumbs } from "@/components/application/breadcrumbs/breadcrumbs";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";

export const PageHeaderSimple = () => {
    return (
        <div className="relative flex flex-col gap-4 bg-primary">
            <div className="max-lg:hidden">
                <Breadcrumbs type="button" maxVisibleItems={3}>
                    <Breadcrumbs.Item href="#" icon={HomeLine} />
                    <Breadcrumbs.Item href="#">Settings</Breadcrumbs.Item>
                    <Breadcrumbs.Item href="#">Company</Breadcrumbs.Item>
                    <Breadcrumbs.Item href="#">Team</Breadcrumbs.Item>
                </Breadcrumbs>
            </div>
            <div className="flex lg:hidden">
                <Button href="#" color="link-gray" size="sm" iconLeading={ArrowLeft}>
                    Back
                </Button>
            </div>
            <div className="flex flex-col gap-4 border-b border-secondary pb-4 lg:flex-row">
                <div className="flex flex-1 flex-col gap-0.5 md:gap-1">
                    <h1 className="text-xl font-semibold text-primary lg:text-display-xs">Team members</h1>
                    <p className="text-md text-tertiary">Manage your team members and their account permissions here. </p>
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
                <Input shortcut className="w-full md:max-w-80" size="sm" aria-label="Search" placeholder="Search" icon={SearchLg} />
            </div>
        </div>
    );
};