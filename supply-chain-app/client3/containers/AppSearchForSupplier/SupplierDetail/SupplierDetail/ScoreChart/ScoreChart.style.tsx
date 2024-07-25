import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import { Theme, createStyles, makeStyles } from '@material-ui/core';

export function useScoreChartStyle(): ClassNameMap {
    const useStyles = makeStyles((theme: Theme) => createStyles({}));

    return useStyles();
}
