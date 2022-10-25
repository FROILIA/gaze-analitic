import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { USER_LANG } from './constants';

// Importing translation files

import translationEN from './locales/en.json';
import translationUA from './locales/ua.json';

//Creating object with the variables of imported translation files
const resources = {
    en: {
        translation: translationEN,
    },
    ua: {
        translation: translationUA,
    },
};
const savedLang = JSON.parse(localStorage.getItem(USER_LANG));

//i18N Initialization

i18n.use(initReactI18next).init({
    resources,
    lng: savedLang || 'ua', //default language
    keySeparator: false,
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
