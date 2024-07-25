import { createStyles, makeStyles } from '@material-ui/core';


export const useSliderForSearchStyle = makeStyles((theme) =>
    createStyles({
        containerColumnForm: {
            boxSizing: 'border-box',
            backgroundColor: theme.palette.primary.light,
            width: '100%',
        },
        elementFilter: {
            display: 'flex',
            flexDirection: 'column',
            width: '330px',
            marginTop: '10px',
            float: 'left',
        },
        labelSearch: {
            fontWeight: 'bold',
        },
        slider: {
            paddingRight: '20px',
        },
        containerLabel: {
            marginRight: 'auto',
        },
        rightLabelContainer: {
            width: 255,
        },
        containerFlex: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            alignItems: 'stretch',
            alignContent: 'space-between',
            paddingBottom: '0px',
        },
        containerFlexTitle: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            margin: '12px 0',
            height: 43,
        },
        containerFlexTitleLastRow: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            margin: '12px 0',
            height: 43,
            '@global': {
                '.MuiSlider-mark': {
                    height: 25,
                },
            },
        },
        contentButtonSubmit: {
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            height: '40px',
            marginTop: '10px',
        },
        buttonSubmit: {
            marginRight: '10px',
            '&:focus': {
                backgroundColor: 'var(--default-button)',
                color: 'var(--white)',
                border: '1px solid var(--silver-white)',
            },
        },
    })
);
