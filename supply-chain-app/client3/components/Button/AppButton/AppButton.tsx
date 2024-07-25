import { ButtonProps, Button as MuiButton } from '@material-ui/core';
import clsx from 'clsx';
import { FC, forwardRef } from 'react';

import appMemo from '@/utils/appMemo';
import useButtonStyles from './AppButton.style';

interface AppButtonProps extends ButtonProps {
    width?: number;
    height?: number;
    isActive?: boolean;
}

const AppButton: FC<AppButtonProps> = forwardRef(({ children = null, className, color, isActive, ...rest }, ref) => {
    const classes = useButtonStyles();

    const btnClassName = clsx(
        classes.button,
        classes[`button--${color}`],
        {
            [classes['button--active']]: isActive,
        },
        className
    );
    return (
        <MuiButton ref={ref} variant="contained" className={btnClassName} {...rest}>
            {children}
        </MuiButton>
    );
});

export default appMemo(AppButton);
