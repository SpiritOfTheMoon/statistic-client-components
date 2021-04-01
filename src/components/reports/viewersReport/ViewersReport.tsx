/* eslint-disable import/prefer-default-export */
import React, { useState } from 'react';
import { ViewerQueryTypes } from '@umk-stat/statistic-client-relay';
import { DetailsList, CheckboxVisibility } from '@fluentui/react';
import { Mutable } from '../dynamicLogs';

export type ViewersTableProps = {
  viewers: NonNullable<ViewerQueryTypes.ViewersQueryResponse['viewers']>,
};

export function ViewersReport({ viewers }: ViewersTableProps): JSX.Element {
  return (
    <>
      <DetailsList
        items={viewers as Mutable<typeof viewers>}
        checkboxVisibility={CheckboxVisibility.hidden}
        columns={[
          {
            key: 'column1',
            name: 'Идентификатор',
            minWidth: 200,
            maxWidth: 300,
            data: 'string',
            onRender: (item: NonNullable<ViewerQueryTypes.ViewersQueryResponse['viewers']>[0]) => (
              <span>
                {item.identifier}
              </span>
            ),
          },
          {
            key: 'column2',
            name: 'Разрешение экрана',
            minWidth: 200,
            maxWidth: 300,
            data: 'string',
            onRender: (item: NonNullable<ViewerQueryTypes.ViewersQueryResponse['viewers']>[0]) => {
              const viewersData = JSON.parse(item.compInfo!);
              return <span>{viewersData.screenResolution.join('x')}</span>;
            },
          },
          {
            key: 'column3',
            name: 'Платформа',
            minWidth: 200,
            maxWidth: 300,
            data: 'string',
            onRender: (item: NonNullable<ViewerQueryTypes.ViewersQueryResponse['viewers']>[0]) => {
              const viewersData = JSON.parse(item.compInfo!);
              return <span>{viewersData.platform}</span>;
            },
          },
          {
            key: 'column4',
            name: 'userInfo',
            minWidth: 200,
            maxWidth: 300,
            data: 'string',
            onRender: (item: NonNullable<ViewerQueryTypes.ViewersQueryResponse['viewers']>[0]) => (
              <span>{item.userInfo}</span>
            ),
          },
        ]}
      />
    </>
  );
}
