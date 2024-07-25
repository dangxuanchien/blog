import { Box, createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
import { FC } from 'react';

interface SearchMenuBar {
    children?: any;
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        containerColumnForm: {
            display: 'block',
            backgroundColor: theme.palette.primary.light,
            margin: '0px 10px',
            height: '100%',
            width: 'calc(100% - 20px)',
            paddingLeft: '10px',
            borderRadius: '0px 10px 10px 10px',
            border: `1px solid ${theme.palette.primary.main}`,
            overflow: 'auto',
        },
    })
);
const SearchMenuBar: FC<SearchMenuBar> = ({ children }) => {
    const style = useStyles();
    return (
        <Box className={style.containerColumnForm}>
            <>{children}</>
        </Box>
    );
};

export default SearchMenuBar;
