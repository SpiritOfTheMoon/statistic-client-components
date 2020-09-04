import React from "react";
import { useSystemResultTypeReport } from "@umk/statistic-client-relay";
import { ResultTypeView } from "./ResultTypeView";

export type ResultTypeReportProps = {
    systemId: string;
};

export const ResultTypeReport: React.FunctionComponent<ResultTypeReportProps> = ({ systemId }) => {

    const { system } = useSystemResultTypeReport({
        fetchPolicy: "store-and-network",
    }, {
        systemId,
    });

    if (system === null) {
        throw new Error("для таблицы типы результатов произошла упячка");
    }
    return (

        <React.Suspense fallback="отчет загружается">
            <ResultTypeView system={system} />
        </React.Suspense>);
}
