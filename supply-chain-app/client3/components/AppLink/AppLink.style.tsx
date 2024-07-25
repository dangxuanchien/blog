import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import { useContext } from 'react';
import { ThemContext } from 'context/ThemeContext';
export function useAppLinkStyle(): ClassNameMap {
    const { getMode } = useContext(ThemContext);
    const useStyle = makeStyles((theme: Theme) =>
        createStyles({
            customLink: {
                '&.MuiListItem-root': {
                    height: '80px',
                    padding: '2px 0px',
                    border: `1px solid ${theme.palette.primary.main}`,
                    backgroundColor: theme.palette.primary.light,
                    opacity: getMode === 'light' ? 1 : 0.4,
                    flexDirection: 'column',
                    justifyContent: 'center',
                },
            },
            customLinkContainer: {
                margin: '6px',
            },
            active: {
                borderLeft: `5px solid ${theme.palette.text.primary}`,
                backgroundColor: theme.palette.primary.light,
                '& .MuiListItem-root': {
                    opacity: 1,
                },
            },
        })
    );

    return useStyle();
}
