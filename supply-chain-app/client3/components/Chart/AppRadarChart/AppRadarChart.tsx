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
import { ChartProps, Radar } from 'react-chartjs-2';
import { Grid } from '@material-ui/core';
import { ThemContext } from 'context/ThemeContext';
import { color } from '@/components/CSSConstant/css.constant';
import { useAppRadarChartStyle } from './AppRadarChart.style';
import { clsx } from 'clsx';

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

export enum PeakScore {
    QUALITY,
    COST,
    DELIVERY,
    FINANCE,
    ENVIROMENT,
    LABOR,
    ETHICS,
    SUSTAINABLE,
}

export enum RelevantLabel {
    QUALITY = 'quality_score',
    COST = 'cost_score',
    DELIVERY = 'delivery_score',
}

export type CornerInfoRadarChart = {
    companyName: string;
    score?: number;
    label?: string;
    tabId?: number;
    relevantScore?: string;
    companyId?: string;
    companyIds?: string[];
    conditionSearch?: string;
};

export type CategoryScore = {
    qualityScore?: number;
    costScore?: number;
    deliveryScore?: number;
    financeScore?: number;
    environmentScore: number;
    laborScore: number;
    ethicsScore: number;
    sustainableScore: number;
};

export interface AppCornerInfoRadarChart {
    companyName: string;
    score?: number | CategoryScore;
    label?: string;
    peakScore?: PeakScore;
    relevantScore?: RelevantLabel;
    companyId?: string;
    companyIds?: string[];
    conditionSearch?: string;
}

interface PointLabel {
    x: number;
    y: number;
    top: number;
    bottom: number;
    left: number;
    right: number;
    textAlign: string;
}

export type RadarChartData = {
    labels: string[];
    datasets: Array<{
        label?: string;
        companyId?: string;
        data: number[];
        backgroundColor?: any;
        borderColor?: string;
        borderDash?: number[];
    }>;
};

// return index of the label
const getIndexLabel = (x: number, y: number, pointLabel: PointLabel[]) => {
    let index = -1;
    for (let i = 0; i < pointLabel.length; i++) {
        const { left, right, top, bottom } = pointLabel[i];
        if (x >= left && x <= right && y >= top && y <= bottom) {
            index = i;
        }
    }
    return index;
};

const optionsInitial = (getMode, data, label, handleClickRadarChart): ChartOptions<'radar'> => {
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
                    stepSize: 20 as const,
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
        onHover: ({ x, y }, _, chart: any) => {
            const { canvas } = chart;
            const indexLabel = getIndexLabel(x, y, chart.scales.r._pointLabelItems);

            if (indexLabel === -1) {
                canvas.style.cursor = 'default';
            } else {
                canvas.style.cursor = 'pointer';
            }
        },
        onClick: ({ x, y }, _, chart: any) => {
            const indexLabel = getIndexLabel(x, y, chart.scales.r._pointLabelItems);
            if (indexLabel !== -1) {
                return handleClickRadarChart(indexLabel, data);
            }
        },
    };
};

const dataInitial = {
    labels: [],
    datasets: [],
};

interface AppRadarProps {
    data: ChartData<'radar', number[], unknown> & RadarChartData;
    handleClickRadarChart?: (indexLabel: number, data?: RadarChartData) => void;
    label?: string;
    height?: string;
    width?: string;
}
type DefaultChartProps = Omit<ChartProps<'radar', (number | null)[], unknown>, 'type'>;

type ChartRadarProps = DefaultChartProps & AppRadarProps;

const AppRadarChart = (props: ChartRadarProps) => {
    const { data = dataInitial, label, handleClickRadarChart, className, height, width } = props;
    const classes = useAppRadarChartStyle(height, width);
    const { getMode } = useContext(ThemContext);

    const optionsObj = optionsInitial(getMode, data, label, handleClickRadarChart);

    return (
        <Grid className={clsx(classes.radarChart, className)}>
            <Radar
                options={{
                    ...optionsObj,
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
