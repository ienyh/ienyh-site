import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './slider.css';
import { isMobile } from '../../utils/common';

const Slider = React.memo((props) => {

  const { min, max, value, vertical = false, onChange = () => { } } = props;
  if (min >= max) {
    throw new Error('[Slider]: the max must more than the min');
  }

  const [percent, setPercent] = useState(Math.round(parseInt(value) / (parseInt(max) - parseInt(min)) * 100));

  const sliderRef = useRef(); // 滑块父元素

  let isMouseBtnDown = false; // 标志鼠标或者手指是否按下

  useEffect(() => {
    console.log(props);
  }, []);

  useEffect(() => {
    typeof onChange === 'function' && onChange({
      min: parseInt(min),
      max: parseInt(max),
      value: Math.round((parseInt(max) - parseInt(min)) * percent / 100),
    });
  }, [percent]);

  const onMouseDownHandler = e => {
    e?.stopPropagation();
    e.preventDefault();
    isMouseBtnDown = true;
  }

  // 鼠标或手指移动处理函数
  const onMouseMoveHandler = e => {

    // 如果鼠标或手指按下才进行处理
    if (isMouseBtnDown) {

      const { left, width } = e.target.getBoundingClientRect();
      let dotPageX;
      if (e instanceof TouchEvent) {
        // 移动端 touch 处理
        dotPageX = e.touches[0].pageX;
      } else {
        // PC 处理
        dotPageX = e.pageX;
      }
      const res = Math.round((dotPageX - left) / width * 100);

      if (res > 100) setPercent(100);
      else if (res <= 0) setPercent(0);
      else setPercent(res);

    }
  }

  const onMouseUpHandler = () => {
    isMouseBtnDown = false;
  }

  const clickHandler = e => {
    const { width = 0 } = sliderRef?.current?.getBoundingClientRect();
    setPercent(Math.round(e.offsetX / width * 100));
  }

  useLayoutEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('click', clickHandler, false);
      if (isMobile()) {
        slider.addEventListener('touchstart', onMouseDownHandler, false);
        slider.addEventListener('touchmove', onMouseMoveHandler, false);
        slider.addEventListener('touchend', onMouseUpHandler, false);
      } else {
        slider.addEventListener('mousedown', onMouseDownHandler, false);
        slider.addEventListener('mousemove', onMouseMoveHandler, false);
        slider.addEventListener('mouseup', onMouseUpHandler, false);
      }
    }


    return () => {
      slider.removeEventListener('click', clickHandler);
      if (isMobile()) {
        slider.removeEventListener('touchstart', onMouseDownHandler);
        slider.removeEventListener('touchmove', onMouseMoveHandler);
        slider.removeEventListener('touchend', onMouseUpHandler);
      } else {
        slider.removeEventListener('mousedown', onMouseDownHandler);
        slider.removeEventListener('mousemove', onMouseMoveHandler);
        slider.removeEventListener('mouseup', onMouseUpHandler);
      }
    }

  }, []);

  return <div className="slider">
    <div className="slider-swapper">
      <div
        className="slider-road"
        ref={sliderRef}
      >
        <div className="slider-bar" style={{ left: 0, right: `${100 - percent}%` }}></div>
        <div className="slider-btn" id="slider-btn" style={{ left: `${percent}%` }}></div>
      </div>
    </div>
  </div>
});

export default Slider;
