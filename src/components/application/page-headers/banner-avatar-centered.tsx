import { ArrowLeft, HomeLine, SearchLg } from "@untitledui/icons";
import { Breadcrumbs } from "@/components/application/breadcrumbs/breadcrumbs";
import { AvatarProfilePhoto } from "@/components/base/avatar/avatar-profile-photo";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";

export const PageHeaderBannerAvatarCentered = () => {
    return (
        <div className="relative flex flex-col items-center bg-primary px-1 pt-1">
            <div className="h-40 w-full rounded-xl bg-linear-to-t from-[#FBC5EC] to-[#A5C0EE] lg:h-60" />

            <div className="relative -mt-12 w-full max-w-(--breakpoint-xl) px-3 md:-mt-16 md:px-8">
                <div className="absolute top-22 left-0 z-10 flex max-md:hidden">
                    <Breadcrumbs type="button" maxVisibleItems={3}>
                        <Breadcrumbs.Item href="#" icon={HomeLine} />
                        <Breadcrumbs.Item href="#">Settings</Breadcrumbs.Item>
                        <Breadcrumbs.Item href="#">Company</Breadcrumbs.Item>
                        <Breadcrumbs.Item href="#">Team</Breadcrumbs.Item>
                    </Breadcrumbs>
                </div>
                <div className="relative flex flex-col items-center gap-4 border-b border-secondary pb-4 md:gap-5 md:pb-5">
                    <div className="absolute top-17 left-0 flex md:hidden">
                        <Button href="#" color="link-gray" size="sm" iconLeading={ArrowLeft}>
                            Back
                        </Button>
                    </div>
                    <AvatarProfilePhoto
                        verified
                        className="lg:hidden"
                        size="md"
                        src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80"
                        alt="Olivia Rhye"
                    />
                    <AvatarProfilePhoto
                        verified
                        className="max-lg:hidden"
                        size="lg"
                        src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80"
                        alt="Olivia Rhye"
                    />
                    <div className="flex w-full flex-col items-center gap-4 md:gap-5">
                        <div className="flex flex-col items-center gap-0.5 lg:gap-1">
                            <h1 className="text-xl font-semibold text-primary md:text-display-xs">Olivia Rhye</h1>
                            <p className="text-md text-balance text-tertiary">olivia@untitledui.com</p>
                        </div>
                        <div className="flex w-full justify-center gap-3">
                            <Button color="tertiary" size="sm" className="max-md:hidden">
                                Tertiary
                            </Button>
                            <Button color="secondary" size="sm" className="flex-1 md:flex-none">
                                Secondary
                            </Button>
                            <Button size="sm" className="flex-1 md:flex-none">
                                Primary
                            </Button>
                        </div>
                        <Input shortcut className="w-full md:max-w-80" size="sm" aria-label="Search" placeholder="Search" icon={SearchLg} />
                    </div>
                </div>
            </div>
        </div>
    );
};