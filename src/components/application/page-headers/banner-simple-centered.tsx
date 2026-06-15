import { ArrowLeft, HomeLine, SearchLg } from "@untitledui/icons";
import { Breadcrumbs } from "@/components/application/breadcrumbs/breadcrumbs";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";

export const PageHeaderBannerSimpleCentered = () => {
    return (
        <div className="relative flex flex-col items-center gap-5 bg-primary px-1 pt-1 md:gap-0">
            <div className="h-40 w-full rounded-xl bg-linear-to-t from-[#FBC5EC] to-[#A5C0EE] lg:h-60" />

            <div className="flex w-full max-w-(--breakpoint-xl) px-3 md:px-8">
                <div className="flex w-full flex-col items-center gap-4 border-b border-secondary pb-4 md:gap-5 md:pt-8 lg:pb-6">
                    <div className="max-md:hidden">
                        <Breadcrumbs type="button" maxVisibleItems={3}>
                            <Breadcrumbs.Item href="#" icon={HomeLine} />
                            <Breadcrumbs.Item href="#">Settings</Breadcrumbs.Item>
                            <Breadcrumbs.Item href="#">Company</Breadcrumbs.Item>
                            <Breadcrumbs.Item href="#">Team</Breadcrumbs.Item>
                        </Breadcrumbs>
                    </div>
                    <div className="flex self-start md:hidden">
                        <Button href="#" color="link-gray" size="sm" iconLeading={ArrowLeft}>
                            Back
                        </Button>
                    </div>
                    <div className="flex flex-col items-center gap-0.5 lg:gap-1">
                        <h1 className="text-xl font-semibold text-primary lg:text-display-xs">Olivia Rhye</h1>
                        <p className="text-md text-balance text-tertiary">olivia@untitledui.com</p>
                    </div>
                    <div className="flex w-full justify-center gap-3">
                        <Button color="tertiary" size="sm" className="max-md:hidden">
                            Tertiary
                        </Button>
                        <Button color="secondary" size="sm" className="flex-1 md:flex-none">
                            Secondary
                        </Button>
                        <Button color="primary" size="sm" className="flex-1 md:flex-none">
                            Primary
                        </Button>
                    </div>
                    <Input shortcut className="w-full md:max-w-80" size="sm" aria-label="Search" placeholder="Search" icon={SearchLg} />
                </div>
            </div>
        </div>
    );
};
