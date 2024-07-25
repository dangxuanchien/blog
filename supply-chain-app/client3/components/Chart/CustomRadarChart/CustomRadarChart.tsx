import React, { FC, useContext, useRef } from 'react';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
    ChartOptions,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { Grid } from '@material-ui/core';
import _ from 'lodash';
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
const dataInitial = {
    labels: [''],
    datasets: [''],
};

export type CornerInfoRadarChart = {
    companyName: string;
    companyId?: string;
    score?: number;
    label?: string;
    tabId?: number;
    relevantScore?: string;
    companyIds?: string[];
    conditionSearch?: string;
};

const optionsInitial = (getMode, data, labelRada): ChartOptions<'radar'> => {
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
                    // color: getMode === 'light' ? '#252525' : white,
                    color: function (context: any) {
                        if (context.label === labelRada) {
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

/**
 * The Props Interface
 * @author Chinh Nguyen Van <chinh.nguyen3@hitachivantara.com>
 */

interface CustomRadarChartProps {
    options?: any; // https://www.chartjs.org/docs/latest/general/options.html
    data: any; // https://www.chartjs.org/docs/latest/general/data-structures.html
    sytles?: React.CSSProperties;
    classes?: Object;
    handleClickRadarChart?: (cornerInfoRadarChart: CornerInfoRadarChart, data?: any) => void;
    labelRada?: string;
}

/**
 * The RadarChart form component
 * @component {CustomRadarChart}
 * @param props
 * @returns Form
 * @author Chinh Van Nguyen <chinh.nguyen3@hitachivantara.com>
 */

const CustomRadarChart: FC<CustomRadarChartProps> = (props: any) => {
    // const {classes} = props;
    const data = props.data || dataInitial;
    const { getMode, setMode } = useContext(ThemContext);
    const initialOptions = optionsInitial(getMode, data, props.labelRada);
    const radarRef = useRef<any>();

    const optionsObj = {
        ...initialOptions,
        ...optionsInitial(getMode, data, props.labelRada),
        plugins: {
            ...initialOptions.plugins,
        },
        scales: {
            ...initialOptions.scales,
        },
        onHover: ({ x, y }, activeHove, chart) => {
            const { canvas } = chart;
            const index = getIndexLabel(x, y, chart.scales.r._pointLabelItems);
            if (index === -1) {
                canvas.style.cursor = 'default';
            } else {
                canvas.style.cursor = 'pointer';
            }
        },
        onClick: ({ x, y }, clickChart, chart) => {
            const index = getIndexLabel(x, y, chart.scales.r._pointLabelItems);
            const { handleClickRadarChart } = props;
            switch (index) {
                case 0:
                    handleClickRadarChart(convertData(data)[index], data);
                    break;
                case 1:
                    handleClickRadarChart(convertData(data)[index], data);
                    break;
                case 2:
                    handleClickRadarChart(convertData(data)[index], data);
                    break;
                case 3:
                    handleClickRadarChart(convertData(data)[index], data);
                    break;
                case 4:
                case 5:
                case 6:
                case 7:
                    handleClickRadarChart(convertData(data)[index], data);
                    break;
                default:
                    break;
            }
        },
    };
    const options = _.merge(optionsObj, props.options);

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

    const getIndexLabel = (x, y, pointlable) => {
        let index = -1;
        for (let i = 0; i < pointlable.length; i++) {
            const { left, right, top, bottom } = pointlable[i];
            if (x >= left && x <= right && y >= top && y <= bottom) {
                index = i;
            }
        }
        return index;
    };

    return (
        <Grid style={{ ...props.sytles }}>
            <Radar
                ref={radarRef}
                options={{
                    ...options,
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

export default CustomRadarChart;
