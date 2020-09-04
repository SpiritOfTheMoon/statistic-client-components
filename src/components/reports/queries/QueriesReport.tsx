import React from "react";
import {
    useSystemQueriesReport,

} from "@umk/statistic-client-relay";
import { QueriesReportTable } from "./QueriesReportTable";


export type QueriesReportProps = {
    systemId: string;
};

export function QueriesReport({ systemId }: QueriesReportProps): JSX.Element {

    const { system } = useSystemQueriesReport({
        fetchPolicy: "store-and-network",
    }, {
        systemId,
    });

    if (system === null) {
        throw new Error("Нет системы");
    }
    return (

        <React.Suspense fallback="отчет загружается">
            <QueriesReportTable system={system} />
        </React.Suspense>);
    
}
