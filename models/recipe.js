import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'



const { Schema } = mongoose

const recipeSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true, maxlength: 300 },
  cookingTime: { type: Number, required: true },
  mealType: { type: String, required: true },
  ingredients: [{ type: Object, required: true }],  ///SUBSCHEMA?
  method: [{ type: Object, required: true }],
  //nutrition: {}
  image: { type: String },
  tags: [{ type: String }], 
  //Owner
  //Reviews
  Featured: { type: Boolean },
}, {
  timestamps: true,
})



export default mongoose.model('Recipe', recipeSchema)