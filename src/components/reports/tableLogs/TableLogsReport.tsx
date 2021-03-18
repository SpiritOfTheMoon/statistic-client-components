import React from 'react';
import { useSystemTableLogs } from '@umk-stat/statistic-client-relay';
import { TableLogs } from './TableLogs';

export type TableLogsReportProps = {
    systemId: string;
};

export function TableLogsReport({ systemId }: TableLogsReportProps): JSX.Element {
    const { system } = useSystemTableLogs({
        fetchPolicy: 'store-and-network',
    }, {
        systemId,
    });

    if (system === null) {
        throw new Error('Нет id системы для таблицы');
    }
    return (
        <React.Suspense fallback="отчет загружается">
            <TableLogs system={system} />
        </React.Suspense>
);
}
