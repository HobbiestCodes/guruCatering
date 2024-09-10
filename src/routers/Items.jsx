import React from "react";
import { useLocation } from "react-router-dom";
import "../components/sass/items.scss";

function Items() {
  const location = useLocation();
  const { arry } = location.state || [];
  console.log(arry);

  return (
    <div className="items">
      <div className="crdParent">
        {arry.map((item, index) => (
          <div className="card" key={index}>
            <div className="image">
              <img src={item.image} alt="image" />
            </div>
            <div className="content">
              <h1>{item.title}</h1>
              {/* <p>x{item.quantity}</p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Items;
