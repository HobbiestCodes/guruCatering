import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./styles.scss";
import { IoMdCheckmark } from "react-icons/io";

function Selection({ foodItems, itemsToShow, setItemsToShow }) {
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const intervalRef = useRef(null);

  const replaceHyphensWithSpaces = (text) => {
    return text && text.replace(/-/g, " ");
  };

  const getUniqueCategories = (foodItems) => {
    const categories = foodItems.map((item) => item.category);
    return setCategories([...new Set(categories)]);
  };

  useEffect(() => {
    if (categories.length === 0) getUniqueCategories(foodItems);
  }, [categories, foodItems]);

  const startCategoryInterval = () => {
    intervalRef.current = setInterval(() => {
      setCurrentCategory((prevCategory) => {
        const currentIndex = categories.indexOf(prevCategory);
        const nextIndex = (currentIndex + 1) % categories.length;
        return categories[nextIndex];
      });
    }, 5000); // changing category every 5 seconds
  };

  useEffect(() => {
    if (categories.length > 0) {
      setCurrentCategory(categories[0]);
      startCategoryInterval();

      return () => clearInterval(intervalRef.current); // cleaning up interval on component unmount
    }
  }, [categories]);

  const handleMouseEnter = () => {
    clearInterval(intervalRef.current); // stop changing category on hover
  };

  const handleMouseLeave = () => {
    startCategoryInterval(); // resume changing category when not hovering
  };

  // filtering food items based on the current category
  const filteredItems = foodItems.filter(
    (item) => item.category === currentCategory
  );

  return (
    <div className="selection">
      <motion.div
        key={currentCategory}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 100, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="title"
      >
        {/* <h1>{currentCategory}</h1>  */}
        {/* if screen is freeze then comment the below h1 */}
        <h1>{replaceHyphensWithSpaces(currentCategory)}</h1>
      </motion.div>
      <div className="portions upper">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="box"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {filteredItems.map((item) => (
              <div key={item.id} className="imgContainer">
                <img src={item.img} alt="icon" />
                <div className="popUp">
                  <h1>{item.name}</h1>
                  <p>{item.description}</p>
                  <h2>Rs. {item.price} /-</h2>
                  <div className="downContainer">
                    <div
                      className="veg"
                      style={
                        item.category === "veg"
                          ? { borderColor: "limegreen" }
                          : { borderColor: "brown" }
                      }
                    >
                      <div
                        className="dot"
                        style={
                          item.category === "veg"
                            ? { background: "limegreen" }
                            : { background: "brown" }
                        }
                      ></div>
                    </div>
                    {!itemsToShow.find((obj) => obj.id === item.id) ? (
                      <div
                        className="addToCart"
                        onClick={() =>
                          setItemsToShow((items) => [
                            ...items,
                            { ...item, quantity: 1 },
                          ])
                        }
                      >
                        <p>Add to plate + </p>
                      </div>
                    ) : (
                      <div className="alreadyToCart">
                        <p>
                          Added to plate <IoMdCheckmark />
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Selection;
