import { color } from '@/components/CSSConstant/css.constant';
import { makeStyles, Theme } from '@material-ui/core';

import { ClassNameMap } from '@material-ui/core/styles/withStyles';

export function useAppMultipleDropdownstyle(): ClassNameMap {
    const { greyNew } = color;
    const useStyles = makeStyles((theme: Theme) => ({
        root: {
            ['& .MuiMenu-paper']: {
                border: `1px solid ${greyNew}`,
                backgroundColor: theme.palette.action.disabledBackground,
                '& .MuiListItemIcon-root': {
                    minWidth: '0px',
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
                    backgroundColor: '#585B62',
                    width: '100% !important',
                },
                '& .MuiListItem-root.Mui-focusVisible': {
                    backgroundColor: '#585B62',
                },
            },
        },
        select: {
            height: '2rem',
            width: '75% !important',
            paddingRight: '0.5rem',
            borderRadius: '3px',
            ['& .MuiOutlinedInput-notchedOutline']: {
                borderColor: theme.palette.text.primary,
                borderRadius: '3px',
            },
            ['& .MuiOutlinedInput-input']: {
                padding: '12px !important',
                backgroundColor: 'transparent',
            },
            '& .MuiSelect-icon': {
                color: theme.palette.text.primary,
                fontWeight: 'bold',
                height: '100%',
            },
            '& .MuiSelect-iconOutlined': {
                right: '-12px !important',
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
            width: '100%',
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
            marginTop: '-6px',
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