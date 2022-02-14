import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Profile = () => {

  const [profile, setProfile] = useState({})
  const { id } = useParams()


  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await axios.get(`/api/profile/${id}`) //replace ID with current user ID
        setProfile(data)
      } catch (err) {
        console.log(err)
      }
  }
    getProfile()
  }, [])


  return (
    <section className='my-profile-page'>
      <p>{profile.username}</p>
    </section>
    )
}

export default Profile