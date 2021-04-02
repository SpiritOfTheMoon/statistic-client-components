import React, { useState } from 'react';
import {
  Pivot, PivotItem,
  Breadcrumb, IBreadcrumbItem,
} from '@fluentui/react';
import 'office-ui-fabric-react/dist/css/fabric.css';

import { Target } from './reports/target/Target';
import { Viewer } from './reports/viewersReport/Viewer';
import { KeyMenu, MenuKeyHeaderMap } from './MenuNav';
import { MenuCommandBar } from './MenuCommandBar';

export type FrontendMenuProps = {
  systemId: string;
  selectedKey: string | undefined;
  history: any;
};

export function FrontendMenu({ systemId, selectedKey, history }: FrontendMenuProps): JSX.Element {
  const [key, setKey] = useState(selectedKey);
  const urlText = (selectedKey
    ? MenuKeyHeaderMap.get(selectedKey as KeyMenu)
    : MenuKeyHeaderMap.get(key as KeyMenu)) || '';
  const [text, setText] = useState(urlText);

  const frontendBreadCrumbItems: IBreadcrumbItem[] = [
    {
      text: KeyMenu.Frontend, key: KeyMenu.Frontend,
    },
    {
      text: urlText, key: selectedKey || '', isCurrentItem: true,
    },
  ];

  const handleSwitchingPivotItem = (headerText: string | undefined, itemKey: string | undefined) => {
    if (!headerText) return;
    if (!itemKey) return;
    history.push({
      pathname: `/${KeyMenu.Frontend}/${itemKey}`,
    });
    setKey(itemKey);
    setText(headerText);
  };

  return (
    <>
      <Breadcrumb items={frontendBreadCrumbItems} />
      <Pivot
        selectedKey={selectedKey}
        onLinkClick={
          (item: PivotItem | undefined) => handleSwitchingPivotItem(item?.props?.headerText, item?.props?.itemKey)
        }
      >
        <PivotItem
          key={KeyMenu.TargetKey}
          itemKey={KeyMenu.TargetKey}
          headerText={MenuKeyHeaderMap.get(KeyMenu.TargetKey)}
        >
          <React.Suspense fallback="цели загружаются">
            <Target systemId={systemId} />
          </React.Suspense>
        </PivotItem>
        <PivotItem
          key={KeyMenu.VisitorKey}
          itemKey={KeyMenu.VisitorKey}
          headerText={MenuKeyHeaderMap.get(KeyMenu.VisitorKey)}
        >
          <React.Suspense fallback="пользователи загружаются">
            <Viewer systemId={systemId} />
          </React.Suspense>
        </PivotItem>
      </Pivot>
    </>
  );
}
