import React, { useState } from 'react'
import "./Home.css";
import Sidebar from '../../Components/Sidebar/Sidebar';
import Feed from '../../Components/Feed/Feed';


const Home = ({opening}) => {

  const[category, setCategory]= useState(0)

  return (
    <div>
      <Sidebar opening={opening} category={category} setCategory={setCategory}/>
      <div className={`container ${ opening ? " ": "large-container"}`}>
        <Feed category={category}/>
      </div>
    </div>
  )
}

export default Home