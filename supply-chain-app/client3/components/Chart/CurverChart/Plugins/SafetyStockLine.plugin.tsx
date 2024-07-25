import { Chart } from 'chart.js';
import { drawText } from './Utils/DrawUtils';

/**
 * The SafetyStockLineOptions Interface
 */
export interface SafetyStockLineOptions {
    data?: Array<{
        value?: number;
        labelAlign?: string;
        borderWidth?: number;
        borderColor?: string;
        borderDash?: Array<number>;
        borderDashOffset?: number;
    }>;
}

const safetyStockLine = {
    id: 'safetyStockLine',
    afterDatasetsDraw(chart: Chart, _args: any, options: SafetyStockLineOptions) {
        if (!options.data || options.data.length === 0) return;

        const {
            ctx,
            chartArea: { left, right },
            scales: { y },
        } = chart;
        ctx.save();

        options.data.forEach((item) => {
            const borderWidth = item.borderWidth || 1;
            const yAxes = y.getPixelForValue(item.value);

            // init style
            ctx.lineWidth = borderWidth;
            ctx.strokeStyle = item.borderColor;
            ctx.fillStyle = item.borderColor;
            ctx.setLineDash(item.borderDash || []);
            ctx.lineDashOffset = item.borderDashOffset;

            // draw the Safety stock line
            ctx.beginPath();
            ctx.moveTo(left, yAxes);
            ctx.lineTo(right, yAxes);
            ctx.stroke();

            // draw label
            item.labelAlign = item.labelAlign || 'right';
            drawText(ctx, right, yAxes - borderWidth * 3, item);
        });

        ctx.restore();
    },
};

export default safetyStockLine;
