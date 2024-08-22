import React from "react";
import "./styles.scss";
import {motion} from "framer-motion";
import eg from '/assets/food 1.png'

function Selection() {
    const array = [
        1,2,3,4,5,6,7,8,9,10,11, 12,13,14,15,16,17,18,19, 20
    ]
    const catogery = 'veg'
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
        className="title">
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
        className="box">
          {array.map((items) => (
            <div className="imgContainer">
              <img src={eg} alt="icon" />
            <div className="popUp">
              <h1>Name of the food</h1>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod, modi?</p>
              <h2>Rs. 3000 /-</h2>
              <div className="downContainer">
              <div className='veg' style={catogery==="veg" ? {borderColor: 'limegreen'} : {borderColor: 'brown'}}>
                  <div className="dot" style={catogery==="veg" ? {background: 'limegreen'} : {background: 'brown'}}></div>
              </div>
              <div className="addToCart">
                  <p>Add to plate + </p>
              </div>
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
