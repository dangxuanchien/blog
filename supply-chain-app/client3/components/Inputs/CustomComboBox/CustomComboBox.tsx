import React, { FC } from 'react';
import { FormControl, MenuItem, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { BiChevronDown } from 'react-icons/bi';

/**
 * The Props Interface
 */
interface ComboBoxProps {
    label?: string;
    labelStyle?: React.CSSProperties;
    options: { text: string | number; value: string | number }[];
    styles?: React.CSSProperties;
    onChange: Function;
    value: string;
    classes?: Object;
    className?: Object;
    comboBoxProps?: Object;
    isAllowDelete?: boolean;
}

const useStyles = makeStyles(() => ({
    select: {
        height: '2.5rem',
        width: '8.5rem',
        borderRadius: 0,

        ['& .MuiOutlinedInput-notchedOutline']: {
            borderColor: 'black',
        },
        ['& .MuiOutlinedInput-input']: {
            padding: 0,
            paddingLeft: '5px',
            backgroundColor: 'transparent',
        },
    },
    selectIcon: {
        position: 'absolute',
        height: '100%',
        width: 'auto',
        right: 0,
        top: 0,
        color: 'black',
        backgroundColor: 'white',
    },
    menuItem: {
        minHeight: '2rem',
    },
    label: {
        marginLeft: '5px',
        marginRight: '3px',
        color: 'black',
        fontWeight: 'bold',
    },
}));

const ComboBoxCustom: FC<ComboBoxProps> = (props) => {
    const style = useStyles();
    const { label, options, onChange, value, classes, labelStyle, comboBoxProps, className, isAllowDelete } = props;

    const onKeyDown = (event) => {
        const { keyCode } = event;
        if (isAllowDelete && (keyCode === 8 || keyCode === 46)) {
            onChange('');
        }
    };

    return (
        <>
            {label ? (
                <label style={{ ...labelStyle }} className={style.label}>
                    {label} {}
                </label>
            ) : null}
            <div onKeyDown={(event) => onKeyDown(event)}>
                <Select
                    variant="outlined"
                    value={value}
                    onChange={(event) => onChange(event?.target?.value)}
                    className={`${style.select} + ${className}`}
                    IconComponent={BiChevronDown}
                    classes={{
                        icon: style.selectIcon,
                        ...classes,
                    }}
                    {...comboBoxProps}
                >
                    {options.map((item, i) => (
                        <MenuItem key={i} value={item.value} className={`${style.menuItem} + ${className}`}>
                            {item.text}
                        </MenuItem>
                    ))}
                </Select>
            </div>
        </>
    );
};
export default ComboBoxCustom;
