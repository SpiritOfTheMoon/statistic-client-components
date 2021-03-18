import React, { useState, useEffect, useCallback } from 'react';
import { Stack } from '@fluentui/react';
import { SpinButton } from '../baseComponents/SpinButton';
import { validateTime } from './utils';

const defaultHours: number[] = new Array(24).fill(0).map((_, i) => i + 1);

const defaultMinutes: number[] = new Array(60).fill(0).map((_, i) => i + 1);

export type TimePickerProps = React.HTMLAttributes<HTMLElement> & {
  value: [number | undefined, number | undefined];
  onSelectTime?: (time: [number, number]) => void;
  minTime?: [number, number];
  maxTime?: [number, number];
};

export const TimePicker: React.FunctionComponent<TimePickerProps> = ({
  onSelectTime,
  minTime,
  maxTime,
  value,
  ...props
}: TimePickerProps) => {
  const [minHours, minMinutes] = minTime ?? [0, 0];
  const [maxHours, maxMinutes] = maxTime ?? [23, 59];

  const [
    [hours, minutes],
    setTime,
  ] = useState<Readonly<[number, number]>>([value[0] ?? minHours, value[1] ?? minMinutes]);

  const [itemsMinutes, setItemMinutes] = useState<Array<number>>(defaultMinutes.filter((val) => val >= minMinutes));

  useEffect(
    () => {
      if (!(value[0] === hours && value[1] === minutes)) {
        setTime([value[0] ?? minHours, value[1] ?? minMinutes]);
      }
    },
    value,
  );

  useEffect(
    () => {
      onSelectTime?.([hours, minutes]);
    },
    [hours, minutes],
  );

  const updateTime = useCallback((hour: number | undefined, minute?: number | undefined) => {
    setTime(validateTime(
        [
          hour ?? hours,
          minute ?? minutes,
        ],
        [minHours, minMinutes],
        [maxHours, maxMinutes],
      ));
  }, [hours, minutes]);

  const itemsHours = defaultHours.filter((val) => val >= minHours && val <= maxHours);

  const onSelectHour = (hour: number | undefined) => {
    let newItemMinutes = defaultMinutes;
    if (typeof hour !== 'undefined') updateTime(hour);
    if (hour === minHours) {
      newItemMinutes = newItemMinutes.filter((val) => val >= minMinutes);
    }
    if (hour === maxHours) {
      newItemMinutes = newItemMinutes.filter((val) => val <= maxMinutes);
    }
    setItemMinutes(newItemMinutes);
  };

  const onSelectMinute = (minute: number | undefined) => {
    if (typeof minute !== 'undefined') updateTime(undefined, minute);
  };
  return (
    <>
      <Stack {...props} horizontal={true}>
        <SpinButton onSelectItem={onSelectHour} items={itemsHours} />
        <SpinButton onSelectItem={onSelectMinute} items={itemsMinutes} />
      </Stack>
    </>

  );
};
