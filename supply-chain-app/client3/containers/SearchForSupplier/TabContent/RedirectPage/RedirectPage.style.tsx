import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import { createStyles, makeStyles } from '@material-ui/core';

export function useRedirectPageStyle(): ClassNameMap {
    const useStyles = makeStyles(() =>
        createStyles({
            viewPage: {
                width: '100%',
                height: '100%',
                borderRadius: 5,
            },
        })
    );
    return useStyles();
}