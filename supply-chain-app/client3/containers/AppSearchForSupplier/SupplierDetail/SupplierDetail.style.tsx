import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import { Theme, createStyles, makeStyles } from '@material-ui/core';

export function useSupplierDetailStyle(): ClassNameMap {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            wrapper: {
                width: '100%',
                minWidth: '800px',
                height: '100%',
                minHeight: '800px',
                padding: '0 21px 0 10px',
            },
        })
    );

    return useStyles();
}
