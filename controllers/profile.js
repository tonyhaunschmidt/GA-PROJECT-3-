import User from '../models/user.js'

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

export const editProfile = async(req, res) => {
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