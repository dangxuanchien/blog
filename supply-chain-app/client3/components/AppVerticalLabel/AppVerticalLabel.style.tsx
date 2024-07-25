import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';

export function useAppVerticalLabelStyle(): ClassNameMap {
    const useStyles = makeStyles(() =>
        createStyles({
            verticalLabel: {
                width: '45px',
                height: '100%',
                marginRight: '10px',
                display: 'flex',
                justifyContent: 'center',
                '& > p': {
                    writingMode: 'vertical-rl',
                    textOrientation: 'mixed',
                    color: '#ffffff',
                    height: '100%',
                    textAlign: 'center',
                    fontWeight: '600',
                },
            },
        })
    );

    return useStyles();
}
