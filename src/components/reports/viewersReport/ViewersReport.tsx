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
    root: { padding: '10px', margin: '10px' },
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

  const viewersData = viewers.reduce((accum, cur) => {
    if (cur.compInfo) {
      const { platform, screenResolution } = JSON.parse(cur.compInfo);
      const { userInfo } = cur;
      const viewerKey = `${platform}_${screenResolution.join('x')}_${userInfo}`;
      const existedValue = accum.findIndex(([key]) => key === viewerKey);
      if (existedValue === -1) {
        accum.push([viewerKey, [cur]]);
      } else {
        accum[existedValue][1].push(cur);
      }
    }
    return accum;
  }, [] as Array<[string, (typeof viewers[0][])]>);

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
        items={viewersData}
        checkboxVisibility={CheckboxVisibility.hidden}
        columns={[
          {
            key: 'column1',
            name: 'Количество пользователей',
            minWidth: 200,
            maxWidth: 300,
            data: 'string',
            onRender: ([viewerKey, values]) => (
              <span>
                {values.length}
              </span>
            ),
          },
          {
            key: 'column2',
            name: 'Разрешение экрана',
            minWidth: 200,
            maxWidth: 300,
            data: 'string',
            onRender: ([viewerKey, values]) => {
              const item = values[0];
              const viewerData = JSON.parse(item.compInfo!);
              return <span>{viewerData.screenResolution.join('x')}</span>;
            },
          },
          {
            key: 'column3',
            name: 'Платформа',
            minWidth: 200,
            maxWidth: 300,
            data: 'string',
            onRender: ([viewerKey, values]) => {
              const item = values[0];
              const viewerData = JSON.parse(item.compInfo!);
              return <span>{viewerData.platform}</span>;
            },
          },
          {
            key: 'column4',
            name: 'userInfo',
            minWidth: 200,
            maxWidth: 300,
            data: 'string',
            onRender: ([viewerKey, values]) => (
              <span>{values[0].userInfo}</span>
            ),
          },
        ]}
      />
    </>
  );
}
