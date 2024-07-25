
import { makeStyles, Theme } from '@material-ui/core';

export const useAppInput = makeStyles((theme: Theme) => ({
    textField: {
        ['& fieldset']: {
            borderRadius: '3px',
            border: `1px solid ${theme.palette.text.primary}`,
        },
        ['& .MuiOutlinedInput-input']: {
            padding: 0,
            height: '2rem',
            paddingLeft: '5px',
        },
        '& .MuiOutlinedInput-root': {
            borderRadius: '3px !important',
        },
        '& .Mui-focused': {
            border: `1px solid ${theme.palette.text.primary}`,
            height: '2rem',
            borderRadius: '3px !important',
        },
    },
    label: {
        marginLeft: '5px',
        marginRight: '3px',
        color: theme.palette.text.primary,
        fontSize: '11pt'
    },
}));
