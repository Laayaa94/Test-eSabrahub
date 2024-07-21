import React from 'react'
import Hero from '../Components/HomePageCompo/Hero/Hero'
import AboutUs from '../Components/HomePageCompo/AboutUs/AboutUs'
import ContactUs from '../Components/HomePageCompo/ContactUs/ContactUs'

const HomePage = () => {
  return (
    <div>
      <section id="heroId">
        <Hero/>
      </section>
      <section id="aboutId">
        <AboutUs/>
      </section>
      <section id="contactId">
        <ContactUs/>
      </section>
    </div>
    
  )
}

export default HomePage
