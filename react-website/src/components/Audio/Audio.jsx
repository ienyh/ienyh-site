import React, { useEffect, useRef, useState } from 'react';
import './audio.css';
import icon_pause from  '../../assets/icons/pause.svg';
import icon_continue from  '../../assets/icons/continue.svg';
import icon_next from  '../../assets/icons/next.svg';
import icon_previous from '../../assets/icons/previous.svg';

const Audio = (props) => {
  const { src, autoplay } = props;
  console.log(props);

  const [status, setStatus] = useState(false);
  const audioRef = useRef();

  useEffect(() => {
    audioRef.current.volume = 0.3;
  }, []);

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
          <div className="controls_img">
            <img src="https://avatars.githubusercontent.com/u/51840260?s=48&v=4" alt=""/>
          </div>
          <div className="controls_bar">
            <img src={icon_previous} name="left_previous" alt="previous" />
            {
              status ? 
                <img src={icon_pause} name="mid_pause" alt="pause" onClick={changePauseHandler}/> :
                <img src={icon_continue} name="mid_continue" alt="continue" onClick={changePauseHandler}/>
            }
            <img src={icon_next} name="right_next" alt="next"/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Audio;