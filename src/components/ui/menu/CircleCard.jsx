import React from "react";
import { useArray } from "../../funcs/context.jsx";
import "./styles.scss";

function CircleCard({ id, image, title, description }) {
  const { myArray, addToArray, removeFromArray, isInArray } = useArray();

  const handleAdd = (item) => {
    if (isInArray(item.id)) {
      return null;
    }
    addToArray({ ...item, quantity: 1 });
  };

  const handleRemove = (item) => {
    removeFromArray(item.id);
  };

  const item = { id, image, title, description };
  const itemIsInArray = isInArray(id);

  return (
    <div className="bro">
      <div className="circle">
        <img src={image} alt="food image" />
      </div>
      <div className="content">
        <h1>{title}</h1>
        <p>{description.slice(0, 100)}</p>
        {itemIsInArray ? (
          <>
            <button className="" onClick={() => handleRemove(item)}>
              Remove from plate
            </button>
            <button className="added" disabled>
              Added to plate!
            </button>
          </>
        ) : (
          <button className="button" onClick={() => handleAdd(item)}>
            Add to plate
          </button>
        )}
      </div>
    </div>
  );
}

export default CircleCard;
