import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import HandshakeIcon from '@mui/icons-material/Handshake';
import { useQuery } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, decreaseCart } from "../store/cartSlice";
import OfferModal from "../components/products/OfferModal"

function ProductDetail() {


  const [openOffer, setOpenOffer] = useState(false);
  const [quantity, setQuatity] = useState(1);
  const dispatch = useDispatch();
  const hundleAddToCart = (product) => {
    dispatch(addToCart({ ...product, cartQuantity: quantity }));
    setQuatity(0)
  };

  const hundleDecreaseCart = (product) => {
    dispatch(decreaseCart(product));
  };

  const hundleIncreaseCart = (product) => {
    dispatch(addToCart(product));
  };
  const { id } = useParams();

  const [activeImage, setActiveImage] = useState();

  const { isLoading, error, data } = useQuery("product", () => {
    return fetch(`${import.meta.env.VITE_BASE_URL}/product/${id}`).then((res) =>
      res.json()
    );
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  console.log(quantity);

  console.log(data);
  return (
    <section className="py-4 sm:py-6">
      <OfferModal openOffer={openOffer} setOpenOffer={setOpenOffer} price={data.price} />
      <div className="container mx-auto px-4">
        <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3 lg:row-end-1">
            <div className="lg:flex lg:items-center gap-4">
              <div className="lg:order-2 lg:ml-5">
                <div className="max-w-xl overflow-hidden rounded-lg">
                  <img
                    className="h-full w-full max-w-full object-cover"
                    src={activeImage ? activeImage : data.thumbnail}
                    alt=""
                  />
                </div>
              </div>


              <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                <div className="flex flex-row items-start lg:flex-col">
                  <button
                    onClick={() => setActiveImage(data.thumbnail)}

                    type="button"
                    className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-900 text-center"
                  >
                    <img
                      className="h-full w-full object-cover"
                      src={data.thumbnail}
                      alt=""
                    />
                  </button>
                  {data.photos?.map((image, i) => (
                    <button
                      onClick={() => setActiveImage(image.imgpath)}
                      key={i}
                      type="button"
                      className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-900 text-center"
                    >
                      <img
                        className="h-full w-full object-cover"
                        src={image.imgpath}
                        alt=""
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
            <h1 className="sm: text-2xl font-bold text-gray-900 sm:text-3xl">
              {data.name}
            </h1>

            <div className="mt-5 flex items-center">
              <div className="flex items-center">
                <svg className="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
                </svg>
                <svg className="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
                </svg>
                <svg className="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
                </svg>
                <svg className="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
                </svg>
                <svg className="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
                </svg>
              </div>
              <p className="ml-2 text-sm font-medium text-gray-500">1,209 geri dönüş</p>
            </div>

            <h2 className=" text-base text-gray-900">{data.description}</h2>

            <h2 className="mt-4 text-base text-gray-900">Coffee Type:</h2>
            <div className="mt-3 flex select-none flex-wrap items-center gap-1">
              <label className="">
                <input type="radio" name="type" value="Powder" className="peer sr-only" />
                <p className="peer-checked:bg-green-500 peer-checked:text-white rounded-lg border border-green-500 px-6 py-2 font-bold">Powder</p>
              </label>
              <label className="">
                <input type="radio" name="type" value="Whole Bean" className="peer sr-only" />
                <p className="peer-checked:bg-green-500 peer-checked:text-white rounded-lg border border-green-500 px-6 py-2 font-bold">Whole Bean</p>
              </label>
              <label className="">
                <input type="radio" name="type" value="Groud" className="peer sr-only" />
                <p className="peer-checked:bg-green-500 peer-checked:text-white rounded-lg border border-green-500 px-6 py-2 font-bold">Groud</p>
              </label>
            </div>

            <h2 className="mt-2 text-base text-gray-900">Choose subscription:</h2>
            <div className="mt-3 flex select-none flex-wrap items-center gap-1">
              <label className="">
                <input type="radio" name="subscription" value="4 Months" className="peer sr-only" />
                <p className="peer-checked:bg-green-500 peer-checked:text-white rounded-lg border border-green-500 px-6 py-2 font-bold">4 Months</p>

              </label>
              <label className="">
                <input type="radio" name="subscription" value="8 Months" className="peer sr-only" />
                <p className="peer-checked:bg-green-500 peer-checked:text-white rounded-lg border border-green-500 px-6 py-2 font-bold">8 Months</p>

              </label>
              <label className="">
                <input type="radio" name="subscription" value="12 Months" className="peer sr-only" />
                <p className="peer-checked:bg-green-500 peer-checked:text-white rounded-lg border border-green-500 px-6 py-2 font-bold">12 Months</p>

              </label>
            </div>

            <div className="sm:order-1 mt-4">
              <div className="flex h-8  text-gray-600">
                <button
                  onClick={() => setQuatity(quantity - 1)}
                  className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-green-500 hover:text-white"
                >
                  -
                </button>
                <div className="flex  items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
                  {quantity}
                </div>
                <button
                  onClick={() => setQuatity(quantity + 1)}
                  className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-green-500 hover:text-white"
                >
                  +
                </button>
              </div>
            </div>

            <div className="mt-4 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
              <div className="flex items-end">
                {data.discountedPrice ? (
                  <>
                    <h1 className="text-3xl font-bold">
                      {data.discountedPrice}
                    </h1>
                    <span className="text-base">/</span>
                    <span
                      className={`text-base font-medium text-gray-500 line-through dark:text-gray-300`}
                    >
                      ₺{data.price}.00
                    </span>
                  </>
                ) : (
                  <><h1 className="text-3xl font-bold">
                    ₺{data.price}.00
                  </h1></>
                )}
              </div>

              <button
                onClick={() => hundleAddToCart(data)}
                type="button"
                className="m-2 inline-flex items-center justify-center rounded-md border-2 border-transparent bg-green-500 bg-none px-12 py-3 text-center text-base font-bold text-white hover:border-green-500 hover:text-green-500 transition-all duration-200 ease-in-out focus:shadow hover:bg-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="shrink-0 mr-3 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                sepete ekle
              </button>

              <button
                onClick={() => setOpenOffer(!openOffer)}
                type="button"
                className="m-2 inline-flex items-center justify-center rounded-md border-2 border-transparent bg-green-500 bg-none px-12 py-3 text-center text-base font-bold text-white hover:border-green-500 hover:text-green-500 transition-all duration-200 ease-in-out focus:shadow hover:bg-white"
              >
                <HandshakeIcon className="mr-2 block h-7 w-7 align-middle " />
                pazarlık yap
              </button>
            </div>

            <ul className="mt-8 space-y-2">
              <li className="flex items-center text-left text-sm font-medium text-gray-600">
                <svg
                  className="mr-2 block h-5 w-5 align-middle text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    className=""
                  ></path>
                </svg>
                Bedava kargo
              </li>

              <li className="flex items-center text-left text-sm font-medium text-gray-600">
                <svg
                  className="mr-2 block h-5 w-5 align-middle text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    className=""
                  ></path>
                </svg>
                kolay iade
              </li>
            </ul>
          </div>


          <div className="lg:col-span-4 w-full">
            <div className="border-b border-gray-300">
              <nav className="flex gap-4">

                <a
                  href="#"
                  title=""
                  className="inline-flex items-center border-b-2 border-transparent py-4 text-sm font-medium text-gray-600"
                >
                  Yorumlar
                  <span className="ml-2 block rounded-full bg-gray-500 px-2 py-px text-xs font-bold text-gray-100">
                    {" "}
                    1,209{" "}
                  </span>
                </a>
              </nav>
            </div>

            <div class="flex items-center justify-center max-w-lg">
              {/* <form

                onSubmit={formik.handleSubmit}
                class="w-full max-w-xl bg-white rounded-lg px-4 pt-2">
                <div class="flex flex-wrap -mx-3 mb-6">
                  <h2 class="px-4 pt-3 pb-2 text-gray-800 text-lg">Yorum ekle</h2>
                  <div class="w-full md:w-full px-3 mb-2 mt-2">

                    <textarea

                      id="content"
                      name="content"
                      type="textarea"

                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.content}

                      class="bg-gray-100 rounded border border-rose-500 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                      placeholder='Yorumunu yaz' required></textarea>
                  </div>
                  <div class="w-full md:w-full flex items-start md:w-full px-3">

                    <div class="-mr-1">
                      <input type='submit' class="bg-white text-gray-700 font-medium py-1 px-4 border border-rose-500 rounded-lg tracking-wide mr-1 hover:text-white hover:bg-rose-500" value='Paylaş' />
                    </div>
                  </div>
                </div>
              </form> */}
            </div>

            <div className='mt-3 w-full'>
              {
                data?.comments.map((comment, key) => (


                  <div key={key} class="flex  items-center w-full ">
                    <div class="relative w-full grid grid-cols-1 gap-4 p-4 mb-8 border border-green-500 rounded-lg bg-white shadow-lg">
                      <div class="relative flex gap-4">
                       
                        <div class="flex  w-full justify-between">
                          <div class="flex flex-row justify-between">
                            <p class="relative text-xl whitespace-nowrap truncate overflow-hidden">{comment.user.name}</p>
                            <a class="text-gray-500 text-xl" href="#"><i class="fa-solid fa-trash"></i></a>
                          </div>
                          <p class="text-gray-400 text-sm">{comment.createdAt}</p>
                        </div>
                      </div>
                      <p class="-mt-4 text-gray-500">{comment.content}</p>
                    </div>
                  </div>

                ))
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
