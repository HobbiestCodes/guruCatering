import React, { useEffect, useState } from "react";
import "./styles.scss";

import axios from "axios";
import CircleCard from "./CircleCard";

import { useArray } from "../../funcs/context";
import Card from "./Card";
import Checkout from "../checkout/page";

function MenuItems({ category }) {
  const [menu, selectedMenu] = useState([]);
  const [menuItems, selectedMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(`${category}`);
  const { myArray } = useArray();
  const [active, setActive] = useState(false);
  const [forwardData, setForwardData] = useState([]);
  const [blackout, setBlackout] = useState(false);

  const handleCatogeryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const fetchMenuData = async function () {
    const response = await axios.get("http://localhost:8080/catogery");
    selectedMenu(response.data);
  };
  const fetchMenuItems = async function () {
    const response = await axios.get(
      `http://localhost:8080/Foods/${selectedCategory}`
    );
    selectedMenuItems(response.data);
  };

  useEffect(() => {
    fetchMenuData();
  }, []);

  useEffect(() => {
    fetchMenuItems();
  }, [selectedCategory]);



  const sendData = async () => {
    const response = await axios.post('http://localhost:8080/plate', myArray);
    setForwardData(response.data);
    setActive(!active);
  }


  const filteredMenuItems = menuItems.filter(
    (item) => item.catogery === selectedCategory
  );

  return (
    <div className="parent">
        <Checkout setBlackout={setBlackout} blackout={blackout} items={forwardData} />
      <div className="lower">
        <div className="itemsSelected">
          <h1>
            {myArray.length} Items selected
          </h1>
        </div>
        <div className="button">
          <button className={myArray.length === 0 ? "disabled" : ""} onClick={() =>{myArray.length !== 0 && sendData()}}>{active ? "Back" : "Next"}</button>
          <button className={`checkout ${active ? "visible" : "nextPhase"}`} onClick={() => setBlackout(true)}>Checkout</button>
        </div>
      </div>
      <div className="child">
        <div className={active ? "visible" : "nextPhase"}>
          <h1 style={{marginBottom: '1%', fontWeight: '800', fontSize: '3rem'}}>Your plate</h1>
        <Card items={forwardData} />
        </div>
        <div className={active ? "nextPhase" : "visible"}>
        <select className='filter' value={selectedCategory} onChange={handleCatogeryChange}>
            {menu.map((menuItem) => ( 
              <option value={menuItem.name} key={menuItem._id}>{menuItem.name}</option>
            ))}
          </select>
            <div className="bigBox">
      {filteredMenuItems.map((menuItem) => (
            <CircleCard
            key={menuItem._id}
            id={menuItem._id}
            title={menuItem.name}
            image={menuItem.image}
            description={menuItem.description}
             />
          ))}
            </div>
          </div>
      </div>
    </div>
  );
}

export default MenuItems;
