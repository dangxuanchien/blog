import { Typography, Box, Button } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import SwitchDarkMode from '@/components/SwitchDarkMode/SwitchDarkMode';
import Router from 'next/router';
import { useHeaderStyle } from './Header.style';

/**
 * The Props Interfaces
 */

/**
 * The Header component organism
 *
 * @returns Header
 */
const HeaderNew: FC = () => {
    const { t } = useTranslation();
    const style = useHeaderStyle();
    const handleLogout = () => {
        const clearUser = localStorage?.removeItem('accessToken');
        Router.push('/login');
    };

    return (
        <AppBar position="fixed" className={style.customAppBar}>
            <Box className={style.rightHeader}>
                <Typography variant="h6" className={style.headerWebText}>
                    { t('masterPage.title_new') }
                </Typography>
                <Box sx={{display:'flex', alignItems: 'center'}}>
                    <SwitchDarkMode></SwitchDarkMode>
                    <Button className={style.btnLogout} onClick={handleLogout}>{`${ t('masterPage.logout')}`}</Button>
                </Box>
                {/* <CustomUserInfo/> */}
            </Box>
        </AppBar>
    );
};

export default HeaderNew;
