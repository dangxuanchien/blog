import CheckBoxComponent from '@/components/Inputs/CheckBox/CheckboxTable';
import { ColDef } from '@/components/Table/AppTable/AppTable';
import { CompanyInformation } from '@/redux/appSearchForSupplier/ResultSearchCompany/types';
import { ChangeEvent, MutableRefObject } from 'react';
import { TFunction } from 'react-i18next';
import { columnCompanyTableCss } from './InitColumnsCompanyTable.style';

export const initColumnsTable = (
    t: TFunction<'translation', undefined>,
    checkedData: MutableRefObject<CompanyInformation[]>,
    onClickCheckbox: () => void
): ColDef<any>[] => [
    {
        title: t('searchForSupplier.selection'),
        field: 'selection',
        width: '40px',
        minWidth: 38,
        headerCellStyle: columnCompanyTableCss.cellSelection,
        render: (value, row) => {
            return (
                <CheckBoxComponent
                    defaultChecked={checkedData.current.some(
                        (element: CompanyInformation) => element.companyId === row.companyId
                    )}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        onClickCheckbox();
                        if (event.target.checked) {
                            checkedData.current = [...checkedData?.current, row];
                            return;
                        }
                        checkedData.current = checkedData?.current?.filter(
                            (element: CompanyInformation) => element.companyId !== row.companyId
                        );
                    }}
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
        headerCellStyle: columnCompanyTableCss.cellStyle,
    },
    {
        title: t('searchForSupplier.companyName'),
        field: 'companyName',
        width: '120px',
        minWidth: 120,
        tooltip: true,
        headerCellStyle: columnCompanyTableCss.cellStyleNowrap,
        sortAble: true,
    },
    {
        title: t('searchForSupplier.productCategoryGroup'),
        field: 'productCategoryGroup',
        width: '110px',
        minWidth: 110,
        tooltip: true,
        headerCellStyle: columnCompanyTableCss.cellStyle,
        sortAble: true,
    },
    {
        title: t('searchForSupplier.productCategory'),
        field: 'itemCategory',
        width: '150px',
        minWidth: 150,
        tooltip: true,
        headerCellStyle: columnCompanyTableCss.cellStyleNowrap,
        sortAble: true,
    },
    {
        title: t('searchForSupplier.itemName'),
        field: 'itemName',
        width: '150px',
        minWidth: 150,
        tooltip: true,
        headerCellStyle: columnCompanyTableCss.cellStyle,
        sortAble: true,
    },
    {
        title: t('searchForSupplier.originalItemName'),
        field: 'originalItemName',
        width: '100px',
        minWidth: 150,
        tooltip: true,
        headerCellStyle: columnCompanyTableCss.cellStyle,
        sortAble: true,
    },
    {
        title: t('searchForSupplier.score'),
        field: 'score',
        width: '390px',
        minWidth: 380,
        cellStyle: columnCompanyTableCss.cellStyle,
        height: '26px',
        subTitle: [
            {
                title: t('searchForSupplier.qualityScore'),
                field: 'qualityScore',
                width: '50px',
                minWidth: 50,
                textAlign: 'center',
                headerCellStyle: columnCompanyTableCss.cellStyleNowrap,
                sortAble: true,
            },
            {
                title: t('searchForSupplier.costScore'),
                field: 'costScore',
                width: '55px',
                minWidth: 55,
                textAlign: 'center',
                headerCellStyle: columnCompanyTableCss.cellStyleNowrap,
                sortAble: true,
            },
            {
                title: t('searchForSupplier.deliveryScore'),
                field: 'deliveryScore',
                width: '50px',
                minWidth: 50,
                textAlign: 'center',
                headerCellStyle: columnCompanyTableCss.cellStyleNowrap,
                sortAble: true,
            },
            {
                title: t('searchForSupplier.finance'),
                field: 'financeScore',
                width: '50px',
                minWidth: 50,
                textAlign: 'center',
                headerCellStyle: columnCompanyTableCss.cellStyleNowrap,
                sortAble: true,
            },
            {
                title: t('searchForSupplier.environmentScore'),
                field: 'environmentScore',
                width: '50px',
                minWidth: 50,
                textAlign: 'center',
                headerCellStyle: columnCompanyTableCss.cellStyleNowrap,
                sortAble: true,
            },
            {
                title: t('searchForSupplier.laborScore'),
                field: 'laborScore',
                width: '50px',
                minWidth: 50,
                textAlign: 'center',
                headerCellStyle: columnCompanyTableCss.cellStyleNowrap,
                sortAble: true,
            },
            {
                title: t('searchForSupplier.ethicsScore'),
                field: 'ethicsScore',
                width: '50px',
                minWidth: 50,
                textAlign: 'center',
                headerCellStyle: columnCompanyTableCss.cellStyleNowrap,
                sortAble: true,
            },
            {
                title: t('searchForSupplier.sustainableScore'),
                field: 'sustainableScore',
                width: '50px',
                minWidth: 50,
                textAlign: 'center',
                headerCellStyle: columnCompanyTableCss.cellStyleNowrap,
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
        headerCellStyle: columnCompanyTableCss.cellStyleNowrap,
        sortAble: true,
    },
    {
        title: t('searchForSupplier.sales'),
        field: 'sales',
        width: '90px',
        minWidth: 90,
        textAlign: 'center',
        headerCellStyle: columnCompanyTableCss.cellStyle,
        sortAble: true,
        render: (value) => Number(value).toLocaleString(),
    },
];
