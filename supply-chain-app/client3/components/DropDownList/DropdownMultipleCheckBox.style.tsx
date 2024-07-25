import { makeStyles, Theme } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import { color } from '../CSSConstant/css.constant';

export function useDropdownMultipleCheckBoxStyle(): ClassNameMap {
    const { greyNew } = color;
    const useStyles = makeStyles((theme: Theme) => ({
        root: {
            ['& .MuiMenu-paper']: {
                border: `1px solid ${greyNew}`,
                backgroundColor: theme.palette.action.disabledBackground,
                '& .MuiListItemIcon-root': {
                    minWidth: '0px !important',
                },
                '& .MuiList-padding': {
                    padding: 0,
                    backgroundColor: theme.palette.action.disabledBackground,
                    border: '1px solid',
                },
                '& .MuiMenuItem-root:hover': {
                    backgroundColor: '#585B62',
                },
                '& .MuiListItem-root.Mui-selected': {
                    backgroundColor: '#585B62 !important',
                    width: '100% !important',
                },
                '& .MuiListItem-root.Mui-focusVisible': {
                    backgroundColor: '#585B62 !important',
                },
            },
        },
        select: {
            height: '2rem',
            width: '75%',
            paddingRight: '0.5rem',
            borderRadius: '3px',
            ['& .MuiOutlinedInput-notchedOutline']: {
                borderColor: theme.palette.text.primary,
                borderRadius: '3px',
            },
            ['& .MuiOutlinedInput-input']: {
                padding: '12px',
                backgroundColor: 'transparent',
            },
            '& .MuiSelect-icon': {
                color: theme.palette.text.primary,
            },
            '& .MuiSelect-iconOutlined': {
                right: '-5px !important',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.text.primary,
                borderRadius: '3px',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.text.primary,
                borderRadius: '3px',
            },
        },
        menuItem: {
            minHeight: '2rem',
            width: '100% !important',
        },
        label: {
            borderColor: theme.palette.text.primary,
            fontSize: '11pt',
        },
        checkbox: {
            backgroundColor: theme.palette.action.active,
            color: theme.palette.action.active,
            borderRadius: '4px',
            overflow: 'hidden',
            margin: '5px 10px',
            height: '20px',
            width: '20px',
            '& .MuiCheckbox-root': {
                color: theme.palette.text.primary,
            },
            '& .MuiSvgIcon-root': {
                marginTop: '-9px',
                marginLeft: '-2px',
            },
        },
        iconItem: {
            color: 'transparent',
            marginLeft: '-6px',
        },
        checkIcon: {
            color: theme.palette.action.disabled,
            marginTop: '-6px !important',
        },
        selectIcon: {
            position: 'absolute',
            height: '100%',
            width: 'auto',
            top: 0,
            color: theme.palette.text.primary,
        },
    }));
    return useStyles();
}
