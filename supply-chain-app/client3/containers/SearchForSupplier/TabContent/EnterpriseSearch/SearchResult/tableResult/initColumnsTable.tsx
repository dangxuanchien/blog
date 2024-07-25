import CheckBoxComponent from '@/components/Inputs/CheckBox/CheckboxTable';
import { ColDef } from '@/components/Table/AppTable/AppTable';
import { maxSelectionRecord } from '@/utils/constants';
import React, { ChangeEvent } from 'react';
import { TFunction } from 'react-i18next';

export const tableStyle: React.CSSProperties = {
    width: '98.2%',
    marginLeft: '1.5rem',
};
export const headerStyle: React.CSSProperties = {
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
};
export const rowStyle: React.CSSProperties = {
    border: '1px solid var(--black)',
    background: 'var(--white)',
};
export const cellStyle: React.CSSProperties = {
    padding: '1px',
    boxSizing: 'border-box',
    whiteSpace: 'pre-wrap',
};

export const cellStyleNowrap: React.CSSProperties = {
    padding: '1px',
    boxSizing: 'border-box',
    whiteSpace: 'nowrap',
};
export const cellSelection: React.CSSProperties = {
    padding: '2px',
    textAlign: 'center',
    boxSizing: 'border-box',
};
export const options = {
    tableStyle,
    headerStyle,
    rowStyle,
    maxBodyHeight: '238px',
    overflowY: 'visible',
    showEmptyDataSourceMessage: true,
    search: false,
    showTitle: false,
    paging: false,
    draggable: false,
    sorting: false,
};
type ColumnTableManage = {
    t: TFunction<'translation', undefined>;
    dataSelected: any[];
    onChecked?: (selectedCompanyIdList: any) => any;
};
export const initColumnsTable = ({ t, dataSelected, onChecked }: ColumnTableManage): ColDef<any>[] => [
    {
        title: t('searchForSupplier.selection'),
        field: 'selection',
        width: '40px',
        minWidth: 38,
        headerCellStyle: cellSelection,
        render: (value, row) => {
            let newDataSelected = [...dataSelected];
            const companyId = row.companyId;
            const isCheck = dataSelected.findIndex((el) => el.companyId === companyId) !== -1;
            return (
                <CheckBoxComponent
                    onChange={(e: ChangeEvent<HTMLInputElement>, checked) => {
                        if (checked) {
                            newDataSelected.length < maxSelectionRecord && newDataSelected.push(row);
                        } else {
                            newDataSelected = newDataSelected.filter((el) => el.companyId !== companyId);
                        }
                        onChecked(newDataSelected);
                    }}
                    isChecked={isCheck}
                />
            );
        },
    },
    {
        title: t('searchForSupplier.no'),
        field: 'id',
        width: '40px',
        minWidth: 40,
        textAlign: 'center',
        headerCellStyle: cellStyle,
    },
    {
        title: t('searchForSupplier.companyName'),
        field: 'companyName',
        width: '120px',
        minWidth: 120,
        tooltip: true,
        headerCellStyle: cellStyleNowrap,
        sortAble: true,
    },
    {
        title: t('searchForSupplier.productCategoryGroup'),
        field: 'productCategoryGroup',
        width: '110px',
        minWidth: 110,
        tooltip: true,
        headerCellStyle: cellStyle,
        sortAble: true,
    },
    {
        title: t('searchForSupplier.productCategory'),
        field: 'itemCategory',
        width: '150px',
        minWidth: 150,
        tooltip: true,
        headerCellStyle: cellStyleNowrap,
        sortAble: true,
    },
    {
        title: t('searchForSupplier.itemName'),
        field: 'itemName',
        width: '150px',
        minWidth: 150,
        tooltip: true,
        headerCellStyle: cellStyle,
        sortAble: true,
    },
    {
        title: t('searchForSupplier.originalItemName'),
        field: 'originalItemName',
        width: '100px',
        minWidth: 150,
        tooltip: true,
        headerCellStyle: cellStyle,
        sortAble: true,
    },
    {
        title: t('searchForSupplier.score'),
        field: 'score',
        width: '390px',
        minWidth: 380,
        cellStyle: cellStyle,
        height: '26px',
        subTitle: [
            {
                title: t('searchForSupplier.qualityScore'),
                field: 'qualityScore',
                width: '50px',
                minWidth: 50,
                textAlign: 'center',
                headerCellStyle: cellStyleNowrap,
                sortAble: true,
            },
            {
                title: t('searchForSupplier.costScore'),
                field: 'costScore',
                width: '55px',
                minWidth: 55,
                textAlign: 'center',
                headerCellStyle: cellStyleNowrap,
                sortAble: true,
            },
            {
                title: t('searchForSupplier.deliveryScore'),
                field: 'deliveryScore',
                width: '50px',
                minWidth: 50,
                textAlign: 'center',
                headerCellStyle: cellStyleNowrap,
                sortAble: true,
            },
            {
                title: t('searchForSupplier.finance'),
                field: 'financeScore',
                width: '50px',
                minWidth: 50,
                textAlign: 'center',
                headerCellStyle: cellStyleNowrap,
                sortAble: true,
            },
            {
                title: t('searchForSupplier.environmentScore'),
                field: 'environmentScore',
                width: '50px',
                minWidth: 50,
                textAlign: 'center',
                headerCellStyle: cellStyleNowrap,
                sortAble: true,
            },
            {
                title: t('searchForSupplier.laborScore'),
                field: 'laborScore',
                width: '50px',
                minWidth: 50,
                textAlign: 'center',
                headerCellStyle: cellStyleNowrap,
                sortAble: true,
            },
            {
                title: t('searchForSupplier.ethicsScore'),
                field: 'ethicsScore',
                width: '50px',
                minWidth: 50,
                textAlign: 'center',
                headerCellStyle: cellStyleNowrap,
                sortAble: true,
            },
            {
                title: t('searchForSupplier.sustainableScore'),
                field: 'sustainableScore',
                width: '50px',
                minWidth: 50,
                textAlign: 'center',
                headerCellStyle: cellStyleNowrap,
                sortAble: true,
            },
        ],
    },
    {
        title: t('searchForSupplier.homeBase'),
        field: 'headquartersLocation',
        width: '130px',
        minWidth: 130,
        textAlign: 'center',
        tooltip: true,
        headerCellStyle: cellStyleNowrap,
        sortAble: true,
    },
    {
        title: t('searchForSupplier.sales'),
        field: 'sales',
        width: '90px',
        minWidth: 90,
        textAlign: 'center',
        headerCellStyle: cellStyle,
        sortAble: true,
        render: (value) => Number(value).toLocaleString(),
    },
];
