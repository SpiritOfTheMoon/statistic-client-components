/* eslint-disable import/prefer-default-export */
import React, { useState } from 'react';
import { ViewerQueryTypes } from '@umk-stat/statistic-client-relay';
import {
  DetailsList,
  CheckboxVisibility,
  OverflowSet,
  IOverflowSetItemProps,
  CommandBarButton,
} from '@fluentui/react';
import { Mutable } from '../dynamicLogs';
import { ViewerReportPie } from './ViewerReportPie';
import { ViewerReportResolutionPie } from './ViewersReportResolutionPie';

export type ViewersTableProps = {
  viewers: NonNullable<ViewerQueryTypes.ViewersQueryResponse['viewers']>,
};

export function ViewersReport({ viewers }: ViewersTableProps): JSX.Element {
  type ViewKeysType = 'platformPie' | 'resolutionPie' | 'default';

  const [viewType, setViewType] = useState<ViewKeysType>('platformPie');

  const ViewObject = {
    default: '',
    platformPie: ViewerReportPie,
    resolutionPie: ViewerReportResolutionPie,
  };

  const View = ViewObject[viewType];

  const onRenderItemStyles = {
    root: { padding: '10px' },
  };

  const onRenderOverflowButtonStyles = {
    root: { padding: '10px' },
    menuIcon: { fontSize: '16px' },
  };

  const onRenderItem = (item: IOverflowSetItemProps): JSX.Element => (
    <>
      <CommandBarButton
        role="menuitem"
        aria-label={item.name}
        styles={onRenderItemStyles}
        iconProps={{ iconName: item.icon }}
        onClick={item.onClick}
      >
        {item.name}
      </CommandBarButton>
    </>
  );

  const onRenderOverflowButton = (overflowItems: any[] | undefined): JSX.Element => (
    <CommandBarButton
      role="menuitem"
      title="More items"
      styles={onRenderOverflowButtonStyles}
      menuIconProps={{ iconName: 'More' }}
      menuProps={{ items: overflowItems! }}
    />
  );
  return (
    <>
      <OverflowSet
        onRenderItem={onRenderItem}
        onRenderOverflowButton={onRenderOverflowButton}
        role="menubar"
        vertical={false}
        items={[
          {
            key: 'item1',
            icon: 'DonutChart',
            title: 'Платформа',
            name: 'Платформа',
            onClick: () => {
              setViewType('platformPie');
            },
          },
          {
            key: 'item2',
            icon: 'DonutChart',
            title: 'Разрешение',
            name: 'Разрешение',
            onClick: () => {
              setViewType('resolutionPie');
            },
          },
        ]}
      />
      <React.Suspense fallback="Применение новых опций....">
        <View viewers={viewers} />
      </React.Suspense>
      <DetailsList
        items={viewers as Mutable<typeof viewers>}
        checkboxVisibility={CheckboxVisibility.hidden}
        columns={[
          {
            key: 'column1',
            name: 'Количество пользователей',
            minWidth: 200,
            maxWidth: 300,
            data: 'string',
            onRender: (item: NonNullable<ViewerQueryTypes.ViewersQueryResponse['viewers']>[0]) => (
              <span>
                {0}
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
