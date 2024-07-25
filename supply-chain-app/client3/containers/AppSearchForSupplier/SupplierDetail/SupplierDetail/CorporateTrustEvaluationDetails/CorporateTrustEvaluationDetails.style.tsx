import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import { Theme, createStyles, makeStyles } from '@material-ui/core';
import { color, cssConstant } from '@/components/CSSConstant/css.constant';

const {
    font: { mainTitle },
} = cssConstant;

export function useCorporateTrustEvaluationDetailsStyle(): ClassNameMap {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            companyName: {
                fontSize: `${mainTitle}`,
                fontWeight: 'bold',
            },
            contentContainer: {
                width: '100%',
                height: 'auto',
                padding: '16px 16px 0',
                backgroundColor: theme.palette.primary.light,
                borderRadius: '10px',
                marginBottom: '10px',
                color: theme.palette.text.primary,
                overflowY: 'auto',
            },
            labelScore: {
                fontSize: `${mainTitle}`,
                fontWeight: 'bold',
            },
            typeScore: {
                color: color.yellow,
            },
            score: {
                fontSize: `${mainTitle}`,
                fontWeight: 'bold',
            },
            scoreWithColor: {
                color: '#FFDA0A',
            },
            table: {
                minWidth: 580,
                maxWidth: 630,
                '& tbody tr:last-child td:last-child': {
                    overflow: 'hidden',
                },
            },
            tradingDatelabel: {
                display: 'flex',
                justifyContent: 'space-around',
                gap: 18,
                lineHeight: '20px',
            },

            barChart: {
                position: 'relative',
                minWidth: '562px',
                '& canvas': {
                    width: '530px !important',
                    height: '265px !important',
                },
            },
            chartTop: {
                height: 'calc(100% - 58px)',
                marginTop: 0,
                marginBottom: 0,
                padding: '0px 20px',
                display: 'flex',
            },
            wrapTableBarChart: {
                padding: '8px 20px 20px 20px',
            },
        })
    );
    return useStyles();
}
