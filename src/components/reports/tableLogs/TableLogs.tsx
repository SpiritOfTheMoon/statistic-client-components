import React, { useState } from "react";
import { DetailsList } from "@fluentui/react";
import {
    useTableLogs,
    TableLogsFragmentTypes,
    SystemTableLogsQueryTypes
} from "@umk-stat/statistic-client-relay";
import { TableLogsFragment } from "@umk-stat/statistic-client-relay/dist/fragments/__generated__/TableLogsFragment.graphql";
import { CodeTextProps } from "../../baseComponents/CodeText";
import stringify from "json-stringify-pretty-compact";
import { CodeModal } from "../../baseComponents/CodeModal";
import { HiddenText } from "../../baseComponents/HiddenText";
import { FooterTablePagination } from "../../baseComponents/FooterTablePagination";

export type TableLogsProps = {
    system: NonNullable<SystemTableLogsQueryTypes.SystemTableLogsQueryResponse["system"]>,
};
type IDocument = TableLogsFragmentTypes.TableLogsFragment["tableLogs"]["edges"][0]["node"];

const PAGE_SIZE = 10;

export function TableLogs({ system }: TableLogsProps): JSX.Element {

    const { data: { tableLogs }, refetch } = useTableLogs(system);
    const [visibleModal, setVisibleModal] = useState(false);
    const [codeText, setCodeText] = useState<CodeTextProps>({
        language: 'json',
        text: '',
    });

    const onChange = (cur: number) => {
        refetch({
            count: PAGE_SIZE,
            skip: PAGE_SIZE * (cur - 1),
            order: 'DESC',
            orderField: 'date',
        }, {
            fetchPolicy: "store-and-network",
        });
    };

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
                checkboxVisibility={2}

                onRenderDetailsFooter={() => {
                    return (<FooterTablePagination defaultCurrent={1} onChange={onChange} pageSize={PAGE_SIZE} totalCount={tableLogs.totalCount} />)
                }}

                enableUpdateAnimations={true}
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
                        name: 'args',
                        className: "CellArgs",
                        fieldName: 'args',
                        minWidth: 100,
                        maxWidth: 400,
                        data: "string",
                        isPadded: true,
                        onRender: (item: IDocument) => {
                            const val = item.args ?? "";
                            const onClick = () => {
                                const res = stringify(JSON.parse(val));
                                setCodeText({
                                    language: 'json',
                                    text: res,
                                });
                                setVisibleModal(true);
                            };
                            return <HiddenText onClick={onClick} fullText={val} />
                        },
                    },
                    {
                        key: 'column4',
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
                        key: 'column5',
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
                        key: 'column6',
                        name: 'perfomance',
                        className: "CellPerfomance",
                        fieldName: 'perfomance',
                        minWidth: 150,
                        isPadded: true,
                        data: "number",
                    },
                    {
                        key: 'column7',
                        name: 'resultType',
                        className: "CellResultType",
                        fieldName: 'resultType',
                        minWidth: 150,
                        data: "string",
                        isPadded: true,
                    }
                ]}
            />
        </>
    );

}
