import { cssConstant } from '@/components/CSSConstant/css.constant';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import { CSSProperties } from 'react';

export function useDetailSearchConditionStyle(): ClassNameMap {
    const { button } = cssConstant;
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                width: 'calc(100% - 40px)',
                height: '100%',
                backgroundColor: theme.palette.primary.light,
                padding: '12px 20px',
                margin: '0 20px',
                border: `1px solid ${theme.palette.primary.main}`,
                borderRadius: '8px',
                overflow: 'auto',
            },
            title: {},
            textFieldInputSearch: {
                width: '22%',
                marginRight: '20px',
                marginLeft: '0',
            },
            search: {
                margin: '12px 0px 12px 54px',
            },
            content: {},
            input: {
                height: '32px',
            },
            textFiled: {
                height: '32px',
                width: '300px',
                '& .MuiInputBase-root': {
                    height: '100%',
                    border: `1px solid ${theme.palette.text.primary}`,
                    overflow: 'hidden',
                    '& input': {
                        paddingLeft: '4px',
                        paddingRight: '4px',
                    },
                },
            },
            button: {
                ...button,
                float: 'none',
                width: '100px',
                height: '32px',
                borderRadius: '4px',
                border: '1px solid #fff',
            },
            centerButton: {
                display: 'block',
                margin: '0px auto',
            },
            warningLabel: {},
            tableContainer: {
                margin: '20px 0',
            },
            tableTitle: {
                margin: '0 54px',
            },
        })
    );
    return useStyles();
}

export const columStyle: CSSProperties = {
    border: 'none',
    paddingLeft: '0px',
    whiteSpace: 'normal',
};

export const columnStyleHeader: CSSProperties = {
    backgroundColor: '#32363e',
    fontWeight: 'bold',
    paddingLeft: '0px',
    whiteSpace: 'normal',
};
