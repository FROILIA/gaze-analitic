import classNames from 'classnames';
import React from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import Button from '../button/botton';
import Scrollbar from '../scrollbar';
import gs from './../../styles/global.module.css';
import s from './modal.module.css';

const Modal = ({
    isShowing,
    hide,
    action,
    header,
    bodyText,
    bodyContent,
    buttonLabel,
    headerInfo,
}) => {
    const { t } = useTranslation();
    const onAction = (action) => {
        hide();
        action();
    };

    const renderButton = () => {
        if (Array.isArray(action) && Array.isArray(buttonLabel)) {
            return buttonLabel.map((lbl, idx, arr) => (
                <Button
                    key={lbl + idx}
                    type={idx === arr.length - 1 && 'primary'}
                    data-dismiss="modal"
                    onClick={() => onAction(action[idx])}
                >
                    {lbl}
                </Button>
            ));
        }
        return (
            <Button data-dismiss="modal" onClick={() => onAction(action)}>
                {buttonLabel || t('ok-label')}
            </Button>
        );
    };

    return isShowing
        ? ReactDOM.createPortal(
              <React.Fragment>
                  <div className={s.modalOverlay}></div>
                  <div className={s.wrapper}>
                      <div
                          className={classNames(s.modal, gs.box)}
                          aria-modal
                          aria-hidden
                          tabIndex={-1}
                          role="dialog"
                      >
                          <div className={s.header}>
                              <h1>{header}</h1>
                              {headerInfo}
                          </div>
                          <Scrollbar className={s.body}>
                              {bodyText && <p>{bodyText}</p>}
                              {bodyContent}
                          </Scrollbar>

                          <div className={classNames(s.buttonWrapper, gs.flexWrapperRowCenter)}>
                              {renderButton()}
                          </div>
                      </div>
                  </div>
              </React.Fragment>,
              document.body,
          )
        : null;
};
export default Modal;
