import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { LiaTimesSolid } from "react-icons/lia";
import { useArray } from "../../funcs/context";

function Card({ items }) {
  const { myArray, isInArray } = useArray();
  const [itemCount, setItemCount] = useState(1);

  // Increment function
  const incrementCount = () => {
    setItemCount((prevCount) => prevCount + 1);
  };

  const handleDecrement = function (Id) {
    const index = myArray.indexOf(Id);
    if (index > -1) {
      myArray.splice(index, 1);
      setItemCount((prevCount) => prevCount - 1);
    }
  };
  const handleIncrement = function (Id) {
    myArray.push(Id);
  };

  return (
    <div className="crdParent">
      {items.map((item, index) => (
        <div className="card" key={index}>
          <div className="image">
            <img src={item.image} alt="image" />
          </div>
          <div className="content">
            <h1>{item.name}</h1>
            <p>x{itemCount}</p>
          </div>
          <div className="incre">
            <div
              className="modal-item-btn"
              onClick={() => handleDecrement(item._id)}
            >
              <FaMinus size={20} className="min" />
            </div>
            <div className="modal-item-btn" onClick={incrementCount}>
              <FaPlus size={20} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Card;
