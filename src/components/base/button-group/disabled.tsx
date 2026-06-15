import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";


export const DisabledAll = () => (
    <ButtonGroup size="sm" isDisabled>
        <ButtonGroupItem id="archive">Archive</ButtonGroupItem>
        <ButtonGroupItem id="edit">Edit</ButtonGroupItem>
        <ButtonGroupItem id="delete">Delete</ButtonGroupItem>
    </ButtonGroup>
);