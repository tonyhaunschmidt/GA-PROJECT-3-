import mongoose from 'mongoose'



const { Schema } = mongoose

const reviewSchema = new Schema({
  text: { type: String, required: true, maxlength: 300 },
  rating: { type: Number, required: true, min: 1, max: 5 },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
}, {
  timestamps: true,
})

const recipeSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true, maxlength: 300 },
  cookingTime: { type: Number, required: true },
  mealType: { type: String, required: true },
  ingredients: [{ type: Object, required: true }],  ///SUBSCHEMA?
  // [{ ingredient: eggs, quantityForOne: 2, quantityForTwo: 3, quantityForThree: 3,  quantityForFour: 4, measure: units }, { ingredients milk .... }]
  method: [{ type: Object, required: true }],
  //nutrition: {}
  image: { type: String },
  tags: [{ type: String }], 
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  reviews: [reviewSchema],
  Featured: { type: Boolean },
}, {
  timestamps: true,
})


recipeSchema.virtual('avgRating')
  .get(function(){
    if (!this.reviews.length) return 'Not rated yet'
    const sum = this.reviews.reduce((acc, review) => {
      return acc + review.rating
    }, 0)
    return  (sum / this.reviews.length).toFixed(2)
  })

recipeSchema.set('toJSON', {
  virtuals: true,
})

export default mongoose.model('Recipe', recipeSchema)