import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './audio.css';
import EventEmitter from '../../utils/EventEmitter.js';
import {
  EVENT_DISPLAY_AUDIO,
  EVENT_OPEN_AUDIO,
  EVENT_CHANGE_AUDIO,
  EVENT_SWITCH_PREV_MUSIC,
  EVENT_SWITCH_NEXT_MUSIC,
} from '../../utils/events';
import { throttle } from '../../utils/common';
/** 引入图标 */
import icon_pause from  '../../assets/icons/pause.svg';
import icon_continue from  '../../assets/icons/continue.svg';
import icon_next from  '../../assets/icons/next.svg';
import icon_previous from '../../assets/icons/previous.svg';
import icon_arrow_right from '../../assets/icons/arrow-right.svg';

// 格式化歌曲时间 比如 221s => 03:41
const format = (time = 0) => {
  if (typeof time !== 'number' || time <= 0 || time >= 3599) return '00:00';
  time = Math.round(time);
  let front = Math.floor(time / 60), back = time % 60;
  return `${front >= 10 ? front : '0' + front}:${back >= 10 ? back : '0' + back}`;
}

const Audio = React.memo(() => {
  const [basic, setBasic] = useState({
    musicName: '',
    singer: '',
    src: '',
    img: '',
  });
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

  // 当前歌曲播放完成处理的事件
  const endedHandler = function () {
    // 切换下一首音乐
    EventEmitter.emit(EVENT_SWITCH_NEXT_MUSIC, basic);
  }

  useEffect(() => {
    // 监听事件
    EventEmitter.on(EVENT_DISPLAY_AUDIO, isDisplay => {
      setDisplay(isDisplay);
    });
    EventEmitter.on(EVENT_OPEN_AUDIO, isHide => {
      setHide(!isHide);
    });
    EventEmitter.on(EVENT_CHANGE_AUDIO, ({ musicName = '', singer = '', src = '', img = '' }) => {
      setBasic({ musicName, singer, src, img });
    });
    return () => {
      // 该组件卸载则取消订阅
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
    audioRef.current.addEventListener('ended', endedHandler);
    return () => {
      audioRef.current.removeEventListener('durationchange', durationchangeHandler);
      audioRef.current.removeEventListener('timeupdate', timeupdateHandler);
      audioRef.current.removeEventListener('ended', endedHandler);
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

  // 节流处理 上一首和下一首按钮点击事件
  const switchMusicHandler = throttle((e) => {
    const name = e.target.name;
    if (name === 'left_previous') {
      EventEmitter.emit(EVENT_SWITCH_PREV_MUSIC, basic);
    } else if (name === 'right_next') {
      console.log(basic);
      EventEmitter.emit(EVENT_SWITCH_NEXT_MUSIC, basic);
    }
  }, 300);

  let isMousePress = false;

  const start = e => {
    // console.log(e);
    isMousePress = true;
    // 禁止默认事件（避免鼠标拖拽进度点的时候选中文字）
    if (e && e.preventDefault) {
      e.preventDefault();
    } else {
      e.returnValue = false;
    }
  }

  const move = e => {
    if (isMousePress) {
      console.log(e.clientX);
    }
  }

  const end = e => {
    // 这里注意鼠标按下和抬起会触发 click 事件
    isMousePress = false;
  }

  const musicClick = e => {
    const { offsetX } = e.nativeEvent;
    if (audioRef.current) {
      const { duration } = audioRef.current;
      const tmp = Math.round(duration * (offsetX / 240).toFixed(2));
      audioRef.current.currentTime = tmp;
      setCurrentTime(tmp);
      setRate((offsetX / 240).toFixed(2));
    }
  }

  useLayoutEffect(() => {
    
  }, []);

  return (
    <>
      <audio
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
            <div className="poptip" data-poptip="上一首">
              <img src={icon_previous} name="left_previous" alt="previous" onClick={switchMusicHandler} />
            </div>
            {
              status ?
                <div className="poptip" data-poptip="暂停">
                  <img
                    src={icon_pause}
                    name="mid_pause"
                    alt="pause"
                    onClick={changePauseHandler}
                  />
                </div> :
                <div className="poptip" data-poptip="播放">
                  <img src={icon_continue} name="mid_continue" alt="continue" onClick={changePauseHandler} />
                </div>
            }
            <div className="poptip" data-poptip="下一首">
              <img src={icon_next} name="right_next" alt="next" onClick={switchMusicHandler} />
            </div>
          </div>
          <div className="controls_img">
            <img src="https://avatars.githubusercontent.com/u/51840260?s=48&v=4" alt="" />
          </div>
          <div className="audio-bar">
            <div className="audio-bar-top">
              <span>{basic.musicName ?? '***'} - {basic.singer ?? '***'}</span>
              <div className="audio-bar-time-top">{ `${format(currentTime)} / ${format(duration)} ` }</div>
            </div>
            <div className="audio-bar-bottom">
              <div
                className="audio-bar-before"
                style={{ width: 240 }}
                onMouseDown={start}
                onMouseMove={move}
                onMouseUp={end}
                onClick={musicClick}
              >
                <div
                  className="audio-bar-after"
                  style={{ width: 240 * rate }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
});

export default Audio;