import React from 'react';
import './notification.css';

const Notification = React.memo((props) => {
  const { type, title, content } = props;

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
        backgroundColor: typeColor,
      }}
    >
      title-content
    </div>
  </>
})

export default Notification;