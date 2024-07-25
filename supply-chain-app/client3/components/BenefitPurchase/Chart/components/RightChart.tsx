import { ThemContext } from 'context/ThemeContext';
import { FC, useContext } from 'react';
import ScatterChart from '@/components/Chart/ScatterChart/ScatterChart';
import { CHART_LINE_COLOR_LIGHT, CHART_LINE_COLOR_DARK, getMinAndMaxOfArr } from './constants';

interface RightChartComponent {
    pointData: any[];
}

const RightChart: FC<RightChartComponent> = ({ pointData = [] }) => {
    const { getMode } = useContext(ThemContext);

    const colorPoints = getMode === 'light' ? CHART_LINE_COLOR_LIGHT : CHART_LINE_COLOR_DARK;

    const { min, max } = getMinAndMaxOfArr(pointData.flat().map((element) => +element.y));

    const chartDataset = pointData.map((element, index) => {
        const color = colorPoints[index];
        return {
            label: `No.${element.no}`,
            pointBorderColor: color,
            backgroundColor: color,
            borderColor: color,
            pointBackgroundColor: color,
            spanGaps: true,
            fill: false,
            data: element,
            order: -index,
        };
    });

    return <ScatterChart height={155} data={chartDataset} min={min} max={max} />;
};

export default RightChart;
