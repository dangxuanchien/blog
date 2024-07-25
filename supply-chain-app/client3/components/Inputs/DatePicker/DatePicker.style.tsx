import { makeStyles, Theme } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
export function useDatePickerStyle(): ClassNameMap {
    const useStyles = makeStyles((them: Theme) => ({
        datePicker: {
            ['& fieldset']: {
                borderRadius: 0,
                borderColor: '#B4C7E7',
            },
            ['& .MuiOutlinedInput-input']: {
                padding: 0,
                height: '2.5rem',
                width: '6rem',
                paddingLeft: '5px',
                fontWeight: 'bold',
            },
            ['& .MuiIconButton-root']: {
                padding: 0,
                color: '#2E75B6',
            },
        },
        divide: {
            fontWeight: 'bold',
            paddingLeft: '5px',
            paddingRight: '5px',
        },
        mainDatePicker: {
            display: 'inline-Flex',
            alignItems: 'center',
        },
        MuiPickersBasePicker: {
            ['& .MuiPopover-paper']: {
                backgroundColor: them.palette.primary.light,
            },
            ['& .MuiPickersCalendarHeader-iconButton']: {
                backgroundColor: 'transparent',
                color: 'var(--white)',
            },
            ['& .MuiPickersDay-daySelected']: {
                backgroundColor: 'var(--silver-grey)',
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
                border: `1px solid ${them.palette.text.primary}`,
                margin: '0',
            },
            ['& .MuiPickersCalendarHeader-dayLabel']: {
                color: them.palette.text.primary,
                fontSize: '14px',
            },
        },
    }));
    return useStyles();
}
