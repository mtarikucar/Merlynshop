import React from 'react'
import HomeAbout from '../components/HomeAbout'
import Categories from '../components/Categories'
import Banner from '../components/Banner'
import Carousel from '../components/Carousel'
function Home() {
  return (
    <div className='h-screen'>
      <Banner/>
{/*         <HomeAbout/>
        <Categories/> */}
        <Carousel/>
    </div>
  )
}

export default Home