import { useState, useEffect, useContext, createContext } from "react";

const ArrayContext = createContext();

export const useArray = () => useContext(ArrayContext);

export const ArrayProvider = ({ children }) => {
  const [myArray, setMyArray] = useState([]);
  console.log(myArray);
  

  useEffect(() => {
    const savedArray = JSON.parse(localStorage.getItem("myArray")) || [];
    setMyArray(savedArray);
  }, []);

  useEffect(() => {
    localStorage.setItem("myArray", JSON.stringify(myArray));
  }, [myArray]);

  const addToArray = (newItem) => {
    setMyArray((prevArray) => {
      const index = prevArray.findIndex((item) => item.id === newItem.id);
      if (index > -1) {
        const updatedArray = [...prevArray];
        updatedArray[index] = {
          ...updatedArray[index],
          quantity: newItem.quantity,
        };
        return updatedArray;
      }
      return [...prevArray, newItem];
    });
  };

  const removeFromArray = (id) => {
    setMyArray((prevArray) => {
      return prevArray.filter((item) => item.id !== id);
    });
  };

  const isInArray = (id) => {
    return myArray.some((item) => item.id === id);
  };

  return (
    <ArrayContext.Provider
      value={{ myArray, addToArray, removeFromArray, isInArray }}
    >
      {children}
    </ArrayContext.Provider>
  );
};
