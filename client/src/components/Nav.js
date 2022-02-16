import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import { getPayload } from './helper/authHelper'

import smallLogo from '../assets/logo.png'
import profilePlaceholder from '../assets/placeholder_profile_pic.png'


const Nav = () => {

  const ref = useRef()
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


  useEffect(() => {
    const checkIfClickedOutside = e => {
      if (displayDropDown && ref.current && !ref.current.contains(e.target)) {
        setDisplayDropDown(false)
      }
    }
    document.addEventListener("mousedown", checkIfClickedOutside)
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [displayDropDown])


  return (
    <nav >
      <Link to='/'><img src={smallLogo} alt='faceCook small logo' className='small-logo' /></Link>
      {!currentUser._id ?
        <ul>
          <Link to={'/register'}><li>sign up</li></Link>
          <Link to={'/login'}><li>log in</li></Link>
        </ul>
        :
        <div className="navbar-dropdown" ref={ref}>
          <div onClick={() => setDisplayDropDown(oldState => !oldState)} className='navbar-user'>
            <div className='username-text-container'>
              {!currentUser.name ?
                <p>{currentUser.username}</p>
                :
                <p>{currentUser.name}</p>}
            </div>
            {!currentUser.profileImage ?
              <img src={profilePlaceholder} alt='placeholder recipe' />
              :
              <img src={currentUser.image} alt={currentUser.title} />
            }
          </div>
          {displayDropDown ?
            <div className='dropdown-container'>
              <ul className="dropdown-list">
                <li><Link to={`/profile/${currentUser._id}`}>My Profile</Link></li>
                <li><Link to="/myrecipes">My Recipes</Link></li>
                <li><Link to="/addrecipe">Add Recipe</Link></li>
                <li><Link to="/shoppinglist">Shopping List</Link></li>
                <li><Link to="/updateprofile">Edit Profile</Link></li>
                <li onClick={handleLogout}>Log Out</li>
              </ul>
            </div>
            :
            <></>}
        </div>
      }
    </nav>
  )
}

export default Nav