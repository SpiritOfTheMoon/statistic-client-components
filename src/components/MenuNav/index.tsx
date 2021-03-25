import React from 'react';
import { withRouter } from 'react-router-dom';
import { Nav, INavStyles } from '@fluentui/react';

export enum MenuHeaderTexts {
  Frontend = 'Frontend',
  Backend = 'Backend',

  TargetKey = 'Цели',
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
  Dynamic = 'dynamicTableLogs',
  Table = 'tableLogs',
  AverageQuery = 'reportQueryAverage',
  AverageQueryInterval = 'reportQueryAverageInterval',
  ResultType = 'reportResultType',
  ResultTypeInterval = 'reportResultTypeInterval',

}

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
            url: `/${KeyMenu.Frontend}?key=${KeyMenu.TargetKey}&text=${MenuHeaderTexts.TargetKey}`,
            expandAriaLabel: 'Expand Home section',
            collapseAriaLabel: 'Collapse Home section',
            links: [
              {
                name: MenuHeaderTexts.TargetKey,
                url: `/${KeyMenu.Frontend}?key=${KeyMenu.TargetKey}&text=${MenuHeaderTexts.TargetKey}`,
                key: KeyMenu.TargetKey,
              },
            ],
            isExpanded: true,
          },
          {
            name: KeyMenu.Backend,
            url: `/${KeyMenu.Backend}?key=${KeyMenu.Dynamic}&text=${MenuHeaderTexts.Dynamic}`,
            expandAriaLabel: 'Expand Home section',
            collapseAriaLabel: 'Collapse Home section',
            links: [
              {
                name: MenuHeaderTexts.Dynamic,
                url: `/${KeyMenu.Backend}?key=${KeyMenu.Dynamic}&text=${MenuHeaderTexts.Dynamic}`,
                key: KeyMenu.Dynamic,
              },
              {
                name: MenuHeaderTexts.Table,
                url: `/${KeyMenu.Backend}?key=${KeyMenu.Table}&text=${MenuHeaderTexts.Table}`,
                key: KeyMenu.Table,
              },
              {
                name: MenuHeaderTexts.ResultType,
                url: `/${KeyMenu.Backend}?key=${KeyMenu.ResultType}&text=${MenuHeaderTexts.ResultType}`,
                key: KeyMenu.ResultType,
              },
              {
                name: MenuHeaderTexts.ResultTypeInterval,
                url:
                  `/${KeyMenu.Backend}?key=${KeyMenu.ResultTypeInterval}&text=${MenuHeaderTexts.ResultTypeInterval}`,
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
