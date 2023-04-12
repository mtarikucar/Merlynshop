import React from 'react'
import AboutCard from '../components/about/AboutCard'
import AboutImageGallery from '../components/about/AboutImageGallery'

function About() {
  return (
    <div className='bg-slate-50 w-full'>
      <AboutCard />
      <div className="inline-flex items-center justify-center w-full mt-10 px-8">
        <hr className="w-full h-1 my-8 bg-gray-500 border-0 rounded " />
        <div className="absolute px-4 -translate-x-1/2 bg-gray-50 left-1/2 text-center text-4xl font-bold">
          IMAGE GALLERY
        </div>
      </div>
      <AboutImageGallery />
    </div>
  )
}

export default About