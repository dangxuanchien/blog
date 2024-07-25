import React, { FC, useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import DatePickerCustom from '../CustomDatePicker/DatePicker';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@material-ui/core';

/**
 * The Props Interface
 */
interface DatePickerProps {
    /** Function handle select Datepicker */
    onChange?: (value: OnChangeState) => void;
    value: Date[];
}
export type OnChangeState = {
    startDate: Date;
    endDate: Date;
};

type HandleChangeEvent = {
    name: keyof OnChangeState;
    value: string;
};

const useStyles = makeStyles((theme: Theme) => ({
    mainDatePicker: {
        display: 'inline-Flex',
        alignItems: 'center',
    },
    divide: {
        fontWeight: 'bold',
        padding: '0 10px',
        marginTop: '25px',
    },
}));

const DateRangePicker: FC<DatePickerProps> = (props) => {
    const style = useStyles();
    const { t } = useTranslation();
    const { onChange, value } = props;
    const [startDateValue, endDateValue] = value || [null, null];
    const [minDate, setMinDate] = useState<Date | undefined>(undefined);
    const defaultValue = {
        startDate: startDateValue,
        endDate: endDateValue,
    };
    // const { setHidden } = useContext(HiddenContext);
    const handleChangeDatePicker = (e: HandleChangeEvent) => {
        const value = {
            ...defaultValue,
            [e.name]: e.value ? new Date(e.value) : null,
        };
        onChange && onChange(value);
    };

    return (
        <Box className={style.mainDatePicker}>
            {/* Start Date */}
            <DatePickerCustom
                value={startDateValue}
                onChange={(value) => {
                    handleChangeDatePicker({
                        name: 'startDate',
                        value: value,
                    });
                    setMinDate(value);
                }}
                label={t('detailSupplier.startDate')}
                minDate={undefined}
            />
            <Box className={style.divide}>
                <Typography> ~ </Typography>
            </Box>
            {/* End Date */}
            <DatePickerCustom
                value={endDateValue}
                onChange={(value) => {
                    handleChangeDatePicker({
                        name: 'endDate',
                        value: value,
                    });
                }}
                minDate={minDate}
                label={t('detailSupplier.endDate')}
            />
        </Box>
    );
};
export default DateRangePicker;
