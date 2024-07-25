import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationJP from './locales/jp/translation.json';

// the translations
const resources = {
    jp: {
        translation: translationJP,
    },
};

i18n.use(initReactI18next).init({
    resources,
    fallbackLng: 'jp',
    debug: false,
    interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
    },
});

export default i18n;
