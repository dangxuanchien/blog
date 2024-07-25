import React, { ReactElement, useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Box, Grid, makeStyles } from '@material-ui/core';
import { color } from '@/components/CSSConstant/css.constant';

export interface BoxPlotData {
    minValue: number;
    bottom25perValue: number;
    medianValue: number;
    top25perValue: number;
    maxValue: number;
}

type Props = {
    /**
     * width of Boxplot (px)
     */
    width?: number;
    /**
     * height of Boxplot (px)
     */
    height?: number;
    /**
     * data is list number
     */
    data: BoxPlotData;
    /**
     * check point
     */
    checkpoint?: number;
    /**
     * control show medium;
     */
    showMedium?: boolean;
    errorOverlay?: () => ReactElement;
};

const useStyles = makeStyles(() => ({
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

const BoxPlotChart: React.FC<Props> = (props) => {
    const { width = 200, height = 28, checkpoint, showMedium = false, data, errorOverlay } = props;
    const classes = useStyles();

    const [isError, setIsError] = useState<boolean>(false);
    const ref = useRef();

    useEffect(() => {
        try {
            const x = d3.scaleLinear().domain([data.minValue, data.maxValue]).range([0, width]);
            const y = d3.scaleBand().range([height, 0]).domain(['mid']).padding(0.4);

            // initial svg
            const svg = d3
                .select(ref.current)
                .attr('width', width)
                .attr('height', height + height / 3)
                .style('background-color', 'inherit')
                .style('overflow', 'inherit');

            svg.selectAll('*').remove();
            // Background box
            svg.append('rect')
                .attr('x', 0)
                .attr('width', width)
                .attr('y', (height * 1) / 5)
                .attr('height', (height * 3) / 5)
                .attr('stroke', color.darkGrey)
                .style('fill', color.darkGrey);

            // Show the main vertical line
            svg.append('line')
                .attr('x1', x(data.minValue))
                .attr('x2', x(data.maxValue))
                .attr('y1', y('mid') + y.bandwidth() / 2)
                .attr('y2', y('mid') + y.bandwidth() / 2)
                .attr('stroke', color.lightGrey);

            // Show the box
            svg.append('rect')
                .attr('x', x(data.bottom25perValue))
                .attr('width', x(data.top25perValue) - x(data.bottom25perValue))
                .attr('y', y('mid'))
                .attr('height', y.bandwidth())
                .attr('stroke', color.lightGrey)
                .style('fill', color.lightGrey);

            // show medium line
            showMedium &&
                svg
                    .append('line')
                    .attr('x1', x(data.medianValue))
                    .attr('x2', x(data.medianValue))
                    .attr('y1', y('mid'))
                    .attr('y2', y('mid') + y.bandwidth())
                    .attr('stroke', 'black');

            // show checkpoint triangle
            const size = 100;
            const triangle = d3.symbol().type(d3.symbolTriangle).size(size);
            svg.append('line')
                .attr('x1', 0)
                .attr('x2', 0)
                .attr('y1', 0)
                .attr('y2', height + 30)
                .attr('stroke', color.lightGrey);
            svg.append('line')
                .attr('x1', width)
                .attr('x2', width)
                .attr('y1', 0)
                .attr('y2', height + 30)
                .attr('stroke', color.lightGrey);
            checkpoint &&
                svg
                    .append('path')
                    .attr('d', triangle)
                    .attr('transform', `translate(${x(checkpoint)}, ${y('mid') + y.bandwidth() + 6})`)
                    .attr('stroke', color.yellow)
                    .attr('fill', color.yellow);
            svg.exit().remove();
        } catch (error) {
            setIsError(true);
        }
    }, [data]);

    if (isError) {
        // TODO: css default error
        return errorOverlay ? errorOverlay() : <div>Error</div>;
    }

    return (
        <Grid container className={classes.wrapper} wrap={'nowrap'}>
            <Box className={classes.begin}>{data.minValue?.toFixed(3) ?? 0 }</Box>
            <Box className={classes.boxPlot}>
                <svg ref={ref} />
            </Box>
            <Box className={classes.end}>{data.maxValue?.toFixed(3) ?? 100}</Box>
        </Grid>
    );
};

export default BoxPlotChart;
