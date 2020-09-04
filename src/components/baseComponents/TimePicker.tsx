import React, { useState, useEffect } from "react";
import { SpinButton } from "./SpinButton";
import { Stack } from "@fluentui/react";

const defaultHours: number[] = new Array(24).fill(0).map((_, i) => i++);

const defaultMinutes: number[] = new Array(60).fill(0).map((_, i) => i++);

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

    const [[hours, minutes], setTime] = useState<[number, number]>([value[0] ?? minHours, value[1] ?? minMinutes]);
    const itemsHours = defaultHours.filter((val) => val >= minHours && val <= maxHours);
    const [itemsMinutes, setItemMinutes] = useState<Array<number>>(defaultMinutes.filter((val) => val >= minMinutes));

    const onTimeChange = ([hours, minutes]: [number, number]) => {
        let validatedHours = hours;
        let validatedMinutes = minutes;
        if (validatedHours < minHours) {
            validatedHours = minHours;
        }
        if (validatedHours === minHours) {
            if (validatedMinutes < minMinutes) {
                validatedMinutes = minMinutes;
            }
            if (validatedMinutes > maxMinutes) {
                validatedMinutes = maxMinutes;
            }
        }
        if (validatedHours > maxHours) {
            validatedHours = maxHours;
        }
        if (validatedHours === maxHours) {

            if (validatedMinutes > maxMinutes) {
                validatedMinutes = maxMinutes;
            }
        }
        setTime([validatedHours, validatedMinutes]);
    }
    useEffect(() => {
        if (!(value[0] === hours && value[1] === minutes)) {
            setTime([value[0] ?? minHours, value[1] ?? minMinutes]);
        }
    }, value);
    useEffect(() => {
        onSelectTime && onSelectTime([hours, minutes]);
    }, [hours, minutes]);

    const onSelectHour = (hour: number | undefined) => {
        let newItemMinutes = defaultMinutes;
        if (typeof hour !== "undefined")
            onTimeChange([hour, minutes]);
        if (hour === minHours) {
            newItemMinutes = newItemMinutes.filter((val) => val >= minMinutes);
        }
        if (hour === maxHours) {
            newItemMinutes = newItemMinutes.filter((val) => val <= maxMinutes);
        }
        setItemMinutes(newItemMinutes);
    }

    const onSelectMinute = (minute: number | undefined) => {
        if (typeof minute !== "undefined")
            onTimeChange([hours, minute]);
    }
    return (
        <>
            <Stack {...props} horizontal={true}>
                <SpinButton onSelectItem={onSelectHour} items={itemsHours} />
                <SpinButton onSelectItem={onSelectMinute} items={itemsMinutes} />
            </Stack>
        </>

    )
}
