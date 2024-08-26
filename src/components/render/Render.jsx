import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import eg from "/assets/food 1.png";
// import {Model} from "./../render/Model";
import { Scroll, ScrollControls } from "@react-three/drei";
import Home from "../pages/Home";
import Modal from "../ui/modal";
import Selection from "./../ui/select/index";
import CameraAnimation from "./AnimatedCam";
import { Simple } from "./Simple";
import { FaMinus, FaPlus } from "react-icons/fa6";

function Render() {
  const [itemsToShow, setItemsToShow] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  useEffect(() => {
    // Open the modal when itemsToShow is updated
    setIsModalOpen(itemsToShow.length > 0);
  }, [itemsToShow]);

  console.log(itemsToShow);
  function handleClose() {
    setIsModalOpen(false);
  }

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <Modal
        isOpen={isModalOpen}
        itemsToShow={itemsToShow}
        onClose={handleClose}
      >
        <div className="modal-items">
          {itemsToShow.length > 0 &&
            itemsToShow.map((item) => (
              <div className="modal-item" key={item.id}>
                <img src={item.img} alt={item.name + " image"} />
                <div className="modal-item-texts">
                  <div className="modal-item-name">{item.name}</div>
                  <div className="modal-item-quantity">x1</div>
                </div>
                <div className="modal-item-btns">
                  <div className="modal-item-btn">
                    <FaPlus />
                  </div>
                  <div className="modal-item-btn">
                    <FaMinus />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </Modal>
      <Canvas>
        <ScrollControls pages={2} damping={1}>
          <CameraAnimation />
          <Simple />
          <Scroll html>
            <div style={{ width: "100vw", height: "100vh" }}>
              <Home />
            </div>

            <div style={{ width: "100vw", height: "100vh" }}>
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
