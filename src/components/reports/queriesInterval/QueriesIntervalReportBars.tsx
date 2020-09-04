import React, { useState } from "react";
import { QueriesIntervalReportFragmentTypes } from "@umk/statistic-client-relay";
import { QueriesIntervalOptions } from "./QueriesIntervalOptions";
import { Group } from "@vx/group";
import { scaleBand, scaleLinear } from '@vx/scale';
import { Bar } from '@vx/shape';
import { AxisBottom } from '@vx/axis';
import { CodeTextProps, CodeModal } from "../../baseComponents";


export type QueriesIntervalReportBarsProps = {
    width: number;
    height: number;
    margin?: { top: number; right: number; bottom: number; left: number };
    data: QueriesIntervalReportFragmentTypes.QueriesIntervalReportFragment["queryIntervalReport"];
    options?: QueriesIntervalOptions;
};


export function QueriesIntervalReportBars({
    data,
    height,
    options,
    width,
    margin,
}: QueriesIntervalReportBarsProps): JSX.Element {
    const [visibleModal, setVisibleModal] = useState(false);
    const [codeText, setCodeText] = useState<CodeTextProps>({
        language: 'json',
        text: '',
    });
    margin = margin ?? { top: 40, right: 0, bottom: 40, left: 0 };

    const intervalScale = scaleBand<Date>({
        domain: data.map((val) => val.fromDate as Date),
        padding: 0,
        rangeRound: [0, width],
    });

    const yMax = height - (typeof margin === "undefined" ? 0 : margin.bottom);
    const yScale = scaleLinear<number>({
        rangeRound: [yMax, 0],
        domain: [0, Math.max(...data.map((dateData) => Math.max(...dateData.queries.map((query) => query.average))))],
    });

    return width < 10 ? <> </> : (
        <>
            <CodeModal
                codeText={codeText}
                onCancel={() => { setVisibleModal(false); }}
                visible={visibleModal}
            />
            <svg width={width} height={height}>
                <rect width={width} height={height} fill="url(#teal)" rx={14} />
                {data.map((dateData, dateDataIndex) => {
                    const xMax = ~~(width / (data.length === 0 ? 1 : data.length))

                    const xScale = scaleBand<string>({
                        rangeRound: [0, xMax],
                        domain: dateData.queries.map((query) => query.query),
                        padding: 0.4,
                    });


                    return (<Group top={-40}>
                        {dateData.queries.map((query, queryIndex) => {
                            const barWidth = xScale.bandwidth();
                            const barHeight = yMax - yScale(query.average);
                            const domainXScale = xScale(query.query) ?? 0;
                            console.log("domainXScale", domainXScale)
                            const barX = (dateDataIndex * xMax) + domainXScale;
                            console.log("xMax", xMax)
                            console.log("barX", barX)
                            console.log("dateDataIndex", dateDataIndex)
                            const barY = yMax - barHeight;
                            return (
                                <Bar
                                    key={`bar-${query.query}`}
                                    x={barX}
                                    y={barY}
                                    width={barWidth}
                                    height={barHeight}
                                    fill="rgba(23, 233, 217, .5)"
                                    onClick={() => {
                                        setCodeText({
                                            language: 'graphql',
                                            text: `${query.query}\n # value: ${query.average} `,
                                        });
                                        setVisibleModal(true);
                                    }}
                                />
                            );
                        })}
                    </Group>)
                })}
                <AxisBottom
                    top={height - margin.bottom}
                    scale={intervalScale}
                    stroke={"#00FFFFF"}
                    tickStroke={"#00FFFFF"}
                    hideAxisLine
                    tickLabelProps={() => ({
                        fill: "#00FFFFF",
                        fontSize: 11,
                        textAnchor: 'middle',
                    })}
                />

            </svg>
        </>);

}