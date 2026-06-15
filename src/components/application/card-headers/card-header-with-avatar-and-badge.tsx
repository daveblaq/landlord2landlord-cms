import { Copy01, Edit01, Trash01 } from "@untitledui/icons";
import { Avatar } from "@/components/base/avatar/avatar";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { Dropdown } from "@/components/base/dropdown/dropdown";

export const CardHeaderAvatarWithBadge = () => {
    return (
        <div className="relative flex flex-col items-start gap-4 border-b border-secondary bg-primary px-4 py-5 md:flex-row md:px-6">
            <div className="flex flex-1 items-start gap-3">
                <Avatar className="md:hidden" size="lg" src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80" alt="Olivia Rhye" />
                <Avatar className="hidden md:flex" size="lg" src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80" alt="Olivia Rhye" />
                <div>
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg font-semibold text-primary">Olivia Rhye</h2>
                        <Badge color="brand" size="sm">
                            New user
                        </Badge>
                    </div>
                    <p className="text-sm text-tertiary">olivia@untitledui.com</p>
                </div>
            </div>
            <div className="flex gap-3">
                <Button color="tertiary" size="sm" className="max-md:hidden">
                    Tertiary
                </Button>
                <Button color="secondary" size="sm">
                    Secondary
                </Button>
                <Button size="sm">Primary</Button>
            </div>
            <div className="absolute top-5 right-4 md:static">
                <Dropdown.Root>
                    <Dropdown.DotsButton />

                    <Dropdown.Popover className="w-min">
                        <Dropdown.Menu>
                            <Dropdown.Item icon={Edit01}>
                                <span className="pr-4">Edit</span>
                            </Dropdown.Item>
                            <Dropdown.Item icon={Copy01}>
                                <span className="pr-4">Copy link</span>
                            </Dropdown.Item>
                            <Dropdown.Item icon={Trash01}>
                                <span className="pr-4">Delete</span>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown.Popover>
                </Dropdown.Root>
            </div>
        </div>
    );
};
