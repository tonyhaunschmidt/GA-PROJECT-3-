import React, { useState } from 'react'
import axios from 'axios'

import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import smallLogo from '../../assets/logo.png'



const Register = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })

  // const [formError, setFormError] = useState('')

  const handleChange = (e) => {
    const newObj = { ...formData, [e.target.name]: e.target.value }
    setFormData(newObj)
    console.log(newObj)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/register', formData)
      navigate('/login')
    } catch (err) {
      console.log(err)
      // setFormError(err.response.data.message)
      // console.log(formError)
    }
  }

  return (
    <>
    <form onSubmit={handleSubmit} className='form-wrapper'>
    <Link to='/'><img src={smallLogo} alt='FaceCook logo' /></Link>
      <div className='reg-input-block'>
        <input onChange={handleChange} type='text' name='username' placeholder='Username' />
      </div>
      <div className='reg-input-block'>
        <input onChange={handleChange} type='text' name='email' placeholder='Email' />
        {!formData.email.includes('@') && formData.email.length ? <p className='form-error'>Invalid Email</p>: <p></p> }
      </div>
      <div className='reg-input-block'>
        <input onChange={handleChange} type='password' name='password' placeholder='Password' />
      </div>
      <div className='reg-input-block'>
        <input onChange={handleChange} type='password' name='passwordConfirmation' placeholder='Password Confirmation' />
        {formData.password !== formData.passwordConfirmation && <p className='form-error'>Passwords do not match!</p>}
      </div>
      <div>
      {formData.password !== formData.passwordConfirmation || !formData.password.length || !formData.email.length || !formData.username.length ? <button disabled id='dis' className='green-branded-button'>Register</button> : <button className='green-branded-button'>Register</button>} 
      </div>
      <p><Link to='/login'>Already have an account?</Link></p>
    </form>
    </>
  )
}

export default Register

// Need to add more error handling - show messages when inccorect input fields 