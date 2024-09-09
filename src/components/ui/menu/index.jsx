import React, { useEffect, useState } from "react";
import axios from "axios";
import CircleCard from "./CircleCard";
import Card from "./Card";
import Checkout, { EventDetails } from "../checkout/page";
import { useArray } from "../../funcs/context";
import "./styles.scss";

function MenuItems({ category, isVeg }) {
  const [menu, setMenu] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(category || "");
  const { myArray } = useArray();
  const [active, setActive] = useState(false);
  const [blackout, setBlackout] = useState(false);
  const [showEventDetails, setShowEventDetails] = useState(true);
  const [eventError, setEventError] = useState("");

  const [formState, setFormState] = useState({
    functionType: "",
    noOfPeople: "",
    foodPreference: isVeg === "yes" ? "veg" : "non-veg",
  });

  useEffect(() => {
    setFormState((prev) => ({
      ...prev,
      foodPreference: isVeg === "yes" ? "veg" : "non-veg",
    }));
  }, [isVeg]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const fetchMenuData = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/catogery");
      setMenu(data);
    } catch (error) {
      console.error("Failed to fetch menu data", error);
    }
  };

  const filterMenuItems = (items) => {
    if (formState.foodPreference === "veg") {
      return items.filter((item) => item.isVeg);
    }
    if (formState.foodPreference === "non-veg") {
      return items.filter((item) => !item.isVeg);
    }
    return items;
  };

  const fetchMenuItems = async () => {
    try {
      let url = "http://localhost:8080/Foods";
      if (selectedCategory) url += `/${selectedCategory}`;
      const { data } = await axios.get(url);
      // console.log(data);

      const filteredItems = filterMenuItems(data);
      setMenuItems(filteredItems);
    } catch (error) {
      console.error("Failed to fetch menu items", error);
    }
  };

  useEffect(() => {
    fetchMenuData();
  }, []);

  useEffect(() => {
    fetchMenuItems();
  }, [selectedCategory, formState.foodPreference]);

  const handleFormSubmit = () => {
    const { functionType, noOfPeople, foodPreference } = formState;
    if (!functionType.trim() || !noOfPeople.trim() || !foodPreference.trim()) {
      return setEventError("All fields are required");
    }
    setEventError("");
    setBlackout(false);
    setShowEventDetails(false);
  };

  // console.log(formState.functionType, formState.noOfPeople, formState.foodPreference, menuItems);
  return (
    <div className="parent">
      {showEventDetails ? (
        <EventDetails
          blackout={showEventDetails}
          setBlackout={setShowEventDetails}
          functionType={formState.functionType}
          setFunctionType={(value) =>
            setFormState((prev) => ({ ...prev, functionType: value }))
          }
          noOfPeople={formState.noOfPeople}
          setNoOfPeople={(value) =>
            setFormState((prev) => ({ ...prev, noOfPeople: value }))
          }
          foodPreference={formState.foodPreference}
          setFoodPreference={(value) =>
            setFormState((prev) => ({ ...prev, foodPreference: value }))
          }
          onSubmit={handleFormSubmit}
          eventError={eventError}
        />
      ) : (
        <>
          <Checkout
            setBlackout={setBlackout}
            blackout={blackout}
            functionType={formState.functionType}
            noOfPeople={formState.noOfPeople}
            foodPreference={formState.foodPreference}
            goBackTOMenu={() => setActive(!active)}
            items={myArray}
          />
          <div className="lower">
            <div className="itemsSelected">
              <h1>{myArray.length} Items selected</h1>
            </div>
            <div className="button">
              <button
                className={myArray.length === 0 ? "disabled" : ""}
                onClick={() => myArray.length !== 0 && setActive(!active)}
              >
                {active ? "Back" : "Next"}
              </button>
              <button
                className={`checkout ${active ? "visible" : "nextPhase"}`}
                onClick={() => setBlackout(true)}
              >
                Checkout
              </button>
              {/* <button
                className={`event-details-button ${
                  active ? "visible" : "nextPhase"
                }`}
                onClick={() => setShowEventDetails(true)}
              >
                Event Details
              </button> */}
            </div>
          </div>
          <div className="child">
            <div className={active ? "visible" : "nextPhase"}>
              <h1 className="plate-heading">Your plate</h1>
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
                {menuItems.length > 0 ? (
                  menuItems.map((menuItem) => (
                    <CircleCard
                      key={menuItem._id}
                      id={menuItem._id}
                      title={menuItem.name}
                      image={menuItem.image}
                      description={menuItem.description}
                    />
                  ))
                ) : (
                  <h1>No food is available</h1>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default MenuItems;
