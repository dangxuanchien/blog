import { cssConstant } from '@/components/CSSConstant/css.constant';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';

export function useStyles(): ClassNameMap {
    const {
        font: { mainTitle },
    } = cssConstant;
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            detailTitle: {
                fontSize: `${mainTitle}`,
                fontWeight: 'bold',
            },
            detailTitle2: {
                padding: '10px',
                fontSize: `${mainTitle}`,
                fontWeight: 'bold',
                margin: '2px',
            },
            containerChart: {
                display: 'flex',
                flexWrap: 'wrap',
            },
            containerChart2: {
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                borderRadius: 5,
                height: '100%',
            },
            layerChart: {
                position: 'absolute',
                bottom: 0,
            },
            renderChart: {
                position: 'relative',
                borderRadius: 5,
                width: '100%',
                height: '44vh',
                margin: '10px',
                padding: '15px',
                backgroundColor: theme.palette.success.dark,
                border: `1px solid ${theme.palette.primary.main}`,
            },
            renderChart2: {
                position: 'relative',
                backgroundColor: theme.palette.success.dark,
                border: `1px solid ${theme.palette.primary.main}`,
                borderRadius: 5,
                boxSizing: 'border-box',
                // margin: '16px',
                width: '35vw',
                height: '46vh',
                marginLeft: '16px',
                marginBottom: '16px',
            },
        })
    );
    return useStyles();
}
