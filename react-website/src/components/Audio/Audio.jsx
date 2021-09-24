import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import './audio.css';
import icon_pause from  '../../assets/icons/pause.svg';
import icon_continue from  '../../assets/icons/continue.svg';
import icon_next from  '../../assets/icons/next.svg';
import icon_previous from '../../assets/icons/previous.svg';

const format = (time = 0) => {
  if (typeof time !== 'number' || time <= 0 || time >= 3599) return '00:00';
  time = Math.round(time);
  let front = Math.floor(time / 60), back = time % 60;
  return `${front >= 10 ? front : '0' + front}:${back >= 10 ? back : '0' + back}`;
}

const Audio = React.memo((props) => {
  const { name, singer, src, img } = props;

  const [status, setStatus] = useState(false);
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

  useLayoutEffect(() => {
    audioRef.current.volume = 0.4;
    if (audioRef.current && src) {
      audioRef.current.src = src;
      audioRef.current.play();
    }

    audioRef.current.addEventListener('durationchange', durationchangeHandler);
    audioRef.current.addEventListener('timeupdate', timeupdateHandler);
    return () => {
      audioRef.current.removeEventListener('durationchange', durationchangeHandler);
      audioRef.current.removeEventListener('timeupdate', timeupdateHandler);
    }
  }, [src]);

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
        <source src={src} />
      </audio>

      <div className="audio-controls">
        <div className="audio-container">
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
            <div className="audio-bar-top">{name ?? '***'} - {singer ?? '***'}</div>
            <div className="audio-bar-bottom">
              <div className="audio-bar-before" style={{ width: 300 }}>
                <div className="audio-bar-after" style={{ width: 300 * rate }}></div>
              </div>
              <div className="audio-bar-time">{ `${format(currentTime)} / ${format(duration)} ` }</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
});

export default Audio;