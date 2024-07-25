import React, { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import 'chart.js/auto';
import 'chartjs-adapter-moment';
import { Chart as ChartJS } from 'chart.js';
import { Line } from 'react-chartjs-2';
import _merge from 'lodash/merge';

import chartAxesArrow from './Plugins/ChartAxesArrow.plugin';
import safetyStockLine from './Plugins/SafetyStockLine.plugin';
import presentLine from './Plugins/PresentLine.plugin';
import { ThemContext } from 'context/ThemeContext';
import { color } from '@/components/CSSConstant/css.constant';
import { TFunction } from 'i18next';
const { white, black, grey } = color;
// register chart plugins
ChartJS.register(chartAxesArrow, safetyStockLine, presentLine);

/** Define field in Inventory Chart */
const optionsInitial = (t: TFunction, color: string, dataYellow: boolean) => {
    return {
        responsive: true,
        layout: {
            padding: {
                top: 10,
                right: 10,
            },
        },
        plugins: {
            tooltip: {
                displayColors: false,
            },
            chartAxesArrow: {
                borderColor: color,
                borderWidth: 3,
                rightLine: false,
                dataRight: dataYellow,
            },
            presentLine: {
                label: t('inventoryTransition.present'),
                labelColor: black,
                borderColor: grey,
            },
        },
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day',
                    displayFormats: {
                        day: 'MM/DD',
                    },
                },
                grid: { display: false, drawBorder: false },
            },
            y: {
                min: 0,
                title: {
                    display: true,
                },
                grid: { display: false, drawBorder: false },
                ticks: { display: false },
            },
            rightY: {
                min: 0,
                title: {
                    display: true,
                },
                grid: { display: false, drawBorder: false },
                ticks: { display: false },
            },
        },
        interaction: {
            intersect: false,
            mode: 'nearest',
            axis: 'xy',
        },
    };
};

/**
 * The Props Interface
 */
interface CurverChartProps {
    options?: any; // https://www.chartjs.org/docs/latest/general/options.html
    data?: any; // https://www.chartjs.org/docs/latest/general/data-structures.html
    safetyStockOption?: any;
    height?: number | string;
    plugins?: any;
}

/**
 * The CurverChart form component organism
 * @component {CurverChart}
 * @param props
 * @returns Chart
 * @author Nguyen Hoang <nguyen.hoang1@hitachivantara.com>
 */
const CurverChart: FC<CurverChartProps> = (props) => {
    const { t } = useTranslation();
    const { getMode } = useContext(ThemContext);
    const color = getMode === 'light' ? black : white;
    let dataYellow = false;

    if (props.data.datasets.length > 1) {
        dataYellow = true;
    }
    const initialOptions = optionsInitial(t, color, dataYellow);
    const optionsObj = {
        ...optionsInitial(t, color, dataYellow),
        plugins: {
            ...initialOptions.plugins,
            safetyStockLine: props.safetyStockOption,
        },
        chartAxesArrow: {
            borderColor: color,
            borderWidth: 3,
        },
        scales: {
            ...initialOptions.scales,
        },
    };
    const options = _merge(optionsObj, props.options);
    const data: any = props.data;

    return <Line options={options} data={data} plugins={props.plugins} />;
};

export default CurverChart;
