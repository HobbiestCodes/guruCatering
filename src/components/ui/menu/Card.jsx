import React from 'react'
import './styles.scss'

function Card({image, title, subtitle, price, rating, isVeg}) {
  return (
    <div className="box">
    <img src={image} alt="Background image" />

<div className="content">
    <h1>{title}</h1>
    <p>{subtitle}</p>
    
    <div className="more">
    <p>Price: <span>Rs. {price}/-</span></p>
    <p>Rating: <span>{rating}</span></p>
    <p>Veg: <span>{isVeg ? "Yes" : "No"}</span></p>
    </div>
    <button>Add to plate</button>
</div>
</div>
  )
}

export default Card