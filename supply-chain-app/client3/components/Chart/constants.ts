const MARGIN_CHART_VALUE = 30;

function handleClickLegend({ legendItem, legend, dataLength }) {
    const index = legendItem.datasetIndex;
    const ci = legend.chart;

    const isDatasetVisible = ci.isDatasetVisible(index);

    if (index === 0) {
        for (let i = 0; i < dataLength; i++) {
            isDatasetVisible ? ci.hide(i) : ci.show(i);
        }
    } else {
        isDatasetVisible ? ci.hide(index) : ci.show(index);
    }

    legendItem.hidden = isDatasetVisible;
}

export { MARGIN_CHART_VALUE, handleClickLegend };
