import React, { useState, useEffect } from 'react'
import Product from './product'
import Data from './Data'
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import { useQuery } from 'react-query'

import { getProducts } from '../api';

function Products() {





  const { isLoading, error, data } = useQuery('products', getProducts)
  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message



  return (
    < div className={`${location.pathname == '/' ? 'grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-4 lg:px-12' : 'grid grid-cols-2   md:grid-cols-2 lg:grid-cols-2  xl:grid-cols-3 '} `} >
      <div className={`${location.pathname == '/product' ? ' hidden  ' : ' lg:grid md:grid hidden  col-span-2 mt-6'}`}>


        <a href="#" className="group relative block ">
          <div className="relative h-[350px] lg:h-[450px]  ">
            <img
              src="https://nurlightllc.com/image/product_image/8eae085c-68b0-4f34-a85b-234850fcf291.jpg_1180xaf%20(1).jpg"
              alt=""
              className="absolute inset-0 h-full w-full rounded-lg object-cover opacity-100 group-hover:opacity-0"
            />

            <img
              alt=""
              src="https://nurlightllc.com/image/product_image/beanca-20-container-food-storage-set.webp"
              className="absolute inset-0 h-full w-full rounded-lg object-cover opacity-0 group-hover:opacity-100"
            />
          </div>

          <div className="absolute inset-0 flex flex-col items-start justify-end p-6 " >
            <h3 className="text-xl font-medium text-gray-800">Skinny Jeans Blue</h3>

            <p className="mt-1.5 max-w-[40ch] text-xs text-gray-800">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos sequi
              dicta impedit aperiam ipsum!
            </p>

            <span
              className="mt-3 inline-block bg-green-500 hover:bg-green-700 px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
            >
              Shop Now
            </span>
          </div>
        </a>

      </div>
      {
        data.products &&
        data.products?.map((product, key) => (
          <Product product={product} key={key} />
        ))
      }


    </div >
  )
}

export default Products