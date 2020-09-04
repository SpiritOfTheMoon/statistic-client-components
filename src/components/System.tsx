import React, { useState } from "react";
import { initializeIcons } from "@uifabric/icons";
import { Menu } from "./Menu";
import { Dropdown, IDropdownOption } from "@fluentui/react";
import { useSystems } from "@umk/statistic-client-relay";

export type SystemProps = {
    systemId: string;
};

export function System(): JSX.Element {
    initializeIcons();
    const { systems } = useSystems({ fetchPolicy: "store-and-network" }, {});

    if (systems.length === 0) {

        throw new Error("Нет систем, создайте системы");

    }

    const [systemId, setSystemId] = useState<string>(systems[0].id);
    const onChange = (event: React.FormEvent<HTMLDivElement>, option: IDropdownOption | undefined) => {
        setSystemId(option?.key as string);
    };
    const options: IDropdownOption[] = systems.map<IDropdownOption>((val) => ({
        key: val.id,
        text: val.name,
    }));
    return (
        <div>
            <Dropdown options={options} onChange={onChange} placeholder={"Выберите систему"} defaultSelectedKey={systemId} />
            <Menu systemId={systemId}></Menu>
        </div>
    );

}
