import React, { useEffect, useState } from 'react';
import {
  Pivot, PivotItem,
  Breadcrumb, IBreadcrumbItem,
} from '@fluentui/react';
import {
  BrowserRouter as Router, Route, Switch, Redirect, Link,
} from 'react-router-dom';
import 'office-ui-fabric-react/dist/css/fabric.css';

import { ResultTypeReport } from './reports/resultType/ResultTypeReport';
import { TableLogsReport } from './reports/tableLogs/TableLogsReport';
import { DynamicLogsReport } from './reports/dynamicLogs/DynamicLogsReport';
import { Target } from './reports/target/Target';
import { MenuNav, KeyMenu, MenuHeaderTexts } from './MenuNav';
import { MenuCommandBar } from './MenuCommandBar';

export type MenuProps = {
  systemId: string;
};

const BackendMenu = ({ systemId }: MenuProps) => {
  const [backendBreadCrumbItems, setBackendBreadCrumbItems] = useState([
    {
      text: KeyMenu.Backend, key: MenuHeaderTexts.Backend,
    },
    {
      text: MenuHeaderTexts.Dynamic as string,
      key: MenuHeaderTexts.Dynamic as string,
      isCurrentItem: true,
    },
  ]);

  const handleChangePivotItem = (headerText: string | undefined) => {
    if (!headerText) return;
    setBackendBreadCrumbItems([
      backendBreadCrumbItems[0],
      {
        text: headerText, key: headerText, isCurrentItem: true,
      },
    ]);
  };

  return (
    <>
      <Breadcrumb
        items={backendBreadCrumbItems}
        maxDisplayedItems={10}
      />
      <Pivot onLinkClick={(item: PivotItem | undefined) => handleChangePivotItem(item?.props?.headerText)}>
        <PivotItem key={KeyMenu.Dynamic} headerText={MenuHeaderTexts.Dynamic}>
          <React.Suspense fallback="отчет...">
            <DynamicLogsReport systemId={systemId} />
          </React.Suspense>
        </PivotItem>
        <PivotItem key={KeyMenu.Table} headerText={MenuHeaderTexts.Table}>
          <React.Suspense fallback="отчет...">
            <TableLogsReport systemId={systemId} />
          </React.Suspense>
        </PivotItem>
        <PivotItem key={KeyMenu.ResultType} headerText={MenuHeaderTexts.ResultType}>
          <React.Suspense fallback="отчет...">
            <ResultTypeReport systemId={systemId} />
          </React.Suspense>
        </PivotItem>
        <PivotItem
          key={KeyMenu.ResultTypeInterval}
          headerText={MenuHeaderTexts.ResultTypeInterval}
        >
          Количество типов запросов поинтервально за период
        </PivotItem>
      </Pivot>
    </>
  );
};

const FrontendMenu = ({ systemId }: MenuProps) => {
  const [frontendBreadCrumbItems, setFrontendBreadCrumbItems] = useState([
    {
      text: KeyMenu.Frontend, key: KeyMenu.Frontend,
    },
    {
      text: MenuHeaderTexts.TargetKey as string,
      key: MenuHeaderTexts.TargetKey as string,
      isCurrentItem: true,
    },
  ]);

  const handleChangePivotItem = (headerText: string | undefined) => {
    if (!headerText) return;
    setFrontendBreadCrumbItems([
      frontendBreadCrumbItems[0],
      {
        text: headerText, key: headerText, isCurrentItem: true,
      },
    ]);
  };

  return (
    <>
      <MenuCommandBar systemId={systemId} />
      <Breadcrumb
        items={frontendBreadCrumbItems}
        maxDisplayedItems={10}
      />
      <Pivot onLinkClick={(item: PivotItem | undefined) => handleChangePivotItem(item?.props?.headerText)}>
        <PivotItem key={KeyMenu.TargetKey} headerText="Цели">
          <React.Suspense fallback="цели загружаются">
            <Target systemId={systemId} />
          </React.Suspense>
        </PivotItem>
      </Pivot>
    </>
  );
};

export function Menu({ systemId }: MenuProps): JSX.Element {
  return (
    <>
      <Router>
        <div className="ms-Grid" dir="ltr">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm1 ms-xl1">
              <MenuNav />
            </div>
            <div className="main-element ms-Grid-col ms-sm11 ms-xl11">
              <div className="ms-Grid-row" />
              <div className="ms-Grid-row">
                <Switch>
                  <Redirect exact from="/" to={`/${KeyMenu.Frontend}`} />
                  <Route exact path={`/${KeyMenu.Frontend}`} render={() => <FrontendMenu systemId={systemId} />} />
                  <Route exact path={`/${KeyMenu.Backend}`} render={() => <BackendMenu systemId={systemId} />} />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </Router>
    </>
  );
}
