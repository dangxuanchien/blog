import { MenuItem, Select, SelectProps } from '@material-ui/core';
import clsx from 'clsx';
import { FC } from 'react';
import { appCustomComboBoxStyle } from './AppSelectBox.style';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
/**
 * The Props Interface
 */
export interface ISelectOption {
    value: string | number;
    name: string;
}

interface SelectBoxProps extends SelectProps {
    options: ISelectOption[];
    className?: string;
    label?: string;
}

const AppSelectBox: FC<SelectBoxProps> = (props) => {
    const style = appCustomComboBoxStyle();

    const { children, label, className, options, classes, ...rest } = props;
    return (
        <div>
            <label className={style.label}>{label}</label>
            <Select
                className={clsx(style.select, className)}
                classes={{
                    icon: style.selectIcon,
                    ...classes,
                }}
                IconComponent={ExpandMoreIcon}
                variant="outlined"
                MenuProps={{
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                    },
                    getContentAnchorEl: null,
                    className: style.root,
                }}
                {...rest}
            >
                {!children
                    ? options.map((option) => (
                        <MenuItem key={option.value} value={option.value} className={style.menuItem}>
                            {option.name}
                        </MenuItem>
                    ))
                    : children}
            </Select>
        </div>
    );
};
export default AppSelectBox;
