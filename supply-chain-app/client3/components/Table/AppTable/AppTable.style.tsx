import { color } from '@/components/CSSConstant/css.constant';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
const { disabledBackground } = color;
/**
 * The default style of table
 */
const useAppTableStyle = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            '& *': {
                boxShadow: 'none',
                transition: 'max-height 0.5s ease-in-out',
            },
            '& .MuiPaper-rounded': {
                borderRadius: '0',
            },
            '& .MuiPaper-rounded .MuiToolbar-gutters': {
                minHeight: '0',
            },
            '& .MuiPaper-root': {
                backgroundColor: theme.palette.secondary.contrastText,
            },
            '& th::after': {
                content: '""',
                position: 'absolute !important',
                left: '0 !important',
                width: '100% !important',
                bottom: '0px !important',
                borderBottom: `2px solid ${theme.palette.text.primary} !important`,
            },
            '& 	.MuiTableSortLabel-icon': {
                width: '16px',
            },
            '& .MuiTableSortLabel-iconDirectionDesc': {
                fill: '#FFDA0A',
            },
        },
        headerCell: {
            color: theme.palette.text.primary,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'column',
            height: '100%',
        },
        titleHeaderCell: {
            color: theme.palette.text.primary,
            zIndex: 2,
        },
        iconSortHeader: {
            marginTop: 'auto',
            zIndex: 2,
            '&:hover': {
                cursor: 'pointer',
                color: 'var(--white)',
            },
        },
        headerTable: {
            backgroundColor: theme.palette.primary.dark,
            position: 'sticky',
            top: '0px',
            zIndex: 1,
        },
        headerRow: {
            height: '10px',
        },
        headerTableCell: {
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.text.primary,
            textAlign: 'center',
            padding: '0 1px',
            fontSize: '16px',
            fontWeight: 600,
            borderBottom: 'none',
            zIndex: 1,
            position: 'sticky',
            height: '100%',
        },
        subHeaderTableCell: {
            borderTop: `2px solid ${theme.palette.text.primary}`,
            borderBottom: 'none',
            fontWeight: 'inherit',
        },
        rowStyle: {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.text.primary,
            '&:hover': {
                backgroundColor: disabledBackground,
            },
            '& .MuiTableCell-body': {
                border: 'none',
            },
        },
        cellDataStyle: {
            padding: '0px 5px 0px 5px',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
        },
        cellText: {
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
        },
        tooltip: {
            fontSize: '11pt',
            backgroundColor: theme.palette.text.primary,
            color: theme.palette.secondary.light,
        },
        arrowTooltip: {
            color: theme.palette.text.primary,
        },
    })
);
export default useAppTableStyle;
