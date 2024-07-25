import { color } from '@/components/CSSConstant/css.constant';
import {
    createStyles,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Theme,
} from '@material-ui/core';
import { Property } from 'csstype';
import { FC, ReactNode } from 'react';

export type ColumnType = {
    title: string;
    field: string;
    width?: Property.Width;
    minWidth?: Property.MinWidth;
    align?: 'center' | 'inherit' | 'justify' | 'left' | 'right';
    alignHeader?: 'center' | 'inherit' | 'justify' | 'left' | 'right';
    style?: React.CSSProperties;
    styleNthChild?: {
        nthChild: number | string;
        style: React.CSSProperties;
    };
    styleHeader?: React.CSSProperties;
    backgroundColor?: Property.BackgroundColor;
    headerBackgroundColor?: Property.BackgroundColor;
    // eslint-disable-next-line no-unused-vars
    renderHeader?: (col: ColumnType) => ReactNode;
    // eslint-disable-next-line no-unused-vars
    renderRow?: (rowValue: any, row: any, col: ColumnType) => ReactNode;
};

type CustomTableNewProps = {
    columns: ColumnType[];
    data: any[];
    height?: Property.Height;
    maxHeight?: Property.MaxHeight;
    stickyHeader?: boolean;
    size?: 'small' | 'medium';
    padding?: 'normal' | 'checkbox' | 'none' | 'default';
    onRowClick?: (row) => void;
    styleNthChild?: {
        style: React.CSSProperties;
    };
    indexBorder?: Array<number>;
};

const { disabledBackground } = color;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            overflow: 'auto',
            boxShadow: 'none',
            borderRadius: 0,
            backgroundColor: 'unset',
        },
        table: {
            '&.MuiTableCell-root': {
                minWidth: 650,
            },
            '& .MuiTableCell-stickyHeader': {
                top: 0,
                left: 'unset',
                zIndex: 2,
                position: 'sticky',
            },
        },
        row: {
            backgroundColor: theme.palette.primary.light,
            alignItems: 'center',
            '&:hover': {
                backgroundColor: disabledBackground,
            },
        },
        cellNoRecord: {
            textAlign: 'center',
            border: 'none',
        },
        rowHover: {
            '&:hover td': {
                backgroundColor: '#464951 !important',
                cursor: 'pointer',
                transition: '0.3s',
            },
        },
    })
);

const CustomTableNew: FC<CustomTableNewProps> = (props) => {
    const { columns, data, height, stickyHeader, size, padding, maxHeight, indexBorder, onRowClick } = props;

    const classes = useStyles();
    const renderTableHead = () => {
        return columns.map((column, index) => (
            <TableCell
                key={index}
                colSpan={1}
                align={column.alignHeader || column.align || 'center'}
                padding={padding || 'normal'}
                style={{
                    ...(column.headerBackgroundColor && { backgroundColor: column.headerBackgroundColor }),
                    ...(column.width && { width: column.width }),
                    ...(column.minWidth && { minWidth: column.minWidth }),
                    ...column.styleHeader,
                }}
            >
                {column.renderHeader ? column.renderHeader(column) : column.title}
            </TableCell>
        ));
    };
    const renderTableRow = (row, indexRow) => {
        return columns.map((column, index) => {
            const value = row[column.field];
            return (
                <TableCell
                    colSpan={1}
                    key={column.field}
                    align={column.align || 'center'}
                    padding={padding || 'normal'}
                    style={{
                        ...(column.backgroundColor && { backgroundColor: column.backgroundColor }),
                        ...(column.width && { width: column.width }),
                        ...(column.minWidth && { minWidth: column.minWidth }),
                        ...column.style,
                        ...(indexBorder && indexRow !== 0 &&
                            indexBorder.includes(indexRow) && { borderTop: '1px solid var(--white)' }),
                    }}
                >
                    {column.renderRow ? column.renderRow(value, row, column) : value}
                </TableCell>
            );
        });
    };
    const renderNoRecord = () => (
        <TableRow>
            <TableCell className={classes.cellNoRecord} colSpan={6}>
                No records to display
            </TableCell>
        </TableRow>
    );

    const handleClickRow = (row) => {
        if (onRowClick) {
            onRowClick(row);
        }
    };
    return (
        <Paper className={classes.root} style={{ ...(height && { height }), ...(maxHeight && { maxHeight }) }}>
            <Table
                className={classes.table}
                stickyHeader={stickyHeader}
                size={size || 'medium'}
                aria-label="sticky customized table"
            >
                <TableHead>
                    <TableRow>{renderTableHead()}</TableRow>
                </TableHead>
                <TableBody>
                    {data.length === 0
                        ? renderNoRecord()
                        : data.map((row, index) => (
                            <TableRow
                                key={index}
                                className={`${classes.row} ${onRowClick && classes.rowHover}`}
                                onClick={() => handleClickRow(row)}
                            >
                                {renderTableRow(row, index)}
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </Paper>
    );
};

export default CustomTableNew;
