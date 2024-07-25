import AppButton from '@/components/Button/AppButton/AppButton';
import { color } from '@/components/CSSConstant/css.constant';
import SwitchDarkMode from '@/components/SwitchDarkMode/SwitchDarkMode';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { loginThunk } from '@/redux/auth/dispatcher';
import { UserState } from '@/redux/auth/type';
import { Box, TextField } from '@material-ui/core';
import { useRouter } from 'next/router';
import { FormEventHandler, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useLoginFormStyle from './Login.style';

/**
 * The Props Interface
 */

const LoginForm = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const router = useRouter();

    const [errMsg, setErrMsg] = useState('');
    const [loginInfo, setLoginInfo] = useState({
        loginId: '',
        password: '',
    });
    const classes = useLoginFormStyle();

    const onChangeInput = (key: keyof typeof loginInfo, value: string) => {
        setLoginInfo((loginInfo) => ({
            ...loginInfo,
            [key]: value,
        }));
    };

    const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        dispatch(loginThunk(loginInfo))
            .unwrap()
            .then((res: UserState) => {
                router.push('/refactor');
            })
            .catch((err) => {
                setErrMsg(t('login.passwordOrLoginIdWrong'));
            });
    };

    return (
        <div>
            <Box className={classes.mainLogin}>
                <Box className={classes.rightHeader}>
                    <SwitchDarkMode></SwitchDarkMode>
                </Box>

                <Box className={classes.mainLogin__header}>
                    <Box className={classes.header__text}>
                        <h1>{t('login.newLoginTitle')}</h1>
                    </Box>
                    <Box className={classes.text}>
                        <h2>Powered by Hitachi</h2>
                    </Box>
                </Box>

                <form onSubmit={onSubmit}>
                    <Box className={classes.mainLogin__formLogin}>
                        {errMsg && (
                            <p style={{ color: `${color.yellow}`, zIndex: 9, margin: ' 0 0 0px 25px' }}>{errMsg}</p>
                        )}
                        <Box className={classes.formLogin__input}>
                            <p>Login ID</p>
                            <TextField
                                value={loginInfo.loginId}
                                required
                                onChange={(e) => onChangeInput('loginId', e.target.value)}
                                variant="outlined"
                                size="small"
                                className={classes.input}
                            />
                        </Box>

                        <Box className={classes.formLogin__input}>
                            <p>Password</p>
                            <TextField
                                value={loginInfo.password}
                                required
                                type="password"
                                onChange={(e) => onChangeInput('password', e.target.value)}
                                variant="outlined"
                                size="small"
                                className={classes.input}
                            />
                        </Box>

                        <Box className={classes.formLogin__button}>
                            <AppButton variant="contained" type="submit" className={classes.btn}>
                                {t('login.signIn')}
                            </AppButton>
                        </Box>
                    </Box>
                </form>
            </Box>
            <Box className={classes.overlay}></Box>
        </div>
    );
};
export default LoginForm;
