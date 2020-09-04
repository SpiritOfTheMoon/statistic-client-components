import React from "react";
import { Pivot, PivotItem } from "@fluentui/react"
import { ResultTypeReport } from "./reports/resultType/ResultTypeReport";
import { TableLogsReport } from "./reports/tableLogs/TableLogsReport";
import { DynamicLogsReport } from "./reports/dynamicLogs/DynamicLogsReport";
import { QueriesReport } from "./reports/queries";
import { QueriesIntervalReport } from "./reports/queriesInterval/QueriesIntervalReport";
export type MenuProps = {
    systemId: string;
};
export enum KeyMenu {

    Dynamic = "dynamicTableLogs",
    Table = "tableLogs",
    AverageQuery = "reportQueryAverage",
    AverageQueryInterval = "reportQueryAverageInterval",
    ResultType = "reportResultType",
    ResultTypeInterval = "reportResultTypeInterval",

}


export function Menu({ systemId }: MenuProps): JSX.Element {


    return (
        <Pivot >
            <PivotItem key={KeyMenu.Dynamic} headerText="Логи онлайн">
                <React.Suspense fallback="отчет...">
                    <DynamicLogsReport systemId={systemId} />
                </React.Suspense>
            </PivotItem>
            <PivotItem key={KeyMenu.Table} headerText="Таблица логов">
                <React.Suspense fallback="отчет...">
                    <TableLogsReport systemId={systemId} />
                </React.Suspense>
            </PivotItem>
            <PivotItem key={KeyMenu.AverageQuery} headerText="Отчет среднего времени выполнения запросов за период">
                <React.Suspense fallback="отчет...">
                    <QueriesReport systemId={systemId} />
                </React.Suspense>
            </PivotItem>
            <PivotItem key={KeyMenu.AverageQueryInterval} headerText="Отчет среднего времени выполнения запросов поинтервально за период">
                <React.Suspense fallback="отчет...">
                    <QueriesIntervalReport systemId={systemId} />
                </React.Suspense>
            </PivotItem>
            <PivotItem key={KeyMenu.ResultType} headerText="Количество типов запросов за период">
                <React.Suspense fallback="отчет...">
                    <ResultTypeReport systemId={systemId} />
                </React.Suspense>
            </PivotItem>
            <PivotItem key={KeyMenu.ResultTypeInterval} headerText="Количество типов запросов поинтервально за период">Количество типов запросов поинтервально за период</PivotItem>
        </Pivot>
    );

}
