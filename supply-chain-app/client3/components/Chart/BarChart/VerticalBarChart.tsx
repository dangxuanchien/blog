import { FC, useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chartjs-adapter-moment';
import { cssConstant, color } from '@/components/CSSConstant/css.constant';
import { ThemContext } from 'context/ThemeContext';
import type { ChartData, ChartOptions, Plugin } from 'chart.js';
import arrowDownImage from '@/assets/images/arrow-down.png';
import { useTranslation } from 'react-i18next';
import { convertDataBarChart } from '@/containers/SearchForSupplier/TabContent/SupplierDetail/convertData';
interface BarChartProps {
    data: any[];
    selected: any;
}
const { colorBarChartActive, colorBarChart } = color;

const VerticalBarChartCustom: FC<BarChartProps> = ({ data, selected }) => {
    const { getMode } = useContext(ThemContext);
    const { font } = cssConstant;
    const { t } = useTranslation();

    const { rangeCompanyValue, step, min } = convertDataBarChart(data);
    const colorText = getMode === 'light' ? color.silverGrey : color.white;
    const barThickness = 60;
    const labels = rangeCompanyValue?.map((item) => item.conditionValue);
    const totalCompany = rangeCompanyValue?.reduce((acc, cur) => acc + cur.companyNumber, 0);
    const dataChart: number[] = rangeCompanyValue
        ?.sort((a, b) => (a > b ? 1 : 0))
        ?.map((el) => Math.round((el.companyNumber * 100) / totalCompany));

    const getIndexSelected = () => {
        let indexSelected;
    
        for (let i = 0; i < rangeCompanyValue?.length; i++) {
            if (selected.value <= rangeCompanyValue[i].conditionValue) {
                indexSelected = i;
                break;
            }
        }
        return indexSelected;
    };
    const optionsObj: { data: ChartData<'bar'>; options: ChartOptions<'bar'> } = {
        data: {
            labels: labels,
            datasets: [
                {
                    barThickness: barThickness,
                    backgroundColor: rangeCompanyValue?.map((el, index) => {
                        const indexSelected = getIndexSelected();
                        return indexSelected === index ? colorBarChartActive : colorBarChart;
                    }),
                    data: dataChart,
                },
            ],
        },
        options: {
            responsive: true,
            layout: {
                padding: {
                    right: 16,
                    top: 16,
                },
            },
            scales: {
                x: {
                    grid: {
                        z: 1,
                        offset: true,
                        display: false,
                        borderColor: colorText,
                        tickLength: 1,
                        tickWidth: 10,
                    },
                    ticks: {
                        color: colorText,
                        align: 'start',
                        font: {
                            size: font.fontTitle as number,
                        },
                        padding: 0,
                        callback: function (_, i) {
                            return `       ${labels[i]}`;
                        },
                    },
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        offset: true,
                        display: false,
                        borderColor: colorText,
                    },
                    max: 100,
                    ticks: {
                        font: {
                            size: font.fontTitle as number,
                        },
                        color: colorText,
                        align: 'start',
                        stepSize: 50,
                        callback: function (value: number) {
                            // convert it to percentage
                            return value === 0 ? 0 : ((value / this.max) * 100).toFixed(0) + '%';
                        },
                    },
                },
            },
            hover: { mode: null },
            plugins: {
                tooltip: {
                    enabled: false,
                },
                legend: {
                    display: false,
                },
                title: {
                    display: true,
                    text: selected.parameter,
                    position: 'bottom',
                    align: 'center',
                    font: {
                        size: 15,
                        weight: '500',
                    },
                    color: colorText,
                },
            },
        },
    };
    const icon = new Image(10, 30);
    icon.src = arrowDownImage.src;

    const plugins = (): Plugin<'bar'>[] => [
        {
            id: 'barAvatar',
            afterDraw(chart) {
                const {
                    ctx,
                    scales: { x, y },
                } = chart;
                const iconSize = 15;
                const indexSelected = getIndexSelected();
                const itemSelected = rangeCompanyValue?.[indexSelected];
                const xPosition = x.getPixelForValue(indexSelected) - barThickness / 2 - iconSize / 2;
                const percent = (selected.value - min) % step === 0 ? barThickness : (((selected.value - min) % step) / step) * barThickness;
                const yPosition =
                    y.getPixelForValue(Math.round((itemSelected.companyNumber * 100) / totalCompany)) - iconSize;
                ctx.save();
                ctx.drawImage(icon, xPosition + percent, yPosition, iconSize, iconSize);
            },
        },
        {
            id: 'textLabels',
            afterDatasetDraw(chart) {
                const {
                    ctx,
                    chartArea: { top },
                } = chart;

                ctx.save();
                ctx.font = '14px Medium';
                ctx.fillStyle = '#fff';
                ctx.fillText(t('detailSupplier.companyRatio'), 12, top - 5);
                ctx.restore();
            },
        },
    ];

    return <Bar data={optionsObj.data} options={optionsObj.options} plugins={plugins()} redraw />;
};
export default VerticalBarChartCustom;
