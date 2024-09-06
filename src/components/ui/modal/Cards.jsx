import axios from "axios";
import useAuth from "../../funcs/useAuth";
import "./styles.scss";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { LiaTimesSolid } from "react-icons/lia";

function Cards({ item, setItemsToShow }) {
  const { user } = useAuth();

  const updatePlateOnDB = async (plateId, action) => {
    if (user && user._id) {
      try {
        const response = await axios.post(
          "http://localhost:8080/update-user-food-plates",
          {
            userId: user._id,
            plateId,
            action,
          }
        );
        console.log(response.data.message);
      } catch (error) {
        console.error("Error updating plate:", error);
      }
    }
  };

  const handleIncrement = async () => {
    setItemsToShow((prevItems) => {
      const updatedItems = prevItems.map((prevItem) =>
        prevItem.id === item.id
          ? { ...prevItem, quantity: (prevItem.quantity || 0) + 1 }
          : prevItem
      );
      updatePlateOnDB(item.id, "increment");

      return updatedItems;
    });
  };

  const handleDecrement = async () => {
    setItemsToShow((prevItems) => {
      const updatedItems = prevItems
        .map((prevItem) => {
          if (prevItem.id === item.id) {
            const newQuantity = prevItem.quantity - 1;
            if (newQuantity <= 0) {
              updatePlateOnDB(item.id, "remove");
              return null;
            } else {
              updatePlateOnDB(item.id, "decrement");
              return { ...prevItem, quantity: newQuantity };
            }
          }
          return prevItem;
        })
        .filter((item) => item !== null);

      return updatedItems;
    });
  };
  return (
    <div className="modal-item" key={item.id}>
      <img src={item.img} alt={`${item.name} image`} />
      <div className="modal-item-texts">
        <div className="modal-item-name">{item.name}</div>
        <div className="modal-item-quantity">x{item.quantity}</div>
      </div>
      <div className="modal-item-btns">
        <div className="modal-item-btn" onClick={handleDecrement}>
          {item.quantity === 1 ? (
            <LiaTimesSolid color="red" />
          ) : (
            <FaMinus className="min" />
          )}
        </div>
        <div className="modal-item-btn" onClick={handleIncrement}>
          <FaPlus />
        </div>
      </div>
    </div>
  );
}

export default Cards;
