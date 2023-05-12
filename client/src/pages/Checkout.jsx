import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PayButton from "../components/PayButton";
function Checkout() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  return (
    <div>
      <section>
        <h1 className="sr-only">Checkout</h1>

        <div className="mx-auto grid max-w-screen-2xl grid-cols-1 md:grid-cols-2">
          <div className="bg-gray-50 py-8 md:py-8">
            <div className="mx-auto max-w-lg space-y-2 px-4 lg:px-8">
              <div className="flex items-center ">
                <h2 className="font-medium text-xl text-gray-900">orders</h2>
              </div>

              <div>
                <p className="text-2xl font-medium tracking-tight text-gray-900">
                  Total Price : ${cart.cartTotalAmount}
                </p>

                <p className="mt-1 text-sm text-gray-600">
                  Total Quantity: {cart.cartTotalQuantity}
                </p>
              </div>

              <div>
                <div className="flow-root  ">
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
                                    <dt className="inline">Size:</dt>
                                    <dd className="inline">{product.size}</dd>
                                  </div>
                                </dl>
                              </div>
                              <div className="text-sm  text-center">
                                <p>quantity: {product.cartQuantity}</p>
                                <p>price: ${product.price}</p>
                                <span>
                                  {product.cartQuantity}x ${product.price}{" "}
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
                <PayButton cartItems={cart?.cartItems} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Checkout;
