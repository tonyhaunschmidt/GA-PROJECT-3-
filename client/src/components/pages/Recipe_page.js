import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'


const Recipe_page = () => {

  const [recipe, setRecipe] = useState({})
  const [forX, setForX] = useState(1)
  // const [backendReviews, setBackendReviews] = useState
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

  const fav = (e) => {

  }

  const filterQuantity = (e) => {
    setForX(parseFloat(e.target.id))
  }
  const submitReview = (e) => {

  }


  return (
    <section className='recipe-page'>
      {recipe.owner ?
        <>
          <header>
            <img src={recipe.image} alt={recipe.image} />
            <h1>{recipe.title}</h1>
            <button onClick={fav} id='favs'>Favourites</button>
          </header>
          <body>
            <div className='recipe-info'>
              <h4><span>Cooking Time: </span>{recipe.cookingTime}</h4>
              <h4><span>Meal Type: </span>{recipe.mealType}</h4>
              <h4><Link to={`/profile/${recipe.owner._id}`}><p>{recipe.owner.username}</p></Link></h4>
              <h4><span>Avg rating: </span>{recipe.avgRating}</h4>
            </div>
            <div className='description'>
              <p>{recipe.description}</p>
            </div>
            <div className='ingredients'>
              <h3>Ingredients</h3>
              <button onClick={filterQuantity} id='1'>1 Serving</button>
              <button onClick={filterQuantity} id='2'>2 Servings</button>
              <button onClick={filterQuantity} id='3'>3 Servings</button>
              <button onClick={filterQuantity} id='4'>4 Servings</button>
              {recipe.ingredients.map(ingredient => {
                return (
                  <div className='ingredient'>
                    <p>{ingredient.ingredient}</p><p>{ingredient.measure}</p>
                    {forX === 1 ?
                      <p>{ingredient.quantityForOne}</p>
                      :
                      forX === 2 ?
                        <p>{ingredient.quantityForTwo}</p>
                        :
                        forX === 3 ?
                          <p>{ingredient.quantityForThree}</p>
                          :
                          forX === 4 ?
                            <p>{ingredient.quantityForFour}</p>
                            :
                            <>
                            </>
                    }
                  </div>
                )
              })}
            </div>
            <div className='steps'>
              <h3>Method</h3>
              {recipe.method.map(steps => {
                return <p>{steps.step} {steps.instruction}</p>
              })}
            </div>
            <div className='tags'>
              <h4>Tags</h4>
              {recipe.tags.map(tag => {
                return <ul><li>{tag}</li></ul>
              })}
            </div>
            <h3>Reviews</h3>
            {/* Username: <input type='text' id='username' /> */}
            <textarea rows='7' cols='50' maxLength='300'></textarea>
            <button onClick={submitReview} id='submit'>Submit</button>
            {recipe.reviews.map(review => {
              return <p>{recipe.username} {recipe.text} {recipe.rating} {recipe.timestamp}</p>
            })}
            {/* <div>
              <h2>We are done</h2>
            </div> */}
          </body>
        </>
        :
        <p>loading...</p>
      }
    </section>
  )
}

export default Recipe_page