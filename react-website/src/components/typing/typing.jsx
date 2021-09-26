import React, { memo, useEffect, useState } from 'react';
import './typing.css';

/*
 * @props params time {number} 毫秒数 一次打字特效执行的事件
 * @props params circle {boolean} 是否循环打字特效 默认为 true
 */
const Typing = React.memo((props) => {
  const { children, time, circle } = props;
  const [typing, setTyping] = useState('');

  useEffect(() => {
    let tmp = '';
    let texts = children.toString().split('');
    const timer = setInterval(() => {
      if (circle) {
        const ch = texts.shift();
        if (ch) {
          tmp += ch;
          setTyping(tmp);
        } else {
          tmp = '';
          setTyping('');
          texts = children.toString().split('');
        }
      } else {
        const ch = texts.shift();
        if (ch) {
          tmp += ch;
          setTyping(tmp);
        } else {
          clearInterval(timer);
        }
      }
    }, Math.floor(time / texts.length) ?? 240);
    return () => {
      clearInterval(timer);
    }
  }, []);

  return (
    <>
      <div className="typing">
        {typing}
      </div>
    </>
  )
});

export default Typing;
