import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const Recipe_page = () => {
  
  const [recipe, setRecipe] = useState({})
  const { id } = useParams()

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const { data } = await axios.get(`/api/recipes/${id}`)
        setRecipe(data)
      } catch (err) {
        console.log(err)
      }
  }
    getRecipes()
  }, [])


  return (
    <section className='recipe-page'>
      <h1>{recipe.title}</h1>
    </section>
  ) 
  
}

export default Recipe_page