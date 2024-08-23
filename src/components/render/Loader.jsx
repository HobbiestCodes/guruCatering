import React from 'react'
import './../sass/Loader.scss';

function Loader() {
  return (
  
<div className="scene">
  <div className="wrapper">
    <div className="cube">
      <div className="faces">
        <div className="face shadow"></div>
        <div className="face bottom"></div>
        <div className="face top"></div>
        <div className="face left"></div>
        <div className="face right"></div>
        <div className="face back"></div>
        <div className="face front"></div>
      </div>
    </div>
  </div>
</div>
  )
}

export default Loader