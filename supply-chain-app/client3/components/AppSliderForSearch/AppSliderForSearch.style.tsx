import { Slider, Theme, createStyles, makeStyles, withStyles } from '@material-ui/core';
const iOSBoxShadow = '0 0px 0px rgba(0,0,0,0.1),0 0px 0px rgba(0,0,0,0.13),0 0 0 0px rgba(0,0,0,0.02)';

const useSliderSearchStyles = makeStyles((theme) =>
    createStyles({
        labelSearch: {
            fontSize: '14px',
        },
        containerFlexOne: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '6px',
        },
        input_custom: {
            width: '40px',
            height: '20px',
            textAlign: 'center',
            fontFamily: 'Helvetica',
            fontSize: '13px',
            padding: '0',
            marginRight: '1px',
        },
        icons_custom: {
            maxWidth: '16px ',
            maxHeight: '16px ',
        },
        textFieldNumber: {
            backgroundColor: theme.palette.primary.light,
            border: `1px solid ${theme.palette.text.primary}`,
            borderRadius: '3px',
            '& input[type=number]': {
                '-moz-appearance': 'textfield',
            },
            '& input[type=number]::-webkit-outer-spin-button': {
                '-webkit-appearance': 'none',
                margin: 0,
            },
            '& input[type=number]::-webkit-inner-spin-button': {
                '-webkit-appearance': 'none',
                margin: 0,
            },
            '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                border: '0',
            },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                border: '0',
            },
            '& .MuiOutlinedInput-root': {
                borderRadius: '0',
            },
        },
    })
);

export const IOSSliderStyle = withStyles((theme: Theme) =>
    createStyles({
        root: {
            color: 'var(--silver-grey)',
            height: 5,
            marginTop: -15,
            position: 'relative',
            '&:before': {
                position: 'absolute',
                height: 50,
                width: 50,
                backgroundColor: 'red',
            },
        },

        thumb: {
            color: 'var(--grey)',
            height: 22,
            width: 22,
            marginTop: -1,
            marginLeft: -11,
            border: '1px solid var(--grey)',
            backgroundColor: theme.palette.error.dark,
            boxShadow: iOSBoxShadow,
            '&:focus, &:hover, &$active': {
                boxShadow: '0 0px 0px rgba(0,0,0,0.1),0 0px 0px rgba(0,0,0,0.3),0 0 0 0px rgba(0,0,0,0.02)',
                // Reset on touch devices, it doesn't add specificity
                '@media (hover: none)': {
                    boxShadow: iOSBoxShadow,
                },
            },
        },
        track: {
            color: theme.palette.error.contrastText,
            height: 12,
            borderRadius: 10,
            margin: '4px',
        },
        rail: {
            height: 20,
            color: 'var(--grey)',
            borderRadius: 10,
        },
        mark: {
            marginTop: '-2px',
            backgroundColor: theme.palette.error.light,
            height: 55,
            width: 1,
            ['@media (max-width:1400px)']: {
                height: 60,
            },
        },
        marked: {
            marginBottom: '0px',
        },
        markActive: {
            opacity: 1,
            backgroundColor: theme.palette.error.light,
        },
        markLabel: {
            top: -8,
            color: theme.palette.text.primary,
        },
    })
)(Slider);
export default useSliderSearchStyles;
