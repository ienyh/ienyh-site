import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './search.css';
import EventEmitter from '../../../utils/EventEmitter.js';
import { EVENT_CHANGE_HEADER, EVENT_DISPLAY_FOOTER } from '../../../utils/constant';

import icon_search from '../../../assets/icons/search.svg';
import icon_baidu from '../../../assets/icons/baidu.svg';
import icon_google from '../../../assets/icons/google.svg';
import icon_npm from '../../../assets/icons/npm.svg';
import icon_docker from '../../../assets/icons/docker.svg';


const typeOptions = [
  { name: 'baidu', url: '', icon: icon_baidu },
  { name: 'google', url: '', icon: icon_google },
  { name: 'npm', url: '', icon: icon_npm },
  { name: 'docker', url: '', icon: icon_docker },
]

const Search = React.memo(() => {
  const [display, setDisplay] = useState(true);
  const [current, setCurrent] = useState(typeOptions[0]);

  const clickHandler = () => {
    setDisplay(!display);
  }

  useEffect(() => {
    // 触发事件
    EventEmitter.emit(EVENT_CHANGE_HEADER, { title: '', backdrop: false, headerHeight: 100 });
    EventEmitter.emit(EVENT_DISPLAY_FOOTER, false);
    return () => {
      EventEmitter.emit(EVENT_DISPLAY_FOOTER, true);
    }
  }, []);

  return (
    <>
      <div className="search">
        <div className="search-input-container">
          <div className="search-input">
            <div className="search-left-type" onClick={ clickHandler }>
              <img src={current.icon} />
            </div>
            <input type="text" />
            <div className="search-right-icon">
              <img src={icon_search} alt="" />
              <span>点击搜索</span>
            </div>
          </div>

          <div className="type-container" style={{ display: display ? 'flex' : 'none' }}>
            {
              typeOptions.map(item => {
                return <div key={uuidv4()} onClick={() => { setCurrent(item) }}>
                  <img src={item.icon}/>
                </div>
              })
            }
          </div>
        </div>
      </div>
    </>
  )
})

export default Search;