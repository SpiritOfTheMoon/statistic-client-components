import React from 'react';
import {
  withRouter,
} from 'react-router-dom';
import {
  Nav, INavStyles,
} from '@fluentui/react';

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

const navigationStyles = {
  root: {
    height: '100vh',
    boxSizing: 'border-box',
    border: '1px solid #eee',
    overflowY: 'auto',
    paddingTop: '1vh',
    marginRight: '20px',
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
            url: `/${KeyMenu.Frontend}`,
            expandAriaLabel: 'Expand Home section',
            collapseAriaLabel: 'Collapse Home section',
            links: [
              {
                name: MenuHeaderTexts.TargetKey,
                url: `/${KeyMenu.Frontend}/${KeyMenu.TargetKey}`,
                key: KeyMenu.TargetKey,
                disabled: true,
              },
            ],
            isExpanded: true,
          },
          {
            name: KeyMenu.Backend,
            url: `/${KeyMenu.Backend}`,
            expandAriaLabel: 'Expand Home section',
            collapseAriaLabel: 'Collapse Home section',
            links: [
              {
                name: MenuHeaderTexts.Dynamic,
                url: `/${KeyMenu.Backend}/${KeyMenu.Dynamic}`,
                key: KeyMenu.Dynamic,
                disabled: true,
              },
              {
                name: MenuHeaderTexts.Table,
                url: `/${KeyMenu.Backend}/${KeyMenu.Table}`,
                key: KeyMenu.Table,
                disabled: true,
              },
              {
                name: MenuHeaderTexts.ResultType,
                url: `/${KeyMenu.Backend}/${KeyMenu.ResultType}`,
                key: KeyMenu.ResultType,
                disabled: true,
              },
              {
                name: MenuHeaderTexts.ResultTypeInterval,
                url: `/${KeyMenu.Backend}/${KeyMenu.ResultTypeInterval}`,
                key: KeyMenu.ResultTypeInterval,
                disabled: true,
              },
            ],
            isExpanded: true,
          },
        ],
      },
    ]}
  />
));
