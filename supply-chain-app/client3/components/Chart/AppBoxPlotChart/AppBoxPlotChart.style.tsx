import { makeStyles } from '@material-ui/core';

export const useAppBoxPlotChartStyles = makeStyles(() => ({
    wrapper: {
        justifyContent: 'center',
        gap: 8,
        paddingTop: 14,
    },
    boxPlot: {
        position: 'relative',
    },
    begin: {
        transform: 'translateY(4px)',
        width: 60,
    },
    end: {
        transform: 'translateY(4px)',
        width: 60,
    },
}));