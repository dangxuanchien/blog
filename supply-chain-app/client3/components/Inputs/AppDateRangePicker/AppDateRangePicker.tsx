import { OnChangeState } from '@/components/Inputs/DateRangePicker/DateRangePicker';
import { Nullable } from '@/types/types';
import { Box, Typography } from '@material-ui/core';
import { useState } from 'react';
import AppDatePicker, { DatePickerProps } from '../AppDatePicker/AppDatePicker';
import { useDateRangePickerStyle } from './AppDateRangePicker.style';

type DateRangePickerProps = {
    onChange?: (value: OnChangeState) => void;
    className?: string;
    placeholder?: string[];
    /**[startDate, endDate]*/
    value?: Nullable<Date>[];
    startLabel?: string | null;
    endLabel?: string | null;
    startDateProps?: DatePickerProps;
    endDateProps?: DatePickerProps;
    minStartDate?: Date | null;
    maxEndDate?: Date | null;
};

type HandleChangeEvent = {
    name: keyof OnChangeState;
    value: Date | string;
};

const AppDateRangePicker = ({
    onChange,
    placeholder,
    value,
    startDateProps,
    endDateProps,
    endLabel,
    startLabel,
    minStartDate: minStartDate,
    maxEndDate,
}: DateRangePickerProps) => {
    const style = useDateRangePickerStyle();

    const [placeholderStartDate, placeholderEndDate]: (string | undefined)[] = placeholder || [];
    const [startDateValue, endDateValue] = value || [null, null];
    const defaultValue = {
        startDate: startDateValue,
        endDate: endDateValue,
    };
    const [optionDate, setOptionDate] = useState<OnChangeState>(defaultValue);
    const handleChangeDatePicker = (e: HandleChangeEvent) => {
        const newDate = new Date(e.value);

        let value = newDate;
        switch (e.name) {
            case 'startDate':
                newDate.setHours(0, 0, 0, 0);
                minStartDate?.setHours(0, 0, 0, 0);
                const hasInvalidStartDate =
                    newDate.getTime() > optionDate?.endDate.getTime() || newDate.getTime() < minStartDate?.getTime();
                if (hasInvalidStartDate) {
                    value = null;
                }
                break;
            case 'endDate':
                newDate.setHours(23, 59, 59, 999);
                maxEndDate?.setHours(23, 59, 59, 999);
                const hasInvalidEndDate =
                    newDate.getTime() < optionDate?.startDate.getTime() || newDate.getTime() > maxEndDate?.getTime();
                if (hasInvalidEndDate) {
                    value = null;
                }
                break;
            default:
                break;
        }

        const onChangeValue = {
            ...defaultValue,
            [e.name]: value,
        };
        setOptionDate(onChangeValue);
        onChange && onChange(onChangeValue);
    };

    return (
        <Box className={style.mainDatePicker}>
            <AppDatePicker
                {...startDateProps}
                label={startLabel}
                value={startDateValue}
                name="startDate"
                minDate={new Date(minStartDate).setHours(0, 0, 0, 0)}
                maxDate={optionDate?.endDate}
                onChange={(value) => {
                    handleChangeDatePicker({
                        name: 'startDate',
                        value: value,
                    });
                }}
                placeholder={placeholderStartDate}
            />
            <Typography className={style.divide} component={'span'}>
                ~
            </Typography>
            <AppDatePicker
                {...endDateProps}
                label={endLabel}
                name="endDate"
                value={endDateValue}
                minDate={optionDate?.startDate}
                maxDate={new Date(maxEndDate).setHours(23, 59, 59, 999)}
                onChange={(value) => {
                    handleChangeDatePicker({
                        name: 'endDate',
                        value: value,
                    });
                }}
                placeholder={placeholderEndDate}
            />
        </Box>
    );
};
export default AppDateRangePicker;
