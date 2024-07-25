import React, { useContext } from 'react';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
    ChartOptions,
    ChartData,
} from 'chart.js';
import { merge } from 'lodash';
import { ChartProps, Radar } from 'react-chartjs-2';
import { Grid } from '@material-ui/core';

import { ThemContext } from 'context/ThemeContext';
// import { RadarChartData } from 'containers/SearchForSupplier/DetailCompany/DetailCompany';
import { color } from '@/components/CSSConstant/css.constant';
import { RadarChartData } from '../AppRadarChart/AppRadarChart';

const { white, whiteRadian } = color;

const UnderLinePlugin = {
    id: 'underline',
    afterDraw: (chart, args, opts) => {
        const { ctx } = chart;
        ctx.save();
        chart?.scales?.r?._pointLabelItems.forEach((labelItem) => {
            ctx.strokeStyle = opts.lineColor || white;
            ctx.lineWidth = opts.lineWidth || 1;
            ctx.beginPath();
            ctx.moveTo(labelItem.left, labelItem.bottom + (opts.yOffset || 0));
            ctx.lineTo(labelItem.right, labelItem.bottom + (opts.yOffset || 0));
            ctx.stroke();
        });
        ctx.restore();
    },
};

// register chart plugins
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, UnderLinePlugin);

/** Define field in Radar Chart */

type CornerInfoRadarChart = {
    companyName: string;
    score?: number;
    label?: string;
    tabId?: number;
    relevantScore?: string;
    companyId?: string;
    companyIds?: string[];
    conditionSearch?: string;
};

const optionsInitial = (getMode, data, label): ChartOptions<'radar'> => {
    const stepSize = 20;
    return {
        responsive: true,
        elements: {
            line: {
                borderWidth: 3,
            },
        },
        scales: {
            r: {
                min: 0,
                max: 100,
                ticks: {
                    display: false,
                    stepSize: stepSize,
                },
                grid: {
                    borderDash: [10, 4],
                    color: function (context: any) {
                        /**
                         * * data?.labels?.length from 1 to 10
                         * * opacity from 0 to 1
                         * * */
                        const opacity = +`${data?.labels?.length - context?.index}` / 10;
                        const color =
                            getMode === 'light' ? `rgba(37, 37,37,${opacity}` : `rgba(189, 194,203,${opacity}`;
                        return color;
                    },
                },
                pointLabels: {
                    color: function (context: any) {
                        if (context.label === label) {
                            return 'var(--yellow)';
                        }
                        return getMode === 'light' ? '#252525' : white;
                    },
                    font: {
                        size: 13,
                        weight: 'bold',
                    },
                },
                angleLines: {
                    color: whiteRadian,
                },
            },
        },
        plugins: {
            legend: {
                position: 'bottom' as const,
                display: false,
            },
            title: {
                display: false,
            },
        },
        maintainAspectRatio: false,
    };
};

const dataInitial = {
    labels: [],
    datasets: [],
};

interface RadarProps {
    options?: ChartOptions<'radar'>; // https://www.chartjs.org/docs/latest/general/options.html
    data: ChartData<'radar', number[], unknown> & RadarChartData; // https://www.chartjs.org/docs/latest/general/data-structures.html
    style?: React.CSSProperties;
    handleClickRadarChart?: (cornerInfoRadarChart: CornerInfoRadarChart, data?: RadarChartData) => void;
    label?: string;
}
type DefaultChartProps = Omit<ChartProps<'radar', (number | null)[], unknown>, 'type'>;

type CharRadarProps = DefaultChartProps & RadarProps;

const AppRadarChart = (props: CharRadarProps) => {
    const { data = dataInitial, label, style, handleClickRadarChart } = props;

    const { getMode } = useContext(ThemContext);

    const getIndexLabel = (x, y, pointLabel) => {
        let index = -1;
        for (let i = 0; i < pointLabel.length; i++) {
            const { left, right, top, bottom } = pointLabel[i];
            if (x >= left && x <= right && y >= top && y <= bottom) {
                index = i;
            }
        }
        return index;
    };
    const convertData = (rawData: RadarChartData): Array<CornerInfoRadarChart> => {
        const { label: companyName, data, companyId } = rawData.datasets[0];
        const labels = rawData.labels;
        return data.map((item, index) => ({
            score: item,
            label: labels[index],
            companyName,
            tabId: index,
            companyId,
        }));
    };

    const optionsObj = {
        ...optionsInitial(getMode, data, label),
        onHover: ({ x, y }, _, chart) => {
            const { canvas } = chart;
            const index = getIndexLabel(x, y, chart.scales.r._pointLabelItems);

            if (index === -1) {
                canvas.style.cursor = 'default';
            } else {
                canvas.style.cursor = 'pointer';
            }
        },
        onClick: ({ x, y }, _, chart) => {
            const index = getIndexLabel(x, y, chart.scales.r._pointLabelItems);
            if (index !== -1) {
                return handleClickRadarChart(convertData(data)[index], data);
            }
        },
    };
    const options = merge(optionsObj, props.options);

    return (
        <Grid style={{ ...style }}>
            <Radar
                options={{
                    ...options,
                    /* Disabling the legend click event. */
                    plugins: {
                        legend: {
                            display: false,
                            events: [], // this line was the key
                        },
                    },
                }}
                data={data}
            />
        </Grid>
    );
};

export default AppRadarChart;
