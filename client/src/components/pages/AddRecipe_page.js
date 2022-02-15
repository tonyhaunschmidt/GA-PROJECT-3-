import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getPayload } from '../helper/authHelper.js'
import { useNavigate } from 'react-router-dom'

// import { AdvancedImage } from '@cloudinary/react';
// import { Cloudinary } from "@cloudinary/url-gen";



const AddRecipe = () => {


  const navigate = useNavigate()
  // const [ingArr, setIngArr] = useState([])

  const [tags, setTags] = useState([])
  const [tag, setTag] = useState('')

  const [ings, setIngs] = useState([
    {
      num: 1,
      ingredient: '',
      quantityForOne: 0,
      quantityForTwo: 0,
      quantityForThree: 0,
      quantityForFour: 0,
      measure: ''
    }
  ])

  const [steps, setSteps] = useState([
    {
      step: 1,
      instruction: ''
    }
  ])

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    cookingTime: 0,
    mealType: '',
    ingredients: [{}],
    method: [{}],
    image: '',
    tags: [''],
  })


  useEffect(() => {
    const payload = getPayload()
    if (!payload.sub) navigate('/login')
    console.log('Authenticated')
  }, [])

  // ! Form submission
  const handleChange = (e) => {
    const form = { ...formData, [e.target.name]: e.target.value }
    setFormData(form)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = { ...formData, ingredients: ings, method: steps, tags: tags }
    setFormData(form)
    console.log(formData)
    try {
      // run input check function here 
      const { data } = await axios.post('/api/recipes', formData)
      console.log(`Recipe to add: ${data}`)
      //  navigate(/api/recipes/{data._id})
    } catch (err) {
      console.log(err)
    }
  }

  // ! Ingredients
  const handleIngChange = (e) => {
    let newIngArray = [...ings]
    const ingToChangeIndex = e.target.id
    if (e.target.getAttribute('data-tag') === 'ingredient') {
      newIngArray[ingToChangeIndex] = { ...newIngArray[ingToChangeIndex], ingredient: e.target.value }
    }
    if (e.target.getAttribute('data-tag') === 'quantityForOne') {
      newIngArray[ingToChangeIndex] = { ...newIngArray[ingToChangeIndex], quantityForOne: e.target.value }
    }
    if (e.target.getAttribute('data-tag') === 'quantityForTwo') {
      newIngArray[ingToChangeIndex] = { ...newIngArray[ingToChangeIndex], quantityForTwo: e.target.value }
    }
    if (e.target.getAttribute('data-tag') === 'quantityForThree') {
      newIngArray[ingToChangeIndex] = { ...newIngArray[ingToChangeIndex], quantityForThree: e.target.value }
    }
    if (e.target.getAttribute('data-tag') === 'quantityForFour') {
      newIngArray[ingToChangeIndex] = { ...newIngArray[ingToChangeIndex], quantityForFour: e.target.value }
    }
    if (e.target.getAttribute('data-tag') === 'measure') {
      newIngArray[ingToChangeIndex] = { ...newIngArray[ingToChangeIndex], measure: e.target.value }
    }
    setIngs([...newIngArray])
  }
  const addIng = (e) => {
    e.preventDefault()
    setIngs([...ings, { num: ings.length += 1, ingredient: '', quantityForOne: 0, quantityForTwo: 0, quantityForThree: 0, quantityForFour: 0, measure: '' }])
  }

  // ! Method
  const handleStepChange = (e) => {
    const newStepArray = [...steps]
    const stepTochangeIndex = e.target.id
    const stepToChange = {
      step: parseFloat(e.target.id) + 1,
      instruction: e.target.value
    }
    newStepArray[stepTochangeIndex] = stepToChange
    setSteps([...newStepArray])
  }
  const addStep = (e) => {
    e.preventDefault()
    setSteps([...steps, { step: steps.length += 1, instruction: '' }])
  }

  // ! Tags
  const handleTagChange = (e) => {
    const currentTag = e.target.value
    setTag(currentTag)
  }
  const addTag = (e) => {
    e.preventDefault()
    setTags([...tags, tag])
  }
  const deleteTag = (e) => {
    e.preventDefault()
    const tagToDeleteIndex = e.target.id
    let tagsToDeleteArray = tags
    tagsToDeleteArray.splice(tagToDeleteIndex, 1)
    setTags([...tagsToDeleteArray])
  }

  return (
    <form className='recipe-form-wrapper' onSubmit={handleSubmit}>
      <div className='title-input'>
        <input onChange={handleChange} type='text' name='title' placeholder='Recipe Name' />
      </div>
      <div className='description-input'>
        <input onChange={handleChange} type='text-area' name='description' placeholder='Enter description' />
      </div>
      <div className='cookingTime-input'>
        <label htmlFor='cookingTime'>Cook Time</label>
        <input onChange={handleChange} type='number' name='cookingTime' />
      </div>
      <div className='mealType-input'>
        <label htmlFor='breakfast'>Breakfast</label>
        <input onChange={handleChange} type='radio' name='mealType' defaultValue='breakfast' />
        <label htmlFor='lunch'>Lunch</label>
        <input onChange={handleChange} type='radio' name='mealType' defaultValue='lunch' />
        <label htmlFor='dinner'>Dinner</label>
        <input onChange={handleChange} type='radio' name='mealType' defaultValue='dinner' />
      </div>
      <div className='ingredients-section'>
        {ings.map((ing, index) => {
          return (
            <div className='ingredient-input' key={index}>
              <input onChange={handleIngChange} type='text' data-tag='ingredient' placeholder='Ingredient' id={index} />
              <label htmlFor='quantityForOne'>Qty 1 per</label>
              <input onChange={handleIngChange} type='number' data-tag='quantityForOne' id={index} />
              <label htmlFor='quantityForTwo'>Qty 2 per</label>
              <input onChange={handleIngChange} type='number' data-tag='quantityForTwo' id={index} />
              <label htmlFor='quantityForThree'>Qty 3 per</label>
              <input onChange={handleIngChange} type='number' data-tag='quantityForThree' id={index} />
              <label htmlFor='quantityForFour'>Qty 4 per</label>
              <input onChange={handleIngChange} type='number' data-tag='quantityForFour' id={index} />
              <input onChange={handleIngChange} type='text' name='measure' placeholder='Measure' id={index} />
            </div>
          )
        })}
        <button onClick={addIng}>Add Ingredient</button>
      </div>
      <div className='method-section'>
        {steps.map((step, index) => {
          return (
            <div className='method-input' key={index}>
              <p>Step {step.step}</p>
              <input type='text-area' onChange={handleStepChange} id={index} />
            </div>
          )
        })}
        <button onClick={addStep}>Add Step</button>
      </div>
      {/* image input here  */}
      <div className='tag-section'>
        <div className='tag-input'>
          <input onChange={handleTagChange} type='text' name='tags' placeholder='Tags' />
          <button onClick={addTag}>  Add tag </button>
        </div>
        {tags.map((tag, index) => {
          return (
            <div className='tag' key={index}>
              <p>{tag}</p>
              <button onClick={deleteTag} className='delete-tag' id={index}>Delete Tag</button>
            </div>
          )
        })}
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </form>
  )
}


export default AddRecipe

// Improved error handling - specify number range for cooking time, max length for description, need to add required fields for quantity
// Edit recipe page - use axios .get to pass info into states
// img input
// 