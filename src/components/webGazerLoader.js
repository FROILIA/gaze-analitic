import React, { useEffect, useState } from 'react';
import { PATH_HOME, SAVED_USER_IS_CALIBRATED } from '../constants';
import Script from 'react-load-script';
import useModal from '../hooks/useModal';
import Calibration from './../pages/calibrationPage';
import Modal from './modal/modal';
import Spinner from './spinner';
import { useTranslation } from 'react-i18next';
import logout from './logout';

export const WebGazerLoader = ({ children, setUserIsCalibrated }) => {
    const { t } = useTranslation();
    const [isLoading, setLoading] = useState(true);
    const [x, setX] = useState(-1);
    const [y, setY] = useState(-1);
    const [sessionResult, setSessionResult] = useState([]);
    const [calibrated, setCalibrated] = useState(
        JSON.parse(localStorage.getItem(SAVED_USER_IS_CALIBRATED)),
    );
    const [webgazerInstance, setWebgazerInstance] = useState(null);
    // const [webgazerIsReady, setWebgazerIsReady] = useState(false);
    const [error, setError] = useState(null);
    const { isShowing, toggle } = useModal();

    useEffect(() => {
        if (x !== -1 && y !== x && calibrated) {
            setSessionResult((prev) => [...prev, { x, y }]);
            // sessionResultArr.push({ x, y })
        }
    }, [x, y, calibrated]);

    // useEffect(() => {
    //     if (!isLoading) setWebgazerIsReady(window.webgazer.hidePredictionPoints());
    // }, [isLoading]);

    // useEffect(() => {
    //     console.log('SAVED_USER_IS_CALIBRATED', localStorage.getItem(SAVED_USER_IS_CALIBRATED));
    //     if (
    //         !isLoading &&
    //         webgazerIsReady &&
    //         JSON.parse(localStorage.getItem(SAVED_USER_IS_CALIBRATED))
    //     )
    //         window.webgazer.hidePredictionPoints();
    // }, [isLoading, webgazerIsReady]);

    const handleScriptLoad = () => {
        setLoading(false);

        try {
            window.webgazer.setRegression('ridge');
            window.webgazer.showVideo(false);
            // window.webgazer.params.showGazeDot(false);

            setWebgazerInstance(
                window.webgazer.setGazeListener(function (data, elapsedTime) {
                    if (data == null) {
                        return;
                    }
                    setX(data.x);
                    setY(data.y);
                }),
            );
        } catch (e) {
            console.log('handleScriptLoad', e);
        }
    };

    const handleScriptError = () => {
        setLoading(false);
        setError('Webgazer.js loading Error!');
    };

    const start = () => {
        console.log(window.webgazer);
        setSessionResult([]);
        if (window.webgazer.isReady()) {
            window.webgazer.resume();
        } else {
            try {
                webgazerInstance.begin();
            } catch (e) {
                setError(e);
                console.log('start-error', e);
            }
        }
    };

    const stop = (end) => {
        if (end) {
            window.webgazer.end();
        } else {
            window.webgazer.pause();
        }
    };

    const onSuccessCalibration = () => {
        setCalibrated(true);
        setUserIsCalibrated(true);
    };

    return (
        <>
            <Script
                url="js/Webgazer.js"
                // onCreate={setLoading(true)}
                onLoad={handleScriptLoad}
                onError={handleScriptError}
            />

            {error && (
                <Modal
                    isShowing={isShowing}
                    hide={toggle}
                    header={t('error-title')}
                    bodyText={error?.message || error}
                    action={() => logout(PATH_HOME)}
                    buttonLabel={t('error-btn-label')}
                />
            )}
            {isLoading ? (
                <Spinner />
            ) : !calibrated ? (
                <Calibration start={start} stop={stop} onSuccess={onSuccessCalibration} />
            ) : children ? (
                children(sessionResult, { stop, start })
            ) : null}
            <canvas
                id="plotting_canvas"
                width="500"
                height="500"
                style={{ display: 'none', cursor: 'crosshair' }}
            ></canvas>
        </>
    );
};
