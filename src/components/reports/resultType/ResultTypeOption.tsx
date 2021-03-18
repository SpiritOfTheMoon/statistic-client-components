import React, { useState, useEffect } from 'react';
import { IDatePickerStrings, DayOfWeek } from '@fluentui/react';
import { PeriodDatePicker } from '../../baseComponents';

export type ResultTypeOptions = {

    fromDate: Date | undefined;
    toDate: Date | undefined;
};
export type ResultTypeOptionProps = {
    onSelectedOptions?: (options: ResultTypeOptions | undefined) => void;
};

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

export function ResultTypeOption({
    onSelectedOptions,
}: ResultTypeOptionProps): JSX.Element {
    const [options, setOptions] = useState<ResultTypeOptions | undefined>(undefined);
    const onSelectDate = (dates: [Date | null | undefined, Date | null | undefined]) => {
        setOptions({
            fromDate: dates[0] === null ? undefined : dates[0],
            toDate: dates[1] === null ? undefined : dates[1],
        });
    };
    useEffect(() => {
        onSelectedOptions?.(options);
    }, [options]);
    return (
        <>
            <PeriodDatePicker
              placeholders={['СТАРТ ПЕРИОДА', 'КОНЕЦ ПЕРИОДА']}
              orientation="horizontal"
              className="ResultTypeReportOptions-DatePicker"
              allowTextInput={true}
              firstDayOfWeek={firstDayOfWeek}
              strings={DayPickerStrings}
              value={[options?.fromDate, options?.toDate]}
              onSelectDate={onSelectDate}
            />
        </>
    );
}
