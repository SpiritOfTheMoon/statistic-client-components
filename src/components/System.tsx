import React, { useState } from 'react';
import { initializeIcons } from '@uifabric/icons';
import {
  Dropdown, IDropdownOption, mergeStyleSets,
  IDropdownStyles,
} from '@fluentui/react';
import { useSystems } from '@umk-stat/statistic-client-relay';
import { Menu } from './Menu';

export type SystemProps = {
  systemId: string;
};

const classNames = mergeStyleSets({
  header: {
    backgroundColor: '#0078D4',
    color: 'white',
    lineHeight: '50px',
    padding: '0px 25px',
    display: 'flex',
    justifyContent: 'space-between',
  },
});

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: {
    width: 300,
    marginTop: '10px',
  },
};

export function System(): JSX.Element {
  initializeIcons();
  const { systems } = useSystems({ fetchPolicy: 'store-and-network' }, {});

  if (systems.length === 0) {
    throw new Error('Нет систем, создайте системы');
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
      <header className={`${classNames.header}`}>
        <div>Статистика</div>
        <Dropdown
          options={options}
          onChange={onChange}
          placeholder="Выберите систему"
          defaultSelectedKey={systemId}
          styles={dropdownStyles}
        />
      </header>
      <Menu systemId={systemId} />
    </div>
  );
}
