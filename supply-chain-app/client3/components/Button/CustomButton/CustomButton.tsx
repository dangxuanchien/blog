import { Button, createStyles, makeStyles, Theme } from '@material-ui/core';
import { FC } from 'react';

/**
 * The Props Interface
 */
interface CustomButtonProps {
    label: string;
    buttonProps?: Object;
    className?: Object;
    isActiveButton?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            color: 'white',
            fontWeight: 'bold',
            height: '2.5rem',
            width: '8.7rem',
            borderRadius: '10px',
            backgroundColor: `${theme.palette.divider} !important`,
            '&:hover': {
                backgroundColor: '#2E75B6',
            },
        },
    })
);

const ButtonCustom: FC<CustomButtonProps> = (props) => {
    const { label, buttonProps, className, isActiveButton } = props;
    const style = useStyles();

    return (
        <Button
            variant="contained"
            className={`${style.button} + ${className}`}
            {...buttonProps}
            disabled={isActiveButton}
        >
            {label}
        </Button>
    );
};
export default ButtonCustom;
