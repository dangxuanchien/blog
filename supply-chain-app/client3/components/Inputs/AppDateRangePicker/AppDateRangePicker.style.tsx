import { makeStyles } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';

export function useDateRangePickerStyle(): ClassNameMap {
    const useStyles = makeStyles(() => ({
        mainDatePicker: {
            display: 'flex',
            alignItems: 'end',
            justifyContent: 'center',
        },
        divide: {
            fontWeight: 'bold',
            height: '30px',
            margin: '0 10px ',
        },
    }));
    return useStyles();
}
