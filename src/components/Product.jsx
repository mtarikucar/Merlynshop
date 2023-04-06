import React from 'react'
import { BsBasket } from 'react-icons/Bs';
function Product({data}) {
  return (
    <>
      <div key={`${data.id} `}className="mx-auto mt-6 max-h-[450px] w-44  md:w-72 lg:w-80 transform overflow-hidden rounded-lg bg-white  shadow-md duration-300 hover:scale-105 hover:shadow-lg">
        <button
          className="absolute right-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75"
        >
          <span className="sr-only">Wishlist</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>

    

          <img
            src={data.iamge}
            alt=""
            className= " h-40 md:h-48 text-center p-3 object-cover w-full transition duration-500 group-hover:scale-105 lg:h-[270px]"
          />


        <div className="relative gap-1  border-gray-100 bg-white p-3">


          <h3 className=" text-lg font-medium text-gray-900">{data.name}</h3>
          <p className="mb-2 text-base text-gray-700  truncate  ">{data.description}</p>
          <div className='flex justify-start flex-row'>
          
            <p className="mr-2 text-lg font-semibold text-gray-900 ">$20.00</p>
            <p className="text-base  font-medium text-gray-500 line-through dark:text-gray-300">$25.00</p>
          </div>

          <form className="mt-2">
            <button
              className="block w-full rounded text-white bg-green-500 p-4 text-sm font-medium transition hover:scale-105"
            >
              Add to Cart
            </button>
          </form>
        </div>

      </div>
      {/* <div className="mx-auto mt-11 max-h-[400px] w-80 transform overflow-hidden rounded-lg bg-white  shadow-md duration-300 hover:scale-105 hover:shadow-lg">
      <img className="h-64 relative  object-cover object-center" src="https://nurlightllc.com/image/product_image/8eae085c-68b0-4f34-a85b-234850fcf291.jpg_1180xaf%20(1).jpg" alt="Product Image" />
      
      <button className=" absolute top-0 right-0 shadow-xl group flex items-center text-white justify-center bg-green-500  py-2 px-2" >
        <div className="  inset-0 w-2  bg-green-500 transition-all duration-[0.3s] ease-out group-hover:w-full"></div>
        <BsBasket className='w-5 h-5 mr-3'/>
        <span>Add</span>
      </button>
      
      <div className="p-4">
      <h2 className="mb-2 text-lg font-medium  text-[#008037]">Product Name</h2>
      <p className="mb-2 text-base text-gray-700  truncate  ">{` ${text ? text : 'Products libero suscipit, vero placeat totam eius nihil! here.'} `}</p>
      <div className="flex items-center">
          
          <p className="ml-auto text-base font-medium text-green-500">20% off</p>
          </div>
          </div>
        </div> */}

    </>

  )
}

export default Product