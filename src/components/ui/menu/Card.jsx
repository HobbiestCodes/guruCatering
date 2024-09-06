import React, { useState, useEffect } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useArray } from "../../funcs/context";

function Card({ items }) {
  const { myArray, addToArray, removeFromArray } = useArray();
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const initialQuantities = myArray.reduce((acc, item) => {
      acc[item.id] = item.quantity || 1;
      return acc;
    }, {});
    setQuantities(initialQuantities);
  }, [myArray]);

  // incrementing opr
  const handleIncrement = (id) => {
    setQuantities((prevQuantities) => {
      const newQuantity = (prevQuantities[id] || 1) + 1;
      addToArray({ id, quantity: newQuantity });
      return { ...prevQuantities, [id]: newQuantity };
    });
  };

  // decrementing opr
  const handleDecrement = (id) => {
    setQuantities((prevQuantities) => {
      const currentQuantity = prevQuantities[id] || 1;
      if (currentQuantity <= 1) {
        removeFromArray(id);
        return { ...prevQuantities, [id]: 0 };
      } else {
        const newQuantity = currentQuantity - 1;
        addToArray({ id, quantity: newQuantity });
        return { ...prevQuantities, [id]: newQuantity };
      }
    });
  };

  return (
    <div className="crdParent">
      {myArray.map((item) => (
        <div className="card" key={item.id}>
          <div className="image">
            <img src={item.image} alt="image" />
          </div>
          <div className="content">
            <h1>{item.name}</h1>
            <p>x{quantities[item.id] || 1}</p>
          </div>
          <div className="incre">
            <div
              className="modal-item-btn"
              onClick={() => handleDecrement(item.id)}
            >
              <FaMinus size={20} className="min" />
            </div>
            <div
              className="modal-item-btn"
              onClick={() => handleIncrement(item.id)}
            >
              <FaPlus size={20} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Card;
