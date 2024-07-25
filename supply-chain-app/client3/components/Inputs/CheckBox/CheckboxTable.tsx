import IconCheckBox from '@/assets/icons/IconCheckBox.svg';
import IconUnCheckBox from '@/assets/icons/IconUnCheckBox.svg';
import { Box, Checkbox, createStyles, makeStyles, CheckboxProps as MuiCheckboxProps } from '@material-ui/core';
import { FC, forwardRef } from 'react';

interface CheckBoxProps extends MuiCheckboxProps {
    /** Function handle on clickSelect */
    dataChecked?: any;
}

const useStyles = makeStyles(() =>
    createStyles({
        checkBox: {
            margin: '5px 10px',
            color: 'black',
            borderRadius: '4px',
        },
        iconItem: {
            width: '21px',
            height: '21px',
        },
    })
);
const CheckBoxComponent: FC<CheckBoxProps> = forwardRef((props, ref) => {
    const classes = useStyles();
    return (
        <Box className={classes.checkBox}>
            <Checkbox
                ref={ref}
                style={{
                    padding: '0px',
                }}
                icon={<IconUnCheckBox className={classes.iconItem} />}
                checkedIcon={<IconCheckBox className={classes.iconItem} />}
                {...props}
            />
        </Box>
    );
});

export default CheckBoxComponent;
