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
    
      <div className="mx-auto m-6 w-44 md:w-56 lg:w-72 transform overflow-hidden rounded-lg bg-white  shadow-md duration-300 hover:scale-105 hover:shadow-lg flex flex-col  justify-between border-gray-100 p-3">
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
                {product.discountedPrice}.00₺
              </h1>
              <span className="text-base">/</span>
              <span
                className={`text-base font-medium text-gray-500 line-through dark:text-gray-300`}
              >
                {product.price}.00₺
              </span>
            </>
          ) : (
            <>
              <h1 className="text-xl font-bold">{product.price}.00₺</h1>
            </>
          )}
        </div>

        <button
          onClick={() => hundleAddToCart(product)}
          className=" text-center  rounded p-2 text-white bg-green-500 lg:p-4  md:p-3 text-sm font-medium transition hover:scale-105"
        >
          sepete ekle
        </button>
      </div>
    
  );
}

export default Product;
