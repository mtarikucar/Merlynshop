import React from 'react'
import HomeAbout from '../components/home/HomeAbout'
import Banner from '../components/home/Banner'

import LogoSlider from '../Layout/LogoSlider'

import Products from '../components/products/Products'
import Review from '../components/home/Review'
import Loading from '../components/Loading'

function Home() {
  
  return (
    <div className='h-fit bg-[#eaeff6]'>

      {/* <Banner /> */}
      <Products maxProduct={2} />

      <HomeAbout />

     {/*  <Review /> */}
      <LogoSlider />
      

    </div>
  )
}

export default Home