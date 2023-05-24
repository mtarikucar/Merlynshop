import { React } from "react";
import { addToCart } from "../features/cartSlice";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
function Product({ product }) {
  const dispatch = useDispatch();
  const hundleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <>
      <div className="mx-auto m-6 max-h-[450px] w-44  md:w-72 lg:w-80 transform overflow-hidden rounded-lg bg-white  shadow-md duration-300 hover:scale-105 hover:shadow-lg">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.thumbnail}
            alt=""
            className=" h-40 md:h-48 text-center p-3 object-cover w-full transition duration-500 group-hover:scale-105 lg:h-[270px]"
          />
        </Link>

        <div className="relative gap-1 flex-col  justify-between border-gray-100 bg-white p-3">
          <h3 className=" text-lg font-medium text-gray-900">{product.name}</h3>
          <p className="mb-2 text-base text-gray-700  truncate  ">
            {product.description}
          </p>
          <div className="flex justify-start flex-row">
            {product.discountedPrice ? (
              <>
                <p className="mr-2 text-lg font-semibold text-gray-900 ">
                  {product.price}
                </p>
                <p className="text-base  font-medium text-gray-500 line-through dark:text-gray-300">
                  {product.discountedPrice}
                </p>
              </>
            ) : (
              <>
                <p className="mr-2 mb-2 text-lg font-semibold text-gray-900 ">
                  ${product.price}.00
                </p>  
              </>
            )}
          </div>

          <button
            onClick={() => hundleAddToCart(product)}
            className=" w-full text-center  rounded p-2 text-white bg-green-500 lg:p-4  md:p-3 text-sm font-medium transition hover:scale-105"
          >
            Add to Cart
          </button>
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
  );
}

export default Product;
