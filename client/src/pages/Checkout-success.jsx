import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function CheckoutSuccess() {
  const cart = useSelector((state) => state.cart);

  console.log(cart);

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-light-green-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-2xl font-semibold text-gray-900">
            ödeme başarılı
          </h1>
          <p className="mt-4 text-gray-600">
            alışverişin içint teşekkür ederiz. ödemen oanylandı
          </p>
          <div className="mt-8 text-center px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
            <NavLink to={"/"}>alışverişe devame et</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutSuccess;
