import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';
import cookies from 'cookie';
import { IncomingMessage } from 'http';


/**
* Get token from session
* @param req {IncomingMessage} get request from server
*/
const parseCookies = (req?: IncomingMessage) => {
    !req || !req.headers ? {} : cookies.parse(req.headers.cookie || '');
};

class MyDocument extends Document {

    static async getInitialProps(ctx) {
        const sheets = new ServerStyleSheets();
        const originalRenderPage = ctx.renderPage;

        ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
            });

        const initialProps = await Document.getInitialProps(ctx);
        return {
            ...initialProps,
            // Styles fragment is rendered after the app and page rendering finish.
            styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
            //Get session id from cookie
            cookies: parseCookies(ctx?.req),
        };
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                    <link rel="icon" href="static/icon_1x1.png" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
