const CHART_LINE_COLOR_DARK = [
    '#D75281',
    '#205E61',
    '#FEC260',
    '#BFDB38',
    '#7286D3',
    '#F55050',
    '#FC7300',
    '#5BC0F8',
    '#4E6C50',
    '#FD8A8A',
];

const CHART_LINE_COLOR_LIGHT = [
    '#bfbfbf',
    '#222222',
    '#6B728E',
    '#474E68',
    '#8B7E74',
    '#3C4048',
    '#665A48',
    '#112B3C',
    '#383838',
    '#694E4E',
];

function getMinAndMaxOfArr(arr: number[]) {
    return { min: Math.min(...arr), max: Math.max(...arr) };
}

export { CHART_LINE_COLOR_DARK, CHART_LINE_COLOR_LIGHT, getMinAndMaxOfArr };
