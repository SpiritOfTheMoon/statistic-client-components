import { SystemDynamicTableLogsQueryResponse } from '@umk-stat/statistic-client-relay/dist/queries/__generated__/SystemDynamicTableLogsQuery.graphql';

export default (): SystemDynamicTableLogsQueryResponse => (
  {
    system: {
      ' $fragmentRefs': {
        DynamicTableLogsFragment: true,
      },
      id: '1',
      name: 'system',
    },
  }
);
