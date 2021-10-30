import React from 'react';
import ReactDOM from 'react-dom';
import Notification from '../notification/Notification.jsx';

function createNotification () {
  const div = document.createElement('div');
  document.body.appendChild(div);
  const notification = ReactDOM.render(<Notification />, div);
  return {
    addNotice () {
      return notification.addNotice(notice)
    },
    destroy () {
      ReactDOM.unmountComponentAtNode(div);
      document.body.removeChild(div);
    }
  }
}

function notice ({ type, title, content, duration = 2000, onClose = () => {} }) {
  const div = document.createElement('div');
  document.body.appendChild(div);
  const notification = ReactDOM.render(<Notification type title content />, div);
}

export default {
  info ({ title, content, duration, onClose }) {
    notice('info', content, duration, onClose);
  },
  success ({ title, content, duration, onClose }) {},
  error ({ title, content, duration, onClose }) {},
}