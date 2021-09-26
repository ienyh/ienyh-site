import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './audio.css';
import EventEmitter from '../../utils/EventEmitter.js';
import {
  EVENT_DISPLAY_AUDIO,
  EVENT_OPEN_AUDIO,
  EVENT_CHANGE_AUDIO,
} from '../../utils/constant';
/** 引入图标 */
import icon_pause from  '../../assets/icons/pause.svg';
import icon_continue from  '../../assets/icons/continue.svg';
import icon_next from  '../../assets/icons/next.svg';
import icon_previous from '../../assets/icons/previous.svg';
import icon_arrow_right from '../../assets/icons/arrow-right.svg';

const format = (time = 0) => {
  if (typeof time !== 'number' || time <= 0 || time >= 3599) return '00:00';
  time = Math.round(time);
  let front = Math.floor(time / 60), back = time % 60;
  return `${front >= 10 ? front : '0' + front}:${back >= 10 ? back : '0' + back}`;
}

const Audio = React.memo(() => {
  const [basic, setBasic] = useState({});
  const [display, setDisplay] = useState(false);
  const [hide, setHide] = useState(false);
  const [status, setStatus] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [rate, setRate] = useState(0);
  const audioRef = useRef();

  const durationchangeHandler = function () {
    const duration = audioRef.current.duration;
    setDuration(Math.round(duration));
  }

  const timeupdateHandler = function () {
    const { currentTime, duration } = audioRef.current;
    setCurrentTime(Math.round(currentTime));
    if (currentTime && duration) {
      setRate((currentTime / duration).toFixed(2));
    }
  }

  useEffect(() => {
    // 注册事件
    EventEmitter.on(EVENT_DISPLAY_AUDIO, isDisplay => {
      setDisplay(isDisplay);
    });
    EventEmitter.on(EVENT_OPEN_AUDIO, isDisplay => {
      setDisplay(isDisplay);
    });
    EventEmitter.on(EVENT_CHANGE_AUDIO, ({ name, singer, src, img }) => {
      console.log({ name, singer, src, img });
      setBasic({ name, singer, src, img });
    });
    return () => {
      // 取消订阅
      EventEmitter.off(EVENT_DISPLAY_AUDIO);
      EventEmitter.off(EVENT_OPEN_AUDIO);
      EventEmitter.off(EVENT_CHANGE_AUDIO);
    }
  }, []);

  useLayoutEffect(() => {
    audioRef.current.volume = 0.4;
    if (audioRef.current && basic.src) {
      audioRef.current.src = basic.src;
      audioRef.current.play();
    }
    audioRef.current.addEventListener('durationchange', durationchangeHandler);
    audioRef.current.addEventListener('timeupdate', timeupdateHandler);
    return () => {
      audioRef.current.removeEventListener('durationchange', durationchangeHandler);
      audioRef.current.removeEventListener('timeupdate', timeupdateHandler);
    }
  }, [basic.src]);

  const changePauseHandler = () => {
    if (status) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setStatus(!status);
  }

  return (
    <>
      <audio
        loop
        controls
        ref={audioRef}
        style={{ display: 'none' }}
      >
        <source src={basic.src} />
      </audio>

      <div
        className="audio-controls animated slideInUp"
        style={{
          display: display ? 'block' : 'none',
          bottom: hide ? '-60px' : '0',
        }}
      >
        <div className="audio-container">
          <div className="switch_icon">
            <img
              src={icon_arrow_right}
              width='18'
              height='18'
              style={{
                transform: `rotate(${hide ? '-0.25turn' : '0.25turn'})`,
              }}
              onClick={() => setHide(!hide)}
            />
          </div>
          <div className="controls_bar">
            <img src={icon_previous} name="left_previous" alt="previous" />
            {
              status ?
                <img src={icon_pause} name="mid_pause" alt="pause" onClick={changePauseHandler} /> :
                <img src={icon_continue} name="mid_continue" alt="continue" onClick={changePauseHandler} />
            }
            <img src={icon_next} name="right_next" alt="next" />
          </div>
          <div className="controls_img">
            <img src="https://avatars.githubusercontent.com/u/51840260?s=48&v=4" alt="" />
          </div>
          <div className="audio-bar">
            <div className="audio-bar-top">
              <span>{basic.name ?? '***'} - {basic.singer ?? '***'}</span>
              <div className="audio-bar-time-top">{ `${format(currentTime)} / ${format(duration)} ` }</div>
            </div>
            <div className="audio-bar-bottom">
              <div className="audio-bar-before" style={{ width: 240 }}>
                <div className="audio-bar-after" style={{ width: 240 * rate }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
});

export default Audio;