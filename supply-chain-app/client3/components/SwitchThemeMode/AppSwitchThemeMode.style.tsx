import { makeStyles, Theme, createStyles, withStyles } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';

export const useAppSwitchThemeStyles = makeStyles((theme: Theme) =>
    createStyles({
        darkMode: {
            display: 'flex',
            alignItems: 'center',
            zIndex: 1,
            width: '130px',
            float: 'right',
        },
        darkText: {
            color: theme.palette.action.selected,
            fontWeight: 'bold',
            fontSize: '12px',
        },
        lightText: {
            color: theme.palette.secondary.main,
            fontWeight: 'bold',
            fontSize: '12px',
        },
    })
);

export const CustomSwitch = withStyles(() =>
    createStyles({
        root: {
            width: 38,
            height: 20,
            padding: '2px 0px',
            display: 'flex',
            margin: '0 3px',
        },
        switchBase: {
            padding: '3px 2px',
            color: 'white',
            '&$checked': {
                color: 'black  ',
                '& + $track': {
                    opacity: 1,
                    backgroundColor: 'var(--white)',
                    border: '1px solid var(--black)',
                },
            },
        },
        thumb: {
            width: 14,
            height: 14,
            boxShadow: 'none',
        },
        track: {
            borderRadius: 8,
            opacity: 1,
            backgroundColor: 'var(--silver-grey)',
            border: '1px solid var(--white)',
        },
        checked: {},
    }),
)(Switch);