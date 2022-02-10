import mongoose from 'mongoose' // Imports mongoose that brings in the Schema
import uniqueValidator from 'mongoose-unique-validator' // THis improves the readability of the errors passed back from the requests
import bcrypt from 'bcrypt'



const { Schema } = mongoose
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String },
  profileImage: { type: String },
  // yourRecipes: []
  // yourFavRecipes: []
  // following: []
  // followers: []
  // mealPlan: []
  isAdmin: { type: Boolean },
})

userSchema
  .virtual('passwordConfirmation')
  .set(function(passwordConfirmation){
    this._passwordConfirmation = passwordConfirmation
  })

userSchema.set('toJSON', {
  virtuals: true, 
})

userSchema
  .pre('validate', function(next){
    if (this.isModified('password') && this.password !== this._passwordConfirmation){
      this.invalidate('passwordConfirmation', 'Does not match password field.')
    }
    next()
  })

userSchema
  .pre('save', function(next){
    if (this.isModified('password')){
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
    }
    next() 
  })

userSchema.plugin(uniqueValidator)

userSchema.methods.validatePassword = function(password){
  console.log(password, this.password)
  return bcrypt.compareSync(password, this.password)
}

export default mongoose.model('User', userSchema)