import { Box, makeStyles } from '@material-ui/core';
import { FC } from 'react';

interface ProgressBarProps {
    /**value of progress bar */
    value?: number;
    /**style containe progress bar */
    containerProgressBar?: React.CSSProperties;
    /**style progress bar */
    progressBar?: React.CSSProperties;
}

//width: `${props.value}%`,
const ProgressBar: FC<ProgressBarProps> = (props) => {
    const useStyles = makeStyles(() => ({
        boxContainer: {
            width: '100%',
            height: '100%',
            background: 'white',
            border: '1px solid #8eb4e3',
            boxSizing: 'border-box',
        },
        progressBar: {
            background: '#8eb4e3',
            border: '2px solid white',
            width: `${props.value}%`,
            height: '100%',
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center',
            color: '#254061',
            fontWeight: 'bold',
        },
        textPercent: {
            marginLeft: '5px',
        },
    }));
    const style = useStyles();
    return (
        <Box className={style.boxContainer} style={{ ...props.containerProgressBar }}>
            <Box className={style.progressBar} style={{ ...props.progressBar }}>
                <Box className={style.textPercent}> {props.value}%</Box>
            </Box>
        </Box>
    );
};
export default ProgressBar;
