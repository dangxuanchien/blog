import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { initColumnsTable, options, tableStyle } from './initColumnsTable';
import { LIMITED_SHOW_MORE } from 'utils/constants';
import AppTable from '@/components/Table/AppTable/AppTable';
import { Order } from '@/types';

interface TableSearchForSupplierProps {
    /** Function handle on clickSelect */
    onChecked?: (selectedCompanyIdList: any) => any;
    /** data display on table */
    data?: Array<any>;
    // Check show more table
    isShowMore: boolean;
    isResetSelections?: boolean;
    isClickSearch?: boolean;
    dataSelected?: any[];
}

const TableSearchForSupplier: FC<TableSearchForSupplierProps> = ({ dataSelected, onChecked, ...props }) => {
    const { t } = useTranslation();
    const configColumns = initColumnsTable({ t, dataSelected, onChecked });

    let maxBodyHeight = 238;

    if (props.isShowMore) {
        const { MIN, MAX } = LIMITED_SHOW_MORE;
        const height = Number(options.maxBodyHeight.replace(/px/g, '')) + (MAX - MIN) * 31;
        maxBodyHeight = height ? height : 548;
    }

    return (
        <AppTable
            columns={configColumns}
            data={props.data}
            headerHeight={85}
            defaultOrderBy={{ field: 'qualityScore', order: Order.desc }}
            maxBodyHeight={maxBodyHeight}
            tableStyle={tableStyle}
        />
    );
};
export default TableSearchForSupplier;
