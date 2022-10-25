import classNames from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { USER_LANG } from '../../constants';
import Button from '../button';
import gs from './../../styles/global.module.css';

const LangSwitcher = ({ className }) => {
    const { i18n } = useTranslation();
    const currentLang = i18n.language;
    const changeLanguageHandler = (lang) => {
        const languageValue = lang;
        i18n.changeLanguage(languageValue);
        localStorage.setItem(USER_LANG, JSON.stringify(lang));
    };
    return (
        <div className={classNames(gs.flexWrapperRowCenter, className)}>
            <Button
                size="sm"
                puched={currentLang === 'en'}
                onClick={() => changeLanguageHandler('en')}
                tabIndex={1}
            >
                EN
            </Button>
            <Button
                tabIndex={2}
                size="sm"
                puched={currentLang === 'ua'}
                onClick={() => changeLanguageHandler('ua')}
            >
                УКР
            </Button>
        </div>
    );
};

export default LangSwitcher;
