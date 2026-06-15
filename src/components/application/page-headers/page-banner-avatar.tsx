import { ArrowLeft, HomeLine, SearchLg } from "@untitledui/icons";
import { Breadcrumbs } from "@/components/application/breadcrumbs/breadcrumbs";
import { AvatarProfilePhoto } from "@/components/base/avatar/avatar-profile-photo";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";

export const PageHeaderBannerAvatar = () => {
    return (
        <div className="relative flex flex-col bg-primary px-1 pt-1">
            <div className="h-40 w-full rounded-xl bg-linear-to-t from-[#FBC5EC] to-[#A5C0EE] lg:h-60" />

            <div className="m-auto -mt-12 w-full max-w-(--breakpoint-xl) px-3 lg:-mt-10 lg:px-8">
                <div className="flex flex-col gap-4 border-b border-secondary pb-4 lg:flex-row lg:gap-5 lg:pb-6">
                    <div className="flex justify-between">
                        <AvatarProfilePhoto
                            verified
                            size="md"
                            alt="Olivia Rhye"
                            className="lg:hidden"
                            src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80"
                        />
                        <AvatarProfilePhoto
                            verified
                            size="lg"
                            alt="Olivia Rhye"
                            className="max-lg:hidden"
                            src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80"
                        />
                        <Button color="link-gray" size="sm" href="#" className="translate-y-2 self-end lg:hidden" iconLeading={ArrowLeft}>
                            Back
                        </Button>
                    </div>
                    <div className="flex w-full flex-col gap-x-4 gap-y-5 lg:pt-16">
                        <Breadcrumbs type="button" maxVisibleItems={3} className="max-lg:hidden">
                            <Breadcrumbs.Item href="#" icon={HomeLine} />
                            <Breadcrumbs.Item href="#">Settings</Breadcrumbs.Item>
                            <Breadcrumbs.Item href="#">Company</Breadcrumbs.Item>
                            <Breadcrumbs.Item href="#">Team</Breadcrumbs.Item>
                        </Breadcrumbs>
                        <div className="flex flex-1 flex-col flex-wrap gap-4 lg:flex-row">
                            <div className="flex min-w-60 flex-1 flex-col gap-0.5 lg:gap-1">
                                <h1 className="text-xl font-semibold text-primary lg:text-display-xs">Olivia Rhye</h1>
                                <p className="text-md text-balance text-tertiary">olivia@untitledui.com</p>
                            </div>
                            <div className="flex gap-3">
                                <Button color="tertiary" size="sm" className="max-lg:hidden">
                                    Tertiary
                                </Button>
                                <Button color="secondary" size="sm">
                                    Secondary
                                </Button>
                                <Button size="sm">Primary</Button>{" "}
                            </div>
                            <Input shortcut className="max-w-80 min-w-50 flex-1" size="sm" aria-label="Search" placeholder="Search" icon={SearchLg} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
