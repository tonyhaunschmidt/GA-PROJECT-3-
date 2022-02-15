import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import { getPayload, getTokenFromLocalStorage } from '../helper/authHelper'

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


  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await axios.get(`/api/profile/${id}`)
        setProfile(data)
        console.log(data)
        setRecipesToDisplay(data.yourRecipes)
        setMyAndFavRecipes([ ...data.yourRecipes, ...data.favRecipes ])
        setFollowerCount(data.followers.length)
      } catch (err) {
        console.log(err)
      }
    }
    const getCurrentUser = async () => {
      try {
        const payload = getPayload()
        const { data } = await axios.get(`/api/profile/${payload.sub}`)
        setCurrentUser(data)
        if (data.following.some(followingprofile => followingprofile._id === profile._id)){  //WHY IS THIS NOT WORKING!!!!!!
          setIsUserFollowing(true)}
      } catch (err) {
        console.log(err)
      }
    }
    getProfile()
    getCurrentUser()
  }, [])

  


  const handleFilter = (e) => {
    if (e.target.value === 'myRecipes'){
      setRecipesToDisplay(profile.yourRecipes)
    }
    if (e.target.value === 'favRecipes'){
      setRecipesToDisplay(profile.favRecipes)
    }
    if (e.target.value === 'allRecipes'){
      setRecipesToDisplay(myAndFavRecipes)
    }
  }

  const handleFollow = async () => {
    console.log(currentUser)
    if (!currentUser._id){
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


  return (
    <section className='profile-page'>
      {console.log(isUserFollowing)}
      <div className='profile-card'>
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
            <li>Followers</li>  {/**************************** add on click to open pop up ********************/}
            <li>Following</li>
          </ul>
          {profile.yourRecipes ? 
          <ul>
            <li>{profile.yourRecipes.length}</li> 
            <li>{profile.favRecipes.length}</li>
            <li>{followerCount}</li>
            <li>{profile.following.length}</li>
          </ul>
            :
          <p></p>
          }
        </div>
        <div className='button-container'>
          {
            isUserFollowing?
            <button className='branded-button' onClick={handleUnfollow}>UNFOLLOW</button>
              :
            <button className='branded-button' onClick={handleFollow}>FOLLOW</button>
          }
        </div>
      </div>
      <div className='profile-main-section'>
        <div className='profile-main-section-header'>
          <ul>
            <li><button onClick={handleFilter} value='myRecipes'>{!profile.name ? profile.username : profile.name}'s recipes</button></li> {/**************************** add on click to filter display array- also fade or highlight selected ********************/}
            <li><button onClick={handleFilter} value='favRecipes'>{!profile.name ? profile.username : profile.name}'s favourites</button></li>
            <li><button onClick={handleFilter} value='allRecipes'>All</button></li>
          </ul>
        </div>
        <div className='recipe-card-dislay-container'>
          {recipesToDisplay?.map((recipe, index) => {
            return (
              <Link key={index} to={`/recipe/${recipe._id}`}>
                <div  className='recipe-card'>
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
          )})}
        </div>
      </div>
    </section>
    )
}

export default ProfileOther