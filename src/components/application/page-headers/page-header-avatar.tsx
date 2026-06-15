import { ArrowLeft, HomeLine, SearchLg } from "@untitledui/icons";
import { Breadcrumbs } from "@/components/application/breadcrumbs/breadcrumbs";
import { Avatar } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";

export const PageHeaderAvatar = () => {
    return (
        <div className="relative m-auto flex flex-col gap-4 bg-primary">
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
                <div className="flex flex-1 items-center gap-3 lg:gap-4">
                    <Avatar size="xl" src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80" alt="Olivia Rhye" />
                    <div>
                        <h1 className="text-xl font-semibold text-primary">Olivia Rhye</h1>
                        <p className="text-md text-balance text-tertiary">olivia@untitledui.com</p>
                    </div>
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
