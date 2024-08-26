import "./styles.scss";
import { motion } from "framer-motion";
import eg from "/assets/food 1.png";
import { IoMdCheckmark } from "react-icons/io";

function Selection({ foodItems, itemsToShow, setItemsToShow }) {
  const catogery = "veg";
  return (
    <div className="selection">
      <motion.div
        initial={{
          x: -100,
          opacity: 0,
        }}
        whileInView={{
          x: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.5,
          delay: 2,
        }}
        className="title"
      >
        <h1>Shahi Paneer</h1>
      </motion.div>
      <div className="portions upper">
        <motion.div
          initial={{
            // y: 100,
            opacity: 0,
          }}
          whileInView={{
            // y: 0,
            opacity: 1,
          }}
          transition={{
            duration: 0.5,
            delay: 2.1,
          }}
          className="box"
        >
          {foodItems.map((item) => (
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
                      catogery === "veg"
                        ? { borderColor: "limegreen" }
                        : { borderColor: "brown" }
                    }
                  >
                    <div
                      className="dot"
                      style={
                        catogery === "veg"
                          ? { background: "limegreen" }
                          : { background: "brown" }
                      }
                    ></div>
                  </div>
                  {!itemsToShow.find((obj) => obj.id === item.id) ? (
                    <div
                      className="addToCart"
                      onClick={() =>
                        setItemsToShow((items) => [...items, item])
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
      </div>
    </div>
  );
}

export default Selection;
