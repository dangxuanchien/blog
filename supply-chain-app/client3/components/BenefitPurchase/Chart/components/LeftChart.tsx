import React, { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import InventoryChart from '@/components/Chart/InventoryChart/InventoryChart';
import { color } from '@/components/CSSConstant/css.constant';
import { ThemContext } from 'context/ThemeContext';
const { white, silverGrey, green, black } = color;
import { CHART_LINE_COLOR_LIGHT, CHART_LINE_COLOR_DARK, getMinAndMaxOfArr } from './constants';

interface LeftChartComponent {
    actualLine: any[];
    proposedLine: any[];
}

const LeftChart: FC<LeftChartComponent> = ({ proposedLine = [], actualLine = [] }) => {
    const { t } = useTranslation();
    const { getMode } = useContext(ThemContext);

    const isLightMode = getMode === 'light';
    const legendColor = isLightMode ? black : white;
    const proposedColor = isLightMode ? CHART_LINE_COLOR_LIGHT : CHART_LINE_COLOR_DARK;
    const actualColor = isLightMode ? silverGrey : green;

    const { min, max } = getMinAndMaxOfArr([...actualLine, ...proposedLine].flat().map((element) => +element.y));

    function sortCallbackFnc(elementA, elementB) {
        const dateA = new Date(elementA.x).getTime();
        const dateB = new Date(elementB.x).getTime();
        return dateA - dateB;
    }

    const actualDatasets = [
        {
            label: `${t('benefitpurchase.actual_selling_price')}`,
            borderColor: actualColor,
            pointBorderColor: legendColor,
            borderWidth: 5,
            spanGaps: true,
            fill: false,
            pointRadius: 0,
            tension: 0.4,
            data: actualLine[0]?.sort(sortCallbackFnc) || [],
        },
    ];

    const proposedDatasets = proposedLine?.map((element, index) => {
        return {
            label: !index ? `${t('benefitpurchase.suggested_price')}` : `No.${element[0] && element[0].no}`,
            borderColor: proposedColor[index],
            pointBorderColor: legendColor,
            spanGaps: true,
            fill: false,
            pointRadius: 0,
            tension: 0.4,
            order: -index,
            data: element,
        };
    });

    return <InventoryChart height={170} data={[...proposedDatasets, ...actualDatasets]} max={max} min={min} />;
};

export default LeftChart;
