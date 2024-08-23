import React, { useState } from "react";
import "./styles.scss";
// import logo from "/assets/logo.png";
import { motion } from "framer-motion";
import GoogleLoginButton from "../../funcs/login";

function Navbar() {
    const container = {
        hidden: { opacity: 0, y: -50 },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            delayChildren: 2,
            staggerChildren: 0.2,
            ease: 'easeInOut'
          }
        }
      }
      
      const item = {
        hidden: { opacity: 0, y: -50 },
        show: { opacity: 1, y: 0 }
      }

  const tabs = ["Home", "Menu", "Special Dishes", "Hotels", "Contact Us"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  console.log(activeTab);

  return (
    <motion.nav className="navbar">
      <motion.div 
      initial={{
        x: -100,
        opacity: 0
      }}
      whileInView={{
        x: 0,
        opacity: 1
      }}
      transition={{
          duration: 0.5,
          delay: 1.7,
      }}
      viewport={{ once: true }}
      className="nav_logo">
        {/* <img src={logo} alt="logo" /> */}
      </motion.div>
        <motion.ul
        initial='hidden'
        whileInView='show'
        variants={container}
        viewport={{ once: true }}
        >
          {tabs.map((tab, index) => (
            <motion.li
            variants={item}
              key={tab}
              className={`${activeTab === tab ? `active` : "unselected"}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </motion.li>
          ))}
        </motion.ul>


      <motion.ul
        initial='hidden'
        whileInView='show'
        variants={container}
        viewport={{ once: true }}
        className="loginContainer"
        >
            <motion.li
            variants={item}
            className="login"
            >
          <GoogleLoginButton />
            </motion.li>
        </motion.ul>
    
    {/* </div> */}
    </motion.nav>
  );
}

export default Navbar;
