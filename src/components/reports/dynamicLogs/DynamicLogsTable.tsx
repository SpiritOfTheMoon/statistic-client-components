import React, { useState } from "react";
import { DetailsList, CheckboxVisibility } from "@fluentui/react";
import {
  useDynamicTableLogs,
  TableLogsFragmentTypes,
  SystemDynamicTableLogsQueryTypes,

} from "@umk-stat/statistic-client-relay";

import { CodeTextProps } from "../../baseComponents/CodeText";
import stringify from "json-stringify-pretty-compact";
import { HiddenText } from "../../baseComponents/HiddenText";
import { CodeModal } from "../../baseComponents/CodeModal";

export type DynamicLogsTableProps = {
  system: NonNullable<SystemDynamicTableLogsQueryTypes.SystemDynamicTableLogsQueryResponse["system"]>,
};

type IDocument = TableLogsFragmentTypes.TableLogsFragment["tableLogs"]["edges"][0]["node"];


export type Mutable<T> = T extends [] ?
  Array<{ -readonly [P in keyof T]: Mutable<T[P]> }>
  : { -readonly [P in keyof T]: Mutable<T[P]> };

export function DynamicLogsTable({ system }: DynamicLogsTableProps): JSX.Element {

  const [visibleModal, setVisibleModal] = useState(false);
  const [codeText, setCodeText] = useState<CodeTextProps>({
    language: 'json',
    text: '',
  });

  const { tableLogs } = useDynamicTableLogs(system);

  return (
    <>
      <CodeModal
        codeText={codeText}
        onCancel={() => { setVisibleModal(false); }}
        visible={visibleModal}
      />
      <DetailsList
        items={tableLogs.edges.map(edge => edge.node)}
        disableSelectionZone={true}
        compact={true}
        checkboxVisibility={CheckboxVisibility.hidden}

        columns={[
          {
            key: 'column1',
            name: 'Id',
            className: "CellId",
            fieldName: 'id',
            minWidth: 200,
            maxWidth: 300,
            data: "string",
            onRender: (item: IDocument) => {
              return (<span>{item.id}</span>)
            },
          },
          {
            key: 'column2',
            name: 'query',
            className: "CellQuery",
            fieldName: 'query',
            minWidth: 400,
            maxWidth: 600,
            data: "string",
            isPadded: true,
            onRender: (item: IDocument) => {
              const onClick = () => {
                setCodeText({
                  language: 'graphql',
                  text: item.query,
                });
                setVisibleModal(true);
              };
              return (<HiddenText onClick={onClick} fullText={item.query} />)
            },
          },
          {
            key: 'column3',
            name: 'date',
            className: "CellDate",
            fieldName: 'date',
            minWidth: 150,
            maxWidth: 300,
            data: "string",
            isPadded: true,
            onRender: (item: IDocument) => {
              return (<span>{new Date(item.date as string).toLocaleString()}</span>);
            },
          },
          {
            key: 'column4',
            name: 'result',
            className: "CellResult",
            fieldName: 'result',
            minWidth: 400,
            maxWidth: 600,
            data: "string",
            isPadded: true,
            onRender: (item: IDocument) => {
              const onClick = () => {
                const res = stringify(JSON.parse(item.result));
                setCodeText({
                  language: 'json',
                  text: res,
                });
                setVisibleModal(true);
              };
              return <HiddenText onClick={onClick} fullText={item.result} />
            },
          },
          {
            key: 'column5',
            name: 'perfomance',
            className: "CellPerfomance",
            fieldName: 'perfomance',
            minWidth: 150,
            isPadded: true,
            data: "number",
          },
          {
            key: 'column6',
            name: 'resultType',
            className: "CellResultType",
            fieldName: 'resultType',
            minWidth: 150,
            data: "string",
            isPadded: true,
          }
        ]}
      >
      </DetailsList>
    </>
  );

}
