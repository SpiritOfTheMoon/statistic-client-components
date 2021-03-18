/* eslint-disable max-len */
// import React, { useState } from "react";
// import { QueriesIntervalReportFragmentTypes } from "@umk-stat/statistic-client-relay";
// import { QueriesIntervalOptions } from "./QueriesIntervalOptions";
// import { Group } from "@vx/group";
// import { scaleBand, scaleLinear, scaleOrdinal } from '@vx/scale';
// import { BarGroup } from '@vx/shape';
// import { AxisBottom } from '@vx/axis';
// import { rgb2hex } from "@fluentui/react";
// import { CodeTextProps, CodeModal } from "../../baseComponents";

// export type QueriesIntervalReportBarGroupProps = {
//     width: number;
//     height: number;
//     margin?: { top: number; right: number; bottom: number; left: number };
//     data: QueriesIntervalReportFragmentTypes.QueriesIntervalReportFragment["queryIntervalReport"];
//     options?: QueriesIntervalOptions;
// };

// export function QueriesIntervalReportBarGroup({
//     data,
//     height,
//     options,
//     width,
//     margin,
// }: QueriesIntervalReportBarGroupProps): JSX.Element {

//     const [visibleModal, setVisibleModal] = useState(false);
//     const [codeText, setCodeText] = useState<CodeTextProps>({
//         language: 'json',
//         text: '',
//     });
//     margin = margin ?? { top: 40, right: 0, bottom: 40, left: 0 };
//     const xMax = width - margin.left - margin.right;
//     const yMax = height - margin.bottom - margin.top;
//     const keys = Array.from(data.reduce((prev, val) => {
//         val.queries.forEach((query) => {
//             prev.add(query.query);
//         });
//         return prev;
//     }, new Set<string>()).values());
//     const trueData = data.map((dateData) => {
//         const obj: { [key: string]: any } = { fromDate: dateData.fromDate };
//         keys.forEach((key) => {
//             obj[key] = dateData.queries.find((val) => val.query === key)?.average ?? 0;
//         });
//         return obj;
//     });
//     const intervalScale = scaleBand<Date>({
//         domain: data.map((val) => val.fromDate as Date),
//         padding: 0.2,
//     });

//     const queryScale = scaleBand<string>({
//         domain: keys,
//         padding: 0.1,
//     });

//     const tempScale = scaleLinear<number>({
//         domain: [0, Math.max(...trueData.map(val => Math.max(...keys.map((key) => val[key]))))],
//     });
//     console.log("Math.max(...trueData.map(val => Math.max(...keys.map((key) => val[key]))))", Math.max(...trueData.map(val => Math.max(...keys.map((key) => val[key])))))

//     // eslint-disable-next-line @typescript-eslint/no-array-constructor
//     const colors = [];
//     for (let i = 1; i <= 60; i++) {

//         colors.push(`#${rgb2hex(30, 30, 100 + (i * 17) % 155)}`);

//     }
//     console.log("colors", colors)
//     const colorScale = scaleOrdinal<string, string>({
//         domain: keys,
//         range: colors,
//     });
//     intervalScale.rangeRound([0, xMax]);
//     queryScale.rangeRound([0, intervalScale.bandwidth()]);
//     tempScale.range([yMax, 0]);
//     const getDate = (d: any) => d.fromDate;

//     return (
//         <>
//             <CodeModal
//                 codeText={codeText}
//                 onCancel={() => { setVisibleModal(false); }}
//                 visible={visibleModal}
//             />
//             <svg width={width} height={height}>
//                 <Group
//                     top={margin?.top}
//                     left={margin?.left}
//                 >
//                     <BarGroup<{ [key: string]: any }, string>
//                         data={trueData}
//                         keys={keys}
//                         height={yMax}

//                         x0={getDate}
//                         x0Scale={intervalScale}
//                         x1Scale={queryScale}
//                         yScale={tempScale}
//                         color={colorScale}
//                     >
//                         {barGroups =>
//                             barGroups.map(barGroup => (
//                                 <Group key={`bar-group-${barGroup.index}-${barGroup.x0}`} left={barGroup.x0}>
//                                     {barGroup.bars.map(bar => (
//                                         <rect
//                                             key={`bar-group-bar-${barGroup.index}-${bar.index}-${bar.value}-${bar.key}`}
//                                             x={bar.x}
//                                             y={bar.y}
//                                             width={bar.width}
//                                             height={bar.height}
//                                             fill={bar.color}
//                                             rx={4}
//                                             onClick={() => {
//                                                 const { key, value } = bar;
//                                                 setCodeText({
//                                                     language: 'graphql',
//                                                     text: key + `\n # value: ${value} `,
//                                                 });
//                                                 setVisibleModal(true);
//                                             }}
//                                         />
//                                     ))}
//                                 </Group>
//                             ))
//                         }
//                     </BarGroup>

//                 </Group>
//                 <AxisBottom
//                     top={yMax + margin.top}
//                     scale={intervalScale}
//                     stroke={"#00FFFFF"}
//                     tickStroke={"#00FFFFF"}
//                     hideAxisLine
//                     tickLabelProps={() => ({
//                         fill: "#00FFFFF",
//                         fontSize: 11,
//                         textAnchor: 'middle',
//                     })}
//                 />
//             </svg>
//         </>

//     )
// }
