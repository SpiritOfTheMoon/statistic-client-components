import React, { useState } from "react";
import {
  ResultTypeReportFragmentTypes,

} from "@umk-stat/statistic-client-relay";
import { Group } from "@vx/group";
import { Pie } from "@vx/shape";
import { AnimatedPie } from "../../baseComponents/AnimatedPie";
import { scaleOrdinal } from "@vx/scale";
import { GradientPinkBlue } from '@vx/gradient';

const defaultMargin = { top: 20, right: 20, bottom: 20, left: 20 };

export type ResultTypePieProps = {
  data: ResultTypeReportFragmentTypes.ResultTypeReportFragment["resultTypeReport"];
  margin?: typeof defaultMargin,
  animate?: boolean,
  width?: number,
  height?: number,
};
type DataType = ResultTypeReportFragmentTypes.ResultTypeReportFragment["resultTypeReport"][0];

export function ResultTypePie({
  data,
  width = 1000,
  height = 500,
  margin = defaultMargin,
  animate = true,
}: ResultTypePieProps): JSX.Element {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  if (width && width < 10) return <></>;
  const getBrowserColor = scaleOrdinal({
    domain: data.map((val) => val.name),
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
        <Pie
          data={
            selectedType ? data.filter(({ name }) => name === selectedType) : data.map((val) => val)
          }
          pieValue={(d: DataType) => d.count}
          outerRadius={radius}
          innerRadius={radius - donutThickness}
          cornerRadius={3}
          padAngle={0.005}
        >
          {pie => (
            <AnimatedPie<DataType>
              {...pie}
              animate={animate}
              getKey={arc => arc.data.name}
              onClickDatum={({ data: { name } }) =>
                animate &&
                setSelectedType(selectedType && selectedType === name ? null : name)
              }
              getColor={arc => getBrowserColor(arc.data.name)}
              getVisibleValue={arc => `${arc.data.name}: ${arc.data.count}`}
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
