import React from 'react';
import './dropdown.css';

const Dropdown = (props) => {
  const { title, content } = props;
  return (
    <>
      <div className="dropdown">
        <span>{ title || 'dropdown' }</span>
        <div className="dropdown-content">{ content || <div>dropdown</div> }</div> 
      </div>
    </>
  )
}

export default Dropdown;
