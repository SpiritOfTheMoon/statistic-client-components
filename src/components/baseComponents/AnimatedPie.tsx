/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { ProvidedProps, PieArcDatum } from '@vx/shape/lib/shapes/Pie';
import { animated, useTransition, interpolate } from 'react-spring';

// react-spring transition definitions
type AnimatedStyles = { startAngle: number; endAngle: number; opacity: number };

const fromLeaveTransition = ({ endAngle }: PieArcDatum<any>) => ({
    // enter from 360° if end angle is > 180°
    startAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
    endAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
    opacity: 0,
});
const enterUpdateTransition = ({ startAngle, endAngle }: PieArcDatum<any>) => ({
    startAngle,
    endAngle,
    opacity: 1,
});

export type AnimatedPieProps<Datum> = ProvidedProps<Datum> & {
    animate?: boolean;
    getKey: (d: PieArcDatum<Datum>) => string;
    getColor: (d: PieArcDatum<Datum>) => string;
    onClickDatum: (d: PieArcDatum<Datum>) => void;
    getVisibleValue: (d: PieArcDatum<Datum>) => string;
    delay?: number;
};

export function AnimatedPie<Datum>({
    animate,
    arcs,
    path,
    getKey,
    getColor,
    getVisibleValue,
    onClickDatum,
}: AnimatedPieProps<Datum>): JSX.Element {
    const transitions = useTransition<PieArcDatum<Datum>, AnimatedStyles>(
        arcs,
        getKey,
        // @ts-ignore react-spring doesn't like this overload
        {
            from: animate ? fromLeaveTransition : enterUpdateTransition,
            enter: enterUpdateTransition,
            update: enterUpdateTransition,
            leave: animate ? fromLeaveTransition : enterUpdateTransition,
            config: {
                duration: 1000,
            }
        },
    );
    return (
        <>
            {transitions.map(
                ({
                    item: arc,
                    props,
                    key,
                }: {
                    item: PieArcDatum<Datum>;
                    props: AnimatedStyles;
                    key: string;
                }) => {
                    const [centroidX, centroidY] = path.centroid(arc);
                    const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1;

                    return (
                        <g key={key}>
                            <animated.path
                                // compute interpolated path d attribute from intermediate angle values
                                d={interpolate([props.startAngle, props.endAngle], (startAngle, endAngle) =>
                                    path({
                                        ...arc,
                                        startAngle,
                                        endAngle,
                                    }),
                                )}
                                fill={getColor(arc)}
                                onClick={() => onClickDatum(arc)}
                                onTouchStart={() => onClickDatum(arc)}
                            />
                            {hasSpaceForLabel && (
                                <animated.g style={{ opacity: props.opacity }}>
                                    <text
                                        fill="white"
                                        x={centroidX}
                                        y={centroidY}
                                        dy=".33em"
                                        fontSize={14}
                                        textAnchor="middle"
                                        pointerEvents="none"
                                    >
                                        {getVisibleValue(arc)}
                                    </text>
                                </animated.g>
                            )}
                        </g>
                    );
                },
            )}
        </>
    );
}