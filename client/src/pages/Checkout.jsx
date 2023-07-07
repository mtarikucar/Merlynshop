import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PayButton from "../components/PayButton";
function Checkout() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  return (
    <div className="min-h-[80vh]">
      <section className="flex items-center justify-center">
        <h1 className="sr-only">sepet detayları</h1>

        <div className="m-auto mt-24 grid max-w-screen-2xl grid-cols-1 md:grid-cols-2 items-center">
          <div className="bg-gray-50 py-8 md:py-8 flex items-center justify-center">
            <div className="mx-auto max-w-lg space-y-2 px-4 lg:px-8">
              <div className="flex items-center ">
                <h2 className="font-medium text-xl text-gray-900">siparişler</h2>
              </div>

              <div>
                <p className="text-2xl font-medium tracking-tight text-gray-900">
                  toplam tutar : {cart.cartTotalAmount}₺
                </p>

              </div>

              <div>
                <div className="flow-root">
                  <ul className="-my-4 divide-y  divide-gray-100">
                    {cart &&
                      cart?.cartItems.map((product) => (
                        <li
                          key={product.id}
                          className="flex items-center gap-4 border-b p-2 py-4"
                        >
                          <img
                            src={product.thumbnail}
                            alt={product.name}
                            className="h-32 w-32 rounded object-cover"
                          />

                          <div className="w-full">
                            <h3 className="text-sm text-gray-900">
                              {product.name}
                            </h3>

                            <div className="flex flex-row justify-between items-center w-full">
                              <div>
                                <dl className="mt-0.5 space-y-px text-sm text-gray-600">
                                  <div>
                                    <dt className="inline">Boyut:</dt>
                                    <dd className="inline">{product.size}</dd>
                                  </div>
                                </dl>
                              </div>
                              <div className="text-sm  text-center">
                                <p>adet: {product.cartQuantity}</p>
                                <p>adet fiyatı: ${product.price}</p>
                                <span>
                                  {product.cartQuantity} x ${product.price}
                                </span>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white py-12 md:py-24">
            <div className="mx-auto max-w-lg px-4 lg:px-8">
              <div className="col-span-6">
              <PayButton cart={cart} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Checkout;
