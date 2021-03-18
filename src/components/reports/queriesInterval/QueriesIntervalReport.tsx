// import React from "react";
// import {
//     useSystemQueriesIntervalReport,

// } from "@umk-stat/statistic-client-relay";
// import { QueriesIntervalReportView } from "./QueriesIntervalReportView";

// export type QueriesIntervalReportProps = {
//     systemId: string;
// };

// export function QueriesIntervalReport({ systemId }: QueriesIntervalReportProps): JSX.Element {

//     const { system } = useSystemQueriesIntervalReport({
//         fetchPolicy: "store-and-network",
//     }, {
//         systemId,
//     });

//     if (system === null) {
//         throw new Error("Нет системы");
//     }

//     return (
//         <QueriesIntervalReportView system={system} />
//     );

// }
