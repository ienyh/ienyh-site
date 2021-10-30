import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './search.css';
import EventEmitter from '../../../utils/EventEmitter.js';
import { EVENT_CHANGE_HEADER, EVENT_DISPLAY_FOOTER } from '../../../utils/events';

import icon_search from '../../../assets/icons/search.svg';
import icon_baidu from '../../../assets/icons/baidu.svg';
import icon_google from '../../../assets/icons/google.svg';
import icon_bing from '../../../assets/icons//bing.svg';
import icon_npm from '../../../assets/icons/npm.svg';
import icon_docker from '../../../assets/icons/docker.svg';

import Notification from '../../../components/notification/Notification';

const typeOptions = [
  { name: 'baidu', url: 'https://www.baidu.com/s?q1=', icon: icon_baidu },
  { name: 'google', url: '', icon: icon_google },
  { name: 'bing', url: 'https://cn.bing.com/search?q=', icon: icon_bing },
  { name: 'npm', url: 'https://www.npmjs.com/search?q=', icon: icon_npm },
  { name: 'docker', url: 'https://hub.docker.com/search?type=image&q=', icon: icon_docker },
]

const Search = React.memo(() => {
  const [display, setDisplay] = useState(true);
  const [current, setCurrent] = useState(typeOptions[0]);
  const [searchText, setSearchText] = useState('');

  const clickHandler = () => {
    setDisplay(!display);
  }

  const keydownHandler = (e) => {
    // e.keyCode === 13    enter 键
    if (e.keyCode === 13) {
      searchClickHandler();
    }
  }

  useEffect(() => {
    // 触发事件
    EventEmitter.emit(EVENT_CHANGE_HEADER, { title: '', backdrop: false, headerHeight: '100vh', text: '' });
    EventEmitter.emit(EVENT_DISPLAY_FOOTER, false);

    window.addEventListener('keydown',keydownHandler, false);
    return () => {
      EventEmitter.emit(EVENT_DISPLAY_FOOTER, true);
      window.removeEventListener('keydown', keydownHandler);
    }
  }, []);

  const searchClickHandler = () => {
    const { url } = current;
    window.open(url + searchText, '_blank');
  }

  return (
    <>
      <div className="search">
        <div className="search-input-container">
          <div className="search-input">
            <div className="search-left-type" onClick={ clickHandler }>
              <img src={current.icon} />
            </div>
            <input type="text" value={searchText} onChange={ (e) => setSearchText(e.target.value)}/>
            <div className="search-right-icon" onClick={ searchClickHandler }>
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

      <Notification type="error" />
    </>
  )
})

export default Search;