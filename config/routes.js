import express from 'express'
import { secureRoute } from './secureRoute.js'
import { addRecipe, getAllRecipes, getOneRecipe, deleteRecipe, editRecipe, addReview, deleteReview, editReview } from '../controllers/recipes.js'
import { registerUser, loginUser } from '../controllers/auth.js'
import { getProfile, editProfile, addFav, follow, unfollow, remFav } from '../controllers/profile.js'

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
  .put(secureRoute, editReview)

// Favourite
router.route('/favourites/:id')
  .get(secureRoute, addFav)
  .delete(secureRoute, remFav)

// Follow routes
router.route('/following/:id')
  .get(secureRoute, follow)
  .delete(secureRoute, unfollow)

// Auth routes
// Register
router.route('/register')
  .post(registerUser)

// login
router.route('/login')
  .post(loginUser)

//Profile routes
router.route('/profile/:id')
  .get(getProfile)
  .put(secureRoute, editProfile)

export default router