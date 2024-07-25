import React, { useState } from 'react';
import { Box, ListItemIcon, ListItemText, MenuItem } from '@material-ui/core';
import Select, { SelectProps } from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import { useTranslation } from 'react-i18next';
import { IoMdCheckmark, IoMdSquare } from 'react-icons/io';
import { BiChevronDown } from 'react-icons/bi';
import { useDropdownMultipleCheckBoxStyle } from './DropdownMultipleCheckBox.style';

/**
 * The Props Interface
 */
interface DropdownListProps {
    label?: string;
    labelStyle?: React.CSSProperties;
    options: { name: string; value: string }[];
    styles?: React.CSSProperties;
    className?: string;
    comboBoxProps?: SelectProps;
    onChange: (value) => void;
    onClose?: () => void;
    name?: string;
    iconOnly?: boolean;
    selected: string[];
}
//TODO: Refactor MultipleCheckbox Again when prepare release tab 0
const DropdownMultipleCheckBox = ({
    label,
    options,
    labelStyle,
    comboBoxProps,
    className,
    onChange,
    onClose,
    name,
    selected = [],
}: DropdownListProps) => {
    const style = useDropdownMultipleCheckBoxStyle();
    const { t } = useTranslation();
    const [isChange, setIsChange] = useState(false);
    const optionValue = options?.map((item) => {
        return item?.value;
    });

    const isAllSelected = options?.length > 0 && selected?.length === options?.length;
    const isIndeterminate = selected?.length > 0 && selected?.length < options?.length;

    const handleChange = (name) => (event: any) => {
        const { value } = event.target;
        setIsChange(true);
        if (value[value.length - 1] === 'all') {
            onChange(selected.length === options.length ? { [name]: [] } : { [name]: optionValue });
            return;
        }

        onChange({ [name]: value });
    };

    const handleOnClose = () => {
        if (isChange && onClose) {
            onClose();
            setIsChange(false);
        }
    };

    return (
        <Box>
            {label ? (
                <label style={{ ...labelStyle }} className={style.label}>
                    {label} {}
                </label>
            ) : null}
            <Box>
                <Select
                    variant="outlined"
                    className={`${style.select} ${className}`}
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={selected}
                    onChange={handleChange(name)}
                    IconComponent={BiChevronDown}
                    onClose={handleOnClose}
                    classes={{
                        icon: style.selectIcon,
                    }}
                    MenuProps={{
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'left',
                        },
                        getContentAnchorEl: null,
                        className: style.root,
                    }}
                    renderValue={(selected: []) => {
                        return selected
                            .map((obj) => {
                                return options.find((option) => option?.value === obj)?.name;
                            })
                            .join(', ');
                    }}
                    {...comboBoxProps}
                >
                    {options.length > 0 && (
                        <MenuItem value="all" className={`${style.menuItem} ${className}`}>
                            <ListItemIcon>
                                <Box className={style.checkbox}>
                                    <Checkbox
                                        style={{
                                            padding: '0px',
                                        }}
                                        icon={<IoMdSquare className={style.iconItem} size={27} />}
                                        checkedIcon={<IoMdCheckmark className={style.checkIcon} size={21} />}
                                        checked={isAllSelected}
                                        indeterminate={isIndeterminate}
                                    />
                                </Box>
                            </ListItemIcon>
                            <ListItemText primary={t('searchForSupplierNew.selectAll')} />
                        </MenuItem>
                    )}
                    {options?.map((item) => (
                        <MenuItem key={item?.value} value={item?.value} className={`${style.menuItem} ${className}`}>
                            <Box className={style.checkbox}>
                                <Checkbox
                                    style={{
                                        padding: '0px',
                                    }}
                                    icon={<IoMdSquare className={style.iconItem} size={27} />}
                                    checkedIcon={<IoMdCheckmark className={style.checkIcon} size={21} />}
                                    checked={selected.indexOf(item?.value) > -1}
                                />
                            </Box>

                            <ListItemText primary={item?.name} />
                        </MenuItem>
                    ))}
                </Select>
            </Box>
        </Box>
    );
};
export default DropdownMultipleCheckBox;
