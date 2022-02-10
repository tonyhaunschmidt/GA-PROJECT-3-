import express from 'express'
import { secureRoute } from './secureRoute.js'
import { addRecipe, getAllRecipes, getOneRecipe, deleteRecipe, editRecipe, addReview, deleteReview } from '../controllers/recipes.js'
import { registerUser, loginUser } from '../controllers/auth.js'

const router = express.Router()


//list routes
router.route('/recipes')
  .get(getAllRecipes)
  .post(secureRoute, addRecipe)

// Single routes
router.route('/recipes/:id')
  .get(getOneRecipe)
  .put(secureRoute, editRecipe)
  .delete(secureRoute, deleteRecipe)

// Review routes
router.route('/recipes/:id/reviews')
  .post(secureRoute, addReview)
router.route('/recipes/:id/reviews/:reviewId')
  .delete(secureRoute, deleteReview)

// Auth routes
// Register
router.route('/register')
  .post(registerUser)

// login
router.route('/login')
  .post(loginUser)

export default router