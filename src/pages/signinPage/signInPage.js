import classNames from 'classnames';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignInForm from '../../components/signinForm';
import { PATH_HOME, SAVED_USER_KEY, SAVED_USER_NAME } from '../../constants';
import gs from './../../styles/global.module.css';
// import s from './signInPage.module.css';

const SignInPage = () => {
    const savedName = JSON.parse(localStorage.getItem(SAVED_USER_NAME));
    const savedKey = JSON.parse(localStorage.getItem(SAVED_USER_KEY));

    const navigate = useNavigate();

    useEffect(() => {
        if (savedName && savedKey) {
            navigate(PATH_HOME, { replace: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [savedName, savedKey]);

    return (
        <div className={gs.flexFullScreenCenterCenter}>
            <SignInForm className={classNames(gs.flexWrapperRowCenter, gs.box)} />
        </div>
    );
};

export default SignInPage;
