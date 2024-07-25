import { cssConstant } from '@/components/CSSConstant/css.constant';
import { createStyles, makeStyles } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';

export function useSearchButtonStyle(): ClassNameMap {
    const { mainButton, labelSearch, activeButton } = cssConstant;
    const useStyles = makeStyles(() =>
        createStyles({
            buttonSearch: {
                ...mainButton,
                marginRight: '10px',
            },
            activeButtonSearch: {
                ...mainButton,
                marginRight: '10px',
                cursor: 'default',
                pointerEvents: 'none',
                ...activeButton,
            },
            disableButtonSearch: {
                ...mainButton,
                marginRight: '10px',
                color: '#7F7F7F !important',
                border: '1px solid #7F7F7F !important',
                backgroundColor: 'var(--default-button) !important',
            },
            containerFlex: {
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'nowrap',
                justifyContent: 'space-between',
                alignItems: 'stretch',
                alignContent: 'space-between',
                marginTop: '12px',
            },
            labelSearch: {
                ...labelSearch,
            },
            search: {
                'margin-Right': '25px',
            },
            parameter: {
                textAlign: 'center',
            },
        })
    );
    return useStyles();
}
