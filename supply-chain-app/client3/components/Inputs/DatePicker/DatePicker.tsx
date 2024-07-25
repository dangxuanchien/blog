import React, { FC } from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { Box, Typography } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import jaLocale from 'date-fns/locale/ja';
import { useDatePickerStyle } from './DatePicker.style';

/**
 * The Props Interface
 */
interface DatePickerProps {
    /** Function handle select Datepicker */
    onChangeFrom: Function;
    labelFrom?: string;
    valueFrom: Date;
    onChangeTo: Function;
    labelTo?: string;
    valueTo: Date;
}

const DatePickerCustom: FC<DatePickerProps> = (props) => {
    const style = useDatePickerStyle();
    const { onChangeFrom, valueFrom, onChangeTo, valueTo } = props;

    const handleOnChangeFrom = (date) => {
        onChangeFrom(date);
    };
    const handleOnChangeTo = (date) => {
        onChangeTo(date);
    };

    return (
        <div className={style.mainDatePicker}>
            {/* Period from */}
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={jaLocale}>
                <Box>
                    <Typography>
                        {props.labelFrom}
                    </Typography>
                    <KeyboardDatePicker
                        disableToolbar
                        autoOk
                        className={style.datePicker}
                        variant="inline"
                        inputVariant="outlined"
                        format="yyyy/MM/dd"
                        value={valueFrom}
                        PopoverProps={{
                            className: style.MuiPickersBasePicker,
                        }}
                        onChange={(date) => handleOnChangeFrom(date)}
                    />
                </Box>
            </MuiPickersUtilsProvider>
            <span className={style.divide}>~​</span>
            {/* Period to */}
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={jaLocale}>
                <Box>
                    <Typography>{props.labelTo}​</Typography>
                    <KeyboardDatePicker
                        disableToolbar
                        autoOk
                        className={style.datePicker}
                        variant="inline"
                        inputVariant="outlined"
                        format="yyyy/MM/dd"
                        value={valueTo}
                        PopoverProps={{
                            className: style.MuiPickersBasePicker,
                        }}
                        onChange={(date) => handleOnChangeTo(date)}
                    />
                </Box>
            </MuiPickersUtilsProvider>
        </div>
    );
};
export default DatePickerCustom;
