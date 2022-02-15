import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate} from 'react-router-dom'

import { userIsAuthenticated, getPayload } from '../helper/authHelper'

import recipePlaceholder from '../../assets/placeholder_recipe_pic.png'

const MyRecipes = () => {

  const navigate = useNavigate()

  const [currentUser, setCurrentUser] = useState({})

  const [SearchInput, setSearchInput] = useState('')
  const [myAndFavRecipes, setMyAndFavRecipes] = useState([])
  const [filteredRecipes, setFilteredRecipes] = useState([])
  const [searchedRecipes, setSearchedRecipes] = useState([])
  const [recipesToDisplay, setRecipesToDisplay] = useState([])
  const [errorMessage, setErrorMessage] = useState('') 

  
  useEffect(() => {
    !userIsAuthenticated() && navigate('/login')
    const getCurrentUser = async () => {
      try {
        const payload = getPayload()
        const { data } = await axios.get(`/api/profile/${payload.sub}`)
        setCurrentUser(data)
        setRecipesToDisplay([ ...data.yourRecipes ])
        setMyAndFavRecipes([ ...data.yourRecipes, ...data.favRecipes ])
      } catch (err) {
        console.log(err)
      }
    }
    getCurrentUser()
  }, [])

  const handleTextInputChange = (e) => {
    setSearchInput(e.target.value)
    setErrorMessage('')
  }

  const handleFilter = (e) => {
    if (e.target.value === 'myRecipes'){
      setFilteredRecipes(currentUser.yourRecipes)
    }
    if (e.target.value === 'favRecipes'){
      setFilteredRecipes(currentUser.favRecipes)
    }
    if (e.target.value === 'allRecipes'){
      setFilteredRecipes(myAndFavRecipes)
    }
    setErrorMessage('')
  }

  useEffect(() => {
    runSearch()
  }, [filteredRecipes])
   

  const runSearch = () => {
    console.log(filteredRecipes)
    console.log(SearchInput)
    if(SearchInput === '' || SearchInput === null){
      setRecipesToDisplay(filteredRecipes)
    } else {
      const foundRecipes = []
      for (let i = 0; i < filteredRecipes.length; i++){
        if(filteredRecipes[i].title.toLowerCase().includes(SearchInput.toLowerCase()) || filteredRecipes[i].tags.some(tag => tag.toLowerCase().includes(SearchInput.toLowerCase())) || filteredRecipes[i].ingredients.some(ing => ing.ingredient.toLowerCase().includes(SearchInput.toLowerCase()))){
          foundRecipes.push(filteredRecipes[i])
        }
      }
      console.log('here', foundRecipes)
      setRecipesToDisplay([ ...foundRecipes ])
      if (foundRecipes.length === 0){
      setRecipesToDisplay(filteredRecipes)
      setErrorMessage('sorry, we could not find anything that matches that')
      }
    }
  }


  return (
    <section className='my-recipes-page'>
      <div className='search-bar-container'>
        <input type='text' placeholder='Search...' onChange={handleTextInputChange}></input>
        <button className='branded-button' onClick={runSearch}>Go</button>
      </div>
      <p>{errorMessage}</p>
      <div className='profile-main-section-header'>
        <ul>
          <li><button onClick={handleFilter} value='myRecipes'>My recipes</button></li> {/**************************** add on click to filter display array- also fade or highlight selected ********************/}
          <li><button onClick={handleFilter} value='favRecipes'>My favourites</button></li>
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
    </section>
  )
}

export default MyRecipes