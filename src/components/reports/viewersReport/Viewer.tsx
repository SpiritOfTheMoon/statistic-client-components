import React from 'react';
import { useViewersQuery } from '@umk-stat/statistic-client-relay';
import { ViewersReport } from './ViewersReport';

export type VisitorProps = {
  systemId: string;
};

export function Viewer({ systemId }: VisitorProps): JSX.Element {
  const { viewers } = useViewersQuery({
    fetchPolicy: 'store-and-network',
  }, {
    systemId,
  });
  if (viewers === null) {
    throw new Error('пользователи не загружены');
  }

  return (
    <React.Suspense fallback="пользователи загружаются...">
      <ViewersReport viewers={viewers} />
    </React.Suspense>
  );
}
