import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";


export const DisabledIndividualButton = () => (
    <ButtonGroup size="sm" selectedKeys={[]}>
        <ButtonGroupItem id="archive">Archive</ButtonGroupItem>
        <ButtonGroupItem id="edit">Edit</ButtonGroupItem>
        <ButtonGroupItem isDisabled id="delete">
            Delete
        </ButtonGroupItem>
    </ButtonGroup>
);