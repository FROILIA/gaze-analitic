import React, { useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
// import s from './scrollbar.module';

const Scrollbar = (props) => {
    const [top, setTop] = useState(0);

    const handleUpdate = (values) => {
        const { top } = values;
        setTop(top);
    };

    const renderView = ({ style, ...props }) => {
        const viewStyle = {
            padding: 15,
        };
        return <div className="box" style={{ ...style, ...viewStyle }} {...props} />;
    };

    const renderThumb = ({ style, ...props }) => {
        const thumbStyle = {
            width: '5px',
            backgroundColor: 'black',
        };
        return <div style={{ ...style, ...thumbStyle }} {...props} />;
    };

    return (
        <Scrollbars
            renderView={renderView}
            renderThumbHorizontal={renderThumb}
            renderThumbVertical={renderThumb}
            onUpdate={handleUpdate}
            {...props}
        />
    );
};

export default Scrollbar;
