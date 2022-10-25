import { useTranslation } from 'react-i18next';
import s from './testScreen.module.css';
import gs from './../styles/global.module.css';
import Button from '../components/button';

const Tests = () => {
    const { t } = useTranslation();

    return [
        {
            id: 'testId1',
            title: t('1test-title'),
            startDescription: t('1test-start-description'),
            endDescription: t('1test-end-description'),
            time: 5000,
            testComponent: (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    className={s.pageWarapper}
                >
                    <div className={gs.flexWrapperRowCenter}>
                        <Button style={{ background: 'red' }}>不</Button>
                        <Button style={{ background: 'green' }}>是的</Button>
                    </div>
                </div>
            ),
        },
        {
            id: 'testId2',
            title: t('2test-title'),
            startDescription: t('2test-start-description'),
            endDescription: t('2test-end-description'),
            time: 5000,
            testComponent: (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    className={s.pageWarapper}
                >
                    <div className={gs.flexWrapperRowCenter}>
                        <Button style={{ background: 'red' }}>不⛔</Button>
                        <Button style={{ background: 'green' }}>是的👍</Button>
                    </div>
                </div>
            ),
        },
    ];
};

export default Tests;
