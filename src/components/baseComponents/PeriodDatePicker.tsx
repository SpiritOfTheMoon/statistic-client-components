import React, { useState, useEffect } from "react";
import { IDatePickerProps, DatePicker, Stack, IDatePicker, IRefObject, IStackProps, IStackTokens, IStackStyles } from "@fluentui/react";
import * as uiFabric from '@uifabric/foundation';

export type PeriodDatePickerProps = {
    value?: [Date | null | undefined, Date | null | undefined];
    defaultValue?: [Date | null | undefined, Date | null | undefined];
    onSelectDate?: (value: [Date | null | undefined, Date | null | undefined]) => void;
    // datePickerStyles: IStyleFunctionOrObject<IDatePickerStyleProps, IDatePickerStyles>;
    styles?: uiFabric.IStylesFunctionOrObject<IStackProps, IStackTokens, IStackStyles>;
    orientation?: 'horizontal' | 'vertical';
    tabIndex?: number;
    className?: string;
    placeholders?: [string | undefined, string | undefined];
    componentRef?: [IRefObject<IDatePicker> | undefined, IRefObject<IDatePicker> | undefined];
    label?: string;
} & Omit<IDatePickerProps, 'value' | 'defaultValue' | 'onChange' | 'onSelectDate' | 'styles' | 'minDate' | 'maxDate' | 'showCloseButton' | 'tabIndex' | 'className' | 'placeholder' | 'componentRef' | 'label'>;



export function PeriodDatePicker({
    value,
    defaultValue,
    onSelectDate,
    styles,
    orientation,
    tabIndex,
    className,
    placeholders,
    componentRef,
    label,
    ...otherProps
}: PeriodDatePickerProps): JSX.Element {

    const [datesValue, setDatesValue] = useState<[Date | null | undefined, Date | null | undefined]>(defaultValue ?? [undefined, undefined]);

    useEffect(() => {
        onSelectDate && onSelectDate(datesValue);
    }, [datesValue]);

    const onLeftSelectDate = (date: Date | null | undefined) => {

        setDatesValue([date, datesValue[1]])

    };

    const onRightSelectDate = (date: Date | null | undefined) => {

        setDatesValue([datesValue[0], date])

    };

    const leftProps: IDatePickerProps = {
        ...otherProps,
        maxDate: datesValue[1] ?? undefined,
        value: datesValue[0] ?? undefined,
        onSelectDate: onLeftSelectDate,
        showCloseButton: false,
        tabIndex,
        className: className ? className + " period-date-picker-start-field" : undefined,
        placeholder: placeholders?.[0],
        componentRef: componentRef?.[0],
    };
    const rightProps: IDatePickerProps = {
        minDate: datesValue[0] ?? undefined,
        value: datesValue[1] ?? undefined,
        onSelectDate: onRightSelectDate,
        showCloseButton: false,
        tabIndex: tabIndex ? tabIndex + 1 : undefined,
        className: className ? className + " period-date-picker-end-field" : undefined,
        placeholder: placeholders?.[1],
        componentRef: componentRef?.[1],

    };
    const stackProps: IStackProps = {
        styles: styles,
        horizontal: orientation === 'horizontal',
        className,
    };
    return (
        <Stack {...stackProps}>
            <label>{label}</label>
            <DatePicker {...leftProps} textField={{
                type: 'datetime',
            }} />
            <DatePicker {...rightProps} />
        </Stack >);


} 