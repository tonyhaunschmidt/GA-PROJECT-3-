import mongoose from 'mongoose'
import recipeData from './data/recipes.js'
import userData from './data/users.js'
import { dbURI } from '../config/environment.js'
import Recipe from '../models/recipe.js'
import User from '../models/user.js'

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_URI)
    await mongoose.connection.db.dropDatabase()
    const users = await User.create(userData)
    const recipesWithOwners = recipeData.map(recipe => {
      const randomNumber = Math.floor(Math.random() * (users.length - 1)) + 1
      return { ...recipe, owner: users[randomNumber]._id }
    })
    await Recipe.create(recipesWithOwners)
    await mongoose.connection.close()
  } catch (err) {
    console.log(err)
    await mongoose.connection.close()
  }
}
seedDatabase()