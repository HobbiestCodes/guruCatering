import { IoClose } from "react-icons/io5";
import "./styles.scss";
import eg from "/assets/food 1.png";

const Modal = ({ isOpen, onClose, children }) => {
  const modalStyle = {
    display: isOpen ? "block" : "none", // Show modal if isOpen is true, otherwise hide it
  };

  return (
    <div className="modal" style={{ ...modalStyle, zIndex: 999 }}>
      <div className="top-of-modal">
        <h3>Your Plate</h3>
        <div onClick={onClose} className="close-btn">
          <IoClose height={18} width={18} />
        </div>
      </div>

      {children}
    </div>
  );
};

export default Modal;
