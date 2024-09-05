import React, { useEffect } from 'react'
import './styles.scss';
import { useArray } from '../../funcs/context.jsx';

function CircleCard({id, image, title, description}) {

  const { addToArray, isInArray } = useArray();
  // console.log(myArray);
  const handleAdd = (id) => {
    if (isInArray(id)) {
      return null;
      
    }
    addToArray(id);
  }

  return (
    <>
    <div className="bro">
    <div className='circle'>
        <img src={image} alt="food image" />
    </div>
    <div className="content">
        <h1>{title}</h1>
        <p>{description.slice(0, 100)}</p>
        <button className={isInArray(id) ? "added" : "button"} onClick={() => handleAdd(id)}>
          {isInArray(id) ? "Added to plate!" : "Add to plate"}
          </button>
    </div>
    </div>
    </>
  )
}

export default CircleCard