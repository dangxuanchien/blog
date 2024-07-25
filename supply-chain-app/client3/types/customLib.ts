import { ChartType } from 'chart.js';
import { ChartAxesArrowOptions } from '@/components/Chart/InventoryChart/Plugins/ChartAxesArrow.plugin';
import { PresentLineOptions } from '@/components/Chart/InventoryChart/Plugins/PresentLine.plugin';

declare module 'chart.js' {
    interface LegendOptions<TType extends ChartType> {
        events: any[];
    }

    interface PluginOptionsByType<TType extends ChartType> {
        chartAxesArrow: ChartAxesArrowOptions;
        presentLine: PresentLineOptions;
    }
}
