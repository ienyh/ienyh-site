import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

function Index () {
  return (
    <div className="index">
      <Link to="/pages">start blog</Link>
    </div>
  )
}

export default Index;