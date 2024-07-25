import React, { FC } from 'react';
import { MenuItem, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { BiChevronDown } from 'react-icons/bi';

export interface IComboBoxItem {
    value: string | number;
    text: string;
}

/**
 * The Props Interface
 */
interface ComboBoxProps {
    /** Text value of label */
    options: IComboBoxItem[];
    /** styles of label */
    styles?: React.CSSProperties;
    /** Function handle select combobox */
    onChange: Function;
    value: String;
    classes?: Object;
    disabled?: boolean;
}

const useStyles = makeStyles(() => ({
    select: {
        height: '2.5rem',
        width: '10rem',
        borderRadius: 0,

        ['& .MuiOutlinedInput-notchedOutline']: {
            borderColor: '#B4C7E7',
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
        color: '#FFFFFF',
        backgroundColor: '#2E75B6',
    },
}));

/**
 * The Vertical Label component
 *
 * @returns Details Of Vertical Label component
 */
const ComboBox: FC<ComboBoxProps> = (props) => {
    const style = useStyles();
    const { options, onChange, value, classes, disabled } = props;

    const handleOnChange = (event) => {
        onChange(event.target.value);
    };

    return (
        <Select
            id="company-cb"
            variant="outlined"
            value={value ? value : ''}
            onChange={handleOnChange}
            className={style.select}
            IconComponent={BiChevronDown}
            classes={{
                icon: style.selectIcon,
                ...classes,
            }}
            disabled={disabled}
        >
            {options.map((item, i) => (
                <MenuItem key={i} value={item.value}>
                    {item.text}
                </MenuItem>
            ))}
        </Select>
    );
};
export default ComboBox;
