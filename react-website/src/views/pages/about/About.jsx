import React, { createRef, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './about.css';

import EventEmitter from '../../../utils/EventEmitter';
import { EVENT_CHANGE_HEADER } from '../../../utils/events';
import { HEADER_HEIGHT, WEBSOCKET_URL } from '../../../utils/config';

const About = () => {
  const ws = useRef(null);
  const ul = createRef();
  const [list, setList] = useState([]);

  useEffect(() => {
    // 发布事件
    EventEmitter.emit(EVENT_CHANGE_HEADER, { headerHeight: HEADER_HEIGHT, });
  }, []);

  const openHandler = e => { }
  const closeHandler = e => { }
  const errorHandler = e => { }
  const messageHandler = e => {
    const data = JSON.parse(e.data);
    
    // setList([data]);
    // list.push(data);
    const tmp = list.map(item => item);
    setList([...tmp, data]);
  }

  useLayoutEffect(() => {
    ws.current = new WebSocket(WEBSOCKET_URL);
    ws.current.addEventListener('open', openHandler);
		ws.current.addEventListener('close', closeHandler);
		ws.current.addEventListener('error', errorHandler);
		ws.current.addEventListener('message', messageHandler);
    return () => {
      ws.current?.removeEventListener('open', openHandler);
      ws.current?.removeEventListener('close', closeHandler);
      ws.current?.removeEventListener('error', errorHandler);
      ws.current?.removeEventListener('message', messageHandler);
      ws.current?.close();
    }
  }, [ws]);

  const send = () => {
    const data = { time: Date.now(), data: "hello" }
    ws.current.send(JSON.stringify(data));
  }

  return <div className="container">
    About
    <button onClick={send}>发送</button>
    <ul>
      {
        Array.isArray(list) && list.map(item => {
          return <li key={ uuidv4() }>{ item?.time || 'undefined-tmp'}</li>
        })
      }
    </ul>
  </div>
}

export default About;