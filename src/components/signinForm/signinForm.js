/* eslint-disable jsx-a11y/anchor-is-valid */
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../button';
import { SAVED_USER_KEY, SAVED_USER_NAME } from '../../constants';
import { createUser } from '../../firebase/api';
// import gs from './../../styles/global.module.css';
import s from './signinForm.module.css';
import Checkbox from '../checkbox/checkbox';
import useModal from '../../hooks/useModal';
import Modal from '../modal';
import { useTranslation } from 'react-i18next';

const SignInForm = ({ className, nextPath }) => {
    const [name, setName] = useState('');
    const [isValid, setValid] = useState(false);
    const [isAccepted, setIsAccepted] = useState(false);
    const [isNameBlured, setNameIsBlured] = useState(false);
    const [isTacBlured, setTacIsBlured] = useState(false);

    const { isShowing, toggle } = useModal();
    const { t } = useTranslation();

    const [error, setError] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (isNameBlured) handleValidationName();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name, isNameBlured]);

    useEffect(() => {
        if (isTacBlured) handleValidationTac();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAccepted, isTacBlured]);

    const handleValidationName = () => {
        setError((prev) => ({ ...prev, name: null }));
        let nameError = null;
        let formIsValid = true;
        setValid(formIsValid);
        if (name.length < 3) {
            nameError = t('signin-error-short');
            formIsValid = false;
        }
        if (name.length > 20) {
            nameError = t('signin-error-long');
            formIsValid = false;
        }
        setError((prev) => ({ ...prev, name: nameError }));
        setValid(formIsValid);
        return formIsValid;
    };

    const handleValidationTac = () => {
        setError((prev) => ({ ...prev, tac: null }));
        let tocError = null;
        let formIsValid = true;
        setValid(formIsValid);
        if (!isAccepted) {
            tocError = t('signin-error-toc');
            formIsValid = false;
        }
        setError((prev) => ({ ...prev, tac: tocError }));
        setValid(formIsValid);
        return formIsValid;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (handleValidationTac() && handleValidationName()) {
            localStorage.setItem(SAVED_USER_NAME, JSON.stringify(name));

            await createUser(name, (key) => {
                localStorage.setItem(SAVED_USER_KEY, JSON.stringify(key));
                nextPath && navigate(nextPath);
            });
        }
    };
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
            <form className={classNames(s.form, className)}>
                <div className={s.inputLine}>
                    <input
                        className={s.input}
                        type="text"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            // handleValidationName();
                        }}
                        onBlur={() => setNameIsBlured(true)}
                        placeholder={t('signin-nickname')}
                        aria-label="Nick name"
                    />
                    {error?.name && <p className={s.error}>{error.name}</p>}
                </div>
                <div className={s.inputLine}>
                    <Checkbox
                        checked={isAccepted}
                        onBlur={() => setTacIsBlured(true)}
                        onChange={() => {
                            setIsAccepted((prev) => !prev);
                            // handleValidationTac();
                        }}
                    >
                        <span>
                            {t('signin-checkbox')}
                            <Button
                                onClick={(e) => {
                                    e.preventDefault();
                                    toggle();
                                }}
                                type="link"
                            >
                                {t('signin-toc-link')}
                            </Button>
                        </span>
                    </Checkbox>
                    {error?.tac && <p className={s.error}>{error.tac}</p>}
                </div>

                <div className={s.inputLine}>
                    <Button type="primary" onClick={onSubmit}>
                        {t('signin-submit-btn-label')}
                    </Button>
                </div>
            </form>
            <Modal
                header={t('toc-lib-header')}
                bodyContent={tacContent}
                isShowing={isShowing}
                hide={toggle}
                action={() => setIsAccepted(true)}
                buttonLabel={t('toc-lib-submit-btn-label')}
            />
        </>
    );
};

export default SignInForm;
