import { cssConstant } from '@/components/CSSConstant/css.constant';
import { createStyles, makeStyles, Theme } from '@material-ui/core';

export function useCompanyCompareStyle() {
    const {
        font: { mainTitle },
    } = cssConstant;
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            modelPriceComparison: {
                width: '100%',
                marginTop: '20px',
                padding: '10px 0.5%',
                backgroundColor: theme.palette.secondary.contrastText,
                borderRadius: '10px',
            },
            labelCompanySearchResults: {
                fontSize: `${mainTitle}`,
                fontWeight: 'bold',
                padding: '0px 10px',
            },
            dataPicker: {
                float: 'right',
                margin: '-13px 20px 0 0',
            },
        })
    );
    return useStyles();
}
