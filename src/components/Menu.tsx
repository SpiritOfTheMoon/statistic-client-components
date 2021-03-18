import React from 'react';
import {
  GroupedList, IObjectWithKey, Pivot, PivotItem,
} from '@fluentui/react';
import { ResultTypeReport } from './reports/resultType/ResultTypeReport';
import { TableLogsReport } from './reports/tableLogs/TableLogsReport';
import { DynamicLogsReport } from './reports/dynamicLogs/DynamicLogsReport';
import { Target } from './reports/target/Target';

export type MenuProps = {
  systemId: string;
};
export enum KeyMenu {
  Frontend = 'Frontend',
  Backend = 'Backend',

  TargetKey = 'target',
  Dynamic = 'dynamicTableLogs',
  Table = 'tableLogs',
  AverageQuery = 'reportQueryAverage',
  AverageQueryInterval = 'reportQueryAverageInterval',
  ResultType = 'reportResultType',
  ResultTypeInterval = 'reportResultTypeInterval',

}

export function Menu({ systemId }: MenuProps): JSX.Element {
  return (
    <Pivot>
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
      <PivotItem key={KeyMenu.ResultType} headerText="Количество типов запросов за период">
        <React.Suspense fallback="отчет...">
          <ResultTypeReport systemId={systemId} />
        </React.Suspense>
      </PivotItem>
      <PivotItem key={KeyMenu.ResultTypeInterval} headerText="Количество типов запросов поинтервально за период">Количество типов запросов поинтервально за период</PivotItem>
      <PivotItem key={KeyMenu.TargetKey} headerText="Цели">
        <React.Suspense fallback="цели загружаются">
          <Target systemId={systemId} />
        </React.Suspense>
      </PivotItem>
    </Pivot>
  );
}

// const BackendMenu = ({ systemId }: MenuProps) => [
//   <Pivot>
//     <PivotItem key={KeyMenu.Dynamic} headerText="Логи онлайн">
//       <React.Suspense fallback="отчет...">
//         <DynamicLogsReport systemId={systemId} />
//       </React.Suspense>
//     </PivotItem>
//     <PivotItem key={KeyMenu.Table} headerText="Таблица логов">
//       <React.Suspense fallback="отчет...">
//         <TableLogsReport systemId={systemId} />
//       </React.Suspense>
//     </PivotItem>
//     <PivotItem key={KeyMenu.ResultType} headerText="Количество типов запросов за период">
//       <React.Suspense fallback="отчет...">
//         <ResultTypeReport systemId={systemId} />
//       </React.Suspense>
//     </PivotItem>
//     <PivotItem
//       key={KeyMenu.ResultTypeInterval}
//       headerText="Количество типов запросов поинтервально за период">
//       Количество типов запросов поинтервально за период
//         </PivotItem>
//   </Pivot>
// ]

// const FrontendMenu = ({ systemId }: MenuProps) => {
//   <Pivot >
//     <PivotItem key={KeyMenu.Target} headerText="Цели">
//       <React.Suspense fallback="цели загружаются">
//         <Target systemId={systemId} />
//       </React.Suspense>
//     </PivotItem>
//   </Pivot>
// }
