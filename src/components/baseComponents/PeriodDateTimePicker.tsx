import React, { useState, useEffect } from "react";
import { Stack, ICalendarProps } from "@fluentui/react";
import { DateTimePicker } from "./DateTimePicker";
export type PeriodDateTimePickerProps = React.HTMLAttributes<HTMLElement> & {
    onSelectPeriodDateTime?: (dates: [Date | undefined, Date | undefined]) => void;
    calendarProps?: Omit<ICalendarProps, "onSelectDate" | "isMonthPickerVisible" | "value" | "minDate" | "maxDate">,
};

export function PeriodDateTimePicker({
    onSelectPeriodDateTime,
    calendarProps,
    ...props
}: PeriodDateTimePickerProps): JSX.Element {

    const [dates, setDates] = useState<[Date | undefined, Date | undefined]>([undefined, undefined]);
    useEffect(() => {
        onSelectPeriodDateTime && onSelectPeriodDateTime(dates);
    }, [dates])
    const onLeftSelectDate = (date: Date | undefined) => {
        setDates([date, dates[1]]);
    };
    const onRightSelectDate = (date: Date | undefined) => {
        setDates([dates[0], date]);
    };

    const leftClendarProps: Omit<ICalendarProps, "onSelectDate" | "isMonthPickerVisible" | "minDate" | "maxDate"> | undefined = calendarProps ? {
        ...calendarProps,
        value: dates[0],
    } : undefined;
    const rightClendarProps: Omit<ICalendarProps, "onSelectDate" | "isMonthPickerVisible" | "minDate" | "maxDate"> | undefined = calendarProps ? {
        ...calendarProps,
        value: dates[1],
    } : undefined;

    return (<Stack horizontal={true} {...props}>
        <DateTimePicker
            maxDate={dates[1]}
            value={dates[0]}
            calendarProps={leftClendarProps}
            onSelectDateTime={onLeftSelectDate} />
        <DateTimePicker
            minDate={dates[0]}
            value={dates[1]}
            calendarProps={rightClendarProps}
            onSelectDateTime={onRightSelectDate} />
    </Stack>);

}