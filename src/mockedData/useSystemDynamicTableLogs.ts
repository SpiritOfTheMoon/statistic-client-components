import { SystemDynamicTableLogsQueryResponse } from "@umk-stat/statistic-client-relay/dist/queries/__generated__/SystemDynamicTableLogsQuery.graphql";

export function useSystemDynamicTableLogs(): SystemDynamicTableLogsQueryResponse {
    return {
        system: {
            " $fragmentRefs": {
                DynamicTableLogsFragment: true,
            },
            id: "1",
            name: "system",
        }
    };
}