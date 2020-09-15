import React, { useState } from "react";
import { useResultTypeReport, SystemResultTypeReportQueryTypes } from "@umk-stat/statistic-client-relay";
import { DefaultButton, OverflowSet, CommandBarButton, IOverflowSetItemProps } from "@fluentui/react";
import { ResultTypeOption, ResultTypeOptions } from "./ResultTypeOption";
import { ResultTypeTable } from "./ResultTypeTable";
import { ResultTypePie } from "./ResultTypePie";

export type ResultTypeViewProps = {

    system: NonNullable<SystemResultTypeReportQueryTypes.SystemResultTypeReportQueryResponse["system"]>,

};

type ViewKeysType = 'pie' | 'table';

const ViewObject = {
    'pie': ResultTypePie,
    'table': ResultTypeTable,
};

export function ResultTypeView({
    system
}: ResultTypeViewProps): JSX.Element {



    const [{ resultTypeReport }, refetch] = useResultTypeReport(system);
    const [options, setOptions] = useState<ResultTypeOptions | undefined>(undefined);
    const [viewType, setViewType] = useState<ViewKeysType>('table');
    const View = ViewObject[viewType];
    const onSelectedOptions = (newOptions: ResultTypeOptions | undefined) => {
        setOptions(newOptions);

    };

    const onButtonClick = () => {

        refetch({
            begin: options?.fromDate,
            end: options?.toDate,
        }, {
            fetchPolicy: "store-and-network",
        });

    };

    const onRenderItemStyles = {
        root: { padding: '10px' },
    };
    const onRenderOverflowButtonStyles = {
        root: { padding: '10px' },
        menuIcon: { fontSize: '16px' },
    };

    const onRenderItem = (item: IOverflowSetItemProps): JSX.Element => {
        return (
            <CommandBarButton
                role="menuitem"
                aria-label={item.name}
                styles={onRenderItemStyles}
                iconProps={{ iconName: item.icon }}
                onClick={item.onClick}
            />
        );
    };

    const onRenderOverflowButton = (overflowItems: any[] | undefined): JSX.Element => {
        return (
            <CommandBarButton
                role="menuitem"
                title="More items"
                styles={onRenderOverflowButtonStyles}
                menuIconProps={{ iconName: 'More' }}
                menuProps={{ items: overflowItems! }}
            />
        );
    };

    return (
        <>
            <ResultTypeOption onSelectedOptions={onSelectedOptions} />
            <DefaultButton onClick={onButtonClick} iconProps={{ iconName: 'refresh' }}>Обновить</DefaultButton>
            <OverflowSet
                onRenderItem={onRenderItem}
                onRenderOverflowButton={onRenderOverflowButton}
                role="menubar"
                vertical={false}
                items={[
                    {
                        key: 'item1',
                        icon: 'Table',
                        name: 'Таблица',
                        onClick: () => {
                            setViewType("table");
                        },
                    },
                    {
                        key: 'item2',
                        icon: 'DonutChart',
                        name: 'Пирог-диаграмма',
                        onClick: () => {
                            setViewType("pie");
                        },
                    },
                ]}
            />
            <React.Suspense fallback="Применение новых опций....">
                <View data={resultTypeReport} />
            </React.Suspense>
        </>
    );

}
