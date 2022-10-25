import s from './testScreen.module.css';

const tests = [
    {
        id: 'testId1',
        title: 'Test 1',
        startDescription: 'what needs to do ... ',
        endDescription: 'Thanks for compleating test 1',
        time: 5000,
        testComponent: (
            <div className={s.pageWarapper}>
                <p>Some test text</p>
                <button>Button for test</button>
            </div>
        ),
    },
    {
        id: 'testId2',
        title: 'Test 2',
        startDescription: 'what needs to do second time ... ',
        endDescription: 'Thanks for compleating test 2',
        time: 5000,
        testComponent: (
            <div className={s.pageWarapper}>
                <p>Some test text</p>
                <button>Button for test</button>
            </div>
        ),
    },
    {
        id: 'testId3',
        title: 'Test 3',
        startDescription: 'what needs to do second time ... ',
        endDescription: 'Thanks for compleating test 3',
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
                <p>Some test text</p>
                <button>Button for test</button>
            </div>
        ),
    },
];

export default tests;
