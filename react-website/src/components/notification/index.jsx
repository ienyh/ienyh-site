import React from 'react';
import ReactDOM from 'react-dom';
import Notification from './Notification.jsx';

const notificationContainer = document.createElement('div');
notificationContainer.classList.add('notification-container');
document.body.appendChild(notificationContainer);

function notice (type, title, content, duration = 2000, onClose = () => {}) {
  const div = document.createElement('div');
  notificationContainer.appendChild(div);
  ReactDOM.render(<Notification type={ type } title={ title } content={ content } />, div);

  setTimeout(() => {
    onClose({ type, title, content, duration });
    ReactDOM.unmountComponentAtNode(div);
    notificationContainer.removeChild(div);
  }, duration || 2000);
}

export default {
  info (config) {
    if (typeof config === 'string') {
      notice('info', config);
    } else if (typeof config === 'object' && config !== null) {
      const { title, content, duration, onClose } = config;
      notice('info', title, content, duration, onClose);
    } else {
      throw Error('[Notification] config error!');
    }
  },
  success (config) {
    if (typeof config === 'string') {
      notice('success', config);
    } else if (typeof config === 'object' && config !== null) {
      const { title, content, duration, onClose } = config;
      notice('success', title, content, duration, onClose);
    } else {
      throw Error('[Notification] config error!');
    }
  },
  error (config) {
    if (typeof config === 'string') {
      notice('error', config);
    } else if (typeof config === 'object' && config !== null) {
      const { title, content, duration, onClose } = config;
      notice('error', title, content, duration, onClose);
    } else {
      throw Error('[Notification] config error!');
    }
  },
}