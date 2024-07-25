import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import { Theme, createStyles, makeStyles } from '@material-ui/core';

export function useScoreTransitionStyle(): ClassNameMap {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            chartContainer: {
                width: '100%',
                height: 'auto',
                borderRadius: 15,
                padding: '10px 16px',
                backgroundColor: theme.palette.primary.light,
            },
            dropdownLable: {
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
                width: '500px',
            },
            '@media (max-width: 1600px)': {
                dropdownLable: {
                    justifyContent: 'space-around',
                },
            },
            wrapChartInfo: {
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'stretch',
                alignContent: 'center',
                marginTop: '10px',
                justifyContent: 'space-center',
                width: '100%',
            },
            chart: {
                // height: 'calc(100% - 120px)',
                height: '353px',
                width: '100%',
                position: 'relative',
                paddingTop: 20,
                '& canvas': {
                    height: '100% !important',
                    maxHeight: '100% !important',
                    width: '100% !important',
                },
            },
            parameter: {
                position: 'absolute',
                top: 25,
                right: -15,
                marginRight: '100px',
            },
            dropdown: {
                '& select': {
                    backgroundColor: theme.palette.action.disabledBackground,
                    width: '120px',
                    color: theme.palette.text.primary,
                    border: `1px solid ${theme.palette.text.primary}`,
                    height: '32px',
                    borderRadius: '4px',
                },
                '& select:hover, & select:focus': {
                    borderColor: theme.palette.secondary.main,
                },
                '& select option:hover, & select option:checked': {
                    backgroundColor: '#585B62 !important',
                },
            },
        })
    );

    return useStyles();
}
