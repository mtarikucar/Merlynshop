import React from 'react'
import Category from './Category'
import categorydata from './categıryData'
function Categories() {
  return (
    <div className='flex flex-col justify-center items-center px-4'>
{/*       <h1 className='text-5xl text-[#008037]   my-5 '>Ouver Category</h1> */}

      <div class="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-2 py-3  gap-5">
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