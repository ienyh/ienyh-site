import React, { useEffect } from 'react';
import './search.css';
import EventEmitter from '../../../utils/EventEmitter.js';
import { EVENT_CHANGE_HEADER } from '../../../utils/constant';
import icon_search from '../../../assets/icons/search.svg';

const Search = React.memo(() => {

  useEffect(() => {
    // 触发事件
    EventEmitter.emit(EVENT_CHANGE_HEADER, { title: 'Search', backdrop: true });
    console.log('useEffect')
    return () => {
      console.log('useEffect return')

    }
  }, []);

  return (
    <>
      <div className="container">
        <div className="search-input">
          <input type="text" />
          <div className="search-icon">
            <img src={icon_search} alt=""/>
          </div>
        </div>
      </div>
    </>
  )
})

export default Search;