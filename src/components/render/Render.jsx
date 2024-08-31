import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import eg from "/topView.png";
// import {Model} from "./../render/Model";
import { Scroll, ScrollControls } from "@react-three/drei";
import Home from "../pages/Home";
import Modal from "../ui/modal";
import Selection from "../ui/select/index";
import CameraAnimation from "./AnimatedCam";
import { Simple } from "./Simple";
import Cards from "../ui/modal/Cards";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowRoundForward } from "react-icons/io";
import axios from "axios";
import useAuth from "../funcs/useAuth";

function Render() {
  const [itemsToShow, setItemsToShow] = useState([]);
  // const [resData, setResData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState({ status: "", message: "" });
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const formRef = useRef(null);
  const { user } = useAuth();

  const foodItems = [
    {
      id: 1,
      name: "Paneer Tikka",
      description: "Grilled paneer cubes marinated with Indian spices.",
      price: 300,
      category: "veg",
      img: eg,
    },
    {
      id: 2,
      name: "Chicken Biryani",
      description: "Aromatic basmati rice cooked with marinated chicken.",
      price: 450,
      category: "non-veg",
      img: eg,
    },
    {
      id: 3,
      name: "Masala Dosa",
      description: "Crispy dosa filled with spicy potato filling.",
      price: 150,
      category: "veg",
      img: eg,
    },
    {
      id: 4,
      name: "Mutton Rogan Josh",
      description: "Tender mutton pieces cooked in a rich gravy.",
      price: 500,
      category: "non-veg",
      img: eg,
    },
    {
      id: 5,
      name: "Chole Bhature",
      description: "Spicy chickpeas served with fried bread.",
      price: 200,
      category: "veg",
      img: eg,
    },
    {
      id: 6,
      name: "Pav Bhaji",
      description: "Mixed vegetable curry served with buttered bread.",
      price: 180,
      category: "veg",
      img: eg,
    },
    {
      id: 7,
      name: "Fish Curry",
      description: "Fish cooked in a spicy and tangy curry.",
      price: 400,
      category: "non-veg",
      img: eg,
    },
    {
      id: 8,
      name: "Veg Fried Rice",
      description: "Stir-fried rice with vegetables and soy sauce.",
      price: 250,
      category: "veg",
      img: eg,
    },
    {
      id: 9,
      name: "Butter Chicken",
      description: "Chicken cooked in a creamy tomato-based sauce.",
      price: 450,
      category: "non-veg",
      img: eg,
    },
    {
      id: 10,
      name: "Aloo Paratha",
      description: "Stuffed flatbread with spiced mashed potatoes.",
      price: 120,
      category: "veg",
      img: eg,
    },
    {
      id: 11,
      name: "Dal Makhani",
      description: "Black lentils cooked in a creamy tomato sauce.",
      price: 220,
      category: "veg",
      img: eg,
    },
    {
      id: 12,
      name: "Tandoori Chicken",
      description: "Grilled chicken marinated in yogurt and spices.",
      price: 350,
      category: "non-veg",
      img: eg,
    },
    {
      id: 13,
      name: "Gobi Manchurian",
      description: "Fried cauliflower tossed in a spicy sauce.",
      price: 180,
      category: "veg",
      img: eg,
    },
    {
      id: 14,
      name: "Prawn Curry",
      description: "Prawns cooked in a coconut-based curry.",
      price: 500,
      category: "non-veg",
      img: eg,
    },
    {
      id: 15,
      name: "Palak Paneer",
      description: "Paneer cubes cooked in a spinach gravy.",
      price: 280,
      category: "veg",
      img: eg,
    },
    {
      id: 16,
      name: "Lamb Kebab",
      description: "Spiced minced lamb skewers grilled to perfection.",
      price: 420,
      category: "non-veg",
      img: eg,
    },
    {
      id: 17,
      name: "Veg Pulao",
      description: "Rice cooked with vegetables and aromatic spices.",
      price: 240,
      category: "veg",
      img: eg,
    },
    {
      id: 18,
      name: "Mutton Biryani",
      description: "Basmati rice cooked with spiced mutton pieces.",
      price: 550,
      category: "non-veg",
      img: eg,
    },
    {
      id: 19,
      name: "Paneer Butter Masala",
      description: "Paneer cubes in a rich and creamy tomato gravy.",
      price: 320,
      category: "veg",
      img: eg,
    },
    {
      id: 20,
      name: "Chicken Tikka Masala",
      description: "Grilled chicken pieces in a spicy tomato-based sauce.",
      price: 380,
      category: "non-veg",
      img: eg,
    },
  ];

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
    // console.log(res);
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

  const triggerFormSubmit = (e) => {
    e.preventDefault();
    console.log("hi");
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  const handleClose = () => setIsModalOpen(!isModalOpen);

  useEffect(() => {
    // Open the modal when itemsToShow is updated
    setIsModalOpen(itemsToShow.length > 0);
  }, [itemsToShow]);

  // useEffect(() => {
  //   const fetchUsersFoodOrdersById = async () => {
  //     const res = await axios.get("http://localhost:8080/user-food-orders", {
  //       userId: user._id,
  //     });
  //     if (res) setResData(res);
  //   };
  //   if (!resData) fetchUsersFoodOrdersById();
  //   console.log(resData);
  // }, [resData]);
  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <Canvas>
        <ScrollControls pages={2} damping={1}>
          <CameraAnimation />
          <Simple />
          <Scroll html>
            <div style={{ width: "100vw", height: "100vh" }}>
              <Home />
            </div>

            <div
              style={{ width: "100vw", height: "100vh", position: "relative" }}
            >
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
                            isOrderPlaced && itemsToShow.length > 4
                              ? "#54d661"
                              : "",
                        }}
                        onClick={(e) => {
                          setIsOrderPlaced(() => true);
                          address &&
                            phoneNumber &&
                            date &&
                            triggerFormSubmit(e);
                        }}
                      >
                        Place order <IoIosArrowRoundForward size={30} />
                        <div className="tolTip">Minimum order is 5</div>
                      </button>
                    </div>
                  ) : null}
                </AnimatePresence>
              </Modal>
              <Selection
                foodItems={foodItems}
                setItemsToShow={setItemsToShow}
                itemsToShow={itemsToShow}
              />
            </div>
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  );
}

export default Render;
