import { FC, useContext } from 'react';
import { Scatter } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import { Chart as ChartJS, ChartOptions } from 'chart.js';
import chartAxesArrow from '../InventoryChart/Plugins/ChartAxesArrow.plugin';
import 'chart.js/auto';
import 'chartjs-adapter-moment';
import { ThemContext } from '@/context/ThemeContext';
import { color } from '@/components/CSSConstant/css.constant';
import { MARGIN_CHART_VALUE, handleClickLegend } from '../constants';
interface ScatterChartProps {
    data?: any; // https://www.chartjs.org/docs/latest/general/data-structures.html
    width?: number;
    max?: number;
    height?: number;
    min?: number;
}
ChartJS.register(chartAxesArrow);

const { white, greyNew, black, tooltipBgColor } = color;

const ScatterChartCustom: FC<ScatterChartProps> = ({ data = [], min, max, width, height }) => {
    const { t } = useTranslation();

    const { getMode } = useContext(ThemContext);

    const isLightMode = getMode === 'light';
    const tooltipColor = isLightMode ? white : black;
    const colorText = isLightMode ? black : white;
    const colorGridChart = isLightMode ? white : greyNew;

    const optionsRight: ChartOptions<'scatter'> = {
        responsive: true,
        plugins: {
            tooltip: {
                displayColors: true,
                callbacks: {
                    title: (context) => {
                        /** Array title.
                        Each element of under array will show 1 row in tooltip
                        */
                        const arrTitle: string[] = [];
                        context.forEach((element: any, index) => {
                            // time
                            arrTitle.push(element?.raw?.date.replaceAll('-', '.').slice(0, 10));
                            arrTitle.push(`${t('benefitpurchase.unitPrice')}: ${element?.raw?.y}、`);
                            arrTitle.push(`${t('benefitpurchase.quantity')}:${element?.raw?.x}`);
                            arrTitle.push(`No.${element?.raw?.no}`);
                            if (context.length > 1 && index + 1 < context.length) {
                                arrTitle.push('-----------------------------');
                            }
                        });
                        return arrTitle;
                    },
                    label: () => '',
                },
                backgroundColor: tooltipBgColor,
                padding: {
                    left: 20,
                    right: 20,
                    top: 5,
                },
                titleColor: tooltipColor,
            },
            legend: {
                display: false,
                labels: {
                    filter: function (label) {
                        return !label.text.includes('No.');
                    },
                },
                onClick(_, legendItem, legend) {
                    handleClickLegend({ legendItem, legend, dataLength: data.length - 1 });
                },
            },
            chartAxesArrow: {
                borderColor: colorText,
                borderWidth: 3,
            },
        },
        scales: {
            x: {
                offset: true,
                title: {
                    display: true,
                    color: colorText,
                },
                bounds: 'ticks',
                grid: {
                    display: true,
                    drawBorder: true,
                    borderColor: colorText,
                    color: colorGridChart,
                    tickColor: colorText,
                    tickLength: 8,
                    lineWidth: 1,
                },
                ticks: {
                    display: true,
                    color: colorText,
                    stepSize: 10,
                },
            },
            y: {
                title: {
                    display: true,
                    color: colorText,
                },
                grid: {
                    display: false,
                    drawBorder: true,
                    borderColor: colorText,
                },
                ticks: {
                    display: true,
                    color: colorText,
                    stepSize: max + MARGIN_CHART_VALUE - (min - MARGIN_CHART_VALUE),
                },
                min: min - MARGIN_CHART_VALUE,
                max: max + MARGIN_CHART_VALUE,
            },
        },
        elements: {
            point: {
                radius: 7,
                hoverRadius: 7,
                hoverBorderWidth: 9,
            },
        },
        interaction: {
            intersect: false,
            mode: 'nearest',
            axis: 'xy',
        },
    };

    return (
        <Scatter options={optionsRight} data={{ datasets: data || [] }} width={width || null} height={height || null} />
    );
};
export default ScatterChartCustom;
