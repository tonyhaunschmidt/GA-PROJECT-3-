import React from 'react'
import { Link } from 'react-router-dom'

import smallLogo from '../assets/logo.png'
import profilePlaceholder from '../assets/placeholder_profile_pic.png'


const Nav = () => {
  return (
    <nav>
      <Link to='/'><img src={smallLogo} alt='faceCook small logo' /></Link>
      <ul>
        {/*******  ADD LOGGED IN CONDITION HERE?
         OPTION 1*/}
        <Link to={'/register'}><li>sign up</li></Link>
        <Link to={'/login'}><li>log in</li></Link>
        {/*OPTION 2*/}
        <li class="navbar-dropdown">  {/*******  ON CLICK- UNHIDE (DISPLAY: INITIAL) THE DROPDOWN UL */}
          username <img src={profilePlaceholder} alt='faceCook small logo' />
          <ul class="dropdown">
            <li><Link to="/myprofile/test">My Profile</Link></li>   {/*******  CHANGE TO :ID ONCE LOG IN IS ORGANISED */}
            <li><Link to="/myrecipes/test">My Recipes</Link></li>
            <li><Link to="/shoppinglist">Shopping List</Link></li>
            <li><Link to="/updateprofile/test">Edit Profile</Link></li>
            <li>Log Out</li>  {/*******  ON CLICK- REMOVE TOKEN FROM LOCAL STORAGE */}
          </ul>
        </li>
        {/*END OF CONDITION*/}
      </ul>
    </nav>
  )
}

export default Nav