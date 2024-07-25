import { ThemContext } from '@/context/ThemeContext';
import { Typography, Box } from '@material-ui/core';
import React, { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { CustomSwitch, useAppSwitchThemeStyles } from './AppSwitchThemeMode.style';

interface SwitchThemeMode {
    onChange: () => void;
}
const AppSwitchThemeMode: FC<SwitchThemeMode> = (props) => {
    const { t } = useTranslation();
    const classes = useAppSwitchThemeStyles();
    const { onChange } = props;
    const { getMode } = useContext(ThemContext);
    return (
        <Box className={classes.darkMode}>
            <Typography className={classes.darkText}>{t('masterPage.dark')}</Typography>
            <CustomSwitch checked={getMode === 'dark' ? false : true} onChange={onChange} />
            <Typography className={classes.lightText}>{t('masterPage.light')}</Typography>
        </Box>
    );
};

export default AppSwitchThemeMode;
