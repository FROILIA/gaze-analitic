import classNames from 'classnames';
import React from 'react';
import s from './button.module.css';

const Button = ({ children, type, puched, disabled, size, ...restProps }) => {
    return (
        <button
            {...restProps}
            disabled={disabled}
            className={classNames(
                s.button,
                s[size],
                disabled && s.buttonDisabled,
                puched && s.buttonPushed,
                s[type],
            )}
        >
            {children}
        </button>
    );
};

export default Button;
