import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import { getPayload, userIsAuthenticated, getTokenFromLocalStorage } from '../helper/authHelper'

import smallLogo from '../../assets/logo.png'

const uploadUrl = process.env.REACT_APP_CLOUDINARY_URL
const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET


const UpdateProfile = () => {

  const navigate = useNavigate()


  const [currentUser, setCurrentUser] = useState({})
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    profileImage: '',
  })

  useEffect(() => {
    !userIsAuthenticated() && navigate('/')
    const getCurrentUser = async () => {
      try {
        const payload = getPayload()
        const { data } = await axios.get(`/api/profile/${payload.sub}`)
        setCurrentUser(data)
        console.log(data)
        setFormData({
          name: data.name,
          bio: data.bio,
          profileImage: data.profileImage
        })
      } catch (err) {
        console.log(err)
      }
    }
    getCurrentUser()
  }, [])


  const handleChange = (e) => {
    const newObj = { ...formData, [e.target.name]: e.target.value }
    setFormData(newObj)
    //setFormError('')
  }

  const handleUpload = async (e) => {
    const data = new FormData()
    data.append('file', e.target.files[0])
    data.append('upload_preset', uploadPreset)
    const res = await axios.post(uploadUrl, data)
    setFormData({ ...formData, profileImage: res.data.url })
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('formData at submit=>', formData)
    try {
      await axios.put(`/api/profile/${currentUser._id}`, formData, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`
        }
      })
      navigate(`/profile/${currentUser._id}`)
      //  navigate(/api/recipes/{data._id})
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <form className='up-profile-form-wrapper' onSubmit={handleSubmit}>
      <Link to='/'><img src={smallLogo} alt='FaceCook logo' /></Link>
      <h3>Edit Profile</h3>
      <p>Username: {currentUser.username}</p>
      <input onChange={handleChange} type='text' name='name' placeholder='Display Name' defaultValue={currentUser.name && currentUser.name} />
      <textarea onChange={handleChange} name='bio' placeholder='write a little about yourself...' rows="8" cols="60" defaultValue={currentUser.bio && currentUser.bio} />
      <div className='image-input'>
        {console.log(formData)}
        {formData.profileImage === undefined ?
          currentUser.profileImage ?
            <>
              <img src={currentUser.profileImage} alt={currentUser.username} />
              <p>Update Your Profile Pic</p>
            </>
            :
            <div>
              <h4>Upload a Profile Pic</h4>
            </div>
          :
          <>
            <img src={formData.profileImage} alt={currentUser.username} />
            <p>Update Your Profile Pic</p>
          </>
        }
        <input className='img-input' type='file' onChange={handleUpload} />
      </div>
      <button className='green-branded-button'>Submit</button>
    </form>
  )

}

export default UpdateProfile