import React, { useState, useEffect } from 'react'
import Product from './Product'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { useQuery } from 'react-query'
import LoadingPage from './LoadingPage';


function getProduct(categoryId, minPrice, maxPrice) {
  let base = 'https://whale-app-952oz.ondigitalocean.app/api/product';
  let queryParams = [];

  if (categoryId) {
    queryParams.push(`categoryId=${categoryId}`);
  }
  if (minPrice) {
    queryParams.push(`minPrice=${minPrice}`);
  }
  if (maxPrice) {
    queryParams.push(`maxPrice=${maxPrice}`);
  }

  if (queryParams.length > 0) {
    base += `?${queryParams.join('&')}`;
  }

  return axios.get(base).then((res) => res.data);
}


function Products({ categoryId, minPrice, maxPrice }) {

  const { isLoading, isError, data: products, error } = useQuery(
    ['products', { categoryId, minPrice, maxPrice }],
    ({ queryKey }) =>
      getProduct(queryKey[1].categoryId, queryKey[1].minPrice, queryKey[1].maxPrice)
  );

  if (isLoading) return <LoadingPage />;
  if (isError) return 'An error has occurred: ' + error.message;


  return (
    < div className={`${location.pathname == '/' ? 'grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-4 lg:px-12' : 'grid grid-cols-2   md:grid-cols-2 lg:grid-cols-2  xl:grid-cols-3 '} gap-4 `} >
      <div className={`${location.pathname == '/product' ? ' hidden  ' : ' lg:grid md:grid hidden  col-span-2 mt-6'} gap-4`}>


        <a href="#" className="group relative block ">
          <div className="relative h-[350px] lg:h-[450px]  ">
            <img
              src="/about.jpg"
              alt=""
              className="absolute inset-0 h-full w-full rounded-lg object-cover opacity-100 group-hover:opacity-0"
            />

            <img
              alt=""
              src="/12.jpeg"
              className="absolute inset-0 h-full w-full rounded-lg object-cover opacity-0 group-hover:opacity-100"
            />
          </div>

          <div className="absolute inset-0 flex flex-col items-start justify-end p-6 " >

            <Link to={"/product"}>
              <span
                className="mt-3 inline-block bg-green-500 hover:bg-green-500 px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
              >
                Shop Now
              </span>
            </Link>
          </div>
        </a>

      </div>
      {
        products &&
        products?.map((product, key) => (
          <Product product={product} key={key} />
        ))
      }


    </div >
  )
}

export default Products