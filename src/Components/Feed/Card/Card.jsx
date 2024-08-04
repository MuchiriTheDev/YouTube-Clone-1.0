import React from 'react'
import "./Card.css"
import { Link } from 'react-router-dom';

const Card = ({image, title, name, views, time, categoryId, videoId}) => {
  return (
    <Link to={`video/${categoryId}/${videoId}`} className='card'>
        <img src={image} className='card-img' alt="" />
        <h2 className='card-title'>{title}</h2>
        <h3 className='card-name'>{name}</h3>
        <p className='p-tag'>{views} views &bull; {time}</p>
    </Link>
  )
}

export default Card