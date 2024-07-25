import React, { FC, useState, useEffect } from 'react';
import { Box, ListItemIcon, ListItemText, MenuItem , Checkbox} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { IoMdCheckmark, IoMdSquare } from 'react-icons/io';
import { BiChevronDown } from 'react-icons/bi';
import AppSelectBox from '../Inputs/AppCustomComboBox/AppSelectBox';
import clsx from 'clsx';
import {useAppMultipleDropdownstyle } from './AppMultipleDropdown.style';
interface AppMultipleDropdownProps {
    label?: string;
    options: { name: string; value: string }[];
    className?: string;
    onChange: (value) => void;
    onClose?: () => void;
    name?: string;
}
const AppMultipleDropdown: FC<AppMultipleDropdownProps> = (props) => {
    const style = useAppMultipleDropdownstyle();
    const { t } = useTranslation();

    const { label, options, className, onChange, onClose, name } = props;

    const [selected, setSelected] = useState([]);

    const dataOption = options?.map((item) => {
        return item?.value;
    });

    useEffect(() => {
        setSelected(dataOption);
    }, [options]);

    const isAllSelected = options?.length > 0 && selected?.length === dataOption?.length;

    const handleChange = (name) => (event: any) => {
        const { value } = event.target;
        if (value[value.length - 1] === 'all') {
            onChange(selected.length === options.length ? { [name]: [] } : { [name]: dataOption });
            setSelected(selected.length === options.length ? [] : dataOption);
            return;
        }
        onChange({ [name]: value });
        setSelected(value);
    };

    return (
        <Box>
            {label ? (
                <label className={style.label}>
                    {label} {}
                </label>
            ) : null}
            <Box>
                <AppSelectBox
                    options={options}
                    variant="outlined"
                    className={clsx(style.select, className)}
                    labelId="demo-mutiple-checkbox-label"
                    id="demo-mutiple-checkbox"
                    multiple
                    value={selected}
                    onChange={handleChange(name)}
                    IconComponent={BiChevronDown}
                    onClose={onClose}
                    renderValue={(selected: []) => {
                        return selected
                            .map((obj) => {
                                return options.find((option) => option?.value === obj)?.name;
                            })
                            .join(', ');
                    }}
                >
                    {options.length > 0 && (
                        <MenuItem value="all" className={style.menuItem}>
                            <ListItemIcon>
                                <Box className={style.checkbox}>
                                    <Checkbox
                                        style={{
                                            padding: '0px',
                                        }}
                                        icon={<IoMdSquare className={style.iconItem} size={27} />}
                                        checkedIcon={<IoMdCheckmark className={style.checkIcon} size={21} />}
                                        checked={isAllSelected}
                                        defaultChecked={options?.length > 0}
                                        indeterminate={selected?.length > 0 && selected?.length < options?.length}
                                    />
                                </Box>
                            </ListItemIcon>
                            <ListItemText primary={t('searchForSupplierNew.selectAll')} />
                        </MenuItem>
                    )}
                    {options?.map((item) => (
                        <MenuItem key={item?.value} value={item?.value} className={style.menuItem}>
                            <Box className={style.checkbox}>
                                <Checkbox
                                    style={{
                                        padding: '0px',
                                    }}
                                    icon={<IoMdSquare className={style.iconItem } size={27}/>}
                                    checkedIcon={<IoMdCheckmark className={style.checkIcon} size={21} />}
                                    checked={selected.indexOf(item?.value) > -1}
                                    defaultChecked={options?.length > 0}
                                />
                            </Box>

                            <ListItemText primary={item?.name} />
                        </MenuItem>
                    ))}
                </AppSelectBox>
            </Box>
        </Box>
    );
};
export default AppMultipleDropdown;
