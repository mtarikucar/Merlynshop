import React from 'react'
import {BsBasket} from 'react-icons/Bs';
function Product({ text }) {
  return (

    <div class="mx-auto mt-11 max-h-[400px] w-80 transform overflow-hidden rounded-lg bg-white  shadow-md duration-300 hover:scale-105 hover:shadow-lg">
      <img class="h-64 relative  object-cover object-center" src="https://nurlightllc.com/image/product_image/8eae085c-68b0-4f34-a85b-234850fcf291.jpg_1180xaf%20(1).jpg" alt="Product Image" />
      
      <button class=" absolute top-0 right-0 shadow-xl group flex items-center text-white justify-center bg-green-500  py-2 px-2" >
        <div class="  inset-0 w-2  bg-green-500 transition-all duration-[0.3s] ease-out group-hover:w-full"></div>
        <BsBasket className='w-5 h-5 mr-3'/>
        <span>Add</span>
      </button>

      <div class="p-4">
        <h2 class="mb-2 text-lg font-medium  text-[#008037]">Product Name</h2>
        <p class="mb-2 text-base text-gray-700  truncate  ">{` ${text ? text : 'Products libero suscipit, vero placeat totam eius nihil! here.'} `}</p>
        <div class="flex items-center">
          <p class="mr-2 text-lg font-semibold text-gray-900 ">$20.00</p>
          <p class="text-base  font-medium text-gray-500 line-through dark:text-gray-300">$25.00</p>
          <p class="ml-auto text-base font-medium text-green-500">20% off</p>
        </div>
      </div>
    </div>
    

  )
}

export default Product