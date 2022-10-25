import { useState } from 'react';

const useModal = (dafault) => {
    const [isShowing, setIsShowing] = useState(dafault || false);

    const toggle = (value) => {
        value ? setIsShowing(value) : setIsShowing(!isShowing);
    };

    return {
        isShowing,
        toggle,
    };
};

export default useModal;
