import React, { useState } from 'react';
import {
  CommandBar, ICommandBarItemProps, ICommandBarStyles,
  DialogType,
} from '@fluentui/react';
import { CreateTargetDialog } from '@umk-stat/statistic-client-modals';

const commandBarStyles: ICommandBarStyles = {
  root: {
    border: '1px solid #eee',
    marginLeft: '-29px',
    paddingLeft: '29px',
  },
};

const dialogContentProps = {
  type: DialogType.normal,
  title: 'Добавить цель',
};

export type MenuCommandBarProps = {
  systemId: string;
};

export const MenuCommandBar = ({ systemId }: MenuCommandBarProps) => {
  const [dialogHidden, setDialogHidden] = useState(true);

  const overflowItems: ICommandBarItemProps[] = [
    {
      key: 'createTarget', text: 'Добавить цель', onClick: () => setDialogHidden(false), iconProps: { iconName: 'Edit' },
    },
  ];

  return (
  <>
    <CommandBar
      items={[]}
      overflowItems={overflowItems}
      styles={commandBarStyles}
    />
    <CreateTargetDialog
      dialogContentProps={dialogContentProps}
      hidden={dialogHidden}
      onDismiss={() => setDialogHidden(true)}
      systemID={systemId}
    />
  </>
);
};
