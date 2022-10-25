import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SigninForm from '../../components/signinForm';
import { PATH_INSTRUCTIONS_PAGE, SAVED_USER_KEY, SAVED_USER_NAME } from '../../constants';
import gs from './../../styles/global.module.css';
import s from './welcomePage.module.css';
import { useTranslation } from 'react-i18next';
import LangSwitcher from '../../components/langSwitcher';
import Button from '../../components/button';
import Scrollbar from '../../components/scrollbar';
import Modal from '../../components/modal';

const WelcomePage = () => {
    const savedName = JSON.parse(localStorage.getItem(SAVED_USER_NAME));
    const savedKey = JSON.parse(localStorage.getItem(SAVED_USER_KEY));
    const [isShowing, toggle] = useState(false);
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        if (savedName && savedKey) {
            navigate(PATH_INSTRUCTIONS_PAGE, { replace: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [savedName, savedKey]);
    const tacContent = (
        <div>
            <p>{t('toc-body-p1')}</p>
            <p>{t('toc-body-p2')}</p>
            <p>
                <a target="_blank" rel="noreferrer" href="https://webgazer.cs.brown.edu/">
                    {t('toc-lib-web-link')}
                </a>
            </p>
            <p>
                <a target="_blank" rel="noreferrer" href="https://github.com/brownhci/WebGazer">
                    {t('toc-lib-git-link')}
                </a>
            </p>
            <p>
                <a target="_blank" rel="noreferrer" href="github.com">
                    {t('toc-project-link')}
                </a>
            </p>
        </div>
    );
    return (
        <>
            <div className={gs.flexFullScreenCenterCenter}>
                <div className={classNames(gs.box, s.box)}>
                    <div className={s.header}>
                        <h1>{t('welcome-header')}✨</h1>
                        <LangSwitcher className={s.lang} />
                    </div>
                    <Scrollbar>
                        <p>{t('welcome-body-p1')}</p>
                        <p>
                            {t('welcome-body-p2')}
                            <Button onClick={() => toggle(true)} type="link">
                                {t('welcome-body-btn-label')}
                            </Button>
                            .
                        </p>
                    </Scrollbar>
                    <SigninForm nextPath={PATH_INSTRUCTIONS_PAGE} className={s.form} />
                </div>
            </div>
            <Modal
                header={t('toc-lib-header')}
                bodyContent={tacContent}
                isShowing={isShowing}
                hide={toggle}
                action={() => {}}
                buttonLabel={t('ok-label')}
            />
        </>
    );
};

export default WelcomePage;
