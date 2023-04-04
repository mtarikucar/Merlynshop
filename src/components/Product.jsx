import React from 'react'

function Product() {
  return (
    
      <div class="mx-auto mt-11 w-80 transform overflow-hidden rounded-lg bg-white  shadow-md duration-300 hover:scale-105 hover:shadow-lg">
        <img class="h-64  object-cover object-center" src="https://nurlightllc.com/image/product_image/8eae085c-68b0-4f34-a85b-234850fcf291.jpg_1180xaf%20(1).jpg" alt="Product Image" />
        <div class="p-4">
          <h2 class="mb-2 text-lg font-medium  text-gray-900">Product Name</h2>
          <p class="mb-2 text-base text-gray-700">Product description Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti perferendis voluptatem consequatur soluta voluptate minima voluptates quidem? Facere harum doloremque, explicabo praesentium eos libero suscipit, vero placeat totam eius nihil! here.</p>
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