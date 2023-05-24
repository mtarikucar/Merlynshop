import React, { useState, useEffect } from 'react'
import Product from './Product'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { useQuery } from 'react-query'
import Loading from '../Loading';
import Carousel from "nuka-carousel"

function getProduct(categoryId, minPrice, maxPrice) {
  let base = 'http://localhost:3000/api/product';
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


function Products({ categoryId, minPrice, maxPrice, maxProduct }) {

  const { isLoading, isError, data: products, error } = useQuery(
    ['products', { categoryId, minPrice, maxPrice }],
    ({ queryKey }) =>
      getProduct(queryKey[1].categoryId, queryKey[1].minPrice, queryKey[1].maxPrice)
  );

  /* if (maxProduct) {
    const products = products ? products.slice(0, maxProduct) : [];
  } */
  if (isLoading) return <Loading />;
  if (isError) return 'An error has occurred: ' + error.message;



  return (
    < div className={`${location.pathname == '/' ? 'grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-4 lg:px-12' : 'grid grid-cols-2   md:grid-cols-2 lg:grid-cols-2  xl:grid-cols-3 '} lg:gap-2 `} >
      <div className={`${location.pathname == '/product' ? ' hidden  ' : ' lg:grid md:grid grid p-2  col-span-2 lg:mt-6'} gap-4`}>

        <Carousel
        
          autoplay={true}
          autoplayInterval={2500}
          className='rounded-lg max-h-[480px]'
          dragging={true}
          
        >
          <img src="/src/assets/m1.png" />
          <img src="/src/assets/m2.png" />
          <img src="/src/assets/m3.png" />
          <img src="/src/assets/m4.png" />
        </Carousel>

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