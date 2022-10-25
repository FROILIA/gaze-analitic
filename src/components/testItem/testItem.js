import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useModal from '../../hooks/useModal';
import Modal from '../modal/modal';

const TestItem = ({
    id,
    title,
    startDescription,
    endDescription,
    time,
    stop,
    start,
    testComponent,
    processResult,
    goNext,
    number,
    total,
}) => {
    const { isShowing: startModalShow, toggle: toggleStartModal } = useModal(true);
    const { isShowing: endModalShow, toggle: toggleEndModal } = useModal(false);
    const [started, setStarted] = useState(false);
    const testTimer = useRef(null);
    const [isTimerFinished, setIsTimerFinished] = useState(false);
    const [isProcessed, setIsProcessed] = useState(false);
    const { t } = useTranslation();

    const startTest = () => {
        setStarted(true);
        start();
    };

    useEffect(() => {
        if (isTimerFinished && !isProcessed) {
            const screenSize = { height: window.innerHeight, width: window.innerWidth };
            setIsProcessed(true);
            processResult(id, screenSize);
            stop(number === total);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isTimerFinished, processResult, isProcessed]);

    useEffect(() => {
        if (time > 0 && started && !testTimer.current) {
            console.log('Created timer');
            testTimer.current = setTimeout(() => {
                setIsTimerFinished(true);
                toggleEndModal();
                console.log('Time is over');
            }, time);
        }
    }, [started, time, processResult, id, toggleEndModal]);

    useEffect(() => {
        return () => {
            if (time) {
                clearTimeout(testTimer.current);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const headerInfo = <span>{`${number}/${total}`}</span>;
    const startModalBody = (
        <div>
            <p>{startDescription}</p>
            {time > 0 && <p>{`${t('test-duration')}: ${time / 1000}${t('test-sec')}`}</p>}
        </div>
    );
    return (
        <>
            <Modal
                isShowing={startModalShow}
                action={startTest}
                hide={toggleStartModal}
                header={title}
                bodyContent={startModalBody}
                buttonLabel={t('test-start-label')}
                headerInfo={headerInfo}
            />
            {testComponent}
            <Modal
                isShowing={endModalShow}
                action={goNext}
                hide={toggleEndModal}
                header={title}
                bodyText={endDescription}
                buttonLabel={number === total ? t('test-last-label') : t('test-next-label')}
                headerInfo={headerInfo}
            />
            {/* <button onClick={retry}>Retry</button> */}
        </>
    );
};

export default TestItem;
