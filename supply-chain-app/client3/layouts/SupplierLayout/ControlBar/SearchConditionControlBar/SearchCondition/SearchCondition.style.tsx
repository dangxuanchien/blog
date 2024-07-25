import { cssConstant } from '@/components/CSSConstant/css.constant';
import { createStyles, makeStyles } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';

export function useSearchConditionStyle(): ClassNameMap {
    const { comboBox, labelSearch } = cssConstant;
    const useStyles = makeStyles(() =>
        createStyles({
            comboBox,
            parameter: {
                textAlign: 'center',
            },
            containerFlex: {
                width: '350px',
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'nowrap',
                justifyContent: 'space-between',
                alignItems: 'stretch',
                alignContent: 'space-between',
            },
            labelSearch,
            search: {
                'margin-Right': '25px',
            },
            main: {
                overflowY: 'scroll',
                overflowX: 'hidden',
                paddingRight: '5px', // need update
                marginTop: '10px',
            },
            elementFilter: {
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                marginTop: '10px',
            },
        })
    );

    return useStyles();
}
