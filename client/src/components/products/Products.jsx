import React, { useState, useEffect } from 'react'
import Product from './Product'
import axios from 'axios';

import { useQuery } from 'react-query'
import Loading from '../Loading';

function getProduct(categoryId, minPrice, maxPrice) {
  let base = `${import.meta.env.VITE_BASE_URL}/product`;
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
    <>
      {
        products &&
        products?.map((product, key) => (
          <Product product={product} key={key} />
        ))
      }
    </>

  )
}

export default Products