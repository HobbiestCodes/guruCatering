import { useState, useEffect, useContext, createContext } from 'react';

const ArrayContext = createContext();

export const useArray = () => useContext(ArrayContext);

export const ArrayProvider = ({ children }) => {
  const [myArray, setMyArray] = useState([]);

  useEffect(() => {
    // Load array from localStorage if it exists
    const savedArray = JSON.parse(localStorage.getItem('myArray')) || [];
    setMyArray(savedArray);
  }, []);

  useEffect(() => {
    // Save array to localStorage whenever it changes
    localStorage.setItem('myArray', JSON.stringify(myArray));
  }, [myArray]);

  const addToArray = (newItem) => {
    setMyArray((prevArray) => [...prevArray, newItem]);
  };

  const isInArray = (item) => {
    return myArray.includes(item)  // Assuming items have unique IDs
  };

  return (
    <ArrayContext.Provider value={{ myArray, addToArray, isInArray }}>
      {children}
    </ArrayContext.Provider>
  );
};
