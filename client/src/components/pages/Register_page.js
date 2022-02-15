import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import smallLogo from '../../assets/logo.png'
import Nav from '../Nav'


const Register = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })


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
    }
  }

  return (
    <>
    <Nav />
    <form onSubmit={handleSubmit} className='form-wrapper'>
      <img src={smallLogo} alt='FaceCook logo' />
      <div className='username-input'>
        <input onChange={handleChange} type='text' name='username' placeholder='Username' />
      </div>
      <div className='email-input'>
        <input onChange={handleChange} type='email' name='email' placeholder='Email' />
      </div>
      <div className='password-input'>
        <input onChange={handleChange} type='password' name='password' placeholder='Password' />
      </div>
      <div className='passwordConfirmation-input'>
        <input onChange={handleChange} type='password' name='passwordConfirmation' placeholder='Password Confirmation' />
        {formData.password !== formData.passwordConfirmation ? <p>Passwords do not match!</p> : <p></p>}
      </div>
      <div>
      {formData.password !== formData.passwordConfirmation || !formData.password.length ? <button disabled className='green-branded-button'>Register</button> : <button className='gre-branded-button'>Register</button>} 
      </div>
    </form>
    </>
  )
}

export default Register

// Need to add more error handling - show messages when inccorect input fields 