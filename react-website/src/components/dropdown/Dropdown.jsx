import React from 'react';
import './dropdown.css';

const Dropdown = (props) => {
  const { title, content } = props;
  return (
    <>
      <div className="dropdown">
        <span>{ title || 'dropdown' }</span>
        <ul className="dropdown-content">{ content || <div>dropdown</div> }</ul> 
      </div>
    </>
  )
}

export default Dropdown;
