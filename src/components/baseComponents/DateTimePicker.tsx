import React, { useState, useEffect } from 'react';
import {
  Calendar, Callout, TextField, ICalendarProps, Stack, values,
} from '@fluentui/react';
import { TimePicker } from '../TimePicker';

export type DateTimePickerProps = {
  onSelectDateTime?: (date: Date | undefined) => void;
  calendarProps?: Omit<ICalendarProps, 'onSelectDate' | 'isMonthPickerVisible' | 'minDate' | 'maxDate'>,
  minDate?: Date,
  maxDate?: Date,
  value?: Date,
};

export function DateTimePicker({
  onSelectDateTime,
  calendarProps,
  minDate,
  maxDate,
  value,
  ...props
}: DateTimePickerProps): JSX.Element {
  const [fullDate, setDate] = React.useState<Date | undefined>(value);
  const [isCallOutVisible, setCallOutVisible] = useState(false);
  const [trueMinTime, setTrueMinTime] = useState<[number, number]>([0, 0]);
  console.log('trueMinTime', trueMinTime);
  const [trueMaxTime, setTrueMaxTime] = useState<[number, number]>([23, 59]);
  console.log('trueMaxTime', trueMaxTime);

  useEffect(() => {
    if ((typeof value !== undefined) && (value !== fullDate)) {
      setDate(value);
    }
  }, [value]);
  useEffect(() => {
    onSelectDateTime?.(fullDate);
  }, [fullDate]);

  const onFocus = () => {
    setCallOutVisible(true);
  };
  const onDismiss = () => {
    setCallOutVisible(false);
  };

  const onSelectDate = (date: Date) => {
    const hours = typeof fullDate !== 'undefined' ? fullDate.getHours() : 0;
    const minute = typeof fullDate !== 'undefined' ? fullDate.getMinutes() : 0;
    const newDate = new Date(date.getFullYear(), date?.getMonth(), date.getDate(), hours, minute);
    if (minDate) {
      const d = new Date(date.getFullYear(), date?.getMonth(), date.getDate());
      console.log('onSelectDate -> d', d);
      const minD = new Date(minDate);
      minD.setHours(0);
      minD.setMinutes(0);
      minD.setSeconds(0);
      minD.setMilliseconds(0);
      console.log('onSelectDate -> minD', minD);
      const minDVal = minD.valueOf();
      console.log('onSelectDate -> minDVal', minDVal);
      const dVal = d.valueOf();
      console.log('onSelectDate -> dVal', dVal);
      if (minDVal === dVal) {
        setTrueMinTime([minDate.getHours(), minDate.getMinutes()]);
        console.log('onSelectDate -> minDate', minDate);
      }
    }
    if (maxDate) {
      const d = new Date(date.getFullYear(), date?.getMonth(), date.getDate());
      console.log('onSelectDate -> d2', d);
      const maxD = new Date(maxDate);
      maxD.setHours(0);
      maxD.setMinutes(0);
      maxD.setSeconds(0);
      maxD.setMilliseconds(0);
      console.log('onSelectDate -> minD2', maxD);

      if (maxD.valueOf() === d.valueOf()) {
        setTrueMaxTime([maxDate.getHours(), maxDate.getMinutes()]);
      }
    }

    setDate(newDate);
  };
  const onSelectTime = ([hours, minutes]: [number, number]) => {
    const newDate = fullDate
      ? new Date(fullDate.getFullYear(), fullDate?.getMonth(), fullDate.getDate(), hours, minutes)
      : new Date(1970, 1, 1, hours, minutes);
    if (minDate) {
      const d = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate());
      console.log('onSelectDate -> d', d);
      const minD = new Date(minDate);
      minD.setHours(0);
      minD.setMinutes(0);
      minD.setSeconds(0);
      minD.setMilliseconds(0);
      console.log('onSelectDate -> minD', minD);
      const minDVal = minD.valueOf();
      console.log('onSelectDate -> minDVal', minDVal);
      const dVal = d.valueOf();
      console.log('onSelectDate -> dVal', dVal);
      if (minDVal === dVal) {
        setTrueMinTime([minDate.getHours(), minDate.getMinutes()]);
        console.log('onSelectDate -> minDate', minDate);
      }
    }
    if (maxDate) {
      const d = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate());
      console.log('onSelectDate -> d2', d);
      const maxD = new Date(maxDate);
      maxD.setHours(0);
      maxD.setMinutes(0);
      maxD.setSeconds(0);
      maxD.setMilliseconds(0);
      console.log('onSelectDate -> minD2', maxD);

      if (maxD.valueOf() === d.valueOf()) {
        setTrueMaxTime([maxDate.getHours(), maxDate.getMinutes()]);
      }
    }
    setDate(newDate);
  };
  const textFieldId = `textField-${new Date().valueOf()}`;
  return (

    <>
      <TextField
        {...props}
        mask="2020-01-01 14:37"
        value={fullDate ? `${fullDate.toLocaleDateString()} ${fullDate.toLocaleTimeString()}` : ''}
        onClick={onFocus}
        id={textFieldId}
      />
      {isCallOutVisible && (
        <Callout onDismiss={onDismiss} target={`#${textFieldId}`}>
          <Stack horizontal={true}>
            <Calendar
              {...calendarProps}
              minDate={minDate}
              maxDate={maxDate}
              onSelectDate={onSelectDate}
              isMonthPickerVisible={false}
            />
            <TimePicker
              value={[fullDate?.getHours(), fullDate?.getMinutes()]}
              onSelectTime={onSelectTime}
              maxTime={trueMaxTime}
              minTime={trueMinTime}
            />
          </Stack>
        </Callout>
      )}
    </>

  );
}
