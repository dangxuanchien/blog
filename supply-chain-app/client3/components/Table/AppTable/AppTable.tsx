import IconArrowDown from '@/assets/icons/IconArrowDown.svg';
import useDeepCallback from '@/hooks/useDeepCallback';
import { useDeepEffect } from '@/hooks/useDeepEffect';
import useDeepMemo from '@/hooks/useDeepMemo';
import { Order, OrderBy } from '@/types';
import appMemo from '@/utils/appMemo';
import MaterialTable, { Column, Options } from '@material-table/core';
import { Box, TableCell, TableHead, TableRow, TableRowTypeMap, TableSortLabel, Tooltip } from '@material-ui/core';
import { Property } from 'csstype';
import React, { ReactNode, useState } from 'react';
import useAppTableStyle from './AppTable.style';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';

export const options: Options<any> = {
    overflowY: 'visible',
    showEmptyDataSourceMessage: true,
    search: false,
    showTitle: false,
    paging: false,
    draggable: false,
    sorting: false,
};

export type ColDef<T = any> = {
    title: string;
    field: string;
    minWidth?: Property.Width<number>;
    width?: Property.Width<number>;
    height?: number | string;
    textAlign?: 'left' | 'right' | 'center' | 'justify';
    headerCellStyle?: React.CSSProperties;
    cellStyle?: React.CSSProperties;
    sortAble?: boolean;
    subTitle?: ColDef<T>[];
    render?: (value: any, row: T) => ReactNode;
    tooltip?: boolean;
    renderHeader?: (col: ColDef<T>) => ReactNode;
};

/**
 * The Props Interface
 */
interface AppTableProps<T extends Record<string, any>> {
    /** Columns of table **/
    columns: ColDef<T>[];
    /** Data of table **/
    data: T[];
    defaultOrderBy?: OrderBy<keyof T>;
    headerHeight?: Property.Height<number>;
    maxBodyHeight?: Property.Height<number>;
    tableStyle?: React.CSSProperties;
    headerBorderBottom?: boolean;
    rowGroupField?: keyof T;
    onClickRow?: React.MouseEventHandler<HTMLTableRowElement>;
}

/**
 * The Text Table component
 *
 * @returns Details the Text Table component
 */
