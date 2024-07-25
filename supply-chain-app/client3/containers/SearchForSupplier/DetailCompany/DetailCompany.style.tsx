import { cssConstant } from '@/components/CSSConstant/css.constant';
import { makeStyles, Theme } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';

export function useDetailCompanyStyle(): ClassNameMap {
    const useStyles = makeStyles((theme: Theme) => ({
        hideOyRada: {
            position: 'absolute',
            top: '0',
            bottom: '0',
            left: '0',
            width: '3px',
            backgroundColor: theme.palette.primary.light,
        },
        hideOxRada: {
            position: 'absolute',
            right: '0',
            bottom: '0',
            left: '0',
            height: '3px',
            backgroundColor: theme.palette.primary.light,
        },
        overallScoreLabelWrapper: {
            fontSize: `${cssConstant.font.mainTitle}`,
        },
        overallScoreLabel: {
            color: theme.palette.text.disabled,
        },
        productTable: {
            color: '#3E5673',
            fontSize: '0.8rem',
        },
        underlineHeader: {
            textAlign: 'left',
        },
        mainContent: {
            marginLeft: '1rem',
            marginRight: '0.2rem',
            '&::-webkit-scrollbar': {
                width: '12px',
                transition: 'all 0.25s ease',
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#BDC2CB',
                border: 'none',
                borderRadius: '0px',
            },
        },
        mainContent2: {
            height: 'calc(100% - 72px)',
            overflowX: 'hidden',
        },
        wrapperContentTable: {
            height: '19.5rem',
        },
        wrapperLabel: {
            position: 'absolute',
            top: '8%',
            paddingLeft: '10px',
            textAlign: 'start',
        },
        textLabel: {
            margin: 0,
            fontSize: `${cssConstant.font.mainTitle}`,
        },
        textLabelOverallScore: {
            margin: 0,
            width: '300px',
            fontSize: `${cssConstant.font.mainTitle}`
        },
        imageIntroduce: {
            textAlign: 'center',
        },
        wrapperTransactionTable: {
            paddingTop: '0px',
        },
        iconUser: {
            position: 'relative',
            left: '1rem',
            top: '1rem',
            color: '#7F7F7F',
        },
        textOnChatBox: {
            color: 'var(--white)',
            padding: '10px',
            height: '5rem',
            overflow: 'hidden',
            overflowWrap: 'break-word',
        },
        customChart: {
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            direction: 'rtl',
            '& canvas': {
                width: 'calc(100% + 5px) !important',
                height: 'calc(100% + 5px) !important',
            },
        },
        lineScore: {
            position: 'absolute',
            top: '30%',
            right: '9px',
            fontSize: `${cssConstant.font.fontTitle}`,
            fontWeight: 'bold',
            color: theme.palette.text.disabled,
        },
        lineMedium: {
            position: 'absolute',
            fontSize: `${cssConstant.font.fontTitle}`,
            fontWeight: 'bold',
            color: theme.palette.success.main,
            left: '5%',
            top: '60%',
        },
        chatIcon: {
            position: 'relative',
            top: '2%',
            background: '#595959',
            borderRadius: '15px',
            display: 'block',
            filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))',
            height: '5rem',
            zIndex: 1,
            marginLeft: '28px',
            '&:before': {
                content: '""',
                position: 'absolute',
                borderTop: '12px solid transparent',
                borderBottom: '4px solid transparent',
                borderRight: '24px solid #595959',
                left: '-24px',
                top: '1rem',
            },
        },
        chatBubble: {
            width: '14rem',
        },
        containerLink: {
            textAlign: 'center',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
        },
        tooltip: {
            fontSize: '11pt',
            backgroundColor: theme.palette.text.primary,
            color: theme.palette.secondary.light,
        },
        arrowTooltip: {
            color: theme.palette.text.primary,
        },
    }));
    return useStyles();
}
