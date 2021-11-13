import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './pagination.css';
import icon_arrow_right from '../../assets/icons/arrow-right-black.svg';
import icon_arrow_left from '../../assets/icons/arrow-left-black.svg';

const Pagination = props => {
  
  const { defaultCurrent = 1, pageSize = 5, total, onChange } = props;
  console.log(props);

  const [currentIndex, setCurrentIndex] = useState(defaultCurrent);

  useEffect(() => {
    console.log(Array.from({ length: total }, (v, k) => k + 1));
    typeof onChange === 'function' && onChange(currentIndex);
  }, [currentIndex]);

  const clickHandler = (e) => {
    setCurrentIndex(parseInt(e.target.dataset.index));
  }

  return (
    <div className="pagination-container">
      <ul>
        <li onClick={() => { setCurrentIndex(currentIndex - 1); }}>
          <img src={icon_arrow_left} draggable={false} />
        </li>
        {
          Array.from({ length: total }, (_v, k) => k + 1).map((item, index) => {
            return <li
              key={uuidv4()}
              onClick={clickHandler}
              data-index={item}
              className={ currentIndex === item ? 'select' : '' }
            >
              {item}
            </li>
          })
        }
        <li disabled onClick={() => { setCurrentIndex(currentIndex + 1); }}>
          <img src={icon_arrow_right} draggable={false} />
        </li>
      </ul>
    </div>
  )
}

export default Pagination;