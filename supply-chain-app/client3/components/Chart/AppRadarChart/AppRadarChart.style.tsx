import { makeStyles } from '@material-ui/core';

export function useAppRadarChartStyle(height, width) {
    const useStyles = makeStyles(() => ({
        radarChart: {
            height: `${height} !important`,
            width: `${width} !important`,
            overflow: 'hidden',
        }
    }));
    return useStyles();

}

