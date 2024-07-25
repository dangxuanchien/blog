import { Checkbox as MuiCheckbox, CheckboxProps as MuiCheckboxProps, makeStyles } from '@material-ui/core';
import React, { forwardRef } from 'react';
import { IoMdCheckbox, IoMdSquare } from 'react-icons/io';
interface CheckBoxProps extends MuiCheckboxProps {
    /** Function handle on clickSelect */
    onChecked?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    /** is */
    isChecked?: boolean;
    inputProps?: { [index: string]: string };
}

export const useStyles = makeStyles(() => ({
    icon: {
        color: '#585B62',
    },
    iconCheck: {
        color: '#585B62',
        zIndex: 1,
    },
}));
const AppCheckbox: React.FC<CheckBoxProps> = forwardRef((props) => {
    const classes = useStyles();
    const { ref, onChecked, isChecked, inputProps, icon, checkedIcon, ...defaultProps } = props;

    return (
        <MuiCheckbox
            ref={ref}
            onChange={(e) => onChecked(e)}
            checked={isChecked}
            icon={icon ?? <IoMdSquare className={classes.icon} size={27} />}
            checkedIcon={checkedIcon ?? <IoMdCheckbox className={classes.iconCheck} size={27} />}
            inputProps={inputProps}
            style={{
                padding: '0px',
            }}
            {...defaultProps}
        />
    );
});

export default AppCheckbox;
