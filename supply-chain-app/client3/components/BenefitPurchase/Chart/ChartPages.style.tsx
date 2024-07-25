import { cssConstant } from '@/components/CSSConstant/css.constant';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
export function useChartPagesStyle() :ClassNameMap {
    const { text, font } = cssConstant;
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            main: {
                padding: '0px 40px',
            },
            chart: {
                marginRight: '30px',
            },
            chart__label: {
                ...text,
                color: theme.palette.text.primary,
                marginBottom: '15px',
            },
            lableY: {
                marginLeft: '25px',
                fontSize: `${font.title}`,
                color: theme.palette.text.primary,
                marginBottom: '5px',
            },
            lableYRight: {
                marginLeft: '25px',
                fontSize: `${font.title}`,
                color: theme.palette.text.primary,
                marginBottom: '35px',
            },
            lableX: {
                marginTop: '-60px',
                marginRight: '-50px',
                fontSize: `${font.title}`,
                color: theme.palette.text.primary,
                float: 'right',
                width: '42px',
            },
            chartNew: {
                position: 'relative',
            },
        })
    );
    return useStyles();
}
