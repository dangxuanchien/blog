const styleRadarChart = {
    height: '20rem',
    width: '21.5rem',
    overflow: 'hidden',
};

const firstHeaderColumn = {
    title: 'supplierdetails.companyName',
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
    fontWeight: '600',
    padding: '0px 5px 0px 5px',
    left: 0,
    zIndex: 2,
    borderRight: '1px solid black',
    borderBottom: '1px solid var(--silver-grey)',
};

const cellStyle: React.CSSProperties = {
    borderBottom: '1px solid var(--silver-grey)',
    textAlign: 'center',
    minWidth: 400,
};

export const customCss = {
    cellStyle,
    styleRadarChart,
    headerStyleFirst,
    cellStyleFirst,
    firstHeaderColumn,
};
