import React, { FC } from 'react';
import { TextField as MaterialInput, TextFieldProps } from '@material-ui/core';
import { useAppInput } from './AppInput.style';

const AppTextField: FC<TextFieldProps> = (props: TextFieldProps) => {
    const classes = useAppInput();
    const { label, className, ...textFieldProps } = props;

    return (
        <>
            <label className={classes.label}>{label}</label>
            <MaterialInput variant="outlined" className={`${classes.textField} + ${className}`} {...textFieldProps} />
        </>
    );
};

export default AppTextField;
