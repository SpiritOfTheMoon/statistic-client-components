import React, { useState, useEffect } from "react";
import { PeriodDateTimePicker } from "../../baseComponents/PeriodDateTimePicker";
import { DayOfWeek, IDatePickerStrings, Dropdown, IDropdownOption, Stack } from "@fluentui/react";
import { QueriesIntervalReportRefetchableQueryTypes } from "@umk-stat/statistic-client-relay";

enum Datepart {

    minute = "minute",
    hour = "hour",
    day = "day",
    month = "month",
    year = "year",

}

const DayPickerStrings: IDatePickerStrings = {
    months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ],

    shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

    shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],

    goToToday: 'Go to today',
    prevMonthAriaLabel: 'Go to previous month',
    nextMonthAriaLabel: 'Go to next month',
    prevYearAriaLabel: 'Go to previous year',
    nextYearAriaLabel: 'Go to next year',
    closeButtonAriaLabel: 'Close date picker',

    isRequiredErrorMessage: 'Field is required.',

    invalidInputErrorMessage: 'Invalid date format.',
};

const firstDayOfWeek = DayOfWeek.Sunday;


export type QueriesIntervalOptions = {

    fromDate: Date | undefined;
    toDate: Date | undefined;
    interval: QueriesIntervalReportRefetchableQueryTypes.Datepart;
};

export type QueriesIntervalOptionsProps = {
    onSelectedOptions?: (options: QueriesIntervalOptions) => void;
};

export function QueriesIntervalOptions({ onSelectedOptions }: QueriesIntervalOptionsProps): JSX.Element {

    const dropDownOptions: IDropdownOption[] = Object.keys(Datepart).map((key) => {
        return Datepart[key as (keyof typeof Datepart)];
    }).map<IDropdownOption>((val) => ({
        key: val,
        text: val,
    }));

    // const [interval, setInterv] = useState<Datepart>(Datepart.day);
    const [options, setOptions] = useState<QueriesIntervalOptions>({
        fromDate: undefined,
        interval: 'day',
        toDate: undefined,
    });

    useEffect(() => {
        onSelectedOptions && onSelectedOptions(options);
    }, [options]);

    const calendarProps = {
        allowTextInput: true,
        firstDayOfWeek: firstDayOfWeek,
        strings: DayPickerStrings,
    }


    const onSelectedDate = ([fromDate, toDate]: [Date | undefined, Date | undefined]) => {

        const newOptions: QueriesIntervalOptions = {
            fromDate,
            toDate,
            interval: options.interval,
        };
        setOptions(newOptions);

    };

    const onSelctedInterval = (_: React.FormEvent<HTMLDivElement>, option?: IDropdownOption) => {
        if (typeof option !== 'undefined') {
            const interval = option.key as Datepart ?? Datepart.day;
            setOptions({ ...options, interval, });
        }
    };

    return (
        <React.Suspense fallback="отчет загружается">
            <Stack horizontal={true}>
                <PeriodDateTimePicker calendarProps={calendarProps} onSelectPeriodDateTime={onSelectedDate} />
                <Dropdown dropdownWidth={200} options={dropDownOptions} onChange={onSelctedInterval} ></Dropdown>
            </Stack>
        </React.Suspense>);

}
