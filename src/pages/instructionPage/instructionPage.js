import classNames from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/button';
import Scrollbar from '../../components/scrollbar';
import { PATH_TESTS_PAGE, SAVED_USER_IS_CALIBRATED } from '../../constants';
import gs from './../../styles/global.module.css';
import s from './instructionPage.module.css';

const InstructionPage = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const isCalibrated = JSON.parse(localStorage.getItem(SAVED_USER_IS_CALIBRATED));
    return (
        <div className={gs.flexFullScreenCenterCenter}>
            <div className={classNames(gs.box, s.box)}>
                {/* <div className={s.boxInner}> */}
                <h1>{t('instruction-title')}</h1>
                <Scrollbar className={s.text}>
                    <p>{t('instruction-p1')}</p>
                    <p>{t('instruction-p2')}</p>
                    <p>{t('instruction-p3')}</p>
                    <ul>
                        <li>{t('instruction-li1')}</li>
                        <li>{t('instruction-li2')}</li>
                        <li>{t('instruction-li3')}</li>
                    </ul>
                    <p>{t('instruction-p4')}</p>
                </Scrollbar>
                <Button onClick={() => navigate(PATH_TESTS_PAGE)}>
                    {isCalibrated
                        ? t('instruction-to-tests-label')
                        : t('instruction-calibration-label')}
                </Button>
            </div>
        </div>
    );
};

export default InstructionPage;
