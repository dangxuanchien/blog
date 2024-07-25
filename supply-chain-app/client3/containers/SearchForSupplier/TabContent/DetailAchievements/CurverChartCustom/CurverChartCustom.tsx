import { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, makeStyles } from '@material-ui/core';
import { ThemContext } from 'context/ThemeContext';
import { cssConstant, color } from '@/components/CSSConstant/css.constant';
import CurverChart from '@/components/Chart/CurverChart/CurverChart.component';

const { colorTextChart, colorTextChartDark } = cssConstant;
interface ScoreChartProps {
    data: any,
    isResize: boolean,
    label?: string
}

const useStyles = makeStyles(() => ({
    chart: {
        position: 'relative',
        padding: '2% 6% 2% 3%',
        width: '60vw',
        height: '36vh',
    },
    chart2: {
        position: 'relative',
        padding: '6% 8% 3% 6%',
        width: '33vw',
        height: '36vh',
    },
    chartYLabel: {
        position: 'absolute',
        top: '-2%',
        left: '1%',
        fontSize: '16px',
    },
    chartYLabel2: {
        position: 'absolute',
        top: '3%',
        left: '3%',
        fontSize: '18px',
    },
    chartXLabel: {
        position: 'absolute',
        right: '2%',
        bottom: '12.5%',
        fontSize: '16px',
    },
    chartXLabel2: {
        position: 'absolute',
        right: '1%',
        bottom: '11.5%',
        fontSize: '18px',
    },
}));

const CurverChartCustom: FC<ScoreChartProps> = (props) => {
    // translate
    const { t } = useTranslation();
    // min & max price in all lines

    const style = useStyles();
    const { getMode } = useContext(ThemContext);
    const colorText = getMode === 'light' ? colorTextChart : colorTextChartDark;
    const isFull = props.isResize;

    const dataDraw = props.data || [{ x: 0, y: 0 }];
    const dataCurverChart = {
        datasets: [
            {
                spanGaps: true,
                fill: false,
                pointRadius: dataDraw.length > 1 ? 0 : 3,
                borderWidth: 5,
                order: 1,
                tension: 0.4,
                borderColor: 'yellow',
                data: dataDraw,
            },
        ],
    };
    // Option for curver chart
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: color.grey,
                titleColor: color.black,
                displayColors: false,
                cornerRadius: 0,
                callbacks: {
                    title: (context: any[]) => {
                        /** Array title.
                        Each element of under array will show 1 row in tooltip
                        */
                        const arrTitle: string[] = [];
                        const d = new Date(`${context[0].raw.x}`);
                        arrTitle.push(`${d.getUTCFullYear()}.${d.getUTCMonth() + 1}`); // time
                        context.forEach((element) => {
                            if (element.dataset.label === t('detailSupplier.lowDefectRate')) {
                                arrTitle.push(t('detailSupplier.lowDefectRate'));
                            }
                            const score = element.formattedValue; // get score
                            arrTitle.push(`${t('detailSupplier.score')}: ${score} `);
                        });
                        return arrTitle;
                    },
                    labelColor: function () {
                        return {
                            borderColor: 'rgb(0, 0, 255)',
                            backgroundColor: 'rgb(255, 0, 0)',
                            borderWidth: 2,
                            borderDash: [2, 2],
                            borderRadius: 2,
                        };
                    },
                },
            },
        },
        scales: {
            x: {
                bounds: 'ticks',
                type: 'time',
                offset: 60,
                time: {
                    unit: 'month',
                    displayFormats: {
                        month: 'YYYY.M.D',
                    },
                    stepSize: 1,
                },
                ticks: {
                    align: 'start',
                    ...colorText,
                },
            },
            y: {
                ticks: {
                    display: true,
                    ...colorText,
                },
                min: 0,
                title: false,
            },
        },
        elements: {
            point: {
                hoverBorderWidth: 8,
            },
        },
    };

    return (
        <Box className={isFull ? style.chart : style.chart2}>
            <label className={isFull ? style.chartYLabel : style.chartYLabel2}>{props.label}</label>

            <CurverChart data={dataCurverChart} options={options} plugins={undefined} />

            <label className={isFull ? style.chartXLabel : style.chartXLabel2}>{t('detailofsupply.period')}</label>
        </Box>
    );
};

export default CurverChartCustom;
