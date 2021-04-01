import React from 'react';
import { withRouter } from 'react-router-dom';
import { Nav, INavStyles } from '@fluentui/react';

enum MenuHeaderTexts {
  Frontend = 'Frontend',
  Backend = 'Backend',

  TargetKey = 'Цели',
  VisitorKey = 'Пользователи',
  Dynamic = 'Логи онлайн',
  Table = 'Таблица логов',
  AverageQuery = 'reportQueryAverage',
  AverageQueryInterval = 'reportQueryAverageInterval',
  ResultType = 'Количество типов запросов за период',
  ResultTypeInterval = 'Количество типов запросов поинтервально за период',
}

export enum KeyMenu {
  Frontend = 'Frontend',
  Backend = 'Backend',

  TargetKey = 'target',
  VisitorKey = 'visitorsReport',
  Dynamic = 'dynamicTableLogs',
  Table = 'tableLogs',
  AverageQuery = 'reportQueryAverage',
  AverageQueryInterval = 'reportQueryAverageInterval',
  ResultType = 'reportResultType',
  ResultTypeInterval = 'reportResultTypeInterval',

}

export const MenuKeyHeaderMap: Map<KeyMenu, MenuHeaderTexts> = new Map([
  [KeyMenu.Frontend, MenuHeaderTexts.Frontend],
  [KeyMenu.Backend, MenuHeaderTexts.Backend],

  [KeyMenu.TargetKey, MenuHeaderTexts.TargetKey],
  [KeyMenu.VisitorKey, MenuHeaderTexts.VisitorKey],
  [KeyMenu.Dynamic, MenuHeaderTexts.Dynamic],
  [KeyMenu.Table, MenuHeaderTexts.Table],
  [KeyMenu.AverageQuery, MenuHeaderTexts.AverageQuery],
  [KeyMenu.AverageQueryInterval, MenuHeaderTexts.AverageQueryInterval],
  [KeyMenu.ResultType, MenuHeaderTexts.ResultType],
  [KeyMenu.ResultTypeInterval, MenuHeaderTexts.ResultTypeInterval],
]);

const navigationStyles: Partial<INavStyles> = {
  root: {
    height: '100vh',
    boxSizing: 'border-box',
    border: '1px solid #eee',
    overflowY: 'auto',
    paddingTop: '0',
    marginRight: '20px',
    marginLeft: '-8px',
  },
};

export const MenuNav = withRouter(({ history }) => (
  <Nav
    onLinkClick={(event, element) => {
      event?.preventDefault();
      history.push(element?.url || '');
    }}
    styles={navigationStyles}
    groups={[
      {
        links: [
          {
            name: KeyMenu.Frontend,
            url: `/${KeyMenu.Frontend}/${KeyMenu.TargetKey}`,
            expandAriaLabel: 'Expand Home section',
            collapseAriaLabel: 'Collapse Home section',
            links: [
              {
                name: MenuHeaderTexts.TargetKey,
                url: `/${KeyMenu.Frontend}/${KeyMenu.TargetKey}`,
                key: KeyMenu.TargetKey,
              },
              {
                name: MenuHeaderTexts.VisitorKey,
                url: `/${KeyMenu.Frontend}/${KeyMenu.VisitorKey}`,
                key: KeyMenu.VisitorKey,
              },
            ],
            isExpanded: true,
          },
          {
            name: KeyMenu.Backend,
            url: `/${KeyMenu.Backend}/${KeyMenu.Dynamic}`,
            expandAriaLabel: 'Expand Home section',
            collapseAriaLabel: 'Collapse Home section',
            links: [
              {
                name: MenuHeaderTexts.Dynamic,
                url: `/${KeyMenu.Backend}/${KeyMenu.Dynamic}`,
                key: KeyMenu.Dynamic,
              },
              {
                name: MenuHeaderTexts.Table,
                url: `/${KeyMenu.Backend}/${KeyMenu.Table}`,
                key: KeyMenu.Table,
              },
              {
                name: MenuHeaderTexts.ResultType,
                url: `/${KeyMenu.Backend}/${KeyMenu.ResultType}`,
                key: KeyMenu.ResultType,
              },
              {
                name: MenuHeaderTexts.ResultTypeInterval,
                url:
                  `/${KeyMenu.Backend}/${KeyMenu.ResultTypeInterval}`,
                key: KeyMenu.ResultTypeInterval,
              },
            ],
            isExpanded: true,
          },
        ],
      },
    ]}
  />
));
