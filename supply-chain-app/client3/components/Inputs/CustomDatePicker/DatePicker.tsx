import React, { FC } from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { Box, makeStyles, Theme, Typography } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import enUS from 'date-fns/locale/en-US';
import Calendar from '../../../assets/icons/Calendar.svg';
/**
 * The Props Interface
 */
interface DatePickerProps {
    /** Function handle select Datepicker */
    label?: string;
    minDate: Date;
    value: Date;
    onChange: Function;
}

const useStyles = makeStyles((theme: Theme) => ({
    datePicker: {
        ['& fieldset']: {
            borderRadius: 3,
            borderColor: `${theme.palette.text.primary} !important`,
            backgroundColor: theme.palette.action.disabledBackground,
        },
        ['& .MuiOutlinedInput-input']: {
            padding: 0,
            height: '2rem',
            width: '6rem',
            paddingLeft: '5px',
            zIndex: 1,
        },
        ['& .MuiIconButton-root']: {
            padding: 0,
            color: 'white',
            marginRight: '-8px',
        },
    },
    MuiPickersBasePicker: {
        ['& .MuiPopover-paper']: {
            backgroundColor: theme.palette.action.disabledBackground,
            border: `1px solid ${theme.palette.text.primary} !important`,
            overflowY: 'hidden',
            borderRadius: '0px',
            marginTop: '10px',
            height: '305px',
        },
        ['& .MuiPickersCalendarHeader-iconButton']: {
            backgroundColor: 'transparent',
            color: 'var(--white)',
        },
        ['& .MuiPickersDay-daySelected']: {
            backgroundColor: 'var(--selectInputDate)',
            color: 'var(--white)',
        },
        ['& .MuiIconButton-root']: {
            borderRadius: '0px',
        },
        ['& .MuiPickersCalendar-transitionContainer']: {
            marginTop: '0',
        },
        ['& .MuiPickersBasePicker-pickerView']: {
            maxWidth: '270px',
            minWidth: '210px',
        },
        ['& .MuiPickersDay-day']: {
            border: `1px solid ${theme.palette.text.primary}`,
            margin: '0',
        },
        ['& .MuiPickersCalendarHeader-dayLabel']: {
            color: theme.palette.text.primary,
            fontSize: '14px',
        },
        ['& .MuiPickersCalendarHeader-switchHeader']: {
            borderBottom: `1px solid ${theme.palette.text.primary} !important`,
        },
        ['& .MuiPickersCalendarHeader-daysHeader']: {
            borderBottom: `1px solid ${theme.palette.text.primary} !important`,
            maxHeight: '24px',
            ['& .MuiPickersCalendarHeader-dayLabel']: {
                marginTop: '-10px',
                marginLeft: 0,
                marginRight: 0,
                height: '32px',
                border: `1px solid ${theme.palette.text.primary} !important`,
            },
        },
    },
    iconCalendar: {
        width: '25px',
        height: 'auto',
        zIndex: 1,
    },
}));

const DatePickerCustom: FC<DatePickerProps> = (props) => {
    const style = useStyles();
    const { onChange, value, minDate } = props;

    const handleOnChange = (date) => {
        onChange(date);
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={enUS}>
            <Box>
                <Typography> {props.label} </Typography>
                <KeyboardDatePicker
                    disableToolbar
                    autoOk
                    className={style.datePicker}
                    variant="inline"
                    inputVariant="outlined"
                    format="yyyy/M/dd"
                    minDate={minDate}
                    maxDate={new Date()}
                    value={value}
                    PopoverProps={{
                        className: style.MuiPickersBasePicker,
                    }}
                    onChange={(date) => handleOnChange(date)}
                    keyboardIcon={<Calendar className={style.iconCalendar} />}
                />
            </Box>
        </MuiPickersUtilsProvider>
    );
};
export default DatePickerCustom;
