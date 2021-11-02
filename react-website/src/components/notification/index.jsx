import React from 'react';
import ReactDOM from 'react-dom';
import Notification from './Notification.jsx';

const notices = [];

function notice (type, title, content, duration = 2000, onClose = () => {}) {
  const div = document.createElement('div');
  document.body.appendChild(div);
  ReactDOM.render(<Notification type={ type } title={ title } content={ content } />, div);

  setTimeout(() => {
    onClose({ type, title, content, duration });
    ReactDOM.unmountComponentAtNode(div);
    document.body.removeChild(div);
  }, duration || 2000);
}

export default {
  info ({ title, content, duration, onClose }) {
    notice('info', title, content, duration, onClose);
  },
  success ({ title, content, duration, onClose }) {
    notice('success', title, content, duration, onClose);
  },
  error ({ title, content, duration, onClose }) {
    notice('error', title, content, duration, onClose);
  },
}