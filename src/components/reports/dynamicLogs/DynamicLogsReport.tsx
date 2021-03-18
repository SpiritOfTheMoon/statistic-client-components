import React from 'react';
import { useBackendLogSubscription, useSystemDynamicTableLogs } from '@umk-stat/statistic-client-relay';
import { DynamicLogsTable } from './DynamicLogsTable';

export type DynamicLogsReportType = {
    systemId: string;
};

export function DynamicLogsReport({ systemId }: DynamicLogsReportType): JSX.Element {
    const { system } = useSystemDynamicTableLogs({
        fetchPolicy: 'store-and-network',
    }, {
        systemId,
    });
    useBackendLogSubscription({
        variables: {
            systemId,
        },
    });

    if (system === null) {
        throw new Error('для динамической таблицы произошла упячка');
    }
    return (
        <React.Suspense fallback="отчет загружается">
            <DynamicLogsTable system={system} />
        </React.Suspense>
);
}
