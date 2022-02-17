import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { getTokenFromLocalStorage, getPayload, userIsAuthenticated } from '../helper/authHelper'

import Nav from '../Nav'

import recipePlaceholder from '../../assets/placeholder_recipe_pic.png'


const Recipe_page = () => {

  const navigate = useNavigate()

  const { id } = useParams()
  const [recipe, setRecipe] = useState({})
  const [currentUser, setCurrentUser] = useState()
  const [isFavourite, setIsFavourite] = useState(false)
  const [isOwn, setIsOwn] = useState(false)
  const [forX, setForX] = useState(1)

  const [deleteLastChance, setDeleteLastChance] = useState(false)

  const [reviewInput, setReviewInput] = useState({
    text: '',
    rating: 1
  })




  useEffect(() => {
    const getRecipe = async () => {
      try {
        const { data } = await axios.get(`/api/recipes/${id}`)

        setRecipe(data)
        console.log('here')
        console.log(data)
      } catch (err) {
        console.log(err)
      }
    }
    getRecipe()
  }, [])

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const payload = getPayload()
        const { data } = await axios.get(`/api/profile/${payload.sub}`)
        setCurrentUser(data)
        if (data.favRecipes.some(favRec => favRec._id === recipe._id)) {
          setIsFavourite(true)
        }
        if (data.yourRecipes.some(yourRec => yourRec._id === recipe._id)) {
          setIsOwn(true)
        }
      } catch (err) {
        console.log(err)
      }
    }
    getCurrentUser()
  }, [recipe])

  const filterQuantity = (e) => {
    setForX(parseFloat(e.target.value))
  }

  const handleAddFavourite = async () => {
    try {
      !userIsAuthenticated() && navigate('/login')
      await axios.get(`/api/favourites/${recipe._id}`, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`
        }
      })
      setIsFavourite(true)
    } catch (error) {
      console.log(error)
    }
  }

  const handleRemFavourite = async () => {
    try {
      await axios.delete(`/api/favourites/${recipe._id}`, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`
        }
      })
      setIsFavourite(false)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteCheck = () => {
    setDeleteLastChance(true)
  }

  const handleDeleteRecipe = async () => {
    try {
      await axios.delete(`/api/recipes/${recipe._id}`, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`
        }
      })
      navigate('/myrecipes')
    } catch (error) {
      console.log(error)
    }
  }


  const handleReviewInputChange = (e) => {
    setReviewInput({ ...reviewInput, text: `${currentUser.username} says: ${e.target.value}` })
  }
  const handleRatingSelect = (e) => {
    setReviewInput({ ...reviewInput, rating: e.target.value })
  }


  const handleReviewSubmit = async () => {
    !userIsAuthenticated() && navigate('/login')
    try {
      await axios.post(`/api/recipes/${recipe._id}/reviews`, reviewInput, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`
        }
      })
      const { data } = await axios.get(`/api/recipes/${id}`)
      setRecipe(data)
      document.getElementById('text-to-reset').value = ''
      setReviewInput({
        text: '',
        rating: 1
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className='recipe-page'>
      <Nav />
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
                    {isOwn ?
                      <>
                        <Link to={`/updaterecipe/${recipe._id}`}><button className='green-branded-button'>Edit</button></Link>
                        {deleteLastChance ?
                          <button className='red-branded-button' onClick={handleDeleteRecipe}>Are You Sure?</button>
                          :
                          <button className='green-branded-button' onClick={deleteCheck}>Delete</button>
                        }

                      </>
                      :
                      isFavourite ?
                        <button className='green-branded-button' onClick={handleRemFavourite}>Unfavourite</button>
                        :
                        <button className='green-branded-button' onClick={handleAddFavourite}>Favourite</button>
                    }
                  </div>
                </div>
                <div className='recipe-info'>
                  <h4>Cooking Time: {recipe.cookingTime} mins</h4>
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
                <textarea rows='7' cols='50' maxLength='300' placeholder='How was your meal?' onChange={handleReviewInputChange} id='text-to-reset'></textarea>
              </div>
              <div className='rating-btns'>
                <p>Rating:</p>
                <button className='filled-rating-btn' value={1} onClick={handleRatingSelect}>1</button>
                <button className={reviewInput.rating >= 2 ? 'filled-rating-btn' : 'rating-btn'} value={2} onClick={handleRatingSelect}>2</button>
                <button className={reviewInput.rating >= 3 ? 'filled-rating-btn' : 'rating-btn'} value={3} onClick={handleRatingSelect}>3</button>
                <button className={reviewInput.rating >= 4 ? 'filled-rating-btn' : 'rating-btn'} value={4} onClick={handleRatingSelect}>4</button>
                <button className={reviewInput.rating >= 5 ? 'filled-rating-btn' : 'rating-btn'} value={5} onClick={handleRatingSelect}>5</button>
              </div>
              <div className='submit-btn'>
                <button id='s-btn' onClick={handleReviewSubmit}>Submit</button>
              </div>
            </div>
            <div className='review-display'>
              {recipe.reviews.length === 0 ?
                <p>no reviews yet</p>
                :
                recipe.reviews.slice(0).reverse().map((review, index) =>
                  <div className='review-container' key={index}>
                    <p>{review.text}</p>

                    <p>rating: {review.rating}</p>
                  </div>
                )
              }


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