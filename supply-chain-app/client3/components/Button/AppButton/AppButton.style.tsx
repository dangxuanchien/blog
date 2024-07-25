import { createStyles, makeStyles } from '@material-ui/core';

const useButtonStyles = makeStyles(() =>
    createStyles({
        button: {
            minWidth: '6rem',
            color: 'var(--white)',
            fontWeight: 'bold',
            height: '2rem',
            borderRadius: '6px',
            fontSize: '11pt',
            paddingTop: '5pt',
            backgroundColor: 'var(--default-button)',
            border: '1px solid var(--silver-white)',
            '&:hover': {
                backgroundColor: 'var(--hover-button)',
            },

            '&:disabled': {
                color: '#7F7F7F !important',
                border: '1px solid #7F7F7F !important',
                backgroundColor: 'var(--default-button) !important',
            },
        },

        'button--secondary': {
            color: 'var(--default-button) !important',
            backgroundColor: 'var(--silver-white) !important',

            '&:hover': {
                backgroundColor: 'var(--silver-white) !important',
            },
        },
        'button--active': {
            color: 'var(--default-button) !important',
            border: '1px solid var(--default-button) !important',
            backgroundColor: 'var(--silver-white) !important',
            pointerEvents: 'none',
        },
    })
);

export default useButtonStyles;
