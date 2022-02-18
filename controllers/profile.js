import User from '../models/user.js'
import Recipe from '../models/recipe.js'

export const getProfile = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id).populate('yourRecipes').populate('favRecipes')
    if (!user) throw new Error('User not found')
    return res.status(200).json(user)
  } catch (err) {
    return res.status(404).json({ message: err.message })
  }
}

export const editProfile = async (req, res) => {
  try {
    //include condition to block updating things like username where you are not allowed. 
    const { id } = req.params
    const profileToEdit = await User.findById(id)

    // if (!req.currentUser.isAdmin){
    //   if (!profileToEdit._id.equals(req.currentUser._id)) throw new Error('Unauthorised')
    // }
    Object.assign(profileToEdit, req.body)
    //await profileToEdit.save()
    await profileToEdit.save()
    return res.status(202).json(profileToEdit)
  } catch (err) {
    return res.status(404).json({ message: err.message })
  }
}

export const addFav = async (req, res) => {
  try {
    const { id } = req.params
    const recipe = await Recipe.findById(id)
    const user = await User.findById(req.currentUser)
    if (user.favRecipes.some(rec => rec.title === recipe.title)) throw new Error('Already Favourited')
    user.favRecipes.push({ _id: recipe._id, title: recipe.title, avgRating: recipe.avgRating, image: recipe.image })
    await user.save()
    return res.sendStatus(204)
  } catch (error) {
    return res.status(404).json({ message: error.message })
  }
}

export const remFav = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(req.currentUser)
    const recipe = await Recipe.findById(id)
    const recipeToRemove = { _id: recipe._id, title: recipe.title, avgRating: recipe.avgRating, image: recipe.image }
    user.favRecipes.remove(recipeToRemove)
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
    if (user.following.some(profile => profile.username === userToFollow.username)) throw new Error('Already Following!')
    //user.following.push({ _id: userToFollow._id, username: userToFollow.username, profileImage: userToFollow.profileImage })
    //userToFollow.followers.push({ _id: user._id, username: user.username, profileImage: user.profileImage })
    user.following.push(userToFollow._id)
    userToFollow.followers.push(user._id)
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
    const userToUnfollow = await User.findById(id)
    //const profileToRemove = { _id: userToUnfollow._id, username: userToUnfollow.username, profileImage: userToUnfollow.profileImage }
    const profileToRemove = userToUnfollow._id
    user.following.remove(profileToRemove)
    //userToUnfollow.followers.remove({ _id: user._id, username: user.username, profileImage: user.profileImage })
    userToUnfollow.followers.remove(user._id)
    await userToUnfollow.save()
    await user.save()
    return res.sendStatus(204)
  } catch (err) {
    console.log(err)
    return res.status(404)
  }
}



