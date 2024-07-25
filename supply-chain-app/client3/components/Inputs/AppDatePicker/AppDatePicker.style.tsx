import { makeStyles, Theme } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';

export function useDatePickerStyle(): ClassNameMap {
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
                color: 'var(--white)',
                marginRight: '-8px',
            },
        },
        MuiPickersBasePicker: {
            ['& .MuiPopover-paper']: {
                backgroundColor: theme.palette.action.disabledBackground,
                border: `2px solid ${theme.palette.text.primary} !important`,
                overflowY: 'hidden',
                borderRadius: '0px',
                marginTop: '10px',
                height: '305px',
            },
            ['& .MuiPickersCalendarHeader-iconButton']: {
                backgroundColor: 'transparent',
                color: theme.palette.text.primary,
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
                    borderRight: `1px solid ${theme.palette.text.primary} !important`,
                },
            },
            ['& .MuiPickersDay-current']: {
                color: theme.palette.text.primary,
            },
            ['& .MuiPickersDay-dayDisabled']: {
                color: theme.palette.text.hint,
            },
        },
        iconCalendar: {
            width: '25px',
            height: 'auto',
            zIndex: 1,
        },
    }));
    return useStyles();
}
