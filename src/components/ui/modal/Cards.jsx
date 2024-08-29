import "./styles.scss";
import { FaMinus, FaPlus } from "react-icons/fa6";

function Cards({ item, setItemsToShow }) {
  const handleIncrement = () => {
    setItemsToShow((prevItems) =>
      prevItems.map((prevItem) =>
        prevItem.id === item.id
          ? { ...prevItem, quantity: (prevItem.quantity || 0) + 1 }
          : prevItem
      )
    );
  };

  const handleDecrement = () => {
    setItemsToShow((prevItems) =>
      prevItems.map((prevItem) =>
        prevItem.id === item.id && prevItem.quantity > 0
          ? { ...prevItem, quantity: prevItem.quantity - 1 }
          : prevItem
      )
    );
  };

  return (
    <div className="modal-item" key={item.id}>
      <img src={item.img} alt={item.name + " image"} />
      <div className="modal-item-texts">
        <div className="modal-item-name">{item.name}</div>
        <div className="modal-item-quantity">x{item.quantity}</div>
      </div>
      <div className="modal-item-btns">
        <div className="modal-item-btn" onClick={() => handleDecrement()}>
          <FaMinus className="min" />
        </div>
        <div className="modal-item-btn" onClick={() => handleIncrement()}>
          <FaPlus />
        </div>
      </div>
    </div>
  );
}

export default Cards;
