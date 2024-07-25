import { Chart } from 'chart.js';
import { drawArrow, ArrowDirection } from './Utils/DrawUtils';

/**
 * The ChartAxesArrowOptions Interface
 */
export interface ChartAxesArrowOptions {
    borderWidth?: number;
    borderColor?: string;
    borderDash?: Array<number>;
    borderDashOffset?: number;
}

const chartAxesArrow = {
    id: 'chartAxesArrow',
    beforeDraw(chart: Chart, _args: any, options: ChartAxesArrowOptions) {
        const {
            ctx,
            chartArea: { left, right, top, bottom },
        } = chart;
        const borderWidth = options.borderWidth || 1;
        const arrowW = borderWidth * 3;

        ctx.save();

        // init style
        ctx.lineWidth = borderWidth;
        ctx.strokeStyle = options.borderColor;
        ctx.fillStyle = options.borderColor;
        ctx.setLineDash(options.borderDash || []);
        ctx.lineDashOffset = options.borderDashOffset;

        // draw axes: x and y
        ctx.beginPath();
        ctx.moveTo(left, top);
        ctx.lineTo(left, bottom);
        ctx.lineTo(right, bottom);
        ctx.stroke();

        // draw arrow up
        drawArrow(ctx, left, top, arrowW, ArrowDirection.Up);
        // draw arrow right
        drawArrow(ctx, right, bottom, arrowW, ArrowDirection.Right);

        ctx.restore();
    },
};

export default chartAxesArrow;
