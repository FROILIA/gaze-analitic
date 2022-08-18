import React, { useEffect, useState } from 'react';
import Script from 'react-load-script';
import useModal from '../hooks/useModal';
import Calibration from './gazeCalibration';
import Modal from './modal/modal';
import Spinner from './spinner';
import { useNavigate } from 'react-router-dom';
import { PATH_HOME, SAVED_USER_IS_CALIBRATED } from '../constants';

export const WebGazerLoader = ({ children, setUserIsCalibrated, component }) => {
    const [isLoading, setLoading] = useState(true);
    const [x, setX] = useState(-1);
    const [y, setY] = useState(-1);
    const [sessionResult, setSessionResult] = useState([]);
    const [calibrated, setCalibrated] = useState(
        JSON.parse(localStorage.getItem(SAVED_USER_IS_CALIBRATED)),
    );
    const [webgazerInstance, setWebgazerInstance] = useState(null);
    const [error, setError] = useState(null);
    const { isShowing, toggle } = useModal();
    const navigate = useNavigate();

    useEffect(() => {
        if (x !== -1 && y !== x && calibrated) {
            setSessionResult((prev) => [...prev, { x, y }]);
            // sessionResultArr.push({ x, y })
        }
    }, [x, y]);

    // const Component = component;

    useEffect(() => {
        // console.log('useEffect', { sessionResult });
    }, [sessionResult]);

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
                    // console.log({ data });
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
        console.log('isReady', window.webgazer.isReady());
        if (window.webgazer.isReady()) {
            window.webgazer.resume();
        } else {
            try {
                webgazerInstance.begin();
            } catch (e) {
                setError(e);
                console.log('start', e);
            }
        }
    };

    const stop = () => {
        window.webgazer.pause();
    };

    const resume = () => {
        start();
        // setSessionResult([]);
        // window.webgazer.resume();
    };

    // const childrenWithProps = React.Children.map(children, (child) => {
    //     if (React.isValidElement(child)) {
    //         // console.log('childrenWithProps', sessionResult);
    //         return React.cloneElement(child, { start, stop, resume, sessionResult });
    //     }
    //     console.log('isValidElement');
    //     return child;
    // });

    // const childrenWithProps = useMemo(() => React.Children.map(children, child => {
    //     if (React.isValidElement(child)) {
    //         return React.cloneElement(child, { start, stop, resume, sessionResult });
    //     }
    //     console.log('isValidElement');
    //     return child;
    // }), [sessionResult, webgazerInstance]);

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
                    header="Error"
                    bodyText={error?.message || error}
                    action={() => navigate(PATH_HOME)}
                />
            )}
            {isLoading ? (
                <Spinner />
            ) : !calibrated ? (
                <Calibration
                    start={start}
                    stop={stop}
                    resume={resume}
                    onSuccess={onSuccessCalibration}
                />
            ) : (
                // childrenWithProps
                children(sessionResult, { stop, resume, start })
            )}
            <canvas
                id="plotting_canvas"
                width="500"
                height="500"
                style={{ display: 'none', cursor: 'crosshair' }}
            ></canvas>
        </>
    );
};
