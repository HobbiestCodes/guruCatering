import "./styles.scss";
import { IoIosArrowUp, IoIosArrowRoundForward} from "react-icons/io";

const Modal = ({ isOpen, onClose, children, items, setItemsToShow }) => {
  const modalStyle = {
      height: isOpen ? 'auto' : '45px',
  };

  return (
    <div className="modal" style={{ ...modalStyle, zIndex: 999 }}>
      <div className="top-of-modal" onClick={onClose}>
        <h3>Your plate</h3>
        <div className="close-btn">
          <IoIosArrowUp height={18} width={18} style={isOpen ? { transform: 'rotate(0deg)', transition: '0.2s all ease' } : {transform: 'rotate(180deg)', transition: '0.2s all ease'}} />
        </div>
      </div>
      {items.length > 0 ? (
        <>
        {children}
        </>
      ) : <h1 style={{textAlign: 'center', fontSize: '16px', marginBottom: '10px', color: 'grey', fontWeight: '300'}}>Your plate is empty!</h1>}
    {items.length > 0 ? (
      <div className="top-of-modal down">
          <h3 className="clear" onClick={() => setItemsToShow([])}>clear</h3>
          <button className={`proceed ${items.length > 4 ? '' : 'notAllowed'}`}>Place order <IoIosArrowRoundForward size={30} />
          <div className="tolTip">Minimum order is 5</div>
          </button>
      </div>
        ) : null}
    </div>
  );
};

export default Modal;
