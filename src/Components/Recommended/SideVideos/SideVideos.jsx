import React from 'react'
import'./SideVideos.css';
import { Link } from 'react-router-dom';


const SideVideos = ({thumbnail, categoryId, ind, title, id, channelName, views}) => {
  return (
    <Link to={`/video/${categoryId}/${id}`} key={ind} className='side-videos'>
        <img src={thumbnail} alt="" />
        <div className="vid-info">
            <h4>{title}</h4>
            <p>{channelName}</p>
            <p>{views} view</p>
        </div>
    </Link>
  )
}

export default SideVideos