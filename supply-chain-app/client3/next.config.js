const path = require('path');
require('dotenv').config({
    path: path.resolve(__dirname, `.env.${process.env.NODE_ENV}`),
});

module.exports = {
    assetPrefix: process.env.BASE_PATH,
    basePath: process.env.BASE_PATH,
    eslint: {
        ignoreDuringBuilds: true,
    },

    //TODO: REMOVE WHEN REFACTOR FINISHED
    typescript: {
        ignoreBuildErrors: true,
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        return config;
    },
    publicRuntimeConfig: {
        redirectPage: process.env.REDIRECT_PAGE,
    },
};
