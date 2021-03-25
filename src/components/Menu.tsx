import React, { useEffect, useState } from 'react';
import {
  Pivot, PivotItem,
  Breadcrumb, IBreadcrumbItem,
} from '@fluentui/react';
import {
  BrowserRouter as Router, Route, Switch, Redirect, withRouter,
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

export type BackendMenuProps = {
  systemId: string;
  searchParams: URLSearchParams;
  history: any;
};

const BackendMenu = ({ systemId, searchParams, history }: BackendMenuProps) => {
  const urlKey = searchParams.get('key') || '';
  const urlText = searchParams.get('text') || '';
  const [key, setKey] = useState(searchParams.get('key') || '');
  const [text, setText] = useState(searchParams.get('text') || '');

  const backendBreadCrumbItems: IBreadcrumbItem[] = [
    {
      text: KeyMenu.Backend, key: KeyMenu.Backend,
    },
    {
      text: urlText || text, key: urlKey || text, isCurrentItem: true,
    },
  ];

  const handleSwitchingPivotItem = (headerText: string | undefined, itemKey: string | undefined) => {
    if (!headerText) return;
    if (!itemKey) return;
    history.push({
      pathname: `/${KeyMenu.Backend}`,
      search: `?key=${itemKey}&header=${headerText}`,
    });
    setKey(itemKey);
    setText(headerText);
  };

  return (
    <>
      <Breadcrumb items={backendBreadCrumbItems} />
      <Pivot
        selectedKey={urlKey || key}
        onLinkClick={
          (item: PivotItem | undefined) => handleSwitchingPivotItem(item?.props?.headerText, item?.props?.itemKey)
        }
      >
        <PivotItem key={KeyMenu.Dynamic} itemKey={KeyMenu.Dynamic} headerText={MenuHeaderTexts.Dynamic}>
          <React.Suspense fallback="отчет...">
            <DynamicLogsReport systemId={systemId} />
          </React.Suspense>
        </PivotItem>
        <PivotItem key={KeyMenu.Table} itemKey={KeyMenu.Table} headerText={MenuHeaderTexts.Table}>
          <React.Suspense fallback="отчет...">
            <TableLogsReport systemId={systemId} />
          </React.Suspense>
        </PivotItem>
        <PivotItem key={KeyMenu.ResultType} itemKey={KeyMenu.ResultType} headerText={MenuHeaderTexts.ResultType}>
          <React.Suspense fallback="отчет...">
            <ResultTypeReport systemId={systemId} />
          </React.Suspense>
        </PivotItem>
        <PivotItem
          key={KeyMenu.ResultTypeInterval}
          itemKey={KeyMenu.ResultTypeInterval}
          headerText={MenuHeaderTexts.ResultTypeInterval}
        >
          Количество типов запросов поинтервально за период
        </PivotItem>
      </Pivot>
    </>
  );
};

export type FrontendMenuProps = {
  systemId: string;
  searchParams: URLSearchParams;
  history: any;
};

const FrontendMenu = ({ systemId, searchParams, history }: FrontendMenuProps) => {
  const key = searchParams.get('key') || '';
  const text = searchParams.get('text') || '';

  const frontendBreadCrumbItems: IBreadcrumbItem[] = [
    {
      text: KeyMenu.Frontend, key: KeyMenu.Frontend,
    },
    {
      text, key, isCurrentItem: true,
    },
  ];

  const [frontendBreadCrumbs, setFrontendBreadCrumbs] = useState(frontendBreadCrumbItems);

  const handleSwitchingPivotItem = (headerText: string | undefined, itemKey: string | undefined) => {
    if (!headerText) return;
    if (!itemKey) return;
    history.push({
      pathname: `/${KeyMenu.Frontend}`,
      search: `?key=${itemKey}&header=${headerText}`,
    });
    setFrontendBreadCrumbs([
      frontendBreadCrumbs[0],
      {
        text: headerText, key: itemKey, isCurrentItem: true,
      },
    ]);
  };

  return (
    <>
      <MenuCommandBar systemId={systemId} />
      <Breadcrumb items={frontendBreadCrumbs} />
      <Pivot
        selectedKey={key}
        onLinkClick={
          (item: PivotItem | undefined) => handleSwitchingPivotItem(item?.props?.headerText, item?.props?.itemKey)
        }
      >
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
                  <Redirect exact from="/" to={`/${KeyMenu.Frontend}?key=${KeyMenu.TargetKey}&text=${MenuHeaderTexts.TargetKey}`} />
                  <Route
                    exact
                    path={`/${KeyMenu.Frontend}`}
                    render={
                      (props) => (
                        <FrontendMenu
                          systemId={systemId}
                          searchParams={new URLSearchParams(props.location.search)}
                          history={props.history}
                        />
                      )
                    }
                  />
                  <Route
                    exact
                    path={`/${KeyMenu.Backend}`}
                    render={
                      (props) => (
                        <BackendMenu
                          systemId={systemId}
                          searchParams={new URLSearchParams(props.location.search)}
                          history={props.history}
                        />
                      )
                    }
                  />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </Router>
    </>
  );
}
