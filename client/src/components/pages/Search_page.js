import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import axios from 'axios'
import recipePlaceholder from '../../assets/placeholder_recipe_pic.png'

import Nav from '../Nav'

const Search = () => {

  const location = useLocation()
  //let homepageSearchContents = location.state
  const [homepageSearchContents, setHomepageSearchContents] = useState(location.state)
  const [SearchInput, setSearchInput] = useState(homepageSearchContents)
  const [allRecipes, setAllRecipes] = useState([]) 
  const [searchedRecipes, setSearchedRecipes] = useState([])
  const [errorMessage, setErrorMessage] = useState('') 


  useEffect(() => {
    const getRecipes = async () => {
      try {
        const { data } = await axios.get('/api/recipes')
        setAllRecipes(data)
        const foundRecipes = []
        for (let i = 0; i < data.length; i++){
          if(data[i].title.toLowerCase().includes(SearchInput.toLowerCase()) || data[i].tags.some(tag => tag.toLowerCase().includes(SearchInput.toLowerCase())) || data[i].ingredients.some(ing => ing.ingredient.toLowerCase().includes(SearchInput.toLowerCase()))){
          foundRecipes.push(data[i])
          }
        }
        setSearchedRecipes(foundRecipes)
        if (foundRecipes.length === 0){
          setErrorMessage('sorry, we could not find anything that matches that')
        }
      } catch (err) {
        console.log(err)
      }
  }
    getRecipes()
  }, [])




  const handleTextInputChange = (e) => {
    setSearchInput(e.target.value)
    setHomepageSearchContents('')
    setErrorMessage('')
  }

  const runSearch = () => {
    if(SearchInput === '' || SearchInput === null){

    } else {
      const foundRecipes = []
      for (let i = 0; i < allRecipes.length; i++){
        if(allRecipes[i].title.toLowerCase().includes(SearchInput.toLowerCase()) || allRecipes[i].tags.some(tag => tag.toLowerCase().includes(SearchInput.toLowerCase())) || allRecipes[i].ingredients.some(ing => ing.ingredient.toLowerCase().includes(SearchInput.toLowerCase()))){
          foundRecipes.push(allRecipes[i])
        }
      }
      setSearchedRecipes(foundRecipes)
      if (foundRecipes.length === 0){
      setErrorMessage('sorry, we could not find anything that matches that')
      }
    }
  }

  return (
    <section className='searchPage'>
      <Nav />
      <div className='search-bar-container'>
        <input type='text' placeholder={homepageSearchContents === '' || homepageSearchContents === null ? 'Search...' : homepageSearchContents} onChange={handleTextInputChange}></input>
        <button className='branded-button' onClick={runSearch}>Go</button>
      </div>
      <p>{errorMessage}</p>
      <div className='recipe-card-dislay-container'>
        {searchedRecipes?.map((recipe, index) => {
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

export default Search
