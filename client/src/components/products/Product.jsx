import { React } from "react";
import { increaseCart } from "../../store/cartSlice";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

function Product({ product }) {
  const dispatch = useDispatch();
/*   const hundleAddToCart = (product) => {
    dispatch(increaseCart(product));
  }; */
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
                  <span className="text-3xl font-bold text-slate-900">
                    ₺{product.price}
                  </span>
                </p>
              </>
            )}

            <Link
              to={`products/${product.id}`}
              className="flex items-center rounded-md bg-green-500 px-3 py-2.5 text-center text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-blue-300">
              <RemoveRedEyeIcon />

            </Link>
          </div>
        </div>
      </div>


    </>
  );
}

export default Product;
