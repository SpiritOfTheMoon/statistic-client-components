import React from 'react';
import {
  Nav, Pivot, PivotItem,
} from '@fluentui/react';
import {
  BrowserRouter as Router, Route, Switch, Redirect, withRouter,
} from 'react-router-dom';
import { ResultTypeReport } from './reports/resultType/ResultTypeReport';
import { TableLogsReport } from './reports/tableLogs/TableLogsReport';
import { DynamicLogsReport } from './reports/dynamicLogs/DynamicLogsReport';
import { Target } from './reports/target/Target';

export type MenuProps = {
  systemId: string;
};
export enum KeyMenu {
  Frontend = 'Frontend',
  Backend = 'Backend',

  TargetKey = 'target',
  Dynamic = 'dynamicTableLogs',
  Table = 'tableLogs',
  AverageQuery = 'reportQueryAverage',
  AverageQueryInterval = 'reportQueryAverageInterval',
  ResultType = 'reportResultType',
  ResultTypeInterval = 'reportResultTypeInterval',

}

const BackendMenu = ({ systemId }: MenuProps) => (
  <Pivot>
    <PivotItem key={KeyMenu.Dynamic} headerText="Логи онлайн">
      <React.Suspense fallback="отчет...">
        <DynamicLogsReport systemId={systemId} />
      </React.Suspense>
    </PivotItem>
    <PivotItem key={KeyMenu.Table} headerText="Таблица логов">
      <React.Suspense fallback="отчет...">
        <TableLogsReport systemId={systemId} />
      </React.Suspense>
    </PivotItem>
    <PivotItem key={KeyMenu.ResultType} headerText="Количество типов запросов за период">
      <React.Suspense fallback="отчет...">
        <ResultTypeReport systemId={systemId} />
      </React.Suspense>
    </PivotItem>
    <PivotItem
      key={KeyMenu.ResultTypeInterval}
      headerText="Количество типов запросов поинтервально за период"
    >
      Количество типов запросов поинтервально за период
    </PivotItem>
  </Pivot>
);

const FrontendMenu = ({ systemId }: MenuProps) => (
  <Pivot>
    <PivotItem key={KeyMenu.TargetKey} headerText="Цели">
      <React.Suspense fallback="цели загружаются">
        <Target systemId={systemId} />
      </React.Suspense>
    </PivotItem>
  </Pivot>
);

const MenuNav = withRouter(({ history }) => (
  <Nav
    onLinkClick={(event, element) => {
      event?.preventDefault();
      history.push(element?.url || '');
    }}
    groups={[
      {
        links: [
          {
            name: 'Home',
            url: '/',
            expandAriaLabel: 'Expand Home section',
            collapseAriaLabel: 'Collapse Home section',
            links: [
              {
                name: 'Backend',
                url: '/Backend',
                key: KeyMenu.Backend,
              },
              {
                name: 'Frontend',
                url: '/Frontend',
                key: KeyMenu.Frontend,
              },
            ],
            isExpanded: true,
          },
        ],
      },
    ]}
  />
));

export function Menu({ systemId }: MenuProps): JSX.Element {
  return (
    <>
      <Router>
        <MenuNav />
        <Switch>
          <Redirect exact from="/" to="/Backend" />
          <Route path="/Frontend" render={() => <FrontendMenu systemId={systemId} />} />
          <Route path="/Backend" render={() => <BackendMenu systemId={systemId} />} />
        </Switch>
      </Router>
    </>
  );
}
