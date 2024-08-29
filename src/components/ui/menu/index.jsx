import React, { useEffect, useState } from 'react'
import './styles.scss';
import Card from './Card';
import Navbar from '../navbar/index';
import axios from 'axios';

function MenuItems() {
  const [menu, selectedMenu] = useState([]);
  const [menuItems, selectedMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  
  
  const handleCatogeryChange = (e) => {
    setSelectedCategory(e.target.value);
  }
  
  const fetchMenuData = async function() {
    const response = await axios.get('http://localhost:8080/catogery');
    selectedMenu(response.data);
    setSelectedCategory(response.data[0].name);
  }
  const fetchMenuItems = async function() {
    const response = await axios.get('http://localhost:8080/Foods')
    selectedMenuItems(response.data);
  }
  
  useEffect(() => {
    fetchMenuData();
  }, []);

  
  useEffect(() => {
    fetchMenuItems();
  }, [menu]);

  const filteredMenuItems = menuItems.filter(
    (item) => item.catogery === selectedCategory
  );


  return (
    <div className='parent'>
        <div className="upper">
        <Navbar />
        </div>
        <div className="child">
          <select className='filter' value={selectedCategory} onChange={handleCatogeryChange}>
            {menu.map((menuItem) => ( 
              <option value={menuItem.name} key={menuItem._id}>{menuItem.name}</option>
            ))}
          </select>
            <div className="bigBox">
              {/* {menuItems.map((menuItem) => (
                <Card key={menuItem._id} image={menuItem.image} subtitle={menuItem.description} price={menuItem.price} rating={menuItem.rating} title={menuItem.name} isVeg={menuItem.isVeg}/>
              ))} */}
                  {filteredMenuItems.map((menuItem) => (
            <Card
              key={menuItem._id}
              image={menuItem.image}
              subtitle={menuItem.description}
              price={menuItem.price}
              rating={menuItem.rating}
              title={menuItem.name}
              isVeg={menuItem.isVeg}
            />
          ))}
            </div>
        </div>
    </div>
  )
}

export default MenuItems