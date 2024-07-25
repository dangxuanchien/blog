import { makeStyles, Theme } from '@material-ui/core';

export const useAppMultipleCheckboxStyles = makeStyles((theme: Theme) => ({
    wrapper: {
        zIndex: 10,
        '&.MuiPaper-root': {
            backgroundColor: '#474A52',
            border: `1px solid ${theme.palette.text.primary}`,
            borderRadius: '4px',
        },
    },
    menuItem: {
        height: 32,
        paddingLeft: 8,
        '&.MuiMenuItem-root:hover': {
            backgroundColor: 'rgba(50,54,62,0.5)',
        },
    },
    checkBox: {
        '& .MuiIconButton-label': {
            position: 'relative',
        },
    },
    icon: {
        color: '#585B62',
    },
    iconCheck: {
        color: '#585B62',
        zIndex: 10,
    },
    overlayIcon: {
        backgroundColor: 'white',
        position: 'absolute',
        width: 18,
        height: 18,
        zIndex: 1,
    },
    checkBoxNew: {
        backgroundColor: theme.palette.action.active,
        color: theme.palette.action.active,
        borderRadius: '4px',
        width: '21px',
        height: '21px',
        overflow: 'hidden',
        marginLeft: '7px',
    },
}));
