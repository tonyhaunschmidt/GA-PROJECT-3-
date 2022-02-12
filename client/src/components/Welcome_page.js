import React, { useEffect, useState }  from 'react'
import axios  from 'axios'


import faceCookLogo from '../assets/full_logo.png'
import recipePlaceholder from '../assets/placeholder_recipe_pic.png'


const Welcome = () => {

  const [recipes, setRecipes] = useState([]) 
  const [featuredRecipes, setFeaturedRecipes] = useState([])
  const [randomRecipes, setRandomRecipes] = useState([])
  const randomQty = 20


  useEffect(() => {
    const getRecipes = async () => {
      try {
        const { data } = await axios.get('/api/recipes')
        setRecipes(data)
        const featRecipes = []
        for (let i = 0; i < data.length; i++){
          if (data[i].Featured === true) { //****** AFTER RE-SEEDING- CHANGE THE UPPERCASE 'F' ON FEATURED TO LOWERCASE
            featRecipes.push(data[i])
          }
        }
        setFeaturedRecipes(featRecipes)

        const ranRecipes = []
        for (let i = 0; i < randomQty; i++){
          ranRecipes.push(data[Math.floor(Math.random() * data.length)])
        }
        setRandomRecipes(ranRecipes)
      } catch (err) {
        console.log(err)
      }
  }
    getRecipes()
}, [])






  return ( 
    <section className='welcome'>
      <img src={faceCookLogo}  alt='facecook logo' />
      <div className='search-and-login-container'>
        <div className='search-bar-container'>
          <input type='text' placeholder='Search...' ></input>
          <button className='branded-button'>Go</button>
        </div>
          <ul>
            <li>sign up</li>
            <li>log in</li>
          </ul>
      </div>
      <div className='welcome-page-banner'>
        <h2>Featured</h2>
        <div className='display-recipe-bar'>
          {featuredRecipes?.map(recipe => {
            return (
            <div key={recipe._id} className='recipe-card'>
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
            )})}
        </div>
      </div>  
      <div className='welcome-page-banner'>
        <h2>Discover</h2>
        <div className='display-recipe-bar'>
        {randomRecipes?.map(recipe => {
            return (
            <div key={recipe._id} className='recipe-card'>
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
            )})}
        </div>
      </div>
    </section>
  )
}

export default Welcome