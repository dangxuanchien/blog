import { cssConstant } from '@/components/CSSConstant/css.constant';
import { createStyles, makeStyles, Theme } from '@material-ui/core';

export function useSearchResultStyle() {
    const { mainButton, font, activeButton } = cssConstant;
    const { mainTitle } = font;
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            container: {
                boxSizing: 'border-box',
                width: '100%',
                height: '100%',
            },

            iconShowMoreDown: {
                fill: theme.palette.text.primary,
            },
            containerContent: {
                width: '97%',
            },
            containerTable: {
                width: '100%',
                height: 'auto',
                minHeight: '15.6rem',
                overflow: 'hidden',
                marginBottom: '10px',
            },
            table: {
                padding: '10px 10px',
                borderRadius: '10px',
                backgroundColor: theme.palette.primary.contrastText,
            },
            label: {
                marginBottom: '22px',
            },
            containerComparison: {
                width: 'fit-content',
                maxWidth: '100%',
            },
            containerChart: {
                width: '100%',
                height: 'auto',
            },
            modelDetails: {
                width: '100%',
                marginTop: '20px',
                marginBottom: '10px',
                borderRadius: '10px',
                padding: '8px 4px',
                backgroundColor: theme.palette.primary.contrastText,
            },
            labelDetail: {
                fontSize: '14pt',
                fontWeight: 'bold',
                padding: '0px 14px',
            },
            tableModelDetail: {
                marginTop: '1.2rem',
                marginLeft: '1rem',
            },
            containerButton: {
                width: '100%',
                overflow: 'hidden',
                position: 'relative',
                height: 40,
                alignItems: 'center',
            },
            buttonDetail: {
                paddingLeft: '2rem',
            },
            buttonTrustComparison: {
                ...mainButton,
                width: '8rem',
                minWidth: '8rem',
                float: 'left',
                marginRight: '1.5rem',
                marginBottom: '5px',
                ['@media (max-width:1400px)']: {
                    width: '40% !important',
                },
            },
            activeButtonTrustComparison: {
                ...mainButton,
                width: '8rem',
                minWidth: '8rem',
                float: 'left',
                marginRight: '1.5rem',
                marginBottom: '5px',
                ...activeButton,
            },
            buttonPriceComparison: {
                ...mainButton,
                width: '8rem',
                minWidth: '8rem',
                float: 'left',
                ['@media (max-width:1400px)']: {
                    width: '40% !important',
                },
            },
            activeButtonPriceComparison: {
                ...mainButton,
                width: '8rem',
                minWidth: '8rem',
                float: 'left',
                ...activeButton,
            },
            buttonShowMore: {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            },
            iconShowMore: {
                width: '1.8rem',
                height: '1.8rem',
                borderRadius: '5px',
                color: theme.palette.text.primary,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '0 0 0 1px',
                '&:hover': {
                    backgroundColor: 'var(--silver-grey)',
                    color: 'var(--white)',
                    transition: '0.2s',
                },
            },
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
            labelCountCompany: {
                color: 'var(--dark-yellow)',
                fontWeight: 300,
            },
            labelNumber: {
                fontSize: '15pt',
            },
            dataPicker: {
                float: 'right',
                margin: '-13px 20px 0 0',
            },
            chart: {
                padding: '0px 10px',
            },
        })
    );
    return useStyles();
}
