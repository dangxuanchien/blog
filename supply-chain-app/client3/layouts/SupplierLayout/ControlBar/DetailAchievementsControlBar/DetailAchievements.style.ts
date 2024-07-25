import { cssConstant } from '@/components/CSSConstant/css.constant';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        companyName: {
            marginTop: '18px',
            marginBottom: '14px',
            fontSize: `${cssConstant.font.mainTitle}`,
            fontWeight: 'bold',
        },
        boxSelect: {
            display: 'flex',
            textAlign: 'center',
            color: theme.palette.text.primary,
            borderRadius: '4px',
            width: '70%',
            height: '24px',
            backgroundColor: 'transparent',
            marginTop: '6px',
            '&:nth-child(1)': {
                marginTop: '0px',
            },
        },
        label: {
            marginTop: '20px',
            display: 'flex',
            width: '80%',
            textAlign: 'center',
            justifyContent: 'space-between',
            fontSize: `${cssConstant.font.title}`,
            color: theme.palette.text.primary,
        },
        labelParameter: {
            marginLeft: '5px',
        },
        allBoxSelect: {
            marginBottom: '5px',
            paddingLeft: '7px',
            fontSize: `${cssConstant.font.title}`,
        },
        checkBox: {
            backgroundColor: theme.palette.action.active,
            color: theme.palette.action.active,
            borderRadius: '3px',
            width: '16px',
            height: '16px',
            overflow: 'hidden',
            marginTop: '3px',
            marginLeft: '10px',
        },
        iconItem: {
            color: 'transparent',
        },
        checkIcon: {
            color: theme.palette.action.disabled,
            top: '-3px',
            right: '1px',
            position: 'absolute',
        },
        boxExpand: {
            '&:hover': {
                cursor: 'pointer',
            },
        },
        selectParameter: {
            marginBottom: '30px',
        },
        company: {
            fontSize: `${cssConstant.font.mainTitle}`,
            fontWeight: 'bold',
        },
        datePicker: {
            display: 'flex',
        },
    })
);
