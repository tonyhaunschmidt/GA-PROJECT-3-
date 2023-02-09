import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { getPayload } from '../helper/authHelper'

import Nav from '../Nav'

const ShoppingList = () => {

  const [currentUser, setCurrentUser] = useState()
  const [myAndFavRecipes, setMyAndFavRecipes] = useState([])
  const [dateBracket, setDateBracket] = useState({
    start: new Date(),
    end: new Date(),
  })
  //const [recipesInDateBracket, setRecipesInDateBracket] = useState([])
  const [mealPlanInBracket, setMealPlanInBracket] = useState([])
  const [shoppingList, setShoppingList] = useState([])

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const payload = getPayload()
        const { data } = await axios.get(`/api/profile/${payload.sub}`)
        setMyAndFavRecipes([...data.yourRecipes, ...data.favRecipes])
        setCurrentUser(data)
      } catch (err) {
        console.log(err)
      }
    }
    getCurrentUser()
  }, [])

  const handleDateBracketChange = (e) => {
    console.log(e.target.name, Date.parse(e.target.value))
    console.log(currentUser.mealPlan.find(day => Date.parse(day.date) === Date.parse(e.target.value)))
    setDateBracket({ ...dateBracket, [e.target.name]: e.target.value })

  }

  const generateShoppingList = async () => {
    //go through recipe in date bracket and axios get each recipe and put into an array
    //that is then shown below
    console.log('here')
    const mealPlanInDateBracket = []
    let ingredientsShoppingList = []
    for (let i = 0; i < currentUser.mealPlan.length; i++) {

      if (Date.parse(currentUser.mealPlan[i].date) >= Date.parse(dateBracket.start) && Date.parse(currentUser.mealPlan[i].date) <= Date.parse(dateBracket.end)) {
        mealPlanInDateBracket.push(currentUser.mealPlan[i])
        try {
          const { data } = await axios.get(`/api/recipes/${currentUser.mealPlan[i].breakfast}`)
          for (let j = 0; j < data.ingredients.length; j++) {
            let qty
            if (currentUser.mealPlan[i].breakfastQty === '1') {
              qty = data.ingredients[j].quantityForOne
            } else if (currentUser.mealPlan[i].breakfastQty === '2') {
              qty = data.ingredients[j].quantityForTwo
            } else if (currentUser.mealPlan[i].breakfastQty === '3') {
              qty = data.ingredients[j].quantityForThree
            } else if (currentUser.mealPlan[i].breakfastQty === '4') {
              qty = data.ingredients[j].quantityForFour
            }
            if (ingredientsShoppingList.some(ingredient => ingredient.ingredient === data.ingredients[j].ingredient)) {
              const ingredientToUpdate = ingredientsShoppingList.find(ingredient => ingredient.ingredient === data.ingredients[j].ingredient)
              if (ingredientToUpdate.measure === data.ingredients[j].measure) {
                const updatedIngredient = {
                  ...ingredientToUpdate,
                  quantity: ingredientToUpdate.quantity + qty
                }
                ingredientsShoppingList.splice(ingredientsShoppingList.indexOf(ingredientToUpdate), 1, updatedIngredient)
              } else {
                ingredientsShoppingList.push({ ingredient: data.ingredients[j].ingredient, quantity: qty, measure: data.ingredients[j].measure })
              }
            } else (
              ingredientsShoppingList.push({ ingredient: data.ingredients[j].ingredient, quantity: qty, measure: data.ingredients[j].measure })
            )
          }
        } catch (err) {
          console.log(err)
        }
        try {
          const { data } = await axios.get(`/api/recipes/${currentUser.mealPlan[i].lunch}`)
          for (let j = 0; j < data.ingredients.length; j++) {
            let qty
            if (currentUser.mealPlan[i].lunchQty === '1') {
              qty = data.ingredients[j].quantityForOne
            } else if (currentUser.mealPlan[i].lunchQty === '2') {
              qty = data.ingredients[j].quantityForTwo
            } else if (currentUser.mealPlan[i].lunchQty === '3') {
              qty = data.ingredients[j].quantityForThree
            } else if (currentUser.mealPlan[i].lunchQty === '4') {
              qty = data.ingredients[j].quantityForFour
            }
            if (ingredientsShoppingList.some(ingredient => ingredient.ingredient === data.ingredients[j].ingredient)) {
              const ingredientToUpdate = ingredientsShoppingList.find(ingredient => ingredient.ingredient === data.ingredients[j].ingredient)
              if (ingredientToUpdate.measure === data.ingredients[j].measure) {
                const updatedIngredient = {
                  ...ingredientToUpdate,
                  quantity: ingredientToUpdate.quantity + qty
                }
                ingredientsShoppingList.splice(ingredientsShoppingList.indexOf(ingredientToUpdate), 1, updatedIngredient)
              } else {
                ingredientsShoppingList.push({ ingredient: data.ingredients[j].ingredient, quantity: qty, measure: data.ingredients[j].measure })
              }
            } else (
              ingredientsShoppingList.push({ ingredient: data.ingredients[j].ingredient, quantity: qty, measure: data.ingredients[j].measure })
            )
          }
        } catch (err) {
          console.log(err)
        }
        try {
          const { data } = await axios.get(`/api/recipes/${currentUser.mealPlan[i].dinner}`)
          for (let j = 0; j < data.ingredients.length; j++) {
            let qty
            if (currentUser.mealPlan[i].dinnerQty === '1') {
              qty = data.ingredients[j].quantityForOne
            } else if (currentUser.mealPlan[i].dinnerQty === '2') {
              qty = data.ingredients[j].quantityForTwo
            } else if (currentUser.mealPlan[i].dinnerQty === '3') {
              qty = data.ingredients[j].quantityForThree
            } else if (currentUser.mealPlan[i].dinnerQty === '4') {
              qty = data.ingredients[j].quantityForFour
            }
            if (ingredientsShoppingList.some(ingredient => ingredient.ingredient === data.ingredients[j].ingredient)) {
              const ingredientToUpdate = ingredientsShoppingList.find(ingredient => ingredient.ingredient === data.ingredients[j].ingredient)
              if (ingredientToUpdate.measure === data.ingredients[j].measure) {
                const updatedIngredient = {
                  ...ingredientToUpdate,
                  quantity: ingredientToUpdate.quantity + qty
                }
                ingredientsShoppingList.splice(ingredientsShoppingList.indexOf(ingredientToUpdate), 1, updatedIngredient)
              } else {
                ingredientsShoppingList.push({ ingredient: data.ingredients[j].ingredient, quantity: qty, measure: data.ingredients[j].measure })
              }
            } else (
              ingredientsShoppingList.push({ ingredient: data.ingredients[j].ingredient, quantity: qty, measure: data.ingredients[j].measure })
            )
          }
        } catch (err) {
          console.log(err)
        }
      }
    }
    const sortedIngredients = ingredientsShoppingList.sort(function (a, b) {
      var ingredientA = a.ingredient.toUpperCase()
      var ingredientB = b.ingredient.toUpperCase()
      if (ingredientA < ingredientB) {
        return -1
      }
      if (ingredientA > ingredientB) {
        return 1
      }
      return 0
    })
    setMealPlanInBracket(mealPlanInDateBracket)
    setShoppingList(sortedIngredients)
  }

  return (
    <section className='shoppinglist-page'>
      {console.log(dateBracket)}
      <Nav />
      <div className='header'>
        <p>Give me a shopping list from </p>
        <input type='date' name='start' onChange={handleDateBracketChange} />
        <p> to </p>
        <input type='date' name='end' onChange={handleDateBracketChange} />
        <button className='green-branded-button' onClick={generateShoppingList}>GO</button>
      </div>
      <div className='shoppinglist-main'>
        <div>
          <h2>MEAL PLAN</h2>
          {mealPlanInBracket.map((day, index) =>
            <div key={index} className='day'>
              <h3>{new Date(day.date).toDateString()}</h3>
              {myAndFavRecipes.some(recipe => recipe._id === day.breakfast) ?
                <>
                  <p>Breakfast:</p>
                  <p>{`${myAndFavRecipes.find(recipe => recipe._id === day.breakfast).title} x ${day.breakfastQty}`}</p>
                </>
                :
                <></>
              }
              {myAndFavRecipes.some(recipe => recipe._id === day.lunch) ?
                <>
                  <p>Lunch:</p>
                  <p>{`${myAndFavRecipes.find(recipe => recipe._id === day.lunch).title} x ${day.lunchQty}`}</p>
                </>
                :
                <></>
              }
              {myAndFavRecipes.some(recipe => recipe._id === day.dinner) ?
                <>
                  <p>Dinner:</p>
                  <p>{`${myAndFavRecipes.find(recipe => recipe._id === day.dinner).title} x ${day.dinnerQty}`}</p>
                </>
                :
                <></>
              }
            </div>
          )}
        </div>
        <div>
          <h2>SHOPPING LIST</h2>
          <ul>
            {shoppingList.map((ingredient, index) =>
              <li key={index}>{`${ingredient.ingredient}: ${ingredient.quantity} ${ingredient.measure}`}</li>
            )}
          </ul>

        </div>
      </div>


    </section>
  )
}

export default ShoppingList