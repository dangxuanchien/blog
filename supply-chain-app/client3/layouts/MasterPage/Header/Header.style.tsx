import { cssConstant, color } from '@/components/CSSConstant/css.constant';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';

export function useHeaderStyle() :ClassNameMap{
    const { font, button } = cssConstant;
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            headerWebText: {
                '&.MuiTypography-root': {
                    fontFamily: 'Segoe_UI',
                    color: theme.palette.text.primary,
                    fontWeight: 'bold',
                    fontSize: font.fontTitle,
                },
            },
            customAppBar: {
                height: '40px',
                borderBottom: '1px solid var(--black)',
            },
            rightHeader: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexBasis: 'auto',
                backgroundColor: theme.palette.secondary.contrastText,
                padding: '0 5px',
            },
            topInfoHeader: {
                height: '21px',
            },
            btnLogout: {
                ...button,
                width: 'unset',
                height: '20px',
                border: `1px solid ${color.white}`,
                borderRadius: '4px',
                margin: '0 3px',
                fontWeight: 500,
            },
        })
    );
    return useStyles();
}
