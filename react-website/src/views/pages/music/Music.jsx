import React, { useEffect, useState } from 'react';
import './music.css';
import EventEmitter from '../../../utils/EventEmitter.js';
import {
  EVENT_CHANGE_HEADER,
  EVENT_DISPLAY_AUDIO,
  EVENT_CHANGE_AUDIO,
  EVENT_OPEN_AUDIO,
  EVENT_SWITCH_PREV_MUSIC,
  EVENT_SWITCH_NEXT_MUSIC,
} from '../../../utils/constant';

const tmp = [
  { musicName: '我太笨', singer: '锤娜丽莎', src: 'https://www.zhouxingxing.fun/music/1.mp3' },
  { musicName: 'Walk on Water', singer: '邓紫棋', src: 'https://www.zhouxingxing.fun/music/2.mp3' },
  { musicName: '谢谢对不起', singer: '许靖韵', src: 'https://www.zhouxingxing.fun/music/3.mp3' },
  { musicName: 'Entertainer', singer: 'ZAYN', src: 'https://www.zhouxingxing.fun/music/4.mp3' },
  { musicName: 'WITHOUT YOU', singer: 'The Kid LAROI', src: 'https://www.zhouxingxing.fun/music/5.mp3' },
  { musicName: '年少的欢喜', singer: '张特星', src: 'https://www.zhouxingxing.fun/music/6.mp3' },
  { musicName: '开始', singer: 'Gaho', src: 'https://www.zhouxingxing.fun/music/7.mp3' },
]

const Music = () => {
  const [current, setCurrent] = useState({});

  useEffect(() => {
    // 触发事件
    EventEmitter.emit(EVENT_CHANGE_HEADER, { title: <h1>Music</h1>, backdrop: true });
    EventEmitter.emit(EVENT_DISPLAY_AUDIO, true);

    // 订阅事件
    EventEmitter.on(EVENT_SWITCH_PREV_MUSIC, (music) => {
      const src = music.src;
      let prev;
      for (let i = tmp.length - 1; i >= 0 ; i--) {
        if (src === tmp[i].src) {
          prev = i - 1 >= 0 ? i - 1 : tmp.length - 1;
          break;
        }
      }
      EventEmitter.emit(EVENT_CHANGE_AUDIO, tmp[prev]);
    });
    EventEmitter.on(EVENT_SWITCH_NEXT_MUSIC, (music) => {
      const src = music.src;
      let next;
      for (let i = 0; i < tmp.length - 1; i++) {
        if (src === tmp[i].src) {
          next = i + 1 < tmp.length ? i + 1 : 0;
          break;
        }
      }
      EventEmitter.emit(EVENT_CHANGE_AUDIO, tmp[next]);
    });
    return () => {
      EventEmitter.emit(EVENT_OPEN_AUDIO, false);
      EventEmitter.off(EVENT_SWITCH_PREV_MUSIC);
      EventEmitter.off(EVENT_SWITCH_NEXT_MUSIC);
    }
  }, []);

  return (
    <>
      <div className="container">
        <div className="music-top" style={{ padding: "1rem", margin: "1rem 0" }}>
          <div className="card music-top-left">
            {
              tmp.map((item) => {
                return <div
                  className="music-item"
                  key={item.src} onClick={
                    async () => {
                      await setCurrent({ ...item });
                      EventEmitter.emit(EVENT_CHANGE_AUDIO, item);
                    }
                  }>
                  {item.musicName} - {item.singer}
                </div>
              })
            }
          </div>
          <div className="card music-top-right">
            { current.src }
          </div>
        </div>
      </div>

      {/* <Audio {...current} autoplay></Audio> */}
    </>
  )
}

export default Music;