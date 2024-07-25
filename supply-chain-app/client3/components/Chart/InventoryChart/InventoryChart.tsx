import React, { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import 'chart.js/auto';
import 'chartjs-adapter-moment';
import { Chart as ChartJS } from 'chart.js';
import { Line } from 'react-chartjs-2';

import chartAxesArrow from './Plugins/ChartAxesArrow.plugin';
import safetyStockLine from './Plugins/SafetyStockLine.plugin';
import presentLine from './Plugins/PresentLine.plugin';
import { ThemContext } from '@/context/ThemeContext';
import { color } from '@/components/CSSConstant/css.constant';
import type { ChartOptions } from 'chart.js';
import { MARGIN_CHART_VALUE, handleClickLegend } from '../constants';

// register chart plugins
ChartJS.register(chartAxesArrow, safetyStockLine, presentLine);

/**
 * The Props Interface
 */
interface InventoryChartProps {
    data?: any; // https://www.chartjs.org/docs/latest/general/data-structures.html
    max: number;
    height?: number;
    min?: number;
}

const { white, greyNew, black, tooltipBgColor } = color;

const InventoryChart: FC<InventoryChartProps> = ({ data, max, min, height }) => {
    const { t } = useTranslation();

    const { getMode } = useContext(ThemContext);

    const isLightMode = getMode === 'light';
    const legendColor = isLightMode ? black : white;
    const tooltipColor = isLightMode ? white : black;
    const colorText = isLightMode ? black : white;
    const colorGridChart = isLightMode ? white : greyNew;

    const options: ChartOptions<'line'> = {
        responsive: true,
        layout: {
            padding: {
                top: 10,
                right: 10,
            },
        },
        plugins: {
            tooltip: {
                displayColors: true,
                callbacks: {
                    title: (context: any) => {
                        /** Array title.
                        Each element of under array will show 1 row in tooltip
                        */
                        const arrTitle: string[] = [];
                        arrTitle.push(context[0].raw?.x.replaceAll('-', '.').slice(0, 10)); // time
                        context.forEach((element, index) => {
                            const price = element.formattedValue; // get price / piece
                            const quantity = element?.raw?.quantity; // get quantity
                            arrTitle.push(`${t('benefitpurchase.unitPrice')}${price}、`);
                            arrTitle.push(`${t('benefitpurchase.quantity')}${quantity}`);
                            if (element.dataset.label !== t('benefitpurchase.actual_selling_price')) {
                                arrTitle.push(`No.${element.raw.no}`);
                            }
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
                labels: {
                    filter: function (label) {
                        return !label.text.includes('No.');
                    },
                    color: legendColor,
                    boxHeight: 30,
                    boxPadding: 2,
                    usePointStyle: true,
                    pointStyle: 'line',
                },
                onClick(_, legendItem, legend) {
                    handleClickLegend({ legendItem, legend, dataLength: data.length - 1 });
                },
            },
            chartAxesArrow: {
                borderColor: legendColor,
                borderWidth: 3,
            },
            presentLine: {
                borderColor: '#969896',
            },
        },
        scales: {
            x: {
                offset: true,
                title: {
                    display: true,
                    color: colorText,
                },
                type: 'time',
                time: {
                    unit: 'month',
                    stepSize: 1,
                    displayFormats: {
                        month: 'YYYY-M-D',
                    },
                },
                bounds: 'ticks',
                grid: {
                    borderColor: colorText,
                    drawBorder: true,
                    drawOnChartArea: true,
                    drawTicks: true,
                    display: true,
                    color: colorGridChart,
                    tickColor: colorText,
                    tickLength: 8,
                    lineWidth: 1,
                },
                ticks: { display: true, color: colorText },
            },
            y: {
                title: {
                    display: true,
                    color: colorText,
                },
                grid: { display: false, drawBorder: true, borderColor: colorText },
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
                hoverBorderWidth: 8,
            },
        },
        interaction: {
            intersect: false,
            mode: 'nearest',
            axis: 'xy',
        },
    };

    return <Line options={options} data={{ datasets: data || [] }} height={height} />;
};

export default InventoryChart;
