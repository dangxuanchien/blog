import { FC, useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ThemContext } from 'context/ThemeContext';
import { cssConstant, color } from '@/components/CSSConstant/css.constant';
import CurverChart from '@/components/Chart/CurverChart/CurverChart.component';
import { ChartOptions, Plugin, TimeUnit } from 'chart.js';

const { colorSilverGrey, colorSilverGreyDark, colorGrey, colorGreyDark, colorTextChart, colorTextChartDark } =
    cssConstant;
interface ScoreChartProps {
    data?: any;
    selected?: string;
    displayUnit?: TimeUnit;
}

const ScoreChart: FC<ScoreChartProps> = ({ data, displayUnit }) => {
    // translate
    const { t } = useTranslation();
    // min & max price in all lines

    const { getMode } = useContext(ThemContext);
    const actualColor = getMode === 'light' ? colorSilverGrey : colorSilverGreyDark;
    const proposedColor = getMode === 'light' ? colorGrey : colorGreyDark;
    const colorText = getMode === 'light' ? colorTextChart : colorTextChartDark;
    const [relevantLine, setRelevantLine] = useState([]);
    const [parameterLine, setParameterLine] = useState([]);

    // relevant line
    useEffect(() => {
        const datasetFilter = data.dataRelevantChart.map((element, index) => {
            const data = element.scoreList.map((el) => ({ x: el.updateDate, y: el.score }));
            return {
                yAxisID: 'y',
                label: element.relevantScore,
                ...actualColor,
                spanGaps: true,
                fill: false,
                borderWidth: 5,
                pointRadius: data.length > 1 ? 0 : 5,
                tension: 0.4,
                order: -index,
                data,
            };
        });
        setRelevantLine(datasetFilter);
    }, [data]);

    // parameter line
    useEffect(() => {
        const datasetFilter = data.dataParameterChart.map((element, index) => {
            const data = element.scoreList.map((el) => ({ x: el.updateDate, y: el.score }));

            return {
                yAxisID: 'y',
                label: element.parameter,
                ...proposedColor,
                spanGaps: true,
                fill: false,
                borderWidth: 2,
                pointRadius: data.length > 1 ? 0 : 5,
                tension: 0.4,
                order: -index,
                data,
            };
        });
        setParameterLine(datasetFilter);
    }, [data]);

    const dataChart = useMemo(
        () => ({
            datasets: [...relevantLine, ...parameterLine],
        }),
        [data, relevantLine, parameterLine]
    );
    // Option for curver chart
    const options: ChartOptions<'line'> = {
        responsive: true,

        layout: {
            padding: {
                top: 40,
                right: 100,
            },
        },
        plugins: {
            tooltip: {
                backgroundColor: color.grey,
                titleColor: color.black,
                displayColors: false,
                cornerRadius: 0,
                position: 'nearest',
                titleAlign: 'center',
                titleFont: { size: 14, weight: 'normal' },
                callbacks: {
                    title: (context: any) => {
                        /** Array title.
                        Each element of under array will show 1 row in tooltip
                        */
                        const arrTitle: string[] = [];
                        arrTitle.push(context[0].raw.x.replaceAll('-', '.').slice(0, 7)); // time
                        context.forEach((element, index) => {
                            const score = element?.raw.y; // get score
                            arrTitle.push(`${t('detailSupplier.score')}: ${score} `);
                            switch (element.dataset.label) {
                                case 'quality_score':
                                    arrTitle.push(`${t('detailSupplier.qualityScore')}`);
                                    break;
                                case 'cost_score':
                                    arrTitle.push(`${t('detailSupplier.costScore')}`);
                                    break;
                                case 'delivery_score':
                                    arrTitle.push(`${t('detailSupplier.deliveryScore')}`);
                                    break;
                                default:
                                    arrTitle.push(element.dataset.label);
                                    break;
                            }
                            if (context.length > 1 && index + 1 < context.length) {
                                arrTitle.push('-----------------------------');
                            }
                        });
                        return arrTitle;
                    },
                    labelColor: function () {
                        return {
                            borderColor: 'rgb(0, 0, 255)',
                            backgroundColor: 'rgb(255, 0, 0)',
                            borderWidth: 2,
                            borderDash: [4, 4],
                            borderRadius: 2,
                        };
                    },
                    label: () => '',
                },
                yAlign: 'bottom',
                xAlign: 'left',
            },
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                type: 'time',
                offset: true,
                time: {
                    unit: displayUnit,
                    displayFormats: {
                        week: 'YYYY.M.D',
                        month: 'YYYY.M.D',
                        year: 'YYYY',
                    },
                    stepSize: 3,
                },
                ticks: {
                    align: 'start',
                    ...(colorText as any),
                    font: {
                        size: 16,
                    },
                },
                bounds: 'ticks',
            },
            y: {
                type: 'linear',
                position: 'left',
                // Hide grid lines, otherwise you have separate grid lines for the 2 y axes
                grid: { display: false },
                ticks: {
                    display: true,
                    stepSize: 100,
                    ...(colorText as any),
                    font: {
                        size: 16,
                    },
                },
            },
        },
        elements: {
            point: {
                hoverBorderWidth: 8,
            },
        },
    };

    const plugins: Plugin<'line'>[] = [
        {
            id: 'textLabelsEnd',
            afterDraw(chart) {
                const {
                    ctx,
                    chartArea: { top, right, bottom },
                } = chart;
                ctx.save();
                ctx.font = '11pt Medium';
                ctx.fillStyle = '#fff';
                ctx.fillText('スコア', 20, top - 20);
                ctx.fillText('期間', right + 20, bottom, 80);
                ctx.restore();
            },
        },
    ];

    return <CurverChart data={dataChart} options={options} plugins={plugins} />;
};

export default ScoreChart;
