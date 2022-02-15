import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import { getPayload } from './helper/authHelper'

import smallLogo from '../assets/logo.png'
import profilePlaceholder from '../assets/placeholder_profile_pic.png'


const Nav = () => {

  const navigate = useNavigate()

  const [currentUser, setCurrentUser] = useState({})
  const [displayDropDown, setDisplayDropDown] = useState(false)
  
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const payload = getPayload()
        const { data } = await axios.get(`/api/profile/${payload.sub}`)
        setCurrentUser(data)
      } catch (err) {
        console.log(err)
      }
    }
    getCurrentUser()
  }, [])
  
  const handleLogout = () => {
    window.localStorage.removeItem('faceCook-token')
    navigate('/')
  }

  // const handleDropDownToggleOn = () => {
  //   setDisplayDropDown(true)
  // }
  // const handleDropDownToggleOff = () => {
  //   let change = false
  //   console.log(displayDropDown === true)
  //   if(displayDropDown === true ) {
  //     change = true
  //   }
  //   if(change === true){
  //     setDisplayDropDown(false)
  //   }
  // }

  // document.body.addEventListener('click', handleDropDownToggleOff)
  
  
  return (
    <nav>
      <Link to='/'><img src={smallLogo} alt='faceCook small logo' /></Link>
      <ul>
        {!currentUser._id?
          <>
            <Link to={'/register'}><li>sign up</li></Link>
            <Link to={'/login'}><li>log in</li></Link>
          </>
            :
          <>
            <li className="navbar-dropdown">
              <button >
              {!currentUser.name ? 
                <p>{currentUser.username}</p> 
                  : 
                <p>{currentUser.name}</p>} 
                {!currentUser.profileImage ? 
                  <img src={profilePlaceholder} alt='placeholder recipe' /> 
                    : 
                  <img src={currentUser.image} alt={currentUser.title} />
                }
              </button>  {/*******  ON CLICK- UNHIDE (DISPLAY: INITIAL) THE DROPDOWN UL */}
              {displayDropDown ?
              <ul className="dropdown">  
                <li><Link to={`/profile/${currentUser._id}`}>My Profile</Link></li>   
                <li><Link to="/myrecipes">My Recipes</Link></li>
                <li><Link to="/shoppinglist">Shopping List</Link></li>
                <li><Link to="/updateprofile">Edit Profile</Link></li>
                <li><button onClick={handleLogout}>Log Out</button></li>
              </ul>
              :
              <></>}
            </li>
          </>}
      </ul>
    </nav>
  )
}

export default Nav