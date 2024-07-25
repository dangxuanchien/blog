import { useContext } from 'react';
import { color, cssConstant } from '@/components/CSSConstant/css.constant';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { ThemContext } from 'context/ThemeContext';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';

export function useReadFilePDFStyle(): ClassNameMap {
    const {
        font: { mainTitle, title },
        button,
    } = cssConstant;
    const { white } = color;
    const { getMode } = useContext(ThemContext);
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            viewPage: {
                backgroundColor: getMode === 'light' ? 'transparent' : 'var(--darkmodeItem)',
                border: getMode === 'light' ? `1px solid ${theme.palette.primary.main}` : 'transparent',
                margin: '5px 0 0 0',
                padding: '10px',
                borderRadius: 5,
                height: '908px',
            },
            companyName: {
                fontSize: `${mainTitle}`,
                fontWeight: 'bold',
                margin: '10px',
            },
            scoreWithColor: {
                color: '#FFDA0A',
            },
            typeScore: {
                fontSize: `${title}`,
                fontWeight: 'bold',
            },
            score: {
                fontSize: `${title}`,
                fontWeight: 'bold',
            },
            btn: {
                ...button,
                width: '12rem',
                height: '1.6rem',
                borderRadius: '6px',
                border: `1px solid ${white}`,
                margin: '23px',
                textTransform: 'capitalize',
            },
            containerInformation: {
                width: '520px',
                height: '20px',
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
            },
            containerScore: {
                width: '240px',
                margin: '10px',
                textAlign: 'right',
            },
            containerPDF: {
                margin: '20px 10px',
                ['& .rpv-core__inner-page']: {
                    backgroundColor: 'rgba(71, 74, 82, 0.5)',
                },
            },
        })
    );
    return useStyles();
}
