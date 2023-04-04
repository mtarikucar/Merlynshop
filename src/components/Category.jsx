import React from 'react'

function Category({ data }) {
  return (
    <>
      <div class="mx-auto mt-11 w-80 transform overflow-hidden rounded-lg bg-white  shadow-md duration-300 hover:scale-105 hover:shadow-lg">
        <img class="h-64  object-cover object-center" src={data.image} alt="Product Image" />
        <div class="p-4">
          <h2 class="mb-2 text-lg font-medium  text-gray-900">Product Name</h2>
          <p class="mb-2 text-base text-gray-700">Product description goes here.</p>
          <div class="flex items-center">
            <p class="mr-2 text-lg font-semibold text-gray-900 ">$20.00</p>
            <p class="text-base  font-medium text-gray-500 line-through dark:text-gray-300">$25.00</p>
            <p class="ml-auto text-base font-medium text-green-500">20% off</p>
          </div>
        </div>
      </div>
      {/*  <card  class="relative rounded-lg">
        <a href="/">

          <img src={data.image} class="object-cover w-full h-full rounded-lg" />
          <div class="absolute w-full h-full bottom-0 bg-gradient-to-r from-fuchsia-700/30 to-violet-700 rounded-lg flex flex-col items-center justify-center text-center">

            <p class="text-3xl  text-white ">
              {data.name}
            </p>
          </div>
        </a>
      </card> */}


    </>

  )
}

export default Category