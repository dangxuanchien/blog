import { CustomCssTableType } from '../CompanyDetail/DetailCompany.custom.css';

export const columnCompanyTableCss: CustomCssTableType = {
    tableStyle: {
        width: '98.2%',
        marginLeft: '1.5rem',
    },
    headerStyle: {
        textAlign: 'center',
        padding: '0 12px',
        fontWeight: '600',
        fontSize: '16px',
        backgroundColor: 'var(--grey)',
        color: 'black',
        border: '1px solid var(--black)',
        position: 'sticky',
        top: '0px',
        zIndex: 1,
    },
    rowStyle: {
        border: '1px solid var(--black)',
        background: 'var(--white)',
    },
    cellStyle: {
        padding: '1px',
        boxSizing: 'border-box',
        whiteSpace: 'pre-wrap',
    },
    cellStyleNowrap: {
        padding: '1px',
        boxSizing: 'border-box',
        whiteSpace: 'nowrap',
    },
    cellSelection: {
        padding: '2px',
        textAlign: 'center',
        boxSizing: 'border-box',
    },
};

export const options = {
    ...columnCompanyTableCss,
    maxBodyHeight: 248.25,
    overflowY: 'visible',
    showEmptyDataSourceMessage: true,
    search: false,
    showTitle: false,
    paging: false,
    draggable: false,
    sorting: false,
};