const AppTable = <T extends Record<string, any>>({
    defaultOrderBy,
    data,
    columns,
    headerHeight = 10,
    maxBodyHeight,
    tableStyle,
    headerBorderBottom = true,
    rowGroupField,
    onClickRow,
}: AppTableProps<T>) => {
    const classes = useAppTableStyle();
    const [orderBy, setOrderBy] = useState<OrderBy<keyof T> | undefined>(defaultOrderBy);

    const [dataTable, setDataTable] = useState(data);

    if (maxBodyHeight) {
        options.maxBodyHeight = maxBodyHeight;
    }

    // Handle sort row by column field
    useDeepEffect(() => {
        const newDataTable = [...data];
        if (orderBy?.field) {
            newDataTable.sort((a, b) => {
                const aValue = a[orderBy.field];
                const bValue = b[orderBy.field];
                let sortValue = 1;
                if (orderBy.order === Order.desc) {
                    sortValue = -sortValue;
                }

                // return sort
                if (aValue > bValue) {
                    return sortValue;
                }
                if (aValue < bValue) {
                    return -sortValue;
                }
                return 0;
            });
        }
        setDataTable(newDataTable);
    }, [orderBy?.field, orderBy?.order, data]);

    const onColumnSortClick = (field: keyof T) => {
        if (orderBy) {
            const newOrderBy = { ...orderBy };
            newOrderBy.field = field;
            setOrderBy(newOrderBy);
        }
    };

    const renderSubHeaderCell = (headCell: ColDef) => {
        return (
            <Box className={classes.headerCell}>
                <Box className={classes.titleHeaderCell}> {headCell.title}</Box>{' '}
                {headCell.sortAble && (
                    <TableSortLabel
                        active={true}
                        direction={orderBy?.field === headCell.field ? Order.desc : Order.asc}
                        className={classes.iconSortHeader}
                        onClick={() => onColumnSortClick(headCell.field)}
                        IconComponent={IconArrowDown}
                    />
                )}
            </Box>
        );
    };
    const renderHeaderCell = (headCell: ColDef) => {
        return (
            <Box className={classes.headerCell}>
                <Box className={classes.titleHeaderCell}> {headCell.title}</Box>
                {headCell.sortAble && (
                    <TableSortLabel
                        active={true}
                        direction={orderBy?.field === headCell.field ? Order.desc : Order.asc}
                        onClick={() => onColumnSortClick(headCell.field)}
                        className={classes.iconSortHeader}
                        IconComponent={IconArrowDown}
                    />
                )}
                <div>
                    {headCell.subTitle?.map((sub) => {
                        return (
                            <TableCell
                                style={{
                                    ...sub?.headerCellStyle,
                                    minWidth: sub?.minWidth,
                                    width: sub?.width,
                                }}
                                className={classes.subHeaderTableCell}
                                key={sub.field}
                                colSpan={sub.subTitle?.length ?? 1}
                                align="center"
                            >
                                {sub.renderHeader ? sub.renderHeader(sub) : renderSubHeaderCell(sub)}
                            </TableCell>
                        );
                    })}
                </div>
            </Box>
        );
    };

    const renderHeader = useDeepCallback(() => {
        return (
            <TableHead className={classes.headerTable}>
                <TableRow
                    className={classes.headerRow}
                    style={{
                        height: headerHeight,
                        ...(!headerBorderBottom && {
                            boxShadow: 'none',
                        }),
                    }}
                >
                    {columns.map((column, index) => {
                        return (
                            <TableCell
                                style={{
                                    ...column?.headerCellStyle,
                                    minWidth: column?.minWidth,
                                    width: column?.width,
                                    height: headerHeight,
                                }}
                                className={classes.headerTableCell}
                                key={index}
                                colSpan={column.subTitle?.length ?? 1}
                                align="center"
                            >
                                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                    {column.renderHeader ? column.renderHeader(column) : renderHeaderCell(column)}
                                </div>
                            </TableCell>
                        );
                    })}
                </TableRow>
            </TableHead>
        );
    }, [columns, orderBy]);
    const flattenColumns = (columns: ColDef<T>[]) => {
        return columns.reduce((pre, cur) => {
            let newPre = [...pre];
            if (cur.subTitle) {
                newPre = [...newPre, ...cur.subTitle];
            } else {
                newPre.push(cur);
            }
            return newPre;
        }, [] as ColDef<T>[]);
    };

    const flatColumns = useDeepMemo(() => flattenColumns(columns), [columns]);

    const renderRow = useDeepCallback(
        ({ data, index }: { data: T; index: number }) => {
            const previousData = dataTable[index - 1];
            return (
                <TableRow className={classes.rowStyle} key={data.tableData.index} onClick={onClickRow}>
                    {flatColumns.map((column, index) => {
                        return (
                            <Tooltip
                                title={data[column.field] ?? ''}
                                key={column.field}
                                placement="bottom-start"
                                arrow
                                classes={{
                                    tooltip: classes.tooltip,
                                    arrow: classes.arrowTooltip,
                                }}
                                disableFocusListener={!column.tooltip}
                                disableHoverListener={!column.tooltip}
                                disableTouchListener={!column.tooltip}
                            >
                                <TableCell
                                    key={index}
                                    align={column.textAlign}
                                    className={classes.cellDataStyle}
                                    style={{
                                        maxWidth: column?.width,
                                        minWidth: column?.minWidth,
                                        ...column?.cellStyle,
                                        ...(previousData &&
                                            rowGroupField &&
                                            data[rowGroupField] !== previousData[rowGroupField] && {
                                                borderTop: '1px solid var(--white)',
                                            }),
                                    }}
                                >
                                    {column.render ? column.render(data[column.field], data) : data[column.field]}
                                </TableCell>
                            </Tooltip>
                        );
                    })}
                </TableRow>
            );
        },
        [dataTable, flatColumns]
    );
    return (
        <Box className={classes.root} style={{ ...tableStyle }}>
            <MaterialTable
                options={options}
                columns={flatColumns as unknown as Column<any>[]}
                data={dataTable}
                components={{
                    Header: renderHeader,
                    Row: renderRow,
                }}
            />
        </Box>
    );
};

export default appMemo(AppTable);
