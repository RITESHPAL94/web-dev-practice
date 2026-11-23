import React from 'react'
import "./card.css";

const card = (props) => {
  return (
    <div className='card' style={{overflow: "hidden"}}>
      <img src="https://imgs.search.brave.com/UGKUNl5gxWQ58Ehk1p5ChzM4skpTr1noPZVRP00I8-U/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzIyLzM1LzAzLzEy/LzM2MF9GXzIyMzUw/MzEyNTFfemxWSGVy/VWRjVDhQOXR3M3hS/VjY2VmlNNGxsbVFP/WEYuanBn" alt="" width={333} 
      style={{border: "2px solid black"}}/>
      <h1>{props.title}</h1>
      <p>{props.description}</p>
    </div>
  )
}

export default card
