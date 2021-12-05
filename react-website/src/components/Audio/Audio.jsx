import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import './audio.css';
import EventEmitter from '../../utils/EventEmitter.js';
import {
  EVENT_DISPLAY_AUDIO,
  EVENT_OPEN_AUDIO,
  EVENT_CHANGE_AUDIO,
  EVENT_SWITCH_PREV_MUSIC,
  EVENT_SWITCH_NEXT_MUSIC,
} from '../../utils/events';
import { throttle, isMobile } from '../../utils/common';
import Slider from '../slider/Slider';
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
  const [display, setDisplay] = useState(false); // 该组件是否显示
  const [hide, setHide] = useState(false); // 该组件是否展开
  const [status, setStatus] = useState(true); // 当前是否正在播放
  const [duration, setDuration] = useState(0); // 播放总时间
  const [currentTime, setCurrentTime] = useState(0); // 当前已播放时间
  const [rate, setRate] = useState(0); // 当前播放进度 [0, 1]
  const audioRef = useRef(); // <Audio></Audio>
  const sliderRef = useRef(); // Slider

  let isMousePress = false; // 判断进度条上鼠标或者手指是否按下


  const durationchangeHandler = function () {
    const duration = audioRef.current.duration;
    setDuration(Math.round(duration));
  }

  const timeupdateHandler = function () {
    const { currentTime, duration } = audioRef.current;
    setCurrentTime(Math.round(currentTime));
    if (currentTime && duration && !isMousePress) {
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

    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('click', musicClick, false);
      if (isMobile()) {
        slider.addEventListener('touchstart', onMouseDownHandler, false);
        slider.addEventListener('touchmove', onMouseMoveHandler, false);
        slider.addEventListener('touchend', onMouseUpHandler, false);
      } else {
        slider.addEventListener('mousedown', onMouseDownHandler, false);
        slider.addEventListener('mousemove', onMouseMoveHandler, false);
        slider.addEventListener('mouseup', onMouseUpHandler, false);
        slider.addEventListener('mouseleave', mouseleaveHandler, false);
      }
    }

    return () => {
      audioRef.current.removeEventListener('durationchange', durationchangeHandler);
      audioRef.current.removeEventListener('timeupdate', timeupdateHandler);
      audioRef.current.removeEventListener('ended', endedHandler);

      slider.removeEventListener('click', musicClick);
      if (isMobile()) {
        slider.removeEventListener('touchstart', onMouseDownHandler);
        slider.removeEventListener('touchmove', onMouseMoveHandler);
        slider.removeEventListener('touchend', onMouseUpHandler);
      } else {
        slider.removeEventListener('mousedown', onMouseDownHandler);
        slider.removeEventListener('mousemove', onMouseMoveHandler);
        slider.removeEventListener('mouseup', onMouseUpHandler);
        slider.removeEventListener('mouseleave', mouseleaveHandler);
      }
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


  // 鼠标按下
  const onMouseDownHandler = e => {
    e?.stopPropagation();
    e.preventDefault();
    isMousePress = true;
  }


  // 鼠标移动
  const onMouseMoveHandler = e => {
    if (isMousePress) {
      const { left, width } = e.target.getBoundingClientRect();
      let dotPageX;
      if (e instanceof TouchEvent) {
        // 移动端 touch 处理
        dotPageX = e.touches[0].pageX;
      } else {
        // PC 处理
        dotPageX = e.pageX;
      }
      const percent = ((dotPageX - left) / width).toFixed(2);

      if (percent > 1) setRate(1);
      else if (percent <= 0) setRate(0);
      else setRate(percent);

      // const { duration } = audioRef.current;
      // const tmp = Math.round(duration * percent);
      // setCurrentTime(tmp);
    }
  }

  // 鼠标抬起
  const onMouseUpHandler = e => {
    // 这里注意鼠标按下和抬起会触发 click 事件
    isMousePress = false;
  }

  // 鼠标离开
  const mouseleaveHandler = e => {
    isMousePress = false;
  }



  // 点击进度条
  const musicClick = e => {
    const { offsetX } = e;
    if (audioRef.current && basic.src) {
      const { duration } = audioRef.current;
      const tmp = Math.round(duration * (offsetX / 240).toFixed(2));
      audioRef.current.currentTime = tmp;
      setCurrentTime(tmp);
      setRate((offsetX / 240).toFixed(2));
    }
  }

  return (
    <>
      <audio
        ref={ audioRef }
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

            {/* 进度条 */}
            <div className="audio-bar-bottom" ref={ sliderRef }>
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