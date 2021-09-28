import React, { useEffect } from 'react';
import './search.css';
import EventEmitter from '../../../utils/EventEmitter.js';
import { EVENT_CHANGE_HEADER, EVENT_DISPLAY_FOOTER } from '../../../utils/constant';
import icon_search from '../../../assets/icons/search.svg';


const Search = React.memo(() => {
  useEffect(() => {
    // 触发事件
    EventEmitter.emit(EVENT_CHANGE_HEADER, { title: SearchInput(), backdrop: true, headerHeight: 100 });
    EventEmitter.emit(EVENT_DISPLAY_FOOTER, false);
    return () => {
      EventEmitter.emit(EVENT_DISPLAY_FOOTER, true);
    }
  }, []);

  return (
    <>
      <div></div>
    </>
  )
})

function SearchInput () {
  return (
    <div className="container search-input-container">
      <div className="search-input">
        <div className="search-left-type">
          <img src='//www.baidu.com/img/baidu_85beaf5496f291521eb75ba38eacbd87.svg' alt="" />
        </div>
        <input type="text" />
        <div className="search-right-icon">
          <img src={icon_search} alt="" />
          <span>点击搜索</span>
        </div>
      </div>

      <div className="type-container">
        <img src='//www.baidu.com/img/baidu_85beaf5496f291521eb75ba38eacbd87.svg' style={{ width: 36, height: 36, marginRight: '2rem' }} />
        <img src='//www.baidu.com/img/baidu_85beaf5496f291521eb75ba38eacbd87.svg' style={{ width: 36, height: 36, marginRight: '2rem' }} />
        <img src='//www.baidu.com/img/baidu_85beaf5496f291521eb75ba38eacbd87.svg' style={{ width: 36, height: 36, marginRight: '2rem' }} />
      </div>
    </div>
  )
}

export default Search;