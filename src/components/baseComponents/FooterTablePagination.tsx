import React, { useState, useEffect } from "react";
import { Stack, DefaultButton, TextField, Label } from "@fluentui/react";
import '../../styles/FooterTablePagination.less';

export type FooterTablePaginationProps = {
    totalCount: number;
    defaultCurrent: number;
    onChange: (current: number) => void;
    pageSize: number;

};

export function FooterTablePagination({ defaultCurrent, totalCount, onChange, pageSize }: FooterTablePaginationProps): JSX.Element {

    const totalPages = (totalCount % pageSize) > 0 ? ~~(totalCount / (pageSize + 1)) : ~~(totalCount / pageSize);
    const [current, setCurrent] = useState(defaultCurrent);
    const [disabledForward, setDisabledForward] = useState(totalPages >= current ? false : true);
    const [disabledBack, setDisabledBack] = useState(current > 1 ? false : true);
    const [valueTextField, setValueTextField] = useState(current);

    useEffect(() => {
        onChange(current);
    }, [current]);

    const onClickBack = () => {

        setCurrent(current - 1);
        setValueTextField(current - 1);
        if (current > 2) {
            setDisabledBack(false);
        } else {
            setDisabledBack(true);
        }
        if (current >= totalPages) {
            setDisabledForward(true);
        } else {
            setDisabledForward(false);
        }
    }


    const onClickForward = () => {

        setCurrent(current + 1);
        setValueTextField(current + 1);
        if (current > 0) {
            setDisabledBack(false);
        } else {

            setDisabledBack(true);
        }
        if (current + 2 >= totalPages) {
            setDisabledForward(true);
        } else {
            setDisabledForward(false);
        }
    }
    const onKeyPress = (e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key === "Enter") {
            if (valueTextField > totalPages) {
                setValueTextField(totalPages);
                setCurrent(totalPages);
            } else
                setCurrent(valueTextField);
            if (valueTextField < 1) {
                setValueTextField(1);
                setCurrent(1);
            }
            if (valueTextField > 1) {
                setDisabledBack(false);
            } else {

                setDisabledBack(true);
            }
            if (valueTextField >= totalPages) {
                setDisabledForward(true);
            } else {
                setDisabledForward(false);
            }
        }
    }
    const onChangeTextField = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        setValueTextField(Number(newValue));
    };

    return (
        <Stack horizontal={true} className="FooterTablePagination">
            <DefaultButton onClick={onClickBack} disabled={disabledBack}>Назад</DefaultButton>
            <TextField
                value={valueTextField.toString()}
                onKeyPress={onKeyPress}
                onChange={onChangeTextField}
                inputMode="decimal"
                className="FooterTablePagination-TextField"
            />
            <Label className="FooterTablePagination-Label">{totalPages}</Label>
            <DefaultButton onClick={onClickForward} disabled={disabledForward}>Вперед</DefaultButton>
        </Stack>
    )

}