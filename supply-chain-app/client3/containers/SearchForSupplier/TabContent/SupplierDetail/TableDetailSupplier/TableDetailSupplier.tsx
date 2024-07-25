import { Column } from '@material-table/core';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { selectRow } from 'redux/searchForSupplier/reducer';
import TextTable from '@/components/Table/TextTable/TextTable';
import { useContext } from 'react';
import { ThemContext } from 'context/ThemeContext';
import { color } from '@/components/CSSConstant/css.constant';

const { white, greyNew, black } = color;

const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    padding: '0 12px',
    fontWeight: '600',
    fontSize: '16px',
    backgroundColor: white,
    color: 'black',
    border: `2px solid ${black}`,
    position: 'sticky',
    top: 0,
    zIndex: 1,
};
const headerStyleDark: React.CSSProperties = {
    textAlign: 'center',
    padding: '0 12px',
    fontWeight: '600',
    fontSize: '16px',
    backgroundColor: greyNew,
    color: white,
    border: `2px solid ${greyNew}`,
    borderBottom: `2px solid ${white}`,
    position: 'sticky',
    top: 0,
    zIndex: 1,
};
const rowStyle: React.CSSProperties = {
    border: `2px solid ${black}`,
    backgroundColor: white,
};
const rowStyleDark: React.CSSProperties = {
    border: `2px solid ${greyNew}`,
    backgroundColor: greyNew,
};
const cellStyle: React.CSSProperties = {
    border: `2px solid ${black}`,
    padding: '1px',
    boxSizing: 'border-box',
};

const cellStyleDark: React.CSSProperties = {
    border: `2px solid ${greyNew}`,
    padding: '1px',
    boxSizing: 'border-box',
};

const cellStyleScoreDark: React.CSSProperties = {
    ...cellStyleDark,
    color: '#FFDA0A',
};

const cellStyleEvaluationDark: React.CSSProperties = {
    ...cellStyleDark,
    paddingLeft: '20px',
};

interface TableDetailSupplierProps {
    /** Function handle on clickSelect */
    onChecked?: (event: any) => any;
    /** data display on table */
    data?: any[];
    /** Options config for table */
    options?: any;
}
/**init column and render checkbox*/

const TableDetailSupplier: FC<TableDetailSupplierProps> = (props) => {
    const initColumnsTable = (t, onSelect): Column<any>[] => [
        {
            title: t('detailSupplier.evaluation'),
            field: 'evaluation',
            width: 150,
            minWidth: 150,
            cellStyle: getMode === 'light' ? cellStyle : cellStyleEvaluationDark,
        },
        {
            title: t('detailSupplier.averageScore'),
            field: 'score',
            width: 130,
            minWidth: 140,
            align: 'center',
            cellStyle: getMode === 'light' ? cellStyle : cellStyleScoreDark,
        },
        {
            title: '業界ポジション',
            field: 'evaluation',
            width: 180,
            minWidth: 180,
            align: 'center',
            cellStyle: getMode === 'light' ? cellStyle : cellStyleDark,
            render: () => <div></div>,
        },
    ];

    const { getMode } = useContext(ThemContext);

    const { t } = useTranslation();
    const [columns, setColumns] = useState([]);
    const dispatch = useDispatch<any>();

    const options = {
        headerStyle: getMode === 'light' ? headerStyle : headerStyleDark,
        rowStyle: getMode === 'light' ? rowStyle : rowStyleDark,
        maxBodyHeight: '16.6rem',
        overflowY: 'visible',
        showEmptyDataSourceMessage: false,
    };

    /**implement selection*/
    const onSelect = (e, row) => {
        const data = props.data;
        // get id selection and set value of this record isSelect=checked
        const result = data.map((item: any) => {
            return {
                ...item,
                isSelect: item.id === row.id ? e.target.checked : item.isSelect,
            };
        });
        dispatch(selectRow(result));
        props.onChecked(result);
    };
    /**render table*/
    useEffect(() => {
        setColumns(initColumnsTable(t, onSelect));
    }, [props.data]);

    return <TextTable options={options} columns={columns} data={props.data} />;
};
export default TableDetailSupplier;
