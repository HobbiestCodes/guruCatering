import React from "react";
import "./styles.scss";

function Card({ item, handleAddToPlate }) {
  const { name, description, price, category, img, rating } = item;

  return (
    <div className="box">
      <img src={img} alt={name} />

      <div className="content">
        <h1>{name}</h1>
        <p>{description}</p>

        <div className="more">
          <p>
            Category: <span>{category}</span>
          </p>
          <p>
            Price: <span>Rs. {price}</span>
          </p>
          <p>
            Rating: <span>{rating}</span>
          </p>
        </div>
        <button onClick={() => handleAddToPlate(item)}>Add to plate</button>
      </div>
    </div>
  );
}

export default Card;
