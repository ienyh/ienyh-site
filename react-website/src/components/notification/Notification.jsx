import React from 'react';
import './notification.css';

import icon_info from '../../assets/icons/info.svg';
import icon_success from '../../assets/icons/success.svg';
import icon_error from '../../assets/icons/error.svg';

const Notification = React.memo((props) => {
  const { type, title, content } = props;

  let icon;
  switch (type) {
    case 'info':
      icon = icon_info;
      break;
    case 'success':
      icon = icon_success;
      break;
    case 'error':
      icon = icon_error;
      break;
    default:
      icon = icon_info;
      break;
  }

  let typeColor;
  switch (type) {
    case 'info':
      typeColor = '#EDF2F4'
      break;
    case 'success':
      typeColor = '#A5FFD6';
      break;
    case 'error':
      typeColor = '#EF233C';
      break;
    default:
      typeColor = '#EDF2F4';
      break;
  }

  return <>
    <div
      className="notification"
      style={{
        // border: `2px solid ${typeColor}`
      }}
    >
      <div
        className="notification-title"
        style={{
          // color: typeColor
        }}
      >
        <img src={ icon } />
        <span>{ title || '替代标题' }</span>
      </div>
      {
        content ? <div className="notification-content">{ content }</div> : null
      }
    </div>
  </>
})

export default Notification;