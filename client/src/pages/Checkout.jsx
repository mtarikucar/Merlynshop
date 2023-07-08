import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PayButton from "../components/PayButton";
function Checkout() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);


  console.log(cart);
  return (
    <>
      <div className="relative mx-auto w-full bg-white py-8">
        <div className="grid min-h-screen grid-cols-10">
          <div className="col-span-full py-6 px-4 sm:py-12 lg:col-span-6 lg:py-12">
            <PayButton cart={cart} />
          </div>
          <div className="relative col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24">
            {/* <h2 className="absolute text-black">Order summary</h2>
            gdfgndfgn */}
            <div>
              <img src="https://images.unsplash.com/photo-1581318694548-0fb6e47fe59b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" className="absolute inset-0 max-h-screen h-ful w-full object-cover" />
              <div className="absolute inset-0 max-h-screen w-full bg-gradient-to-t from-green-800 to-green-400 opacity-95"></div>
            </div>

            <div className="relative">
              <ul className="space-y-5">

                {cart &&
                  cart?.cartItems.map((product) => (
                    <li key={product?.id} className="flex justify-between">
                      <div className="inline-flex">
                        <img src={product?.thumbnail} alt="" className="max-h-16" />
                        <div className="ml-3">
                          <p className="text-base font-semibold text-white">{product?.name}</p>
                          <p className="text-sm font-medium text-white text-opacity-80">{product?.category?.name}</p>
                        </div>
                      </div>
                      <div className="flex flex-col justify-center items-center ">

                        <p className="text-sm  font-semibold text-white">₺{product?.price}</p>
                        <p className="text-sm font-semibold text-white">X {product?.cartQuantity}</p>
                      </div>
                    </li>
                  ))}

              </ul>
              <div className="my-5 h-0.5 w-full bg-white bg-opacity-30"></div>
              <div className="space-y-2">
                <p className="flex justify-between text-lg font-bold text-white"><span>Toplam tutar:</span><span>₺{cart?.cartTotalAmount}</span></p>
                <p className="flex justify-between text-sm font-medium text-white"><span>KDV: 20%</span><span>₺{cart?.cartTotalAmount / 5}</span></p>
              </div>
            </div>
            <div className="relative mt-10 text-white">
              <h3 className="mb-5 text-lg font-bold">Destek</h3>
              <p className="text-sm font-semibold">+01 653 235 211 <span className="font-light">(International)</span></p>
              <p className="mt-1 text-sm font-semibold">support@nanohair.com <span className="font-light">(Email)</span></p>
              <p className="mt-2 text-xs font-medium">Ödeme ile ilgili sorunlar için bizi şimdi arayın</p>
            </div>
            <div className="relative mt-10 flex">
              <p className="flex flex-col"><span className="text-sm font-bold text-white">Para iade garantisi</span><span className="text-xs font-medium text-white">satın alma tarihinden itibaren 30 gün içinde</span></p>
            </div>
          </div>
        </div>
      </div>


    </>
  );
}

export default Checkout;
