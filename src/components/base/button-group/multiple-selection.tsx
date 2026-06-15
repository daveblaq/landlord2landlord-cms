import { useState } from "react";
import type { Key } from "react-aria";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";

export const MultipleSelectedItems = () => {
    const [selectedKeys, setSelectedKeys] = useState<Set<Key>>(new Set(["today"]));

    return (
        <ButtonGroup size="sm" selectionMode="multiple" selectedKeys={selectedKeys} onSelectionChange={setSelectedKeys}>
            <ButtonGroupItem id="today">Today</ButtonGroupItem>
            <ButtonGroupItem id="tomorrow">Tomorrow</ButtonGroupItem>
            <ButtonGroupItem id="thisweek">This week</ButtonGroupItem>
        </ButtonGroup>
    );
};
