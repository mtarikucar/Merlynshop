import React from 'react'
import Category from './Category'
import categorydata from './Data'
function Categories() {
  return (
    <div className='flex flex-col justify-center items-center px-4'>
    <h1 className='text-2xl text-[#008037]   my-5 '> Categories</h1> 

      <div className="grid grid-cols-2 lg:grid-cols-5 md:grid-cols-3 p-3  gap-5">
        {
          categorydata?.map((data) => (

            <Category data={data} />
          ))
        }
      </div>

    </div>
  )
}

export default Categories