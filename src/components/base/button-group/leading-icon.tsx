import { Archive, Edit03, Trash01 } from "@untitledui/icons";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";

export const LeadingIcon = () => (
    <ButtonGroup size="sm" selectedKeys={[]}>
        <ButtonGroupItem id="archive" iconLeading={Archive}>
            Archive
        </ButtonGroupItem>
        <ButtonGroupItem id="edit" iconLeading={Edit03}>
            Edit
        </ButtonGroupItem>
        <ButtonGroupItem id="delete" iconLeading={Trash01}>
            Delete
        </ButtonGroupItem>
    </ButtonGroup>
);
