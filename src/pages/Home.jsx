import React from 'react'
import HomeAbout from '../components/HomeAbout'
import Categories from '../components/Categories'
import Banner from '../components/Banner'
import Carousel from '../components/Carousel'
import LogoSlider from '../components/LogoSlider'
import Footer from '../components/Footer'
import Products from '../components/Products'
function Home() {
  return (
    <div className='h-fit bg-slate-100'>
      <Banner/>
      <Products/>
        {/* <Carousel/> */}
        <HomeAbout/>
        {/* <Categories/> */}
        <LogoSlider/>
        <Footer/>
    </div>
  )
}

export default Home