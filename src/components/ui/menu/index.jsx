import React, { useEffect, useRef, useState } from "react";
import "./styles.scss";
import Card from "./Card";
import Navbar from "../navbar/index";
import Modal from "../modal";
import { AnimatePresence, motion } from "framer-motion";
import useAuth from "../../funcs/useAuth";
import Cards from "../modal/Cards";
import { IoIosArrowRoundForward } from "react-icons/io";
import axios from "axios";

function MenuItems() {
  const [itemsToShow, setItemsToShow] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState({ status: "", message: "" });
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const formRef = useRef(null);
  const { user } = useAuth();

  // console.log(itemsToShow);
  const handleClose = () => setIsModalOpen(!isModalOpen);

  const handleAddToPlate = (item) => {
    setItemsToShow((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
  };

  const triggerFormSubmit = (e) => {
    e.preventDefault();
    console.log("Form-Submit-Trigger");
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  const validatePhone = (phone) => {
    const phonePattern = /^[0-9]{10}$/;
    return phonePattern.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!user && !user._id) {
    //   return setStatus({ status: 500, message: "Please login first!" });
    // } else if (itemsToShow === 0) {
    //   return setStatus({
    //     status: 400,
    //     message: "Please first add food to place order!",
    //   });
    // } else if (!address || !phoneNumber || !date) {
    //   return setStatus({ status: 401, message: "Please fill all the fields!" });
    // } else if (!validatePhone(phoneNumber)) {
    //   return setStatus({
    //     status: 402,
    //     message: "Phone number should be in 10 digit",
    //   });
    // }
    // else {
    // console.log("Form submitted", {
    //   user,
    //   phoneNumber,
    //   address,
    //   date,
    //   itemsToShow,
    // });
    setStatus({ status: "", message: "" });
    const res = await axios.post("http://localhost:8080/create-food-order", {
      userId: user._id,
      address,
      phoneNumber,
      orders: itemsToShow,
      date,
    });
    console.log(res);
    if (res.status == 200) {
      setStatus({ status: 200, message: "Order placed successfully!" });
      setPhoneNumber("");
      setAddress("");
      setDate("");
      setItemsToShow([]);
      setIsOrderPlaced(() => false);
      setInterval(() => setStatus({ status: "", message: "" }), 5000);
    }
    if (res.status == 500) {
      setStatus({
        status: 500,
        message: "Something went wrong!",
      });
    }
    // }
  };
  useEffect(() => {
    // Open the modal when itemsToShow is updated
    setIsModalOpen(itemsToShow.length > 0);
  }, [itemsToShow]);

  return (
    <>
      {/* <div className="container"> */}
      <Modal
        status={status}
        isOpen={isModalOpen}
        itemsToShow={itemsToShow}
        onClose={handleClose}
        isOrderPlaced={isOrderPlaced}
        setIsOrderPlaced={setIsOrderPlaced}
        triggerFormSubmit={triggerFormSubmit}
        items={itemsToShow}
        setItemsToShow={setItemsToShow}
      >
        <AnimatePresence>
          {isOrderPlaced ? (
            <motion.form
              id="form"
              ref={formRef}
              onSubmit={handleSubmit}
              initial={{ x: -500, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 1.2,
                type: "spring",
              }}
            >
              {status && (
                <div className="container">
                  <label
                    htmlFor="error"
                    style={{
                      color: status.status === 200 ? "green" : "red",
                    }}
                  >
                    {status.message}
                  </label>
                </div>
              )}
              <div className="container">
                <label htmlFor="phone-number">Phone Number:</label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) =>
                    setPhoneNumber(
                      e.target.value.replace(/[^\d]/g, "").slice(0, 10)
                    )
                  }
                  className="inputField"
                  name="phone-number"
                />
              </div>
              <div className="container">
                <label htmlFor="address">Address:</label>
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  type="text"
                  className="inputField"
                  name="address"
                />
              </div>
              <div className="container">
                <label htmlFor="Date">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="inputField"
                />
              </div>
            </motion.form>
          ) : (
            <motion.div
              id="modalItems"
              className="modal-items"
              initial={{ x: 500, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 500, opacity: 0 }}
              transition={{
                duration: 1.2,
                type: "spring",
              }}
            >
              {itemsToShow.length > 0 &&
                itemsToShow.map((item) => (
                  <Cards
                    item={item}
                    key={item.id}
                    setItemsToShow={setItemsToShow}
                  />
                ))}
            </motion.div>
          )}
          {itemsToShow.length > 0 ? (
            <div className="top-of-modal down">
              <h3
                className="clear"
                onClick={() => {
                  setItemsToShow([]);
                  setIsOrderPlaced(() => false);
                }}
              >
                clear
              </h3>
              <button
                type="submit"
                className={`proceed ${
                  itemsToShow.length > 4 ? "" : "notAllowed"
                }`}
                style={{
                  backgroundColor:
                    isOrderPlaced && itemsToShow.length > 4 ? "#54d661" : "",
                }}
                onClick={(e) => {
                  setIsOrderPlaced(() => true);
                  address && phoneNumber && date && triggerFormSubmit(e);
                }}
              >
                Place order <IoIosArrowRoundForward size={30} />
                <div className="tolTip">Minimum order is 5</div>
              </button>
            </div>
          ) : null}
        </AnimatePresence>
      </Modal>
      {/* </div> */}
      <div className="parent">
        <div className="upper">
          <Navbar />
        </div>
        <div className="child">
          <div className="bigBox">
            {foodItems.map((item, index) => (
              <Card
                key={index}
                item={item}
                handleAddToPlate={handleAddToPlate}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default MenuItems;

const foodItems = [
  {
    id: 1,
    name: "Paneer Tikka",
    description: "Grilled paneer cubes marinated with Indian spices.",
    price: 300,
    category: "veg",
    img: "https://images.unsplash.com/photo-1586511925558-a4c6376fe65f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=60",
    rating: 4,
  },
  {
    id: 2,
    name: "Chicken Biryani",
    description: "Aromatic basmati rice cooked with marinated chicken.",
    price: 450,
    category: "non-veg",
    img: "https://images.unsplash.com/photo-1586511925558-a4c6376fe65f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=60",
    rating: 4,
  },
  {
    id: 3,
    name: "Masala Dosa",
    description: "Crispy dosa filled with spicy potato filling.",
    price: 150,
    category: "veg",
    img: "https://images.unsplash.com/photo-1586511925558-a4c6376fe65f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=60",
    rating: 4,
  },
  {
    id: 4,
    name: "Mutton Rogan Josh",
    description: "Tender mutton pieces cooked in a rich gravy.",
    price: 500,
    category: "non-veg",
    img: "https://images.unsplash.com/photo-1586511925558-a4c6376fe65f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=60",
    rating: 4,
  },
  {
    id: 5,
    name: "Chole Bhature",
    description: "Spicy chickpeas served with fried bread.",
    price: 200,
    category: "veg",
    img: "https://images.unsplash.com/photo-1586511925558-a4c6376fe65f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=60",
    rating: 4,
  },
  {
    id: 6,
    name: "Pav Bhaji",
    description: "Mixed vegetable curry served with buttered bread.",
    price: 180,
    category: "veg",
    img: "https://images.unsplash.com/photo-1586511925558-a4c6376fe65f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=60",
    rating: 4,
  },
  {
    id: 7,
    name: "Fish Curry",
    description: "Fish cooked in a spicy and tangy curry.",
    price: 400,
    category: "non-veg",
    img: "https://images.unsplash.com/photo-1586511925558-a4c6376fe65f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=60",
    rating: 4,
  },
  {
    id: 8,
    name: "Veg Fried Rice",
    description: "Stir-fried rice with vegetables and soy sauce.",
    price: 250,
    category: "veg",
    img: "https://images.unsplash.com/photo-1586511925558-a4c6376fe65f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=60",
    rating: 4,
  },
  {
    id: 9,
    name: "Butter Chicken",
    description: "Chicken cooked in a creamy tomato-based sauce.",
    price: 450,
    category: "non-veg",
    img: "https://images.unsplash.com/photo-1586511925558-a4c6376fe65f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=60",
    rating: 4,
  },
  {
    id: 10,
    name: "Aloo Paratha",
    description: "Stuffed flatbread with spiced mashed potatoes.",
    price: 120,
    category: "veg",
    img: "https://images.unsplash.com/photo-1586511925558-a4c6376fe65f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=60",
    rating: 4,
  },
  {
    id: 11,
    name: "Dal Makhani",
    description: "Black lentils cooked in a creamy tomato sauce.",
    price: 220,
    category: "veg",
    img: "https://images.unsplash.com/photo-1586511925558-a4c6376fe65f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=60",
    rating: 4,
  },
  {
    id: 12,
    name: "Tandoori Chicken",
    description: "Grilled chicken marinated in yogurt and spices.",
    price: 350,
    category: "non-veg",
    img: "https://images.unsplash.com/photo-1586511925558-a4c6376fe65f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=60",
    rating: 4,
  },
  {
    id: 13,
    name: "Gobi Manchurian",
    description: "Fried cauliflower tossed in a spicy sauce.",
    price: 180,
    category: "veg",
    img: "https://images.unsplash.com/photo-1586511925558-a4c6376fe65f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=60",
    rating: 4,
  },
  {
    id: 14,
    name: "Prawn Curry",
    description: "Prawns cooked in a coconut-based curry.",
    price: 500,
    category: "non-veg",
    img: "https://images.unsplash.com/photo-1586511925558-a4c6376fe65f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=60",
    rating: 4,
  },
  {
    id: 15,
    name: "Palak Paneer",
    description: "Paneer cubes cooked in a spinach gravy.",
    price: 280,
    category: "veg",
    img: "https://images.unsplash.com/photo-1586511925558-a4c6376fe65f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=60",
    rating: 4,
  },
  {
    id: 16,
    name: "Lamb Kebab",
    description: "Spiced minced lamb skewers grilled to perfection.",
    price: 420,
    category: "non-veg",
    img: "https://images.unsplash.com/photo-1586511925558-a4c6376fe65f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=60",
    rating: 4,
  },
  {
    id: 17,
    name: "Veg Pulao",
    description: "Rice cooked with vegetables and aromatic spices.",
    price: 240,
    category: "veg",
    img: "https://images.unsplash.com/photo-1586511925558-a4c6376fe65f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=60",
    rating: 4,
  },
  {
    id: 18,
    name: "Mutton Biryani",
    description: "Basmati rice cooked with spiced mutton pieces.",
    price: 550,
    category: "non-veg",
    img: "https://images.unsplash.com/photo-1586511925558-a4c6376fe65f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=60",
    rating: 4,
  },
  {
    id: 19,
    name: "Paneer Butter Masala",
    description: "Paneer cubes in a rich and creamy tomato gravy.",
    price: 320,
    category: "veg",
    img: "https://images.unsplash.com/photo-1586511925558-a4c6376fe65f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=60",
    rating: 4,
  },
  {
    id: 20,
    name: "Chicken Tikka Masala",
    description: "Grilled chicken pieces in a spicy tomato-based sauce.",
    price: 380,
    category: "non-veg",
    img: "https://images.unsplash.com/photo-1586511925558-a4c6376fe65f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=60",
    rating: 4,
  },
];
