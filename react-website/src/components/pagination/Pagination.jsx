import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './pagination.css';
import icon_arrow_right from '../../assets/icons/arrow-right-black.svg';
import icon_arrow_left from '../../assets/icons/arrow-left-black.svg';

const Pagination = props => {
  
  const { defaultCurrent = 1, pageSize = 5, total, onChange } = props;

  const [currentIndex, setCurrentIndex] = useState(defaultCurrent);

  useEffect(() => {
    typeof onChange === 'function' && onChange({ current: currentIndex, pageSize, total });
  }, [currentIndex]);

  const clickHandler = (e) => {
    setCurrentIndex(parseInt(e.target.dataset.index));
  }

  // 上一页处理函数
  const leftHandler = () => {
    setCurrentIndex(currentIndex - 1 >= 1 ? currentIndex - 1 : 1);
  }

  // 下一页处理函数
  const rightHandler = () => {
    setCurrentIndex(currentIndex + 1 <= total ? currentIndex + 1 : total);
  }

  return (
    <div className="pagination-container">
      <ul>
        <li onClick={leftHandler} title="上一页">
          <img src={icon_arrow_left} draggable={false} />
        </li>
        {
          Array.from({ length: Math.ceil(total / pageSize) }, (_v, k) => k + 1).map((item, index) => {
            return <li
              key={uuidv4()}
              onClick={clickHandler}
              data-index={item}
              className={currentIndex === item ? 'select' : ''}
              title={`第${item}页`}
            >
              {item}
            </li>
          })
        }
        <li onClick={rightHandler} title="下一页">
          <img src={icon_arrow_right} draggable={false} />
        </li>
      </ul>
    </div>
  )
}

export default Pagination;