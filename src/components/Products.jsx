import React, { useState, useEffect } from 'react'
import Product from './product'
import Data from './Data'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
function Products() {

  let location = useLocation();

  useEffect(() => {

  }, [location]);

  const [data, setData] = useState();

  const getProducts = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/products');
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts();
      setData(data.products);
    };

    fetchData();
  }, []);


  return (
    < div className={`${location.pathname=='/'? 'grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-4 lg:px-12' : 'grid grid-cols-2   md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-3 lg:px-4'} `} >
      <div className={`${location.pathname=='/product'? ' hidden  ':' lg:grid md:grid hidden  col-span-2 mt-6'}`}>
        <a href="#" className="group relative block ">
          <div className="relative h-[350px] lg:h-[450px]  ">
            <img
              src="https://images.unsplash.com/photo-1593795899768-947c4929449d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80"
              alt=""
              className="absolute inset-0 h-full w-full rounded-lg object-cover opacity-100 group-hover:opacity-0"
            />

            <img
              src="https://images.unsplash.com/photo-1593795899630-b6033c0fa58d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
              alt=""
              className="absolute inset-0 h-full w-full rounded-lg object-cover opacity-0 group-hover:opacity-100"
            />
          </div>

          <div className="absolute inset-0 flex flex-col items-start justify-end p-6 " >
            <h3 className="text-xl font-medium text-white">Skinny Jeans Blue</h3>

            <p className="mt-1.5 max-w-[40ch] text-xs text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos sequi
              dicta impedit aperiam ipsum!
            </p>

            <span
              className="mt-3 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
            >
              Shop Now
            </span>
          </div>
        </a>

      </div>
      {
        data &&
        data.map((product) => (
          <Product product={product} />
        ))
      }


    </div >
  )
}

export default Products