import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';

export function useMasterPageStyle(): ClassNameMap {
    const useStyle = makeStyles((theme: Theme) =>
        createStyles({
            masterPageNew: {
                width: '100vw',
                height: 'calc(100vh - 40px)',
                marginTop: '40px',
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.background.default,
                '& .MuiPaper-root': {
                    color: 'unset',
                },
                '& .MuiAppBar-colorPrimary': {
                    backgroundColor: theme.palette.background.default,
                },
            },
            content: {
                display: 'flex',
                width: '100%',
                height: '100%',
            },
            left: {
                height: '100%',
                width: '90px',
            },
            right: {
                maxHeight: '920px',
                height: '100%',
                overflow: 'auto',
                margin: '0 auto',
                width: '1920px',
                maxWidth: 'calc(100% - 90px)',
            },
        })
    );
    return useStyle();
}
