import { color, cssConstant } from '@/components/CSSConstant/css.constant';
import { Column } from '@material-table/core';
import { makeStyles } from '@material-ui/core';
import { TFunction } from 'i18next';

const { white } = color;
const { button } = cssConstant;

export const useAchievementStyles = makeStyles(() => ({
    table: {
        height: '100%',
        overflowY: 'scroll',
        overflowX: 'hidden',
        marginTop: '0px',
        display: 'flex',
        alignItems: 'center',
        '&::-webkit-scrollbar': {
            width: '7px',
            transition: 'all 0.25s ease',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#BDC2CB',
            border: 'none',
        },
        '& .MuiTableRow-head': {
            display: 'none',
        },
        '&  div[class^="Component-horizontalScrollContainer"]': {
            display: 'flex',
            alignItems: 'center',
            paddingTop: '10px',
        },
        '& div[class^="Component-horizontalScrollContainer"]': {
            '& div': {
                '& div': {
                    maxHeight: '100px',
                },
            },
        },
    },
    btn: {
        ...button,
        width: '2rem',
        height: '1.6rem',
        borderRadius: '6px',
        border: `1px solid ${white}`,
    },
}));


export const getColumns = (isLightMode: boolean, t: TFunction) => {
    const cellStyle: React.CSSProperties = {
        padding: '3px',
        fontSize: '16px',
        background: isLightMode ? 'var(--white)' : 'var(--darkmodeItem)',
        borderBottom: 'none',
        textAlign: 'center',
    };
    const headerStyle: React.CSSProperties = {
        borderBottom: 'none',
        padding: '10px',
        background: isLightMode ? 'var(--white)' : 'var(--darkmodeItem)',
        textAlign: 'right',
    };

    const columns: Array<Column<any>> = [
        {
            title: t('supplierdetails.item'),
            field: 'item',
            width: 'max-content',
            cellStyle: { ...cellStyle, textAlign: 'right' },
            headerStyle: { ...headerStyle },
        },
        {
            title: t('supplierdetails.numericalValue'),
            field: 'detail',
            width: 'max-content',
            cellStyle: { ...cellStyle, textAlign: 'left' },
            headerStyle: { ...headerStyle },
        },
    ];
    return columns;

};
