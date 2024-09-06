import React, { useEffect, useState } from "react";
import "./styles.scss";
import axios from "axios";
import CircleCard from "./CircleCard";
import Card from "./Card";
import Checkout, { EventDetails } from "../checkout/page";
import { useArray } from "../../funcs/context";

function MenuItems({ category }) {
  const [menu, selectedMenu] = useState([]);
  const [menuItems, selectedMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(category || "");
  const { myArray } = useArray();
  const [active, setActive] = useState(false);
  const [blackout, setBlackout] = useState(false);
  const [showEventDetails, setShowEventDetails] = useState(true);

  // Form state
  const [functionType, setFunctionType] = useState("");
  const [noOfPeople, setNoOfPeople] = useState("");
  const [foodPreference, setFoodPreference] = useState("");

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const fetchMenuData = async () => {
    const response = await axios.get("http://localhost:8080/catogery");
    selectedMenu(response.data);
  };

  const fetchMenuItems = async () => {
    let url = "http://localhost:8080/Foods";
    if (selectedCategory) {
      url += `/${selectedCategory}`;
    }
    const response = await axios.get(url);
    selectedMenuItems(response.data);
  };

  useEffect(() => {
    fetchMenuData();
  }, []);

  useEffect(() => {
    fetchMenuItems();
  }, [selectedCategory]);

  const filteredMenuItems = selectedCategory
    ? menuItems.filter((item) => item.catogery === selectedCategory)
    : menuItems;

  const handleFormSubmit = () => {
    if (
      functionType.trim() === "" ||
      noOfPeople.trim() === "" ||
      foodPreference.trim() === ""
    ) {
      return;
    } else {
      console.log(functionType, noOfPeople, foodPreference);
      setBlackout(false);
      setShowEventDetails(false);
    }
  };

  return (
    <div className="parent">
      {showEventDetails ? (
        <EventDetails
          blackout={showEventDetails}
          setBlackout={setShowEventDetails}
          functionType={functionType}
          setFunctionType={setFunctionType}
          noOfPeople={noOfPeople}
          setNoOfPeople={setNoOfPeople}
          foodPreference={foodPreference}
          setFoodPreference={setFoodPreference}
          onSubmit={handleFormSubmit}
        />
      ) : (
        <>
          <Checkout
            setBlackout={setBlackout}
            blackout={blackout}
            items={myArray}
          />
          <div className="lower">
            <div className="itemsSelected">
              <h1>{myArray.length} Items selected</h1>
            </div>
            <div className="button">
              <button
                className={myArray.length === 0 ? "disabled" : ""}
                onClick={() => {
                  myArray.length !== 0 && setActive(!active); // Toggle between 'Back' and 'Next'
                }}
              >
                {active ? "Back" : "Next"}
              </button>
              <button
                className={`checkout ${active ? "visible" : "nextPhase"}`}
                onClick={() => setBlackout(true)}
              >
                Checkout
              </button>
              <button
                className={`event-details-button ${
                  active ? "visible" : "nextPhase"
                }`}
                onClick={() => setShowEventDetails(true)}
              >
                Event Details
              </button>
            </div>
          </div>
          <div className="child">
            <div className={active ? "visible" : "nextPhase"}>
              <h1
                style={{
                  marginBottom: "1%",
                  fontWeight: "800",
                  fontSize: "3rem",
                }}
              >
                Your plate
              </h1>
              <Card />
            </div>
            <div className={active ? "nextPhase" : "visible"}>
              <select
                className="filter"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="">All Categories</option>
                {menu.map((menuItem) => (
                  <option value={menuItem.name} key={menuItem._id}>
                    {menuItem.name}
                  </option>
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
        </>
      )}
    </div>
  );
}

export default MenuItems;
