import { color, cssConstant } from '@/components/CSSConstant/css.constant';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';

export function useLeftMenuStyle() : ClassNameMap {
    const { icon, button } = cssConstant;
    const { black } = color;

    const useStyle = makeStyles((theme: Theme) =>
        createStyles({
            bodyLeftMenu: {
                display: 'grid',
                alignContent: 'space-between',
                height: '100%',
                backgroundColor: theme.palette.background.default,
                paddingBottom: '8px',
            },
            service: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                padding: '5px',
                boxSizing: 'border-box',
            },
            icon: {
                ...icon,
                marginBottom: '5px',
            },
            btn: {
                ...button,
                padding: '0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '56px',
                textTransform: 'inherit',
                border: `1px solid ${black}`,
                backgroundColor: `${black}`,
                boxShadow: 'none',
            },
            serviceIcon: {
                width: '50px',
                height: '50px',
            },
            iconItem: {
                width: '52px',
                height: '52px',
            },
        })
    );
    return useStyle();
}
