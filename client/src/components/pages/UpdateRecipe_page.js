import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

import { getPayload, getTokenFromLocalStorage } from '../helper/authHelper.js'


import smallLogo from '../../assets/logo.png'

const uploadUrl = process.env.REACT_APP_CLOUDINARY_URL
const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET


const UpdateRecipe = () => {

  // CLOUDINARY vvvv

  const handleUpload = async (e) => {
    const data = new FormData()
    data.append('file', e.target.files[0])
    data.append('upload_preset', uploadPreset)
    console.log('data', data)
    const res = await axios.post(uploadUrl, data)
    console.log('response=>', res)
    setFormData({ ...formData, image: res.data.url })
  }

  const { id } = useParams()
  const navigate = useNavigate()
  // const [ingArr, setIngArr] = useState([])

  const [recipe, setRecipe] = useState({})

  const [tags, setTags] = useState([])
  const [tag, setTag] = useState('')

  const [ings, setIngs] = useState([
    {
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
    image: 'imageurl',
    tags: [''],
  })

  useEffect(() => {
    const payload = getPayload()
    if (!payload.sub) navigate('/login')
    console.log('Authenticated')
    const getRecipe = async () => {
      try {
        const { data } = await axios.get(`/api/recipes/${id}`)
        setRecipe(data)
        console.log(data)
        setFormData({
          title: data.title,
          description: data.description,
          cookingTime: data.cookingTime,
          mealType: data.mealType,
          ingredients: data.ingredients,
          method: data.method,
          image: data.image,
          tags: data.tags,
        })
      } catch (err) {
        console.log(err)
      }
    }
    getRecipe()
  }, [])


  // ! Form submission
  const handleChange = (e) => {
    const form = { ...formData, [e.target.name]: e.target.value }
    console.log(formData.cookingTime)
    setFormData(form)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('formData at submit=>', formData)
    const form = { ...formData, ingredients: ings, method: steps, tags: tags }
    setFormData(form)
    console.log(formData)
    try {
      // run input check function here 
      await axios.post('/api/recipes', formData, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`
        }
      })
      navigate(`/recipe/${id}`)
      //  navigate(/api/recipes/{data._id})
    } catch (err) {
      console.log(err)
    }
  }

  // ! Ingredients
  const handleIngChange = (e) => {
    let newIngArray = [...ings]
    console.log(e.target.getAttribute('data-tag'))
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
      console.log(newIngArray[ingToChangeIndex])
    }
    console.log(newIngArray)
    setIngs([...newIngArray])
    setFormData({ ...formData, ingredients: newIngArray })
  }
  const addIng = (e) => {
    e.preventDefault()
    setIngs([...ings, { ingredient: '', quantityForOne: 0, quantityForTwo: 0, quantityForThree: 0, quantityForFour: 0, measure: '' }])
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
    setFormData({ ...formData, method: newStepArray })
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
    setFormData({ ...formData, tags: [...tags, tag] })
    setTags([...tags, tag])
    document.querySelector('#tags').value = ''
  }
  const deleteTag = (e) => {
    e.preventDefault()
    const tagToDeleteIndex = e.target.id
    let tagsToDeleteArray = [...formData.tags]
    tagsToDeleteArray.splice(tagToDeleteIndex, 1)
    console.log(tagsToDeleteArray)
    setTags([...tagsToDeleteArray])
    setFormData({...formData, tags: [...tagsToDeleteArray]})
  }

  return (
    recipe._id ? 
    <form className='recipe-form-wrapper' onSubmit={handleSubmit}>
    {console.log('formData' , formData)}
    <Link to='/'><img src={smallLogo} alt='FaceCook logo' /></Link>
    <h2>Update your recipe</h2>
      <div className='title-input'>
        <input onChange={handleChange} type='text' name='title' placeholder='Recipe Name' defaultValue={recipe.title} />
        {!formData.title.length && <p className='form-error'>Please enter a title</p>}
      </div>
      <div className='description-input'>
        <textarea onChange={handleChange}name='description' placeholder='Enter description' rows="8" cols="60" defaultValue={recipe.description} />
        {!formData.description.length && <p className='form-error'>Please enter a description</p>}
      </div>
      <div className='cookingTime-input'>
        <label htmlFor='cookingTime'>Cook Time </label>
        <input onChange={handleChange} type='number' name='cookingTime' min='1' max='999' id='cooktime' defaultValue={recipe.cookingTime} />
        <label htmlFor='cookingTime'> Mins</label>
        {!formData.cookingTime > 0 && <p className='form-error'>Please choose a time</p> }
      </div>
      <div className='mealType-input'>
        <label htmlFor='breakfast'>Breakfast</label>
        <input onChange={handleChange} className='radio'type='radio' name='mealType' defaultValue='breakfast' />
        <label htmlFor='lunch'>Lunch</label>
        <input onChange={handleChange} className='radio'type='radio' name='mealType' defaultValue='lunch' />
        <label htmlFor='dinner'>Dinner</label>
        <input onChange={handleChange} className='radio'type='radio' name='mealType' defaultValue='dinner' />
        
      </div>
      {!formData.mealType.length > 0 && <p className='form-error'>Please choose a meal type</p> }
      <div className='ingredients-section'>
      <p>Quantity</p>
      <div className="ingredients-title" id='media-ingtitle'>
        <p>Ingredients</p>
        <div className="qty-tag">
        <p className='qty'>Qty 1</p>
        <p className='qty'>Qty 2</p>
        <p className='qty'>Qty 3</p>
        <p className='qty'>Qty 4</p>
        </div>
        <p>Measure</p>
      </div>
        {recipe.ingredients.map((ing, index) => {
          return (
            <div className='ingredient-input' id='media-ing' key={index}>
                <input onChange={handleIngChange} type='text' data-tag='ingredient' placeholder='Ingredient' id={index} defaultValue={ing.ingredient} />              
                <input onChange={handleIngChange} className="ing-input-num" type='number' data-tag='quantityForOne' id={index} defaultValue={ing.quantityForOne}/>
                <input onChange={handleIngChange} className="ing-input-num" type='number' data-tag='quantityForTwo' id={index} defaultValue={ing.quantityForTwo}/>
                <input onChange={handleIngChange} className="ing-input-num" type='number' data-tag='quantityForThree' id={index} defaultValue={ing.quantityForThree}/>
                <input onChange={handleIngChange} className="ing-input-num" type='number' data-tag='quantityForFour' id={index} defaultValue={ing.quantityForFour}/>
              <input onChange={handleIngChange} type='text' data-tag='measure' placeholder='Measure' id={index} defaultValue={ing.measure}/>
            </div>
          )
        })}
        <button onClick={addIng} className='grey-branded-button'>Add Ingredient</button>
      </div>
      <div className='method-section'>
        {recipe.method.map((step, index) => {
          return (
            <div className='method-input' key={index}>
              <p>Step {step.step}</p>
              <textarea onChange={handleStepChange} id={index} rows="4" cols="60" defaultValue={step.instruction} />
            </div>
          )
        })}
        <button onClick={addStep} className='grey-branded-button'>Add Step</button>
      </div>
      {/* image input here vvv */}
      <div className='image-input'>
      <h4>Upload an image</h4>
        <input className='img-input' type='file' onChange={handleUpload} />
      </div>
      {/* image input here ^^^  */}    
        <div className='tag-input'>
          <input onChange={handleTagChange} type='text' name='tags' placeholder='Tags' id='tags' />
          <button onClick={addTag} className='grey-branded-button'>  Add tag </button>
        </div>
        <div className='tag-section'>
        {formData.tags.map((tag, index) => {
          return (
            <div className='tag' key={index}>
              <p>{tag}</p>
              <button onClick={deleteTag} className='grey-branded-button' id={index}>-</button>
            </div>
          )
        })}
      </div>
      {formData.title.length && formData.description.length && formData.mealType.length && formData.cookingTime !== 0 ? <><button onClick={handleSubmit} className='green-branded-button'>Submit</button></> : <><button onClick={handleSubmit} disabled id='dis' className='green-branded-button'>Submit</button></>  }
    </form>
    : 
    <>
    <p>Loading</p>
    </>
  )
}


export default UpdateRecipe