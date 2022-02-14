import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import smallLogo from '../assets/logo.png'

const Register = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })

  const [formErrors, setFormErrors] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })

  const handleChange = (e) => {
    const newObj = { ...formData, [e.target.name]: e.target.value }
    setFormData(newObj)
    setFormErrors({ ...formErrors, [e.target.name]: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/register', formData)
      navigate('/login')
    } catch (err) {
      setFormErrors(err.response.data.errors)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <img src={smallLogo} alt='FaceCook logo' />
      <input onChange={handleChange} type='text' name='username' placeholder='Username' />
      <input onChange={handleChange} type='text' name='email' placeholder='Email' />
      <input onChange={handleChange} type='password' name='password' placeholder='Password' />
      <input onChange={handleChange} type='password' name='passwordConfirmation' placeholder='Password Confirmation' />
      <button>Register</button>
    </form>
  )
}

export default Register