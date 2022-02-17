import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import recipePlaceholder from '../../assets/placeholder_recipe_pic.png'


const Recipe_page = () => {

  const [recipe, setRecipe] = useState({})
  const [forX, setForX] = useState(1)
  const [reviews, setReviews] = useState([])
  //console.log(setReviews)
  const { id } = useParams()

  const submitReview = (e) => {
    //console.log(e.target)
    setReviews(reviews + [])
    //console.log(reviews)
  }

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const { data } = await axios.get(`/api/recipes/${id}`)
        setRecipe(data)
        //console.log(data)
      } catch (err) {
        //console.log(err)
      }
    }
    getRecipe()
  }, [])

  useEffect(() => {
    console.log('Review Added', reviews)
    document.length = `New review ${reviews} has been added`
    console.log(reviews)
  }, [reviews])

  const fav = (e) => {

  }

  const filterQuantity = (e) => {
    setForX(parseFloat(e.target.value))
  }

  return (
    <section className='recipe-page'>
      {recipe.owner ?
        <>
          <header>
            <div className='header'>
              <div className='image'>
                {recipe.image === 'imageurl' ?
                  <img src={recipePlaceholder} alt='placeholder recipe' />
                  :
                  <img src={recipe.image} alt={recipe.title} />}
              </div>
              <div className='rest-of-header'>
                <div className='title-fav-btn'>
                  <div className='title'>
                    <h1>{recipe.title}</h1>
                  </div>
                  <div className='fav-btn'>
                    <button onClick={fav} id='favs'>Favourites</button>
                  </div>
                </div>
                <div className='recipe-info'>
                  <h4><span>Cooking Time: </span>{recipe.cookingTime}</h4>
                  <h4><span>Meal Type: </span>{recipe.mealType}</h4>
                  <h4><Link to={`/profile/${recipe.owner._id}`}><p>{recipe.owner.username}</p></Link></h4>
                  <h4><span>Avg rating: </span>{recipe.avgRating}</h4>
                </div>
                <div className='description'>
                  <p>{recipe.description}</p>
                </div>
              </div>
            </div>
          </header>
          <div className='ingredients-and-methods'>
            <div className='ingredients'>
              <div className='ingre-btn'>
                <h3>Ingredients</h3>
                <button onClick={filterQuantity} value={1} className='green-branded-button'> 1 Serving</button>
                <button onClick={filterQuantity} value={2} className='green-branded-button'>2 Servings</button>
                <button onClick={filterQuantity} value={3} className='green-branded-button'>3 Servings</button>
                <button onClick={filterQuantity} value={4} className='green-branded-button'>4 Servings</button>
              </div>
              {recipe.ingredients.map((ingredient, index) => {
                return (
                  <div className='ingredient' key={index}>
                    {/* <p>{ingredient.ingredient}</p> */}
                    {forX === 1 ?
                      <p>{ingredient.ingredient} {ingredient.quantityForOne} {ingredient.measure}</p>
                      :
                      forX === 2 ?
                        <p>{ingredient.ingredient} {ingredient.quantityForTwo} {ingredient.measure}</p>
                        :
                        forX === 3 ?
                          <p>{ingredient.ingredient} {ingredient.quantityForThree} {ingredient.measure}</p>
                          :
                          forX === 4 ?
                            <p>{ingredient.ingredient} {ingredient.quantityForFour} {ingredient.measure}</p>
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
                return <><p>{'Step: '}{steps.step}</p><p>{steps.instruction}</p></>
              })}
            </div>
          </div>
          <div className='tags'>
            <h4>Tags</h4>
            <ul className='tags-display'>
              {recipe.tags.map(tag => {
                return <li>{tag}</li>

              })}
            </ul>
          </div>
          <>
            <div className='review'>
              <h3>Reviews</h3>
              <div className='comments'>
                <textarea rows='7' cols='50' maxLength='300' placeholder='How was your meal?'{...reviews.push()}></textarea>
              </div>
              <div className='submit-btn'>
                <button onClick={submitReview.map} id='s-btn'>Submit</button>
              </div>
            </div>
          </>
        </>
        :
        <p>loading...</p>
      }
    </section>
  )
}

export default Recipe_page