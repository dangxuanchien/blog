import { ColDef } from '@/components/Table/AppTable/AppTable';
import { ReactNode } from 'react';
import i18n from 'translation/i18n';
import { columnStyleHeader, columStyle } from './ConditionSearchCompany.style';

export enum KeyFilter {
    GROUP = 'itemCategoryGroupName',
    CATEGORY = 'itemCategoryName',
    ITEM_NAME = 'itemName',
}

export const getColumnsCandidate = (
    renderHeader: (col: ColDef) => ReactNode,
    renderCategoryGroupName: (value: string, row: any) => ReactNode,
    renderCategoryName: (value: string, row: any) => ReactNode
): ColDef<any>[] => {
    return [
        {
            title: '',
            field: 'index',
            width: '1%',
            minWidth: '50px',
            cellStyle: columStyle,
            headerCellStyle: {
                backgroundColor: '#32363e',
            },
        },
        {
            title: i18n.t('searchForSupplierNew.productCategoryGroup'),
            field: KeyFilter.GROUP,
            textAlign: 'left',
            width: '33%',
            minWidth: '250px',
            cellStyle: columStyle,
            headerCellStyle: columnStyleHeader,
            renderHeader: renderHeader,
            render: renderCategoryGroupName,
        },
        {
            title: i18n.t('supplyChainTree.productCategory'),
            field: KeyFilter.CATEGORY,
            textAlign: 'left',
            width: '33%',
            minWidth: '250px',
            cellStyle: columStyle,
            headerCellStyle: columnStyleHeader,
            renderHeader: renderHeader,
            render: renderCategoryName,
        },
        {
            title: i18n.t('searchForSupplierNew.itemName'),
            field: KeyFilter.ITEM_NAME,
            textAlign: 'left',
            width: '33%',
            minWidth: '240px',
            cellStyle: columStyle,
            headerCellStyle: columnStyleHeader,
            renderHeader: renderHeader,
        },
    ];
};
