import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import smallLogo from '../assets/logo.png'

const Login = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })

  const [formError, setFormError] = useState('')

  const handleChange = (e) => {
    const newObj = { ...formData, [e.target.name]: e.target.value }
    setFormData(newObj)
    setFormError('')
  }

  const setTokenToLocalStorage = (token) => {
    window.localStorage.setItem('faceCook-token', token)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/login', formData)
      setTokenToLocalStorage(data.token)
      navigate('/')
    } catch (err) {
      console.log(err.response)
      setFormError(err.response.data.message)
      console.log(formError)
    }
  }

  return (
    <form className='auth-form' onSubmit={handleSubmit}>
      <img src={smallLogo} alt='FaceCook logo' />
      <input onChange={handleChange} type='text' name='username' placeholder='Username' />
      <input onChange={handleChange} type='text' name='email' placeholder='Email' />
      <input onChange={handleChange} type='password' name='password' placeholder='Password' />
      <button>Login</button>
    </form>
  )

}

export default Login