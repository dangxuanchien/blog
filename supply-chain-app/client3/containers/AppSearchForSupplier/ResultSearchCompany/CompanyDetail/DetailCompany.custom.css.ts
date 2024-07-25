// const styleRadarChart: React.CSSProperties = {
//     height: '20rem',
//     width: '21.5rem',
//     overflow: 'hidden',
// };

// const firstHeaderColumn: React.CSSProperties = {
//     title: 'supplierdetails.companyName',
// };

// const headerStyleFirst: React.CSSProperties = {
//     textAlign: 'left',
//     padding: '0 5px',
//     fontWeight: '600',
//     boxSizing: 'border-box',
//     position: 'sticky',
//     left: 0,
//     zIndex: 3,
// };

// const cellStyleFirst: React.CSSProperties = {
//     boxSizing: 'border-box',
//     position: 'sticky',
//     fontWeight: '600',
//     padding: '0px 5px 0px 5px',
//     left: 0,
//     zIndex: 2,
//     borderRight: '1px solid black',
//     borderBottom: '1px solid var(--silver-grey)',
// };

// const cellStyle: React.CSSProperties = {
//     borderBottom: '1px solid var(--silver-grey)',
//     textAlign: 'center',
//     minWidth: 400,
// };

export type CustomCssTableType = Record<string, React.CSSProperties | Record<string, string>>;

export const customCssDetailCompanyTable: CustomCssTableType = {
    styleRadarChart: {
        height: '20rem',
        width: '21.5rem',
        overflow: 'hidden',
    },
    headerStyleFirst: {
        textAlign: 'left',
        padding: '0 5px',
        fontWeight: '600',
        boxSizing: 'border-box',
        position: 'sticky',
        left: 0,
        zIndex: 3,
    },
    cellStyleFirst: {
        boxSizing: 'border-box',
        position: 'sticky',
        fontWeight: '600',
        padding: '0px 5px 0px 5px',
        left: 0,
        zIndex: 2,
        borderRight: '1px solid black',
        borderBottom: '1px solid var(--silver-grey)',
    },
    cellStyle: {
        borderBottom: '1px solid var(--silver-grey)',
        textAlign: 'center',
        minWidth: 400,
    },
    firstHeaderColumn: {
        title: 'supplierdetails.companyName',
    },
};
