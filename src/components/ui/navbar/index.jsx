import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import Login from "../../funcs/Logged";
import "./styles.scss";
import logo from "/logo.png";
import { IoClose } from "react-icons/io5";

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
        ease: "easeInOut",
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: -20 },
    show: { opacity: 1, y: 0 },
  };

  const tabs = ["Home", "Veg", "Non Veg", "Menu selection", "Corporate box"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [isAnimating, setIsAnimating] = useState(false);
  // console.log(activeTab);

  useEffect(() => {
    if (isAnimating) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling
    }

    // Cleanup function to reset the overflow when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isAnimating]);

  return (
    <motion.nav className="navbar">
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
          delay: 1.7,
        }}
        viewport={{ once: true }}
        className="nav_logo"
      >
        <img src={logo} alt="logo" />
      </motion.div>

      <AnimatePresence>
        {isAnimating && (
          <motion.ul
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ x: 400, opacity: 0 }}
            className="responsive-nav"
          >
            {tabs.map((tab, i) => (
              // <Link to={`/${tab.toLowerCase()}`}>
              <motion.li
                variants={item}
                initial={{ x: 400 }}
                animate={{ x: 0 }}
                exit={{ x: 400 }}
                transition={{ delay: 0.2 * i }}
                key={tab}
                className={`${activeTab === tab ? `active` : "unselected"}`}
                onClick={() => {
                  setActiveTab(tab);
                }}
              >
                {tab}
              </motion.li>
              // </Link>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
      <motion.ul
        initial="hidden"
        animate="show"
        className="tabs"
        variants={container}
      >
        {tabs.map((tab) => (
          // <Link to={`/${tab.toLowerCase()}`}>
          <motion.li
            variants={item}
            key={tab}
            className={`${activeTab === tab ? `active` : "unselected"}`}
            onClick={() => {
              setActiveTab(tab);
            }}
          >
            {tab}
          </motion.li>
          // </Link>
        ))}
      </motion.ul>

      <motion.li
        className="nav-menu-icon"
        variants={item}
        onClick={() => setIsAnimating((toggle) => !toggle)}
      >
        {isAnimating ? <IoClose size={22} /> : <BiMenuAltRight size={22} />}
      </motion.li>

      {/* </div> */}
    </motion.nav>
  );
}

export default Navbar;
