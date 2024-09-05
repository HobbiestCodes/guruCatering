import { useState } from "react";
import "./styles.scss";
import { IoIosArrowUp, IoIosArrowRoundForward } from "react-icons/io";

const Modal = ({
  isOpen,
  onClose,
  children,
  status,
  isOrderPlaced,
  setIsOrderPlaced,
  triggerFormSubmit,
  items,
  setItemsToShow,
  className,
}) => {
  const modalStyle = {
    height: isOpen ? "auto" : "45px",
  };

  return (
    // <div
    //   className={`${className ? "className" : ""} modal`}
    //   style={{ ...modalStyle, zIndex: 999 }}
    // >
    //   <div className="top-of-modal" onClick={onClose}>
    //     <h3>Your plate </h3>
    //     {status.status === 200 && (
    //       <span
    //         style={{
    //           color: status.status === 200 ? "green" : "red",
    //         }}
    //       >
    //         {status.message}
    //       </span>
    //     )}
    //     <div className="close-btn">
    //       <IoIosArrowUp
    //         height={18}
    //         width={18}
    //         style={
    //           isOpen
    //             ? { transform: "rotate(0deg)", transition: "0.2s all ease" }
    //             : { transform: "rotate(180deg)", transition: "0.2s all ease" }
    //         }
    //       />
    //     </div>
    //   </div>
    //   {items.length > 0 ? (
    //     <>{children}</>
    //   ) : (
    //     <h1
    //       style={{
    //         textAlign: "center",
    //         fontSize: "16px",
    //         marginBottom: "10px",
    //         color: "grey",
    //         fontWeight: "300",
    //       }}
    //     >
    //       Your plate is empty!
    //     </h1>
      // )}
    // </div>
    <>
    </>
  );
};

export default Modal;
