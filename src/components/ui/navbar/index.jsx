import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import logo from "/logo.png"; // Ensure the path is correct
import { IoClose } from "react-icons/io5";
import { BiMenuAltRight } from "react-icons/bi";
import "./styles.scss";

const tabs = [
  { head: "Home", to: "/" },
  { head: "Veg", to: "/menu", query: { veg: "yes" } },
  { head: "Non Veg", to: "/menu", query: { veg: "no" } },
  { head: "Menu", to: "/menu", query: { veg: "" } },
  { head: "Corporate box", to: "/corporate-box" },
];

function Navbar() {
  const location = useLocation();
  const [isAnimating, setIsAnimating] = useState(false);

  // Helper to check if the current location matches the tab
  const isActive = (tab) => {
    const { pathname, search } = location;
    const queryParams = new URLSearchParams(search);

    // Check for path match
    const pathMatch = pathname === tab.to;

    // Check for query parameter match
    if (tab.query) {
      for (const [key, value] of Object.entries(tab.query)) {
        if (queryParams.get(key) !== value) {
          return false;
        }
      }
    }

    return pathMatch;
  };

  const container = {
    hidden: { opacity: 0, y: -50 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delayChildren: 0.2,
        // staggerChildren: 0.2,
        ease: "easeInOut",
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: -50 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <nav className="navbar">
      <div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.7 }}
        viewport={{ once: true }}
        className="nav_logo"
      >
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>

      <AnimatePresence>
        {isAnimating && (
          <motion.ul
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="responsive-nav"
          >
            {tabs.map((tab, i) => (
              <motion.li
                variants={item}
                initial={{ x: 400 }}
                animate={{ x: 0 }}
                exit={{ x: 400 }}
                transition={{ delay: 0.2 * i }}
                key={tab.head}
                className={isActive(tab) ? "active" : "unselected"}
              >
                <Link to={{ pathname: tab.to, search: new URLSearchParams(tab.query).toString() }} style={{ color: "black" }}>
                  {tab.head}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      <ul
        initial="hidden"
        animate="show"
        className="tabs"
        variants={container}
      >
        {tabs.map((tab) => (
          <li
            variants={item}
            key={tab.head}
  
          >
            <Link to={{ pathname: tab.to, search: new URLSearchParams(tab.query).toString()}} style={{ color: "black" }}>
              {tab.head}
            </Link>
          </li>
        ))}
      </ul>

      <motion.div
        className="nav-menu-icon"
        variants={item}
        onClick={() => setIsAnimating((prev) => !prev)}
      >
        {isAnimating ? <IoClose size={35} /> : <BiMenuAltRight size={35} />}
      </motion.div>
    </nav>
  );
}

export default Navbar;
