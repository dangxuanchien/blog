import React, { FC, useEffect } from 'react';
import { TbSettings } from 'react-icons/tb';
import { Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Portal from '@material-ui/core/Portal';
import { useTranslation } from 'react-i18next';
import styles from './CustomUserInfoPopup.module.scss';
import { getUserDataFromStorage } from './../../../utils/user.util';

interface CustomUserInfoProps {}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        dropdown: {
            position: 'fixed',
            width: 300,
            height: 290,
            top: '12rem',
            right: '-9rem',
            transform: 'translate(-50%, -50%)',
            border: '1px solid rgba(0,0,0,0.1)',
            // padding: '0px 8px 0px 0px',
            backgroundColor: theme.palette.background.paper,
            boxShadow: '2px 2px rgba(191, 191, 191,0.1)',
            zIndex: 99999,
        },
        userInfoText: {
            paddingLeft: '8px',
            paddingTop: '8px',
            color: '#022954',
            fontSize: '1.1rem',
            fontWeight: 'bold',
        },
        settingIcon: {
            color: '#fff',
            marginRight: '10px',
            fontSize: '28px',
        },
    })
);

/**
 * The Custom Link component atom
 *
 * @component
 * @param {CustomUserInfoProps} props Props of component
 * @returns Link
 * @author Tung Pham Nhat <tung.pham@hitachivantara.com>
 */
const CustomUserInfo: FC<CustomUserInfoProps> = (props) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const [open, setOpen] = React.useState(false);
    const [userInfo, setUserInfor] = React.useState({});

    // get user info from storage
    useEffect(() => {
        const userData = getUserDataFromStorage();
        setUserInfor(userData);
    }, []);

    const handleClick = () => {
        setOpen((prev) => !prev);
    };

    const handleClickAway = () => {
        setOpen(false);
    };

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div>
                <TbSettings onClick={handleClick} className={classes.settingIcon} />
                {open ? (
                    <Portal>
                        <div className={`${classes.dropdown} ${styles.dropdown}`}>
                            <Typography variant="h3" className={classes.userInfoText}>
                                {t('userpopup.accountInfo')}
                            </Typography>
                            <div className={styles.userProfile}>
                                <span className={styles.wrapper}>
                                    <img
                                        className={styles.img}
                                        alt="avatar"
                                        src="data:image/jpeg;base64,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"
                                    />
                                    <div className={styles.userInfoNormalText}>
                                        <div>
                                            {t('userpopup.id')} ：{userInfo ? userInfo['userID'] : ''}
                                        </div>
                                        <div>
                                            {t('userpopup.accountName')} ：{userInfo ? userInfo['accountName'] : ''}
                                        </div>
                                        <div>
                                            {t('userpopup.authority')} : {userInfo ? userInfo['authority'] : ''}
                                        </div>
                                    </div>
                                </span>
                            </div>
                            <div className={styles.userInforLine}></div>
                            <div className={styles.userProfile}>
                                <div>
                                    <Typography variant="h3" className={styles.userInfoBoldText}>
                                        {t('userpopup.langSetting')}
                                    </Typography>
                                    <div className={styles.userInfoLangue}>
                                        <div
                                            className={
                                                userInfo && userInfo['lang'] === 'EN'
                                                    ? styles.userInfoBoldText
                                                    : styles.userInfoDisbleText
                                            }
                                        >
                                            {t('userpopup.langEN')}
                                        </div>
                                        <div
                                            className={
                                                userInfo && userInfo['lang'] === 'CH'
                                                    ? styles.userInfoBoldText
                                                    : styles.userInfoDisbleText
                                            }
                                        >
                                            {t('userpopup.langCH')}
                                        </div>
                                        <div
                                            className={
                                                userInfo && userInfo['lang'] === 'JA'
                                                    ? styles.userInfoBoldText
                                                    : styles.userInfoDisbleText
                                            }
                                        >
                                            {t('userpopup.langJA')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.userInforLine}></div>
                            <Typography variant="h3" className={classes.userInfoText}>
                                {t('userpopup.helpDocumentation')}
                            </Typography>
                        </div>
                    </Portal>
                ) : null}
            </div>
        </ClickAwayListener>
    );
};

export default CustomUserInfo;
