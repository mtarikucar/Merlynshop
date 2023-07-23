import { React } from "react";
import { increaseCart } from "../../store/cartSlice";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
function Product({ product }) {
  const dispatch = useDispatch();
  const hundleAddToCart = (product) => {
    dispatch(increaseCart(product));
  };

  
  return (
    <>


      <div className="relative m-2  overflow-hidden rounded-lg bg-white shadow-md">
        <Link to={`/products/${product.id}`}>
          <img
            className="h-auto w-auto
           rounded-t-lg object-cover"
            src={product.thumbnail}
            alt="product image"
          />
        </Link>
        {
          product.discountedPrice && <span className="absolute top-0 left-0 w-28 translate-y-2 -translate-x-8 -rotate-45 bg-rose-500 text-center text-sm text-white">İndirim</span>
        }

        <div className="mt-4 px-5 pb-5">
          <a href="#">
            <h5 className="text-xl font-semibold tracking-tight text-slate-900">
              {product.name}
            </h5>
          </a>
          {/* <div className="mt-2.5 mb-5 flex items-center">
            <span className="mr-2 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">5.0</span>
            <svg aria-hidden="true" className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg aria-hidden="true" className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg aria-hidden="true" className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg aria-hidden="true" className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg aria-hidden="true" className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
          </div> */}

          <div className="flex items-center justify-between">
            {product.discountedPrice ? (
              <>
                <p>
                  <span className="text-3xl font-bold text-slate-900">
                    ₺{product.price}
                  </span>
                  <span className="text-sm text-slate-900 line-through">
                    ₺{product.discountedPrice}
                  </span>
                </p>
              </>
            ) : (
              <>
                <p>
                  <span className="text-sm text-slate-900 line-through">
                    ₺{product.price}
                  </span>
                </p>
              </>
            )}

            <button 
             onClick={() => hundleAddToCart(product)}
            className="flex items-center rounded-md bg-green-500 px-3 py-2.5 text-center text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-blue-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              sepete ekle
            </button>
          </div>
        </div>
      </div>

      {/* <div className="mx-auto m-6 w-44 md:w-56 lg:w-72 transform overflow-hidden rounded-lg bg-white  shadow-md duration-300 hover:scale-105 hover:shadow-lg flex flex-col  justify-between border-gray-100 p-3">
        <Link to={`/products/Products/${product.id}`}>
          <img
            src={product.thumbnail}
            alt=""
            className="w-auto h-32 text-center p-3 object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>

        <h3 className=" text-lg font-medium text-gray-900">{product.name}</h3>
        
        <div className="flex justify-start flex-row">
          {product.discountedPrice ? (
            <>
              <h1 className="text-xl font-bold">
                {product.discountedPrice}₺
              </h1>
              <span className="text-base">/</span>
              <span
                className={`text-base font-medium text-gray-500 line-through dark:text-gray-300`}
              >
                {product.price}₺
              </span>
            </>
          ) : (
            <>
              <h1 className="text-xl font-bold">{product.price}₺</h1>
            </>
          )}
        </div>

        <button
          onClick={() => hundleAddToCart(product)}
          className=" text-center  rounded p-2 text-white bg-green-500 lg:p-4  md:p-3 text-sm font-medium transition hover:scale-105"
        >
          sepete ekle
        </button>
      </div> */}
    </>
  );
}

export default Product;
