import { color } from '@/components/CSSConstant/css.constant';

import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';

export function appCustomComboBoxStyle(): ClassNameMap {
    const { greyNew, lightGrey } = color;
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
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
                        backgroundColor: `${lightGrey}`,
                    },
                    '& .MuiListItem-root.Mui-selected': {
                        backgroundColor: '#585B62',
                        width: '100%',
                    },
                    '& .MuiListItem-root.Mui-focusVisible': {
                        backgroundColor: '#585B62',
                    },
                },
            },
            select: {
                height: '32px',
                width: '100%',
                borderRadius: '3px',
                backgroundColor: 'theme.palette.action.disabledBackground !important',
                ['& .MuiOutlinedInput-notchedOutline']: {
                    borderColor: theme.palette.text.primary,
                    borderRadius: '3px',
                },
                '& .MuiSelect-select:focus': {
                    backgroundColor: 'transparent',
                },
                ['& .MuiOutlinedInput-input']: {
                    padding: '13px 7px 13px 7px',
                },
                '& .MuiSelect-icon': {
                    color: theme.palette.text.primary,
                },
                '& .MuiSelect-iconOutlined': {
                    right: '-5px',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.text.primary,
                    borderRadius: '3px',
                    borderWidth: '1px',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.text.primary,
                    borderRadius: '3px',
                },
            },
            menuItem: {
                minHeight: '32px',
                width: '100%',
                padding: '7px',
                fontSize: '12px',
            },
            label: {
                borderColor: theme.palette.text.primary,
                fontSize: '15px',
            },
            selectIcon: {
                position: 'absolute',
                height: '100%',
                width: 'auto',
                top: 0,
                padding: '0px 7px',
                color: theme.palette.text.primary,
            },
        })
    );
    return useStyles();
}
