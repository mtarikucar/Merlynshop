import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HandshakeIcon from "@mui/icons-material/Handshake";
import { useQuery, useMutation } from "react-query";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import { addToCart, decreaseCart } from "../store/cartSlice";

import OfferModal from "../components/modals/OfferModal";
import ImageExhibiton from "../components/ImageExhibiton";
import { toast } from "react-toastify";

function ProductDetail() {
  const [openOffer, setOpenOffer] = useState(false);
  const [quantity, setQuatity] = useState(1);
  const [selectedData, setSelectedData] = useState();
  const [separateArray, setSeparateArray] = useState([]);

  const dispatch = useDispatch();
  const { token, user } = useSelector((store) => store.auth);

  const handleAddToCart = (product) => {
    const cartProduct = {
      ...product,
      cartQuantity: quantity,
      product_feature: selectedData,
    };
    dispatch(addToCart(cartProduct));
    setQuatity(1);
  };

  const { id } = useParams();

  const addCommentMutation = useMutation((commentData) =>
    axios.post(`${import.meta.env.VITE_BASE_URL}/comment`, commentData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  );

  const { isLoading, error, data } = useQuery(
    "product",
    () => {
      return axios
        .get(`${import.meta.env.VITE_BASE_URL}/product/${id}`)
        .then((res) => res.data);
    },
    {
      onSuccess: (data) => {
        const groupedData = data?.product_features?.reduce((result, item) => {
          const { name } = item.feature;
          if (!result[name]) {
            result[name] = [];
          }
          result[name].push(item);
          return result;
        }, {});

        const separateArray = Array.from(Object.entries(groupedData)).map(
          ([key, value]) => ({
            [key]: value,
          })
        );

        setSeparateArray(separateArray);
      },
    }
  );

  const [newComment, setNewComment] = useState("");

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    addCommentMutation.mutate({
      userId: user.id,
      productId: data.id,
      content: newComment,
    });
    setNewComment("");
  };

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  console.log(data);
  console.log(selectedData);
  return (
    <section className="py-4 sm:py-6">
      <OfferModal
        openOffer={openOffer}
        setOpenOffer={setOpenOffer}
        price={data.price}
      />
      <div className="container mx-auto px-4">
        <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3 lg:row-end-1">
            <ImageExhibiton thumbnail={data.thumbnail} photos={data.photos} />
          </div>

          <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
            <h1 className="sm: text-2xl font-bold text-gray-900 sm:text-3xl">
              {data.name}
            </h1>
            <p className="py-1">
              <div dangerouslySetInnerHTML={{ __html: data.description }} />
            </p>

            <div className="flex flex-col py-3 gap-1">
              {separateArray?.map((feature, key) => (
                <div key={key}>
                  {Object.keys(feature).map((name, index) => {
                    const sortedFeatures = feature[name].sort(
                      (a, b) => a.value - b.value
                    );

                    return (
                      <div className="flex" key={index}>
                        {sortedFeatures.map((f, innerIndex) => (
                          <div className="p-1" key={innerIndex}>
                            <input
                              id={f.value}
                              type="radio"
                              name={name}
                              value={f.id}
                              className="hidden peer"
                              onChange={() =>
                                setSelectedData(f.id)
                              }
                            />
                            <label
                              htmlFor={f.value}
                              className="inline-flex items-center justify-between w-full px-3 py-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-green-600 peer-checked:text-green-600 hover:text-gray-600 hover:bg-gray-100"
                            >
                              <div className="block">
                                <div className="w-full text-lg font-semibold">
                                  {f.value}
                                </div>
                              </div>
                            </label>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              ))}
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
                  <>
                    <h1 className="text-3xl font-bold">₺{data.price}.00</h1>
                  </>
                )}
              </div>

              {
                !selectedData ? (
                  <div>
                    <button
                      onClick={() => toast.info("Size seçiniz")}
                      type="button"
                      className="p-2 inline-flex items-center justify-center rounded-md border-2 border-transparent bg-green-500 bg-none  text-center text-base font-bold text-white hover:border-green-500 hover:text-green-500 transition-all duration-200 ease-in-out focus:shadow hover:bg-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="shrink-0  h-5 w-5"
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
                      Sepete Ekle
                    </button>
                  </div>
                ) : (


                  <button
                    onClick={() => handleAddToCart(data)}
                    type="button"
                    className="p-2 inline-flex items-center justify-center rounded-md border-2 border-transparent bg-green-500 bg-none  text-center text-base font-bold text-white hover:border-green-500 hover:text-green-500 transition-all duration-200 ease-in-out focus:shadow hover:bg-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="shrink-0  h-5 w-5"
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
                    Sepete Ekle
                  </button>
                )
              }

              {/* <button
                onClick={() => setOpenOffer(!openOffer)}
                type="button"
                className="p-2 inline-flex items-center justify-center rounded-md border-2 border-transparent bg-green-500 bg-none  text-center text-base font-bold text-white hover:border-green-500 hover:text-green-500 transition-all duration-200 ease-in-out focus:shadow hover:bg-white"
              >
                <HandshakeIcon className="  h-7 w-7 align-middle " />
                pazarlık yap
              </button> */}
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
                  {/* <span className="ml-2 block rounded-full bg-gray-500 px-2 py-px text-xs font-bold text-gray-100">                    
                    1,209
                  </span> */}
                </a>
              </nav>
            </div>

            <div className="mt-3 w-full">
              {data?.comments.map((comment, key) => (
                <div key={key} className="flex  items-center w-full ">
                  <div className="relative w-full grid grid-cols-1 gap-4 p-4 mb-8 border border-green-500 rounded-lg bg-white shadow-lg">
                    <div className="relative flex gap-4">
                      <div className="flex  w-full justify-between">
                        <div className="flex flex-row justify-between">
                          <p className="relative text-xl whitespace-nowrap truncate overflow-hidden">
                            {comment.user.name}
                          </p>
                          <a className="text-gray-500 text-xl" href="#">
                            <i className="fa-solid fa-trash"></i>
                          </a>
                        </div>
                        <p className="text-gray-400 text-sm">
                          {comment.createdAt}
                        </p>
                      </div>
                    </div>
                    <p className="-mt-4 text-gray-500">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
            <form
              className="flex items-center w-full"
              onSubmit={handleCommentSubmit}
            >
              <textarea
                className="w-full p-4 mb-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Yorumunuzu buraya girin"
                value={newComment}
                onChange={handleCommentChange}
              ></textarea>
              <button
                className="px-4 py-2 ml-4 h-full text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none disabled:bg-gray-500 hover:disabled:bg-gray-200"
                type="submit"
                disabled={!newComment}
              >
                ekle
              </button>
            </form>
          </div>
        </div>
      </div >
    </section >
  );
}

export default ProductDetail;
