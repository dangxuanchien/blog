import React, { FC } from 'react';
import MaterialTable, { Column, Components, Options } from '@material-table/core';
import { makeStyles, Theme } from '@material-ui/core';

/**
 * The Props Interface
 */
interface TextTableProps {
    /** Options config for table */
    options?: any;
    /** Component for render table */
    components?: Components;
    /** Columns of table **/
    columns: Column<object>[];
    /** Data of table **/
    data: object[];
    /** Is Table Span */
    isTableSpan?: Boolean;
    /** Render table has rowSpan or colSpan */
    headerSpan?: object[];
    /** Reder table has no rowSpan or ColSpan */
    headerNoSpan?: object[];
    /** Render data row for table has Span */
    row?: object[];
    /** onClick Row tableSpan */
    onClickDataRow?: (data, item) => void;
    /**table cellstyle */
    tableCellStyle?: React.CSSProperties;
    /**set background row with condition */
    /** onClick Row tableSpan */
    getStyleCondition?: (index) => React.CSSProperties;
    boxShadow?: boolean;
}

/**
 * The default style of table
 */

/**
 * The Text Table component
 *
 * @returns Details the Text Table component
 */
const TextTable: FC<TextTableProps> = (props) => {
    const options: Options<object> = {
        search: false,
        showTitle: false,
        paging: false,
        draggable: false,
        maxColumnSort: false,
        ...props.options,
    };
    const useStyles = makeStyles((theme: Theme) => ({
        root: {
            height: '100%',
            overflow: 'unset',
            '& *': {
                boxShadow: props.boxShadow ? '' : 'none !important',
            },
            '& .MuiPaper-rounded': {
                borderRadius: '0',
                boxShadow: 'none',
                height: '100%',
                '& div:last-child': {
                    height: '100%',
                },
            },
            '& .MuiPaper-rounded .MuiToolbar-gutters': {
                minHeight: '0',
            },
            '& .MuiPaper-root': {
                backgroundColor: theme.palette.secondary.contrastText,
            },
            '& .MuiTable-root': {
                borderCollapse: 'separate',
                borderSpacing: '0',
            },
            '& .MuiTableCell-root': {
                padding: ' 4px 12px',
                borderBottom: 'none',
                textAlign: 'center',
            },
        },
    }));

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <MaterialTable options={options} columns={props.columns} data={props.data} components={props.components} />
        </div>
    );
};
export default TextTable;
