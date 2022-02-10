import Recipe from '../models/recipe.js'

export const getAllRecipes = async (_req, res) => {
  try {
    const recipes = await Recipe.find() 
    return res.status(200).json(recipes)
  } catch (err) {
    return res.status(404).json(err)
  }
}

export const addRecipe = async (req, res) => {
  try {
    const recipeToAdd = await Recipe.create({ ...req.body, owner: req.currentUser._id })
    return res.status(201).json(recipeToAdd)
  } catch (err) {
    return res.status(422).json(err)
  }
}

export const editRecipe = async(req, res) => {
  try {
    const { id } = req.params
    const recipeToEdit = await Recipe.findById(id)
    console.log(`Recipe to edit ${id}`)
    if (!req.currentUser.isAdmin){
      if (!recipeToEdit.owner.equals(req.currentUser._id)) throw new Error('Unauthorised')
    }
    Object.assign(recipeToEdit, req.body)
    await recipeToEdit.save()
    return res.status(202).json(recipeToEdit)
  } catch (err) {
    return res.status(404).json({ message: err.message })
  }
}
export const getOneRecipe = async (req, res) => {
  try {
    const { id } = req.params
    const recipe = await Recipe.findById(id)
    console.log(`Recipe found ${id}`)
    return res.status(200).json(recipe)
  } catch (err) {
    return res.status(404).json(err)
  }
}

export const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params
    const recipeToDelete = await Recipe.findById(id)
    console.log(`Recipe to delete ${recipeToDelete}`)
    if (!req.currentUser.isAdmin){
      if (!recipeToDelete.owner.equals(req.currentUser._id)) throw new Error('Unauthorised')
    }
    await recipeToDelete.remove()
    return res.sendStatus(204)
  } catch (err) {
    return res.status(404).json(err)
  }
}

export const addReview = async (req, res) => {
  try {
    const { id } = req.params
    const recipe = await Recipe.findById(id)
    if (!recipe) throw new Error('Recipe not found')
    const newReview = { ...req.body, owner: req.currentUser._id }
    recipe.reviews.push(newReview)
    await recipe.save()
    return res.status(201).json(recipe)
  } catch (err) {
    console.log(err)
    return res.status(422).json({ message: err.message })
  }
}

// Delete Review
export const deleteReview = async (req, res) => {
  try {
    const { id, reviewId } = req.params
    const recipe = await Recipe.findById(id) 
    if (!recipe) throw new Error('Recipe not found') 
    const reviewToDelete = recipe.reviews.id(reviewId)
    if (!reviewToDelete) throw new Error('Review not found')
    if (!req.currentUser.isAdmin){
      if (!reviewToDelete.owner.equals(req.currentUser._id)) throw new Error('Unauthorised')
    }
    await reviewToDelete.remove()
    await recipe.save()
    return res.sendStatus(204)
  } catch (err) {
    console.log(err)
  }
}

