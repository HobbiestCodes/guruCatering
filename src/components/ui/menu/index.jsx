import React from 'react'
import './styles.scss';
import Card from './Card';
import Navbar from '../navbar/index';

function MenuItems() {
  return (
    <div className='parent'>
        <div className="upper">
        <Navbar />
        </div>
        <div className="child">
            <div className="bigBox">
                <Card />
            </div>
        </div>
    </div>
  )
}

export default MenuItems