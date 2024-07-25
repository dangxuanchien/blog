import { Box, Checkbox as CheckboxMD, CheckboxProps, makeStyles } from '@material-ui/core';
import { forwardRef } from 'react';
import { IoMdCheckbox, IoMdSquare } from 'react-icons/io';

export const useStyles = makeStyles(() => ({
    checkBox: {
        '& input': {
            zIndex: 2,
        },
    },
    icon: {
        color: '#585B62',
    },
    iconCheck: {
        color: '#585B62',
        zIndex: 1,
    },
    overlayIcon: {
        backgroundColor: 'white',
        position: 'absolute',
        width: 18,
        height: 18,
    },
}));

const Checkbox: React.FC<CheckboxProps> = forwardRef((props, ref) => {
    const styles = useStyles();
    return (
        <CheckboxMD
            ref={ref}
            className={styles.checkBox}
            icon={<IoMdSquare className={styles.icon} size={27} />}
            checkedIcon={
                <>
                    <IoMdCheckbox className={styles.iconCheck} size={27} />
                    <Box className={styles.overlayIcon} />
                </>
            }
            inputProps={{ 'aria-label': 'controlled' }}
            {...props}
        />
    );
});

export default Checkbox;
