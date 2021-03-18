// import React, { useState } from "react";
// import { QueriesIntervalOptions } from "./QueriesIntervalOptions";
// import { useQueriesIntervalReport, SystemQueriesIntervalReportQueryTypes } from "@umk-stat/statistic-client-relay";
// import { QueriesIntervalReportTable } from "./QueriesIntervalReportTable";
// import { DefaultButton, OverflowSet, CommandBarButton, IOverflowSetItemProps } from "@fluentui/react";
// import { QueriesIntervalReportBarGroup } from "./QueriesIntervalReportBarGroup";
// import { QueriesIntervalReportBars } from "./QueriesIntervalReportBars";

// export type QueriesIntervalTableReport = {

//     system: NonNullable<SystemQueriesIntervalReportQueryTypes.SystemQueriesIntervalReportQueryResponse["system"]>,

// };

// type ViewKeysType = 'barGroup' | 'table' | 'bars';

// const ViewObject = {
//     'barGroup': QueriesIntervalReportBarGroup,
//     'table': QueriesIntervalReportTable,
//     'bars': QueriesIntervalReportBars,
// };

// export function QueriesIntervalReportView({
//     system
// }: QueriesIntervalTableReport): JSX.Element {

//     const [{ queryIntervalReport }, refetch] = useQueriesIntervalReport(system);
//     const [options, setOptions] = useState<QueriesIntervalOptions>({
//         fromDate: undefined,
//         interval: 'day',
//         toDate: undefined,
//     });
//     const [viewType, setViewType] = useState<ViewKeysType>('table');
//     const View = ViewObject[viewType];
//     const onSelectedOptions = (newOptions: QueriesIntervalOptions) => {
//         console.log('SELECTED OPTIONS', newOptions);

//         setOptions(newOptions);

//     };

//     const onButtonClick = () => {

//         refetch({
//             begin: options?.fromDate,
//             end: options?.toDate,
//             interval: options?.interval,
//         }, {
//             fetchPolicy: "store-and-network",
//         });

//     };

//     const onRenderItemStyles = {
//         root: { padding: '10px' },
//     };
//     const onRenderOverflowButtonStyles = {
//         root: { padding: '10px' },
//         menuIcon: { fontSize: '16px' },
//     };

//     const onRenderItem = (item: IOverflowSetItemProps): JSX.Element => {
//         return (
//             <CommandBarButton
//                 role="menuitem"
//                 aria-label={item.name}
//                 styles={onRenderItemStyles}
//                 iconProps={{ iconName: item.icon }}
//                 onClick={item.onClick}
//             />
//         );
//     };

//     const onRenderOverflowButton = (overflowItems: any[] | undefined): JSX.Element => {
//         return (
//             <CommandBarButton
//                 role="menuitem"
//                 title="More items"
//                 styles={onRenderOverflowButtonStyles}
//                 menuIconProps={{ iconName: 'More' }}
//                 menuProps={{ items: overflowItems! }}
//             />
//         );
//     };

//     return (
//         <>
//             <QueriesIntervalOptions onSelectedOptions={onSelectedOptions} />
//             <DefaultButton onClick={onButtonClick} iconProps={{ iconName: 'refresh' }}>Обновить</DefaultButton>
//             <OverflowSet
//                 onRenderItem={onRenderItem}
//                 onRenderOverflowButton={onRenderOverflowButton}
//                 role="menubar"
//                 vertical={false}
//                 items={[
//                     {
//                         key: 'item1',
//                         icon: 'Table',
//                         name: 'Таблица',
//                         onClick: () => {
//                             setViewType("table");
//                         },
//                     },
//                     {
//                         key: 'item2',
//                         icon: 'ChartSeries',
//                         name: 'Групповая диаграмма',
//                         onClick: () => {
//                             setViewType("barGroup");
//                         },
//                     },
//                     {
//                         key: 'item3',
//                         icon: 'BarChart4',
//                         name: 'Динамическая групповая диаграмма',
//                         onClick: () => {
//                             setViewType("bars");
//                         },
//                     },
//                 ]}
//             />
//             <React.Suspense fallback="Применение новых опций....">
//                 <View data={queryIntervalReport} width={5000} height={1000} />
//             </React.Suspense>
//         </>
//     );

// }

// // QueryComponent -> FragmentComponent -> View1Component/View2Component/View3Component
