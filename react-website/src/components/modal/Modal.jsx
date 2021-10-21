import React, { useEffect, useState } from 'react';
import './modal.css';
import icon_close from '../../assets/icons/close.svg';


const Modal = (props) => {
  const {
    visible = false,
    onOpen = () => { },
    onClose = () => { },
    title,
    children,
    footer,
  } = props;
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    setDisplay(visible);
  }, [visible]);

  const clickHandler = (e) => {
    const id = e.target.id;
    if (id === 'mask') {
      setDisplay(false);
      onClose();
    } else if (id === 'close') {
      setDisplay(false);
      onClose();
    }
  }

  return (
    <div
      className="modal-container"
      onClick={clickHandler}
      id="mask"
      style={{ display: display ? 'flex' : 'none' }}
    >
      <div className="modal-card" id="card">
        <div className="modal-header">
          <div>{title}</div>
          <img id="close" src={icon_close} alt="close" width="24" height="24"/>
        </div>
        <div className="modal-content">{ children }</div>
        <div className="modal-footer">{footer}</div>
      </div>
    </div>
  )
}

export default Modal;
