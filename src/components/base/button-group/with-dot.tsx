import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { Dot } from "@/components/foundations/dot-icon";


export const ButtonGroupDot = () => (
    <ButtonGroup size="sm" selectedKeys={["archive"]}>
        <ButtonGroupItem id="archive" iconLeading={<Dot className="mx-0.75 size-2 text-fg-success-secondary in-disabled:text-fg-disabled_subtle" />}>
            Text
        </ButtonGroupItem>
        <ButtonGroupItem id="edit" iconLeading={<Dot className="mx-0.75 size-2 text-fg-success-secondary in-disabled:text-fg-disabled_subtle" />}>
            Text
        </ButtonGroupItem>
        <ButtonGroupItem id="delete" isDisabled iconLeading={<Dot className="mx-0.75 size-2 text-fg-success-secondary in-disabled:text-fg-disabled_subtle" />}>
            Text
        </ButtonGroupItem>
    </ButtonGroup>
);