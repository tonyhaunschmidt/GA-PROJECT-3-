import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const ProfileOther = () => {

  const [profile, setProfile] = useState({})
  const { id } = useParams()


  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await axios.get(`/api/profile/${id}`)
        setProfile(data)
        console.log(data)
      } catch (err) {
        console.log(err)
      }
  }
    getProfile()
  }, [])


  return (
    <section className='profile-page'>
      <div className='profile-card'>
        <div className='pic-and-name-container'>

        </div>
      </div>
      <div className='profile-main-section'>

      </div>
      <p>{profile.username}</p>
    </section>
    )
}

export default ProfileOther