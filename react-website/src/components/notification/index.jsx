import React from 'react';
import ReactDOM from 'react-dom';
import Notification from './Notification.jsx';

const notificationContainer = document.createElement('div');
notificationContainer.classList.add('notification-container');
document.body.appendChild(notificationContainer);

function notice (type, title, content, duration = 2000, position = 'center', onClose = () => { }) {
  
  switch (position) {
    case 'left':
      notificationContainer.classList.remove('notification-container-right');
      notificationContainer.classList.add('notification-container-left');
      break;
    case 'right':
      notificationContainer.classList.remove('notification-container-left');
      notificationContainer.classList.add('notification-container-right');
      break;
    default:
      break;
  }

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
  /**
   * 
   * @param {{
   *   title: String, // 弹框标题
   *   content?: String, // 弹框内容
   *   duration?: Number, // 弹框持续时间（单位 ms）
   *   position?: 'center' | 'left' | 'right', // 弹框出现的位置
   *   onClose?: Function, // 关闭回调
   * } | String} config 'string' | {}
   */
  info (config) {
    if (typeof config === 'string') {
      notice('info', config);
    } else if (typeof config === 'object' && config !== null) {
      const { title, content, duration, position, onClose } = config;
      notice('info', title, content, duration, position, onClose);
    } else {
      throw Error('[Notification] config error!');
    }
  },


  success (config) {
    if (typeof config === 'string') {
      notice('success', config);
    } else if (typeof config === 'object' && config !== null) {
      const { title, content, duration, position, onClose } = config;
      notice('success', title, content, duration, position, onClose);
    } else {
      throw Error('[Notification] config error!');
    }
  },


  error (config) {
    if (typeof config === 'string') {
      notice('error', config);
    } else if (typeof config === 'object' && config !== null) {
      const { title, content, duration, position, onClose } = config;
      notice('error', title, content, duration, position, onClose);
    } else {
      throw Error('[Notification] config error!');
    }
  },
}