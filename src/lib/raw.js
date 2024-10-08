const raw = "data - comments";

// import { useEffect, useState, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import useAuth from "../../funcs/useAuth";
// import "./styles.scss";
// import { IoMdCheckmark } from "react-icons/io";
// import axios from "axios";
// import { Link } from "react-router-dom";

// function Selection({ foodItems, itemsToShow, setItemsToShow }) {
//   const [categories, setCategories] = useState([]);
//   const [currentCategory, setCurrentCategory] = useState(null);
//   const dummy = [
//     1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
//   ];

//   const getCatogeries = async () => {
//     try {
//       const res = await axios.get("http://localhost:8080/catogery");
//       if (res.status !== 200) {
//         console.log("something went wrong...");
//       }
//       setCategories(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getCatogeries();
//   }, []);

//   // const getUniqueCategories = (foodItems) => {
//   //   const uniqueCategories = [
//   //     ...new Set(foodItems.map((item) => item.category)),
//   //   ];
//   //   setCategories(uniqueCategories);
//   // };

//   // Initialize categories and start category interval
//   // useEffect(() => {
//   //   if (categories.length === 0 && foodItems.length > 0) {
//   //     getUniqueCategories(foodItems);
//   //   }
//   // }, [categories, foodItems]);

//   // const startCategoryInterval = () => {
//   //   intervalRef.current = setInterval(() => {
//   //     setCurrentCategory((prevCategory) => {
//   //       const currentIndex = categories.indexOf(prevCategory);
//   //       const nextIndex = (currentIndex + 1) % categories.length;
//   //       return categories[nextIndex];
//   //     });
//   //   }, 5000); // change category every 5 seconds
//   // };

//   // useEffect(() => {
//   //   if (categories.length > 0) {
//   //     setCurrentCategory(categories[0]);
//   //     startCategoryInterval();

//   //     return () => clearInterval(intervalRef.current); // Clean up interval on unmount
//   //   }
//   // }, [categories]);

//   // const handleMouseEnter = () => {
//   //   clearInterval(intervalRef.current); // Stop changing category on hover
//   // };

//   // const handleMouseLeave = () => {
//   //   startCategoryInterval(); // changing category when not hovering
//   // };

//   // Filter food items based on the current category
//   // const filteredItems = foodItems.filter(
//   //   (item) => item.category === currentCategory
//   // );

//   // const handleAddToPlate = async (item) => {
//   //   const updatedItems = [...itemsToShow, { ...item, quantity: 1 }];
//   //   setItemsToShow(updatedItems);

//   //   if (user && user._id) {
//   //     try {
//   //       await axios.post("http://localhost:8080/create-user-food-plates", {
//   //         userId: user._id,
//   //         plates: updatedItems,
//   //       });
//   //     } catch (error) {
//   //       console.error("Error adding to plate:", error);
//   //     }
//   //   }
//   // };

//   // useEffect(() => {
//   //   const fetchUsersFoodOrdersById = async () => {
//   //     if (user && user._id) {
//   //       try {
//   //         const res = await axios.post(
//   //           "http://localhost:8080/read-user-food-plates",
//   //           {
//   //             userId: user._id,
//   //           }
//   //         );
//   //         if (res.data && res.data.plates.length > 0) {
//   //           setItemsToShow(res.data.plates);
//   //         }
//   //       } catch (error) {
//   //         console.error("Error fetching user food orders:", error);
//   //       }
//   //     }
//   //   };

//   //   if (itemsToShow.length === 0) {
//   //     fetchUsersFoodOrdersById();
//   //   }
//   // }, [itemsToShow, setItemsToShow, user]);

//   return (
//     <div className="selection">
//       {/* <motion.div

//         initial={{ x: -100, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         exit={{ x: 100, opacity: 0 }}
//         transition={{ duration: 0.5 }}
//         className="title"
//       >
//         <h1></h1>
//       </motion.div> */}
//       <div className="portions upper">
//         {/* <AnimatePresence mode="wait"> */}
//         <div
//           // initial={{ opacity: 0 }}
//           // animate={{ opacity: 1 }}
//           // exit={{ opacity: 0 }}
//           // transition={{ duration: 0.5 }}
//           className="box"
//         >
//           {categories.map((items, index) => (
//             // <div className="container">
//             <Link key={index} to={`/menu/${items.name}`}>
//               <div className="imgContainer">
//                 <img
//                   src="https://picsum.photos/1080/1920?random=1"
//                   alt="catogeryPic"
//                 />
//                 {/* <h3>Title for catogery</h3> */}
//                 <div className="popUp">
//                   <h1>{items.name}</h1>
//                 </div>
//               </div>
//             </Link>
//             // </div>
//           ))}
//           {/* {filteredItems.map((item) => ( */}
//           {/* <div key={item.id} className="imgContainer">
//                 <img src={item.img} alt={item.name} />
//                 <div className="popUp">
//                   <p>{item.description}</p>

//                   <div className="downContainer">
//                     <div
//                       className="veg"
//                       style={{
//                         borderColor:
//                           item.category === "veg" ? "limegreen" : "brown",
//                       }}
//                     >
//                       <div
//                         className="dot"
//                         style={{
//                           background:
//                             item.category === "veg" ? "limegreen" : "brown",
//                         }}
//                       ></div>
//                     </div>
//                     {!itemsToShow.find((obj) => obj.id === item.id) ? (
//                       <div
//                         className="addToCart"
//                         // onClick={() => handleAddToPlate(item)}
//                       >
//                         <p>Add to plate +</p>
//                       </div>
//                     ) : (
//                       <div className="alreadyToCart">
//                         <p>
//                           Added to plate <IoMdCheckmark />
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div> */}
//           {/* ))} */}
//         </div>
//         {/* </AnimatePresence> */}
//       </div>
//     </div>
//   );
// }

// export default Selection;
