import React from 'react'
import './styles.scss'

function Card() {
  return (
    <div className="box">
    <img src="https://images.unsplash.com/photo-1586511925558-a4c6376fe65f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=60" alt="" />

<div className="content">
    <h1>Title of the food</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
    
    <div className="more">
    <p>Price: <span>Rs. 200</span></p>
    <p>Rating: <span>4</span></p>
    </div>
    <button>Add to plate</button>
</div>
</div>
  )
}

export default Card