import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import { getPayload, getTokenFromLocalStorage } from '../helper/authHelper'

import Nav from '../Nav'
import profilePlaceholder from '../../assets/placeholder_profile_pic.png'
import recipePlaceholder from '../../assets/placeholder_recipe_pic.png'

const ProfileOther = () => {

  const navigate = useNavigate()

  const { id } = useParams()
  const [currentUser, setCurrentUser] = useState({})
  const [profile, setProfile] = useState({})
  const [followerCount, setFollowerCount] = useState(0)

  const [recipesToDisplay, setRecipesToDisplay] = useState([])
  const [myAndFavRecipes, setMyAndFavRecipes] = useState([])
  const [isUserFollowing, setIsUserFollowing] = useState(false)

  const [showPopUp, setShowPopUp] = useState(false)
  const [followToDisplay, setFollowToDisplay] = useState([])


  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await axios.get(`/api/profile/${id}`)
        setProfile(data)
        console.log(data)
        setRecipesToDisplay(data.yourRecipes)
        setMyAndFavRecipes([...data.yourRecipes, ...data.favRecipes])
        setFollowerCount(data.followers.length)
        setFollowToDisplay(data.following)
      } catch (err) {
        console.log(err)
      }
    }

    getProfile()


  }, [])

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const payload = getPayload()
        const { data } = await axios.get(`/api/profile/${payload.sub}`)
        setCurrentUser(data)
        console.log('df', data.following)
        if (data.following.some(followingprofile => followingprofile._id === profile._id)) {  //WHY IS THIS NOT WORKING!!!!!!

          setIsUserFollowing(true)
        }
      } catch (err) {
        console.log(err)
      }
    }
    getCurrentUser()
  }, [profile])




  const handleFilter = (e) => {
    if (e.target.value === 'myRecipes') {
      setRecipesToDisplay(profile.yourRecipes)
    }
    if (e.target.value === 'favRecipes') {
      setRecipesToDisplay(profile.favRecipes)
    }
    if (e.target.value === 'allRecipes') {
      setRecipesToDisplay(myAndFavRecipes)
    }
  }

  const handleFollow = async () => {
    console.log(currentUser)
    if (!currentUser._id) {
      navigate('/login')
    } else {
      await axios.get(`/api/following/${profile._id}`, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        }
      })
      setIsUserFollowing(true)
      setFollowerCount(followerCount + 1)
    }
  }

  const handleUnfollow = async () => {
    await axios.delete(`/api/following/${profile._id}`, {
      headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage()}`,
      }
    })
    setIsUserFollowing(false)
    setFollowerCount(followerCount - 1)
  }

  const showPopUpOn = () => {
    setShowPopUp(true)
  }
  const showPopUpOff = () => {
    setShowPopUp(false)
  }

  const handlePopUpFilter = (e) => {
    if (e.target.value === 'followers') {
      setFollowToDisplay(profile.followers)
    }
    if (e.target.value === 'following') {
      setFollowToDisplay(profile.following)
    }
  }

  const handleNewProfile = (id) => {
    navigate(`/profile/${id}`)
  }


  return (
    <section className='profile-page'>
      <Nav />
      {console.log(isUserFollowing)}
      <div className='profile-card'>
        {showPopUp &&
          <div className='follower-following-popup'>
            <div className='follower-following-header'>
              <div className='filter-options'>
                <button onClick={handlePopUpFilter} value='followers' className='left-button'>Followers</button> {/**************************** add on click to filter display array- also fade or highlight selected ********************/}
                <button onClick={handlePopUpFilter} value='following'>Following</button>
              </div>
            </div>
            <div className='profile-list-display'>
              {followToDisplay.map((profile, index) =>
                <Link to={`/profile/${profile._id}`} onClick={() => window.location.assign(`/profile/${profile._id}`)}>
                  <div className='profile-list-item'>
                    {!profile.profileImage ?
                      <img src={profilePlaceholder} alt='placeholder recipe' />
                      :
                      <img src={profile.image} alt={profile.title} />}
                    <p>{profile.username}</p>
                  </div>
                </Link>
              )}
            </div>
            <div className='button-container'>
              <button className='green-branded-button' onClick={showPopUpOff}>Close</button>
            </div>
          </div>}
        <div className='pic-and-name-container'>
          {!profile.profileImage ?
            <img src={profilePlaceholder} alt='placeholder recipe' />
            :
            <img src={profile.image} alt={profile.title} />}
          <div className='name-container'>
            {!profile.name ?
              <h2>{profile.username}</h2>
              :
              <h2>{profile.name}</h2>}
            <h4>{profile.username}</h4>
          </div>
        </div>
        <div className='bio-container'>
          {!profile.bio ?
            <p>Hello, my name is {!profile.name ? profile.username : profile.name}</p>
            :
            <p>{!profile.bio}</p>
          }
        </div>
        <div className='profile-stats-container'>
          <ul>
            <li>{!profile.name ? profile.username : profile.name}'s recipes</li>
            <li>{!profile.name ? profile.username : profile.name}'s favourites</li>
            <li onClick={showPopUpOn}>Followers</li>  {/**************************** add on click to open pop up ********************/}
            <li onClick={showPopUpOn}>Following</li>
          </ul>
          {profile.yourRecipes ?
            <ul>
              <li>{profile.yourRecipes.length}</li>
              <li>{profile.favRecipes.length}</li>
              <li onClick={showPopUpOn}>{followerCount}</li>
              <li onClick={showPopUpOn}>{profile.following.length}</li>
            </ul>
            :
            <p></p>
          }
        </div>
        <div className='button-container'>
          {currentUser.following ?
            isUserFollowing ?
              <button className='green-branded-button' onClick={handleUnfollow}>UNFOLLOW</button>
              :
              <button className='green-branded-button' onClick={handleFollow}>FOLLOW</button>
            :
            <></>
          }
        </div>
      </div>
      <div className='profile-main-section'>
        <div className='profile-main-section-header'>
          <div className='filter-options'>
            <button onClick={handleFilter} value='myRecipes' className='left-button'>{!profile.name ? profile.username : profile.name}'s Recipes</button> {/**************************** add on click to filter display array- also fade or highlight selected ********************/}
            <button onClick={handleFilter} value='favRecipes' className='middle-button'>{!profile.name ? profile.username : profile.name}'s Favourites</button>
            <button onClick={handleFilter} value='allRecipes' className='right-button'>All</button>
          </div>
        </div>
        <div className='recipe-card-dislay-container'>
          {recipesToDisplay?.map((recipe, index) => {
            return (
              <Link key={index} to={`/recipe/${recipe._id}`}>
                <div className='recipe-card'>
                  <div className='recipe-image-container'>
                    {recipe.image === 'imageurl' ?
                      <img src={recipePlaceholder} alt='placeholder recipe' />
                      :
                      <img src={recipe.image} alt={recipe.title} />}
                  </div>
                  <div className='text-container'>
                    <h3>{recipe.title}</h3>
                    <p>{recipe.avgRating}</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ProfileOther