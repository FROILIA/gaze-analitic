import React, { useEffect, useState } from 'react';
import HeatmapViewer from './../../components/heatmapViewer';
import Spinner from './../../components/spinner';
import { SAVED_USER_KEY, SAVED_USER_NAME } from './../../constants';
import { getUserData } from './../../firebase/api';
import genTests from './../../testScreens/testsCopm';
import Logout from './../../components/logout';
import { useNavigate } from 'react-router-dom';
import s from './resultsPage.module.css';
import gs from './../../styles/global.module.css';
import classNames from 'classnames';
import Button from './../../components/button';
import { useTranslation } from 'react-i18next';
import Scrollbar from '../../components/scrollbar';

const ResultsPage = () => {
    const [isLoading, setLoading] = useState(true);
    const savedName = JSON.parse(localStorage.getItem(SAVED_USER_NAME));
    const savedKey = JSON.parse(localStorage.getItem(SAVED_USER_KEY));
    const [result, setResult] = useState(null);
    const [currentResultId, setCurrentResultId] = useState(null);
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        getUserData(savedKey, (res) => {
            setResult(res);
            setLoading(false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log('firebase result', result);

    const idArr = result ? Object.keys(result) : [];

    useEffect(() => {
        if (result) setCurrentResultId(Object.keys(result)[0]);
    }, [result]);

    useEffect(() => {
        if (result && currentResultId) {
            // setTestedComponent(
            //     tests.find((t) => t.id === result[currentResultId].testName).testComponent,
            // );
        }
    }, [currentResultId, result]);

    const tests = genTests();

    if (isLoading) return <Spinner />;
    return (
        <div className={classNames(s.pageWrapper)}>
            <div className={classNames(s.pageContent, gs.box)}>
                <div className={s.header}>
                    <h1>{`${t('results-title')} ${savedName}`}</h1>
                    <Button
                        onClick={() => {
                            Logout(navigate);
                        }}
                    >
                        {t('results-logout-label')}
                    </Button>
                </div>
                {result && (
                    <div className={s.accordion}>
                        <div className={s.buttonsWrapper}>
                            <Scrollbar>
                                <div className={s.buttons}>
                                    {idArr.map((id) => (
                                        <Button
                                            puched={currentResultId === id}
                                            key={id}
                                            onClick={() => setCurrentResultId(id)}
                                        >
                                            {result[id].testName}
                                        </Button>
                                    ))}
                                </div>
                            </Scrollbar>
                        </div>
                        {currentResultId && (
                            <Scrollbar className={s.content}>
                                <div
                                    style={{
                                        transformOrigin: 'top left',
                                        transform: 'scale(.5)',
                                        width: result[currentResultId].screenSize.width,
                                        height: result[currentResultId].screenSize.height,
                                        position: 'absolute',
                                    }}
                                >
                                    <div className={s.testetUi}>
                                        {
                                            tests.find(
                                                (t) => t.id === result[currentResultId].testName,
                                            ).testComponent
                                        }
                                    </div>

                                    <HeatmapViewer
                                        className={s.heatmapViewer}
                                        key={currentResultId + 'key'}
                                        result={result[currentResultId].result}
                                        config={{
                                            radius: 50,
                                            maxOpacity: 0.9,
                                            minOpacity: 0,
                                            blur: 0.95,
                                        }}
                                    />
                                </div>
                            </Scrollbar>
                        )}
                    </div>
                )}
            </div>
            {/* <HeatmapViewer id="backgroundHeatmap" result={[]} /> */}
            {/* {result && currentResultId && (
                <HeatmapViewer
                    id="backgroundHeatmap"
                    className={s.backgroundHeatmap}
                    key={currentResultId + 'key'}
                    result={result[currentResultId].result}
                />
            )} */}
        </div>
    );
};

export default ResultsPage;
