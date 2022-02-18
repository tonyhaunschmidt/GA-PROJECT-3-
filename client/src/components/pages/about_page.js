import React from 'react'
import faceCookLogo from '../../assets/full_logo.png'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <section className='about'>
      <Link to='/'><img className='main-logo' src={faceCookLogo} alt='facecook logo' /></Link>
      <p>FaceCook is a site where you can create and share recipes and follow other cooks.</p>
      <p>Use our meal plan feature to plan your meals and to generate a shopping list.</p>
      <p className='created'>Created By:</p>
      <ul>
        <li><a href='https://github.com/tonyhaunschmidt' target="_blank" rel="noreferrer">Tony Haunschmidt</a></li>
        <li><a href='https://github.com/RY44' target="_blank" rel="noreferrer">Ryan Arnold</a></li>
        <li><a href='https://github.com/A-Afolabi' target="_blank" rel="noreferrer">Ayo Afolabi</a></li>
      </ul>
    </section>
  )



}

export default About