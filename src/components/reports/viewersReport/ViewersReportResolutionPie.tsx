import React from 'react';
import { ViewerQueryTypes } from '@umk-stat/statistic-client-relay';
import { Pie } from '@vx/shape';
import { Group } from '@vx/group';
import { scaleOrdinal } from '@vx/scale';
import { GradientPinkBlue } from '@vx/gradient';
import { AnimatedPie } from '../../baseComponents/AnimatedPie';

const defaultMargin = {
  top: 20, right: 20, bottom: 20, left: 20,
};

export type ResultTypePieProps = {
  viewers: ViewerQueryTypes.ViewersQueryResponse['viewers'];
  margin?: typeof defaultMargin,
  animate?: boolean,
  width?: number,
  height?: number,
};

export function ViewerReportResolutionPie({
  viewers,
  width = 1000,
  height = 500,
  margin = defaultMargin,
  animate = true,
}: ResultTypePieProps): JSX.Element {
  const pieData = viewers.reduce((accum, cur) => {
    if (cur.compInfo) {
      const { screenResolution } = JSON.parse(cur.compInfo);
      const screenResul = screenResolution.join('x');
      const existedValue = accum.findIndex(([key]) => key === screenResul);
      if (existedValue === -1) {
        accum.push([screenResul, [cur.identifier]]);
      } else {
        accum[existedValue][1].push(cur.identifier);
      }
    }
    return accum;
  }, [] as Array<[string, string[]]>);

  if (width && width < 10) return <></>;
  const getBrowserColor = scaleOrdinal({
    domain: pieData.map(([screenResolution]) => screenResolution),
    range: [
      'rgba(255,255,255,0.7)',
      'rgba(255,255,255,0.6)',
      'rgba(255,255,255,0.5)',
      'rgba(255,255,255,0.4)',
      'rgba(255,255,255,0.3)',
      'rgba(255,255,255,0.2)',
      'rgba(255,255,255,0.1)',
    ],
  });
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const radius = Math.min(innerWidth, innerHeight) / 2;
  const centerY = innerHeight / 2;
  const centerX = innerWidth / 2;
  const donutThickness = 50;

  return (
    <svg width={width} height={height}>
      <GradientPinkBlue id="vx-pie-gradient" />
      <rect rx={14} width={width} height={height} fill="url('#vx-pie-gradient')" />
      <Group top={centerY + margin.top} left={centerX + margin.left}>
        <Pie<typeof pieData[0]>
          data={
            pieData
          }
          pieValue={([screenResolution, identifiers]) => identifiers.length}
          outerRadius={radius}
          innerRadius={radius - donutThickness}
          cornerRadius={3}
          padAngle={0.005}
        >
          {(pie) => (
            <AnimatedPie<typeof pieData[0]>
              {...pie}
              animate={animate}
              getKey={(arc) => arc.data[0]}
              onClickDatum={({ data }) => data}
              getColor={(arc) => getBrowserColor(arc.data[0])}
              getVisibleValue={
                (
                  { data: [screenResolution, identifiers] },
                ) => `${screenResolution}:${identifiers.length}`
              }
            />
          )}
        </Pie>
      </Group>
      {animate && (
        <text
          textAnchor="end"
          x={width - 16}
          y={height - 16}
          fill="white"
          fontSize={11}
          fontWeight={300}
          pointerEvents="none"
        >
          Click segments to update
        </text>
      )}
    </svg>
  );
}
