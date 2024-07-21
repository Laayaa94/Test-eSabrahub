import React from 'react'
import WhyUs from './WhyUs/WhyUs'
import './AboutUs.css'
import Features from './Feature/Features'
const AboutUs = () => {
  return (
    <div id='aboutId' className='aboutUs-container'>
      <WhyUs/>
      <Features/>
    </div>
  )
}

export default AboutUs
