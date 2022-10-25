import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { calculatePrecision } from '../../utils/precisionUtils';
import Modal from '../../components/modal/modal';
import useModal from '../../hooks/useModal';
import Button from '../../components/button/botton';
import gs from './../../styles/global.module.css';
import s from './calibrationPage.module.css';
import './style.css';
import { useTranslation } from 'react-i18next';

const Calibration = ({ onSuccess, start, stop }) => {
    const defaultCalibrationButtons = {
        id1: { pressedTimes: 0, passed: false },
        id2: { pressedTimes: 0, passed: false },
        id3: { pressedTimes: 0, passed: false },
        id4: { pressedTimes: 0, passed: false },
        id5: { pressedTimes: 0, passed: false },
        id6: { pressedTimes: 0, passed: false },
        id7: { pressedTimes: 0, passed: false },
        id8: { pressedTimes: 0, passed: false },
        id9: { pressedTimes: 0, passed: false },
    };
    const [step, setStep] = useState('1');
    const [calibrationPoints, setCalibrationPoints] = useState(defaultCalibrationButtons);
    const [pointCalibrate, setPointCalibrate] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const idReadyToMeasure = step === '2';
    const { t } = useTranslation();

    const { isShowing: isShowing1, toggle: toggle1 } = useModal(true);
    const { isShowing: isShowing2, toggle: toggle2 } = useModal(true);

    const store_points_variable = () => {
        window.webgazer.params.storingPoints = true;
    };
    const stop_storing_points_variable = () => {
        window.webgazer.params.storingPoints = false;
    };

    function sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    const incrementPressedTimes = (id, prev) => {
        return { ...prev, [id]: { ...prev[id], pressedTimes: prev[id].pressedTimes + 1 } };
    };

    const setPassed = (id, prev) => ({ ...prev, [id]: { ...prev[id], passed: true } });

    useEffect(() => {
        for (const btnInx in calibrationPoints) {
            const btn = calibrationPoints[btnInx];
            if (btn.pressedTimes === 5 && !btn.passed) {
                setCalibrationPoints((prev) => setPassed(btnInx, prev));
                setPointCalibrate((prev) => ++prev);
            }
        }
        if (pointCalibrate === 8) {
            setStep('2');
        }
    }, [calibrationPoints, pointCalibrate]);

    useEffect(() => {
        if (idReadyToMeasure) {
            window.webgazer.showVideo(false);

            stop();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [step, idReadyToMeasure]);

    const precisionMeasurement = () => {
        start();
        // window.webgazer.removeMouseEventListeners();
        store_points_variable();
        sleep(5000).then(() => {
            stop_storing_points_variable(); // stop storing the prediction points
            const past50 = window.webgazer.getStoredPoints(); // retrieve the stored points
            const precision_measurement = calculatePrecision(past50);
            console.log({ precision_measurement });
            stop();
            setAccuracy(precision_measurement);
            setStep('3');
            window.webgazer.hidePredictionPoints();
        });
    };

    const onCalibrationButtonClick = (e) => {
        const id = e.target.id;
        setCalibrationPoints((prev) => incrementPressedTimes(id, prev));
    };

    const recalibrate = () => {
        toggle1();
        toggle2();
        setCalibrationPoints(defaultCalibrationButtons);
        setPointCalibrate(0);
        // window.webgazer.clearData();
        setAccuracy(0);
        setStep('1');
    };

    const renderButtons = () => {
        return Object.keys(calibrationPoints).map((btnInx) => {
            const btn = calibrationPoints[btnInx];
            const opacity = (btn.pressedTimes + 1) * 0.2;

            const is5thVisible =
                (btnInx !== 'id5' && !idReadyToMeasure) || (btnInx === 'id5' && idReadyToMeasure);
            return (
                <button
                    id={btnInx}
                    key={btnInx}
                    className={cn(s.calibrationBtn, btn.passed && s.passed, s[`btn-${btnInx}`])}
                    style={{ opacity: opacity, visibility: is5thVisible ? 'visible' : 'hidden' }}
                    onClick={onCalibrationButtonClick}
                    disabled={btn.passed}
                ></button>
            );
        });
    };

    const calibrationDesription = (
        <ul>
            <li>{t('calibration-instruction-1')}</li>
            <li>{t('calibration-instruction-2')}</li>
            <li>{t('calibration-instruction-3')}</li>
            <li>
                {t('calibration-instruction-4-1')} &nbsp;
                <div className={s.blueDot} />
                &nbsp; {t('calibration-instruction-4-2')}
            </li>
            <li>
                {t('calibration-instruction-5-1')} &nbsp;
                <button
                    className={cn(s.calibrationBtn, s.btnText)}
                    style={{ opacity: '0.2' }}
                    disabled
                ></button>
                &nbsp;{t('calibration-instruction-5-2')} &nbsp;
                <button className={cn(s.calibrationBtn, s.passed, s.btnText)} disabled></button>
                &nbsp; ;
            </li>
            <li>{t('calibration-instruction-6')} </li>
        </ul>
    );

    const measurementDesription = (
        <ul>
            <li>{t('measurement-instruction-1')} </li>
            <li>
                {t('measurement-instruction-2-1')} &nbsp;
                <button className={cn(s.calibrationBtn, s.btnText)} disabled></button>
                &nbsp; {t('measurement-instruction-2-2')}
            </li>
        </ul>
    );

    const firstStep = () => (
        <div className={s.calibrationWrapper}>
            {renderButtons()}
            <Modal
                header={t('calibration-title')}
                bodyContent={calibrationDesription}
                buttonLabel={t('calibration-start-label')}
                isShowing={isShowing1}
                hide={toggle1}
                action={() => {
                    start();
                    window.webgazer.showVideo(true);
                }}
            />
        </div>
    );

    const secondStep = () => (
        <div className={s.calibrationWrapper}>
            <Modal
                header={t('measurement-title')}
                bodyContent={measurementDesription}
                isShowing={isShowing2}
                hide={toggle2}
                action={precisionMeasurement}
                buttonLabel={t('measurement-start-label')}
            />
            <button id="id5" className={cn(s.calibrationBtn, s[`btn-id5`])}></button>
        </div>
    );

    const thirdStep = () => (
        <div className={s.calibrationWrapper}>
            <h3 style={{ marginBottom: '100px' }}>{`${t(
                'measurement-result-title',
            )} ${accuracy} % `}</h3>
            <p>{t('measurement-result-text')}</p>
            <div className={gs.flexWrapperRowCenter}>
                <Button onClick={recalibrate}>{t('measurement-recalibrate-label')}</Button>
                <Button
                    type="primary"
                    onClick={() => {
                        onSuccess(true);
                    }}
                >
                    {t('measurement-continue-label')}
                </Button>
            </div>
        </div>
    );

    switch (step) {
        case '2':
            return secondStep();
        case '3':
            return thirdStep();
        default:
            return firstStep();
    }
};

export default Calibration;
