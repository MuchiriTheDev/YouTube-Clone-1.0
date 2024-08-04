import React from 'react'
import "./Navbar.css";
import menuIcon from "../../assets/menu.png"
import logo from "../../assets/logo.png";
import searchIcon from "../../assets/search.png";
import uploadIcon from "../../assets/upload.png"
import moreIcon from "../../assets/more.png";
import notification from "../../assets/notification.png"
import profileIcon from "../../assets/user_profile.jpg";
import { Link } from 'react-router-dom';

const Navbar = ({settingopen}) => {
  return (
    <nav className='flex-div'>
        <div className="nav-left flex-div">
            <img onClick={()=> settingopen(prev => prev===false?true:false)} src={menuIcon} alt="" className="menu-icon" />
            <Link to={`/`}><img src={logo} alt="" className='logo' /></Link>
        </div>
        <div className="nav-middle flex-div">
          <div className="search-box flex-div">
            <input type="text" name="" id="" placeholder='Search' />
            <img src={searchIcon} alt=""/>
          </div>
        </div>
        <div className="nav-right flex-div">
            <img src={uploadIcon} alt="" />
            <img src={moreIcon} alt="" />
            <img src={notification} alt="" />
            <img src={profileIcon} className='user-icon' alt="" /></div>
    </nav>
  )
}

export default Navbar