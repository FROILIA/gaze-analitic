import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/modal';
import TestItem from '../../components/testItem';
import TestSwitcher from '../../components/testSwitcher';
import { WebGazerLoader } from '../../components/webGazerLoader';
import {
    PATH_RESULTS_PAGE,
    SAVED_USER_IS_CALIBRATED,
    SAVED_USER_KEY,
    SAVED_USER_HAS_RESULT,
} from '../../constants';
import { pushUserResult } from '../../firebase/api';
import useModal from '../../hooks/useModal';
import Logout from './../../components/logout';
import genTests from '../../testScreens/testsCopm';
import { useTranslation } from 'react-i18next';
// require('./../utils/resizeUtils');

const TestPage = () => {
    const savedKey = JSON.parse(localStorage.getItem(SAVED_USER_KEY));
    const hasResult = JSON.parse(localStorage.getItem(SAVED_USER_HAS_RESULT));
    const navigate = useNavigate();
    const { isShowing, toggle } = useModal(false);
    const { t } = useTranslation();

    useEffect(() => {
        if (hasResult) {
            toggle(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasResult]);

    const pushResult = async (testItemResult) => {
        console.log({ testItemResult });
        // localStorage.setItem(SAVED_USER_RESULT, JSON.stringify({ ...savedResult, testItemResult }));
        await pushUserResult(savedKey, testItemResult, () => console.log('Saved on firebase'));
    };

    const setUserIsCalibrated = () => {
        localStorage.setItem(SAVED_USER_IS_CALIBRATED, true);
    };

    const finishTesting = () => {
        localStorage.setItem(SAVED_USER_HAS_RESULT, JSON.stringify(true));
        toggle(true);
    };

    const tests = genTests();

    return (
        <>
            <WebGazerLoader setUserIsCalibrated={setUserIsCalibrated} compotent={TestItem}>
                {!hasResult
                    ? (sessionResult, aditionalProps) => (
                          <TestSwitcher
                              tests={tests}
                              {...aditionalProps}
                              finishTesting={finishTesting}
                              processResult={(id, screenSize) =>
                                  pushResult({ testName: id, result: sessionResult, screenSize })
                              }
                          />
                      )
                    : null}
            </WebGazerLoader>
            <Modal
                isShowing={isShowing}
                action={[() => Logout(navigate), () => navigate(PATH_RESULTS_PAGE)]}
                buttonLabel={[t('thanks-logout-label'), t('thanks-results-label')]}
                hide={toggle}
                header={t('thanks-title')}
                bodyText={t('thanks-text')}
            />
        </>
    );
};

export default TestPage;
