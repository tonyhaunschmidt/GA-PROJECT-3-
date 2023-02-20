import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { Link, useNavigate } from 'react-router-dom'

import { userIsAuthenticated } from '../helper/authHelper.js'
import smallLogo from '../../assets/logo.png'


const Login = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [formError, setFormError] = useState('')

  useEffect(() => {
    userIsAuthenticated() && navigate('/')
  }, [])

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
    <>
      <form className='login-form-wrapper' onSubmit={handleSubmit}>
        <Link to='/'><img src={smallLogo} alt='FaceCook logo' /></Link>
        <div className="login-input-block">
          <input onChange={handleChange} type='text' name='email' placeholder='Email' />
          <input onChange={handleChange} type='password' name='password' placeholder='Password' />
          {formError.length ? <p className='form-error'>Unauthorised!</p> : <></>}
        </div>
        {!formData.email || !formData.password ? <button disabled id='dis' className='green-branded-button'>Login</button> : <button className='green-branded-button'>Login</button>}
        <p><Link to='/register'>Don't have an account?</Link></p>
      </form>
    </>
  )

}

export default Login