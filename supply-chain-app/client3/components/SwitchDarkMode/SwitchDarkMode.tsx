import { makeStyles, Typography, Box, Theme, createStyles, withStyles } from '@material-ui/core';
import React, { FC, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { cssConstant } from '@/components/CSSConstant/css.constant';
import { ThemContext } from 'context/ThemeContext';
import Switch from '@material-ui/core/Switch';

/**
 * The Props Interfaces
 */

const { textDarkMode } = cssConstant;
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        darkMode: {
            display: 'flex',
            alignItems: 'center',
            zIndex: 1,
            width: '130px',
            float: 'right',
        },
        darkText: {
            color: theme.palette.action.selected,
            ...textDarkMode,
        },
        lightText: {
            color: theme.palette.secondary.main,
            ...textDarkMode,
        },
    })
);

const AntSwitch = withStyles(() =>
    createStyles({
        root: {
            width: 38,
            height: 20,
            padding: '2px 0px',
            display: 'flex',
            margin: '0 3px',
        },
        switchBase: {
            padding: '3px 2px',
            color: 'white',
            '&$checked': {
                color: 'black  ',
                '& + $track': {
                    opacity: 1,
                    backgroundColor: 'var(--white)',
                    border: '1px solid var(--black)',
                },
            },
        },
        thumb: {
            width: 14,
            height: 14,
            boxShadow: 'none',
        },
        track: {
            borderRadius: 8,
            opacity: 1,
            backgroundColor: 'var(--silver-grey)',
            border: '1px solid var(--white)',
        },
        checked: {},
    }),
)(Switch);
/**
 * The Header component organism
 *
 * @returns Header
 */
const SwitchDarkMode: FC = () => {
    const { t } = useTranslation();
    const style = useStyles();
    const { getMode, setMode } = useContext(ThemContext);

    const handleThemeChange = (event) => {
        const currentMode = getMode === 'dark';
        setMode(currentMode ? 'light' : 'dark');
        localStorage.setItem('default-theme', currentMode ? 'light' : 'dark');
    };

    return (
        <Box className={style.darkMode}>
            <Typography className={style.darkText}>{t('masterPage.dark')}</Typography>
            <AntSwitch checked={getMode === 'dark' ? false : true} onChange={handleThemeChange} />
            <Typography className={style.lightText}>{t('masterPage.light')}</Typography>
        </Box>
    );
};

export default SwitchDarkMode;
