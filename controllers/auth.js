import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import { secret } from '../config/environment.js'

export const registerUser = async (req, res) => {
  try {
    console.log(req.body)
    const newUser = await User.create(req.body)
    console.log(newUser)
    return res.status(202).json({ message: 'Registration Successful' })
  } catch (err) {
    console.log(err)
    return res.status(422).json(err)
  }
}

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const userToLogin = await User.findOne({ email: email })
    if (!userToLogin || !userToLogin.validatePassword(password)) {
      return res.status(401).json({ message: 'Unauthorised' })
    }
    const token = jwt.sign({ sub: userToLogin._id }, process.env.SECRET, { expiresIn: '7 days' })
    return res.status(200).json({ message: `Welcome back, ${userToLogin.username}`, token: token })
  } catch (err) {
    console.log(err)
    return res.status(401).json(err)
  }
}

