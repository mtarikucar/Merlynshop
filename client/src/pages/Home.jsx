import React from 'react'
import HomeAbout from '../components/home/HomeAbout'
import Banner from '../components/home/Banner'

import LogoSlider from '../Layout/LogoSlider'

import Products from '../components/Products'
import Review from '../components/home/Review'
import LoadingPage from '../components/LoadingPage'

function Home() {
  return (
    <div className='h-fit bg-[#eaeff6]'>

      <Banner />
      <Products />

      <HomeAbout />

      <Review />
      <LogoSlider />
      

    </div>
  )
}

export default Home