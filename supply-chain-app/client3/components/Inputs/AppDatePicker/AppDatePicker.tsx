import { Box, Typography } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardDatePickerProps } from '@material-ui/pickers';
import enUS from 'date-fns/locale/en-US';
import DateFnsUtils from '@date-io/date-fns';
import { useDatePickerStyle } from './AppDatePicker.style';
import Calendar from '@/assets/icons/Calendar.svg';
import React, { useContext, useState } from 'react';
import { ThemContext } from 'context/ThemeContext';

export type DatePickerProps = KeyboardDatePickerProps & {
    label?: string;
    inputFormat?: string | undefined;
    value?: Date | null;
};

const AppDatePicker = (props: DatePickerProps) => {
    const { label = '', inputFormat = 'yyyy/MM/dd', value = null, ...defaultProps } = props;
    const [date, setDate] = useState(value);
    const style = useDatePickerStyle();
    const { getMode } = useContext(ThemContext);
    const borderColor = getMode === 'light' ? '1px solid black' : '1px solid white';
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={enUS}>
            <Box>
                <Typography> {label} </Typography>
                <KeyboardDatePicker
                    helperText=""
                    disableToolbar
                    autoOk
                    className={style.datePicker}
                    variant="inline"
                    inputVariant="outlined"
                    value={value}
                    onMonthChange={(date) => setDate(date)}
                    format={inputFormat}
                    PopoverProps={{
                        className: style.MuiPickersBasePicker,
                    }}
                    keyboardIcon={<Calendar className={style.iconCalendar} />}
                    {...defaultProps}
                    renderDay={(day, selectedDate, dayInMonth, dayComponent) => {
                        if (!dayInMonth) {
                            return (
                                <div
                                    style={{
                                        width: '36px',
                                        height: '36px',
                                        borderBottom:
                                            (day.getMonth() < date.getMonth() &&
                                                day.getFullYear() === date.getFullYear()) ||
                                                day.getFullYear() < date.getFullYear()
                                                ? borderColor
                                                : 'none',
                                        boxSizing: 'border-box',
                                    }}
                                ></div>
                            );
                        }

                        return React.cloneElement(dayComponent, {
                            style: {
                                borderBottom: borderColor,
                                borderRight: borderColor,
                                borderLeft: day.getDate() === 1 ? borderColor : 'none',
                            },
                        });
                    }}
                />
            </Box>
        </MuiPickersUtilsProvider>
    );
};
export default AppDatePicker;
