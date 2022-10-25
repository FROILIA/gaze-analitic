import React, { useState } from 'react';
import TestItem from '../testItem';

const TestSwitcher = ({ tests = [], start, stop, processResult, finishTesting }) => {
    const testAmount = tests.length;
    // const [currentTest, setCurrentTest] = useState(null);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [testsIsFinished, setFinished] = useState(false);
    const number = currentIdx + 1;

    const goNext = () => {
        if (number === testAmount) {
            setFinished(true);
            finishTesting();
        } else {
            setCurrentIdx((prev) => ++prev);
        }
    };

    if (testsIsFinished) return null;
    return (
        <TestItem
            key={currentIdx}
            {...tests[currentIdx]}
            goNext={goNext}
            stop={stop}
            start={start}
            processResult={processResult}
            number={number}
            total={testAmount}
        />
    );
};

export default TestSwitcher;
