import MasterPage from 'layouts/MasterPage/MasterPage';
import { usePromiseTracker } from 'react-promise-tracker';
import App from 'next/app';
import React, { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import store from '../redux/store';
import i18n from '../translation/i18n';
import './_app.scss';
import { ThemContext } from 'context/ThemeContext';
import { StylesProvider, ThemeProvider } from '@material-ui/core';
import PublicPageRouter from 'router/PublicRouter';
import ProtectedRouter from 'router/ProtectedRouter';
import Loading from '@/components/Loading/Loading';
import { DARK_THEME, LIGHT_THEME } from '../config/theme';
import { SearchForSupplierTabProvider } from '@/context/searchForSupplier/useSearchForSupplierContext';

type AppProps = {
    Component: any;
    pageProps: any;
    router: any;
};
enum Mode {
    DARK = 'dark',
    LIGHT = 'light',
}
//TODO: Refactor this
const MyApp = ({ Component, pageProps, router }: AppProps) => {
    const [mode, setMode] = useState(Mode.DARK);

    useEffect(() => {
        if (localStorage) {
            setMode((localStorage.getItem('default-theme') as Mode) || Mode.DARK);
        }
    }, []);

    const theme = mode === Mode.LIGHT ? LIGHT_THEME : DARK_THEME;
    const renderMainPage = () => {
        if (['/login', '/_error'].includes(router.pathname)) {
            return (
                <Provider store={store}>
                    <ThemContext.Provider
                        value={{
                            getMode: mode,
                            setMode: (value: string) => setMode(value as Mode),
                        }}
                    >
                        <ThemeProvider theme={theme}>
                            <I18nextProvider i18n={i18n}>
                                <PublicPageRouter>
                                    <React.Fragment>
                                        <Loading />
                                        <Component {...pageProps} />
                                    </React.Fragment>
                                </PublicPageRouter>
                            </I18nextProvider>
                        </ThemeProvider>
                    </ThemContext.Provider>
                </Provider>
            );
        }
        return (
            <Provider store={store}>
                <ThemContext.Provider
                    value={{
                        getMode: mode,
                        setMode: (value: string) => setMode(value as Mode),
                    }}
                >
                    <ThemeProvider theme={theme}>
                        <I18nextProvider i18n={i18n}>
                            <ProtectedRouter>
                                <StylesProvider>
                                    <Loading />
                                    <MasterPage>
                                        <SearchForSupplierTabProvider>
                                            <Component {...pageProps} />
                                        </SearchForSupplierTabProvider>
                                    </MasterPage>
                                </StylesProvider>
                            </ProtectedRouter>
                        </I18nextProvider>
                    </ThemeProvider>
                </ThemContext.Provider>
            </Provider>
        );
    };
    return renderMainPage();
};

MyApp.getInitialProps = async (appContext: any) => {
    const pageProps = await App.getInitialProps(appContext);
    return { ...pageProps };
};
export default MyApp;
