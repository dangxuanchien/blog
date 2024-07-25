import { Chart } from 'chart.js';
import { drawArrow, ArrowDirection, drawText } from './Utils/DrawUtils';

/**
 * The PresentLineOptions Interface
 */
export interface PresentLineOptions {
    borderWidth?: number;
    borderColor?: string;
    borderDash?: Array<number>;
    borderDashOffset?: number;
    value?: number;
    labelAlign?: string;
}

const presentLine = {
    id: 'presentLine',
    afterDatasetsDraw(chart: Chart, _args: any, options: PresentLineOptions) {
        if (!options.value) {
            return;
        }

        const {
            ctx,
            chartArea: { top, bottom },
            scales: { x },
        } = chart;
        ctx.save();

        const borderWidth = options.borderWidth || 1;
        const xAxes = x.getPixelForValue(options.value);

        // init style
        ctx.lineWidth = borderWidth;
        ctx.strokeStyle = options.borderColor;
        ctx.fillStyle = options.borderColor;
        ctx.setLineDash(options.borderDash || []);
        ctx.lineDashOffset = options.borderDashOffset;

        // draw the split line
        ctx.beginPath();
        ctx.moveTo(xAxes, top);
        ctx.lineTo(xAxes, bottom);
        ctx.stroke();

        // draw arrow down
        drawArrow(ctx, xAxes, top - 10, 15, ArrowDirection.Down);

        // draw label
        options.labelAlign = options.labelAlign || 'center';
        drawText(ctx, xAxes, top - 16, options);

        ctx.restore();
    },
};

export default presentLine;
