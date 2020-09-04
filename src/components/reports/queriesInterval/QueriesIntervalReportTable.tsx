import React, { useMemo } from "react";
import { QueriesIntervalReportFragmentTypes } from "@umk/statistic-client-relay";
import { useState } from "react";
import { CodeTextProps, CodeModal, HiddenText } from "../../baseComponents";
import { IColumn, DetailsList, IGroup, CheckboxVisibility, SelectionMode } from "@fluentui/react";

export type QueriesIntervalReportTableProps = {

    data: QueriesIntervalReportFragmentTypes.QueriesIntervalReportFragment["queryIntervalReport"];

};


type ItemType =
    QueriesIntervalReportFragmentTypes.QueriesIntervalReportFragment["queryIntervalReport"][0]["queries"][0];

export function QueriesIntervalReportTable({
    data,
}: QueriesIntervalReportTableProps): JSX.Element {
    console.log(data);
    const items: ItemType[] = [];
    const groups = data.map((queryInterval) => {
        const group: IGroup = {
            count: queryInterval.queries.length,
            name: new Date(queryInterval.fromDate as string).toLocaleString(),
            key: new Date(queryInterval.fromDate as string).toLocaleString(),
            startIndex: items.length,
            isCollapsed: true,
        };
        items.push(...queryInterval.queries);
        return group;
    });

    const [visibleModal, setVisibleModal] = useState(false);
    const [codeText, setCodeText] = useState<CodeTextProps>({
        language: 'graphql',
        text: '',
    });

    const columns: IColumn[] = [
        {
            key: 'column1',
            name: 'query',
            className: "CellQuery",
            fieldName: 'query',
            minWidth: 400,
            maxWidth: 600,
            data: "string",
            isPadded: true,
            onRender: (item: ItemType) => {
                const onClick = () => {
                    setCodeText({
                        language: 'graphql',
                        text: item.query,
                    });
                    setVisibleModal(true);
                };
                return (<HiddenText onClick={onClick} fullText={item.query} />)
            },
        }, {
            key: 'column2',
            name: 'Count',
            className: "CellCount",
            fieldName: 'id',
            minWidth: 200,
            maxWidth: 300,
            data: "string",
            onRender: (item: ItemType) => {
                return (<span>{item.count}</span>)
            },
        },

        {
            key: 'column3',
            name: 'Average',
            className: "CellAverage",
            fieldName: 'date',
            minWidth: 150,
            maxWidth: 300,
            data: "string",
            isPadded: true,
            onRender: (item: ItemType) => {
                return (<span>{item.average}</span>);
            },
        },
    ]

    return (
        <>
            <CodeModal
                codeText={codeText}
                onCancel={() => { setVisibleModal(false); }}
                visible={visibleModal}
            />
            <DetailsList
                items={items}
                groups={groups}
                columns={columns}
                disableSelectionZone={true}
                compact={true}
                selectionMode={SelectionMode.none}
                checkboxVisibility={CheckboxVisibility.hidden}

                groupProps={{
                    showEmptyGroups: true,
                    isAllGroupsCollapsed: false,
                }}

            />
        </>
    )

}