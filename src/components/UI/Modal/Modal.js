import { useRef, useEffect } from 'react';
import reactDom from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import './modal.css';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

const modalContainer = document.getElementById('modalContainer');

export default function Modal(props) {
  const { show, modalClosed, children, testId } = props;
  const portalRef = useRef(document.createElement('div'));

  const nodeRef = useRef(null);

  useEffect(() => {
    modalContainer.appendChild(portalRef.current);
  }, []);

  const component = (
    <>
      <Backdrop show={show} clicked={modalClosed} />
      <CSSTransition
        nodeRef={nodeRef}
        in={show}
        timeout={100}
        mountOnEnter
        unmountOnExit
        classNames="modal"
      >
        <div
          ref={nodeRef}
          className={classes.Modal}
          data-testid={testId || 'Modal'}
        >
          {children}
        </div>
      </CSSTransition>
    </>
  );

  return reactDom.createPortal(component, portalRef.current);
}
