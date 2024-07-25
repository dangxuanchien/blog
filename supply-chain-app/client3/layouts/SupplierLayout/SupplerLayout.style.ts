import { color } from '@/components/CSSConstant/css.constant';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';

export default function useSupplierLayoutStyles(): ClassNameMap {
    const { white } = color;
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            wrapper: {
                width: '100%',
                minWidth: '1000px',
                height: 'calc(100% - 6px)',
                marginTop: '6px',
                flexWrap: 'nowrap',
            },
            tabs: {
                marginBottom: '-5px',
                height: '100%',
                ['& .MuiTabScrollButton-root']: {
                    width: '15px',
                },
                ['& .PrivateTabIndicator-colorPrimary-45']: {
                    backgroundColor: 'transparent',
                },
            },
            tab: {
                marginLeft: '10px',
                padding: 0,
                borderRadius: '5px',
                border: `0px solid ${theme.palette.primary.main}`,
                minWidth: '60px',
                backgroundColor: theme.palette.secondary.light,

                ['& .PrivateTabIndicator-root-47 ']: {
                    backgroundColor: 'black !important',
                },
                ['& .MuiTab-wrapper']: {
                    width: '100%',
                    display: 'inline-flex',
                    alignItems: 'flex-start',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderBottom: `1px solid ${theme.palette.secondary.dark}`,
                    backgroundColor: theme.palette.primary.dark,
                    marginBottom: 'auto',
                    color: white,
                    padding: 2,
                },
            },
            labelSubMenu: {
                width: '23%',
                display: 'flex',
                justifyContent: 'center',
                marginTop: '15px',
                ['@media (max-width:1400px)']: {
                    marginTop: '10px',
                },
            },
            left: {
                height: '100%',
                width: '505px',
                minWidth: '505px',
                boxSizing: 'border-box',
                minHeight: '400px',
                overflow: 'auto',
                ['@media (max-width:1400px)']: {
                    marginTop: '0px',
                },
            },
            subMenuTop: {
                height: '60px',
            },
            subMenuBottom: {
                height: 'calc(100% - 60px)',
                '& > .MuiBox-root': {
                    height: '100%',
                    overflow: 'auto',
                },
            },
            right: {
                // flex: 1, //TODO: why flex = 1?
                width: 'calc(100% - 420px)',
                minWidth: '720px',
                paddingRight: '12px',
                height: '100%',
                overflow: 'auto',
                '& > .MuiBox-root': {
                    height: '100%',
                },
            },
            searchIcon: {
                margin: 'auto',
                padding: '0 6px',
                height: '28px',
                width: 'auto',
            },

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
    return useStyles();
}
