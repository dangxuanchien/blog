import { cssConstant } from '@/components/CSSConstant/css.constant';
import { createStyles, makeStyles } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';

export function useSearchButtonStyle(): ClassNameMap {
    const {  labelSearch } = cssConstant;
    const useStyles = makeStyles(() =>
        createStyles({
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
            labelSearch,
            search: {
                display: 'flex',
                gap: 10,
                marginRight: 10
            },
            parameter: {
                textAlign: 'center',
            },
        })
    );
    return useStyles();
}
