import React, { useState } from 'react';
import {
  Pivot, PivotItem,
  Breadcrumb, IBreadcrumbItem,
} from '@fluentui/react';
import 'office-ui-fabric-react/dist/css/fabric.css';

import { ResultTypeReport } from './reports/resultType/ResultTypeReport';
import { TableLogsReport } from './reports/tableLogs/TableLogsReport';
import { DynamicLogsReport } from './reports/dynamicLogs/DynamicLogsReport';
import { KeyMenu, MenuKeyHeaderMap } from './MenuNav';

export type BackendMenuProps = {
  systemId: string;
  selectedKey: string | undefined;
  history: any;
};

export function BackendMenu({ systemId, selectedKey, history }: BackendMenuProps): JSX.Element {
  const [key, setKey] = useState(selectedKey);
  const urlText = (selectedKey
    ? MenuKeyHeaderMap.get(selectedKey as KeyMenu)
    : MenuKeyHeaderMap.get(key as KeyMenu)) || '';
  const [text, setText] = useState(urlText);

  const backendBreadCrumbItems: IBreadcrumbItem[] = [
    {
      text: KeyMenu.Backend, key: KeyMenu.Backend,
    },
    {
      text: urlText, key: selectedKey || '', isCurrentItem: true,
    },
  ];

  const handleSwitchingPivotItem = (headerText: string | undefined, itemKey: string | undefined) => {
    if (!headerText) return;
    if (!itemKey) return;
    history.push({
      pathname: `/${KeyMenu.Backend}/${itemKey}`,
    });
    setKey(itemKey);
    setText(headerText);
  };

  return (
    <>
      <Breadcrumb items={backendBreadCrumbItems} />
      <Pivot
        selectedKey={selectedKey}
        onLinkClick={
          (item: PivotItem | undefined) => handleSwitchingPivotItem(item?.props?.headerText, item?.props?.itemKey)
        }
      >
        <PivotItem key={KeyMenu.Dynamic} itemKey={KeyMenu.Dynamic} headerText={MenuKeyHeaderMap.get(KeyMenu.Dynamic)}>
          <React.Suspense fallback="отчет...">
            <DynamicLogsReport systemId={systemId} />
          </React.Suspense>
        </PivotItem>
        <PivotItem key={KeyMenu.Table} itemKey={KeyMenu.Table} headerText={MenuKeyHeaderMap.get(KeyMenu.Table)}>
          <React.Suspense fallback="отчет...">
            <TableLogsReport systemId={systemId} />
          </React.Suspense>
        </PivotItem>
        <PivotItem
          key={KeyMenu.ResultType}
          itemKey={KeyMenu.ResultType}
          headerText={MenuKeyHeaderMap.get(KeyMenu.ResultType)}
        >
          <React.Suspense fallback="отчет...">
            <ResultTypeReport systemId={systemId} />
          </React.Suspense>
        </PivotItem>
        <PivotItem
          key={KeyMenu.ResultTypeInterval}
          itemKey={KeyMenu.ResultTypeInterval}
          headerText={MenuKeyHeaderMap.get(KeyMenu.ResultTypeInterval)}
        >
          Количество типов запросов поинтервально за период
        </PivotItem>
      </Pivot>
    </>
  );
}
