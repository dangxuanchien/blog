import { Column, Options } from '@material-table/core';
import { TableCell, TableRow } from '@material-ui/core';
import { FC } from 'react';

interface NumbericTableRowProps {
    /** Columns of table **/
    columns: Column<object>[];
    /** Options config for table */
    options?: Options<object>;
    /** Data of table */
    data: any;
}

/**
 * The numberic row of table component
 *
 * @returns Details the row of table component
 */
const NumbericTableRow: FC<NumbericTableRowProps> = (props) => {
    const { data, columns, options } = props;

    /**
     * Highlight cell when value < 0
     */
    const highlightCell = (data: string): React.CSSProperties | null => {
        if (data === null || isNaN(parseFloat(data))) return null;
        if (parseFloat(data) >= 0) return null;

        return { backgroundColor: '#FFAFAF', color: '#FF0000' };
    };

    return (
        <TableRow key={data.tableData.index} style={{ ...options.rowStyle }}>
            {columns.map((item, index) => {
                return (
                    <TableCell
                        style={{
                            ...item.cellStyle,
                            ...highlightCell(data[item.field as string]),
                        }}
                        key={index}
                    >
                        {data[item.field as string]}
                    </TableCell>
                );
            })}
        </TableRow>
    );
};
export default NumbericTableRow;
