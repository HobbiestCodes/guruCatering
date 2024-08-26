import React from 'react'
import './styles.scss';
import { FaMinus, FaPlus } from "react-icons/fa6";

function Cards({item, setItemsToShow, itemsToShow}) {
  return (
    <div className="modal-item" key={item.id}>
    <img src={item.img} alt={item.name + " image"} />
    <div className="modal-item-texts">
      <div className="modal-item-name">{item.name}</div>
      <div className="modal-item-quantity">x1</div>
    </div>
    <div className="modal-item-btns">
      <div className="modal-item-btn" onClick={() => {}}>
        <FaMinus className='min' />
      </div>
      <div className="modal-item-btn">
        <FaPlus />
      </div>
    </div>
  </div>
  )
}

export default Cards