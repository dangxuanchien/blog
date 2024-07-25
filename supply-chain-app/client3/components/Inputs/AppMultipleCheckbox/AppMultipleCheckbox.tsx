import { color } from '@/components/CSSConstant/css.constant';
import { Option } from '@/types';
import { getValuesFromOptions } from '@/utils/options';
import {
    Box,
    ClickAwayListener,
    FormControlLabel,
    IconButton,
    MenuItem,
    MenuList,
    Paper,
    Popper,
    PopperProps,
} from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import _isEqual from 'lodash/isEqual';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Checkbox from '../CheckBox/CheckboxSetting';
import { useAppMultipleCheckboxStyles } from './AppMultipleCheckbox.style';
const { white, yellow } = color;

export type ValuesChecked = Option['value'][];
interface AppMultipleCheckBoxProps {
    id?: string;
    initialValue?: ValuesChecked;
    options?: Option[];
    onChange?: (values: ValuesChecked, e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
    onBlur: (values: ValuesChecked, e: React.MouseEvent<Document, MouseEvent>) => void;
    isVisibleCheckAll?: boolean;
    wrapperClassName?: string;
    open?: boolean;
}

type Props = Omit<PopperProps, 'children' | 'open' | 'onBlur'> & AppMultipleCheckBoxProps;
const AppMultipleCheckBox: React.FC<Props> = (props) => {
    const {
        options = [],
        isVisibleCheckAll = true,
        onChange,
        initialValue,
        id = 'multiple-checkedBox',
        open,
        onBlur,
        wrapperClassName,
        ...paperProps
    } = props;
    const { t } = useTranslation();
    const classes = useAppMultipleCheckboxStyles();

    //**states
    const [isVisible, setIsVisible] = useState(open);
    const [valuesChecked, setValuesChecked] = useState(initialValue || []);
    // **refs
    const anchorRef = useRef<HTMLButtonElement>(null);

    const ALL_VALUE = 'all';
    const optionValues = getValuesFromOptions(options);
    const hasCheckedAll = _isEqual([...valuesChecked].sort(), [...optionValues].sort());

    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab' || event.key === 'Escape') {
            event.preventDefault();
            setIsVisible(false);
        }
    }

    const onToggleClick = () => setIsVisible(!isVisible);

    const handleClickCheckbox = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, value: Option['value']) => {
        e.preventDefault();
        let newValuesChecked = [];
        if (value === ALL_VALUE) {
            newValuesChecked = hasCheckedAll ? [] : optionValues;
        } else {
            const isValueExisted = valuesChecked.includes(value);
            // ** Case unchecked item
            if (isValueExisted) {
                newValuesChecked = valuesChecked.filter((currentValue) => !(currentValue === value));
            } else {
                newValuesChecked = [...valuesChecked, value];
            }
        }
        setValuesChecked(newValuesChecked);
        onChange && onChange(newValuesChecked, e);
    };

    return (
        <Box className={wrapperClassName}>
            <IconButton
                ref={anchorRef}
                id={id}
                aria-describedby={id}
                aria-controls={id}
                aria-expanded={true}
                aria-haspopup="true"
                size="small"
                onClick={onToggleClick}
            >
                {isVisible ? <ExpandLessIcon style={{ color: yellow }} /> : <ExpandMoreIcon style={{ color: white }} />}
            </IconButton>
            <Popper
                style={{ zIndex: 3 }}
                open={Boolean(isVisible)}
                anchorEl={anchorRef.current}
                placement="bottom-start"
                role={undefined}
                {...paperProps}
            >
                <Paper className={classes.wrapper}>
                    {options.length > 0 && (
                        <ClickAwayListener onClickAway={(e) => onBlur(valuesChecked, e)}>
                            <MenuList
                                style={{ maxHeight: 350, overflow: 'auto' }}
                                autoFocusItem={open}
                                id={id}
                                aria-labelledby={id}
                                onKeyDown={handleListKeyDown}
                            >
                                {isVisibleCheckAll && (
                                    <MenuItem
                                        className={classes.menuItem}
                                        onClick={(e) => handleClickCheckbox(e, ALL_VALUE)}
                                    >
                                        <FormControlLabel
                                            label={t('searchForSupplierNew.selectAll')}
                                            control={<Checkbox checked={hasCheckedAll} />}
                                        />
                                    </MenuItem>
                                )}

                                {options.map((option) => (
                                    <MenuItem
                                        className={classes.menuItem}
                                        key={option.value}
                                        onClick={(e) => handleClickCheckbox(e, option.value)}
                                    >
                                        <FormControlLabel
                                            label={option.name}
                                            control={
                                                <Checkbox
                                                    checked={valuesChecked.some((item) => item === option.value)}
                                                />
                                            }
                                        />
                                    </MenuItem>
                                ))}
                            </MenuList>
                        </ClickAwayListener>
                    )}
                </Paper>
            </Popper>
        </Box>
    );
};

export default React.memo(AppMultipleCheckBox);
