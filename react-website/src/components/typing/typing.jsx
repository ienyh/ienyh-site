import React, { useEffect, useState } from 'react';
import './typing.css';

const Typing = (props) => {
  const { children, time, circle = true } = props;
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
        { typing }
      </div>
    </>
  )
}

export default Typing;
