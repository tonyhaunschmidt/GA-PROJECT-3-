import Recipe from '../models/recipe.js'
import User from '../models/user.js'

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
    const recipe = await (await Recipe.findById(id)).populate('owner')
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

export const editReview = async (req, res) => {
  try {
    const { id, reviewId } = req.params
    const recipe = await Recipe.findById(id) 
    if (!recipe) throw new Error('Recipe not found') 
    const reviewToEdit = recipe.reviews.id(reviewId)
    if (!reviewToEdit) throw new Error('Review not found')
    if (!req.currentUser.isAdmin){
      if (!reviewToEdit.owner.equals(req.currentUser._id)) throw new Error('Unauthorised')
    }
    Object.assign(reviewToEdit, req.body)
    console.log(reviewToEdit)
    await recipe.save()
    return res.sendStatus(204)
  } catch (err) {
    console.log(err)
  }
}

export const addFav = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(req.currentUser)
    const recipe = await Recipe.findById(id)
    if (user.favRecipes.includes(recipe._id)) throw new Error('Already Favourited')
    user.favRecipes.push({ _id: recipe._id, title: recipe.title, avgRating: recipe.avgRating, image: recipe.image })
    await user.save()
    return res.sendStatus(204)
  } catch (err) {
    return res.status(404).json({ message: err.message })
  }
}

export const remFav = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(req.currentUser)
    const recipe = await Recipe.findById(id)
    if (!user.favRecipes.includes(recipe._id)) throw new Error('Not in Favourites')
    user.favRecipes.remove(recipe)
    await user.save()
    return res.sendStatus(204)
  } catch (err) {
    return res.status(404).json({ message: err.message })
  }
}

export const follow = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(req.currentUser)
    const userToFollow = await User.findById(id)
    console.log(user.following)
    console.log(userToFollow._id)
    if (user.following.includes(userToFollow._id)) {       
      console.log('already following!')
      throw new Error('Already Following')
    }
    user.following.push({ _id: userToFollow._id, username: userToFollow.username, profileImage: userToFollow.profileImage })
    userToFollow.followers.push({ _id: user._id, username: user.username, profileImage: user.profileImage })
    await userToFollow.save()
    await user.save()
    return res.sendStatus(204)
  } catch (err) {
    return res.status(404).json({ message: err.message })
  }
}

export const unfollow = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(req.currentUser)
    console.log('user loaded')
    const userToUnfollow = await User.findById(id)
    console.log('unfollow user loaded')
    user.following.remove(userToUnfollow)
    console.log('user unfollowed')
    await user.save()
    console.log('done')
    return res.sendStatus(204)
  } catch (err) {
    console.log(err)
    return res.status(404)
  }
}