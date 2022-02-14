import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'

const Recipe_page = () => {
  
  const [recipe, setRecipe] = useState({})
  const { id } = useParams()

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const { data } = await axios.get(`/api/recipes/${id}`)
        setRecipe(data)
        console.log(data)
      } catch (err) {
        console.log(err)
      }
  }
    getRecipe()
  }, [])


  return (
    <section className='recipe-page'>
      {recipe.owner ?
      <>
        <h1>{recipe.title}</h1>
        <Link to={`/profile/${recipe.owner._id}`}><p>{recipe.owner.username}</p></Link>
      </>
      :
      <p>loading...</p>
      }
    </section>
  ) 
  console.log(test)
}

export default Recipe_page