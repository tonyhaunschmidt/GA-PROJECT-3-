import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { Link, useNavigate } from 'react-router-dom'

import { userIsAuthenticated, getPayload } from '../helper/authHelper.js'

import faceCookLogo from '../../assets/full_logo.png'
import recipePlaceholder from '../../assets/placeholder_recipe_pic.png'



const Welcome = () => {

  //const [recipes, setRecipes] = useState([]) 
  const [featuredRecipes, setFeaturedRecipes] = useState([])
  const [randomRecipes, setRandomRecipes] = useState([])
  const [SearchInput, setSearchInput] = useState('')
  const [currentUser, setCurrentUser] = useState({})
  let randomQty = 20

  const navigate = useNavigate()

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const { data } = await axios.get('/api/recipes')
        //setRecipes(data)
        const featRecipes = []
        for (let i = 0; i < data.length; i++) {
          if (data[i].Featured === true) { //****** AFTER RE-SEEDING- CHANGE THE UPPERCASE 'F' ON FEATURED TO LOWERCASE
            featRecipes.push(data[i])
          }
        }
        setFeaturedRecipes(featRecipes)
        const allRecipes = [...data]
        const ranRecipes = []

        while (randomQty > 0 && allRecipes.length > 0) {
          const randomRecipeIndex = Math.floor(Math.random() * allRecipes.length)
          ranRecipes.push(allRecipes[randomRecipeIndex])
          allRecipes.splice(randomRecipeIndex, 1)
          randomQty--
        }
        setRandomRecipes(ranRecipes)
      } catch (err) {
        console.log(err)
      }
    }
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
    getRecipes()
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('faceCook-token')
    navigate('/')
  }

  const handleTextInputChange = (e) => {
    setSearchInput(e.target.value)
  }

  return (
    <section className='welcome'>
      <img className='main-logo' src={faceCookLogo} alt='facecook logo' />
      <div className='search-and-login-container'>
        <div className='search-bar-container'>
          <input type='text' placeholder='Search...' onChange={handleTextInputChange}></input>
          {SearchInput === '' ? <button className='grey-branded-button' id='no-hover'>Go</button> : <Link to='/search' state={SearchInput}><button className='grey-branded-button' id='no-hover' >Go</button></Link>}
        </div>
        <ul>
          {!userIsAuthenticated() ? <><Link to={'/login'}><li>log in</li></Link><Link to={'/register'}><li>sign up</li></Link></> : <><Link to={`/profile/${currentUser._id}`}><li>My Profile</li></Link><div id='logout' onClick={handleLogout} >Log out</div></>}
        </ul>
      </div>
      <div className='welcome-page-banner'>
        <h2>Featured</h2>
        <div className='display-recipe-bar'>
          {featuredRecipes?.map((recipe, index) => {
            return (
              <Link key={index} to={`recipe/${recipe._id}`}>
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
      <div className='welcome-page-banner'>
        <h2>Discover</h2>
        <div className='display-recipe-bar'>
          {randomRecipes?.map((recipe, index) => {
            return (
              <Link key={index} to={`recipe/${recipe._id}`}>
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

export default Welcome




{/*  fix problem with button */ }
// pop out recipe tiles 