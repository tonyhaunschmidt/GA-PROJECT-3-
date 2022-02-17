import mongoose from 'mongoose' // Imports mongoose that brings in the Schema
import bcrypt from 'bcrypt'



const { Schema } = mongoose


const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String },
  profileImage: { type: String },
  favRecipes: [],
  following: [],
  followers: [],
  // mealPlan: []
  isAdmin: { type: Boolean },
})

userSchema.virtual('yourRecipes', {
  ref: 'Recipe',
  localField: '_id',
  foreignField: 'owner',
})


userSchema.set('toJSON', {
  virtuals: true,
  transform(_doc, json) {
    delete json.password
    delete json.email
    delete json.isAdmin
    return json
  },
})

userSchema
  .virtual('passwordConfirmation')
  .set(function (passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })

userSchema
  .pre('validate', function (next) {
    if (this.isModified('password') && this.password !== this._passwordConfirmation) {
      this.invalidate('passwordConfirmation', 'Does not match password field.')
    }
    next()
  })

userSchema
  .pre('save', function (next) {
    if (this.isModified('password')) {
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
    }
    next()
  })

// userSchema.plugin(uniqueValidator)

userSchema.methods.validatePassword = function (password) {
  console.log(password, this.password)
  return bcrypt.compareSync(password, this.password)
}

export default mongoose.model('User', userSchema)