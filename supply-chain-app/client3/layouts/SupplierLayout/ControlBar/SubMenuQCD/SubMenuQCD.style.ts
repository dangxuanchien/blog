import { cssConstant } from '@/components/CSSConstant/css.constant';
const cellStyle: React.CSSProperties = {
    borderBottom: '1px solid var(--silver-grey)',
    textAlign: 'center',
    fontSize: cssConstant.font.title as string,
};
const styleRadarChart = {
    height: '21rem',
    width: '17.5rem',
    overflow: 'hidden',
};
const headerStyleFirst: React.CSSProperties = {
    textAlign: 'left',
    padding: '0 5px',
    fontWeight: '600',
    boxSizing: 'border-box',
    position: 'sticky',
    left: 0,
    zIndex: 3,
};

const cellStyleFirst: React.CSSProperties = {
    boxSizing: 'border-box',
    position: 'sticky',
    padding: '0px 5px 0px 5px',
    left: 0,
    zIndex: 2,
    borderRight: '1px solid black',
    borderBottom: '1px solid var(--silver-grey)',
    backgroundColor: 'red',
    fontSize: cssConstant.font.title as string,
    textAlign: 'left',
};
export const customCss = {
    styleRadarChart,
    headerStyleFirst,
    cellStyleFirst,
    cellStyle,
};
